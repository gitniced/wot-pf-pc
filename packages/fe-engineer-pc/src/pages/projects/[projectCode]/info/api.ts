const api = {
    /**获取考核项目编号基础信息 */
    getTaskExamProjectInfo: '/wil/taskAssessment/baseInfo',
    /**获取班级课程相关信息 */
    getCourseClassInfo: '/wil/course_schedule/courseClassInfo',
    /**获取师评考核学生列表 */
    getTaskExamProjectStudentList: '/wil/taskAssessment/students',
    /**通过项目编号获取学习成果 */
    getProjectOutcomes: '/wil/evaluation/getProjectOutcomes',
    /**获取考核项目评价细则 */
    getCriteria: '/wil/evaluation/getCriteria',
    /**获取考核项目评分详情（各指标分数+评语) */
    getEvaluationScoreDetails: '/wil/evaluationScore/details',
    /**提交评分 */
    submitEvaluation: '/wil/evaluation/submitEvaluation',
}
export default api
