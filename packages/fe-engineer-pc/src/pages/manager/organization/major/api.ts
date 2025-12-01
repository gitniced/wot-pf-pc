const api = {
    // 获取专业列表
    getMajorList: '/wil/major/page',
    // 保存专业信息（新增或更新）
    saveMajor: '/wil/major/save',
    // 删除专业
    deleteMajor: '/wil/major/delete',
    // 更新专业状态
    updateMajorStatus: '/wil/major/updateStatus',
    // 更新专业排序
    updateMajorSort: '/wil/major/updateSortOrder',
    // 查询专业列表（简单列表）
    getMajorSimpleList: '/wil/major/list',
    // 培养层级相关
    saveTrainLevel: '/wil/train_level/save',
    deleteTrainLevel: '/wil/train_level/delete',
    getTrainLevelsByMajor: '/wil/train_level/list_by_major_code',
} as const

export default api
