import { makeAutoObservable } from 'mobx'
import { makePersistable, isHydrated } from 'mobx-persist-store'
import { message, Modal } from 'antd'
import * as Storage from '@/storage'
import globalApi from '@/servers/globalApi'
import type {
    ClearType,
    identityType,
    organizationType,
    permissionType,
    userDataType,
    ShoppingCarType,
    ChildCallback,
} from './interface'
import Http from '@/servers/http'
import { delCookie, getCookie, getLocalStorage, setCookie, setLocalStorage } from '@/storage'
// import { getLastPath } from '@/utils/pathUtils'
import type { routeConfigType } from '@/layouts/menuConfig'
import { getNowType } from '@/utils/userUtils'
import http from '@/servers/http'
import api from './api'
import { findSiteData, getMapLoginUrl, midForEach } from '@wotu/wotu-components'
import { history } from 'umi'
import {
    getFirstMenuRoute,
    getRightPathPermissionList,
    getRouteConfig,
    getSpecialPermissionList,
    getUserPermissionRoute,
} from '@/utils/routeAnalysis'
import { cloneDeep } from 'lodash'
// @ts-ignore
import type { ProHeaderProps } from '@wotu/wotu-pro-components/dist/Header/interface'
import clearLocalData from '@/utils/clearLocalData'
import doToLogin from '@/utils/doToLogin'
import { LOGIN_TYPE_STR_TO_NUM } from '@wotu/wotu-components/dist/esm/Types/user'

let example: UserStore

let prevPermissionParams: any = {}

export class UserStore {
    // /** 是否是第一次进入页面 */
    // public initialPage: boolean = true
    /** 当前应用是否处于loading */
    public appLoadStatus: Record<string, Record<string, any>> = {
        'engineer-center': { path: '/engineer-center', mounted: false },
        exam: { path: '/exam', mounted: false },
        'exam-center': { path: '/exam-center', mounted: false },
        organization: { path: '/organization', mounted: false },
        'fe-enroll-permission-pc': { path: '/enroll-center', mounted: false },
        'fe-enroll-no-permission-pc': { path: '/enroll-gateway', mounted: false },
        'merchant-center': { path: '/merchant-center', mounted: false },
        'train-center': { path: '/engineer/train-center', mounted: false },
        'training-center': { path: '/training-center', mounted: false },
        'sign-center': { path: '/sign-center', mounted: false },
        'exam-seller': { path: '/exam-seller', mounted: false },
        'fe-job-pc': { path: '/employment-center', mounted: false },
        'monitor-center': { path: '/monitor-center', mounted: false },
        'exam-grid-paper': { path: '/exam-grid-paper', mounted: false },
        'trading-center': { path: '/trading-center', mounted: false },
        'student-center': { path: '/student-center', mounted: false },
    }
    /** 机构或者身份发生变化时 标记需要更新菜单 */
    public menuNeedChange: boolean = false
    /** 机构门户的code */
    public portalCode: string | undefined
    /** 是否已进行菜单请求 */
    public requestMenu: boolean = false
    /**站点id */
    public sid: number = null as unknown as number
    /**站点别名 */
    public alias: string | undefined
    /**用户身份类型 */
    public type = getNowType()
    /**用户详情 */
    public userData: userDataType = {} as userDataType
    /**用户当前身份购物车数量 */
    public shoppingCarNum: number = 0
    /**站点全量权限页面列表 */
    public sitePermissionRouteList: string[] = []
    /**用户身份权限页面列表 */
    public userPermissionRouteList: string[] = []
    /**用户权限列表 */
    public permissionList: permissionType[] = []
    /**用户权限id列表 */
    public permissionIdList: string[] = []
    /** 机构列表 */
    public organizationList: organizationType[] = []
    /** 身份列表 */
    public identityList: identityType[] = []
    /** 当前选择的身份 */
    public selectedIdentity = ''
    /** 当前选择的机构 */
    public selectedOrganization = getCookie('SELECT_ORG_CODE') || ''
    /** 默认的身份 */
    public defaultIdentity = ''
    /** 默认的机构 */
    public defaultOrganization = ''
    /** 当前机构详情 */
    //@ts-ignore
    public selectedOrganizationDetail: organizationType = {}
    /** layout路由配置 */
    public routeConfig: Record<string, Partial<routeConfigType>> = {
        '/gateway/web/create': {
            menu: false,
            header: false,
            layout: false,
        },
        '/gateway/pc-web/create': {
            menu: false,
            header: false,
            layout: false,
        },
        '/403': {
            menu: false,
            header: false,
            layout: false,
        },
        '/404': {
            menu: false,
            header: false,
        },
        '/template-page': {
            menu: false,
            header: false,
            layout: false,
        },
        '/case/list': {
            menu: false,
            header: false,
            layout: false,
        },
        '/case/detail': {
            menu: false,
            header: false,
            layout: false,
        },
        '/gateway/pc-view': {
            menu: false,
            header: false,
            layout: false,
        },
        '/enroll-center/enroll-center': {
            menu: false,
            header: false,
            layout: false,
        },
        '/enroll-center/enroll-management': {
            menu: false,
            header: false,
            layout: false,
        },
        '/enroll-center/enroll-succeeded': {
            menu: false,
            header: false,
            layout: false,
        },
        '/enroll-center/my-enrollment': {
            menu: true,
            header: true,
            layout: true,
        },
        '/sign-center/face-sign-in': {
            menu: false,
            header: false,
            layout: false,
        },
        '/sign-center/attendance-record': {
            menu: false,
            header: false,
            layout: false,
        },
    }
    /** 菜单宽度 */
    public menuWidth: number = 132
    /** 需要清除的localStorage列表 */
    public localClearList: string[] = []
    /** 需要清除的sessionStorage列表 */
    public sessionClearList: string[] = []
    /** 需要清除的cookie列表 */
    public cookieClearList: string[] = []

    public userPageConfig = []

    /**菜单改变回调函数 */
    public menuRouteChangeCallbackList: ((e: { url: string }) => void)[] = []

    /** header组件props */
    //@ts-ignore
    public headerProps: ProHeaderProps | false = {}

    /** 子应用到方法注册表 */
    public childCallback: ChildCallback = {}

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
        makePersistable(this, {
            name: 'workUserStore', // 保存的name，用于在storage中的名称标识，只要不和storage中其他名称重复就可以
            properties: [
                'requestMenu',
                'sid',
                'type',
                'userData',
                'sitePermissionRouteList',
                'userPermissionRouteList',
                'permissionList',
                'permissionIdList',
                'organizationList',
                'identityList',
                'selectedIdentity',
                'selectedOrganization',
                'selectedOrganizationDetail',
                'defaultIdentity',
                'defaultOrganization',
                'routeConfig',
                'menuWidth',
                'localClearList',
                'sessionClearList',
                'cookieClearList',
                'userPageConfig',
            ], // 要保存的字段，这些字段会被保存在name对应的storage中，注意：不写在这里面的字段将不会被保存，刷新页面也将丢失：get字段例外。get数据会在数据返回后再自动计算
            storage: window.localStorage, // 保存的位置：看自己的业务情况选择，可以是localStorage，sessionstorage
        })
    }

    /**设置当前应用是否处于loading */
    setAppLoadStatus = (appLoadStatus: Record<string, Record<string, any>>) => {
        this.appLoadStatus = appLoadStatus
    }

    /**
     * 更新待清除字段
     * @param {ClearType} type 需要清除字段的存储类型
     * @param {string} keyName 需要清除字段的key名
     */
    updateClearKey = (type: ClearType, keyName: string) => {
        this[`${type}ClearList`].push(keyName)
    }

    /**
     * 获取页头定制配置
     * @param {ProHeaderProps} type 获取页头定制配置
     */
    updateHeaderProps = (headerProps: ProHeaderProps) => {
        if (headerProps) {
            this.headerProps = headerProps
        }
    }

    /**
     * 关闭layout应用加载
     */
    closeLayoutApp = () => {
        this.headerProps = false
    }

    /**更新站点id */
    updateSiteSid = (sid: number) => {
        this.sid = sid
    }

    /**更新站点别名 */
    updateSiteAlias = (alias: string) => {
        this.alias = alias
    }

    /**更新门户code */
    updatePortalCode = (code: string) => {
        this.portalCode = code
    }

    /**更新用户类型 */
    updateUserType = () => {
        this.type = getNowType()
    }

    /**更新菜单宽度 */
    updateMenuWidth = (num: number) => {
        this.menuWidth = num
    }

    /**
     *  获取权限列表
     */
    dyGetPermissionList() {
        if (getNowType()?.toString() === '1') {
            this.getUserPermissionList()
        } else if (getNowType()?.toString() === '4') {
            // 中心个人
            this.getPersonalPermissionList()
        } else {
            // 站点信息未获取到时 不进行权限请求
            if (!this.selectedOrganization) return
            this.getOrgUserPermissionList()
        }
    }

    /**
     *  获取身份列表
     */
    dyGetIdentityList(code?: string) {
        if (getNowType().toString() === '1') {
            this.getUserIdentityList()
        } else {
            this.getOrganizationIdentityList(code!)
        }
    }

    /**
     * 选中身份
     * @param {string} value 身份id
     * @param {object} item 完整的身份信息item
     */
    setSelectIdentity = (value: string, menuNeedChange = true) => {
        // 当切换身份时 标记菜单需要改变
        if (
            this.selectedIdentity.toString() !== value.toString() &&
            getCookie('SELECT_IDENTITY_CODE').toString() !== value.toString()
        ) {
            this.menuNeedChange = menuNeedChange
        }
        this.selectedIdentity = value
        // 切换身份把code存入cookie
        value && setCookie('SELECT_IDENTITY_CODE', value)
    }

    /**
     *  获取默认身份
     */
    dyGetDefaultIdentityList(code?: string) {
        if (getNowType().toString() === '1') {
            this.getUserDefaultIdentity()
        } else {
            this.getDefaultOrganizationIdentity(code!)
        }
    }

    /**
     *  设置默认身份
     * @param {} identityId 默认身份id
     * @param {} code 当前选中的机构code
     */
    setDefaultIdentity(identityId: string) {
        if (getNowType().toString() === '1') {
            this.setUserDefaultIdentity(identityId)
        } else {
            this.setDefaultOrganizationIdentity(this.selectedOrganization!, identityId)
        }
    }

    /**获取机构列表*/
    getOrganizationList() {
        return http(api.getOrganizationList, 'get', {}).then(res => {
            this.organizationList =
                this.sid === 1
                    ? ((res || []) as unknown as organizationType[]).filter(item => {
                          return item?.identityList?.includes(getCookie('SELECT_IDENTITY_CODE'))
                      })
                    : ((res || []) as unknown as organizationType[])
        })
    }

    /**
     * 选中机构
     * @param {string} value
     * @param {} item 机构的item
     */
    setSelectOrganization = async (value: string) => {
        // 当切换组织时 标记菜单需要改变
        if (
            this.selectedOrganization.toString() !== value.toString() &&
            getCookie('SELECT_ORG_CODE').toString() !== value.toString()
        ) {
            this.menuNeedChange = true
        }
        setCookie('SELECT_ORG_CODE', value)
        this.selectedOrganization = value
        await this.dyGetIdentityList(value)
        await this.getDefaultOrganizationIdentity(value)
    }

    /**
     * 设置默认机构
     * @param {string} value
     * @param {(2 | 3)} groupType 2:机构,3:资源方
     */
    setDefaultOrganization = async (value: string, groupType: 2 | 3) => {
        this.defaultOrganization = value
        await http(api.setDefaultOrganization, 'post', { organizationCode: value, groupType })
        /** 本期为了保证之前的逻辑 没有问题 这个先暂时关起来  */
        // this.userStore.setSelectOrganization?.(this.selectedOrganization)
        // this.userStore.setDefaultOrganization?.(this.defaultOrganization)
    }

    /**
     * 获取默认机构
     * @param {(2 | 3)} groupType 2:机构,3:资源方
     */
    getDefaultOrganization(groupType: 2 | 3) {
        return http(`${api.getDefaultOrganization}${groupType}`, 'get', {}).then((res: any) => {
            this.defaultOrganization = res || ''
            this.selectedOrganization = getCookie('SELECT_ORG_CODE')
        })
    }

    /**
     * 获取机构详情
     * @param {string} organizationCode
     */
    getSelectedOrganizationDetail(organizationCode: string) {
        return http(`${api.getOrganizationDetail}${organizationCode}`, 'get', {}).then(
            (res: any) => {
                this.selectedOrganizationDetail = res || {}
            },
        )
    }

    /**
     * 页面初始化时 判断当前路由
     * 1、当前路由不是 404等状态路由
     * 2、当前路由存在于站点全量权限路由中
     * 3、当前路由不存在于用户身份权限路由中时 自动前往用户身份权限路由中的第一个路由
     *
     * 当切换了身份
     * 前往第一个路由
     */
    toFirstMenuRoute = (permissionList: permissionType[]) => {
        // 可能会是子应用 所以使用umi的history获取当前应用的路由数据
        const noRredirect: string[] = ['/404', '/403', '/500']
        let routeList = getFirstMenuRoute(permissionList)
        let currentPathname = history.location.pathname
        // 当检测到菜单需要改变 直接进行跳转权限第一个
        if (this.menuNeedChange) {
            this.menuNeedChange = false
            history.replace(routeList[0])
        } else {
            if (!noRredirect.includes(history.location.pathname)) {
                if (currentPathname === '' || currentPathname === '/') {
                    history.replace(routeList[0])
                } else {
                    // 当前路由存在于站点全量权限路由中
                    if (this.sitePermissionRouteList.includes(currentPathname)) {
                        // 当前路由不存在于用户身份权限路由中时 自动前往用户身份权限路由中的第一个路由
                        if (!this.userPermissionRouteList.includes(currentPathname)) {
                            history.replace(routeList[0])
                        }
                    }
                }
            }
        }
    }

    /**
     *
     * 机构改变
     * @param {string} organizationCode
     * @param {string} identityCode
     */
    onChangeOrganization = (organizationCode: string, identityCode: string) => {
        this.selectedOrganization = organizationCode
        this.selectedIdentity = identityCode
    }

    /**
     *
     *  设置permissionList
     * @param {permissionType} permissionList
     * @description ：
     * 副作用：
     *  根据筛选后的身份权限，产生用户权限路由列表和路由布局配置列表
     */
    setPermissionList = (permissionList: permissionType[]) => {
        const siteStore = getLocalStorage('SITE_STORE')
        // 获取站点业务线
        const tags =
            findSiteData(siteStore, 'tagIdList', {
                findKey: 'baseInfo',
            }) || []
        let finallyPermissionList = getSpecialPermissionList(permissionList, this.sid) || []
        finallyPermissionList = getRightPathPermissionList(finallyPermissionList)

        // const returnTrue = () => {
        //     return getNowType().toString() === '1' || getNowType().toString() === '4'
        // }

        // // 工作台路由，湖南职业技能培训需要定制
        // const returnWorkRoute = () => {
        //     if (tags?.indexOf(1) > -1 && getNowType().toString() === '2') {
        //         // 跳转到创培定制的个人中心路由
        //         return '/training-center/home'
        //     }
        //     return '/workbench'
        // }

        let defaultPermission: any = []
        // this.alias === 'hun' && getNowType().toString() === '1'
        //     ? []
        //     : ([
        //           {
        //               alias: '',
        //               apiList: [],
        //               changeEnable: false,
        //               // @ts-ignore
        //               checkIcon:
        //                   'https://i.zpimg.cn/public_read/menu_icon/169254732pn2kphc.svg',
        //               childList: [],
        //               children: [],
        //               description: '',
        //               has: false,
        //               hide: false,
        //               icon: returnTrue()
        //                   ? 'https://i.zpimg.cn/public_read/menu_icon/169254722q6zfitc.svg'
        //                   : 'https://i.zpimg.cn/public_read/menu_icon/169254722pmgqry8.svg',
        //               key: 'default_menu_key',
        //               layoutHeader: 1,
        //               layoutMenu: 1,
        //               menu: 1,
        //               moduleId: 'default_module',
        //               moduleName: '',
        //               openType: 0,
        //               parentChain: [],
        //               parentName: '',
        //               pid: 0,
        //               platformName: '',
        //               route: returnWorkRoute(),
        //               sort: 9999,
        //               special: [],
        //               terminal: 1,
        //               thisModule: false,
        //               title: returnTrue() ? '个人中心' : '工作台',
        //               type: 1,
        //               webApplication: 0,
        //           },
        //       ] as permissionType[])

        if (tags?.indexOf(1) > -1) {
            /**
             * 创培业务线 暂时关闭工作台菜单
             */
            defaultPermission = []
        }

        if (this.alias !== 'jiangsu') {
            /**添加工作台默认权限
             * jiangsu站点除外
             */
            finallyPermissionList = defaultPermission.concat(finallyPermissionList)
        }

        this.permissionList = finallyPermissionList
        this.setUserPermissionRouteList(finallyPermissionList)
        this.setRouteConfig(finallyPermissionList)
        this.setPermissionIdList(finallyPermissionList)
        this.toFirstMenuRoute(finallyPermissionList)
    }

    /**
     *
     *  子应用更新permissionList
     * @param {permissionType} permissionList
     * @description
     */
    childUpdatePermissionList = (permissionList: permissionType[]) => {
        let finallyPermissionList = getSpecialPermissionList(permissionList, this.sid) || []
        finallyPermissionList = getRightPathPermissionList(finallyPermissionList)
        this.permissionList = finallyPermissionList
        this.setUserPermissionRouteList(finallyPermissionList)
        this.setRouteConfig(finallyPermissionList)
        this.setPermissionIdList(finallyPermissionList)
    }

    /**
     *  通过permissionList设置routeConfig
     * @param {permissionType} permissionList
     */
    setUserPermissionIdList = (permissionList: permissionType[]) => {
        const permissionListRouteConfig = getRouteConfig(permissionList) || {}
        const tempRouteConfig = { ...cloneDeep(this.routeConfig), ...permissionListRouteConfig }
        this.routeConfig = tempRouteConfig
    }
    /**
     *  通过permissionList设置routeConfig
     * @param {permissionType} permissionList
     */
    setRouteConfig = (permissionList: permissionType[]) => {
        const permissionListRouteConfig = getRouteConfig(permissionList) || {}
        const tempRouteConfig = { ...cloneDeep(this.routeConfig), ...permissionListRouteConfig }
        this.routeConfig = tempRouteConfig
    }
    /**
     *  设置站点全量权限路由
     * @param {string[]} routeList
     */
    setSitePermissionRouteList = (routeList: string[]) => {
        window.sitePermissionRouteList = routeList
        this.sitePermissionRouteList = routeList
    }
    /**
     *  通过permissionList获取用户权限路由
     * @param {permissionType} permissionList
     */
    setUserPermissionRouteList = (permissionList: permissionType[]) => {
        const permissionRoute = getUserPermissionRoute(permissionList) || []
        window.userPermissionRouteList = permissionRoute
        this.userPermissionRouteList = permissionRoute
    }
    /**
     *  用户所有的权限id
     * @param {string[]} permissionIdList
     */
    setPermissionIdList = (permissionList: permissionType[]) => {
        const permissionIdList: string[] = []
        const loop = (list: permissionType[]) => {
            list.map(item => {
                const { key = '', children = [] } = item || {}
                permissionIdList.push(key as unknown as string)
                loop(children)
            })
        }
        loop(permissionList)
        this.permissionIdList = permissionIdList
        window.permissionIdList = permissionIdList
    }

    /** 获取用户信息 */
    getUserData = async () => {
        const userData: userDataType = (await Http(
            api.getUserData,
            'get',
            {},
            {
                repeatFilter: false,
            },
        )) as unknown as userDataType

        const userPageConfig = await Http(globalApi.getUserPageConfig, 'get', {
            userCode: userData.code,
        })
        this.updateUserPageConfig(userPageConfig)

        this.updateUser(userData)
    }
    /** 获取用户购物车信息 */
    getShoppingCar = async () => {
        if (Number(this.type || 0) !== 2) return
        const customHeaders =
            Number(this.type || 0) !== 1
                ? { customHeader: { 'X-Organization-Code': this.selectedOrganization } }
                : {}
        const shopCar: ShoppingCarType = (await Http(
            api.getShoppingCar,
            'post',
            {},
            {
                repeatFilter: false,
                ...customHeaders,
            },
        )) as unknown as ShoppingCarType
        const { count, identityId, organizationCode } = shopCar || {}
        /**购物车数据中的身份和机构与当前用户选中的机构和身份不一致时，不作为用户的购物车数据 */
        if (
            identityId.toString() === this.selectedIdentity.toString() &&
            organizationCode.toString() === this.selectedOrganization.toString()
        ) {
            this.shoppingCarNum = Number(count || 0)
        } else {
            this.shoppingCarNum = 0
        }
    }

    /** 更新用户信息 */
    updateUser = (data: userDataType) => {
        this.userData = data
        if (data.isInitPassword && ['2', '3'].indexOf(getNowType()) > -1) {
            Modal.warning({
                title: '当前为初始密码，为保障您的账号安全，请重新设置您的登录密码。',
                okText: '去设置',
                onOk: () => {
                    const domain = new URL(
                        getMapLoginUrl({ type: 'storage', key: 'workSiteStore' }) || '',
                    ).origin
                    window.location.href = `${domain}/account/reset-pwd?currentUrl=${window.location.href}`
                },
            })
        }
    }

    updateUserPageConfig = (data: any) => {
        this.userPageConfig = data
    }

    /**
     * 获取站点全量权限页面列表
     */
    getSitePermissionList = async (sid: string) => {
        const pageList = ((await http(`${api.getSitePageList}${sid}`, 'get', {})) ||
            []) as unknown as string[]
        this.setSitePermissionRouteList(pageList)
    }

    /**
     * 获取非个人用户权限
     */
    getOrgUserPermissionList = async () => {
        const params = {
            identity: this.selectedIdentity,
            organizationCenter: 0,
            organizationCode: this.selectedOrganization,
            terminal: 1,
            // type: 1,
        }
        if (prevPermissionParams?.identity?.toString?.() !== params.identity?.toString?.()) {
            return http(`${api.getOrganizationPermissionList}`, 'post', params)
                .then((res: any) => {
                    // TODO 机构中心暂时没接入 接入后可删除----start
                    midForEach(
                        res || [],
                        (item: any) => {
                            if (item.children && item.children.length) {
                                item.children = item.children.filter(
                                    // @ts-ignore
                                    i => !/^(--hide)/.test(i?.description),
                                )
                            }
                        },
                        { findKey: 'children' },
                    )
                    let result: any[] = []
                    if (Array.isArray(res)) {
                        result = res?.filter(i => !/^(--hide)/.test(i?.description))

                        //TODO 职培未接入 先排除
                        // result = res?.filter(i => i?.key?.toString() !== '10763')
                    }
                    //TODO 机构中心暂时没接入 接入后可删除----end
                    this.setPermissionList(result || [])
                    // this.setPermissionList(res || [])
                })
                .finally(() => {
                    this.requestMenu = true
                })
        } else {
            this.requestMenu = true
        }
    }

    /**
     * 获取个人用户权限
     */
    getUserPermissionList = async () => {
        const API = api.getUserPermissionList

        const params = {
            identity: this.selectedIdentity,
            terminal: 1,
            // type: 1,
        }

        const method = 'post'

        if (prevPermissionParams?.identity?.toString?.() !== params.identity?.toString?.()) {
            prevPermissionParams = params
            // @ts-ignore
            return http(`${API}`, method, params)
                .then((res: any) => {
                    this.setPermissionList(res || [])
                })
                .finally(() => {
                    this.requestMenu = true
                })
        } else {
            this.requestMenu = true
        }
    }
    /**  获取 中心个人 讲师 权限  */
    getPersonalPermissionList() {
        let API = api.getPersonalList
        let from_sid = getLocalStorage('FROM_SID') || undefined

        let params = {
            identity: this.selectedIdentity,
            terminal: 1,
            // type: 1,
            sid: from_sid,
        }

        let method = 'post'
        if (prevPermissionParams?.identity?.toString?.() !== params.identity?.toString?.()) {
            prevPermissionParams = params
            // @ts-ignore
            return http(`${API}`, method, params)
                .then((res: any) => {
                    this.setPermissionList(res || [])
                })
                .finally(() => {
                    this.requestMenu = true
                })
        } else {
            this.requestMenu = true
        }
    }

    /**
     * 获取非个人身份列表
     * @param code 机构code
     */
    getOrganizationIdentityList(code: string) {
        return http(`${api.getOrganizationIdentityList}${code}`, 'get', {}).then((res: any) => {
            this.identityList = res
        })
    }

    /**
     * 获取非个人的默认的身份
     * @param {string} code 机构code
     */
    getDefaultOrganizationIdentity(code: string) {
        // 资源方身份登录后确定 切换组织不更换身份
        if (getCookie('SELECT_IDENTITY_CODE') && this.sid === 1) {
            this.defaultIdentity = getCookie('SELECT_IDENTITY_CODE')
            this.selectedIdentity = getCookie('SELECT_IDENTITY_CODE')
            setCookie('DEFAULT_IDENTITY_CODE', getCookie('SELECT_IDENTITY_CODE'))
            return
        }

        return http(`${api.getDefaultOrganizationIdentity}${code}`, 'get', {}).then((res: any) => {
            if (!res) return
            this.defaultIdentity = res || ''
            setCookie('DEFAULT_IDENTITY_CODE', res)
            /**当第一次设置身份时，清除不匹配当前用户的用户缓存 */
            if (!this.selectedIdentity) {
                clearLocalData(this.userData?.code, this.selectedOrganization, res, () => {
                    this.selectedIdentity = res || ''
                    setCookie('SELECT_IDENTITY_CODE', res)
                })
            } else {
                this.selectedIdentity = res || ''
                setCookie('SELECT_IDENTITY_CODE', res)
            }
            return res
        })
    }

    /**
     * 设置非个人的默认的身份
     * @param {string} code 机构code
     * @param {React.Key} identityId 身份id
     */
    setDefaultOrganizationIdentity(code: string, identityId: string) {
        this.defaultIdentity = identityId
        setCookie('DEFAULT_IDENTITY_CODE', identityId)
        return http(api.setDefaultOrganizationIdentity, 'post', {
            organizationCode: code,
            identity: identityId,
        }).then(() => {
            this.getOrgUserPermissionList()
        })
    }

    /**
     * 获取个人用户身份列表
     */
    getUserIdentityList() {
        return http(api.getUserIdentityList, 'get', {}).then((res: any) => {
            this.identityList = res || []
        })
    }

    /**
     * 获取个人用户默认身份
     */
    getUserDefaultIdentity(examIdentity?: string) {
        return http(api.getUserDefaultIdentity, 'get', {}).then((res: any) => {
            // 如果当前域名
            this.defaultIdentity = res?.id

            /**当第一次设置身份时，清除不匹配当前用户的用户缓存 */
            if (!this.selectedIdentity) {
                clearLocalData(this.userData?.code, this.selectedOrganization, res?.id, () => {
                    this.selectedIdentity = examIdentity || res?.id
                })
            }

            // 考试默认以及选中的身份都必须是学员，不然会跳不到考试页面（权限问题）
            if (examIdentity) {
                this.setUserDefaultIdentity(examIdentity)
                this.setSelectIdentity(examIdentity, false)
            }
        })
    }

    /**
     *设置个人用户默认身份
     * @param {string} identityId
     */
    setUserDefaultIdentity(identityId: string) {
        this.defaultIdentity = identityId
        setCookie('DEFAULT_IDENTITY_CODE', identityId)
        return http(`${api.setUserDefaultIdentity}${identityId}`, 'post', {}).then(() => {
            this.getUserPermissionList()
        })
    }
    /**
     *获取门户详情
     */
    getPortalData = async (org?: string) => {
        const res: any =
            (await Http(
                `${globalApi.getPortalData}`,
                'get',
                { organizationCode: org || this.selectedOrganization },
                { repeatFilter: false },
            )) || {}

        return res
    }
    /**
     * 通过自定义别名获取组织code  通过code查自定义域名
     */
    getPortalCodeByAlias = async (alias: string) => {
        const res: any =
            (await Http(
                `${globalApi.getPortalCodeByAlias}${alias}`,
                'get',
                { code: alias },
                { repeatFilter: false },
            )) || {}
        const { customDomain } = res
        return customDomain
    }

    /**
     * 存储业务线要求的本地存储key
     */
    updateCustomKey = (type: 'local' | 'session' | 'cookie', keys: string[]) => {
        const { code } = this.userData
        const localCleanData = getLocalStorage('LOCAL_CLEAN_DATA')
        let {
            userCode = code,
            organization = this.selectedOrganization,
            identity = this.selectedIdentity,
            local = [],
            session = [],
            cookie = [],
        } = localCleanData || {}

        switch (type) {
            case 'local':
                local = local.concat(keys)
                local = Array.from(new Set(local))
                break
            case 'session':
                session = session.concat(keys)
                session = Array.from(new Set(session))
                break
            case 'cookie':
                cookie = cookie.concat(keys)
                cookie = Array.from(new Set(cookie))
                break
        }

        setLocalStorage('LOCAL_CLEAN_DATA', {
            userCode,
            organization,
            identity,
            local,
            session,
            cookie,
        })
    }

    /**
     * 清除业务线要求的本地存储项
     */
    clearCustomKey = () => {
        clearLocalData(undefined, undefined, undefined, () => {})
    }

    /**  onRouteChange  路由改变时候的回调  */
    onRouteChange = (e: string) => {
        sessionStorage.removeItem('searchData')
        this.menuRouteChangeCallbackList.map(i => {
            i?.({ url: e })
        })
    }

    /**  列表规范 获取子应用的菜单改变时候的方法 */
    bindMenuRouteChangeCallback = (fn: (e: { url: string }) => void) => {
        fn && this.menuRouteChangeCallbackList.push(fn)
    }

    /**
     * 子应用绑定注册方法到主体应用
     * @param type 事件类型
     * @param fn 事件引用
     * @param mode 注册方式 'single'（唯一） | 'multi'（重复）
     */
    bindChildCallback = (type: string, fn: () => void, mode: 'single' | 'multi' = 'single') => {
        let tempChildCallback = this.childCallback
        let typeChildCallback = tempChildCallback[type] || []
        if (mode === 'single') {
            typeChildCallback = [fn]
        } else {
            typeChildCallback.push(fn)
        }
        tempChildCallback[type] = typeChildCallback
        this.childCallback = tempChildCallback
    }

    /**  根据类型 触发子应用注册方法 */
    dispatchChildCallback = (type: string, params?: any) => {
        let tempParams = params || {}
        let tempChildCallback = this.childCallback
        let typeChildCallback = tempChildCallback[type] || []
        typeChildCallback.forEach(typeChildCallbackItem => {
            typeChildCallbackItem?.(tempParams)
        })
    }

    /**
     * 退出登录
     * @param onSuccess 成功退出登录之后的回调函数，主要用于业务线清除缓存
     * @param onFail 退出登录失败的回调函数
     */
    loginOut = (
        options?: { onSuccess?: () => void; onFail?: () => void } | Record<string, never>,
    ) => {
        const { onSuccess, onFail } = options || {}
        Http(globalApi.loginOut, 'get', {})
            .then(async () => {
                let selectIdentityCode = getCookie('SELECT_IDENTITY_CODE') || ''
                let selectUserType = getCookie('SELECT_USER_TYPE') || ''
                // @ts-ignore
                this.userData = {}
                this.selectedIdentity = ''
                Storage.delCookie('SELECT_ORG_CODE')
                Storage.delCookie('TOKEN')
                this.permissionList = []
                this.permissionIdList = []
                this.userPermissionRouteList = []
                this.selectedOrganization = ''
                this.defaultOrganization = ''
                this.clearCustomKey()
                onSuccess?.()
                message.success('退出成功')

                delCookie('TOKEN')
                delCookie('SELECT_ORG_CODE')
                delCookie('SELECT_ROLE_NAME')
                delCookie('SELECT_USER_TYPE')
                delCookie('USER_CODE')
                delCookie('ORG_NAME')
                setCookie('FROM_URL', `${location.href}`)
                doToLogin(
                    selectIdentityCode,
                    Number(LOGIN_TYPE_STR_TO_NUM[selectUserType]) || undefined,
                )
                // const siteStore = getLocalStorage('SITE_STORE')
                // const sid = findSiteData(siteStore?.siteData, 'sid')
                // // 资源方站点回到资源方登录页
                // let aliasKey = Number(sid) === 1 ? 'merchantUserDomain' : 'pcDomain'
                // const loginUrl = findSiteData(siteStore, aliasKey, {
                //     findKey: 'baseInfo',
                // })
                // // 添加单点登录退出逻辑
                // const personalSSO = findSiteData(
                //     siteStore?.siteData || {},
                //     'login_personal_sso',
                // )?.value
                // const orgSSO = findSiteData(siteStore?.siteData || {}, 'login_org_sso')?.value
                // const personalSSOUrl = findSiteData(
                //     siteStore?.siteData || {},
                //     'login_personal_sso_url',
                // )?.value
                // const orgSSOUrl = findSiteData(
                //     siteStore?.siteData || {},
                //     'login_org_sso_url',
                // )?.value
                // if (Number(this.type) === 1 && personalSSO === '1') {
                //     window.location.href = `${personalSSOUrl}`
                //     return
                // } else if (Number(this.type) === 2 && orgSSO === '1') {
                //     window.location.href = `${orgSSOUrl}`
                //     return
                // }

                // RUN_ENV === 'local'
                //     ? window.location.replace(`http://localhost:8011/user/login`)
                //     : (window.location.href = `${loginUrl}/account/user/login`)
            })
            .catch(() => {
                onFail?.()
            })
    }

    private engineerDesignAIClick: (() => void) | null = null

    /**
     * 切换课程设计AI助手弹框
     * @param callback 回调函数
     */
    afterEngineerDesignAIClick = () => {
        this.engineerDesignAIClick?.()
    }

    onEngineerDesignAIClick = (callback?: () => void) => {
        this.engineerDesignAIClick = callback
    }

    // 当页面load完成，get数据计算完成之后，isHydrated会置为true
    // 从本地同步数据到store是异步的 所以最好在页面useEffect添加store.isHydrated依赖 在里面判断isHydrated为true 之后再去做一些数据处理 防止数据错误
    get isHydrated() {
        return isHydrated(this)
    }
}

export default new Proxy(UserStore, {
    construct(target) {
        if (example) {
            return example
        } else {
            example = new target()
            return example
        }
    },
})
