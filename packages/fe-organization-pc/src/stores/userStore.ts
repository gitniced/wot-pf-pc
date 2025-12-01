import { makeAutoObservable } from 'mobx'
import { makePersistable, isHydrated } from 'mobx-persist-store'
import type {
    UserInfo,
    UserAccount,
    UserOrgItem,
    UserGroupItem,
    LayoutConfigItem,
    permissionType,
    portalPermissionType,
} from './interface'
import http from '@/servers/http'
import globalApi from '@/servers/globalApi'
import { delCookie, getCookie, getLocalStorage, setLocalStorage } from '@/storage'
import { getPortalCodeFromUrl } from '@/utils/getPortalCodeFromUrl'
import { history } from 'umi'
import { getFirstMenuRoute, getPortalMenuByPermission } from '@/utils/routeAnalysis'
import { cloneDeep } from 'lodash'
// import { message } from 'antd'
// import http from '@/servers/http'
// import globalApi from '@/servers/globalApi'
// import { delCookie, delLocalStorage, getLocalStorage } from '@/storage'
// import { findSiteData } from '@wotu/wotu-components'
// import { message } from 'antd'
// import { history } from 'umi'

//accessType字段 区分一下接入类型 1:跳转链接  2:个人中心菜单
export enum ACCESS_TYPE_ENUM {
    CUSTOM_LINK = 1,
    USER_CENTER = 2,
}

export default class UserStore {
    /** 是否是第一次进入页面 */
    public initialPage: boolean = true
    /** 是否已进行菜单请求 */
    public requestMenu: boolean = false
    /**是否是门户应用*/
    public isGateway: boolean = true
    /**账号信息*/
    public userAccount: UserAccount | undefined
    /**用户详情*/
    public userData: UserInfo | undefined
    /**用户参加的机构列表*/
    public userOrgList: UserOrgItem[] = []
    /**用户组列表 关系到用户拥有的工作台*/
    public userGroupList: UserGroupItem[] = []
    /**用户选择的登录类型 个人|机构｜资源方*/
    public userSelectLoginType: 'user' | 'org' | 'merchant' | '' = ''
    /**当前用户身份的权限数据*/
    public userPermissionList: string[] = []
    /**当前门户指定机构code*/
    public currentOrgCode: string | undefined
    /**当前门户指定机构的认证状态*/
    public currentOrgCertify: boolean = false
    /**子应用仓库重置handlerList*/
    public childStoreInitList: any = []

    /**用户权限列表 */
    public permissionList: portalPermissionType = {}

    /**对应路由是否展示页头和页脚*/
    public layoutConfig: LayoutConfigItem[] = [
        {
            path: '/404',
            header: false,
            footer: false,
        },
        {
            path: '/500',
            header: false,
            footer: false,
        },
        {
            path: '/*/404',
            header: true,
            footer: true,
        },
        {
            path: '/*/home',
            header: true,
            footer: true,
        },
        {
            path: '/*/micro',
            header: true,
            footer: true,
        },
        {
            path: '/*/picture/detail',
            header: true,
            footer: true,
        },
        {
            path: '/*/picture/list',
            header: true,
            footer: true,
        },
        {
            path: '/*/enroll-gateway/',
            header: true,
            footer: true,
        },
        {
            path: '/*/practice/list',
            header: true,
            footer: true,
        },
    ]

    /**首页code*/
    public homeCode: string = ''

    /**导航数据*/
    public microNav: any[] = []

    /**  门户页脚配置  */
    public portalFooterConfig = {}
    /**  门户悬浮窗配置  */
    public floatWindowConfig = []

    /**  练习详情modal 显示隐藏  */
    public brushQst = {
        visible: false,
        code: '',
    }

    constructor() {
        /** 重新更新存储下 对应路由是否展示页头和页脚   */
        const data = getLocalStorage('USER_STORE') || {}
        const gatewayUserData = {
            ...data,
            layoutConfig: this.layoutConfig,
        }
        setLocalStorage('USER_STORE', gatewayUserData)

        makeAutoObservable(this, {}, { autoBind: true })
        makePersistable(this, {
            name: 'gatewayUserStore', // 保存的name，用于在storage中的名称标识，只要不和storage中其他名称重复就可以
            properties: [
                'initialPage',
                'requestMenu',
                'isGateway',
                'userAccount',
                'userData',
                'userOrgList',
                'userGroupList',
                'userSelectLoginType',
                'userPermissionList',
                'currentOrgCode',
                'currentOrgCertify',
                'childStoreInitList',
                'permissionList',
                'layoutConfig',
                'homeCode',
                'microNav',
            ], // 要保存的字段，这些字段会被保存在name对应的storage中，注意：不写在这里面的字段将不会被保存，刷新页面也将丢失：get字段例外。get数据会在数据返回后再自动计算
            storage: window.localStorage, // 保存的位置：看自己的业务情况选择，可以是localStorage，sessionstorage
        })
    }

    /**  改变练习详情modal  */
    setBrushQstVisible = (flag: boolean, code: string) => {
        this.brushQst.visible = flag
        this.brushQst.code = code
    }

    /** 子应用增加是否展示导航和页脚的路由配置 */
    updateLayoutConfig = (configItem: LayoutConfigItem) => {
        configItem.path = `/*${configItem.path}`
        console.log('updateLayoutConfig', configItem)

        const tempLayout = cloneDeep(this.layoutConfig)
        tempLayout.push(configItem)
        this.layoutConfig = tempLayout
    }

    /**
     * 判断用户是否是当前门户用户
     * 是门户学员池用户 返回true
     * 不是门户学员池用户 返回false
     */
    isPortalUser = async (orgCode: string) => {
        if (!orgCode) return
        const isPortalUserBool: any = await http(
            `${globalApi.isPortalUser}`,
            'post',
            {
                organizationCode: orgCode,
            },
            { repeatFilter: false },
        )
        if (!isPortalUserBool) {
            this.loginOut(!isPortalUserBool)
        }
    }

    /** 获取导航栏数据 */
    getMicroNavData = async () => {
        const organizationCode = getPortalCodeFromUrl()
        const microNav = (await http(globalApi.getMicroNav, 'get', { organizationCode })) || []
        microNav.map((item, index) => {
            if (index === 0) {
                const { linkUrl } = item || {}
                this.homeCode = linkUrl
            }
        })
        this.microNav = microNav as any
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
        let tempPermissionList = getPortalMenuByPermission(permissionList)
        if (tempPermissionList.length === 0) {
            history.replace('/403')
        } else {
            this.toFirstMenuRoute(tempPermissionList)
        }
        const currentDomain = getPortalCodeFromUrl({ isGetDomain: true }) || ''
        const currentDomainPermissionList = { [currentDomain]: tempPermissionList }
        this.permissionList = {
            ...tempPermissionList,
            ...currentDomainPermissionList,
        } as unknown as portalPermissionType
    }

    /**
     * 获取个人用户权限
     */
    getUserPermissionList = async () => {
        const portalCode = getPortalCodeFromUrl()
        let params = {
            organizationCode: portalCode,
            type: 1,
            accessType: ACCESS_TYPE_ENUM.USER_CENTER,
            identity: getCookie('SELECT_IDENTITY_CODE'),
        }

        return http(globalApi.getSaasMenuList, 'GET', params)
            .then((res: any) => {
                this.setPermissionList(res || [])
            })
            .finally(() => {
                this.requestMenu = true
            })
    }

    /**
     * 页面初始化时 判断当前路由
     * 1、当前路由不是 404等状态路由
     * 2、路由为mine时 自动前往用户身份权限路由中的第一个路由
     */
    toFirstMenuRoute = async (permissionList: permissionType[]) => {
        // 可能会是子应用 所以使用umi的history获取当前应用的路由数据
        const noRredirect: string[] = ['/404', '/403', '/500']
        let routeList = getFirstMenuRoute(permissionList)
        const currentDomain = getPortalCodeFromUrl({ isGetDomain: true }) || ''
        let currentPathname = history.location.pathname
        // 页面初始化时 判断当前路由是否拥有权限 有权限时 不处理 无权限时前往菜单第一项
        if (this.initialPage) {
            if (!noRredirect.includes(history.location.pathname)) {
                if (
                    currentPathname === `/${currentDomain}/mine` ||
                    currentPathname === `/${currentDomain}/mine/`
                ) {
                    history.replace(`/${currentDomain}/mine${routeList[0]}`)
                }
            }
            this.initialPage = false
        }
    }

    /** 查询用户数据 */
    get_user_info = async () => {
        const res = (await http(
            globalApi.getUserInfo,
            'get',
            {},
            {
                repeatFilter: false,
            },
        )) as unknown as UserInfo
        this.update_gateway_user_data(res)
    }

    /**
     * 退出登录 名称已经和其他的项目有约定 请勿修改
     */
    loginOut = (needLogin: boolean = false) => {
        http(globalApi.loginOut, 'get', {})
            .then(async () => {
                // 七鱼客服用户登出
                window?.ysf?.('logoff')
                delCookie('TOKEN')
                this.userData = undefined
                this.children_store_clean()
                if (needLogin) {
                    const currentDomain = getPortalCodeFromUrl({ isGetDomain: true }) || ''
                    location.replace(`/${currentDomain}/user-center/user/login`)
                } else {
                    const currentDomain = getPortalCodeFromUrl({ isGetDomain: true }) || ''
                    location.replace(`/${currentDomain}/home`)
                }
            })
            .catch(() => {})
    }

    /**
     * 重置数据
     */
    initData = () => {
        const tempPermissionList = cloneDeep(this.permissionList)
        const currentDomain = getPortalCodeFromUrl({ isGetDomain: true }) || ''
        tempPermissionList[currentDomain] = []
        this.permissionList = tempPermissionList
    }

    /**
     * 标注当前为门户子应用
     */
    update_is_gateway = (bool: boolean) => {
        this.isGateway = bool
    }

    /**
     * 更新账号信息
     */
    update_gateway_user_account = (data: UserAccount) => {
        this.userAccount = data
    }

    /**
     * 更新用户详情
     */
    update_gateway_user_data = (data: UserInfo) => {
        this.userData = data
    }

    /**
     * 更新用户机构列表
     */
    update_gateway_user_org_list = (userOrgList: UserOrgItem[]) => {
        this.userOrgList = userOrgList
    }

    /**
     * 更新用户机构列表
     */
    update_gateway_user_group_list = (userGroupList: UserGroupItem[]) => {
        this.userGroupList = userGroupList
    }

    /**
     * 更新用户机构列表
     */
    update_user_select_login_type = (type: 'user' | 'org' | 'merchant' | '' = '') => {
        this.userSelectLoginType = type
    }

    /**
     * 更新用户权限列表
     */
    update_user_permission_list = (permissionList: string[]) => {
        this.userPermissionList = permissionList
    }

    /**
     * 更新当前门户指定机构
     */
    update_current_org_code = (code: string) => {
        this.currentOrgCode = code
    }

    /**
     * 更新当前门户指定机构的认证状态
     */
    update_current_org_certify = (certify: boolean) => {
        this.currentOrgCertify = certify
    }

    /***收集子应用的store重置方法 */
    update_children_store_list = (handler: any) => {
        this.childStoreInitList.push(handler)
    }

    /***收集子应用的store重置方法 */
    children_store_clean = () => {
        const matchHandlerList = this.childStoreInitList.filter((item: any) => item)
        matchHandlerList.map(item => item?.())
    }

    /**  获取门户的页脚配置  */
    getPortalFooterConfig = async () => {
        const tempPortalCode = getPortalCodeFromUrl()
        if (!tempPortalCode) return
        let res = await http(
            `${globalApi.getFooterConfig}?organizationCode=${tempPortalCode}`,
            'get',
            {},
        )
        this.portalFooterConfig = res || {}
    }

    /**  获取门户的悬浮窗配置  */
    getPortalFloatWindowConfig = async () => {
        const portalCode = getPortalCodeFromUrl()
        if (!portalCode) return
        let res = await http(
            `${globalApi.getFloatWindowConfig}?organizationCode=${portalCode}`,
            'get',
            {},
        )
        this.floatWindowConfig = res || {}
    }

    // 当页面load完成，get数据计算完成之后，isHydrated会置为true
    // 从本地同步数据到store是异步的 所以最好在页面useEffect添加store.isHydrated依赖 在里面判断isHydrated为true 之后再去做一些数据处理 防止数据错误
    get isHydrated() {
        return isHydrated(this)
    }
}
