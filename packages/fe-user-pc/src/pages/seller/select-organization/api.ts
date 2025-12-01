const api = {
    // 申领
    addIdentity: '/organization/organization/add_identity',

    // 资源方根据身份的筛选机构列表
    selectOrg:
        '/organization/organization/organization_list_identity' /* '/organization/organization/organization_list' */,
    // 更新最后选择的机构
    updateSelectOrg: '/auth/user/v1/update_choice_organization/',
}

export default api
