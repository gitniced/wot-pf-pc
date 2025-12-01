import Http from '@/servers/http'
import { LOGIN_TYPE_STR_TO_NUM, USER_LOGIN_TYPE } from '@wotu/wotu-components/dist/esm/Types'
import dealErrMsg from '@/utils/dealErr'
import { makeAutoObservable } from 'mobx'
import { history } from 'umi'
import api from './api'
import loginApi from './../login/api'

import { message } from 'antd'
import { setCookie } from '@/storage/cookie'
// import { getCookie, setCookie } from '@/storage/cookie'
// import globalApi from '@/servers/globalApi'
import { getPathParams, getSourceType } from '@/utils/urlUtils'
import sellerApi from './../api'
import { setSessionStorage, getLocalStorage } from '@/storage'
import { getPublicKey, SM2_ERROR_CODE } from '@/utils/getPublicKey'
import { getCookie, sm2Encrypt } from '@wotu/wotu-components'
// import type { UserAccount } from '@/stores/interface'

export default class forgetHooks {
    public apForm: any = null
    public codeKey = ''
    public codeEvent = []
    public codeEventTime = 60
    public codeBtnStr = '发送验证码'
    public done = false
    public randomKey = ''
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

    getSourceType() {
        const { sourceType } = history.location.query || {}
        return getSourceType(sourceType as string)
    }

    // 获取站点的id
    getSiteId() {
        return getLocalStorage('SID')
    }

    // 获取第一个符合类型的 groupId
    getFistGroupId = async () => {
        // 指定站点1，类型为资源方
        const selfGroupList = await Http(api.getUserGroupList, 'POST', {
            sid: 1,
            type: USER_LOGIN_TYPE.SELLER_LOGIN,
        })

        if (selfGroupList?.length) {
            let groupId = selfGroupList[0]?.id || ''

            return groupId
        } else {
            message.error('当前站点暂未开放资源方登录')
        }
    }
    toCreate() {
        setSessionStorage('CREATE_SOURCE', 'merchant')
        let pathParams = getPathParams()
        let params = pathParams ? `${pathParams}&register=1` : '?register=1'
        history.replace(`/organization/create${params}`)
    }
    // 去选择org
    toSetOrg = async () => {
        // await this.userStore.update_seller_account({ accessToken: getCookie('TOKEN') }, 'register')
        let res = await Http(`${sellerApi.canJoinOrg}${getSourceType(this.sourceType)}`, 'GET', {})
        if (!res?.length) {
            this.toCreate()
            return
        } else {
            let params = ''
            if (window.location.search) {
                if (window.location.search.includes('type=register')) {
                    params = window.location.search
                } else {
                    params = window.location.search + `&type=register`
                }
            } else {
                params = '?type=register'
            }
            history.replace(`/select/seller-organization${params}`)
        }
    }

    /**
     *@name 重新登录
     *
     * @param {boolean} [skipSm2] 是否跳过isSm2加密登录 默认为false ，为true时直接明文登录
     * @memberof forgetHooks
     */
    resetLogin = async (skipSm2?: boolean) => {
        // let passwordObj = { password: this.prevData.password }
        let passwordObj = { ...this.prevData }
        // 获取公钥，对用户输入的密码加密 避免明文传输
        let sm2Result = skipSm2 ? passwordObj : await sm2Encrypt?.(getPublicKey, passwordObj)
        return Http(
            loginApi.passwordLogin,
            'POST',
            {
                account: this.prevData.account,
                appKey: 'WEB',
                ...sm2Result,
                sid: 1,
                type: USER_LOGIN_TYPE.SELLER_LOGIN,
            },
            { form: true },
        ).then((res: any) => {
            let { success, data: userToken, message: messageInfo, messageCode } = res || {}
            if (success) {
                setCookie('TOKEN', userToken.accessToken, userToken?.tokenExpire || 7)
                this.userStore.updateUserAccount(userToken, 4, 'register')
            } else {
                if (messageCode === SM2_ERROR_CODE && !skipSm2) {
                    // 加密错误 使用明文登录
                    this.resetLogin(true)
                    return
                }
                message.error(messageInfo)
            }
        })
    }

    /**
     *@name 设置密码
     *
     * @param {Record<string, string>} params
     * @param {boolean} [skipSm2] 是否跳过isSm2加密登录 默认为false ，为true时直接明文登录
     * @return {*}
     * @memberof forgetHooks
     */
    async setPassWord(params: Record<string, string>, skipSm2?: boolean) {
        let { password, passwordRepeat } = params || {}

        let passwordObj = { password, passwordRepeat }
        // 获取公钥，对用户输入的密码加密 避免明文传输
        let sm2Result = skipSm2 ? passwordObj : await sm2Encrypt?.(getPublicKey, passwordObj)

        this.setPrevData({ ...params, ...sm2Result })
        console.log(this.prevData)

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
                this.resetLogin(true)
            }
        })
    }

    //调用注册
    loginInverifyCode = async (params: Record<string, unknown>) => {
        // 没有 GroupId就停止
        let groupId = await this.getFistGroupId()
        console.log(' 没有 GroupId就停止groupId', groupId)
        if (!groupId) return
        const { authType, authOpenId, verifyCode, account } = params
        const lastParamas = {
            mobile: account,
            verifyCode: verifyCode,
            randomKey: this.randomKey,
            identity: this.getSourceType(),
            sid: this.getSiteId(),
            type: 3,
            groupId,
            authType,
            authOpenId,
        }
        // 先走注册登录接口
        Http(api.verify_register, 'POST', lastParamas).then((userAccount: any) => {
            const { accessToken, userInfo, tokenExpire = 7 } = userAccount || {}
            setCookie(`TOKEN`, accessToken, Number(tokenExpire))
            const isNoSetPasWord = userInfo.isInitPassword
            if (isNoSetPasWord) {
                // 没有设置过密码 要走设置密码
                this.setStepCurrent(2)
                this.setPrevData(params)
            } else {
                // 没有最后一次选中的机构
                // this.toSetOrg()
                //@ts-ignore
                this.userStore.updateUserAccount(userAccount, 3, 'register', this.toSetOrg)
            }
        })
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
    /**
     *@name 注册
     *
     * @param {*} formRef
     * @param {*} form
     * @param {*} skipSm2 是否跳过isSm2加密登录 默认为false ，为true时直接明文登录
     * @memberof forgetHooks
     */
    registerHandler = async (formRef: any, form: any, skipSm2?: boolean) => {
        if (!this.done) {
            this.done = true
            let { password, passwordRepeat } = form

            let tempForgetParam: Record<string, any> = {}
            let passwordObj = { password, passwordRepeat }
            // 获取公钥，对用户输入的密码加密 避免明文传输
            let sm2Result = skipSm2 ? passwordObj : await sm2Encrypt?.(getPublicKey, passwordObj)
            tempForgetParam = {
                mobile: this.prevData.account,
                randomKey: this.randomKey,
                sid: 1,
                // TODO 用户组暂时写死资源方(12:考生;146:资源方)
                groupId: 146,
                verifyCode: this.prevData.verifyCode,
                type: USER_LOGIN_TYPE.SELLER_LOGIN,
                ...sm2Result,
            }

            await Http(api.register, 'post', { ...tempForgetParam }, { form: true })
                .then(res => {
                    this.done = false
                    const { success, messageCode } = res || {}
                    if (!success) {
                        if (messageCode === SM2_ERROR_CODE && !skipSm2) {
                            // 加密错误 使用明文登录
                            this.registerHandler(formRef, form, true)
                            return
                        }
                        dealErrMsg(res.message, formRef)
                    } else {
                        this.goPage('login')
                    }
                })
                .catch(() => {
                    this.done = false
                })
        }
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

    goPage = (str: string) => {
        let {
            location: { pathname },
        } = history
        pathname = pathname.replace('register', str)
        window.location.replace(pathname)
    }
}
