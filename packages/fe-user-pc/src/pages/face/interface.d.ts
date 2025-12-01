import type UserStore from '@/stores/userStore'
import type { ORG_CERTIFY_STATUS_TYPE } from '@wotu/wotu-components/dist/esm/Types'
import type { IRoute } from 'umi'

export interface BaseInfoProps extends IRoute {
    userStore: UserStore
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
}

export type AccountBindItem = {
    name: string
    statusStr: string
    unStatusStr: string
    status: number
    toolStr: string
    key: string
    mindTitle: string
    mindInfo: string
}
export type AccountLogItem = {
    device: string
    ip: string
    loginTime: string
    loginType: string
}

export type AccountOrgItem = {
    name: string
    userRole: string
    certifyStatus: ORG_CERTIFY_STATUS_TYPE
    organizationCode: string
}
export type AccountGroupItem = {
    type: number
    name: string
}
