const api = {
    getCode: '/auth/verify/send',
    register: '/auth/user/v1/register',

    // 登录注册合一接口
    verify_register: '/auth/user/v1/merchant_verify_register',

    //重置密码
    reset_password: '/auth/user/v1/set_password',
    // 用户组列表
    getUserGroupList: '/auth/user_group/group_list',
}

export default api
