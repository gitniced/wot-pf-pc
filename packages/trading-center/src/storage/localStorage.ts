import { getSessionStorage } from './sessionStorage'

/**
 * PAGE_SIZE 表格分页SIZE
 * SID 站点id
 * SITE_STORE 站点信息
 * USER_STORE 用户信息
 * SELLER_SID
 */
enum KEYS {
    PAGE_SIZE = 'pageSize',
    SID = 'sid',
    SITE_STORE = 'transactionSiteStore',
    USER_STORE = 'transactionUserStore',
    SELLER_SID = 'sellerSid',
    SOURCE_TYPE = 'source_type',
}
/**
 * 获取环境匹配的userStore和siteStore的key
 */
const getMatchKey = (key: keyof typeof KEYS) => {
    const platform = getSessionStorage('PLATFORM')
    let finalKey: string = ''
    switch (platform) {
        case 'portal':
            if (key === 'SITE_STORE') {
                finalKey = 'gatewaySiteStore'
            } else {
                finalKey = 'gatewayUserStore'
            }
            break
        case 'workbench':
            if (key === 'SITE_STORE') {
                finalKey = 'workSiteStore'
            } else {
                finalKey = 'workUserStore'
            }
            break
        default:
            if (key === 'SITE_STORE') {
                finalKey = 'siteStore'
            } else {
                finalKey = 'userStore'
            }
    }
    return finalKey
}

/**
 * 获取 localStorage
 * @param key
 * @returns
 */
export const getLocalStorage = (key: keyof typeof KEYS) => {
    if (typeof window === 'undefined') return
    let finalKey = ''
    if (['USER_STORE', 'SITE_STORE'].includes(key)) {
        finalKey = getMatchKey(key)
    } else {
        finalKey = KEYS[key]
    }
    const res = localStorage.getItem(finalKey) as any
    try {
        return JSON.parse(res)
    } catch (e) {
        return res
    }
}

/**
 * 通用写入 localStorage
 * @param key
 * @param val
 */
export const setLocalStorage = (key: keyof typeof KEYS, val: any) => {
    if (typeof window === 'undefined') return
    let finalKey = ''
    if (key === 'SITE_STORE' || key === 'USER_STORE') {
        finalKey = getMatchKey(key)
        localStorage.setItem(finalKey, typeof val === 'object' ? JSON.stringify(val) : val)
    } else {
        finalKey = KEYS[key]
        localStorage.setItem(finalKey, typeof val === 'object' ? JSON.stringify(val) : val)
    }
}

/**
 * 删除
 * @param key
 */
export const delLocalStorage = (key: keyof typeof KEYS) => {
    if (!window) return
    localStorage.removeItem(key)
}
