const api = {
    // 获取机构信息
    orgInfo: '/organization/organization/organization_detail',
    // 获取机构的权限
    organizationPermissionList: '/organization/organization/v2/user_permission',
    // 获取用户的权限
    userPermissionList: '/auth/user_permission/v1/tree',
    // 获取用户的机构列表
    organizationList: '/auth/user/v1/organization_list',
    // // 获取用户的默认机构
    // defaultOrganization: '/organization/organization/default_organization/',
    // // 设置默认的机构
    // setDefaultOrganization: '/organization/organization/change_default_org',
    // // 获取机构的身份列表
    // organizationIdentityList: '/organization/organization/organization_identity/',
    // // 获取机构默认身份
    // defaultOrganizationIdentity: '/organization/organization/default_identity/',
    // // 设置默认机构身份
    // setDefaultOrganizationIdentity: '/organization/organization/change_default_identity',
    // // 用户身份列表
    // userIdentityList: '/auth/user_identity/list',
    // // 用户默认身份
    // userDefaultIdentity: '/auth/user_identity/default_identity',
    // // 设置用户的默认身份
    // setUserDefaultIdentity: '/auth/user_identity/set_default/',
    // 走马灯 轮播图数据
    carousel: '/search/front/recommend/page',
    //编辑常用功能列表
    commonlyUsed: '/todo/front/normal_function/edit',
    //获取常用功能列表
    commonlyUsedList: '/todo/front/normal_function/list',
    //获取常用功能菜单列表
    allList: '/auth/menu/normal_function_list',
    //获取当前用户轮播状态
    carouselStatus: '/search/front/recommend/get_carousel_status',
    //设置当前用户轮播状态
    setCarouselStatus: '/search/front/recommend/update_carousel_status',
}

export default api
