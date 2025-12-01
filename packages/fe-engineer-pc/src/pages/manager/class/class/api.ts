const api = {
    // 获取班级列表
    getClassList: '/wil/class/page',
    // 保存班级信息（新增或更新）
    saveClass: '/wil/class/save',
    // 删除班级
    deleteClass: '/wil/class/delete',
    // 查询班级详情
    getClassDetail: '/wil/class/detail',
} as const

export default api
