const api = {
    upload: '/auth/resource/file/upload',
    // 权限接口
    userPermission:
        '/organization/organization/v2/user_permission' /*'/auth/role/user_permission' */,
    getUserInfo: '/auth/user/v1/info',
    getUserOrg: '/auth/user/v1/organization_list',
    getUserGroup: '/auth/user/v1/group_list',
    // 获取站点信息
    getSiteConfig: '/auth/backend/site/config',
    // 获取门户信息
    businessVisit: '/business/portal/one',
    getConfigByDomain: '/auth/backend/site/config_by_domain',
    // 获取资源方关联的对应站点信息
    getDomainBySiteData: '/auth/backend/site/detail_by_domain',
    loginOut: '/auth/user/v1/logout',
    updateOrg: '/auth/user/v1/update_choice_organization',
    orgDetail: '/organization/organization/organization_detail',
    passwordLogin: '/auth/user/v1/login', //密码登录
    // 获取默认的机构
    defaultOrganizationCode: '/organization/organization/default_organization/',
    // 获取默认的身份
    defaultOrganizationIdentity: '/organization/organization/default_identity/',
    // 获取默认的用户身份
    getDefaultUserIdentity: '/auth/user_identity/default_identity',
    // 获取门户导航信息
    getMicroNav: '/business/navigation/list_pc',
    /**  获取saas门户权限 菜单list  */
    getSaasMenuList: '/business/jumpurl/list',

    /**  获取门户的页脚配置  */
    getFooterConfig: '/business/footer/get/visit',
    /**  获取门户的悬浮窗配置  */
    getFloatWindowConfig: '/business/suspension/list/visit',
    /**  通过自定义别名获取机构code  */
    getPortalCodeByAlias: '/business/portal/find_custom_domain/',
    /**  通过密钥获取token  */
    getTokenBySecretKey: '/auth/user/v1/token_by_random_code2',
    /**  当前用户是否属于当前私密门户  */
    isPortalUser: 'auth/user/v1/check_privacy_portal_permissions',
}
export default api
