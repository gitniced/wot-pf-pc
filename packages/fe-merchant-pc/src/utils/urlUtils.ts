// import type { SiteData } from '@/types'
import { MERCHANT_LOGIN_TYPE } from '@/types'
import { history } from 'umi'
import { findSiteData, getLocalDomain } from '@wotu/wotu-components'
import domainJson from '../domain/domain.json'
import packageInfo from '../../package.json'
import { message } from 'antd'
import { getLocalStorage } from '@/storage'

const getPathParams = () => {
    return window.location.search
}
const joinPath = (origin: string, search: string) => {
    return `${origin}${origin.includes('?') ? search.replace('?', '&') : search}`
}
// 获取到自己的history
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
    return getLocalDomain(domainJson, packageInfo.name as 'fe-merchant-pc')
}

// 断言当前的 origin 是否和传进来的path ===
const assertCurrentOrigin = (path: string) => {
    const _path = path?.replace(/\/$/, '')
    return getDomain() === _path
}
// // 给资源方设置属性
// const setMerchantSiteData = (siteData: SiteData) => {
//     siteData.sid = 1
// }

const getBackSiteMap = () => {
    return getLocalStorage('SOURCE_TYPE')
}

const getSourceTypeByUrl = (siteData: any, sourceType: string) => {
    // return getLocalStorage('SOURCE_TYPE')

    const map: Record<string, string> = {
        [MERCHANT_LOGIN_TYPE.COURSE]: findSiteData(siteData, 'courseMerchantDomain', {
            findKey: 'baseInfo',
        }),
        [MERCHANT_LOGIN_TYPE.QUESTION]: findSiteData(siteData, 'questionMerchantDomain', {
            findKey: 'baseInfo',
        }),
    }
    return map[sourceType]
}

// 回到用户中心登录页面
const backUserCenterLogin = (siteData: any) => {
    const merchantUserCenterUrl =
        findSiteData(siteData, 'merchantUserDomain', { findKey: 'baseInfo' }) || ''
    const currentType = getLocalStorage('SOURCE_TYPE')
    if (!currentType) {
        message.error('用户来源类型错误!')
        return
    }
    merchantUserCenterUrl
        ? (window.location.href = merchantUserCenterUrl)
        : message.error('未查询到资源方用户中心，请联系管理员')
}

export {
    getPathParams,
    getDomain,
    // setMerchantSiteData,
    assertCurrentOrigin,
    backUserCenterLogin,
    getBackSiteMap,
    getSourceTypeByUrl,
    getParamsHistory,
}
