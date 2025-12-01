import Http from '@/servers/http'
import { message } from 'antd'
// import type SiteStore from '@/stores/siteStore'
// import type UserStore from '@/stores/userStore'
import { makeAutoObservable } from 'mobx'
import { history } from 'umi'
// import { history } from 'umi'
import api from './api'

export default class emailHooks {
    public createCodeKey = ''
    public createCodeEvent = []
    public createCodeEventTime = 60
    public createCodeBtnStr = '发送验证码'
    public oldCodeKey = ''
    public oldCodeEvent = []
    public oldCodeEventTime = 60
    public oldCodeBtnStr = '发送验证码'
    public newCodeKey = ''
    public newCodeEvent = []
    public newCodeEventTime = 60
    public newCodeBtnStr = '发送验证码'
    public stepIndex = 0

    public bindModalVisible = false

    public randomKeyCreate = ''
    public currentFormCreate: any = null

    public randomKeyOld = ''
    public currentFormOld: any = null

    public randomKeyNew = ''
    public currentFormNew: any = null

    public currentType = 'old'
    public btnLoading: boolean = false
    public oldBtnLoading: boolean = false
    public newBtnLoading: boolean = false

    constructor() {
        makeAutoObservable(this)
        this.getRandomKey('randomKeyCreate')
        this.getRandomKey('randomKeyOld')
        this.getRandomKey('randomKeyNew')
    }

    getRandomKey = (key: string) => {
        this[key] = new Date().getTime() + Math.random().toString(36).slice(-8)
    }


    getCode = async (mobile: string, type: string) => {
        let randomKey: string = ''

        try {
            if (type === 'old') {
                this.getRandomKey('randomKeyOld')
                randomKey = this.randomKeyOld
            } else if (type === 'create') {
                this.getRandomKey('randomKeyCreate')
                randomKey = this.randomKeyCreate
            } else {
                this.getRandomKey('randomKeyNew')
                randomKey = this.randomKeyNew
            }
            if (this[`${type}CodeEventTime`] === 60) {
                await Http(api.getCode, 'post', { account: mobile, key: randomKey })

                this.doCodeEvent(type)
            }
        } catch (error) {
            console.log(error)
        }
    }

    doCodeEvent = (key: string) => {
        this[`${key}CodeEvent`].map(i => {
            window.clearInterval(i)
        })
        this[`${key}CodeEvent`] = []
        this[`${key}CodeBtnStr`] = `(${this[`${key}CodeEventTime`]})重新发送`
        const codeEventItem = window.setInterval(() => {
            this[`${key}CodeEventTime`]--
            if (this[`${key}CodeEventTime`] !== 0) {
                this[`${key}CodeBtnStr`] = `(${this[`${key}CodeEventTime`]})重新发送`
            } else {
                this[`${key}CodeEvent`].map(i => {
                    window.clearInterval(i)
                })
                this[`${key}CodeBtnStr`] = `发送验证码`
                this[`${key}CodeEventTime`] = 60
            }
        }, 1000)
        this[`${key}CodeEvent`].push(codeEventItem)
    }

    bindEmail = async (value: any, form: any, callback: () => void) => {
        if (this.randomKeyCreate) {
            this.btnLoading = true
            const { account, verifyCode } = value
            Http(api.bindEmail, 'post', {
                email: account,
                verifyCode,
                randomKey: this.randomKeyCreate,
            })
                .then(() => {
                    this.btnLoading = false
                    message.success('邮箱绑定成功')
                    callback()
                    history.replace('/bind')
                })
                .catch(() => {
                    this.btnLoading = false
                })
        } else {
            message.error('请先获取验证码')
        }
    }

    verifyOld = (value: any) => {
        if (this.randomKeyOld) {
            const { account, verifyCode } = value
            this.oldBtnLoading = true
            Http(api.verfiyCode, 'post', {
                account,
                verifyCode,
                key: this.randomKeyOld,
            })
                .then(() => {
                    this.stepIndex++
                    this.oldBtnLoading = false
                })
                .catch(() => {
                    this.oldBtnLoading = false
                })
        } else {
            message.error('请先获取验证码')
        }
    }

    verifyNew = async (value: any, callback: () => void) => {
        if (this.randomKeyNew) {
            const { account, verifyCode } = value
            this.newBtnLoading = true
            Http(api.bindEmail, 'post', {
                email: account,
                verifyCode,
                randomKey: this.randomKeyNew,
                preRandomKey: this.randomKeyOld,
            })
                .then(() => {
                    message.success('邮箱绑定成功')
                    callback()
                    this.newBtnLoading = false
                    history.replace('/bind')
                })
                .catch(() => {
                    this.newBtnLoading = false
                })
        } else {
            message.error('请先获取验证码')
        }
    }

    serverVerify = (ticket: string, randstr: string) => {
        return Http(
            'https://api.cloud.wozp.cn/captcha/ticket/validate',
            'post',
            { ticket, randstr }, //data中携带ticket和randstr
            { ticket: ticket }, //headers中携带ticket
        )
    }
}
