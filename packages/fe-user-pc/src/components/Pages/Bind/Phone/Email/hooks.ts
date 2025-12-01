import Http from '@/servers/http'
import { message } from 'antd'
import { makeAutoObservable } from 'mobx'
import { history } from 'umi'
import api from './api'

export default class editHooks {
    [key: string]: any
    public oldCodeKey = ''
    public oldCodeEvent = []
    public oldCodeEventTime = 60
    public oldCodeBtnStr = '发送验证码'
    public newCodeKey = ''
    public newCodeEvent = []
    public newCodeEventTime = 60
    public newCodeBtnStr = '发送验证码'
    public stepIndex = 0

    public randomKeyOld = ''
    public currentFormOld: any = null

    public randomKeyNew = ''
    public currentFormNew: any = null

    public oldBtnLoading: boolean = false //查询按钮loading状态
    public newBLoading: boolean = false //查询按钮loading状态

    public currentType = 'old'

    constructor() {
        makeAutoObservable(this)
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

    getCustomKey = () => {
        let customKey = ''
        for (let i = 0; i < 10; i++) {
            customKey += String(Math.floor(Math.random() * 10))
        }
        return customKey
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
                        message.success('手机号换绑成功')
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
