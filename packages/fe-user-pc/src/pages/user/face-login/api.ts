const api = {
    /**检查用户人脸信息 */
    checkAccount: '/auth/user/v1/check_user_face_exist',
    /**录入人脸照片 */
    inputImage: '/auth/user/v1/upload_and_save_user_face_img',
    /**人脸识别登录 */
    faceLogin: '/auth/user/v1/login_with_face',
}

export default api
