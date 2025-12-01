/***
 * 回到登录方法
 * 项目统一使用
 */

import { getCookie, getLocalStorage } from '@/storage'
import { findSiteData, shouldLogin } from '@wotu/wotu-components'
import { getPortalCodeFromUrl } from './getPortalCodeFromUrl'

const doToLogin = (identity?: number, userType?: number) => {
    const { siteData } = getLocalStorage('SITE_STORE') || {}
    const alias = findSiteData(siteData, 'alias', { findKey: 'baseInfo' }) || ''
    const pcDomain =
        RUN_ENV === 'local'
            ? 'http://localhost:8011'
            : findSiteData(siteData, 'pcDomain', { findKey: 'baseInfo' }) || ''
    const portalCode = getPortalCodeFromUrl({ isGetDomain: true }) || ''
    const engineerUserIdentityCodeList = ['14', '15']
    const currentIdentityCode = String(getCookie('SELECT_IDENTITY_CODE') || '')
    const engineerLoginUrl = !currentIdentityCode
        ? `${pcDomain}/account/engineer`
        : engineerUserIdentityCodeList.includes(currentIdentityCode)
        ? `${pcDomain}/account/engineer`
        : `${pcDomain}/account/user/login`

    shouldLogin({
        alias,
        portalCode,
        storageKey: 'siteStore',
        special: [
            {
                alias: 'jiangsu',
                url: 'https://rs.jshrss.jiangsu.gov.cn/web/login?appId=202209160001&returnUrl=https%3A%2F%2Fwww.jsgjkt.com%2Fleaf6-zxpx%2F%2F%23%2Fhome',
            },
            {
                alias: 'hzxgx',
                url: pcDomain,
            },
            {
                alias: 'engineer',
                url: engineerLoginUrl,
            },
        ],
        identity,
        userType,
    })
}

export default doToLogin
