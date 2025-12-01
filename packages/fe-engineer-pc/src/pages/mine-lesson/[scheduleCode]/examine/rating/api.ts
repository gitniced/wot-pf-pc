const api = {
    /**获取学习任务节点树 */
    getNodeTree: '/wil/learning/getNodeTree',
    /** 获取课程和班级信息（编码与名称） */
    getCourseClassInfo: '/wil/course_schedule/courseClassInfo',
    /**分页查询课后作业主页（班级维度） */
    getHomeworkList: '/wil/evaluation/homework/page',
    /**分页查询课堂表现记录 */
    getClassPerformanceList: '/wil/classPerformance/page',
    /**分页查询任务考核列表 */
    getTaskExamList: '/wil/taskAssessment/page',
    /**获取课程考核构成 */
    getCourseEvaluations: '/wil/evaluation/courseEvaluations',
    /**单个学生终结性考核评分修改 */
    updateScoreSingle: '/wil/finalAssessment/updateScore',
    /**下载模板 */
    downloadTemplateFinalAssessment: '/wil/finalAssessment/downloadTemplate',
    /**批量导入学生终结性考核评分 */
    batchImportFinalAssessment: '/wil/finalAssessment/batchImport',
    /**查询班级终结性考核 */
    getFinalAssessment: '/wil/finalAssessment/getBySchedule',
    /**提交班级终结性考核 */
    submitFinalAssessment: '/wil/finalAssessment/batchSubmit',
}

export default api
