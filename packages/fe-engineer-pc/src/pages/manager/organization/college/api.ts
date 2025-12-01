const api = {
    // 获取学院列表
    getCollegeList: '/wil/college/page',
    // 保存学院信息（新增或更新）
    saveCollege: '/wil/college/save',
    // 删除学院
    deleteCollege: '/wil/college/delete',
    // 更新学院状态
    updateCollegeStatus: '/wil/college/updateStatus',
    // 更新学院排序
    updateCollegeSort: '/wil/college/updateSortOrder',
    // 查询学院编码列表
    getCollegeCodeList: '/wil/college/list_code_name',
} as const

export default api
