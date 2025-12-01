import type { SiteData } from '@/types'
import { MERCHANT_LOGIN_TYPE, sourceTypeMapping } from '@/types'
import { message } from 'antd'
import { history } from 'umi'
import { findSiteData, getLocalDomain } from '@wotu/wotu-components'
import domainJson from '../domain/domain.json'
import packageInfo from '../../package.json'
import { delCookie, getCookie, getLocalStorage, setCookie } from '@/storage'
// import { getLastPath } from './pathUtils'
import { getPortalCodeFromUrl } from './getPortalCodeFromUrl'
import doToLogin from './doToLogin'
// import { sourceTypeMapping } from '@/types/index'

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
    return getLocalDomain(domainJson, packageInfo.name as 'fe-business-pc')
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

// 取登录后的第一个页面
const toLoginFirstPath = (siteStore: any, sourceType: string) => {
    const sourceTypeMappingKey: Record<string, string> = {
        [MERCHANT_LOGIN_TYPE.COURSE]: 'courseMerchantDomain',
        [MERCHANT_LOGIN_TYPE.QUESTION]: 'merchantMidDomain',
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

const backUserCenterLogin = () => {
    const { siteData } = getLocalStorage('SITE_STORE') || {}

    let loginUrl = findSiteData(siteData, 'pcDomain', { findKey: 'baseInfo' }) + '/account'

    if (String(getLocalStorage('SID')) === '1') {
        loginUrl = findSiteData(siteData, 'merchantUserDomain', { findKey: 'baseInfo' })
    }

    loginUrl = RUN_ENV === 'local' ? 'http://localhost:8011' : loginUrl

    // 判断是否是考试中心考生考试路由(本地环境判断)
    const isStudentExamRoute = history.location.pathname.includes('/exam-center/test-manage')

    // 获取Pad domain
    const padDomain = findSiteData(siteData, 'padDomain', { findKey: 'baseInfo' })
    // 当前域名
    const currentDomain = window.origin

    if (RUN_ENV === 'local') {
        isStudentExamRoute
            ? window.location.replace(`${loginUrl}/quick-login?businessType=exam`)
            : doToLogin(getCookie('SELECT_IDENTITY_CODE') || undefined, undefined)
    } else {
        // 如果是pad域名，跳转到quick-login
        if (padDomain === currentDomain) {
            loginUrl
                ? window.location.replace(`${loginUrl}/quick-login?businessType=exam`)
                : message.error('站点信息暂无用户中心地址', 3)
        } else {
            loginUrl
                ? doToLogin(getCookie('SELECT_IDENTITY_CODE') || undefined, undefined)
                : message.error('站点信息暂无用户中心地址', 3)
        }
    }

    setCookie('FROM_URL', `${location.href}`)
}

// 根据环境回到不同的首页，没有token的情况下适用
export const goHomeByEnv = () => {
    // 通过portalCode判断当前是否是在门户中
    // 在门户中时 401返回门户登录页
    const currentDomain = getPortalCodeFromUrl({ isGetDomain: true })
    if (currentDomain) {
        RUN_ENV === 'local'
            ? window.location.replace(
                  `http://localhost:8031/${currentDomain}/user-center/user/login`,
              )
            : window.location.replace(`/${currentDomain}/user-center/user/login`)
    } else {
        backUserCenterLogin()
        // // @ts-ignore
        window?.self_store?.userStore?.initStore()
    }
}

const dieUser = () => {
    delCookie('TOKEN')
    message.error('您没有预览权限', 3)
    if (window) {
        const { siteData } = getLocalStorage('SITE_STORE') || {}
        let loginUrl = findSiteData(siteData, 'pcDomain', { findKey: 'baseInfo' }) + '/account'
        loginUrl = RUN_ENV === 'local' ? '' : loginUrl
        setCookie('FROM_URL', `${location.href}`)
        window.location.replace(loginUrl ? `${loginUrl}/user/login` : '/404')
        // @ts-ignore
        window?.self_store?.userStore?.initStore()
    }
}

export {
    getPathParams,
    getDomain,
    setMerchantSiteData,
    assertCurrentOrigin,
    toLoginFirstPath,
    getSourceType,
    backUserCenterLogin,
    dieUser,
    getParamsHistory,
}
