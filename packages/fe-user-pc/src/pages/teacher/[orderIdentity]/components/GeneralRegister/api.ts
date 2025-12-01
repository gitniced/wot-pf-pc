const api = {
    getCode: '/auth/verify/send',
    register: '/auth/user/v1/register',
    codeLogin: '/auth/user/v1/verify_login',
    passwordLogin: '/auth/user/v1/login',
    domain: '/auth/backend/site/detail_by_domain',
    isExistence: '/auth/login/verify_phone_user_exist',
    // 个人复杂注册
    personalRegister: '/auth/user/v1/complex_register',
    // 机构复杂注册
    orgRegister: '/auth/user/v1/organization_register',

    // 讲师短信验证码注册-中心个人角色下的讲老师身份
    teacherVerify: '/auth/user/v1/teacher_verify_register',
    // 用户组列表
    getGroupList: '/auth/user_group/group_list',
}

export default api
