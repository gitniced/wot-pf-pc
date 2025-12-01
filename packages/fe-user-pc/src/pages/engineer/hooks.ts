import Http from '@/servers/http'
import type SiteStore from '@/stores/siteStore'
import type UserStore from '@/stores/userStore'
import { getPublicKey, SM2_ERROR_CODE } from '@/utils/getPublicKey'
import { sm2Encrypt } from '@wotu/wotu-components'
import { message } from 'antd'
import { makeAutoObservable } from 'mobx'
import api from './api'
import { ENGINEER_LOGIN_IDENTITY } from './const'
import { setCookie } from '@/storage'

export default class EngineerLoginHooks {
    public apForm: any = null
    public done: boolean = false
    public codeKey: string = ''
    public codeEvent: number[] = []
    public codeEventTime = 60
    public codeBtnStr: string = '发送验证码'
    public randomKey: string = ''

    public currentForm: any = null

    public loginTypes = 1
    public loginIdentity: ENGINEER_LOGIN_IDENTITY = ENGINEER_LOGIN_IDENTITY.student
    public tabIndex: number = 1

    public personList: string[] = []
    public orgList: string[] = []

    constructor() {
        makeAutoObservable(this)
        this.getRandomKey()
    }

    /**
     * 遍历配置项判断是否启用微信登录
     */
    mapConfigList = (siteData: any) => {
        const configList = siteData?.data?.configList || []

        const lists: Record<string, string[]> = {
            personList: [],
            orgList: [],
        }

        configList.forEach((item: any) => {
            if (['login_personal_method5'].includes(item.key)) {
                lists.personList.push(item.key)
            }
            if (['login_org_method5'].includes(item.key)) {
                lists.orgList.push(item.key)
            }
        })

        this.personList = lists.personList
        this.orgList = lists.orgList
    }

    setLoginType = (type: number) => {
        this.loginTypes = type
    }

    setLoginIdentity = (identity: ENGINEER_LOGIN_IDENTITY) => {
        this.loginIdentity = identity
        this.tabIndex = 1
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
     * 密码登录
     */
    passwordLogin = async (
        form: any,
        site: SiteStore,
        user: UserStore,
        formRef: any,
        skipSm2?: boolean,
    ) => {
        if (this.done) return
        this.done = true

        const { account, password } = form

        // @ts-ignore
        let sm2Result = skipSm2 ? { password } : await sm2Encrypt?.(getPublicKey, { password })

        const tempLoginParam = {
            account,
            appKey: 'WEB',
            sid: site?.siteData?.data?.sid || 1153,
            type: this.tabIndex,
            ...sm2Result,
        }

        Http(api.passwordLogin, 'post', { ...tempLoginParam }, { form: true })
            .then((res: any) => {
                const { success, data, messageCode, message: messageInfo } = res || {}
                if (!success) {
                    this.done = false
                    if (messageCode === SM2_ERROR_CODE && !skipSm2) {
                        this.passwordLogin(form, site, user, formRef, true)
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
                    this.handleLoginSuccess(data, user)
                }
            })
            .catch(() => {
                this.done = false
            })
    }

    /**
     * 验证码登录
     */
    codeLogin = async (form: any, site: SiteStore, user: UserStore, formRef: any) => {
        if (this.done) return
        this.done = true

        const { account, verifyCode } = form

        const tempLoginParam = {
            account,
            appKey: 'WEB',
            randomKey: this.randomKey,
            verifyCode,
            sid: site?.siteData?.data?.sid || 1153,
            type: this.tabIndex,
        }

        Http(api.codeLogin, 'post', { ...tempLoginParam }, { form: true })
            .then((res: any) => {
                const { success, data, message: messageInfo } = res || {}
                if (!success) {
                    this.done = false
                    let fieldErrors = messageInfo.split(':')
                    let [errKey, errMsg] = fieldErrors
                    if (errKey && errMsg) {
                        formRef.setFields([{ name: errKey, errors: [errMsg] }])
                    } else {
                        message.error(messageInfo)
                    }
                } else {
                    this.handleLoginSuccess(data, user)
                }
            })
            .catch(() => {
                this.done = false
            })
    }

    /**
     * 处理登录成功后的逻辑
     */
    handleLoginSuccess = async (data: any, user: UserStore) => {
        try {
            // 先更新用户账户信息但不跳转（设置token等基础信息）
            await user.updateUserAccount(data, Number(this.tabIndex), 'noJump')

            // 根据身份调用不同的API
            let userInfo: any = null

            if (this.loginIdentity === ENGINEER_LOGIN_IDENTITY.teacher) {
                // 教师身份，调用教师检查API
                userInfo = await Http(api.checkAndGetTeacher, 'post', {})
                console.log('教师信息:', userInfo)
            } else if (this.loginIdentity === ENGINEER_LOGIN_IDENTITY.student) {
                // 学生身份，调用学生检查API
                userInfo = await Http(api.checkAndGetStudent, 'post', {})
                console.log('学生信息:', userInfo)
            }

            if (userInfo && userInfo.organizationCode) {
                // 设置机构代码
                setCookie('SELECT_ORG_CODE', userInfo.organizationCode)
                console.log('已设置机构代码:', userInfo.organizationCode)
            } else {
                user.initStore()
                return
            }

            // 最后触发跳转逻辑
            await user.updateUserAccount(data, Number(this.tabIndex))
        } catch (error) {
            user.initStore()
            console.error('处理登录成功逻辑时出错:', error)
        }
    }

    /**
     * 登录处理
     */
    loginHandler = async (
        form: any,
        site: SiteStore,
        user: UserStore,
        formRef: any,
        skipSm2?: boolean,
    ) => {
        if (this.loginTypes === 1) {
            this.passwordLogin(form, site, user, formRef, skipSm2)
        } else {
            this.codeLogin(form, site, user, formRef)
        }
    }

    /**
     * 验证码服务端验证
     */
    serverVerify = (ticket: string, randstr: string) => {
        this.getRandomKey()
        const account = this.apForm?.getFieldValue?.('account') || ''
        return Http(
            api.sendCodeValidate,
            'post',
            { account, ticket, randstr, key: this.randomKey, type: 3 },
            // @ts-ignore
            { ticket: ticket },
        )
    }

    bindForm = (form: any) => {
        this.apForm = form
    }
}
