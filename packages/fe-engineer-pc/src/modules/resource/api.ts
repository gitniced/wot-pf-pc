const api = {
    /**资源库分页查询 */
    getResourceList: '/wil/resource_library/page',
    /**资源库详情 */
    getResourceDetail: '/wil/resource_library/detail',
    /**新建资源 */
    createResource: '/wil/resource_library/create',
    /**编辑资源 */
    updateResource: '/wil/resource_library/update',
    /**删除资源 */
    deleteResource: '/wil/resource_library/delete',
    /**重命名资源 */
    renameResource: '/wil/resource_library/rename',
    /**统计资源数量根据专业 */
    statResourceCountByMajor: '/wil/resource_library/count_by_major',
}

export default api
