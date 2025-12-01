import type UserStore from '@/stores/userStore'
import type SiteStore from '@/stores/siteStore'
import type { IRoute } from 'umi'

/**
 *总store类型
 */
export interface Stores {
    userStore: UserStore
    siteStore: SiteStore
}

/**
 * 任意Object类型
 */
export type AnyObj = Record<string, any>

/**站点基础信息 */
type SiteBaseInfo = {
    adminDomain: string
    alias: string
    area: number
    city: number
    contactDept: string
    contactMobile: string
    contactName: string
    contactPost: string
    expireTime: number
    name: string
    padDomain: string
    pcDomain: string
    province: number
    shortName: string
    status: number
    wapDomain: string
    merchantUserDomain?: string
}

type SiteConfigItem = {
    description: string
    key: string
    value: string
}
export interface groupListItem {
    description: string
    id: number
    sid: number
    name: string
    type: number
}
/**
 * 站点信息siteData类型
 */
export interface SiteData {
    baseInfo?: SiteBaseInfo
    configList?: SiteConfigItem[]
    sid?: number
    groupList?: groupListItem[]
}
export interface SiteType {
    data: SiteData
    time: number
}

export enum GROUP_TYPE_ENUM {
    MERCHANT = 3, // 资源方类型
    ORGANIZATION = 2, // 机构类型
}

/**
 * 站点信息siteData类型
 */
export interface PageProps extends IRoute {
    userStore?: UserStore
    siteStore?: SiteStore
}

// 登录类型

export enum USER_LOGIN_TYPE {
    USER_LOGIN = 1,
    ORG_LOGIN = 2,
    SELLER_LOGIN = 3,
}

export enum MERCHANT_LOGIN_TYPE {
    COURSE = 'course', // 课程身份
    QUESTION = 'question', // 题库身份
    SELF_COURSE = 'self_course', // 自由课
    LIVE_BROADCAST = 'live_broadcast', //直播培训
}

export const sourceTypeMapping: Record<string, number> = {
    course: 1,
    question: 2,
    self_course: 3,
    live_broadcast: 4,
}

export const sourceTypeStatusTextMap: Record<string, string> = {
    [sourceTypeMapping.course]: '课程资源方',
    [sourceTypeMapping.question]: '题库资源方',
    [sourceTypeMapping.self_course]: '自由课平台方',
    [sourceTypeMapping.live_broadcast]: '直播培训平台方',
}
