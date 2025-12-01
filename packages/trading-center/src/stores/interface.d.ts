import type { Stores, SiteData } from '@/types'
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

export interface userDataType {
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
    auditStatus: number
    certificateType: number
    enable: number
    organization: unknown
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

export { Stores }
