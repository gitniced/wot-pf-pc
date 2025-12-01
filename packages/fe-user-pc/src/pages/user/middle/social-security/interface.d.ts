export enum AuthTypeEnum {
    WX = 'wx',
    DD = 'dd',
}
export type AuthQueryTYPE = {
    // 微信授权登录的openID
    code: string
    // 钉钉授权登录的openID
    authCode?: string
    // 来源站点的sid
    formSid?: string
    // 回调地址
    redirect_url?: string
}


export type AuthAppInfoTYPE = {
    // 应用ID
    appId: string
    // 重定向地址
    redirectUrl: string
}

export type AuthQueryType = {
    // 来源站点
    formSid?: string
    // 授权登录的用户类型
    authUserType?: string
    // appid
    appId?: string
    // 授权登录后得到的openid
    dataToken?: string
}

export type AccessTokenTYPE = {
    // 扫码后获取的authType  wx或者 dd
    authType?: string

    // 注册标识
    registerFlag?: boolean
    // token令牌
    accessToken?: string
    // 用户第三方应用唯一标识
    authOpenId?: string
    // 移动端登录后默认跳转地址
    mobileIndexUrl?: string
    //  扫码后获取的userCode
    userCode?: string
    // userType, 用户登录类型
    userType?: string
}


