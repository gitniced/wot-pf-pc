import React, { useState } from 'react'
import { PTHeader } from '@wotu/pt-components'
import { findSiteData } from '@wotu/wotu-components'

import { history, useModel } from 'umi'
import { inject, observer, useLocalObservable } from 'mobx-react'
import type siteStore from '@/stores/siteStore'
import type { UserStore } from '@/stores/userStore'
import Store from './store'
import { getCookie, getLocalStorage } from '@/storage'
import { MERCHANT_LOGIN_TYPE } from '@/types'
import AccessPortalModal from '../accessPortalModal'
import ysfConfigUsr from '@/utils/ysfConfigUser'
import { useObservableAndTrue } from '@/utils/customHooks'
import { getPortalCodeFromUrl } from '@/utils/getPortalCodeFromUrl'

interface WorkHeaderType {
    userStore: UserStore
    siteStore: siteStore
    organizationList: any[]
    identityList: any[]
    defaultIdentityCode: string
    defaultOrganizationCode: string
    selectedOrganizationCode: string
    selectedIdentityCode: string
    noOrganizationSelect: boolean
    noIdentitySelect: boolean
    onSelectOrganization?: (organizationCode: string) => void
    onSelectIdentity?: (identityCode: string) => void
    onSetDefaultOrganization?: (organizationCode: string) => void
    onSetDefaultIdentity?: (identityCode: string) => void
    initOrganizationPermissionCallBack?: (organizationCode: string, identityCode: string) => void
    initUserPermissionCallBack?: (identityCode: string) => void
}

function WorkHeader({
    userStore,
    siteStore,
    selectedOrganizationCode,
    selectedIdentityCode,
    defaultIdentityCode,
    defaultOrganizationCode,
    organizationList,
    identityList,
    noOrganizationSelect,
    noIdentitySelect,
    onSelectOrganization,
    onSelectIdentity,
    onSetDefaultOrganization,
    onSetDefaultIdentity,
}: WorkHeaderType) {
    const portalCode = getPortalCodeFromUrl()
    const masterModel = useModel('@@qiankunStateFromMaster')
    const { gatewaySiteStore } = masterModel || {}
    const { portalData } = gatewaySiteStore || {}

    const [visible, setVisible] = useState<boolean>(false)

    const store = useLocalObservable(() => new Store(userStore))
    useObservableAndTrue(() => {
        store.InjectDataAndGetData(selectedOrganizationCode, selectedIdentityCode)
    }, [selectedOrganizationCode, selectedIdentityCode])
    // 机构类型的type

    /**
     * 登录方法的抽离
     * @param path loginUrl+path
     */
    const toLoginUrl = (path: string) => {
        if (portalCode) {
            window.location.href = `/${portalCode}/user-center${path}`
        } else {
            const loginUrl = findSiteData(siteStore, 'pcDomain', { findKey: 'baseInfo' })
            window.location.href = `${loginUrl}/account/${path}`
        }
    }

    /**
     * 去创建组织
     */
    const toCreateOrganization = () => {
        toLoginUrl('/organization/create')
    }

    /**
     * 去组织中心
     */
    const toOrganizationCenter = () => {
        toLoginUrl('/organization/detail')
    }
    /**
     *  获取logo
     * @returns logo url
     */
    const getLogoPath = () => {
        if (portalCode) {
            return portalData?.[portalCode]?.organizationLogo || ''
        } else {
            return findSiteData(siteStore, 'wap_logo')?.value || ''
        }
    }
    /**
     * 回到首页
     * @param {string} [path]
     */
    const gotoPcDomain = (path?: string) => {
        const kp_org_login_theme = findSiteData(siteStore, 'kp_org_login_theme')?.value
        const sid = findSiteData(siteStore, 'sid')
        const userToken = getCookie('TOKEN')
        if (portalData?.[portalCode]) {
            // 在门户之中
            RUN_ENV === 'local'
                ? window.location.replace(`http://localhost:8031/${portalCode}/home`)
                : window.location.replace(`/${portalCode}/home`)
        } else {
            // 处于门户之外
            if (userToken) {
                if (sid.toString() === '1') {
                    const merchantMidDomain =
                        findSiteData(siteStore, 'merchantMidDomain', { findKey: 'baseInfo' }) || ''
                    const courseMerchantDomain =
                        findSiteData(siteStore, 'courseMerchantDomain', { findKey: 'baseInfo' }) ||
                        ''
                    const questionMerchantDomain =
                        findSiteData(siteStore, 'questionMerchantDomain', {
                            findKey: 'baseInfo',
                        }) || ''
                    const sourceType = getLocalStorage('SOURCE_TYPE')
                    let redirectUrl = ''
                    switch (sourceType) {
                        case MERCHANT_LOGIN_TYPE.COURSE:
                            redirectUrl = courseMerchantDomain
                            break
                        case MERCHANT_LOGIN_TYPE.QUESTION:
                            redirectUrl = questionMerchantDomain
                            break
                        default:
                            redirectUrl = merchantMidDomain
                    }
                    if (RUN_ENV !== 'local') {
                        window.location.href = redirectUrl
                    } else {
                        history.push('/account')
                    }
                } else {
                    const pcDomain =
                        findSiteData(siteStore, 'pcDomain', { findKey: 'baseInfo' }) || ''
                    if (pcDomain) {
                        window.location.href = path || pcDomain
                    } else {
                        history.push('/account')
                    }
                }
            } else {
                if ((sid || '')?.toString() !== '1') {
                    if (kp_org_login_theme === '/egzlogin') {
                        location.replace('/account/egzlogin')
                    } else {
                        location.replace('/account/user/login')
                    }
                } else {
                    history.replace('/seller/login')
                }
            }
        }
    }

    /**
     * 获取对应的登录类型 中站点数据 对应的创建组织的key
     */
    const getLoginTypeByCreateSite = () => {
        const userType = getCookie('SELECT_USER_TYPE')
        const typeSiteKeyMap: Record<string, string> = {
            user: 'login_personal_create_org',
            org: 'login_org_create_org',
            merchant: 'login_merchant_create_org',
        }
        return typeSiteKeyMap[userType]
    }
    /**
     *
     * 是否可以创建组织
     */
    const getTypeCreateOrganization = () =>
        String(findSiteData(siteStore, getLoginTypeByCreateSite())?.value) === '1'

    const getMobile = () =>
        userStore?.userData?.mobile &&
        `${userStore.userData.mobile.slice(0, 3)}****${userStore.userData.mobile.slice(-4)}`
    /**
     *
     * @returns 用户名
     */
    const getUserName = () => userStore?.userData?.nickname || getMobile()

    /**
     *
     * @returns 获取用户头像url
     */
    const getUserAvatar = () => userStore?.userData?.avatar

    /**
     *
     * @returns 是否有认证
     */
    const isValidateIdCard = () => userStore?.userData?.isValidateIdCard

    return (
        <>
            {/* 头部 */}
            <PTHeader
                noOrganizationSelect={noOrganizationSelect}
                noIdentitySelect={noIdentitySelect}
                logo={getLogoPath()}
                // 组织列表
                organizations={organizationList}
                // 根据当前的登录类型 判断是否可以创建组织
                isCreateOrganization={getTypeCreateOrganization()}
                // 身份列表
                identities={identityList}
                //登录的类型
                type={getCookie('SELECT_USER_TYPE')}
                // 资源方类型
                merchantType={getCookie('SOURCE_TYPE')}
                // 考务模式 1 独家  2多家
                kpBusinessSetting={findSiteData(siteStore, 'kp_business_setting')?.value}
                // 选择的组织
                selectedOrganizationCode={selectedOrganizationCode}
                // 选择的身份
                selectedIdentityCode={selectedIdentityCode}
                // 默认的身份
                defaultIdentityCode={defaultIdentityCode}
                // 默认的组织
                defaultOrganizationCode={defaultOrganizationCode}
                onSelectOrganization={(organizationCode: string) => {
                    // 组织的选择
                    onSelectOrganization?.(organizationCode)
                }}
                onSelectIdentity={(code: string) => {
                    // 身份的选择
                    onSelectIdentity?.(code)
                }}
                changeOrganizationDefault={(item: any) => {
                    // 设置默认的组织
                    onSetDefaultOrganization?.(item)
                }}
                changeIdentitiesDefault={(item: any) => {
                    // 设置默认的身份
                    // 给组织设置默认的身份
                    onSetDefaultIdentity?.(item)
                }}
                onClickCustomerServiceIcon={() => {
                    // 七鱼客服
                    // @ts-ignore
                    const configUsr = ysfConfigUsr(userStore?.userData, siteStore?.siteData?.data)
                    // @ts-ignore
                    ysf('config', configUsr)
                }}
                onClickHomeIcon={() => {
                    // 首页
                    gotoPcDomain()
                }}
                onClickExtraButton={() => {
                    setVisible(true)
                }}
                onToDocument={() => {
                    // 文档
                    window.location.href = 'https://www.yuque.com/taowanyang/wzp'
                }}
                personInfoProps={{
                    // 头像
                    avatar: getUserAvatar() || defaultAvatar,
                    // 用户名
                    name: getUserName(),
                    // 是否认证
                    isAuthentication: isValidateIdCard(),
                    /** 点击退出登录事件 */
                    onClickLogout() {
                        userStore.loginOut()
                    },
                    /** 点击账号中心事件 */
                    onClickAccountCenter() {
                        toLoginUrl('/account')
                    },
                    /** 点击基础信息事件 */
                    onClickBaseInfo() {
                        toLoginUrl('/baseinfo')
                    },
                    /** 点击认证绑定事件 */
                    onClickAuthBinding() {
                        toLoginUrl('/bind')
                    },
                    /** 点击账号设置事件 */
                    onClickSetting() {
                        toLoginUrl('/password')
                    },
                }}
                // 创建组织
                createOrganization={toCreateOrganization}
                // 跳转组织中心
                toOrganizationCenter={toOrganizationCenter}
            />
            <AccessPortalModal
                visible={visible}
                onCancel={() => setVisible(false)}
                portalDetail={store.portalInfo}
            />
        </>
    )
}

export default inject('userStore', 'siteStore')<any>(observer(WorkHeader))
