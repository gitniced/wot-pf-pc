import type { SiteData } from '@/types'
import { message } from 'antd'
import { findSiteData, getLocalDomain } from '@wotu/wotu-components'
import { delCookie, getLocalStorage, setCookie } from '@/storage'
import { getLastPath } from './pathUtils'
import domainJson from '../domain/domain.json'
import packageInfo from '../../package.json'

// 获取 domain
const getDomain = () => {
    return getLocalDomain(domainJson, packageInfo.name as any)
}

// 断言当前的 origin 是否和传进来的path ===
const assertCurrentOrigin = (path: string) => {
    const _path = path?.replace(/\/$/, '')
    return getDomain() === _path
}
// 给资源方设置属性
const setMerchantSiteData = (siteData: SiteData) => {
    siteData.sid = 1
}

const backUserCenterLogin = () => {
    const { siteData } = getLocalStorage('SITE_STORE') || {}
    let loginUrl
    if (String(getLocalStorage('SID')) === '1') {
        loginUrl = findSiteData(siteData, 'merchantUserDomain', { findKey: 'baseInfo' })
    } else {
        loginUrl = findSiteData(siteData, 'loginUrl', { findKey: 'baseInfo' })
    }
    loginUrl = BUILD_ENV === 'local' ? '' : loginUrl
    setCookie('FROM_URL', `${location.href}`)
    loginUrl
        ? window.location.replace(`${getLastPath(loginUrl)}/user/login`)
        : message.error('站点信息暂无用户中心地址', 3)
}

const dieUser = () => {
    delCookie('TOKEN')
    message.error('您没有预览权限', 3)
    if (window) {
        const { siteData } = getLocalStorage('SITE_STORE') || {}
        let loginUrl = findSiteData(siteData, 'loginUrl', { findKey: 'baseInfo' })
        loginUrl = BUILD_ENV === 'local' ? '' : loginUrl
        setCookie('FROM_URL', `${location.href}`)
        window.location.replace(loginUrl ? `${getLastPath(loginUrl)}/user/login` : '/404')
        // @ts-ignore
        window?.self_store?.userStore?.initStore()
    }
}

export { getDomain, setMerchantSiteData, assertCurrentOrigin, backUserCenterLogin, dieUser }
