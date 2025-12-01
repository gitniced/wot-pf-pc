// @ts-ignore
import { message } from 'antd'
import { delCookie, getCookie, getLocalStorage } from '@/storage'
import { findSiteData, getLocalDomain } from '@wotu/wotu-components'
import domainJson from '../domain/domain.json'
import packageInfo from '../../package.json'

// 获取 domain
const getDomain = () => {
    return getLocalDomain(domainJson, packageInfo.name as any)
}

// 回到用户中心登录页面
const backUserQuickLogin = (siteData: any) => {
    delCookie('TOKEN')
    const loginUrl = findSiteData(siteData, 'pcDomain', { findKey: 'baseInfo' })
    const type = getCookie('QUICK_LOGIN_TYPE')
    const { examCode } = getLocalStorage('TEST_SEARCH_PARAMS')

    delCookie('QUICK_LOGIN_TYPE')

    loginUrl
        ? (window.location.href = `${loginUrl}/account/quick-login?businessType=exam${
              type === 1 ? `&businessId=${examCode}` : ''
          }`)
        : message.error('未查询到考试用户中心，请联系管理员')
}

const backUserLogin = (siteData: any) => {
    delCookie('TOKEN')
    const loginUrl = findSiteData(siteData, 'pcDomain', { findKey: 'baseInfo' })
    loginUrl
        ? (window.location.href = `${loginUrl}/account`)
        : message.error('未查询到考试用户中心，请联系管理员')
}

export { getDomain, backUserQuickLogin, backUserLogin }
