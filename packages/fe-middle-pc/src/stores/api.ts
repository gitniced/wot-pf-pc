const api = {
    // 获取用户的详情
    getUserData: '/auth/user/v1/info',
    // 获取站点全量页面数据
    getSitePageList: '/organization/permission/site_all_page/',
    // 获取组织的权限
    getOrganizationPermissionList: '/organization/organization/v2/user_permission',
    // 获取用户的权限
    getUserPermissionList: '/auth/user_permission/v1/tree',
    // 获取用户的组织列表
    getOrganizationList: '/auth/user/v1/organization_list',
    // 获取用户的默认组织
    getDefaultOrganization: '/organization/organization/default_organization/',
    // 获取组织详情
    getOrganizationDetail: '/organization/organization/organization_detail/',
    // 设置默认的组织
    setDefaultOrganization: '/organization/organization/change_default_org',
    // 获取组织的身份列表
    getOrganizationIdentityList: '/organization/organization/organization_identity/',
    // 获取组织默认身份
    getDefaultOrganizationIdentity: '/organization/organization/default_identity/',
    // 设置默认组织身份
    setDefaultOrganizationIdentity: '/organization/organization/change_default_identity',
    // 用户身份列表
    getUserIdentityList: '/auth/user_identity/list',
    // 用户默认身份
    getUserDefaultIdentity: '/auth/user_identity/default_identity',
    // 设置用户的默认身份
    setUserDefaultIdentity: '/auth/user_identity/set_default/',

    /**  获取saas门户权限 菜单list  */
    getSaasMenuList: '/business/jumpurl/list',
}

export default api
