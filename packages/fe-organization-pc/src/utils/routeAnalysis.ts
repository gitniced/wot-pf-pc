import { cloneDeep } from 'lodash'
// import { getPortalCodeFromUrl } from './getPortalCodeFromUrl'

enum TERMINAL {
    PC = 1,
    MOBILE,
}

/**
 * 根据终端获取权限列表
 * @param permissionList 权限数据
 * @param terminal 终端类型
 * @returns
 */
const getTerminalPermissionList = (permissionList: any[], terminal: TERMINAL) => {
    const terminalPermissionList = permissionList.filter(
        item => Number(item.terminal || 0) === Number(terminal),
    )
    return terminalPermissionList
}

/**
 * 定制后的权限列表
 * @param permissionList 权限数据
 * @param sid 站点id
 * @returns
 * @description 根据站点获取special中的定制信息：菜单名、布局、打开方式
 */
const getSpecialPermissionList = (permissionList: any[], sid: number) => {
    const loop = (list: any[]) => {
        const tempList = list.map(item => {
            let { special, children } = item || {}
            special = special || []
            children = children || []
            children = loop(children)
            const specialOrder = special.filter(
                (specialItem: any) => Number(specialItem?.sid || 0) === Number(sid),
            )
            if (specialOrder.length) {
                const { layoutHeader, layoutMenu, name, openType } = specialOrder[0] || {}
                return {
                    ...item,
                    children,
                    layoutHeader,
                    layoutMenu,
                    name,
                    openType,
                }
            } else {
                return { ...item }
            }
        })
        return tempList
    }
    const currentPermissionList = loop(permissionList)

    return currentPermissionList
}

/**
 * 为权限列表兜底 防止出现不以‘/’开头的路由
 * @param permissionList 权限数据
 * @returns
 */
const getRightPathPermissionList = (permissionList: any[]) => {
    const loop = (list: any[]) => {
        const tempList = list.map(item => {
            let { route, children } = item || {}
            route = route || ''
            children = children || []
            children = loop(children)
            route ? (route = route.indexOf('/') !== 0 ? `/${route}` : route) : ''
            return { route, children, ...item }
        })
        return tempList
    }
    const currentPermissionList = loop(permissionList)

    return currentPermissionList
}

/**
 * 获取所有的路由布局定制
 * @param permissionList 跟据终端和sid筛选出最终的权限数据
 * @returns
 * @description 根据权限中的route,layoutHeader和layoutMenu生成布局配置
 * 子页面的布局跟随权限
 */
const getRouteConfig = (permissionList: any[]) => {
    const routeConfig: any = {}
    const loop = (list: any[]) => {
        list.map((item: any) => {
            let { layoutHeader, layoutMenu, route, children, childList } = item || {}
            layoutHeader = Boolean(layoutHeader)
            layoutMenu = Boolean(layoutMenu)
            let layout: boolean = Boolean(layoutHeader || layoutMenu)
            route = route || ''
            children = children || []
            childList.map((childListItem: string) => {
                routeConfig[childListItem] = { layout, menu: layoutMenu, header: layoutHeader }
            })
            loop(children)
            routeConfig[route] = { layout, menu: layoutMenu, header: layoutHeader }
        })
    }
    loop(permissionList)
    return routeConfig
}

/**
 * 获取用户的权限路由
 * @param permissionList 跟据终端和sid筛选出最终的权限数据
 * @returns
 * @description 根据用户当前身份的permissionList生成用户拥有的权限路由
 */
const getUserPermissionRoute = (permissionList: any[]) => {
    let routeList: string[] = []
    const loop = (list: any[]) => {
        list.map((item: any) => {
            let { route, children, childList = [] } = item || {}
            route = route || ''
            children = children || []
            childList.push(route)
            routeList = [...routeList, ...childList]
            loop(children)
        })
    }
    loop(permissionList)
    return routeList
}

/**处理门户菜单路由数据 */
const getPortalMenuByPermission = (permissionList: any[]) => {
    let tempPermissionList: any[] = cloneDeep(permissionList)
    // const currentDomain = getPortalCodeFromUrl({ isGetDomain: true }) || ''
    const loop = (list: any[]) => {
        list.map((item: any) => {
            let { route, children } = item || {}
            // item.route = route ? `/${currentDomain}/mine${route}` : ''
            item.route = route ? route : ''
            children = children || []
            loop(children)
        })
    }
    loop(tempPermissionList)
    return tempPermissionList
}

/**获取首个菜单路由 排除有通配符的路由 */
const getFirstMenuRoute = (permissionList: any[]) => {
    let routeList: string[] = []
    const loop = (list: any[]) => {
        for (let i = 0; i < list.length; i++) {
            let { route, children } = list[i] || {}
            route = route || ''
            children = children || []
            if (route.indexOf('*') === -1 && route) {
                routeList.push(route)
                break
            }
            if (children.length > 0) {
                loop(children)
            }
        }
    }
    loop(permissionList)
    return routeList
}

// 获取菜单及其子级

export {
    getTerminalPermissionList,
    getSpecialPermissionList,
    getRightPathPermissionList,
    getRouteConfig,
    getUserPermissionRoute,
    getPortalMenuByPermission,
    getFirstMenuRoute,
}
