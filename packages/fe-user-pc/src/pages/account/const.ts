export const LOGIN_TYPE = {
    1: '账号登录',
    2: '手机验证码',
    3: '账号登录'
}

export const DEVICE_TYPE = {
    1: 'PC网页',
    2: '小程序',
}
// 手机号、密码、实名认证、邮箱的绑定状态
export enum VERIFY_TYPE {
    // 已绑定
    BIND = 1,
    // 未绑定
    UNBIND = 0
}