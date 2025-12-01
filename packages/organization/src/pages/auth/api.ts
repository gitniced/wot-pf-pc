const api: any = {
    // 创建成员
    createAuth: '/organization/staff/check_staff_mobile',
    // 编辑成员
    editAuth: '/organization/staff/edit_staff',
    // 获取角色列表 /{organizationCode}
    roleList: '/organization/role/role_list/',

    // 查询用户信息
    authInfo: '/auth/user/v1/info',
    // 获取部门树 /{organizationCode}
    getDepartmentTree: '/organization/department/tree/',

    createStaffSendMessage: '/organization/staff/create_staff_send_message'
}

export default api
