import { findSiteData } from '@wotu/wotu-components'
import type { IRoute } from 'umi'
import { getDomain } from './urlUtils'
import { getLocalStorage, getSessionStorage } from '@/storage'

export const updateLocalPath = (list: string[]) => {
    let localPaths = list.map(item => {
        const dyPath = new RegExp('^(/:).*/')
        if (dyPath.test(item || '')) {
            return item.replace(dyPath, '')
        } else {
            return item.replace('/', '')
        }
    })
    let tempLocalPaths = localPaths.map(item => {
        return item?.split('/')?.[0]
    })
    window.local_path = window.local_path.concat(tempLocalPaths)
}

/**
 *  获取本地的所有路由
 */
export const getLocalPaths = (props: IRoute) => {
    let localRoutes = JSON.parse(JSON.stringify(props.routes?.[0]?.routes || []))
    localRoutes = localRoutes.filter(item => item.path)
    const localPaths = localRoutes.map(item => {
        const dyPath = new RegExp('^(/:).*/')
        if (dyPath.test(item?.path || '')) {
            return item.path?.replace(dyPath, '')
        } else {
            return item.path?.replace('/', '')
        }
    })
    const tempLocalPaths = localPaths.map(item => {
        return item?.split('/')?.[0]
    })
    window.local_path = tempLocalPaths.filter(item => item)
}

type GetPortalCodeFromUrlType = (customInfo?: { isGetDomain: boolean }) => string

/**
 * @name 获取url的门户code/自定义域名
 * @param {protal} customInfo 自定义信息;
 * @param {boolean} customInfo.isGetDomain 是否获取自定义域名.默认为false
 */
export const getPortalCodeFromUrl: GetPortalCodeFromUrlType = customInfo => {
    let { isGetDomain = false } = customInfo || {}
    const siteStore = JSON.parse(JSON.stringify(getLocalStorage('SITE_STORE') || '{}'))
    const { siteData } = siteStore || {}
    let portalPC = findSiteData(siteData, 'burl', { findKey: 'baseInfo' }) || ''
    let portalH5 = findSiteData(siteData, 'portalH5Url', { findKey: 'baseInfo' }) || ''
    let currentOrigin = getDomain()
    if (currentOrigin === portalPC || currentOrigin === portalH5) {
        let currentAlias = location.pathname.split('/')?.[1] || ''
        if (isGetDomain) {
            // 是否获取domain 直接返回路由中的自定义域名
            return currentAlias
        }
        const unCookie = window.local_path || []
        /**当本地路由数据不为空时 开始判断逻辑 */
        if (!unCookie.includes(currentAlias) && currentAlias) {
            /**
             * 从标签存储中获取别名与code的map对象
             * 当存在当前别名的map 直接返回对象的值
             * 当不存在当前别名的map 使用当前别名请求对应的code 并存储到本地
             */
            const currentPortalCodeObj = getSessionStorage('CURRENT_PORTAL_ALIAS_OBJ') || {}
            if (currentPortalCodeObj?.[currentAlias]) {
                // 当存在当前别名的map 直接返回对象的值
                return currentPortalCodeObj[currentAlias]
            } else {
                // 当不存在当前别名的map 返回空
                return ''
            }
        } else {
            /**当本地路由数据包含当前字段 或者字段为空时 字段无效 返回空 */
            return ''
        }
    } else {
        return ''
    }
}

// /**  获取saas pc 门户的url  */
// export const getOrgPortalCodeFromUrl = () => {
//     let currentAlias = location.pathname.split('/')?.[1] || ''
//     const unCookie = window.local_path || []
//     if (!unCookie.includes(currentAlias) && currentAlias) {
//         return currentAlias
//     } else {
//         return ''
//     }
// }
