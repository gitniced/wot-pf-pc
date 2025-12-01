const api = {
    getCode: '/auth/verify/send',
    register: '/auth/user/v1/register',
    // 密码登录
    passwordLogin: '/auth/user/v1/login',
    // 登录注册合一接口
    verify_register: '/auth/user/v1/merchant_verify_register',
    // 可以入驻的机构列表
    canJoinOrg: '/organization/organization/can_join_org/',
    //重置密码
    reset_password: '/auth/user/v1/set_password',
    // 用户组列表
    getUserGroupList: '/auth/user_group/group_list',
    getAccountLog: '/search/front/login/auth_list',
    getAccountGroup: '/auth/user/v1/group_list',
    getAccountOrg: '/organization/organization/organization_list',
    selectOrg: '/organization/organization/organization_list',
}

export default api
