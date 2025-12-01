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
    getDomainBySiteData: '/auth/backend/site/v2/detail_by_domain',
    // 获取门户信息
    getPortalInfo: '/business/portal/visit/',
    //v2站点详情
    getSiteDetail: '/auth/site_front/v2/detail',
    //获取code对应的门户信息
    getPortalData: '/business/portal/info_by_org_code',
    // 查询开放邮箱功能的二级域名列表
    getEmailDomainList: '/auth/verify/open_email_domain_status',
    getUserPageConfig: '/admin/front/page_config/list',
    /**  通过自定义域名或组织code查询自定义域名与组织code */
    getPortalCodeByAlias: '/business/portal/find_org_or_domain/',
}
export default api
