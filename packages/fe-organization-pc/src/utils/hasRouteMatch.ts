import type { IRoute } from 'umi'

/**
 * 判断当前路由是否存在
 * @param props 路由信息
 * @return boolean 1、不存在（true） 2、存在（false）
 */

const isNotFount = (props: IRoute): boolean => {
    let {
        location: { pathname },
        route: { routes },
    } = props
    pathname = pathname.trim().replace(/\/+$/, '')
    routes = routes || []
    let matchPath = routes.filter(({ path: routePath }: any) => {
        // eslint-disable-next-line no-param-reassign
        routePath = routePath || ''
        if (pathname === routePath) {
            return true
        } else {
            return false
        }
    })
    if (matchPath.length === 0) {
        return true
    } else {
        return false
    }
}

export default isNotFount
