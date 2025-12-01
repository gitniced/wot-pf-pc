const api = {
    // 获取学生列表
    getStudentList: '/wil/student/page',
    // 保存学生信息（新增或更新）
    saveStudent: '/wil/student/save',
    // 删除学生
    deleteStudent: '/wil/student/delete',
    // 更新学生状态
    updateStudentStatus: '/wil/student/updateStatus',
    // 根据学生编号获取学生信息
    getStudentByCode: '/wil/student/getByCode',
    // 检查学生状态和获取学生信息
    checkAndGetStudent: '/wil/student/check_and_get_student',
    // Excel批量导入学生
    importStudentExcel: '/wil/student/import_excel',
} as const

export default api
