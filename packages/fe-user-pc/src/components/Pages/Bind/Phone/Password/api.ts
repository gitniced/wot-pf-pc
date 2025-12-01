import Http from '@/servers/http'
import type { VerifyPasswordParams } from './interface'

// 发送验证码
export const sendVerifyCodeApi = (params: { account: string; key?: string }) => {
    return Http('/auth/verify/send', 'POST', params)
}
// 密码校验
export const verifyPasswordApi = (paramas: VerifyPasswordParams) => {
    return Http('/auth/user/v1/verify_password', 'POST', paramas)
}

// 滑块验证
export const serverVerifyApi = (ticket: string, randstr: string) => {
    return Http(
        'https://api.cloud.wozp.cn/captcha/ticket/validate',
        'post',
        { ticket, randstr }, //data中携带ticket和randstr
        // @ts-ignore
        { ticket }, //headers中携带ticket
    )
}

// 新手机号绑定
export const bindMobileApi = (params: {
    mobile: string
    verifyCode: string
    randomKey: string
}) => {
    return Http('/auth/user/v1/bind_mobile', 'POST', params)
}
