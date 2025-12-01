import type UserStore from '@/stores/userStore'
import type SiteStore from '@/stores/siteStore'
import type { IRoute } from 'umi'
import type { History } from 'umi'

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
}

type SiteConfigItem = {
    description: string
    key: string
    value: string
}

/**
 * 站点信息siteData类型
 */
export interface SiteData {
    baseInfo?: SiteBaseInfo
    configList?: SiteConfigItem[]
    sid?: 0
}
export interface SiteType {
    data: SiteData
    time: number
}

/**
 * 站点信息siteData类型
 */
export interface PageProps extends IRoute {
    userStore?: UserStore
    siteStore?: SiteStore
}

/**主应用数据模型 */
export interface MasterProps {
    currentOrganiation: string
    updateCurrentOrganiation: (code: string, name: string) => void
    children_store_clean: (handler: any) => void
    masterStore: { userStore?: UserStore; siteStore?: SiteStore }
    masterHistory: History
    loginOut: () => void
}

// 资源方类型
export enum SOURCE_TYPE {
    COURSE = 1,
    QUEStION = 2,
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
