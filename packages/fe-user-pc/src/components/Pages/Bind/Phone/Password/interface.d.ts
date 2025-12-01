export interface VerifyPasswordParams {
    account?: string // 手机号
    appKey?: string // 登录设备
    password: string // 密码
    sid: number // 站点ID
    type: number // 类型 1 个人 2机构 3资源方
}
