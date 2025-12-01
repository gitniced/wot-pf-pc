import type { SiteData } from '@/types'
import { findSiteData } from '@wotu/wotu-components'

function changeIco(siteData: SiteData) {

    const link: string = findSiteData(siteData, 'merchant_logo')?.value || ''

    let $favicon: any = document.querySelector('link[rel="icon"]')
    if ($favicon !== null) {
        $favicon.href = link
    } else {
        $favicon = document.createElement('link')
        $favicon.rel = 'shortcut icon'
        $favicon.href = link
        document.head.appendChild($favicon)
    }
}
export default changeIco
