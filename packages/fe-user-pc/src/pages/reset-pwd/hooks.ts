import Http from '@/servers/http'
import { LOGIN_TYPE_STR_TO_NUM, USER_LOGIN_TYPE } from '@wotu/wotu-components/dist/esm/Types'
import { makeAutoObservable } from 'mobx'
import api from './api'

import { message } from 'antd'
import { setCookie } from '@/storage/cookie'
import { getPublicKey, SM2_ERROR_CODE } from '@/utils/getPublicKey'
import { sm2Encrypt } from '@wotu/wotu-components'
import Cookies from 'js-cookie'
import { getLocalStorage } from '@/storage'

export default class forgetHooks {
    public codeKey = ''
    public codeEvent = []
    public codeEventTime = 60
    public codeBtnStr = '发送验证码'
    public done = false
    public randomKey = ''
    public userStore: Record<string, any> = {}
    public sourceType = ''
    public siteStore: any = {}
    constructor() {
        makeAutoObservable(this)
        this.getRandomKey()
    }

    setUserStore(userStore: Record<string, any>, siteStore: any) {
        this.userStore = userStore
        this.siteStore = siteStore
    }

    setSourceType(type: string) {
        this.sourceType = type
    }

    /**
     *@name 重新登录
     *
     * @param {boolean} [skipSm2] 是否跳过isSm2加密登录 默认为false ，为true时直接明文登录
     * @memberof forgetHooks
     */
    resetLogin = async (skipSm2: boolean, passwordObj: any) => {
        // 获取公钥，对用户输入的密码加密 避免明文传输
        let sm2Result = skipSm2 ? passwordObj : await sm2Encrypt?.(getPublicKey, passwordObj)
        return Http(
            api.passwordLogin,
            'POST',
            {
                account: this.userStore.userData.mobile,
                appKey: 'WEB',
                ...sm2Result,
                sid: 1,
                type: USER_LOGIN_TYPE.SELLER_LOGIN,
            },
            { form: true },
        ).then((res: any) => {
            let { success, data: userToken, message: messageInfo, messageCode } = res || {}
            if (success) {
                setCookie('TOKEN', userToken.accessToken, userToken?.tokenExpire || 7)
                window.history.back()
            } else {
                if (messageCode === SM2_ERROR_CODE && !skipSm2) {
                    // 加密错误 使用明文登录
                    this.resetLogin(false, passwordObj)
                    return
                }
                message.error(messageInfo)
            }
        })
    }

    /**
     *@name 设置密码
     *
     * @param {Record<string, string>} params
     * @param loginInfo  登录信息
     * @param {boolean} [skipSm2] 是否跳过isSm2加密登录 默认为false ，为true时直接明文登录
     * @return {*}
     * @memberof forgetHooks
     */
    async setPassWord(params: any, loginInfo: any = {}, skipSm2?: boolean) {
        let { password, passwordRepeat } = params || {}

        let passwordObj = { password, passwordRepeat }
        // 获取公钥，对用户输入的密码加密 避免明文传输
        let sm2Result = skipSm2 ? passwordObj : await sm2Encrypt?.(getPublicKey, passwordObj)

        // 处理门户机构登录问题 todo 需要调整getCookie公共方法
        const sid = getLocalStorage('SID') || ''
        const userType = Cookies.get(`selectUserType${sid}`)

        return Http(
            api.reset_password,
            'POST',
            { ...params, ...sm2Result, groupType: LOGIN_TYPE_STR_TO_NUM[userType] },
            { form: true },
        ).then(async (res: any) => {
            let { messageCode, message: messageInfo, success } = res || {}
            if (!success) {
                if (messageCode === SM2_ERROR_CODE && !skipSm2) {
                    // 加密错误 使用明文登录
                    this.setPassWord(params, loginInfo, true)
                    return
                }
                message.error(messageInfo)
            } else {
                const currentUrl = new URL(location.href).searchParams.get('currentUrl')
                if (currentUrl) {
                    await this.userStore.getUserData()
                    /** 工作台跳转 */
                    window.location.href = currentUrl
                } else if (loginInfo.data) {
                    /** 模拟登录 */
                    const { data, currentUserType, fromType, callback, redirectUrl } = loginInfo
                    data.userInfo.isInitPassword = false
                    data.userInfo.personageInitPassWord = false
                    this.userStore.updateUserAccount(
                        data,
                        currentUserType,
                        fromType,
                        callback,
                        redirectUrl,
                    )
                } else {
                    window.history.back()
                }
            }
        })
    }

    skip = async (loginInfo: any) => {
        Http(api.updateInitPassword, 'POST', {}, { form: true }).then(async () => {
            const currentUrl = new URL(location.href).searchParams.get('currentUrl')
            if (currentUrl) {
                await this.userStore.getUserData()
                /** 工作台跳转 */
                window.location.href = currentUrl
            } else if (loginInfo.data) {
                /** 模拟登录 */
                const { data, currentUserType, fromType, callback, redirectUrl } = loginInfo
                data.userInfo.isInitPassword = false
                data.userInfo.personageInitPassWord = false
                this.userStore.updateUserAccount(
                    data,
                    currentUserType,
                    fromType,
                    callback,
                    redirectUrl,
                )
            } else {
                window.history.back()
            }
        })
    }

    getRandomKey = () => {
        this.randomKey = new Date().getTime() + Math.random().toString(36).slice(-8)
    }
}
