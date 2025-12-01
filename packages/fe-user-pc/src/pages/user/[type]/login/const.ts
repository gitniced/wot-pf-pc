
// 获取当前页面的动态路由
export const getCurrentTypeUrl = () => {
    const pathname = location.pathname
    let currentType = pathname.split('/')[3]

    return currentType
}