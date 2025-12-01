import Http from '@/servers/http'
import type SiteStore from '@/stores/siteStore'
import type UserStore from '@/stores/userStore'
import { getPublicKey, SM2_ERROR_CODE } from '@/utils/getPublicKey'
import { sm2Encrypt } from '@wotu/wotu-components'
import { message } from 'antd'
import { makeAutoObservable } from 'mobx'
import { setSessionStorage } from '@/storage'
import api from './api'
// import { history } from 'umi'
// import { setLocalStorage } from '@/storage'

export default class loginHooks {
    public apForm: any = null
    public done: boolean = false
    public codeKey: string = ''
    public tabIndex: number = 2
    public codeEvent: number[] = []
    public codeEventTime = 60
    public codeBtnStr: string = '发送验证码'
    public randomKey: string = ''

    public currentForm: any = null

    public personList: string[] = [] //是否勾选了微信和钉钉登录
    public orgList: string[] = [] //是否勾选了微信和钉钉登录
    public regList: string[] = [] //注册 是否勾选了个人或者机构注册
    public personalList: string[] = [] // 个人手机密码登录 证件号码 账户密码
    public mechanismList: string[] = [] // 机构 密码登录 证件号码 账户密码

    public loginTypes = 1 //1手机号/身份证号，账号   2手机验证码登录

    public authOpenId = '' //扫码登录的openId
    public authType = '' //扫码登录的类型

    constructor() {
        makeAutoObservable(this)
        this.getRandomKey()
    }

    tabClick = (index: number) => {
        setSessionStorage('AUTH_USER_TYPE', index)
        this.tabIndex = index
    }

    setLoginType = (type: number) => {
        this.loginTypes = type
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
     *@name 登录
     *
     * @param {*} form
     * @param {SiteStore} site
     * @param {UserStore} user
     * @param {*} formRef
     * @param {boolean} [skipSm2] 是否跳过isSm2加密登录 默认为false ，为true时直接明文登录
     * @memberof loginHooks
     */
    loginHandler = async (
        form: any,
        site: SiteStore,
        user: UserStore,
        formRef: any,
        skipSm2?: boolean,
    ) => {
        if (this.done) return
        this.done = true
        let {
            siteData: { data: tempData },
        } = site
        tempData = tempData || {}
        let { sid } = tempData
        const { account, password, verifyCode } = form

        let tempLoginParam = {}
        let requestApi = ''
        if (this.loginTypes === 1) {
            // 获取公钥，对用户输入的密码加密 避免明文传输
            // @ts-ignore
            let sm2Result = skipSm2 ? { password } : await sm2Encrypt?.(getPublicKey, { password })

            tempLoginParam = {
                account,
                appKey: 'WEB',
                sid,
                type: this.tabIndex,
                ...sm2Result,
            }
            requestApi = api.passwordLogin
        } else {
            tempLoginParam = {
                account,
                appKey: 'WEB',
                randomKey: this.randomKey,
                verifyCode,
                sid,
                type: this.tabIndex,
            }
            requestApi = api.codeLogin
        }

        Http(requestApi, 'post', { ...tempLoginParam }, { form: true })
            .then((res: any) => {
                const { success, data, messageCode, message: messageInfo } = res || {}
                if (!success) {
                    this.done = false
                    if (messageCode === SM2_ERROR_CODE && !skipSm2) {
                        // 加密错误时 使用明文登录
                        this.loginHandler(form, site, user, formRef, true)
                        return
                    }
                    let fieldErrors = messageInfo.split(':')
                    let [errKey, errMsg] = fieldErrors
                    if (errKey && errMsg) {
                        formRef.setFields([{ name: errKey, errors: [errMsg] }])
                    } else {
                        message.error(messageInfo)
                    }
                } else {
                    user.updateUserAccount(data, Number(this.tabIndex))
                }
            })
            .catch(() => {
                this.done = false
            })
    }

    serverVerify = (ticket: string, randstr: string) => {
        this.getRandomKey()
        const account = this.apForm?.getFieldValue?.('account') || ''
        return Http(
            '/auth/verify/send_code_validate',
            'post',
            { account, ticket, randstr, key: this.randomKey, type: 3 }, //data中携带ticket和randstr
            // @ts-ignore
            { ticket: ticket }, //headers中携带ticket
        )
    }

    bindForm = (form: any) => {
        this.apForm = form
    }

    /**
     * 获取扫码后的openId和authType
     * @param openId
     * @param authType
     */
    getLoginAuth = (openId: string, authType: string) => {
        this.authOpenId = openId
        this.authType = authType
    }
}
