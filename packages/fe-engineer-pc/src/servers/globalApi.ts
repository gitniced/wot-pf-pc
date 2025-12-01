const api = {
    // 上传
    upload: '/auth/resource/file/upload',
    // 用户信息
    getUserInfo: '/auth/user/v1/info',
    // 学生信息
    getStudentInfo: '/wil/student/check_and_get_student',
    // 教师信息
    getTeacherInfo: '/wil/teacher/check_and_get_teacher',
    // 权限接口
    userPermission: '/auth/role/user_permission',
    // 获取资源方关联的对应站点信息
    getDomainBySiteData: '/auth/backend/site/detail_by_domain',
    // 获取门户信息
    getPortalInfo: '/business/portal/visit/',
    // 退出登录
    loginOut: '/auth/user/v1/logout',
}
export default api
