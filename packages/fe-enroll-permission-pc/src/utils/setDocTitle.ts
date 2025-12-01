import { findSiteData, getPortalCodeFromUrl } from '@wotu/wotu-components'
import { getLocalStorage, getSessionStorage } from '@/storage'

export const setPageTitle = (title: string) => {
    const siteStore = getLocalStorage('SITE_STORE')
    const { portalData, siteData } = siteStore
    const portalCode = getPortalCodeFromUrl()
    const siteName = findSiteData(siteData, 'name', { findKey: 'baseInfo' })
    const platform = getSessionStorage('PLATFORM')

    switch (platform) {
        case 'portal':
            document.title = `${title}-${portalData?.[portalCode]?.organizationName}`
            break
        default:
            document.title = `${title}-${siteName}`
            break
    }
}
