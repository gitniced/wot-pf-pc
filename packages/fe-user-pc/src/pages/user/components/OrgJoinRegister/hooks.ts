import Http from '@/servers/http'
import {
    LOGIN_TYPE,
    LOGIN_TYPE_STR_TO_NUM,
    USER_LOGIN_TYPE,
} from '@wotu/wotu-components/dist/esm/Types'
import { makeAutoObservable } from 'mobx'
import api from './api'
import { message } from 'antd'
import globalApi from '@/servers/globalApi'
import { getSourceTypeByType } from '@/utils/urlUtils'
import { findSiteData, getCookie } from '@wotu/wotu-components'
import { getPublicKey, SM2_ERROR_CODE } from '@/utils/getPublicKey'
import { sm2Encrypt } from '@wotu/wotu-components'
import { joinRegisterHandle } from '../utils'
import { setCookie } from '@/storage'

export default class RegisterStore {
    public apForm: any = null
    public codeKey = ''
    public codeEvent = []
    public codeEventTime = 60
    public codeBtnStr = '发送验证码'
    public done = false
    public randomKey = ''

    public currentForm: any = null
    public stepCurrent: 1 | 2 = 1
    public prevData: Record<string, unknown> = {}
    public userStore: Record<string, any> = {}
    public sourceType = ''
    public siteStore: any = {}
    constructor() {
        makeAutoObservable(this)
        this.getRandomKey()
    }

    setUserStore(userStore, siteStore) {
        this.userStore = userStore
        this.siteStore = siteStore
    }

    setSourceType(type) {
        this.sourceType = type
    }
    // 走到下一步
    setStepCurrent(n: 1 | 2) {
        this.stepCurrent = n
    }
    // 设置上一步的数据
    setPrevData(params: Record<string, unknown>) {
        this.prevData = { ...this.prevData, ...params }
    }

    // 获取站点的id
    getSiteId() {
        return findSiteData(this.siteStore?.siteData || {}, 'sid')
    }

    // 获取第一个符合类型的 groupId
    getFistGroupId = async () => {
        let sid = this.getSiteId()
        // 指定类型为机构
        const selfGroupList = (await Http(api.getUserGroupList, 'POST', {
            sid,
            type: USER_LOGIN_TYPE.ORG_LOGIN,
        })) as unknown as any[]

        if (selfGroupList?.length) {
            let groupId = selfGroupList[0]?.id || ''
            return groupId
        } else {
            message.error('当前站点暂未开放机构注册')
        }
    }

    /**
     *@name 设置密码
     *
     * @param {Record<string, string>} params
     * @param {boolean} [skipSm2] 是否跳过isSm2加密登录 默认为false ，为true时直接明文登录
     * @return {*}
     * @memberof RegisterStore
     */
    setPassWord = async (params: Record<string, string>, skipSm2?: boolean) => {
        let { password, passwordRepeat } = params || {}

        let passwordObj = { password, passwordRepeat }
        // 获取公钥，对用户输入的密码加密 避免明文传输
        let sm2Result = skipSm2 ? passwordObj : await sm2Encrypt?.(getPublicKey, passwordObj)

        this.setPrevData({ ...params, ...sm2Result })

        const userType = getCookie('SELECT_USER_TYPE')
        return Http(
            api.reset_password,
            'POST',
            { ...params, ...sm2Result, groupType: LOGIN_TYPE_STR_TO_NUM[userType] },
            { form: true },
        ).then((res: any) => {
            let { messageCode, message: messageInfo, success } = res || {}
            if (!success) {
                if (messageCode === SM2_ERROR_CODE && !skipSm2) {
                    // 加密错误 使用明文登录
                    this.setPassWord(params, true)
                    return
                }
                message.error(messageInfo)
            } else {
                joinRegisterHandle(this.sourceType)
            }
        })
    }

    //调用注册
    loginInverifyCode = async (params: Record<string, unknown>) => {
        let sid = this.getSiteId()
        // 指定当前为机构注册
        let identity = getSourceTypeByType(this.sourceType, LOGIN_TYPE.ORG_LOGIN)
        // 没有 GroupId就停止
        let groupId = await this.getFistGroupId()

        if (!groupId) {
            message.error('当前站点暂未开放机构注册')
            return
        }
        const { authType, authOpenId, verifyCode, account } = params
        const lastParamas = {
            mobile: account,
            verifyCode: verifyCode,
            randomKey: this.randomKey,
            identity,
            sid,
            type: USER_LOGIN_TYPE.ORG_LOGIN,
            groupId,
            authType,
            authOpenId,
        }
        // 先走注册登录接口
        let userToken = await Http(api.verify_register, 'POST', lastParamas)

        if (!userToken.accessToken) return
        setCookie(`TOKEN`, userToken.accessToken, userToken?.tokenExpire || 7)
        // 获取用户信息
        let userInfo = await Http(globalApi.getUserInfo, 'GET', {})
        const isNoSetPasWord = userInfo?.isInitPassword

        await this.userStore.updateUserAccount(userToken, USER_LOGIN_TYPE.ORG_LOGIN, 'noJump')
        if (isNoSetPasWord) {
            // 没有设置过密码 要走设置密码
            this.setStepCurrent(2)
            this.setPrevData(params)
        } else {
            // 前往入驻页面
            joinRegisterHandle(this.sourceType)
        }
    }

    getRandomKey = () => {
        this.randomKey = new Date().getTime() + Math.random().toString(36).slice(-8)
    }

    getCode = async () => {
        if (this.codeEventTime === 60) {
            this.doCodeEvent()
        }
    }

    doCodeEvent = () => {
        this.codeEvent.map(i => {
            window.clearInterval(i)
        })
        this.codeEvent = []
        this.codeBtnStr = `(${this.codeEventTime})重新发送`
        const codeEventItem = window.setInterval(() => {
            this.codeEventTime--
            if (this.codeEventTime !== 0) {
                this.codeBtnStr = `(${this.codeEventTime})重新发送`
            } else {
                this.codeEvent.map(i => {
                    window.clearInterval(i)
                })
                this.codeBtnStr = `发送验证码`
                this.codeEventTime = 60
            }
        }, 1000)
        this.codeEvent.push(codeEventItem)
    }

    serverVerify = (ticket: string, randstr: string) => {
        this.getRandomKey()
        const account = this.apForm?.getFieldValue?.('account') || ''
        return Http(
            '/auth/verify/send_code_validate',
            'post',
            { account, ticket, randstr, key: this.randomKey, type: 4 }, //data中携带ticket和randstr
            // @ts-ignore
            { ticket: ticket }, //headers中携带ticket
        )
    }

    bindForm = (form: any) => {
        this.apForm = form
    }
}
