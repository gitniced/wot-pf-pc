import Http from '@/servers/http'
import { message } from 'antd'
import { makeAutoObservable } from 'mobx'
import { useLocation } from 'umi'
import api from './api'

export default class createHooks {
    public createCodeKey = ''
    public createCodeEvent: number[] = []
    public createCodeEventTime = 60
    public createCodeBtnStr = '发送验证码'
    public randomKey = ''
    loadingBtn: boolean = false

    public currentForm: any = null
    public queryObj: any = useLocation()

    constructor() {
        makeAutoObservable(this)
        console.log('👉 query:any', this.queryObj.query.first)

        this.getRandomKey()
    }

    getRandomKey = () => {
        this.randomKey = new Date().getTime() + Math.random().toString(36).slice(-8)
    }

    getCode = async (account: string) => {
        if (this.createCodeEventTime === 60) {
            try {
                this.getRandomKey()
                await Http(api.getCode, 'post', { account, key: this.randomKey })
                this.doCodeEvent()
            } catch (error) {
                console.log(error)
            }
        }
    }

    doCodeEvent = () => {
        this.createCodeEvent.map(i => {
            window.clearInterval(i)
        })
        this.createCodeEvent = []
        this.createCodeBtnStr = `(${this.createCodeEventTime})重新发送`
        const codeEventItem = window.setInterval(() => {
            this.createCodeEventTime--
            if (this.createCodeEventTime !== 0) {
                this.createCodeBtnStr = `(${this.createCodeEventTime})重新发送`
            } else {
                this.createCodeEvent.map(i => {
                    window.clearInterval(i)
                })
                this.createCodeBtnStr = `发送验证码`
                this.createCodeEventTime = 60
            }
        }, 1000)
        this.createCodeEvent.push(codeEventItem)
    }

    bindMobile = async (value: any) => {
        this.loadingBtn = true

        const { mobile, verifyCode } = value
        await Http(api.bindMobile, 'post', {
            mobile,
            verifyCode,
            randomKey: this.randomKey,
        }).finally(() => {
            this.loadingBtn = false
        })
        message.success('手机号换绑成功')
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
