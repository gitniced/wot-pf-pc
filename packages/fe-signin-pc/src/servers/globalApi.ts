const api = {
    upload: '/auth/resource/file/upload',
    // 权限接口
    userPermission: '/auth/role/user_permission',
    getUserInfo: '/auth/user/v1/info',
    getUserOrg: '/organization/organization/organization_list',
    getUserGroup: '/auth/user/v1/group_list',
    getSiteConfig: '/auth/backend/site/config',
    loginOut: '/auth/user/v1/logout',
    updateOrg: '/auth/user/v1/update_choice_organization',
    orgDetail: '/organization/organization/organization_detail',
}
export default api
