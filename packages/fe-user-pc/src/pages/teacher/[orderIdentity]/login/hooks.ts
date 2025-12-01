import Http from '@/servers/http'
import type UserStore from '@/stores/userStore'
import { message } from 'antd'
import { makeAutoObservable } from 'mobx'
import { history } from 'umi'
import api from './api'
import { getPublicKey, NOT_REGISTER_ERROR_CODE, SM2_ERROR_CODE } from '@/utils/getPublicKey'
import { sm2Encrypt } from '@wotu/wotu-components'
import { getCookie, getSessionStorage, setSessionStorage } from '@/storage'
import { methods1Key } from './const'

export default class SellerLoginHooks {
    public apForm: any = null
    public codeKey = ''
    public codeEvent = []
    public codeEventTime = 60
    public codeBtnStr = '发送验证码'
    public randomKey = ''

    public currentForm: any = null
    // login_method1 手机验证码
    // login_method2 账号密码

    // 默认为账号密码登录
    public loginType:
        | 'login_personal_center_mobile_verify'
        | 'login_personal_center_mobile_pwd'
        | 'login_personal_center_certificate_psw'
        | '' = 'login_personal_center_certificate_psw'

    public loginMethods: '' | 'wx' | 'dd' = ''

    public userStore: Record<string, any> = {}
    public siteStore: any = {}
    // 登录按钮的loading状态
    public btnLoading: boolean = false

    public authOpenId = '' //扫码登录的openId
    public authType = '' //扫码登录的类型

    constructor() {
        makeAutoObservable(this)
        this.getRandomKey()
    }

    setloginMethods(type: '' | 'wx' | 'dd') {
        this.loginMethods = type
    }
    setUserStore(userStore: any, siteStore: any) {
        this.userStore = userStore
        this.siteStore = siteStore
    }

    setLoginType = (type: any) => {
        this.loginType = type
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
        // @ts-ignore
        this.codeEvent.push(codeEventItem)
    }

    /**
     *@name 资源方登录
     *
     * @param {*} form
     * @param {UserStore} user
     * @param {*} formRef
     * @param {Record<string, string>} query
     * @param {boolean} [skipSm2] 是否跳过isSm2加密登录 默认为false ，为true时直接明文登录
     * @memberof loginHooks
     */
    loginHandler = async (
        form: any,
        user: UserStore,
        formRef: any,
        query: Record<string, string>,
        skipSm2?: boolean,
    ) => {
        this.btnLoading = true
        const { account, password, verifyCode } = form

        let tempLoginParam = {}
        let requestApi = ''
        if (methods1Key.includes(this.loginType)) {
            // 获取公钥，对用户输入的密码加密 避免明文传输
            let sm2Result = skipSm2
                ? { password }
                : await sm2Encrypt?.(getPublicKey as any, { password })
            tempLoginParam = {
                account,
                appKey: 'WEB',
                sid: 1,
                type: 4,
                authOpenId: this.authOpenId,
                authType: this.authType,
                ...sm2Result,
            }
            requestApi = api.passwordLogin
        } else {
            tempLoginParam = {
                account,
                appKey: 'WEB',
                randomKey: this.randomKey,
                verifyCode,
                sid: 1,
                type: 4,
                authOpenId: this.authOpenId,
                authType: this.authType,
                identity: getCookie('SELECT_IDENTITY_CODE'),
            }
            requestApi = api.codeLogin
        }

        if (getSessionStorage('EXTRA_TIME_STATUS')?.toString?.() === '1') {
            tempLoginParam = { ...tempLoginParam, extraTimeStatus: 1 }
        }

        let res = await Http(requestApi, 'post', { ...tempLoginParam }, { form: true })

        const { success, data, message: messageInfo, messageCode }: any = res || {}
        if (!success) {
            if (messageCode === SM2_ERROR_CODE && !skipSm2) {
                // 加密错误 使用明文登录
                this.loginHandler(form, user, formRef, query, true)
                return
            } else if (messageCode === NOT_REGISTER_ERROR_CODE) {
                // 未注册 走注册逻辑
                const personMerchantRoute = getCookie('PERSON_MERCHANT_ROUTE')
                history.push(`/teacher/${personMerchantRoute}/register${location.search}`, {
                    verifyCode: form.verifyCode,
                    mobile: form.account,
                    agreement: true,
                    randomKey: this.randomKey,
                })
                return
            }

            let fieldErrors = messageInfo.split(':')
            let [errKey, errMsg] = fieldErrors
            if (errKey && errMsg) {
                formRef.setFields([{ name: errKey, errors: [errMsg] }])
            } else {
                message.error(messageInfo)
            }
            this.btnLoading = false
        } else {
            //@ts-ignore
            let { accessToken = '' } = data || {}
            if (!accessToken) {
                this.btnLoading = false
                return
            }
            let { redirectUrl = '' } = query || {}
            setSessionStorage('LAST_LOGIN_ACCOUNT', account)
            await user?.updateUserAccount(data, 4, undefined, undefined, redirectUrl)
            this.btnLoading = false
        }
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

    goPage = (str: string) => {
        let {
            location: { pathname },
        } = history
        pathname = pathname.replace('login', str)
        history.push(pathname)
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
