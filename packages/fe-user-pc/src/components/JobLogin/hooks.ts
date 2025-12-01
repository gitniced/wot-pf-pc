import Http from '@/servers/http'
import type SiteStore from '@/stores/siteStore'
import type UserStore from '@/stores/userStore'
import dealErrMsg from '@/utils/dealErr'
import { getPublicKey, SM2_ERROR_CODE } from '@/utils/getPublicKey'
import { sm2Encrypt } from '@wotu/wotu-components'
import { makeAutoObservable } from 'mobx'
import api from '@/pages/user/login/api'
import { USER_LOGIN_TYPE } from '@wotu/wotu-components/dist/esm/Types'
// import { history } from 'umi'
// import { setLocalStorage } from '@/storage'

export default class OrgLoginHooks {
    // 登录按钮的loading状态
    public btnLoading: boolean = false
    constructor() {
        makeAutoObservable(this)
    }

    /**
     * @name 登录
     * @param form 表单数据
     * @param site 站点信息
     * @param user 用户信息
     * @param formRef 表单ref
     * @param skipSm2:是否跳过isSm2加密登录 默认为false ，为true时直接明文登录
     */
    loginHandler = async (
        form: any,
        site: SiteStore,
        user: UserStore,
        formRef: any,
        skipSm2?: boolean,
    ) => {
        if (this.btnLoading) return
        this.btnLoading = true
        let {
            siteData: { data: tempData },
        } = site
        tempData = tempData || {}
        let { sid } = tempData
        const { account, password } = form

        // 获取公钥，对用户输入的密码加密 避免明文传输
        let sm2Result = skipSm2 ? { password } : await sm2Encrypt?.(getPublicKey, { password })
        let tempLoginParam = {
            account,
            appKey: 'WEB',
            sid,
            type: USER_LOGIN_TYPE.ORG_LOGIN,
            ...sm2Result,
        }

        return Http(api.passwordLogin, 'post', { ...tempLoginParam }, { form: true })
            .then(res => {
                const { success, data, messageCode, message: messageInfo }: any = res || {}
                if (!success) {
                    this.btnLoading = false
                    if (messageCode === SM2_ERROR_CODE && !skipSm2) {
                        // 加密错误 使用明文登录
                        this.loginHandler(form, site, user, formRef, true)
                        return
                    }
                    dealErrMsg(messageInfo, formRef)
                } else {
                    user.updateUserAccount(data, Number(USER_LOGIN_TYPE.ORG_LOGIN))
                }
            })
            .catch(() => {
                this.btnLoading = false
            })
    }
}
