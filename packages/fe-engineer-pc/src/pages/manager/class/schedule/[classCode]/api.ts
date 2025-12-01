const api = {
    // 查询课程列表（排课管理用）
    getCourseSchedulePage: '/wil/course_schedule/page',
    // 获取学期列表
    getSemesters: '/wil/course_schedule/semesters',
    // 批量添加或修改排课
    batchSaveCourseSchedule: '/wil/course_schedule/batch_save',
    // 分页查询讲师授课情况
    getTeacherSchedule: '/wil/course_schedule/teacher',
} as const

export default api
