const api = {
    // 获取用户的详情
    getUserData: '/auth/user/v1/info',
    // 获取用户的购物车数量
    getShoppingCar: '/career_main/dashboard/getCartTotal',
    // 获取站点全量页面数据
    getSitePageList: '/organization/permission/site_all_page/',
    // 获取机构的权限
    getOrganizationPermissionList: '/organization/organization/v2/user_permission',
    // 获取用户的权限
    getUserPermissionList: '/auth/user_permission/v1/tree',
    // 获取用户的机构列表
    getOrganizationList: '/auth/user/v1/organization_list',
    // 获取用户的默认机构
    getDefaultOrganization: '/organization/organization/default_organization/',
    // 获取机构详情
    getOrganizationDetail: '/organization/organization/organization_detail/',
    // 设置默认的机构
    setDefaultOrganization: '/organization/organization/change_default_org',
    // 获取机构的身份列表
    getOrganizationIdentityList: '/organization/organization/organization_identity/',
    // 获取机构默认身份
    getDefaultOrganizationIdentity: '/organization/organization/default_identity/',
    // 设置默认机构身份
    setDefaultOrganizationIdentity: '/organization/organization/change_default_identity',
    // 用户身份列表
    getUserIdentityList: '/auth/user_identity/list',
    // 用户默认身份
    getUserDefaultIdentity: '/auth/user_identity/default_identity',
    // 设置用户的默认身份
    setUserDefaultIdentity: '/auth/user_identity/set_default/',

    /**  获取saas门户权限 菜单list  */
    getSaasMenuList: '/business/jumpurl/list',

    /** 获取中心个人权限菜单数据  */
    getPersonalList: '/auth/user_permission/v2/tree',
}

export default api
