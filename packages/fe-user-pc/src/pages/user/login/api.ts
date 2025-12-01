const api = {
    getCode: '/auth/verify/send',
    passwordLogin: '/auth/user/v1/login',
    codeLogin: '/auth/user/v1/verify_login_register',
    getAuthAppInfo: '/auth/login/get_auth_app',
    // 个人复杂注册
    personalRegister: '/auth/user/v1/complex_register',
    // 机构复杂注册
    orgRegister: '/auth/user/v1/organization_register',
    // 手机短信密码登录
    loginVerificationCode: "/auth/user/v1/login_verification_code"
}

export default api
