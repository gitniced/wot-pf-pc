import { getPortalCodeFromUrl } from '@/utils/getPortalCodeFromUrl'

async function changeIco(portalData: any) {
    let link: string = ''

    let portalCode = getPortalCodeFromUrl()

    if (portalCode) {
        link = portalData?.[portalCode]?.organizationLogo
    }

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
