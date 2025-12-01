// import { findSiteData } from '@wotu/wotu-components'
import type { IRoute } from 'umi'
// import { getDomain } from './urlUtils'
// import { getLocalStorage, getSessionStorage } from '@/storage'
import { getSessionStorage } from '@/storage'

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

    if (window) {
        window.local_path = window.local_path.concat(tempLocalPaths)
    }
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
    if (window) {
        window.local_path = tempLocalPaths.filter(item => item)
    }
}

type GetPortalCodeFromUrlType = (customInfo?: { isGetDomain: boolean }) => string

/**
 * @name 获取url的门户code/自定义域名
 * @param {protal} customInfo 自定义信息;
 * @param {boolean} customInfo.isGetDomain 是否获取自定义域名.默认为false
 */
export const getPortalCodeFromUrl: GetPortalCodeFromUrlType = customInfo => {
    let { isGetDomain = false } = customInfo || {}
    let currentAlias = location.pathname.split('/')?.[1] || ''
    if (isGetDomain) {
        // 获取域名信息 直接返回路由中的自定义域名
        return currentAlias
    }
    const currentPortalCodeObj = getSessionStorage('CURRENT_PORTAL_ALIAS_OBJ') || {}
    return currentPortalCodeObj?.[currentAlias] || ''
}
