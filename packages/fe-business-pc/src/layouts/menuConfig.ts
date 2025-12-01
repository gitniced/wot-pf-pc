import { getLocalStorage } from '@/storage'
import { history } from 'umi'

const groupEnum = 'group'

/**
 *  断言末位菜单元素
 * @param item
 * @returns
 */
// const assertChildNotType3 = (item: { children?: any[]; route: string }) => {
//     if ((!item.children || !item.children.length) && item.route) {
//         return true
//     }

//     if (item.children?.some(i => Number(i.type) === 3) && item.route) {
//         return true
//     }
//     return false
// }
/* 
label 展示名称
key url path
icon svglink 字段
type 单挑数据的类型
children 子元素菜单
 
type = group 的时候就不会把这菜单视为页面 所以跳转的时候就回往下一层进行查找
 */
interface menuDataType {
    title: string
    key: string
    route: string
    icon: string
    isHideInnerMenu: boolean
    type?: 1 | 2 | 3
}

const menuData: menuDataType[] = [
    // {
    //     title: '工作台',
    //     key: '/work-tower',
    //     route: '/work-tower',
    //     icon: 'icon_nav_gongzuo_n1',
    //     type: 1,
    //     isHideInnerMenu: true,
    // },
]
const toMenuFirstPage = () => {
    const userStore = getLocalStorage('USER_STORE') || {}
    let { userPermissionRouteList } = userStore
    let firstRoute = userPermissionRouteList.find(item => !!item)
    firstRoute ? history.push(firstRoute) : console.error('当前菜单下没有找到页面 请检查配置')
    // const skipKey = findItem(menuData, item => assertChildNotType3(item))?.route
    // skipKey ? history.push(skipKey) : console.error('当前菜单下没有找到页面 请检查配置')
}

export { groupEnum, menuData, toMenuFirstPage }

export interface routeConfigType {
    menu: boolean // 是否展示菜单 默认展示
    header: boolean // 是否展示顶部  默认展示
    layout: boolean // 是否使用自带的layout
}

// /*
//     key = 是页面的path
//  */
// const routeConfig: Record<string, Partial<routeConfigType>> = {
//     '/gateway/web/create': {
//         menu: false,
//         header: false,
//         layout: false,
//     },
//     '/gateway/pc-web/create': {
//         menu: false,
//         header: false,
//         layout: false,
//     },
//     '/403': {
//         menu: false,
//         header: false,
//         layout: false,
//     },
//     '/404': {
//         menu: false,
//         header: false,
//     },
//     '/template-page': {
//         menu: false,
//         header: false,
//         layout: false,
//     },
//     '/case/list': {
//         menu: false,
//         header: false,
//         layout: false,
//     },
//     '/case/detail': {
//         menu: false,
//         header: false,
//         layout: false,
//     },
//     '/gateway/pc-view': {
//         menu: false,
//         header: false,
//         layout: false,
//     },
//     '/enroll-center/enroll-center': {
//         menu: false,
//         header: false,
//         layout: false,
//     },
//     '/enroll-center/enroll-management': {
//         menu: false,
//         header: false,
//         layout: false,
//     },
//     '/enroll-center/enroll-succeeded': {
//         menu: false,
//         header: false,
//         layout: false,
//     },
//     '/enroll-center/my-enrollment': {
//         menu: true,
//         header: true,
//         layout: true,
//     },
// }

// export { routeConfig }
