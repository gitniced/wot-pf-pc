const api = {
    getBaseInfo: '/auth/user/v1/info',

    // 获取最新审核信息
    getAuditInfo: '/auth/user_audit/details',
    // 获取绑定状态
    getAuthBind: '/auth/login/get_auth_bind',
    // 解除绑定
    userUnbind: '/auth/login/user_unbind'
}

export default api
