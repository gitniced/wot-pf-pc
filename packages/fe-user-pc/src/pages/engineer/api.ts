const api = {
    checkLoginIdentity: '/auth/user/v1/check_login_identity',
    passwordLogin: '/auth/user/v1/login',
    codeLogin: '/auth/user/v1/verify_login',
    getCode: '/auth/verify/send',
    sendCodeValidate: '/auth/verify/send_code_validate',
    checkAndGetTeacher: '/wil/teacher/check_and_get_teacher',
    checkAndGetStudent: '/wil/student/check_and_get_student',
}

export default api
