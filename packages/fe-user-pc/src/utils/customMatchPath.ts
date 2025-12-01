import { history } from 'umi'
/**
 * @name 路由匹配工具
 * @param matchList 匹配的路由列表
 * @param fullMatch 是否开启路由全量匹配
 * @returns boolean
 */
const customMatchPath = (matchList: string[], fullMatch: boolean = false) => {
    const { pathname } = history.location || ''
    if (fullMatch) {
        return matchList.some(item => pathname.indexOf(item) === 0)
    } else {
        const firstPath = pathname.split('/')?.[1] || ''
        return matchList.some(item => firstPath === item)
    }
}

export default customMatchPath
