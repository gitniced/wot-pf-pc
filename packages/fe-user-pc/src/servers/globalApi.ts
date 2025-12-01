const api = {
    upload: '/auth/resource/file/upload',
    // 权限接口
    userPermission:
        '/organization/organization/v2/user_permission' /*'/auth/role/user_permission' */,
    getUserInfo: '/auth/user/v1/info',
    getUserOrg: '/organization/organization/organization_list',
    getUserGroup: '/auth/user/v1/group_list',
    getSiteConfig: '/auth/backend/site/config',
    getConfigByDomain: '/auth/backend/site/config_by_domain',
    // 获取资源方关联的对应站点信息
    getDomainBySiteData: '/auth/backend/site/detail_by_domain',
    loginOut: '/auth/user/v1/logout',
    updateLastOrg: '/auth/user/v1/update_choice_organization',
    orgDetail: '/organization/organization/organization_detail',
    passwordLogin: '/auth/user/v1/login', //密码登录
    // 获取默认的机构
    defaultOrganizationCode: '/organization/organization/default_organization/',
    // 获取默认的身份
    defaultOrganizationIdentity: '/organization/organization/default_identity/',
    // 获取默认的用户身份
    getDefaultUserIdentity: '/auth/user_identity/default_identity',
    // 访问门户
    getPortalData: '/business/portal/one',
    // 校验 短信、邮箱验证码是否正确
    verifyValidate: '/auth/verify/validate',
    // 获取公钥
    getPublicKey: '/auth/user/v1/public_key',
    // 可以入驻的机构列表
    canJoinOrg: '/organization/organization/can_join_org/',

    // 资源方根据身份的筛选机构列表
    getOrgListByIdentity: '/organization/organization/organization_list_identity',
    // 获取机构的身份列表
    getOrganizationIdentityList: '/organization/organization/organization_identity/',
    // 用户身份列表
    getUserIdentityList: '/auth/user_identity/list',
    // 查询开放邮箱功能的二级域名列表
    getEmailDomainList: '/auth/verify/open_email_domain_status',

    /**  通过密钥获取token  */
    getTokenBySecretKey: '/auth/user/v1/token_by_random_code2',
    // token置换用户信息
    getLoginInfo: '/auth/user/v1/login_info',
}
export default api
