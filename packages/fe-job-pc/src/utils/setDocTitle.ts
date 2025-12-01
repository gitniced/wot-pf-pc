import { getLocalStorage } from '@/storage'
import { findSiteData } from '@wotu/wotu-components'

export function setDocTitle(title?: string) {
    const siteStore = JSON.parse(JSON.stringify(getLocalStorage('SITE_STORE') || '{}'))
    const { siteData } = siteStore || {}
    const wap_title = findSiteData(siteData, 'name', { findKey: 'baseInfo' }) || ''

    document.title = `${wap_title}`
    if (!title) {
        setTimeout(() => {
            document.title = `${wap_title}`
        }, 50)
    } else {
        document.title = `${wap_title}`
        setTimeout(() => {
            document.title = `${title}-${wap_title}`
            window.name = `${title}-${wap_title}`
        }, 100)
    }
}
