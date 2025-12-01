import { makeAutoObservable } from 'mobx'
import { makePersistable, isHydrated } from 'mobx-persist-store'
import { message } from 'antd'
import * as Storage from '@/storage'
import type {
    UserInfo,
    UserAccount,
    UserOrgItem,
    UserGroupItem,
    UserPermission,
    PortalData,
    identityType,
    WorkBench,
} from './interface'
import Http from '@/servers/http'
import globalApi from '@/servers/globalApi'
import {
    delCookie,
    delLocalStorage,
    delSessionStorage,
    getCookie,
    getSessionStorage,
    setCookie,
} from '@/storage'
import { getLocalStorage } from '@/storage'
// import { setLocalStorage } from '@/storage'
import {
    bLoginGo,
    findSiteData,
    // getMerchantWorkBench,
    getWorkBench,
    loginRedirect,
} from '@wotu/wotu-components'
import http from '@/servers/http'
import type { History } from 'umi'
import { history } from 'umi'
import { getPortalCodeFromUrl } from '@/utils/getPortalCodeFromUrl'
// import { getMasterHistory } from '@/utils/masterHistoryVO'
import type { AccessTokenTYPE } from '@/pages/user/authmiddle/interface'
import {
    // getCompanyBackUrl,
    // getParamsHistory,
    // getWorkBenchUrlByType,
    updateCookieSourceType,
} from '@/utils/urlUtils'
import {
    LOGIN_TYPE,
    ORG_IDENTITY_MAPPING,
    ORG_SOURCE_TYPE_ENUM,
    USER_LOGIN_TYPE,
    USER_LOGIN_TYPE_MAPPING,
} from '@wotu/wotu-components/dist/esm/Types'
// import { SOURCE_MERCHANT_DOMAIN } from '@/types'
import Cookies from 'js-cookie'
import {
    LOGIN_TYPE_STR_TO_NUM,
    MERCHANT_LOGIN_TYPE,
    USER_TYPE_NUM,
} from '@wotu/wotu-components/dist/esm/Types/user'
import { areSameRootDomain } from '@/utils/areSameRootDomain'
import doToLogin from '@/utils/doToLogin'
export default class UserStore {
    /** 应用标签 */
    public tag: string = ''
    /** 门户code */
    public portalCode: string = ''
    /** 门户详情 */
    public portalData: PortalData = {}
    /** 账号信息 */
    public userAccount: UserAccount | undefined
    /** 用户信息 */
    public userData: UserInfo | undefined
    /** 用户组织列表 */
    public userOrg: UserOrgItem[] = []
    /** 用户组列表 */
    public userGroup: UserGroupItem[] = []
    /** 站点工作台地址 */
    public workBench: WorkBench = {
        1: '',
        2: '',
        3: '',
        4: '',
    }
    /** 用户权限 */
    public userPermissionList: string[] = []
    /** 用户当前组织code */
    public currentOrgCode: string | undefined
    /** 账号类型 个人|机构|资源方 */
    public userType: LOGIN_TYPE | undefined = getCookie('SELECT_USER_TYPE')
    /** 子应用仓库清除方法 */
    public childStoreInitList: any = []
    /** 默认的机构*/
    public defaultOrganizationCode: string = ''
    /** 当前选中机构详情*/
    public currentOrgInfo: UserOrgItem = {}
    /** 身份列表 */
    public identityList: identityType[] = []
    /** 默认的的身份*/
    public defaultIdentity: string = ''
    /** 主应用history*/
    public masterHistory: History = history

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
        makePersistable(this, {
            name: 'userStore', // 保存的name，用于在storage中的名称标识，只要不和storage中其他名称重复就可以
            properties: [
                'tag',
                'portalCode',
                'portalData',
                'userData',
                'userAccount',
                'userOrg',
                'currentOrgCode',
                // 'currentOrgCertify',
                'userGroup',
                'workBench',
                'userType',
                'userPermissionList',
                'currentOrgInfo',
                'defaultOrganizationCode',
            ], // 要保存的字段，这些字段会被保存在name对应的storage中，注意：不写在这里面的字段将不会被保存，刷新页面也将丢失：get字段例外。get数据会在数据返回后再自动计算
            storage: window.localStorage, // 保存的位置：看自己的业务情况选择，可以是localStorage，sessionstorage
        })
    }

    /**
     * 更新当前父应用标识
     * @param {string} tag 需要清除字段的存储类型
     */
    updateTag = (tag: string) => {
        this.tag = tag
    }

    /**
     * 绑定父应用history
     * @param {History} tempHistory 绑定父应用history
     */
    updateHistory = (tempHistory: History) => {
        this.masterHistory = tempHistory
    }
    /**
     * 绑定父应用userData
     * @param {UserInfo} tempUserData 绑定父应用history
     */
    updateUserData = (tempUserData: UserInfo) => {
        this.userData = tempUserData
    }
    /**
     * 获取门户用户信息
     */
    updatePortalCode = (portalCode: string) => {
        this.portalCode = portalCode
    }
    /**
     * 绑定父应用门户信息
     * @param {PortalData} tempPortalData 绑定父应用history
     */
    updatePortalData = (tempPortalData: PortalData) => {
        this.portalData = tempPortalData
    }

    /**
     * @name 更新用户信息中最后一次选中的机构code机构
     * @param organizationCode 机构code
     */
    updateUserLastOrg = async (organizationCode: string) => {
        if (!organizationCode) return
        ;(await Http(
            `${globalApi.updateLastOrg}/${organizationCode}`,
            'post',
            {
                organizationCode: organizationCode,
            },
            { repeatFilter: true },
        )) as unknown as UserInfo
        if (this.userData) {
            this.userData.lastOrganizationCode = organizationCode
        }
    }

    /**
     * 更新指定机构，适用于选择机构场景
     */
    updateCurrentOrgCode = async (data: string | undefined) => {
        console.log('updg更新当前机构', data)
        if (!data) return
        Storage.setCookie('SELECT_ORG_CODE', data)
        this.currentOrgCode = data
        await this.getOrganizationDetail(data)
        // 更新机构 同步机构下的权限
        await this.getUserPermissionList(data)
        // 更新机构下的身份列表
        await this.getOrganizationIdentityList(data)
        // 更新用户信息中最后一次选中的机构
        await this.updateUserLastOrg(data)
        // 更新当前机构下的选中身份
        let currentIdentityCode = await this.getDefaultOrganizationIdentity(data)
        currentIdentityCode && setCookie('SELECT_IDENTITY_CODE', currentIdentityCode)
    }
    /**
     * 获取机构详情
     */
    getOrganizationDetail = async (data: string | undefined) => {
        let orgCode = data || this.currentOrgCode
        if (!orgCode) return
        this.currentOrgInfo = (await Http(
            `${globalApi.orgDetail}/${orgCode}`,
            'get',
            {},
            { repeatFilter: false },
        )) as unknown as UserOrgItem
    }

    /**
     * 用户机构下权限列表
     * @param {(string | undefined)} code
     * @memberof UserStore
     */
    getUserPermissionList = async (code: string | undefined) => {
        if (!code) return
        let userPermission: UserPermission[] = (await Http(
            globalApi.userPermission,
            'post',
            {
                organizationCode: code,
                organizationCenter: 1,
                // type: 1,
                terminal: 1,
                identity: this.defaultIdentity,
            },
            {
                repeatFilter: false,
            },
        )) as unknown as UserPermission[]

        const flatten = (arr: UserPermission[]) => {
            let result: string[] = []
            arr.forEach(item => {
                if (Array.isArray(item.children)) {
                    result.push(item.route)
                    result = result.concat(flatten(item.children))
                } else {
                    result.push(item.route)
                }
            })
            return result
        }
        this.userPermissionList = flatten(userPermission)
    }

    /**
     * 获取学员默认身份
     */
    getDefaultUserIdentity = async () => {
        let res: any = await http(globalApi.getDefaultUserIdentity, 'GET', {})
        let { id } = res || {}
        this.defaultIdentity = id
        let currentIdentityCode = getCookie('SELECT_IDENTITY_CODE')
        // 当前没有选中的身份，将默认身份设置为当前身份
        !currentIdentityCode && id && setCookie('SELECT_IDENTITY_CODE', id)
        return id
    }

    /**
     * 获取默认的机构
     */
    getDefaultOrganizationCode = (currentUserType: USER_LOGIN_TYPE) => {
        return http(
            `${globalApi.defaultOrganizationCode}${currentUserType}`,
            'get',
            {},
            { repeatFilter: true },
        ).then((res: any) => {
            this.defaultOrganizationCode = res
            setCookie('SELECT_ORG_CODE', res)
        })
    }

    /**
     * 获取默认的机构的身份
     */
    getDefaultOrganizationIdentity = async (selectOrgCode?: string) => {
        if (!this.defaultOrganizationCode && !selectOrgCode) {
            return
        }
        // 资源方身份登录后确定 切换组织不更换身份
        let siteStore = getLocalStorage('SITE_STORE') || {}
        let { sid = '' } = siteStore?.siteData?.data || {}
        if (getCookie('SELECT_IDENTITY_CODE') && sid === 1) {
            this.defaultIdentity = getCookie('SELECT_IDENTITY_CODE')
            setCookie('DEFAULT_IDENTITY_CODE', getCookie('SELECT_IDENTITY_CODE'))
            return
        }

        let res = await http(
            `${globalApi.defaultOrganizationIdentity}${
                selectOrgCode ? selectOrgCode : this.defaultOrganizationCode
            }`,
            'get',
            {},
            { repeatFilter: true },
        )
        this.defaultIdentity = res as unknown as string
        let currentIdentityCode = getCookie('SELECT_IDENTITY_CODE')
        // 当前没有选中的身份，将默认身份设置为当前身份
        console.log('当前没有选中的身份', currentIdentityCode, res)
        res && !currentIdentityCode && setCookie('SELECT_IDENTITY_CODE', res)
        return res
    }

    /**
     * 获取非个人身份列表（机构、资源方）
     * @param code 机构code
     */
    getOrganizationIdentityList(code?: string) {
        let orgCode = this.currentOrgCode || code
        return http(`${globalApi.getOrganizationIdentityList}${orgCode}`, 'get', {}).then(
            (res: any) => {
                this.identityList = res
            },
        )
    }

    // token 置换登录信息
    getLoginInfoByToken = async (tokenInfo: any, currentUserType: USER_LOGIN_TYPE) => {
        await http(`${globalApi.getLoginInfo}`, 'post', {}).then((res: any) => {
            this.updateUserAccount({ ...res, ...tokenInfo }, currentUserType, 'noJump')
        })
    }

    /**
     * @param  data 登录后拿到的信息
     * @param  currentUserType 用户类型:个人\机构\资源方 \ 中心个人
     * @param  fromType 调用来源:登录\注册 'login'|'register',默认为登录
     */
    updateUserAccount = async (
        data: UserAccount,
        currentUserType: USER_LOGIN_TYPE,
        fromType: 'login' | 'register' | 'noJump' = 'login',
        callback?: () => void,
        redirectUrl?: string,
    ) => {
        // eslint-disable-next-line no-param-reassign
        currentUserType = Number(currentUserType)
        const portalCode = getPortalCodeFromUrl()

        // 获取上个用户登录类型
        const fromUrlUserType = getCookie('FROM_URL_USER_TYPE') || ''

        // 获取后清除
        delCookie('FROM_URL_USER_TYPE')

        const { accessToken, randomCode, userInfo, groupList = [], tokenExpire = 7 } = data || {}

        this.userAccount = data

        const siteData = getLocalStorage('SITE_STORE')?.siteData || {}
        setCookie(`TOKEN`, accessToken, Number(tokenExpire))
        setCookie('RANDOM_CODE', randomCode)
        let currentType = USER_LOGIN_TYPE_MAPPING[currentUserType] || ''
        let sourceType = getLocalStorage('SOURCE_TYPE')

        // 根据来源类型设置cookie中的来来源类型和身份
        const sourceTypeOrderIdentity = updateCookieSourceType(sourceType, currentType)
        // 更新用户类型
        this.userType = currentType
        setCookie('SELECT_USER_TYPE', currentType)
        // 更新用户信息
        const { code = '' } = userInfo || {}
        setCookie('USER_CODE', code)
        this.updateUserData(userInfo)

        // 更新用户组信息
        this.userGroup = groupList

        // 更新用户工作台信息
        this.workBench = getWorkBench({ userGroup: groupList, sourceType, siteData, currentType })

        // 获取路由指定跳转地址
        let { backUrl = '' } = history.location.query || {}

        // 获取401后回跳地址,(同用户类型，非同类型时清除上个账号的401记录)
        const fromUrl =
            fromUrlUserType.toString() === currentUserType.toString() ||
            fromUrlUserType.toString() === ''
                ? getCookie('FROM_URL')
                : ''

        /**  redirectUrl=http://www.izcoo.com  定制跳转  */
        if (redirectUrl) {
            let redirectUrlObj = new URL(decodeURIComponent(redirectUrl))
            redirectUrlObj.searchParams.append('token', accessToken)
            redirectUrlObj.searchParams.append('userCode', code)
            redirectUrlObj.searchParams.append('userType', '4')
            redirectUrlObj.searchParams.append('userIdentity', getCookie('SELECT_IDENTITY_CODE'))
            backUrl = redirectUrlObj?.toString()
        } else {
            backUrl =
                decodeURIComponent(backUrl as unknown as string) ||
                Cookies.get('loginBackUrl') ||
                fromUrl
        }
        // 获取默认身份
        switch (currentUserType) {
            case USER_LOGIN_TYPE.USER_LOGIN:
                await this.getDefaultUserIdentity()
                break
            case USER_LOGIN_TYPE.PERSON_TEACHER:
                this.defaultIdentity = getCookie('SELECT_IDENTITY_CODE')
                break
            default:
                await this.getDefaultOrganizationCode(currentUserType)
                await this.getDefaultOrganizationIdentity()
        }

        /** 初始密码拦截 */
        if (
            (data.userInfo?.isInitPassword &&
                [USER_LOGIN_TYPE.ORG_LOGIN, USER_LOGIN_TYPE.SELLER_LOGIN].indexOf(currentUserType) >
                    -1) ||
            (data?.userInfo?.personageInitPassWord &&
                [USER_LOGIN_TYPE.USER_LOGIN, USER_LOGIN_TYPE.PERSON_TEACHER].indexOf(
                    currentUserType,
                ) > -1)
        ) {
            history.push('/reset-pwd', {
                data,
                currentUserType,
                fromType,
                callback,
                redirectUrl,
            })
            return
        }
        delCookie('FROM_URL')
        if (fromType !== 'noJump') {
            if (fromType === 'register') {
                switch (currentUserType) {
                    case USER_LOGIN_TYPE.ORG_LOGIN:
                        // 机构注册时不走指定跳转逻辑
                        backUrl = ''
                        // 没有来源身份为通用注册，前往创建机构
                        console.log('没有来源身份为通用注册，前往创建机构', sourceType)
                        !sourceType && history.replace('/organization/create?register=1')
                        break
                    case USER_LOGIN_TYPE.SELLER_LOGIN:
                        // 机构资源方注册时不走指定跳转逻辑
                        backUrl = ''
                        // 资源方注册后跳转
                        console.log('资源方注册后跳转')
                        callback?.()
                        break
                    case USER_LOGIN_TYPE.PERSON_TEACHER:
                        // 个人资源方注册跳转逻辑
                        loginRedirect({
                            authType: currentUserType,
                            requestOrganization: this.getUserOrganization as any,
                            orderIdentity: sourceTypeOrderIdentity,
                            orderBackUrl: backUrl as unknown as string,
                            normalRedirectMap: this.workBench,
                            sourceType,
                            siteData,
                        })
                        break
                    default:
                        // 正常注册时不走指定跳转逻辑 修改为需要注册后跳转逻辑
                        // backUrl = ''
                        console.log('注册后登录')
                        loginRedirect({
                            authType: currentUserType,
                            requestOrganization: this.getUserOrganization as any,
                            orderIdentity: sourceTypeOrderIdentity,
                            orderBackUrl: backUrl as unknown as string,
                            normalRedirectMap: this.workBench,
                            sourceType,
                            siteData,
                        })
                }
            } else if (portalCode && Number(currentUserType) === USER_LOGIN_TYPE.ORG_LOGIN) {
                // 门户机构登录
                const orgDomain = findSiteData(siteData, 'orgDomain', { findKey: 'baseInfo' }) || ''
                console.log('orgDomain', orgDomain)
                // 处理自定义域名跳转
                if (areSameRootDomain(orgDomain, window.location.host)) {
                    await this.updateCurrentOrgCode(portalCode)
                    location.href = `${orgDomain}/workbench`
                } else {
                    const pcDomain =
                        findSiteData(siteData, 'pcDomain', { findKey: 'baseInfo' }) || ''

                    location.href = `${pcDomain}/account/keepalive?randomCode=${randomCode}&portalCode=${portalCode}`
                    // location.href = `http://localhost:8011/account/keepalive?randomCode=${randomCode}&portalCode=${portalCode}`
                }
            } else {
                // 优先跳转路由指定跳转地址 其次fromUrl 再次通用跳转地址
                loginRedirect({
                    authType: currentUserType,
                    requestOrganization: this.getUserOrganization as any,
                    orderIdentity: sourceTypeOrderIdentity,
                    orderBackUrl: backUrl as unknown as string,
                    normalRedirectMap: this.workBench,
                    sourceType,
                    siteData,
                })
            }
        } else {
            // 不跳转时 仅更新组织列表
            if (currentUserType !== USER_LOGIN_TYPE.USER_LOGIN) {
                this.getUserOrganization()
            }
        }
    }

    /**
     * 多机构选择后 跳转
     */
    afterSelectOrganization = () => {
        //@ts-ignore
        const currentUserType = USER_TYPE_NUM[this.userType]
        // const backUrl = Cookies.get('loginBackUrl') || getCookie('FROM_URL')
        let sourceType = getLocalStorage('SOURCE_TYPE')
        const siteData = getLocalStorage('SITE_STORE')?.siteData || {}
        // 获取上个用户登录类型
        const fromUrlUserType = getCookie('FROM_URL_USER_TYPE') || ''
        // 获取路由指定跳转地址
        let { backUrl = '' } = history.location.query || {}
        // 获取401后回跳地址,(同用户类型，非同类型时清除上个账号的401记录)
        const fromUrl =
            fromUrlUserType.toString() === currentUserType.toString() ||
            fromUrlUserType.toString() === ''
                ? getCookie('FROM_URL')
                : ''
        delCookie('FROM_URL')
        backUrl =
            decodeURIComponent(backUrl as unknown as string) ||
            Cookies.get('loginBackUrl') ||
            fromUrl

        bLoginGo({
            authType: currentUserType,
            orderBackUrl: backUrl as unknown as string,
            normalRedirectMap: this.workBench,
            sourceType,
            siteData,
        })
    }

    /**
     *  获取用户信息
     */
    getUserData = async () => {
        let userData: UserInfo = (await Http(
            globalApi.getUserInfo,
            'get',
            {},
            {
                repeatFilter: false,
            },
        )) as unknown as UserInfo
        let { code } = userData || {}
        Storage.setCookie('USER_CODE', code)
        this.updateUserData(userData)
        // this.update_user_to_gateway(userData)

        return userData
    }

    /**
     * 获取工作台地址
     *  */
    getUserGroup = async () => {
        let userGroup: UserGroupItem[] = (await Http(
            globalApi.getUserGroup,
            'get',
            {},
        )) as unknown as UserGroupItem[]
        this.userGroup = userGroup

        const siteData = getLocalStorage('SITE_STORE')?.siteData || {}
        let sourceType = getLocalStorage('SOURCE_TYPE')

        let currentType = getCookie('SELECT_USER_TYPE')
        // 更新用户工作台信息
        this.workBench = getWorkBench({ userGroup, sourceType, siteData, currentType })
    }

    /**
     * 获取用户当前身份的机构，没有身份就获取全量的机构列表
     */
    getUserOrganization = async () => {
        if (!getCookie('TOKEN')) return
        let identity = getCookie('SELECT_IDENTITY_CODE')
        // 有来源身份，请求当前身份的机构，没有来源身份或者来源身份为机构时，请求全量的机构
        let requestApi =
            identity && Number(identity) !== ORG_IDENTITY_MAPPING[ORG_SOURCE_TYPE_ENUM.ORG]
                ? `${globalApi.getOrgListByIdentity}/${identity}`
                : globalApi.getUserOrg

        let userOrg: UserOrgItem[] = (await Http(
            requestApi,
            'get',
            {},
            {
                repeatFilter: true,
            },
        )) as unknown as UserOrgItem[]
        this.userOrg = userOrg
        if (userOrg.length === 1) {
            const { organizationCode = '' } = userOrg[0]
            await this.updateCurrentOrgCode(organizationCode)
        }
        return userOrg
    }

    /**
     * 退出登录 名称已经和其他的项目有约定 请勿修改
     */
    login_out = (orderUrl?: string) => {
        Http(globalApi.loginOut, 'get', {})
            .then(() => {
                const siteStore = getLocalStorage('SITE_STORE')
                const sourceType = getLocalStorage('SOURCE_TYPE')
                // 七鱼客服用户登出
                window?.ysf?.('logoff')
                if (this.tag === 'portal') {
                    Storage.delCookie('TOKEN')
                    history.replace(`/user/login`)
                } else {
                    const sid = findSiteData(siteStore?.siteData, 'sid')

                    const pcDomain = findSiteData(siteStore?.siteData, 'pcDomain', {
                        findKey: 'baseInfo',
                    })

                    const kp_org_login_theme = findSiteData(
                        siteStore?.siteData,
                        'kp_org_login_theme',
                    )?.value
                    let currentUserType = this.userType
                    this.initStore()
                    this.childStoreInitList = []

                    message.success('退出成功')
                    // 从业务方登录后，退出登录跳回业务方工作台
                    if ((sid || '')?.toString() !== '1') {
                        if (RUN_ENV === 'local') {
                            if (orderUrl && typeof orderUrl === 'string') {
                                window.location.replace(orderUrl)
                                return
                            }
                            if (kp_org_login_theme === '/egzlogin') {
                                history.replace('/egzlogin')
                            } else if (kp_org_login_theme === '/sclogin') {
                                history.replace('/sclogin')
                            } else {
                                if (currentUserType === LOGIN_TYPE.ORG_LOGIN && sourceType) {
                                    history.replace(`/user/${sourceType}/login`)
                                } else {
                                    // history.replace('/user/login')
                                    let selectIdentityCode = getCookie('SELECT_IDENTITY_CODE') || ''
                                    const selectUserType = getCookie('SELECT_USER_TYPE')
                                    doToLogin(
                                        selectIdentityCode,
                                        Number(LOGIN_TYPE_STR_TO_NUM[selectUserType]) || undefined,
                                    )
                                }
                            }
                        } else {
                            if (orderUrl && typeof orderUrl === 'string') {
                                window.location.replace(orderUrl)
                                return
                            }
                            if (pcDomain) {
                                // TODO 退出登录不跳往pcdomain
                                window.location.replace(pcDomain)
                            } else {
                                if (kp_org_login_theme === '/egzlogin') {
                                    history.replace('/egzlogin')
                                } else if (kp_org_login_theme === '/sclogin') {
                                    history.replace('/sclogin')
                                } else {
                                    if (currentUserType === LOGIN_TYPE.ORG_LOGIN && sourceType) {
                                        history.replace(`/user/${sourceType}/login`)
                                    } else {
                                        // history.replace('/user/login')
                                        let selectIdentityCode =
                                            getCookie('SELECT_IDENTITY_CODE') || ''
                                        const selectUserType = getCookie('SELECT_USER_TYPE')
                                        doToLogin(
                                            selectIdentityCode,
                                            Number(LOGIN_TYPE_STR_TO_NUM[selectUserType]) ||
                                                undefined,
                                        )
                                    }
                                }
                            }
                        }
                    } else {
                        let source_type = getLocalStorage('SOURCE_TYPE')
                        const personMerchantRoute = getCookie('PERSON_MERCHANT_ROUTE')
                        if (
                            currentUserType === LOGIN_TYPE.PERSON_TEACHER ||
                            source_type === MERCHANT_LOGIN_TYPE.PERSON_TEACHER
                        ) {
                            history.replace(`/teacher/${personMerchantRoute}/login`)
                        } else {
                            history.replace(`/seller/login?sourceType=${sourceType}`)
                        }
                    }
                }
            })
            .catch(() => {})
    }

    /**
     * 前往fromUrl
     */
    gotoFrom = () => {
        const fromUrl = getCookie('FROM_URL')
        const excludeList = ['/', '/404', '/500', '/user/login']
        const portalCode = getPortalCodeFromUrl()
        delCookie('FROM_URL')
        if (fromUrl && !excludeList?.includes(fromUrl) && !fromUrl.includes('/user/login')) {
            // let result = fromUrl.includes('https://') || fromUrl.includes('http://')
            // result ? (window.location.href = fromUrl) : history.replace(fromUrl)
            window.location.href = fromUrl
        } else {
            if (portalCode) {
                // 存在于门户中
                // const masterHistoryVO = getMasterHistory()
                // if (masterHistoryVO) {
                //     // console.log(`/${portalCode}/mine/`)
                //     masterHistoryVO.masterHistory?.push(`/${portalCode}/mine/`)
                // }
                const currentAlias = location.pathname.split('/')?.[1] || ''
                location.href = `/${currentAlias}/mine/`
            } else {
                // 独立于门户
                history.replace('/account')
            }
        }
    }

    /**
     * 切换机构后，根据是否有权限确定去往机构/角色管理 or 首页
     */
    gotoHomeAfterChooiceOrg = (code: string, url: string) => {
        this.getUserPermissionList(code).then(() => {
            let flag: boolean = false

            this.userPermissionList.map(item => {
                if (item === url) {
                    flag = true
                }
            })

            if (flag) {
                history.replace(url)
            } else {
                history.replace('/account')
            }
        })
    }

    /**
     * 扫描二维码后的回调
     * @param  regFlag,  判断账号有没有注册  true为已注册
     * @param  accessToken,  扫码后获取的token
     * @param  userCode,   扫码后获取的userCode
     * @param  authOpenId,  扫码后获取的authOpenId
     * @param  authType, 扫码后获取的authType  wx或者 dd
     *  @param  userType, 用户登录类型
     */
    afterScanningCode = (data: AccessTokenTYPE) => {
        let {
            registerFlag,
            accessToken,
            authOpenId,
            authType,
            userType,
            tokenExpire = 7,
        } = data || {}
        let siteStore = getLocalStorage('SITE_STORE') || {}
        let { sid = '' } = siteStore?.siteData?.data || {}
        //@ts-ignore
        data.appKey = 'web'
        //@ts-ignore
        data.sid = sid
        const isRegistry = (flag: boolean) =>
            flag
                ? this.updateUserAccount(data as unknown as UserAccount, Number(userType))
                : history.replace(
                      `/user/binding?type=${userType}&authOpenId=${authOpenId}&authType=${authType}`,
                  )

        const merchantType = (flag: boolean) => {
            console.log('merchantType', flag)

            if (flag) {
                setCookie('TOKEN', accessToken, Number(tokenExpire))
                history.replace(
                    `/select/seller-organization?sourceType=${getSessionStorage(
                        'CREATE_SOURCE',
                    )}&type=login`,
                )
            } else {
                history.replace(
                    `/seller/register?sourceType=${getSessionStorage(
                        'CREATE_SOURCE',
                    )}&authType=${authType}&authOpenId=${authOpenId}`,
                )
            }
        }

        const userMerchantType = (flag: boolean) => {
            if (flag) {
                this.updateUserAccount(data as unknown as UserAccount, Number(userType))
            } else {
                const personMerchantRoute = getCookie('PERSON_MERCHANT_ROUTE')
                history.replace(
                    `/teacher/${personMerchantRoute}/binding?type=${userType}&authOpenId=${authOpenId}&authType=${authType}`,
                )
            }
        }

        const userTypeMap: Record<string, () => void> = {
            '1': () => isRegistry(registerFlag!),
            '2': () => isRegistry(registerFlag!),
            '3': () => merchantType(registerFlag!),
            '4': () => userMerchantType(registerFlag!),
        }
        userTypeMap[userType!]?.()
    }

    /**
     * 数据重置
     */
    initStore = () => {
        delCookie('TOKEN')
        delLocalStorage('USER_STORE')
        delSessionStorage('COMPANY_BACK_URL')
        delCookie('USER_CODE')
        delCookie('SELECT_ORG_CODE')
        delCookie('SELECT_ROLE_NAME')
        delCookie('SELECT_USER_TYPE')
        delCookie('SOURCE_TYPE')
        delCookie('SELECT_IDENTITY_CODE')
        this.userAccount = undefined
        this.userData = undefined
        this.userGroup = []
        this.currentOrgCode = undefined
        this.userOrg = []
        this.currentOrgInfo = {}
        this.userType = undefined
        this.userPermissionList = []
        this.childStoreInitList.map((item: any) => {
            item?.()
        })
    }

    /***收集子应用的store重置方法 */
    children_store_clean = (handler: any) => {
        const matchHandlerList = this.childStoreInitList.filter((item: any) => item === handler)
        if (matchHandlerList.length === 0) {
            this.childStoreInitList.push(handler)
        }
    }

    // 当页面load完成，get数据计算完成之后，isHydrated会置为true
    // 从本地同步数据到store是异步的 所以最好在页面useEffect添加store.isHydrated依赖 在里面判断isHydrated为true 之后再去做一些数据处理 防止数据错误
    get isHydrated() {
        return isHydrated(this)
    }
}
