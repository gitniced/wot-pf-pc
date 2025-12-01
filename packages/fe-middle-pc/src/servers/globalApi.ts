const api = {
    // 用户信息
    getUserInfo: '/auth/user/v1/info',
    // 获取机构详情
    getOrganizationData: '/organization/organization/organization_detail/',
    // 权限接口
    userPermission: '/auth/role/user_permission',
    // 获取资源方关联的对应站点信息
    getDomainBySiteData: '/auth/backend/site/detail_by_domain',
    // 获取门户信息
    getPortalInfo: '/business/portal/visit/',
    // 退出登录
    loginOut: '/auth/user/v1/logout',
}
export default api
