const api = {
    // 课程管理分页查询
    getCourseList: '/wil/courses/page',
    // 修改课程模板状态
    updateCourseTemplateStatus: '/wil/courses/update_template_status',
    // 修改课程优质状态
    updateCourseQualityStatus: '/wil/courses/update_quality_status',
    // 获取课程数量统计
    getCourseNum: '/wil/courses/course_num',
} as const

export default api
