import type { Stores, SiteData } from '@/types'
import type {
    ORG_APPROVE_STATUS_TYPE,
    ORG_CERTIFY_STATUS_TYPE,
} from '@wotu/wotu-components/dist/esm/Types'
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
    certifyStatus: ORG_CERTIFY_STATUS_TYPE
    approveStatus: ORG_APPROVE_STATUS_TYPE
    approveOpinion?: string
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

export { Stores }
