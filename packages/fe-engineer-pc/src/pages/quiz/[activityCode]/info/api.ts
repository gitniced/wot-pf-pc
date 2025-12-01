const api = {
    /**课后作业基础信息获取 */
    getHomeworkBaseInfo: '/wil/class_question/baseInfo',
    /**获取班级课程相关信息 */
    getCourseClassInfo: '/wil/course_schedule/courseClassInfo',
    /**获取师评考核学生列表 */
    getHomeworkStudentList: '/wil/class_question/class_page',
    /**获取当前学生课后作业 */
    getStudentHomework: '/wil/class_question/stu_question',
    /**学生课后作业批改 */
    submitHomeworkGrade: '/wil/class_question/correct',
}
export default api
