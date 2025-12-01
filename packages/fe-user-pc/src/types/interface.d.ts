import type SiteStoreType from '../stores/userStore'
import type UserStoreType from '../stores/siteStore'

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

declare global {
    interface Window {
        self_store: SELF_STORE_TYPE
        page_size: number
        dyRem: any
        ysf: any
        update_page_size: (size: number) => void
        appRouter: any
    }
}
