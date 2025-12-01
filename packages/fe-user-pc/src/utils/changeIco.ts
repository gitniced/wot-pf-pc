import { getCookie } from '@/storage'
import type { SiteData } from '@/types'
import { findSiteData } from '@wotu/wotu-components'
import { getPortalCodeFromUrl } from '@/utils/getPortalCodeFromUrl'
// import { findSiteData } from './valueGet'

function changeIco(siteData: SiteData) {
    let link: string = ''
    let portalCode = getPortalCodeFromUrl()
    if (portalCode) return
    const kp_org_login_theme = findSiteData(siteData, 'kp_org_login_theme')?.value

    if (
        window.location.origin === 'https://gzkp.cloud.wozhipei.com' ||
        window.location.origin === 'https://account.gzjnpj.com'
    ) {
        link = 'https://zpimg.cn/file/egz-logo/gz_wap.png'
    } else {
        let { configList } = siteData || {}
        configList = configList || []
        configList.map(({ key, value }) => {
            if (key === 'wap_logo') {
                link = value
            }
        })
    }

    if (kp_org_login_theme === '/sclogin' && getCookie('SELECT_USER_TYPE') === 'org') {
        link = 'https://wtzp-img.oss-cn-hangzhou.aliyuncs.com/a/nx_wap.jpg'
    }

    if (kp_org_login_theme === '/egzlogin' && getCookie('SELECT_USER_TYPE') === 'org') {
        link = 'https://wtzp-img.oss-cn-hangzhou.aliyuncs.com/a/nx_wap.jpg'
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
