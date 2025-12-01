import type { UserAccount } from '@/stores/interface'

export enum AuthTypeEnum {
    WX = 'wx',
    DD = 'dd',
    NNC = 'nnc'
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
    // 操作类型
    action?: 'bind' | 'login'
    // 授权方式
    authType?: 'dd' | 'wx' | 'nnc'
}

export type AuthAppInfoTYPE = {
    // 应用ID
    appId: string
    // 重定向地址
    redirectUrl: string
}

export type AuthQueryType = {
    // 授权类型,wx:微信;dd:钉钉
    state: string
    // 来源站点
    formSid?: string
    // 授权登录的用户类型
    authUserType?: string
    // appid
    appId?: string
    // 授权登录后得到的openid
    code?: string
}

export interface AccessTokenTYPE extends UserAccount {
    // 扫码后获取的authType  wx或者 dd
    authType?: string
    // 注册标识
    registerFlag?: boolean
    // 用户第三方应用唯一标识
    authOpenId?: string
    // 移动端登录后默认跳转地址
    mobileIndexUrl?: string
    userType?: string
}
