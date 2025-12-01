import type { Stores, SiteData } from '@/types'
export namespace GetSite {
    export type req = Record<string, void>
    export type res = SiteData
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
}

export interface UserStore {
    userData: UserInfo
    userOrg: UserOrgItem[]
    userGroup: UserGroupItem[]
    userPermissionList: string[]
    userPowerList: string[]
    currentOrgCode: string
    currentOrgCertify: boolean
}
interface userDataType {
    code: string
    sid: number
    name: string
    nickname: string
    mobile: string
    email: string
    username: string
    idCardNo: string
    avatar: string
    lastLoginTs: number
    isValidatePhone: boolean
    isValidateIdCard: boolean
    gender: number
    isInitPassword: boolean
    lastOrganizationCode: string
    certificateType: number
    enable: number
    organization: unknown
}

export type ClearType = 'local' | 'session' | 'cookie'

export interface specialType {
    layoutHeader: number
    layoutMenu: number
    name: string
    openType: number
    permissionId: number
    sid: number
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

export interface identityType {
    /**身份id*/
    id: number
    /**身份名称*/
    name: string
    /**1c用户 2机构 3资源方 */
    type: string
}

export interface organizationType {
    /**认证状态*/
    certifyStatus: boolean
    /**组织下身份列表*/
    identityList: number[]
    /**组织logo */
    logo: string
    /**组织名称 */
    name: string
    /**组织编码 */
    organizationCode: string
    /**组织名称 */
    organizationName: string
    /**组织简称 */
    shortName: string
    /**站点 */
    sid: number
    /**简称 */
    sname: string
    /**角色 2机构 3资源方 */
    type: number
    /**组织拥有者 */
    userCode: string
    /**所在组织角色 */
    userRole: string
}

export interface PortalData {
    code: string
    intro: string
    linkUrl: string
    organizationCode: string
    organizationLogo: string
    organizationName: string
    themeColor: string
}

export { Stores, userDataType }
