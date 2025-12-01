import { getCookie, getSessionStorage } from '@/storage'
import type { SiteData } from '@/types'
import { history } from 'umi'
import domainJson from '../domain/domain.json'
import packageInfo from '../../package.json'
import { getLocalDomain } from '@wotu/wotu-components'
import type { USER_LOGIN_TYPE } from '@wotu/wotu-components/dist/esm/Types'
import {
    LOGIN_TYPE,
    MERCHANT_LOGIN_TYPE,
    ORG_IDENTITY_MAPPING,
    SOURCE_TYPE_MAPPING,
} from '@wotu/wotu-components/dist/esm/Types'

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

const getSourceType = (sourceType: string) => {
    return SOURCE_TYPE_MAPPING[sourceType]
}

// 根据角色（机构、角色）获取对应的sourceType
export const getSourceTypeByType = (sourceType: string | null, type?: USER_LOGIN_TYPE) => {
    let currentType = type || getCookie('SELECT_USER_TYPE')
    if (!sourceType) return

    switch (currentType) {
        // 资源方角色
        case LOGIN_TYPE.SELLER_LOGIN:
            return SOURCE_TYPE_MAPPING[sourceType]
        // 机构角色
        case LOGIN_TYPE.ORG_LOGIN:
            return ORG_IDENTITY_MAPPING[sourceType]

        default:
            return null
    }
}

// 当前身份为企业资源方获取指定企业回调地址
export const getCompanyBackUrl = (sourceType?: MERCHANT_LOGIN_TYPE) => {
    let companyBackUrl: string = ''
    let currentSourceType = sourceType || getCookie('SOURCE_TYPE')
    if (currentSourceType === MERCHANT_LOGIN_TYPE.COMPANY) {
        companyBackUrl = getSessionStorage('COMPANY_BACK_URL') || ''
    }
    console.log('getCompanyBackUrl', companyBackUrl)
    return companyBackUrl
}

// 根据角色获取对应工作台地址
export const getWorkBenchUrlByType = (argument: {
    // 工作台地址
    workBenchObj: Record<string, string>
    // 当前角色
    userType?: LOGIN_TYPE | undefined
    // 是否回到企业指定的回调地址.默认不回
    isGoCompanyBack?: boolean
}) => {
    let { workBenchObj = {}, userType, isGoCompanyBack = false } = argument
    // 全局的工作台地址
    const { orgWorkBench = '', merchantWorkBench = '', userWorkBench = '' } = workBenchObj || {}
    let currentUserType = userType || getCookie('SELECT_USER_TYPE')

    let currentWorkBenchUrl = ''
    switch (currentUserType) {
        // 资源方
        case LOGIN_TYPE.SELLER_LOGIN:
            {
                // 有指定企业资源方回调地址时，跳转企业回调地址,优先级高于工作台地址
                let companyBackUrl = isGoCompanyBack ? getCompanyBackUrl() : ''
                currentWorkBenchUrl = companyBackUrl || merchantWorkBench
            }
            break
        // 机构
        case LOGIN_TYPE.ORG_LOGIN:
            currentWorkBenchUrl = orgWorkBench
            break
        // 个人
        case LOGIN_TYPE.USER_LOGIN:
            currentWorkBenchUrl = userWorkBench
            break
        default:
            break
    }

    return currentWorkBenchUrl
}

export {
    getPathParams,
    getDomain,
    setMerchantSiteData,
    assertCurrentOrigin,
    getSourceType,
    getParamsHistory,
}
