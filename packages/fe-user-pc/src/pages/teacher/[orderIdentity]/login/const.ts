export const stackKey = [
    // 手机号
    'login_personal_center_mobile_pwd',
    //证件号码
    'login_personal_center_certificate_psw',
    // 手机验证
    'login_personal_center_mobile_verify',
    //账号
    'login_personal_center_account_psw',
]

export const placeHolderMap: Record<string, string> = {
    login_personal_center_mobile_pwd: '手机号',
    login_personal_center_certificate_psw: '证件号码',
    login_personal_center_account_psw: '账号',
}

/**中心个人登录的登录方式
 * 手机密码登录
 * 账号密码
 * 证件号登录
 */
export const methods1Key = [
    'login_personal_center_mobile_pwd',
    'login_personal_center_certificate_psw',
    'login_personal_center_account_psw',
]

/**中心个人登录的登录方式
 * 手机验证码登录
 */
export const methods2Key = ['login_personal_center_mobile_verify']
