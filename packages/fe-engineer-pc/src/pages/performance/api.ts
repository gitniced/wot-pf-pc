const api = {
    /**分页查询课堂表现记录 */
    getClassPerformance: '/wil/classPerformance/page',
    /**分页查询班级学生列表 */
    getStudentListByClass: '/wil/student/listByClass',
    /**批量提交课堂表现评分 */
    batchSubmit: '/wil/classPerformance/batchSubmit',
    /**批量导入课堂表现评分 */
    batchImport: '/wil/classPerformance/batchImport',
    /**下载模板 */
    downloadTemplate: '/wil/classPerformance/downloadTemplate',
    /**获取教师授课班级列表（支持名称模糊搜索） */
    getTeacherClasses: '/wil/teaching/teacherClasses',
    /**获取课堂表现基础信息 */
    getClassPerformanceInfo: '/wil/teaching/classPerformance/baseInfo',
}
export default api
