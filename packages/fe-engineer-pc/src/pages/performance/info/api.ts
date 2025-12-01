const api = {
    /**获取课堂表现基础信息 */
    getClassPerformanceInfo: '/wil/teaching/classPerformance/baseInfo',
    /**查询班级课堂表现 */
    getStudentListBySchedule: '/wil/classPerformance/getBySchedule',
    /**下载评分模板 */
    downloadTemplate: '/wil/classPerformance/downloadTemplate',
    /**批量提交课堂表现评分 */
    batchSubmit: '/wil/classPerformance/batchSubmit',
    /**批量导入课堂表现评分 */
    batchImport: '/wil/classPerformance/batchImport',
}
export default api
