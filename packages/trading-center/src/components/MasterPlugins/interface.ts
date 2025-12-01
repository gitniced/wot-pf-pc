export interface SiteDataBaseInfo {
    adminDomain: string
    alias: string
    area: number
    city: number
    contactDept: string
    contactMobile: string
    contactName: string
    contactPost: string
    expireTime: number
    loginUrl: string
    name: string
    padDomain: string
    pcDomain: string
    province: number
    shortName: string
    status: number
    wapDomain: string
    wapLoginUrl: string
}

export interface SiteDataConfigListItem {
    description: string
    key: string
    type: number
    value: string
}

export interface SiteData {
    baseInfo: SiteDataBaseInfo
    configList: SiteDataConfigListItem[]
}

export type MasterStore = {
    globalStore: any
}
