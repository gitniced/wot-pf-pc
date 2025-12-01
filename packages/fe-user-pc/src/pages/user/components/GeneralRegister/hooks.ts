import Http from '@/servers/http'
import dealErrMsg from '@/utils/dealErr'
import { makeAutoObservable } from 'mobx'
// import { history } from 'umi'
import api from './api'
import { message, Modal } from 'antd'
import { getPublicKey, SM2_ERROR_CODE } from '@/utils/getPublicKey'
import { sm2Encrypt } from '@wotu/wotu-components'

import { CURRENT_STEP_TYPE, Type } from './const'
import globalApi from '@/servers/globalApi'
import { history } from 'umi'
import { getLocalStorage } from '@/storage'
import type { groupObj, RegisterProps } from './interface'
export default class forgetHooks {
    public apForm: any = null
    public tabIndex: Type = Type.PERSONAL //1个人注册  2机构入驻
    public codeEvent = []
    public codeEventTime = 60
    public codeBtnStr = '发送验证码'
    // 是否发送过验证码
    public done = false
    public randomKey = ''

    public currentForm: any = null
    public sid = getLocalStorage('SID') //站点id
    public groupId: string | number = '' //用户组id

    public authOpenId = '' //扫码登录的openId
    public authType = '' //扫码登录的类型 wx 或者 dd

    public veriCodeBtn = false //验证码按钮是否可点击
    // 步骤：1.获取验证码 2.完善身份信息
    public currentStep = CURRENT_STEP_TYPE.ACCOUNT

    // 存储个人注册信息
    public personObj: Record<string, string> = {}

    constructor() {
        makeAutoObservable(this)
        this.getRandomKey()
    }

    /**
     * 改变btn的状态
     * @param btn
     */
    changeBtn = (btn: boolean) => {
        // debugger
        this.veriCodeBtn = btn
    }

    //判断是个人注册还是机构入驻
    getTabIndex = (idx: Type) => {
        this.tabIndex = idx
    }

    getRandomKey = () => {
        this.randomKey = new Date().getTime() + Math.random().toString(36).slice(-8)
    }

    setRandomKey = (key: any) => {
        this.randomKey = key
    }

    setPersonObj = (data: any) => {
        this.personObj = data
        this.currentStep = CURRENT_STEP_TYPE.IDENTITY
        this.done = true
    }

    serverVerify = (ticket: string, randstr: string) => {
        this.getRandomKey()
        const account = this.apForm?.getFieldValue?.('mobile') || ''
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

    getCode = async () => {
        this.done = true
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
     *  机构注册 前置
     * this.tabIndex  1个人 2机构
     */
    orgRegister = async (argument: RegisterProps) => {
        if (this.done) {
            let { mobile, verifyCode } = argument.formValues || {}

            let tempForgetParam = {
                mobile,
                randomKey: this.randomKey,
                verifyCode,
            }

            await this.handleRegister({
                ...argument,
                formValues: tempForgetParam,
            })
        }
    }

    /**
     * @name 个人注册前置处理
     *
     * @param {*} form
     * @memberof forgetHooks
     */
    personalRegister = async (argument: RegisterProps) => {
        let { formValues } = argument || {}
        let { mobile, verifyCode } = formValues || {}

        if (this.currentStep === CURRENT_STEP_TYPE.ACCOUNT) {
            // 第一步 验证验证码是否正确 并收集信息
            let verifyRes = await this.verifyValidate(mobile, verifyCode)
            if (!verifyRes) return
            this.personObj = {
                ...formValues,
                preRandomKey: this.randomKey,
                randomKey: this.randomKey,
            }
            this.currentStep = CURRENT_STEP_TYPE.IDENTITY
        } else {
            // 第二步 收集身份信息 注册
            await this.handleRegister({
                ...argument,
                formValues: {
                    ...formValues,
                    ...this.personObj,
                },
            })
        }
    }

    /**
     *@name 注册
     *
     * @param {*} form
     * @param {SiteStore} site
     * @param {UserStore} user
     * @param {*} formRef
     *
     */

    handleRegister = async (argument: RegisterProps) => {
        let { formValues, query, formRef } = argument || {}
        let currentApi = this.tabIndex === Type.PERSONAL ? api.personalRegister : api.orgRegister
        // authOpenId存在说明是授权绑定后的注册，需要携带绑定时的手机号、randomKey和verifyCode
        let { preRandomKey, verifyCode, account } = query || {}
        let bindVerify = this.authOpenId
            ? { mobile: account, preRandomKey, verifyCode, randomKey: preRandomKey }
            : {}
        await Http(
            currentApi,
            'post',
            {
                ...formValues,
                sid: this.sid,
                groupId: this.groupId, //用户组id
                authOpenId: this.authOpenId,
                authType: this.authType,
                preRandomKey: formValues?.randomKey,
                ...bindVerify,
            },
            { form: true },
        )
            .then(res => {
                const { success, message: messages, messageCode }: any = res || {}
                if (!success) {
                    if (messageCode === '100010005') {
                        Modal.confirm({
                            title: '身份证号已存在，请使用身份证号登录',
                            okText: '去登录',
                            centered: true,
                            cancelText: '取消',
                            onOk: () => {
                                let {
                                    location: { pathname, search },
                                } = history
                                pathname = pathname.replace('register', 'login')
                                window.location.replace(pathname + search)
                            },
                        })

                        return
                    }
                    dealErrMsg(messages, formRef)
                } else {
                    this.done = false
                    this.loginHandler(argument)
                }
            })
            .catch(() => {
                this.done = false
                message.error('注册失败')
            })
    }

    /**
     *  注册成功后直接调登录方法 (账号密码登录)
     * @param argument.form form表单数据
     * @param argument.site site站点信息
     * @param argument.user user用户信息
     * @param argument.formRef formRef表单ref实例
     * @param skipSm2 是否跳过isSm2加密登录 默认为false ，为true时直接明文登录
     */
    loginHandler = async (argument: RegisterProps, skipSm2?: boolean) => {
        let { formValues, user, formRef, query } = argument || {}

        // 账号为query中的account or表单收集的手机号
        let account = formValues?.mobile || query?.account
        // 密码为身份证号后六位 or 手机号后六位
        let password = (formValues?.idCardNo || formValues.mobile)?.slice(-6)
        // 获取公钥，对用户输入的密码加密 避免明文传输
        let sm2Result = skipSm2 ? { password } : await sm2Encrypt?.(getPublicKey, { password })
        let tempLoginParam = {
            account,
            appKey: 'WEB',
            sid: this.sid,
            ...sm2Result,
            type: this.tabIndex,
            authOpenId: this.authOpenId,
            authType: this.authType,
        }
        let requestApi = api.passwordLogin

        Http(requestApi, 'post', { ...tempLoginParam }, { form: true })
            .then(res => {
                this.done = false

                const { success, data, message: messageInfo, messageCode }: any = res || {}
                if (!success) {
                    if (messageCode === SM2_ERROR_CODE && !skipSm2) {
                        // 加密错误 使用明文登录
                        this.loginHandler(argument, true)
                        return
                    }
                    dealErrMsg(messageInfo, formRef)
                } else {
                    user?.updateUserAccount?.(data, Number(this.tabIndex), 'register')
                }
            })
            .catch(() => {
                this.done = false
            })
    }

    /**

     * 获取用户组id
     * @param groupList 从siteStore中获取的用户组列表
     */
    getGroup = async (groupList: groupObj[]) => {
        const selectedItem = groupList.find(item => item.type === Number(this.tabIndex))
        if (selectedItem) {
            this.groupId = selectedItem.id
        }
    }

    /**
     * 获取扫码后的openId和authType
     * @param openId
     * @param authType
     */
    getAuth = (openId: string, authType: string) => {
        this.authOpenId = openId
        this.authType = authType
        this.currentStep = CURRENT_STEP_TYPE.IDENTITY
        this.done = true
    }

    /**
     * @name 验证验证码是否正确
     *
     * @param {string} acount
     * @param {string} verifyCode
     * @memberof forgetHooks
     */
    verifyValidate = async (account: string, verifyCode: string) => {
        const res = (await Http(
            globalApi.verifyValidate,
            'post',
            {
                account,
                verifyCode,
                key: this.randomKey,
            },
            {
                form: true,
            },
        )) as unknown as {
            success: boolean
            message: string
        }
        if (res?.success) {
            return true
        } else {
            message.error(res?.message)
            return false
        }
    }
}
