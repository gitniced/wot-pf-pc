/**
 * 根据站点信息和当前origin匹配出需要前往的url
 */

import { getDomain } from './urlUtils'

/**  需要跳转用户中心的域名map */
export const LOGIN_BACK_MAP: Record<string, string[]> = {
    /**
     * pc用户中心
     * 对应 门户 {pcDomain} 中台 {midDomain} 机构端 {orgDomain} 个人端 {personalDomain}
     */
    loginUrl: ['pcDomain', 'midDomain', 'orgDomain', 'personalDomain'],
    /**
     * h5用户中心
     * 对应 pad端 {padDomain} 移动端中台 {midMobileDomain} 移动端 {wapDomain}
     */
    wapLoginUrl: ['padDomain', 'midMobileDomain', 'wapDomain'],
    /**
     * 机构门户pc
     * 对应 机构门户pc {burl}
     */
    burl: ['burl'],
    /**
     * 机构门户h5
     * 对应 机构门户h5 {portalH5Url}
     */
    portalH5Url: ['portalH5Url'],
    /**
     * 资源方用户中心pc
     * 对应 资源方pc {merchantDomain} 资源方中台pc {merchantMidDomain} 课程资源方pc {courseMerchantDomain} 题库资源方pc {merchantMidDomain}
     */
    merchantUserDomain: [
        'merchantDomain',
        'merchantMidDomain',
        'courseMerchantDomain',
        'merchantMidDomain',
    ],
    /**
     * 讲师用户中心pc
     * 对应 讲师pc {lecturerDomain} 讲师中台 {lecturerMidDomain}
     */
    lecturerUserDomain: ['lecturerDomain', 'lecturerMidDomain'],
    /**
     * 讲师用户中h5
     * 对应 讲师h5 {lecturerMobileDomain}
     */
    lecturerMobileUserDomain: ['lecturerMobileDomain'],
}

/**  需要跳转自身子应用的域名 */
export const SELF_LOGIN_MAP: Record<string, string[]> = {
    /**
     * 机构门户pc
     * 对应 机构门户pc {burl}
     */
    burl: ['burl'],
    /**
     * 机构门户h5
     * 对应 机构门户h5 {portalH5Url}
     */
    portalH5Url: ['portalH5Url'],
}

type GetMapLoginUrlType = {
    type: 'storage' | 'store'
    key?: string
    store?: any
}

/**
 * 通过当前origin 从站点信息里匹配可以前往的用户中心origin
 * @param {GetMapLoginUrlType} params
 * @return {string}
 */
export const getMapLoginUrl = (params: GetMapLoginUrlType = { type: 'storage' }): string => {
    const { type = 'storage', key = 'siteStore', store } = params
    let siteStore = {}
    if (type === 'storage') {
        siteStore = JSON.parse(localStorage.getItem(key) || '{}')
    } else {
        siteStore = store
    }
    //@ts-ignore
    const { siteData } = siteStore || {}
    let { data } = siteData || {}
    let { baseInfo = {} } = data || {}
    let originMatchKey = ''
    let matchUserKey = ''
    // 从baseinfo里找到值与域名相同的字段
    Object.keys(baseInfo).find(_key => {
        if (baseInfo[_key] === getDomain()) {
            originMatchKey = _key
            return true
        } else {
            return false
        }
    })
    // 找到匹配字段后，通过LOGIN_BACK_MAP匹配当前域名可以前往的用户中心
    // 机构门户pc，前往自身用户中心子应用
    // 机构门户h5，前往自身用户中心子应用
    if (originMatchKey) {
        if (SELF_LOGIN_MAP[originMatchKey]) {
            // 当匹配到需要跳转自身子应用的域名 返回跳转自身路由
            return `/user-center`
        } else {
            // 从LOGIN_BACK_MAP匹配出需要前往的用户中心地址
            Object.keys(LOGIN_BACK_MAP).find((_key: string) => {
                if (LOGIN_BACK_MAP[_key].includes(originMatchKey)) {
                    matchUserKey = _key
                    return true
                } else {
                    return false
                }
            })
            return baseInfo[matchUserKey] ? `${baseInfo[matchUserKey]}` : ''
        }
    } else {
        return ''
    }
}
