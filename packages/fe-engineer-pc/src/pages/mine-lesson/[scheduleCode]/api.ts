const api = {
    /**我的团队信息查询（包含团队和成员信息）*/
    getTeamInfo: '/wil/courseTeam/student/teamInfo',
    /**获取单学期课程列表 */
    getSemesterCourses: '/courses/semesterCourses/list',
    /**获取全部学期课程列表 */
    getAllCourses: '/courses/semesterCourses/allList',
    /**根据排课编码获取排课信息 */
    getScheduleInfo: '/wil/course_schedule/detail',
    /**获取班级课程信息 */
    getClassCourseInfo: '/wil/courses/getClassCourseInfo',
    /**获取课程统计信息 */
    getCourseStatistics: '/wil/courses/statistics',
    /**获取学生课程统计数据 */
    getStudentStatistics: '/wil/courses/studentStatistics',
    /** 获取个人评价任务统计 */
    getPersonExamineStatistics: '/wil/evaluation/statistics',
    /** 获取教师考核待办统计 */
    getTeacherTodo: '/wil/assessmentStatistics/teacherTodo',
    /** 获取班级进度信息 */
    getClassProgress: '/wil/assessmentStatistics/classProgress',
    /** 获取小组进度信息 */
    getGroupProgressRank: '/wil/assessmentStatistics/groupProgressRank',
    /** 获取班级课程学生考核成绩排行榜（前3名） */
    getClassScoreRanking: '/wil/evaluationScore/classScoreRanking',
}
export default api
