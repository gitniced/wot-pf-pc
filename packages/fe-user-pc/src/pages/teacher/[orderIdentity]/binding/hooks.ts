import Http from '@/servers/http'
import { makeAutoObservable } from 'mobx'
import { history } from 'umi'
import api from './api'
import type SiteStore from '@/stores/siteStore'
import type UserStore from '@/stores/userStore'
import { message } from 'antd'
import type { UserAccount } from './interface'
import { findSiteData } from '@wotu/wotu-components'
import { USER_LOGIN_TYPE } from '@wotu/wotu-components/dist/esm/Types'
import { getCookie } from '@/storage'
// import type { groupListItem } from '@/types'
// import dealErrMsg from '@/utils/dealErr'

export default class bindHooks {
    public codeEvent = []
    public codeEventTime = 60
    public codeBtnStr = '发送验证码'
    public done = false
    public randomKey = ''

    public groupId: string | number = '' //用户组id

    public authOpenId = '' //扫码登录的openId
    public authType = '' //扫码登录的类型 wx 或者 dd
    public userType: string | number = '' //1个人 2机构 3资源方

    public veriCodeBtn = false //验证码按钮是否可点击

    constructor() {
        makeAutoObservable(this)
        this.getRandomKey()
    }

    /**
     * 改变btn的状态
     * @param btn
     */
    changeBtn = (btn: boolean) => {
        this.veriCodeBtn = btn
    }

    getRandomKey = () => {
        this.randomKey = new Date().getTime() + Math.random().toString(36).slice(-8)
    }

    serverVerify = (ticket: string, randstr: string) => {
        return Http(
            'https://api.cloud.wozp.cn/captcha/ticket/validate',
            'post',
            { ticket, randstr }, //data中携带ticket和randstr
            { ticket: ticket }, //headers中携带ticket
        )
    }

    getCode = async (account?: string) => {
        if (this.codeEventTime === 60) {
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
     * 获取用户组id
     * @param groupList 从siteStore中获取的用户组列表
     */
    getGroup = async (type: string) => {
        if (Number(type) === 4) {
            // 指定站点1，类型为资源方
            const groupList: any = await Http(api.getGroup, 'POST', {
                sid: 1,
                type: 4, //中心个人登录
            })
            if (groupList?.length) {
                this.groupId = groupList[0]?.id || ''
            } else {
                message.error('当前站点暂未开放资源方登录')
            }
        } else {
            message.error('暂未开放资源方登录')
        }
    }

    /**
     *  绑定
     * this.tabIndex  1个人 2机构 4个人资源方
     * @param form  form表单数据
     * @param site  site站点信息
     * @param user user用户信息
     * @param formRef formRef实例
     */
    bindHandler = async (form: any, site: SiteStore, user: UserStore) => {
        const { siteData = {} } = site || {}
        let sid = findSiteData(siteData, 'sid', { findKey: 'baseInfo' }) || ''

        if (!this.done) {
            this.done = true
            let { account, verifyCode } = form

            let tempForgetParam = {
                sid,
                phone: account,
                randomKey: this.randomKey,
                groupId: this.groupId, //用户组id
                appKey: 'WEB',
                verifyCode,
                type: this.userType,
                openId: this.authOpenId,
                authType: this.authType,
            }

            await Http(api.binding, 'post', { ...tempForgetParam })
                .then(data => {
                    const { registerFlag, accessToken, userCode } = data || {}

                    if (registerFlag && Number(this.userType) === USER_LOGIN_TYPE.PERSON_TEACHER) {
                        this.done = false
                        message.success('绑定成功')
                        let _data: UserAccount = {
                            ...data,
                            accessToken,
                            appKey: 'web',
                            userCode,
                            sid,
                        }

                        user.updateUserAccount(_data, Number(this.userType), 'register')
                    } else {
                        const personMerchantRoute = getCookie('PERSON_MERCHANT_ROUTE')
                        //个人授权登录未注册过 前往完善身份信息 将当前页面的账号和验证码信息传递过去
                        history.replace(
                            `/teacher/${personMerchantRoute}/register?type=${this.userType}&mobile=${account}&authOpenId=${this.authOpenId}&authType=${this.authType}&preRandomKey=${this.randomKey}&verifyCode=${verifyCode}`,
                        )
                    }
                })
                .catch(() => {
                    this.done = false
                })
        }
    }

    /**
     * 获取扫码后的openId和authType
     * @param openId
     * @param authType
     */
    getAuth = (openId: string, authType: string, type: number) => {
        this.authOpenId = openId
        this.authType = authType
        this.userType = Number(type)
    }
}
