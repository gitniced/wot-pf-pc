import type UserStore from '@/stores/userStore'
import type { SiteData } from '@/types'
import type { IRoute } from 'umi'
import type { CERTIFICATE_TYPE } from './idcard/const'
import type SiteStore from '@/stores/siteStore'

export type DemoProps = Record<string, any>

export interface BindProps extends IRoute {
    userStore: UserStore
    siteStore: SiteStore
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

export type BindItem = {
    name: string
    icon: string
    unIcon: string
    info: string
    unInfo: string
    status: number
    statusStr: string
    unStatusStr: string
    key: string
    isShow?: boolean
    encodeType?: string
}
export type BindListItem = {
    type: string
    children: BindItem[]
}

export type IdCArdQueryType = {
    type?: 'audit'
}

export type BaseFormItemType = {
    // 姓名的value
    nameValue?: string
    // 姓名的label
    nameLabel?: string
    // 证件号码的value
    codeValue?: string
    // 证件信息
    idCardInfo?: {
        // 证件号
        idCardNo?: string
        // 姓名
        name?: string
        // 证件图片
        idCardImg?: string
        // 证件类型
        certificateType?: CERTIFICATE_TYPE
    }
    // 隐藏姓名(未认证的护照和其他证件有证件号码时隐藏姓名)
    hideName?: boolean
    // 是否认证 (已认证直接展示idCardInfo的信息)
    isValidateIdCard?: boolean
    // 是否展示证件类型 (身份证类型隐藏证件类型字段)
    showCertificateType?: boolean
    // 传给客服组件的userdata
    userData?: UserInfo
    // 传给客服组件的siteData
    siteData?: SiteData
    // 路由参数 是否为审核
    query?: IdCArdQueryType
    // 是否展示客服组件
    showServer?: boolean
    // 证件号码是否需要格式校验
    hasIdRule?: boolean
}
