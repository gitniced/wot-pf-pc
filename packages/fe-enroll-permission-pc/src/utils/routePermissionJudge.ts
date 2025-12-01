import type { History } from 'umi'
import { history } from 'umi'

// 删除字符串末尾的‘/’ 并返回以‘/’分割的数组
export const splitPath = (pathname: string) => {
    const purePath = pathname?.replace(/([\w\W]+)\/$/, '$1') || ''
    return purePath?.split('/') || []
}

/**
 * 匹配路由函数
 * @param currentRoute 当前路由
 * @param route 权限录入中的路由
 * @returns true｜false
 * @description 匹配规则:
 *  当基于路由字符串分割的数组 长度不同时 返回false
 *  当权限录入中的路由与当前路由匹配时，通配符位置不做判断，非通配符位置全量匹配，匹配失败则返回false
 * */
export const matchPath = (currentRoute: string = '', route: string = '') => {
    const routeArr = splitPath(route)
    const currentRouteArr = splitPath(currentRoute)
    if (routeArr.length !== currentRouteArr.length) {
        return false
    } else {
        let final = routeArr.reduce((prev, item, index) => {
            if (prev) {
                if (item.indexOf('*') === -1) {
                    if (item === currentRouteArr[index]) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    return true
                }
            } else {
                return false
            }
        }, true)
        return final
    }
}

/**
 * 判断当前路由 是否为合法路由 如果为无权访问 前往403
 * 判断方式：
 *      1、当前路由不存在于 站点权限路由列表中 则不需要判断权限
 *      2、当前路由存在于 站点权限路由列表中:
 *          a、不存在于用户权限路由列表中，前往403
 *          b、存在于用户权限路由列表中，正常访问
 *@param sitePermissionRouteList 站点所有的权限路由
 *@param userPermissionRouteList 用户拥有的权限路由
 */
export const routeJudge = (currentHistory: History) => {
    // 站点所有的权限路由
    let sitePermissionRouteList = window.sitePermissionRouteList || []
    // 用户拥有的权限路由
    let userPermissionRouteList = window.userPermissionRouteList || []
    // 当前路由
    const currentRoute = currentHistory?.location?.pathname || ''
    // 当前路由是否匹配站点权限路由列表
    const matchSite = sitePermissionRouteList.some((item: string) => matchPath(currentRoute, item))
    // 当前路由是否匹配用户权限路由列表
    const matchUser = userPermissionRouteList.some((item: string) => matchPath(currentRoute, item))
    if (matchSite && !matchUser) {
        history.replace('/403')
    }
}
