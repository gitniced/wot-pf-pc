import Http from '@/servers/http'
import { message } from 'antd'
import { makeAutoObservable } from 'mobx'
import { history } from 'umi'
import api from './api'

export default class editHooks {
    [key: string]: any
    public oldCodeKey: string | undefined
    public oldCodeEvent = []
    public oldCodeEventTime = 60
    public oldCodeBtnStr = '发送验证码'
    public newCodeKey: string | undefined
    public newCodeEvent = []
    public newCodeEventTime = 60
    public newCodeBtnStr = '发送验证码'
    public stepIndex = 0

    public randomKeyOld: string | undefined
    public currentFormOld: any = null

    public randomKeyNew: string | undefined
    public currentFormNew: any = null

    public currentType = 'old'

    public oldBtnLoading: boolean = false //查询按钮loading状态
    public newBLoading: boolean = false //查询按钮loading状

    constructor() {
        makeAutoObservable(this)
        this.getRandomKey('randomKeyOld')
        this.getRandomKey('randomKeyNew')
    }

    getRandomKey = (key: string) => {
        const randomKey = new Date().getTime() + Math.random().toString(36).slice(-8)

        key === 'randomKeyOld' ? (this.randomKeyOld = randomKey) : (this.randomKeyNew = randomKey)
    }

    getCode = async (mobile: string, type: string) => {
        let randomKey: string | undefined

        try {
            if (type === 'old') {
                this.getRandomKey('randomKeyOld')
                randomKey = this.randomKeyOld
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
        this[`${key}CodeEvent`].map((i: number) => {
            window.clearInterval(i)
        })
        this[`${key}CodeEvent`] = []
        this[`${key}CodeBtnStr`] = `(${this[`${key}CodeEventTime`]})重新发送`
        const codeEventItem = window.setInterval(() => {
            this[`${key}CodeEventTime`]--
            if (this[`${key}CodeEventTime`] !== 0) {
                this[`${key}CodeBtnStr`] = `(${this[`${key}CodeEventTime`]})重新发送`
            } else {
                this[`${key}CodeEvent`].map((i: number) => {
                    window.clearInterval(i)
                })
                this[`${key}CodeBtnStr`] = `发送验证码`
                this[`${key}CodeEventTime`] = 60
            }
        }, 1000)
        this[`${key}CodeEvent`].push(codeEventItem)
    }

    verifyOld = (value: any) => {
        if (this.randomKeyOld) {
            const { mobile, verifyCode } = value
            this.oldBtnLoading = true
            Http(
                api.verfiyCode,
                'post',
                {
                    account: mobile,
                    verifyCode,
                    key: this.randomKeyOld,
                },
                { form: true },
            )
                .then((res: any) => {
                    this.oldBtnLoading = false
                    const { success } = res
                    if (!success) {
                        message.error(res.message)
                    } else {
                        this.stepIndex++
                    }
                })
                .catch(() => {
                    this.oldBtnLoading = false
                })
        } else {
            message.error('请先获取验证码')
        }
    }

    verifyNew = (value: any, callback?: () => void) => {
        if (this.randomKeyNew) {
            const { mobile, verifyCode } = value
            this.newBLoading = true
            Http(
                api.bindMobile,
                'post',
                {
                    mobile,
                    verifyCode,
                    randomKey: this.randomKeyNew,
                    preRandomKey: this.randomKeyOld,
                },
                { form: true },
            )
                .then((res: any) => {
                    this.newBLoading = false
                    const { success } = res
                    if (!success) {
                        message.error(res.message)
                    } else {
                        message.success('手机号绑定成功')
                        callback?.()
                        history.replace('/bind')
                    }
                })
                .catch(() => {
                    this.newBLoading = false
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
            // @ts-ignore
            { ticket }, //headers中携带ticket
        )
    }
}
