export enum AuthTypeEnum {
    WX = 'wx',
    DD = 'dd',
}

export type AuthAppInfoTYPE = {
    // 应用ID
    appId: string
    // 重定向地址
    redirectUrl: string
}

export type AccessTokenTYPE = {
    // 注册标识
    registerFlag?: boolean
    // token令牌
    accessToken?: string
    //    移动端登录后默认跳转地址
    mobileIndexUrl?: string
}
