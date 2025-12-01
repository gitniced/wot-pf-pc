import Http from '@/servers/http'
import type SiteStore from '@/stores/siteStore'
import type UserStore from '@/stores/userStore'
import { USER_LOGIN_TYPE } from '@wotu/wotu-components/dist/esm/Types'
import dealErrMsg from '@/utils/dealErr'
import { getPublicKey, NOT_REGISTER_ERROR_CODE, SM2_ERROR_CODE } from '@/utils/getPublicKey'
import { sm2Encrypt } from '@wotu/wotu-components'
import { makeAutoObservable } from 'mobx'
import api from './api'
import { getPortalCodeFromUrl } from '@/utils/getPortalCodeFromUrl'
import { getLocalStorage, getSessionStorage, setSessionStorage } from '@/storage'
import { history } from 'umi'
// import { history } from 'umi'
// import { setLocalStorage } from '@/storage'

export default class loginHooks {
    public apForm: any = null
    public done: boolean = false
    public codeKey: string = ''
    public tabIndex = USER_LOGIN_TYPE.USER_LOGIN //1个人注册  2机构入驻
    public codeEvent: number[] = []
    public codeEventTime: number = 60
    public codeBtnStr: string = '发送验证码'
    public randomKey: string = ''

    public currentForm: any = null

    public personList: string[] = [] //是否勾选了微信、钉钉、qq登录
    public orgList: string[] = [] //是否勾选了微信、钉钉、qq登录
    public regList: string[] = [] //注册 是否勾选了个人或者机构注册
    public personalList: string[] = [] // 个人手机密码登录 证件号码 账户密码
    public mechanismList: string[] = [] // 机构 密码登录 证件号码 账户密码

    public defaultLoginTypes = 1 //1手机号/身份证号，账号   2手机验证码登录
    public loginTypes = 1 //1手机号/身份证号，账号   2手机验证码登录  3手机短信密码登录

    public authOpenId = '' //扫码登录的openId
    public authType = '' //扫码登录的类型
    public sid = getLocalStorage('SID') //站点id
    public groupId: string | number = '' //用户组id
    public siteData: any = {}

    setSiteData = (data: any, form: any) => {
        this.siteData = data
        this.apForm = form
    }

    /**

     * 获取用户组id
     * @param groupList 从siteStore中获取的用户组列表
     */
    getGroup = async () => {
        let { groupList }: any = this.siteData?.data || {}
        // @ts-ignore
        const selectedItem = groupList.find(item => item.type === Number(this.tabIndex))
        if (selectedItem) {
            this.groupId = selectedItem.id
        }
    }

    constructor() {
        makeAutoObservable(this)
        this.getRandomKey()
    }

    tabClick = (index: number) => {
        this.tabIndex = index
        this.loginTypes = this.defaultLoginTypes
    }

    initLoginType = (index: number) => {
        this.defaultLoginTypes = index
        this.loginTypes = index
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
     * @name 登录
     * @param form 表单数据
     * @param site 站点信息
     * @param user 用户信息
     * @param formRef 表单ref
     * @param skipSm2:是否跳过isSm2加密登录 默认为false ，为true时直接明文登录
     */
    loginHandler = async (
        form: any,
        site: SiteStore,
        user: UserStore,
        formRef: any,
        skipSm2?: boolean,
        fromType?: any,
    ) => {
        if (this.done) return
        this.done = true
        const platform = getSessionStorage('PLATFORM')
        let {
            siteData: { data: tempData },
        } = site
        tempData = tempData || {}
        let { sid } = tempData
        const { account, password, verifyCode } = form

        let tempLoginParam = {}
        let requestApi = ''
        //账号密码登录
        if (this.loginTypes === 1) {
            // 获取公钥，对用户输入的密码加密 避免明文传输
            // @ts-ignore
            let sm2Result = skipSm2 ? { password } : await sm2Encrypt?.(getPublicKey, { password })
            tempLoginParam = {
                account,
                appKey: 'WEB',
                sid,
                type: this.tabIndex,
                authOpenId: this.authOpenId,
                authType: this.authType,
                ...sm2Result,
            }
            requestApi = api.passwordLogin
        } else if (this.loginTypes === 3) {
            // @ts-ignore
            let sm2Result = skipSm2 ? { password } : await sm2Encrypt?.(getPublicKey, { password })
            tempLoginParam = {
                account,
                appKey: 'WEB',
                sid,
                type: this.tabIndex,
                randomKey: this.randomKey,
                authOpenId: this.authOpenId,
                authType: this.authType,
                verifyCode,
                ...sm2Result,
            }
            requestApi = api.loginVerificationCode
        } else {
            //手机验证码登录
            tempLoginParam = {
                account,
                appKey: 'WEB',
                randomKey: this.randomKey,
                verifyCode,
                sid,
                type: this.tabIndex,
                authOpenId: this.authOpenId,
                authType: this.authType,
            }
            requestApi = api.codeLogin
        }

        // 门户用户登录携带门户机构code
        if (platform === 'portal') {
            const portalCode = getPortalCodeFromUrl()
            //@ts-ignore
            tempLoginParam.organizationCode = portalCode
        }

        if (getSessionStorage('EXTRA_TIME_STATUS')?.toString?.() === '1') {
            //@ts-ignore
            tempLoginParam = { ...tempLoginParam, extraTimeStatus: 1 }
        }

        Http(requestApi, 'post', { ...tempLoginParam }, { form: true })
            .then(res => {
                const { success, data, messageCode, message: messageInfo }: any = res || {}
                console.log(res)
                if (!success) {
                    this.done = false
                    if (messageCode === SM2_ERROR_CODE && !skipSm2) {
                        // 加密错误 使用明文登录
                        this.loginHandler(form, site, user, formRef, true, fromType)
                        return
                    } else if (messageCode === NOT_REGISTER_ERROR_CODE) {
                        // 未注册 走注册逻辑
                        /**
                         *  站点个人需要完善信息 跳转到 /user/register
                         *  组织和saas门户个人（无需完善信息）未注册直接注册后登录
                         */
                        if (this.tabIndex === USER_LOGIN_TYPE.USER_LOGIN && platform !== 'portal') {
                            history.push(`/user/register?type=${this.tabIndex}`, {
                                verifyCode: form.verifyCode,
                                mobile: form.account,
                                agreement: true,
                                randomKey: this.randomKey,
                            })
                        } else if (
                            this.tabIndex === USER_LOGIN_TYPE.ORG_LOGIN ||
                            platform === 'portal'
                        ) {
                            this.handleRegister(
                                {
                                    verifyCode: form.verifyCode,
                                    mobile: form.account,
                                    account: form.account,
                                    agreement: true,
                                    randomKey: this.randomKey,
                                },
                                site,
                                user,
                                formRef,
                                skipSm2,
                            )
                        }
                        return
                    }
                    dealErrMsg(messageInfo, formRef)
                } else {
                    setSessionStorage('LAST_LOGIN_ACCOUNT', account)
                    user.updateUserAccount(data, Number(this.tabIndex), fromType)
                }
            })
            .catch(() => {
                this.done = false
            })
    }

    /** 注册后登录 */
    handleRegister = async (data: any, site: any, user: any, formRef: any, skipSm2: any) => {
        this.getGroup()
        const platform = getSessionStorage('PLATFORM')
        let currentApi = platform === 'portal' ? api.personalRegister : api.orgRegister
        let params = {
            ...data,
            preRandomKey: data.randomKey,
            sid: this.sid,
            groupId: this.groupId,
        }
        /** 标识门户注册来源 */
        if (platform === 'portal') {
            params.registerSource = '1'
        }
        await Http(currentApi, 'post', params)
            .then(async () => {
                this.done = false
                let account = data?.mobile
                // 密码为身份证号后六位 or 手机号后六位
                let password = (data?.idCardNo || data.mobile)?.slice(-6)
                // 获取公钥，对用户输入的密码加密 避免明文传输
                let sm2Result = skipSm2
                    ? { password }
                    : // @ts-ignore
                      await sm2Encrypt?.(getPublicKey, { password })
                let tempLoginParam: any = {
                    account,
                    appKey: 'WEB',
                    sid: this.sid,
                    ...sm2Result,
                    type: this.tabIndex,
                }

                if (getSessionStorage('EXTRA_TIME_STATUS')?.toString?.() === '1') {
                    //@ts-ignore
                    tempLoginParam = { ...tempLoginParam, extraTimeStatus: 1 }
                }

                Http(api.passwordLogin, 'post', { ...tempLoginParam }, { form: true }).then(res => {
                    this.done = false
                    const { success, data: resData, message: messageInfo }: any = res || {}
                    if (!success) {
                        dealErrMsg(messageInfo, formRef)
                    } else {
                        user?.updateUserAccount?.(resData, Number(this.tabIndex), 'register')
                    }
                })
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
