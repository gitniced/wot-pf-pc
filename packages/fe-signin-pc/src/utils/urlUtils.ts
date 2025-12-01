import type { SiteData } from '@/types'
import { MERCHANT_LOGIN_TYPE, sourceTypeMapping } from '@/types'
import { history } from 'umi'
import { findSiteData, getLocalDomain } from '@wotu/wotu-components'
import domainJson from '../domain/domain.json'
import packageInfo from '../../package.json'
import { getLocalStorage, setCookie } from '@/storage'
import { message } from 'antd'

const getPathParams = () => {
    return window.location.search
}
const joinPath = (origin: string, search: string) => {
    return `${origin}${origin.includes('?') ? search.replace('?', '&') : search}`
}
// 获取到自己的histry
const getParamsHistory = {
    push(path: string) {
        history.push(joinPath(path, getPathParams()))
    },
    replace(path: string) {
        history.replace(joinPath(path, getPathParams()))
    },
}

// 获取 domain
const getDomain = () => {
    return getLocalDomain(domainJson, packageInfo.name)
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

// const getLastPath = (path: string, symbol: string = ','): string => {
//     return path?.split(symbol)?.at(-1) || ''
// }

const backUserCenterLogin = () => {
    const { siteData } = getLocalStorage('SITE_STORE') || {}
    let loginUrl
    if (String(getLocalStorage('SID')) === '1') {
        loginUrl = findSiteData(siteData, 'merchantUserDomain', { findKey: 'baseInfo' })
    } else {
        loginUrl = findSiteData(siteData, 'pcDomain', { findKey: 'baseInfo' })
    }
    loginUrl = RUN_ENV === 'local' ? '' : loginUrl
    setCookie('FROM_URL', `${location.href}`)
    loginUrl
        ? window.location.replace(`${loginUrl}/account/user/login`)
        : message.error('站点信息暂无用户中心地址', 3)
}

// 取登录后的第一个页面
const toLoginFirstPath = (siteStore, sourceType: string) => {
    const sourceTypeMappingKey: Record<string, string> = {
        [MERCHANT_LOGIN_TYPE.COURSE]: 'courseMerchantDomain',
        [MERCHANT_LOGIN_TYPE.QUESTION]: 'questionMerchantDomain',
    }
    const backUrl =
        findSiteData(siteStore, sourceTypeMappingKey[sourceType], {
            findKey: 'baseInfo',
        }) || '/account'

    window.location.href = backUrl
}

const getSourceType = (sourceType: string) => {
    return sourceTypeMapping[sourceType]
}

export {
    backUserCenterLogin,
    getPathParams,
    getDomain,
    setMerchantSiteData,
    assertCurrentOrigin,
    toLoginFirstPath,
    getSourceType,
    getParamsHistory,
}
