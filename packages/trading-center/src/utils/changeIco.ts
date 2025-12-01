import type { SiteData } from '@/types'
import { getPortalCodeFromUrl } from '@wotu/wotu-components'
import { findSiteData } from '@wotu/wotu-components'

function changeIco(siteData: SiteData) {
    const portalCode = getPortalCodeFromUrl()
    if (portalCode) return
    const link: string = findSiteData(siteData, 'wap_logo')?.value || ''
    let $favicon: any = document.querySelector('link[rel="icon"]')
    if ($favicon !== null) {
        $favicon.href = link
    } else {
        $favicon = document.createElement('link')
        $favicon.rel = 'icon'
        $favicon.href = link
        document.head.appendChild($favicon)
    }
}
export default changeIco
