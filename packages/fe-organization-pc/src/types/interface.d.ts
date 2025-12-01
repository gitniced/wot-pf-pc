import type SiteStoreType from '../stores/userStore'
import type UserStoreType from '../stores/siteStore'
import type { IRoute } from 'umi'
import type UserStore from '../stores/userStore'
import type SiteStore from '../stores/siteStore'

declare module '@/stores/userStore'
declare const defaultLogo: string
declare const defaultAvatar: string
declare const defaultOrgLogo: string
declare const defaultImage: string
declare const ALIAS_ENV: string

type SELF_STORE_TYPE = {
    userStore: UserStoreType
    siteStore: SiteStoreType
}

interface Window {
    self_store: SELF_STORE_TYPE
    page_size: number
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

export interface ObserverPageProps extends IRoute {
    userStore: UserStore
    siteStore: SiteStore
}
