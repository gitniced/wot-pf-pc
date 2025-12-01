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
import type { groupListItem } from '@/types'
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
    getGroup = async (groupList: groupListItem[]) => {
        const selectedItem = groupList.find(item => item.type === Number(this.userType))
        if (selectedItem) {
            this.groupId = selectedItem.id
        }
    }

    /**
     *  绑定
     * this.tabIndex  1个人 2机构
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
                    const { registerFlag, accessToken, userCode, hasOrgFlag } = data || {}

                    // 注册标识 为true时，表示已经注册过，
                    // 已经注册过或者是机构授权登录 直接走登录流程
                    if (registerFlag || Number(this.userType) === USER_LOGIN_TYPE.ORG_LOGIN) {
                        this.done = false
                        message.success('绑定成功')
                        let _data: UserAccount = {
                            ...data,
                            accessToken,
                            appKey: 'web',
                            userCode,
                            sid,
                        }
                        /** 特殊逻辑
                         * 电子社保卡 registerFlag 一直为 true 根据是否有组织 hasOrgFlag 判断传参
                         * 电子社保卡的机构绑定后 没有机构 需要走创建机构  */
                        user.updateUserAccount(
                            _data,
                            Number(this.userType),
                            this.authType === 'ess' && !hasOrgFlag ? 'register' : undefined,
                        )
                    } else {
                        //个人授权登录未注册过 前往完善身份信息 将当前页面的账号和验证码信息传递过去
                        history.replace(
                            `/user/register?type=${this.userType}&account=${account}&authOpenId=${this.authOpenId}&authType=${this.authType}&preRandomKey=${this.randomKey}&verifyCode=${verifyCode}`,
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
