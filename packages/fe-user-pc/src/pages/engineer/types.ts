/**
 * LoginRequestDto
 */
export interface LoginRequestDto {
    /**
     * 手机号/身份证号，账号
     */
    account: string
    /**
     * 登录设备
     */
    appKey: AppKey
    /**
     * 用户第三方应用唯一标识
     */
    authOpenId?: string
    /**
     * 授权类型,wx:微信;dd:钉钉
     */
    authType?: string
    /**
     * TOKEN加时状态，1：15小时
     */
    extraTimeStatus?: number
    /**
     * 组织编码，私密门户该参数必传
     */
    organizationCode?: string
    /**
     * 密码
     */
    password: string
    /**
     * 加密公钥
     */
    publicKey?: string
    /**
     * 验证码随机key
     */
    randomKey?: string
    /**
     * 站点id
     */
    sid: number
    /**
     * 类型，1个人，2机构，3资源方, 4中心个人
     */
    type: number
    /**
     * 验证码
     */
    verifyCode?: string
}

/**
 * CodeLoginRequestDto
 */
export interface CodeLoginRequestDto {
    /**
     * 手机号
     */
    account: string
    /**
     * 登录设备
     */
    appKey: AppKey
    /**
     * 验证码随机key
     */
    randomKey: string
    /**
     * 站点id
     */
    sid: number
    /**
     * 类型，1个人，2机构，3资源方, 4中心个人
     */
    type: number
    /**
     * 验证码
     */
    verifyCode: string
}

/**
 * 登录设备
 */
export enum AppKey {
    Applet = 'APPLET',
    Mobile = 'MOBILE',
    Openapi = 'OPENAPI',
    Pad = 'PAD',
    Sso = 'SSO',
    Web = 'WEB',
}

/**
 * ResponseLoginResponseDto
 */
export interface Response {
    /**
     * 响应数据
     */
    data?: LoginResponseDto
    /**
     * 响应消息
     */
    message?: string
    /**
     * 响应消息编码
     */
    messageCode?: string
    /**
     * 是否成功
     */
    success?: boolean
    [property: string]: any
}

/**
 * 响应数据
 *
 * LoginResponseDto
 */
export interface LoginResponseDto {
    /**
     * 访问令牌
     */
    accessToken?: string
    /**
     * 登录设备
     */
    appKey?: AppKey
    /**
     * 头像
     */
    avatar?: string
    /**
     * 个人账号登录机构
     */
    cLoginB?: boolean
    /**
     * 用户组列表
     */
    groupList?: GroupResponseDto[]
    /**
     * 个人/资源方 是否是初始密码
     */
    personageInitPassWord?: boolean
    /**
     * 个人登录随机码
     */
    randomCode?: string
    /**
     * 站点id
     */
    sid?: number
    /**
     * token过期时间
     */
    tokenExpire?: number
    /**
     * 用户code
     */
    userCode?: string
    /**
     * 用户信息
     */
    userInfo?: UserInfoDto
}

/**
 * 用户组响应数据
 *
 * GroupResponseDto
 */
interface GroupResponseDto {
    /**
     * 描述
     */
    description?: string
    /**
     * id
     */
    id?: number
    /**
     * 名称
     */
    name?: string
    /**
     * 站点id
     */
    sid?: number
    /**
     * 类型  1个人，2机构，3资源方, 4中心个人
     */
    type?: number
    /**
     * 跳转业务线url
     */
    url?: string
}

/**
 * 用户信息
 *
 * UserInfoDto
 */
interface UserInfoDto {
    /**
     * 审核状态 0 待审核  1 认证通过 2 认证不通过
     */
    auditStatus?: number
    /**
     * 头像
     */
    avatar?: string
    /**
     * 出生年月
     */
    birthDay?: string
    /**
     * 证件类型，1身份证，2护照，3其他
     */
    certificateType?: number
    /**
     * 编码
     */
    code?: string
    /**
     * 创建时间
     */
    createdAt?: string
    /**
     * 邮箱
     * 邮箱，空字符串代表没有绑定过邮箱
     */
    email?: string
    /**
     * 激活状态，0未激活1已激活
     */
    enable?: number
    /**
     * 性别，男1 女2
     */
    gender?: number
    /**
     * 脱敏身份证
     */
    idCardDesensitization?: string
    /**
     * 身份证号
     * 身份证号or护照号or其他证件号，空字符串代表没有绑定过
     */
    idCardNo?: string
    /**
     * 是否初始密码，1是，0不是，代表是否设置过密码
     */
    isInitPassword?: boolean
    /**
     * 是否验证身份证号
     * 是否身份证号or护照号or其他证件号
     */
    isValidateIdCard?: boolean
    /**
     * 是否验证手机号
     */
    isValidatePhone?: boolean
    /**
     * 已加入天数
     */
    joinedDay?: number
    /**
     * 最近登录时间
     */
    lastLoginTs?: string
    /**
     * 最近选择组织编码
     */
    lastOrganizationCode?: string
    /**
     * 手机号
     */
    mobile?: string
    /**
     * 脱敏手机号
     */
    mobileDesensitization?: string
    /**
     * 姓名
     */
    name?: string
    /**
     * 脱敏姓名
     */
    nameDesensitization?: string
    /**
     * 昵称
     */
    nickname?: string
    /**
     * 个人/资源方 是否是初始密码
     */
    personageInitPassWord?: boolean
    /**
     * 站点
     */
    sid?: number
    /**
     * 状态 0正常1禁用
     */
    status?: number
    /**
     * 用户名
     */
    username?: string
}
