const api: any = {
    // 获取角色详情
    getRoleDetail: '/organization/role/role_info/',
    // 角色分页列表
    rolePageList: '/organization/role/page',
    // 创建角色
    createRole: '/organization/role/create',
    // 角色下的用户数量 /{code}
    roleHasUser: '/organization/role/has_role_staff/',
    // 删除角色 /{code}
    deleteRole: '/organization/role/delete/',
    // 编辑角色
    editRole: '/organization/role/modify',
    // 权限编辑
    editPermission: '/organization/role/permissions/save',
    // 权限列表
    permissionList: '/organization/role/permissions',
    // 机构详情 /{organizationCode}
    organizationDetail: '/organization/organization/organization_detail/',
}

export default api
