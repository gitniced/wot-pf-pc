const api = {
    /**课后作业基础信息获取 */
    getHomeworkBaseInfo: '/wil/homework/baseInfo',
    /**获取班级课程相关信息 */
    getCourseClassInfo: '/wil/course_schedule/courseClassInfo',
    /**获取师评考核学生列表 */
    getHomeworkStudentList: '/wil/evaluation/homework/classCorrections',
    /**获取当前学生课后作业 */
    getStudentHomework: '/wil/homework/getStudentHomework',
    /**学生课后作业批改 */
    submitHomeworkGrade: '/wil/evaluation/homework/grade',
}
export default api
