import { getLocalStorage } from '@/storage/localStorage'
import { findSiteData } from '@wotu/wotu-components'

/**
 * @param {string} [customDomain] 机构门户自定义域名
 * @return {*}
 */
const getBaseDomain = (customDomain?: string) => {
    let baseDomain = ''
    /**站点信息 */
    const siteStore = getLocalStorage('SITE_STORE')
    /**站点门户域名 */
    const pcDomain = findSiteData(siteStore.siteData, 'pcDomain', { findKey: 'baseInfo' })
    /**中台域名 */
    const midDomain = findSiteData(siteStore.siteData, 'midDomain', { findKey: 'baseInfo' })
    /**机构门户域名 */
    const burl = findSiteData(siteStore.siteData, 'burl', { findKey: 'baseInfo' })
    /**获取站点业务线 */
    const tags =
        findSiteData(siteStore, 'tagIdList', {
            findKey: 'baseInfo',
        }) || []
    /* 站点是否属于创培业务线 */
    const isTrain = tags.includes(1)
    if (customDomain) {
        baseDomain = `${burl}/${customDomain}`
    } else {
        baseDomain = isTrain ? midDomain : pcDomain
    }

    return baseDomain
}

export default getBaseDomain
