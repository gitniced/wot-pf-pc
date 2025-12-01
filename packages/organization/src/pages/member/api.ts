const api: any = {
    changeOrganizationOwner: '/organization/organization/transfer_creator',
    verifyCode: '/auth/verify/validate',
    getCode: '/auth/verify/send',
    // 机构列表
    organizationList: '/organization/organization/organization_list',
    // 机构详情 /{organizationCode}
    organizationDetail: '/organization/organization/organization_detail/',
    // 机构架构-部门树 /{organizationCode}
    organizationTree: '/organization/department/tree/',
    // 部门查询 /{organizationCode}/{name}
    queryDepartment: '/organization/department/search',
    // 创建部门
    createDepartment: '/organization/department/create_department',
    // 编辑部门
    editDepartment: '/organization/department/edit_department',
    // 删除部门
    delDepartment: '/organization/department/delete_department',
    // 成员分页列表
    authList: '/organization/staff/employee/page',
    // 删除成员
    delAuth: '/organization/staff/delete_staff',
    // 获取角色列表 /{organizationCode}
    roleList: '/organization/role/role_list/',
    // 成员邀请码
    inviteCode: '/organization/staff/invite_code',
    // 查询用户信息
    authInfo: '/auth/user/v1/info',
    // 设置主管 /{departmentCode}/{directorCode}
    setDirector: '/organization/staff/set_director/',
    // 批量操作列表
    importList: '/auth/batch_operate/import_list',
    // 站点列表
    siteList: '/auth/backend/site/list',
    // 文件导入
    import: '/auth/import/import',
    // 文件导入
    excelImport: '/organization/staff/excel/import',
    // 部门直属成员 {departmentCode}
    departStaff: '/organization/department/department_staff/',
    // 机构架构-部门查询
    searchTree: '/organization/department/search',
}

export default api
