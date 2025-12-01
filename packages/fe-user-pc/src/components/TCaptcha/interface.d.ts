export interface TcaptchaResponse {
    ret: number //       验证结果，0：验证成功。2：用户主动关闭验证码。
    ticket: string //    验证成功的票据，当且仅当 ret = 0 时 ticket 有值。
    CaptchaAppId?: string //    验证码应用ID。
    bizState?: any //       自定义透传参数。
    randstr: string //    本次验证的随机串，后续票据校验时需传递该参数。
    errorCode?: number
    errorMessage?: string
}

export interface Depend {
    form: any
    key: string
}
export interface TCaptchaProps {
    depend?: Depend
    children: JSX.Element
    serverVerify: any
    fail?: any
    // 是否自动打开滑动验证码弹窗 默认false
    autoOpenVerify?: boolean
    // 是否跳过滑动验证码 默认false
    skipVerify?: boolean
}
