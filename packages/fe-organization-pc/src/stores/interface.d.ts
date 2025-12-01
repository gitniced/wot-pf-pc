import type UserStore from './userStore'
import type SiteStore from './siteStore'
import type { SiteData } from '@/types'

export type Stores = {
    userStore: UserStore
    siteStore: SiteStore
}
export namespace GetSite {
    export type req = Record<string, void>
    export type res = SiteData
}

export type UserAccount = {
    accessToken: string
    appKey: string
    userCode: string
    sid: number
}

export type UserInfo = {
    avatar: string
    code: string
    email: string
    gender: number
    idCardNo: string
    isInitPassword: boolean
    isValidateIdCard: boolean
    isValidatePhone: boolean
    lastLoginTs: number
    mobile: string
    name: string
    nickname: string
    username: string
    lastOrganizationCode: string | undefined
    certificateType: 0 | 1 | 2 | 3
}

export type UserOrgItem = {
    logo?: string
    certifyStatus?: boolean
    name?: string
    organizationCode?: string
    userRole?: string
    userCode?: string
}
export type UserGroupItem = {
    name: string
    type: string
    url: string
}

export type UserPermission = {
    title: string
    icon: string
    key: number
    moduleId: number
    pid: number
    route: string
    type: number
    typeName: string
    changeEnable: boolean
    has: boolean
    url: string
    children?: UserPermission[]
}

export enum LOGIN_TYPE {
    USER_LOGIN = 1,
    ORG_LOGIN = 2,
    MERCHANT_LOGIN = 3,
}

export interface LayoutConfigItem {
    path: string
    header: boolean
    footer: boolean
}

export interface permissionType {
    /**别名*/
    alias: string
    /**api接口*/
    apiList: string[]
    /**是否能修改*/
    changeEnable: boolean
    /**子页面*/
    childList: string[]
    /**下级权限*/
    children: permissionType[]
    /**描述*/
    description: string
    /**是否拥有权限*/
    has: boolean
    /**隐藏状态 开启 false 关闭 true*/
    hide: boolean
    /**图标*/
    icon: string
    /**权限编码id*/
    key: number
    /**布局-页头 1展示 0关闭*/
    layoutHeader: number
    /**布局-菜单 1展示 0关闭*/
    layoutMenu: number
    /**是否菜单 0否 1是*/
    menu: number
    /**模块id*/
    moduleId: number
    /**模块名称*/
    moduleName: string
    /**打开方式 0当前页面 1新页面*/
    openType: number
    /**上级权限链路*/
    parentChain: any
    /**上级权限名称*/
    parentName: string
    /**上级权限id*/
    pid: number
    /**业务线名称*/
    platformName: string
    /**页面路由*/
    route: string
    /**排序*/
    sort: number
    /**定制*/
    special: specialType[]
    /**终端 1pc 2移动端*/
    terminal: number
    /**是否是当前模块的*/
    thisModule: boolean
    /**权限名称*/
    title: string
    /**类型 1菜单 2页面 3操作*/
    type: number
    /**是否微应用 0否 1是*/
    webApplication: number
}

export type portalPermissionType = Record<string, permissionType[]>;
