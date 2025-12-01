import type { MICRO_APP_TYPE } from '@/types'
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

/**主应用数据模型 */
export interface MasterStore {
    userStore: any
    siteStore: any
}

/**主应用数据模型 */
export interface MasterProps {
    currentOrganization: string
    tag?: MICRO_APP_TYPE
    updateCurrentOrganization: (code?: string) => void
    getCurrentOrganization?: () => string
    children_store_clean: (handler: any) => void
    masterStore: MasterStore
    masterHistory: History
}
