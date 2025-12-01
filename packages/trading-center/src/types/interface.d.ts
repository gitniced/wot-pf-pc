import type SiteStoreType from '../stores/userStore'
import type UserStoreType from '../stores/siteStore'

declare module '@/stores/userStore'
declare const defaultLogo: string
declare const defaultAvatar: string
declare const defaultOrgLogo: string
declare const defaultImage: string
declare const ALIAS_ENV: string
declare const update_page_size: (page: number) => void

type SELF_STORE_TYPE = {
    userStore: UserStoreType
    siteStore: SiteStoreType
}
interface Window {
    self_store: SELF_STORE_TYPE
    page_size: number
}
