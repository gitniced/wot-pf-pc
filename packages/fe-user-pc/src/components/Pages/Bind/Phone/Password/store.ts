import { makeAutoObservable } from 'mobx'
import { bindMobileApi, sendVerifyCodeApi, serverVerifyApi, verifyPasswordApi } from './api'
import { message } from 'antd'
// @ts-ignore
import { history } from 'umi'
import type { VerifyPasswordParams } from './interface'

class Store {
    constructor() {
        makeAutoObservable(this)
    }

    public stepIndex: number = 0

    public loading: boolean = false

    public codeEvent: number[] = []
    public codeEventTime: number = 60
    public codeBtnStr = '发送验证码'

    public randomKey: string | undefined

    getRandomKey = () => {
        const randomKey = new Date().getTime() + Math.random().toString(36).slice(-8)
        this.randomKey = randomKey
    }

    // 密码校验
    verifyPassword = (paramas: VerifyPasswordParams) => {
        verifyPasswordApi(paramas).then((res: any) => {
            if (!res) {
                return message.error('密码输入错误')
            }
            this.stepIndex = 1
        })
    }

    // 手机号码绑定
    bindMobile = (values: { mobile: string; verifyCode: string }, callback?: () => void) => {
        if (this.randomKey) {
            this.loading = true

            bindMobileApi({ ...values, randomKey: this.randomKey })
                .then(() => {
                    message.success('手机号绑定成功')
                    callback?.()
                    history.replace('/bind')
                })
                .finally(() => {
                    this.loading = false
                })
        } else {
            message.error('请先获取验证码')
        }
    }

    // 发送验证码倒计时
    doCodeEvent = () => {
        this.codeEvent.map((i: number) => {
            window.clearInterval(i)
        })

        this.codeEvent = []

        this.codeBtnStr = `(${this.codeEventTime}S)重新发送`
        const codeEventItem = window.setInterval(() => {
            this.codeEventTime--
            if (this.codeEventTime !== 0) {
                this.codeBtnStr = `(${this.codeEventTime}S)重新发送`
            } else {
                this.codeEvent.map((i: number) => {
                    window.clearInterval(i)
                })
                this.codeBtnStr = `发送验证码`
                this.codeEventTime = 60
            }
        }, 1000)
        this.codeEvent.push(codeEventItem)
    }
    // 获取验证码
    getVerifyCode = (mobile: string) => {
        // 生成randomKey
        this.getRandomKey()

        if (this.codeEventTime === 60) {
            sendVerifyCodeApi({
                account: mobile,
                key: this.randomKey,
            }).then(() => {
                this.doCodeEvent()
            })
        }
    }

    // 滑块验证
    serverVerify = (ticket: string, randstr: string) => {
        return serverVerifyApi(ticket, randstr)
    }
}

export default Store
