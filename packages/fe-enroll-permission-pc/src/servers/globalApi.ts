const api = {
    upload: '/auth/resource/file/upload',
    // 权限接口
    userPermission: '/auth/role/user_permission',
    getUserInfo: '/auth/user/v1/info',
    getUserOrg: '/auth/user/v1/organization_list',
    getUserGroup: '/auth/user/v1/group_list',
    getSiteConfig: '/auth/backend/site/config',
    loginOut: '/auth/user/v1/logout',
    updateOrg: '/auth/user/v1/update_choice_organization',
    orgDetail: '/auth/organization/organization_detail',
    // 获取资源方关联的对应站点信息
    getDomainBySiteData: '/auth/backend/site/detail_by_domain',
    // 获取门户信息
    getPortalInfo: '/business/portal/visit/',
}
export default api
