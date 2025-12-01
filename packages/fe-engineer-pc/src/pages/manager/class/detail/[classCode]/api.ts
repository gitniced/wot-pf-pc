const api = {
    // 获取学生列表
    getClassStudentList: '/wil/student/class_page',
    // 获取班级课程列表（已排课的课程）
    getClassCourseSchedule: '/wil/course_schedule/class_page',
} as const

export default api
