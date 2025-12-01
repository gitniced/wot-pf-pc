const api = {
    // 资源库分页查询所有信息
    getResourceList: '/wil/resource_library/page_all',
    // 资源库查询信息详情
    getResourceDetail: '/wil/resource_library/detail_all',
} as const

export default api
