import type { LayoutConfigItem } from '@/stores/interface'

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
 */
export const getCurrentConfig = (list: LayoutConfigItem[]) => {
    let currentPath = window.location.pathname
    let currentConfig: LayoutConfigItem = {
        path: currentPath,
        header: false,
        footer: false,
    }
    list.map(item => {
        const { path, header, footer } = item || {}
        if (matchPath(currentPath, path)) {
            currentConfig = { path, header, footer }
        }
    })
    return currentConfig
}
