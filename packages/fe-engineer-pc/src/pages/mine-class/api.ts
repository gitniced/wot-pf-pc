const api = {
    /**根据教师编码和学期获取课程信息（按专业分组） */
    getTeacherCourseList: '/wil/course_schedule/teacher/courses',
    /**根分页查询教师授课班级列表 */
    getTeacherClassList: '/wil/course_schedule/teacher/classes',
    /** 获取教师所教课程的学期列表 */
    getTeacherSemesterList: '/wil/course_schedule/teacher/semesters',
}
export default api
