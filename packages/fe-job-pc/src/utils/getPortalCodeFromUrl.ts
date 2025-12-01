import { findSiteData } from '@wotu/wotu-components'
import type { IRoute } from 'umi'
import { getDomain } from './urlUtils'
// import { toJS } from 'mobx'
import { getLocalStorage } from '@/storage'

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

/**
 *  获取url的门户code
 */
export const getPortalCodeFromUrl = () => {
    const siteStore = JSON.parse(JSON.stringify(getLocalStorage('SITE_STORE') || '{}'))
    const { siteData } = siteStore || {}
    let portalPC = findSiteData(siteData, 'burl', { findKey: 'baseInfo' }) || ''
    let portalH5 = findSiteData(siteData, 'portalH5Url', { findKey: 'baseInfo' }) || ''
    let currentOrigin = getDomain()
    if (currentOrigin === portalPC || currentOrigin === portalH5) {
        let currentAlias = location.pathname.split('/')?.[1] || ''
        const unCookie = window.local_path || []
        if (!unCookie.includes(currentAlias) && currentAlias) {
            return currentAlias
        } else {
            return ''
        }
    } else {
        return ''
    }
}
