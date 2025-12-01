import Http from '@/servers/http'
import type { SiteData } from '@/types'
import { getPublicKey, SM2_ERROR_CODE } from '@/utils/getPublicKey'
import { sm2Encrypt } from '@wotu/wotu-components'
import { message } from 'antd'
import { makeAutoObservable } from 'mobx'
import { history } from 'umi'
import api from './api'
import { getLocalStorage } from '@/storage'

export default class forgetHooks {
    public apForm: any = null
    public codeKey = ''
    public tabIndex = 1
    public codeEvent = []
    public codeEventTime = 60
    public codeBtnStr = '发送验证码'
    public done = false
    public randomKey = ''
    public currentForm: any = null

    constructor() {
        makeAutoObservable(this)
        this.getRandomKey()
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
     * @name 忘记密码
     * @param {*} formRef
     * @param {*} form
     * @param {SiteData} site
     * @params skipSm2:是否跳过isSm2加密登录 默认为false ，为true时直接明文登录
     */
    forgetHandler = async (formRef: any, form: any, site: SiteData, skipSm2?: boolean) => {
        if (!this.done) {
            this.done = true
            const { account, password, passwordRepeat, verifyCode } = form
            let { data } = site || {}
            data = data || {}
            let { sid } = data

            let tempForgetParam = {}

            // 获取公钥，对用户输入的密码加密 避免明文传输
            let passwordObj = { password, passwordRepeat }
            let sm2Result = skipSm2 ? passwordObj : await sm2Encrypt?.(getPublicKey, passwordObj)
            tempForgetParam = {
                account,
                randomKey: this.randomKey,
                sid,
                verifyCode,
                ...sm2Result,
            }

            await Http(api.reset, 'post', { ...tempForgetParam }, { form: true })
                .then(res => {
                    this.done = false
                    const { success, messageCode } = res || {}
                    if (!success) {
                        if (messageCode === SM2_ERROR_CODE && !skipSm2) {
                            // 加密错误时 使用明文登录
                            this.forgetHandler(formRef, form, site, true)
                            return
                        }
                        message.error(res.message)
                    } else {
                        history.replace('/user/login')
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
            { account, ticket, randstr, key: this.randomKey, type: 5, sid: getLocalStorage('SID') }, //data中携带ticket和randstr
            // @ts-ignore
            { ticket: ticket }, //headers中携带ticket
        )
    }

    bindForm = (form: any) => {
        this.apForm = form
    }
}
