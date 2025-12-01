import http from '@/servers/http'
import { getCookie, getSessionStorage } from '@/storage'
import type { UserInfo } from '@/stores/interface'
import { makeAutoObservable } from 'mobx'
import { history } from 'umi'
import api from './api'
import type { AuthTypeEnum } from '@/pages/user/authmiddle/interface.d'
import { APPROVE_STATUS_OBJ, APPROVE_STATUS_TYPE, AUDIT_STATUS_TYPE } from './const'
import type { BindItem, BindListItem } from './interface'

import { isDisableEmailSite } from '@/utils/isEmailSite'
import { message, Modal } from 'antd'
import type UserStore from '@/stores/userStore'
import { findConfigValueToBoolean, findSiteData, getPortalCodeFromUrl } from '@wotu/wotu-components'
import type SiteStore from '@/stores/siteStore'
import { LOGIN_TYPE_STR_TO_NUM } from '@wotu/wotu-components/dist/esm/Types'
export default class bindHooks {
    public bindList: BindListItem[] = [
        {
            type: '实名认证',
            children: [
                {
                    name: '实名认证',
                    icon: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe_user_pc/images/bd_icon_idcard%402x_2d9ef3fd.png',
                    unIcon: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe_user_pc/images/bd_icon_idcard%402x_2d9ef3fd.png',
                    info: '',
                    unInfo: '账号身份未认证',
                    status: 0,
                    statusStr: '已认证',
                    unStatusStr: '去认证',
                    key: 'auditStatus',
                    isShow: true,
                },
            ],
        },
        {
            type: '绑定管理',
            children: [
                {
                    name: '手机号码绑定',
                    icon: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe_user_pc/images/bd_icon_phone%402x_f7c858c9.png',
                    unIcon: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe_user_pc/images/bd_icon_phone%402x_f7c858c9.png',
                    info: '',
                    unInfo: '手机号码未认证',
                    status: 0,
                    statusStr: '去更换',
                    unStatusStr: '去绑定',
                    key: 'isValidatePhone',
                    isShow: true,
                    encodeType: '2',
                },
                {
                    name: '邮箱绑定',
                    icon: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe_user_pc/images/bd_icon_email%402x_31ae02a2.png',
                    unIcon: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe_user_pc/images/bd_icon_email%402x_31ae02a2.png',
                    info: '',
                    unInfo: '邮箱地址暂未绑定',
                    status: 0,
                    statusStr: '去更换',
                    unStatusStr: '去绑定',
                    key: 'email',
                    isShow: true,
                    encodeType: '3',
                },
                {
                    name: '微信',
                    icon: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe_user_pc/images/bd_icon_wechat%402x_91e38280.png',
                    unIcon: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe_user_pc/images/bd_icon_wechat%402x_91e38280.png',
                    info: '',
                    unInfo: '未绑定',
                    status: 0,
                    statusStr: '解除绑定',
                    unStatusStr: '去绑定',
                    key: 'wx',
                    isShow: false,
                },
                {
                    name: '钉钉',
                    icon: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe_user_pc/images/bd_icon_dingding%402x_a1d259e7.png',
                    unIcon: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe_user_pc/images/bd_icon_dingding%402x_a1d259e7.png',
                    info: '',
                    unInfo: '未绑定',
                    status: 0,
                    statusStr: '解除绑定',
                    unStatusStr: '去绑定',
                    key: 'dd',
                    isShow: false,
                },
                {
                    name: 'QQ',
                    icon: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe_user_pc/images/bd_icon_QQ%402x_d62128c4.png',
                    unIcon: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe_user_pc/images/bd_icon_QQ%402x_d62128c4.png',
                    info: '',
                    unInfo: '未绑定',
                    status: 0,
                    statusStr: '解除绑定',
                    unStatusStr: '去绑定',
                    key: 'qq',
                    isShow: false,
                },
            ],
        },
    ]

    public bindModalVisible = false

    // 展示微信、钉钉绑定弹窗
    public qrcodeModalType: AuthTypeEnum | null = null

    public idCardStatus = {}

    // 绑定code
    public bindCode = {
        wxAuthBindCode: '',
        qqAuthBindCode: '',
        ddAuthBindCode: '',
    }

    public userStore: UserStore
    public siteStore: SiteStore

    public loading: boolean = true

    public emailDisabled = true

    constructor(userStore: UserStore, siteStore: SiteStore) {
        makeAutoObservable(this)
        this.userStore = userStore
        this.siteStore = siteStore
        this.checkEmailState()
    }

    setBindModalVisible = () => {
        this.bindModalVisible = !this.bindModalVisible
    }

    getfixBindUrl = (key: string, userData: UserInfo) => {
        switch (key) {
            case 'isValidatePhone':
                if (userData?.isValidatePhone) {
                    return undefined
                }
                return '/bind/phone?type=create'
            case 'auditStatus':
            case 'certificateType':
                return '/bind/idcard'
            case 'email':
                if (this.emailDisabled) {
                    return undefined
                }
                return '/bind/email'
            default:
                return undefined
        }
    }

    checkEmailState = async () => {
        const isDisable = await isDisableEmailSite()
        this.emailDisabled = isDisable
    }

    fixBind = async (
        key: string,
        info: string,
        userData: UserInfo,
        userStore: UserStore,
        siteStore: SiteStore,
    ) => {
        const { wxAuthBindCode, ddAuthBindCode, qqAuthBindCode } = this.bindCode
        const { siteData } = siteStore
        // qq 相关配置参数
        const userType = LOGIN_TYPE_STR_TO_NUM[userStore.userType || 'user']
        const qqAppid = findSiteData(siteData, 'qq_appid')?.value
        const platform = getSessionStorage('PLATFORM')
        const currentOrigin = window.location.origin || ''
        const currentAlias = getPortalCodeFromUrl({ isGetDomain: true })
        const sid = findSiteData(siteData!, 'sid', { findKey: 'baseInfo' })
        let qqRedirect =
            platform === 'portal'
                ? `${currentOrigin}/${currentAlias}/user-center/user/middle/qq`
                : `${currentOrigin}/account/user/middle/qq`
        qqRedirect = encodeURIComponent(
            `${qqRedirect}?fromSid=${sid}&authUserType=${userType}&action=bind&authType=qq`,
        )

        switch (key) {
            case 'isValidatePhone':
                if (userData?.isValidatePhone) {
                    this.setBindModalVisible()
                } else {
                    history.push('/bind/phone?type=create')
                }
                break
            case 'auditStatus':
                history.push('/bind/idcard')

                break
            case 'certificateType':
                history.push('/bind/idcard')
                break
            case 'email':
                {
                    !this.emailDisabled && history.push('/bind/email')
                }
                break
            case 'wx':
            case 'dd':
                if (key === 'wx' && wxAuthBindCode) {
                    Modal.confirm({
                        content: '解除绑定后将无法使用此方式登录，确定要解除吗?',
                        onOk: async () => {
                            await http(api.userUnbind, 'post', { authBindCode: wxAuthBindCode })
                            message.success('解绑成功')
                            this.getAllBind(userStore)
                        },
                    })
                    break
                }
                if (key === 'dd' && ddAuthBindCode) {
                    Modal.confirm({
                        content: '解除绑定后将无法使用此方式登录，确定要解除吗?',
                        onOk: async () => {
                            await http(api.userUnbind, 'post', { authBindCode: ddAuthBindCode })
                            message.success('解绑成功')
                            this.getAllBind(userStore)
                        },
                    })
                    break
                }
                this.qrcodeModalType = key as AuthTypeEnum
                break
            case 'qq':
                if (qqAuthBindCode) {
                    Modal.confirm({
                        content: '解除绑定后将无法使用此方式登录，确定要解除吗?',
                        onOk: async () => {
                            await http(api.userUnbind, 'post', { authBindCode: qqAuthBindCode })
                            message.success('解绑成功')
                            this.getAllBind(userStore)
                        },
                    })
                    break
                }
                location.replace(
                    `https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=${qqAppid}&state=qq&scope=get_user_info&redirect_uri=${qqRedirect}`,
                )
                break
            default:
                console.log(key)
        }
    }

    getBaseInfo = async (
        userData: UserInfo,
        { wxAuthBindCode, ddAuthBindCode, qqAuthBindCode }: any,
    ) => {
        const tempBindList = JSON.parse(JSON.stringify(this.bindList))
        this.idCardStatus = (await this.getAuditInfo()) || {}
        let { auditStatus } = userData || {}
        let secretMobile = userData.mobile
        this.bindCode = {
            wxAuthBindCode,
            ddAuthBindCode,
            qqAuthBindCode,
        }

        // 获取用户类型
        const userType = this.userStore?.userType
        const portalCode = getPortalCodeFromUrl()

        // 判断不同用户类型
        const isPersonal = userType === 'user' && !portalCode // 个人用户且不是门户
        const isOrg = userType === 'org' // 机构用户
        const isPersonTeacher = userType === 'person_teacher' // 个人资源方
        const isSeller = userType === 'merchant' // 资源方

        tempBindList.map((group: BindListItem) => {
            group.children.map((item: BindItem) => {
                let { key } = item || {}
                switch (key) {
                    case 'auditStatus':
                        if (auditStatus === AUDIT_STATUS_TYPE.PASS) {
                            // 除了已认证，其他状态都是未认证
                            item.status = 1
                        }
                        item.statusStr = APPROVE_STATUS_OBJ?.[auditStatus]
                        item.unStatusStr = APPROVE_STATUS_OBJ?.[auditStatus]
                        // @ts-ignore
                        if (this.idCardStatus?.auditRemark) {
                            // 展示审核原因
                            // @ts-ignore
                            item.remark = this.idCardStatus?.auditRemark
                            item.unStatusStr = '重新认证'
                        }
                        // @ts-ignore
                        if (this.idCardStatus?.auditStatus === APPROVE_STATUS_TYPE.WAIT) {
                            // 待审核中，按钮不可点击
                            item.textType = 'text'
                        }

                        break

                    case 'certificateType':
                        item.info = userData.idCardNo || item.info
                        break
                    case 'isValidatePhone':
                        item.info = secretMobile || item.info
                        item.unInfo = secretMobile || item.unInfo
                        break
                    case 'email':
                        item.info = userData.email || item.info
                        break
                    case 'wx':
                        item.status = wxAuthBindCode ? 1 : 0
                        // 根据不同用户类型和配置判断是否显示微信绑定
                        item.isShow =
                            (isPersonal && this.getSiteConfig('login_personal_method5')) ||
                            (isOrg && this.getSiteConfig('login_org_method5')) ||
                            (isPersonTeacher && this.getSiteConfig('login_personal_center_wx ')) ||
                            (isSeller && this.getSiteConfig('login_merchant_method5'))
                        break

                    case 'dd':
                        item.status = ddAuthBindCode ? 1 : 0
                        // 根据不同用户类型和配置判断是否显示钉钉绑定
                        item.isShow =
                            (isPersonal && this.getSiteConfig('login_personal_method6')) ||
                            (isOrg && this.getSiteConfig('login_org_method6')) ||
                            (isPersonTeacher && this.getSiteConfig('login_personal_center_dd')) ||
                            (isSeller && this.getSiteConfig('login_merchant_method6'))
                        break

                    case 'qq':
                        item.status = qqAuthBindCode ? 1 : 0
                        // 根据不同用户类型和配置判断是否显示QQ绑定
                        item.isShow =
                            (isPersonal && this.getSiteConfig('login_personal_method_qq')) ||
                            (isOrg && this.getSiteConfig('login_org_method_qq')) ||
                            (isPersonTeacher && this.getSiteConfig('login_personal_center_qq')) ||
                            (isSeller && this.getSiteConfig('login_merchant_method_qq'))
                        break

                    default:
                }
                // 除证件认证状态，其他状态都根据info接口展示
                if (key && userData?.[key] && key !== 'auditStatus') {
                    item.status = 1
                }
            })
        })
        this.bindList = tempBindList
        this.loading = false
    }

    // 获取新审核信息
    getAuditInfo = async () => {
        let userCode = getCookie('USER_CODE')
        return await http(api.getAuditInfo, 'get', {
            userCode,
        })
    }
    // 获取所有认证绑定
    getAllBind = (userStore: any) => {
        Promise.all([userStore.getUserData(), this.getBindInfo()]).then(([userData, bindInfo]) => {
            this.getBaseInfo(userData, bindInfo)
        })
    }
    // 获取绑定信息
    getBindInfo = async () => {
        return await http(api.getAuthBind, 'post', {})
    }

    getSiteConfig = (key: string): boolean => {
        return findConfigValueToBoolean(this.siteStore?.siteData, key)
    }
}
