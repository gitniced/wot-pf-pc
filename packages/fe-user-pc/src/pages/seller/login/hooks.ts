import Http from '@/servers/http'
// import { setSessionStorage } from '@/storage'
// import type SiteStore from '@/stores/siteStore'
import type UserStore from '@/stores/userStore'
import { USER_LOGIN_TYPE } from '@wotu/wotu-components/dist/esm/Types'
import { message } from 'antd'
import { makeAutoObservable } from 'mobx'
import { history } from 'umi'
import api from './api'
import { setSessionStorage } from '@/storage'
import { getPathParams } from '@/utils/urlUtils'
// import { findSiteData } from '@wotu/wotu-components'
import { getPublicKey, SM2_ERROR_CODE } from '@/utils/getPublicKey'
import { sm2Encrypt } from '@wotu/wotu-components'
// import type { UserAccount } from '@/stores/interface'
// import { history } from 'umi'
// import { setLocalStorage } from '@/storage'

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

    public loginType: 'login_method1' | 'login_method2' | '' = 'login_method2'

    public loginMethods: '' | 'wx' | 'dd' = ''

    public userStore: Record<string, any> = {}
    public siteStore: any = {}
    // 登录按钮的loading状态
    public btnLoading: boolean = false

    constructor() {
        makeAutoObservable(this)
        this.getRandomKey()
    }

    setloginMethods(type: '' | 'wx' | 'dd') {
        this.loginMethods = type
    }
    // @ts-ignore
    setUserStore(userStore, siteStore) {
        this.userStore = userStore
        this.siteStore = siteStore
    }

    setLoginType = (type: 'login_method1' | 'login_method2' | '') => {
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

    toCreate() {
        setSessionStorage('CREATE_SOURCE', 'merchant')
        history.push(`/organization/create${getPathParams()}`)
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
        if (this.loginType === 'login_method2') {
            // 获取公钥，对用户输入的密码加密 避免明文传输
            // @ts-ignore
            let sm2Result = skipSm2 ? { password } : await sm2Encrypt?.(getPublicKey, { password })
            tempLoginParam = {
                account,
                appKey: 'WEB',
                sid: 1,
                type: USER_LOGIN_TYPE.SELLER_LOGIN,
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
                type: USER_LOGIN_TYPE.SELLER_LOGIN,
            }
            requestApi = api.codeLogin
        }

        let res = await Http(requestApi, 'post', { ...tempLoginParam }, { form: true })

        const { success, data, message: messageInfo, messageCode }: any = res || {}
        if (!success) {
            if (messageCode === SM2_ERROR_CODE && !skipSm2) {
                // 加密错误 使用明文登录
                this.loginHandler(form, user, formRef, query, true)
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
            // 获取用户信息
            // await user?.update_seller_account({ accessToken })
            // 跳转对应页面
            // user.redirect_after_seller_login()
            setSessionStorage('LAST_LOGIN_ACCOUNT', account)
            await user?.updateUserAccount(data, 3)
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
}
