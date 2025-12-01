const api = {
    // 获取教师列表
    getTeacherList: '/wil/teacher/page',
    // 保存教师信息（新增或更新）
    saveTeacher: '/wil/teacher/save',
    // 删除教师
    deleteTeacher: '/wil/teacher/delete',
    // 更新教师状态
    updateTeacherStatus: '/wil/teacher/updateStatus',
    // 检查教师状态和获取教师信息
    checkAndGetTeacher: '/wil/teacher/check_and_get_teacher',
    // Excel批量导入教师
    importTeacherExcel: '/wil/teacher/import_excel',
} as const

export default api
