const api: any = {
    // 创建机构
    created: '/organization/organization/create',
    // 公共字典接口  规模  alias   scale
    scale: '/auth/common_data/category',
    // 城市数据
    area: '/common_data/city/city',
    // 行业
    industry: '/common_data/industry/list',
    getCode: '/auth/organization/send',
    verfiyCode: '/auth/verify/validate',
    // 绑定手机
    bindMobile: '/auth/user/v1/bind_mobile',
    // 给机构认领身份
    addIdentity: '/organization/organization/add_identity',
}

export default api
