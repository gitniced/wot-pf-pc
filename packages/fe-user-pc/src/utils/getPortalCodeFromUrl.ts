import { getSessionStorage } from '@/storage'
import type { IRoute } from 'umi'

export const getLocalPaths = (props: IRoute) => {
    let localRoutes = JSON.parse(JSON.stringify(props.routes?.[0]?.routes || []))
    localRoutes = localRoutes.filter(item => item.path)
    let localPaths = localRoutes.map(item => {
        const dyPath = new RegExp('^(/:).*/')
        if (dyPath.test(item?.path || '')) {
            return item.path?.replace(dyPath, '')
        } else {
            return item.path?.replace('/', '')
        }
    })
    let tempLocalPaths = localPaths.map(item => {
        return item?.split('/')?.[0]
    })
    window.local_path = tempLocalPaths.filter(item => item)
}

/**
 *  @name 获取url的门户code
 *  @param {protal} customInfo 自定义信息;
 *  @param {boolean} customInfo.isGetDomain 是否获取自定义域名
 */
export const getPortalCodeFromUrl = (customInfo?: { isGetDomain: boolean }) => {
    let { isGetDomain = false } = customInfo || {}
    let currentAlias = location.pathname.split('/')?.[1] || ''
    const portalCode = getSessionStorage('CURRENT_PORTAL_ALIAS_OBJ')?.[currentAlias] || ''
    if (isGetDomain) {
        return portalCode ? currentAlias : ''
    }
    return portalCode
}
