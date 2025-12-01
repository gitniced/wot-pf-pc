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
    sid?: number
}