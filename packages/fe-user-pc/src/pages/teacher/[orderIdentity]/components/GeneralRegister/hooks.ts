import Http from '@/servers/http'
import { makeAutoObservable } from 'mobx'
// import { history } from 'umi'
import api from './api'
import { message, Modal } from 'antd'

import { CURRENT_STEP_TYPE } from './const'
import globalApi from '@/servers/globalApi'
import { getCookie, getLocalStorage, getSessionStorage } from '@/storage'
export default class forgetHooks {
    public apForm: any = null
    public codeEvent = []
    public codeEventTime = 60
    public codeBtnStr = '发送验证码'
    // 是否发送过验证码
    public done = false
    public randomKey = ''

    public currentForm: any = null
    public sid = getLocalStorage('SID') //站点id

    public authOpenId = '' //扫码登录的openId
    public authType = '' //扫码登录的类型 wx 或者 dd

    public veriCodeBtn = false //验证码按钮是否可点击
    // 步骤：1.获取验证码 2.完善身份信息
    public currentStep = CURRENT_STEP_TYPE.ACCOUNT

    // 存储个人注册信息
    public personObj: Record<string, string> = {}

    public groupId = ''

    constructor() {
        makeAutoObservable(this)
        this.getRandomKey()
        this.getFistGroupId()
    }

    /**
     *  改变 currentStep
     */
    changeStep = (e: any) => {
        this.currentStep = e
    }

    setRandomKey = (key: any) => {
        this.randomKey = key
    }

    setPersonObj = (data: any) => {
        this.personObj = data
        this.currentStep = CURRENT_STEP_TYPE.IDENTITY
        this.done = true
    }
    /**
     * 改变btn的状态
     * @param btn
     */
    changeBtn = (btn: boolean) => {
        // debugger
        this.veriCodeBtn = btn
    }

    getRandomKey = () => {
        this.randomKey = new Date().getTime() + Math.random().toString(36).slice(-8)
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
        const params = {
            appKey: 'WEB',
            groupId: this.groupId,
            mobile: account,
            randomKey: this.randomKey,
            verifyCode: verifyCode,
        }
        this.personObj = {
            ...params,
        }
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

    /**  是否有当前注册的身份  */
    isExitTeacher = async (value: any, user?: any, redirectUrl?: any) => {
        const { mobile, verifyCode } = value || {}

        if (!this.groupId) {
            await this.getFistGroupId()
        }

        const params = {
            appKey: 'WEB',
            groupId: this.groupId,
            mobile: mobile,
            randomKey: this.randomKey,
            verifyCode: verifyCode,
            identity: getCookie('SELECT_IDENTITY_CODE'),
        }
        this.personObj = {
            ...value,
            ...params,
        }

        Http(api.teacherVerify, 'post', params, { form: true }).then((res: any) => {
            const { success, data = {}, message: errMsg } = res || {}
            if (success) {
                user?.updateUserAccount?.(data, 4, 'register', undefined, redirectUrl)
            } else {
                message.error(errMsg)
            }
        })
    }

    /** 手机是否存在   */
    isExitPhone = async (sid: number, mobile: string) => {
        const res = await Http(
            api.isExistence,
            'get',
            { sid, phone: mobile },
            {
                repeatFilter: true,
            },
        )
        return res
    }

    // 获取第一个符合类型的 groupId
    getFistGroupId = async () => {
        // 指定站点1，类型为资源方
        const groupList: any = await Http(api.getGroupList, 'POST', {
            sid: 1,
            type: 4, //中心个人登录
        })

        if (groupList?.length) {
            this.groupId = groupList[0]?.id || ''
        } else {
            message.error('当前站点暂未开放资源方登录')
        }
    }

    /**  完善身份信息注册  */
    impInfoReg = async (value: any, user: any, redirectUrl: string, query: any) => {
        let params = {
            ...this.personObj,
            ...value,
            preRandomKey: this.randomKey,
            randomKey: this.randomKey,
            ...query,
            groupId: this.groupId,
            identity: getCookie('SELECT_IDENTITY_CODE'),
        }

        if (getSessionStorage('EXTRA_TIME_STATUS')?.toString?.() === '1') {
            params = { ...params, extraTimeStatus: 1 }
        }

        const data = await Http(api.teacherVerify, 'post', params, { form: true })

        const { success, messageCode, message: errMsg }: any = data || {}
        if (!success) {
            if (messageCode === '100010005') {
                Modal.confirm({
                    title: '身份证号已存在，请使用身份证号登录',
                    okText: '去登录',
                    centered: true,
                    cancelText: '取消',
                    onOk: () => {
                        const personMerchantRoute = getCookie('PERSON_MERCHANT_ROUTE')
                        if (this.authOpenId && this.authType) {
                            window.location.replace(
                                `/teacher/${personMerchantRoute}/login?authOpenId=${this.authOpenId}&authType=${this.authType}`,
                            )
                        } else {
                            window.location.replace(`/teacher/${personMerchantRoute}/login`)
                        }
                    },
                })
                return
            } else {
                message.error(errMsg)
            }
        } else {
            await user?.updateUserAccount?.(data?.data, 4, 'register', undefined, redirectUrl)
        }
    }
}
