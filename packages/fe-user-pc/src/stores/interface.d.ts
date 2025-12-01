import type { AUDIT_STATUS_TYPE } from '@/pages/bind/const'
import type { SiteData } from '@/types'
import type {
    ORG_APPROVE_STATUS_TYPE,
    ORG_CERTIFY_STATUS_TYPE,
} from '@wotu/wotu-components/dist/esm/Types'

import type SiteStore from './siteStore'
import type UserStore from './userStore'

export interface Stores {
    userStore: UserStore
    siteStore: SiteStore
}

export namespace GetSite {
    export type req = Record<string, void>
    export type res = SiteData
}

export type UserAccount = {
    randomCode?: string
    accessToken: string
    appKey: string
    userCode: string
    sid: number
    userInfo: UserInfo
    groupList: UserGroupItem[]
    tokenExpire?: number
}
export type WorkBench = {
    // 个人中心
    1: string
    // 机构工作台
    2: string
    // 资源方工作台
    3: string
    // 个人讲师
    4: string
}

export interface identityType {
    /**身份id*/
    id: number
    /**身份名称*/
    name: string
    /**1c用户 2机构 3资源方 */
    type: string
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
    auditStatus: AUDIT_STATUS_TYPE
    [key: string]: any
}

export type UserOrgItem = {
    logo?: string
    certifyStatus?: ORG_CERTIFY_STATUS_TYPE
    approveStatus?: ORG_APPROVE_STATUS_TYPE
    approveOpinion?: string
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

/**门户信息类型 */
export type PortalDataType = {
    code?: string
    info?: string
    linkUrl?: string
    organizationCode?: string
    organizationLogo?: string
    organizationName?: string
    themeColor?: string
}

/**门户信息 */
export type PortalData = Record<string, PortalDataType>
