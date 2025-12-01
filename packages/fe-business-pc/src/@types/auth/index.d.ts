/**
 * 如果遇到bug，您可以钉钉搜索封东其或者给 fengdongqi@hzwotu.com 邮箱发邮件
 * 欢迎大家提 issue 或者 PR。
 * @title 沃土用户服务
 * @description 沃土用户服务是一个 Spring Boot项目
 * @version v1.0
 * @date 2023/10/26 11:19:33
 **/

interface ErrorListResultErrorData {
    /**  */
    errorData?: ErrorData
}

interface ErrorData {
    /**  */
    errorCode?: string
    /**  */
    errorMessage?: string
    /**  */
    key?: string
}

/**
 * requestUrl /auth/backend/access/batch_create
 * method post
 */
export interface BatchCreateUsingPOSTRequest {}

/**
 * requestUrl /auth/backend/access/batch_create
 * method post
 */
export interface BatchCreateUsingPOSTResponse {
    /** 响应数据 */
    data?: ErrorListResultErrorData
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface AccessManageIdentityDto {
    /** 接入code */
    accessCode?: string
    /** 编码 */
    code?: string
    /** 身份 */
    identity?: string
    /** 身份id */
    identityId?: number
}

interface AccessManagePermissionDto {
    /** accessCode */
    accessCode?: string
    /** 编码 */
    code?: string
    /** 权限别名code */
    moduleAliasCode?: string
    /** 权限模块id */
    moduleId?: number
    /** 权限模块名称 */
    moduleName?: string
}

/**
 * requestUrl /auth/backend/access/create
 * method post
 */
export interface CreateUsingPOSTRequest {
    /** 接入内容名称 */
    accessName?: string
    /** 跳转url */
    accessUrl?: string
    /** 别名code 唯一 */
    aliasCode?: string
    /** 编码, 若为创建则自动生成 */
    code?: string
    /** 组件类型 1待办事项 2数据概览 3我的日程 */
    componentType?: number
    /** 创建时间 */
    createdAt?: number
    /** icon url */
    iconUrl?: string
    /** 身份list */
    identityList?: AccessManageIdentityDto
    /** 关联权限list */
    permissionList?: AccessManagePermissionDto
    /** 关联业务的url */
    relationUrl?: string
    /** 站点Id */
    sid?: number
    /** 来源 0 未知 1 平台 2 职业  3 考评 4 创培 */
    source?: string
    /** 接入对象code */
    targetCode?: string
    /** 接入对象类型 1个人 2机构 */
    targetType?: number
}

/**
 * requestUrl /auth/backend/access/create
 * method post
 */
export interface CreateUsingPOSTResponse {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/access/delete/{code}
 * method post
 */
export interface DeleteUsingPOSTRequest {}

/**
 * requestUrl /auth/backend/access/delete/{code}
 * method post
 */
export interface DeleteUsingPOSTResponse {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface AccessManageDetailDto {
    /** 接入内容名称 */
    accessName?: string
    /** 跳转url */
    accessUrl?: string
    /** 别名code 唯一 */
    aliasCode?: string
    /** 编码, 若为创建则自动生成 */
    code?: string
    /** 组件类型 1待办事项 2数据概览 3我的日程 */
    componentType?: number
    /** 创建时间 */
    createdAt?: number
    /** icon url */
    iconUrl?: string
    /** 身份list */
    identityList?: AccessManageIdentityDto
    /** 关联权限list */
    permissionList?: AccessManagePermissionDto
    /** 关联业务的url */
    relationUrl?: string
    /** 站点Id */
    sid?: number
    /** 来源 0 未知 1 平台 2 职业  3 考评 4 创培 */
    source?: string
    /** 接入对象code */
    targetCode?: string
    /** 接入对象类型 1个人 2机构 */
    targetType?: number
}

/**
 * requestUrl /auth/backend/access/detail/{code}
 * method get
 */
export interface DetailUsingGETResponse {
    /** 响应数据 */
    data?: AccessManageDetailDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface AccessManageCacheDto {
    /**  */
    accessName?: string
    /**  */
    accessUrl?: string
    /**  */
    aliasCode?: string
    /**  */
    code?: string
    /**  */
    iconUrl?: string
    /**  */
    permissionIdList?: any[]
}

/**
 * requestUrl /auth/backend/access/list
 * method post
 */
export interface ListUserAccessUsingPOSTRequest {
    /** 别名code */
    aliasCode?: string
    /** 组件类型 1待办事项 2数据概览 3我的日程 */
    componentType?: number
    /** 身份id */
    identityId?: number
    /** 机构code */
    organizationCode?: string
    /** 站点Id */
    sid?: number
    /** 接入对象code */
    targetCode?: string
    /** 接入对象类型 1个人 2机构 */
    targetType?: number
    /** userCode */
    userCode?: string
}

/**
 * requestUrl /auth/backend/access/list
 * method post
 */
export interface ListUserAccessUsingPOSTResponse {
    /** 响应数据 */
    data?: AccessManageCacheDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRspAccessManageDetailDto {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: AccessManageDetailDto
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

/**
 * requestUrl /auth/backend/access/page
 * method post
 */
export interface PageUsingPOSTRequest {
    /** 接入名称 */
    accessName?: string
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
}

/**
 * requestUrl /auth/backend/access/page
 * method post
 */
export interface PageUsingPOSTResponse {
    /** 响应数据 */
    data?: BasePaginationRspAccessManageDetailDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface AccessInfoDto {
    /** 接入名称 */
    accessName?: string
    /** 跳转url */
    accessUrl?: string
    /** 别名code */
    aliasCode?: string
    /** 接入主键code */
    code?: string
    /** 组件类型 1待办事项 2数据概览 3我的日程 */
    componentType?: number
    /** 图标url */
    iconUrl?: string
    /** 数据关联Url */
    relationUrl?: string
    /** 站点Id */
    sid?: number
    /** 来源0 未知 1 平台 2 职业  3 考评 4 创培 */
    source?: number
    /** 接入对象code */
    targetCode?: string
    /** 接入对象类型 1个人 2机构 */
    targetType?: number
}

/**
 * requestUrl /auth/access/list/access
 * method post
 */
export interface ListAccessInfoUsingPOSTRequest {
    /** 别名code */
    aliasCodeList?: any[]
    /** 接入主键code列表 */
    codes?: any[]
    /** 组件的类型列表 */
    componentTypeList?: any[]
    /** 身份Id列表 */
    identityIdList?: any[]
    /** 站点Id */
    sidList?: any[]
    /** 来源code列表 */
    sourceList?: any[]
    /** 目标code列表 */
    targetCodeList?: any[]
    /**  */
    targetTypeList?: any[]
}

/**
 * requestUrl /auth/access/list/access
 * method post
 */
export interface ListAccessInfoUsingPOSTResponse {
    /** 响应数据 */
    data?: AccessInfoDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface UserCertificateDto {
    /** 身份证反面 */
    idcardBack?: string
    /** 身份证正面/护照/其他照片 */
    idcardFront?: string
    /** 身份证/护照/其他证件号码 */
    idcardNo?: string
    /** 其他类型，补充说明 */
    remark?: string
    /** 1 未认证 2 已认证 3 审核中 */
    status?: number
    /** 证件类型，1身份证（默认），2护照，3其他 */
    type?: number
    /** 用户唯一编码 */
    userCode?: string
}

/**
 * requestUrl /auth/backend/account/certificate_info/{userCode}
 * method get
 */
export interface CertificateInfoUsingGETResponse {
    /** 响应数据 */
    data?: UserCertificateDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/account/edit
 * method post
 */
export interface EditUsingPOSTRequest {
    /** 审核状态 1 审核中 2 已认证 3 未认证 */
    auditStatus?: number
    /** 证件类型，1身份证（默认），2护照，3其他 */
    certificateType?: number
    /** 编码 */
    code?: string
    /** 身份证号 */
    idCardNo?: string
    /** 身份证反面，身份证必传 */
    idcardBack?: string
    /** 身份证正面/护照/其他证件附件 */
    idcardFront?: string
    /** 是否认证 */
    isValidateIdCard?: boolean
    /** 手机号 */
    mobile?: string
    /** 姓名 */
    name: string
    /** 是否不需要校验证件照片 */
    uncheckImg?: boolean
}

/**
 * requestUrl /auth/backend/account/edit
 * method post
 */
export interface EditUsingPOSTResponse {
    /** 响应数据 */
    data?: number
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/account/edit_pre_check
 * method post
 */
export interface EditPreCheckUsingPOSTRequest {
    /** 审核状态 1 审核中 2 已认证 3 未认证 */
    auditStatus?: number
    /** 证件类型，1身份证（默认），2护照，3其他 */
    certificateType?: number
    /** 编码 */
    code?: string
    /** 身份证号 */
    idCardNo?: string
    /** 身份证反面，身份证必传 */
    idcardBack?: string
    /** 身份证正面/护照/其他证件附件 */
    idcardFront?: string
    /** 是否认证 */
    isValidateIdCard?: boolean
    /** 手机号 */
    mobile?: string
    /** 姓名 */
    name: string
    /** 是否不需要校验证件照片 */
    uncheckImg?: boolean
}

/**
 * requestUrl /auth/backend/account/edit_pre_check
 * method post
 */
export interface EditPreCheckUsingPOSTResponse {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/account/modify_status/{code}/{status}
 * method post
 */
export interface ModifyStatusUsingPOSTResponse {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRspUserNameDto {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: UserNameDto
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

interface UserNameDto {
    /** 编码 */
    code?: string
    /** 姓名 */
    name?: string
}

/**
 * requestUrl /auth/backend/account/name_page
 * method post
 */
export interface GetNamePageUsingPOSTRequest {
    /** 姓名 */
    name?: string
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
    /** 站点 */
    sid?: number
    /** 状态，状态0正常1禁用 */
    status?: number
}

/**
 * requestUrl /auth/backend/account/name_page
 * method post
 */
export interface GetNamePageUsingPOSTResponse {
    /** 响应数据 */
    data?: BasePaginationRspUserNameDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRsp账号管理数据 {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: 账号管理数据
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

interface 账号管理数据 {
    /** 审核状态 0 审核中 1 已认证 2 未认证 */
    auditStatus?: Record<string | number | symbol, any>
    /** 证件类型，1身份证，2护照，3其他 */
    certificateType?: number
    /** 编码 */
    code?: string
    /** 创建时间 */
    createdAt?: number
    /** 激活状态，0未激活1已激活 */
    enable?: number
    /** 身份证号 */
    idCardNo?: string
    /** 身份证号(未脱敏) */
    idCardNoOrig?: string
    /** 是否锁定 */
    isLocked?: boolean
    /** 是否验证身份证号 */
    isValidateIdCard?: boolean
    /** 是否验证手机号 */
    isValidatePhone?: boolean
    /** 锁定原因 */
    lockedReason?: string
    /** 登录失败次数 */
    loginFailureCount?: number
    /** 手机号 */
    mobile?: string
    /** 姓名 */
    name?: string
    /** 站点id */
    sid?: number
    /** 站点 */
    siteName?: string
    /** 状态0正常1禁用 */
    status?: number
    /** 用户名 */
    username?: string
}

/**
 * requestUrl /auth/backend/account/page
 * method post
 */
export interface PageUsingPOST_1Request {
    /** 证件类型，1身份证，2护照，3其他 */
    certificateType?: number
    /** 激活状态，0未激活1已激活 */
    enable?: number
    /** 注册日期结束日期 */
    endTime?: number
    /** 身份证号 */
    idCardNo?: string
    /** 手机号 */
    mobile?: string
    /** 姓名 */
    name?: string
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
    /** 站点 */
    sid?: number
    /** 注册日期开始日期 */
    startTime?: number
    /** 账户名 */
    username?: string
}

/**
 * requestUrl /auth/backend/account/page
 * method post
 */
export interface PageUsingPOST_1Response {
    /** 响应数据 */
    data?: BasePaginationRsp账号管理数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/account/reset_password/{code}
 * method post
 */
export interface ResetPasswordUsingPOSTResponse {
    /** 响应数据 */
    data?: string
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/account/reset_password_php
 * method post
 */
export interface ResetPasswordPhpUsingPOSTRequest {
    /** 初始密码 */
    initPassword?: string
    /** 用户编码 */
    userCode?: string
}

/**
 * requestUrl /auth/backend/account/reset_password_php
 * method post
 */
export interface ResetPasswordPhpUsingPOSTResponse {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/account/unlock/{code}
 * method post
 */
export interface UnlockUsingPOSTResponse {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface IdentityDto {
    /** 身份id */
    id?: number
    /** 身份名称 */
    name?: string
    /** 1c用户  2机构 3资源方 */
    type?: string
}

/**
 * requestUrl /auth/backend/identity/all_identity
 * method get
 */
export interface GetAllIdentityListUsingGETResponse {
    /** 响应数据 */
    data?: IdentityDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface IdentifyComponentDto {
    /** 组件别名 */
    componentAlias?: string
    /** 组件id */
    componentId?: number
    /** 工作台组件名称 */
    componentName?: string
    /** 编码 */
    id?: number
    /** 身份id */
    identityId?: number
}

/**
 * requestUrl /auth/backend/identity/component_list
 * method get
 */
export interface GetComponentListUsingGETResponse {
    /** 响应数据 */
    data?: IdentifyComponentDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface IdentifyDefaultComponentDto {
    /** 工作台组件别名 */
    alias?: string
    /** 编码 */
    id: number
    /** 工作台组件名称 */
    name?: string
}

/**
 * requestUrl /auth/backend/identity/default_component_list
 * method get
 */
export interface GetDefaultComponentListUsingGETResponse {
    /** 响应数据 */
    data?: IdentifyDefaultComponentDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface Component {
    /** 组件别名 */
    componentAlias: string
    /** 组件id */
    componentId: number
    /** 组件名称 */
    componentName: string
}

/**
 * requestUrl /auth/backend/identity/edit_component
 * method post
 */
export interface EditComponentUsingPOSTRequest {
    /** 组件列表 */
    componentList?: Component
    /** 身份id */
    identityId: number
}

/**
 * requestUrl /auth/backend/identity/edit_component
 * method post
 */
export interface EditComponentUsingPOSTResponse {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRspIdentityResponseDto {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: IdentityResponseDto
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

interface IdentityResponseDto {
    /** 身份id */
    id?: number
    /** 身份名称 */
    name?: string
    /** 角色：1个人 ；2机构；3资源方 */
    type?: number
}

/**
 * requestUrl /auth/backend/identity/page
 * method post
 */
export interface PageUsingPOST_2Request {
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
}

/**
 * requestUrl /auth/backend/identity/page
 * method post
 */
export interface PageUsingPOST_2Response {
    /** 响应数据 */
    data?: BasePaginationRspIdentityResponseDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/organization/modify_status
 * method post
 */
export interface ChangeStatusUsingPOSTRequest {
    /** 机构编码 */
    code: string
    /** 状态 0正常  1禁用 */
    status: string
}

/**
 * requestUrl /auth/backend/organization/modify_status
 * method post
 */
export interface ChangeStatusUsingPOSTResponse {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRspBackendOrganizationDto {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: BackendOrganizationDto
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

interface BackendOrganizationDto {
    /** 认证状态 */
    certifyStatus?: boolean
    /** 机构唯一编码 */
    code?: string
    /** 统一信用代码 */
    companyCode?: string
    /** 创建时间 */
    createdAt?: number
    /** 机构logo */
    logo?: string
    /** 机构名称 */
    name?: string
    /** 机构简称 */
    shortName?: string
    /** 站点id */
    sid?: number
    /** 站点名称 */
    siteName?: string
    /** 机构人数 */
    staffCount?: number
    /** 状态 0-正常，1-禁用 */
    status?: number
    /** 管理员编码 */
    userCode?: string
    /** 管理员姓名 */
    userName?: string
}

/**
 * requestUrl /auth/backend/organization/page
 * method post
 */
export interface PageUsingPOST_3Request {
    /** 机构名称 */
    name?: string
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
    /** 站点id */
    sid?: string
    /** 机构类型 2机构 3资源方 */
    type?: number
}

/**
 * requestUrl /auth/backend/organization/page
 * method post
 */
export interface PageUsingPOST_3Response {
    /** 响应数据 */
    data?: BasePaginationRspBackendOrganizationDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/organization/sync_org
 * method get
 */
export interface SyncOrgUsingGETResponse {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/site/check_config_exist
 * method post
 */
export interface CheckConfigExistUsingPOSTRequest {
    /** 站点id */
    sid?: number
    /** 站点配置枚举值 */
    siteConfigKeyEnum?: string
    /** 配置值 */
    value?: string
}

/**
 * requestUrl /auth/backend/site/check_config_exist
 * method post
 */
export interface CheckConfigExistUsingPOSTResponse {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/site/check_domain_repeat
 * method get
 */
export interface CheckDomainRepeatUsingGETResponse {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 站点配置信息 {
    /** 基本信息 */
    baseInfo?: 基本信息Res
    /** 辅助信息+附加信息 */
    configList?: Config
    /** 站点用户组 */
    groupList?: 用户组响应数据
    /** 站点id */
    sid?: number
}

interface 基本信息Res {
    /** 管理系统域名 */
    adminDomain?: string
    /** 别名 */
    alias: string
    /** 地区 */
    area?: number
    /**  */
    burl?: string
    /** 城市 */
    city?: number
    /** 联系人部门 */
    contactDept?: string
    /** 联系人手机 */
    contactMobile?: string
    /** 联系人 */
    contactName?: string
    /** 联系人职位 */
    contactPost?: string
    /** 课程资源中心域名 */
    courseMerchantDomain?: string
    /**  */
    domainConfig?: Record<string | number | symbol, any>
    /**  */
    domainList?: any[]
    /** 到期时间, 13位时间戳 */
    expireTime?: number
    /** 讲师中心域名 */
    lecturerDomain?: string
    /** 讲师中心移动端域名 */
    lecturerMobileDomain?: string
    /** 讲师移动端用户中心域名 */
    lecturerMobileUserDomain?: string
    /** 讲师用户中心域名 */
    lecturerUserDomain?: string
    /** 登录页URL */
    loginUrl?: string
    /** 资源方域名 */
    merchantDomain?: string
    /** 资源中台域名 */
    merchantMidDomain?: string
    /** 资源方用户中心域名 */
    merchantUserDomain?: string
    /** 中台域名 */
    midDomain?: string
    /** 中台移动端域名 */
    midMobileDomain?: string
    /** 名称 */
    name?: string
    /** 机构端域名 */
    orgDomain?: string
    /** pad域名 */
    padDomain?: string
    /** 域名 */
    pcDomain?: string
    /** 个人端域名 */
    personalDomain?: string
    /** 门户h5 URL */
    portalH5Url?: string
    /** 省份 */
    province?: number
    /** 题库资源中心域名 */
    questionMerchantDomain?: string
    /** 简称 */
    shortName?: string
    /** 签到中心域名 */
    signInDomain?: string
    /** 状态，0正常1禁用 */
    status?: number
    /** 移动端域名 */
    wapDomain?: string
    /** 移动端登录页URL */
    wapLoginUrl?: string
}

interface Config {
    /** 描述 */
    description: string
    /** 配置key */
    key: string
    /** 配置值 */
    value: string
}

interface 用户组响应数据 {
    /** 描述 */
    description?: string
    /** id */
    id?: number
    /** 名称 */
    name?: string
    /** 站点id */
    sid?: number
    /** 类型  1个人 2机构 3资源方 */
    type?: number
    /** 跳转业务线url */
    url?: string
}

/**
 * requestUrl /auth/backend/site/config
 * method get
 */
export interface ConfigUsingGETResponse {
    /** 响应数据 */
    data?: 站点配置信息
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/site/config_by_domain
 * method get
 */
export interface ConfigByDomainUsingGETResponse {
    /** 响应数据 */
    data?: 站点配置信息
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BackendSiteDetailDtoRes {
    /** 基本信息 */
    baseInfo: 基本信息Res
    /** 辅助信息+附加信息 */
    configList: Config
    /** 一级模块, 已开启的模块 */
    moduleList?: PlatformModuleRes
    /** 站点id，新增值为空，修改值不为空 */
    sid?: number
}

interface PlatformModuleRes {
    /** 别名 */
    alias?: string
    /** id */
    id: number
    /** 名称 */
    name?: string
    /** 产品线 */
    type?: number
    /**  */
    typeDesc?: string
}

/**
 * requestUrl /auth/backend/site/detail/{sid}
 * method get
 */
export interface DetailUsingGET_1Response {
    /** 响应数据 */
    data?: BackendSiteDetailDtoRes
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/site/detail_by_domain
 * method get
 */
export interface DetailByDomainUsingGETResponse {
    /** 响应数据 */
    data?: 站点配置信息
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/site/detail_by_pad_domain
 * method get
 */
export interface DetailByPadDomainUsingGETResponse {
    /** 响应数据 */
    data?: 站点配置信息
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/site/flushGroupType
 * method get
 */
export interface FlushGroupTypeUsingGETResponse {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/site/import
 * method post
 */
export interface ImportFileUsingPOSTRequest {
    /** 部门编码 */
    departmentCode?: string
    /** 文件名称 */
    fileName?: string
    /** 文件地址 */
    fileUrl?: string
    /** 机构编码 */
    organizationCode: string
    /** 导出筛选参数 json */
    param?: string
    /** 批量操作类型1机构成员导入 2批量删除 3试题导入 4导出订单报表 5导出订单商品报表 6导出售后单 7标签关联职业 8导入站点职业 */
    type: number
}

/**
 * requestUrl /auth/backend/site/import
 * method post
 */
export interface ImportFileUsingPOSTResponse {
    /** 响应数据 */
    data?: string
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BatchDetailDto {
    /** 编码 */
    code?: string
    /** 错误文件 */
    errorFileUrl?: string
    /** 错误信息列表 */
    errorList?: BatchErrorInfoDto
    /** 失败条数 */
    failCount?: number
    /** 进度百分比  已*100 */
    rate?: number
    /** 状态完成后 0存在错误(展示下载结果) 1全部成功 */
    showStatus?: number
    /** 状态 0未进行 1进行中 2已完成 3导入失败 */
    status?: number
    /** 总条数 */
    totalCount?: number
    /** 类型名称 */
    type?: number
    /** 类型 */
    typeName?: string
}

interface BatchErrorInfoDto {
    /** 内容 */
    content?: string
    /** 行数 */
    line?: number
    /** 错误原因 */
    reason?: string
}

/**
 * requestUrl /auth/backend/site/import_detail/{code}
 * method get
 */
export interface ImportFileUsingGETResponse {
    /** 响应数据 */
    data?: BatchDetailDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 站点保存请求体 {
    /** 管理系统域名 */
    adminDomain?: string
    /** 别名 */
    alias: string
    /** 地区 */
    area?: number
    /**  */
    burl?: string
    /** 城市 */
    city?: number
    /** 联系人部门 */
    contactDept?: string
    /** 联系人手机 */
    contactMobile?: string
    /** 联系人 */
    contactName?: string
    /** 联系人职位 */
    contactPost?: string
    /** 到期时间, 13位时间戳 */
    expireTime?: number
    /** 登录页URL */
    loginUrl?: string
    /** 资源方域名 */
    merchantDomain?: string
    /** 中台域名 */
    midDomain?: string
    /** 名称 */
    name?: string
    /** pad域名 */
    padDomain?: string
    /** 域名 */
    pcDomain?: string
    /** 门户h5 URL */
    portalH5Url?: string
    /** 省份 */
    province?: number
    /** 简称 */
    shortName?: string
    /** 站点id，新增值为空，修改值不为空 */
    sid?: number
    /** 签到中心域名 */
    signInDomain?: string
    /** 状态，0正常1禁用 */
    status?: number
    /** 移动端域名 */
    wapDomain?: string
    /** 移动端登录页URL */
    wapLoginUrl?: string
}

/**
 * requestUrl /auth/backend/site/info/{sid}
 * method get
 */
export interface GetSiteBySidUsingGETResponse {
    /** 响应数据 */
    data?: 站点保存请求体
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/site/modify_status/{sid}/{status}
 * method post
 */
export interface ModifyStatusUsingPOST_1Response {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 站点模块数据 {
    /** 别名 */
    alias?: string
    /** id */
    id?: number
    /** 身份id */
    identity?: number
    /** 类型 0定制 1角色通用  2身份通用 */
    isBase?: number
    /** 1用户模块 2机构模块  3资源方模块 */
    moduleType?: number
    /** 名称 */
    name?: string
    /** 排序 */
    sort?: number
    /** 类型，1平台2职培3考评4创培5就业 */
    type?: number
    /** 类型描述 */
    typeDesc?: string
}

/**
 * requestUrl /auth/backend/site/modules
 * method get
 */
export interface ModulesUsingGETResponse {
    /** 响应数据 */
    data?: 站点模块数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 站点名称响应体 {
    /** id */
    id?: number
    /** 名称 */
    name?: string
}

/**
 * requestUrl /auth/backend/site/name_list_by_tag
 * method post
 */
export interface GetSiteNameListByTagUsingPOSTRequest {
    /** 名称 */
    name?: string
    /** 涉及业务线列表 创培-1，职培-2，考评-5，就业-11 */
    tagIdList: any[]
}

/**
 * requestUrl /auth/backend/site/name_list_by_tag
 * method post
 */
export interface GetSiteNameListByTagUsingPOSTResponse {
    /** 响应数据 */
    data?: 站点名称响应体
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRsp站点名称响应体 {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: 站点名称响应体
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

/**
 * requestUrl /auth/backend/site/name_page
 * method post
 */
export interface ListUsingPOSTRequest {
    /** 别名 */
    alias?: string
    /** 名称 */
    name?: string
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
    /** 域名 */
    pcDomain?: string
    /** 涉及业务线列表 创培-1，职培-2，院校-3，考评-5 */
    tagIdList?: any[]
}

/**
 * requestUrl /auth/backend/site/name_page
 * method post
 */
export interface ListUsingPOSTResponse {
    /** 响应数据 */
    data?: BasePaginationRsp站点名称响应体
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRspBackendSitePageDto {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: BackendSitePageDto
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

interface BackendSitePageDto {
    /** 别名 */
    alias?: string
    /** 创建时间 */
    createdAt?: number
    /** 到期时间 */
    expireTime?: number
    /** id */
    id?: number
    /** 一级模块 */
    moduleNameList?: Module
    /** 名称 */
    name?: string
    /** 域名 */
    pcDomain?: string
    /** 状态，0正常1禁用 */
    status?: number
}

interface Module {
    /**  */
    name?: string
    /**  */
    type?: number
    /**  */
    typeDesc?: string
}

/**
 * requestUrl /auth/backend/site/page
 * method post
 */
export interface PageUsingPOST_4Request {
    /** 别名 */
    alias?: string
    /** 名称 */
    name?: string
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
    /** 域名 */
    pcDomain?: string
    /** 涉及业务线列表 创培-1，职培-2，院校-3，考评-5 */
    tagIdList?: any[]
}

/**
 * requestUrl /auth/backend/site/page
 * method post
 */
export interface PageUsingPOST_4Response {
    /** 响应数据 */
    data?: BasePaginationRspBackendSitePageDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 基本信息Req {
    /** 管理系统域名 */
    adminDomain?: string
    /** 别名 */
    alias: string
    /** 地区 */
    area?: number
    /**  */
    burl?: string
    /** 城市 */
    city?: number
    /** 联系人部门 */
    contactDept?: string
    /** 联系人手机 */
    contactMobile?: string
    /** 联系人 */
    contactName?: string
    /** 联系人职位 */
    contactPost?: string
    /** 课程资源中心域名 */
    courseMerchantDomain?: string
    /**  */
    domainByConfig?: Record<string | number | symbol, any>
    /** 到期时间, 13位时间戳 */
    expireTime?: number
    /** 讲师中心域名 */
    lecturerDomain?: string
    /** 讲师中心移动端域名 */
    lecturerMobileDomain?: string
    /** 讲师移动端用户中心域名 */
    lecturerMobileUserDomain?: string
    /** 讲师用户中心域名 */
    lecturerUserDomain?: string
    /** 登录页URL */
    loginUrl?: string
    /** 资源方域名 */
    merchantDomain?: string
    /** 资源中台域名 */
    merchantMidDomain?: string
    /** 资源方用户中心域名 */
    merchantUserDomain?: string
    /** 中台域名 */
    midDomain?: string
    /** 中台移动端域名 */
    midMobileDomain?: string
    /** 名称 */
    name?: string
    /** 机构端域名 */
    orgDomain?: string
    /** pad域名 */
    padDomain?: string
    /** 域名 */
    pcDomain?: string
    /** 个人端域名 */
    personalDomain?: string
    /** 门户h5 URL */
    portalH5Url?: string
    /** 省份 */
    province?: number
    /** 题库资源中心域名 */
    questionMerchantDomain?: string
    /** 简称 */
    shortName?: string
    /** 签到中心域名 */
    signInDomain?: string
    /** 状态，0正常1禁用 */
    status?: number
    /** 移动端域名 */
    wapDomain?: string
    /** 移动端登录页URL */
    wapLoginUrl?: string
}

interface PlatformModuleReq {
    /** 别名 */
    alias?: string
    /** id */
    id: number
    /** 名称 */
    name?: string
    /** 产品线 */
    type?: number
}

/**
 * requestUrl /auth/backend/site/save
 * method post
 */
export interface SaveUsingPOSTRequest {
    /** 基本信息 */
    baseInfo: 基本信息Req
    /** 辅助信息+附加信息 */
    configList: Config
    /** 一级模块, 已开启的模块 */
    moduleList?: PlatformModuleReq
    /** 站点id，新增值为空，修改值不为空 */
    sid?: number
}

/**
 * requestUrl /auth/backend/site/save
 * method post
 */
export interface SaveUsingPOSTResponse {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 站点基本信息列表 {
    /** 别名 */
    alias?: string
    /** 辅助信息+附加信息 */
    configList?: Config
    /** 站点id */
    id?: number
    /** 站点名称 */
    name?: string
    /** 门户h5 URL */
    portalH5Url?: string
    /** 站点简称 */
    shortName?: string
    /** 移动端域名 */
    wapDomain?: string
}

/**
 * requestUrl /auth/backend/site/site_list
 * method post
 */
export interface SiteListUsingPOSTRequest {
    /** 站点id */
    idList: any[]
}

/**
 * requestUrl /auth/backend/site/site_list
 * method post
 */
export interface SiteListUsingPOSTResponse {
    /** 响应数据 */
    data?: 站点基本信息列表
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/site/syncSiteHistory
 * method post
 */
export interface SyncSiteHistoryUsingPOSTResponse {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/site/syncSiteSetteType
 * method post
 */
export interface SetDefaultSiteSettleTypeUsingPOSTResponse {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BackendSiteStepDetailDto {
    /** 基本信息 */
    baseInfo?: BaseInfo
    /** 业务线是否开通列表 */
    businessOpenList?: any[]
    /** 域名 + 创培 + 职培 + 考评 + 辅助信息 + 附加信息 + 功能配置 */
    configList?: Config
    /** 配置步骤: baseInfo-基础信息;domainInfo-域名信息;auxiliary-辅助信息;additional-附加信息;platform-平台信息;train-创培;career-职培;exam-考评;school-院校 */
    configStep: string
    /** 必填内容缺失步骤列表 */
    contentMissingList?: any[]
    /** 一级模块, 已开启的模块 */
    moduleList?: PlatformModule
    /** 站点id，新增值为空，修改值不为空 */
    sid?: number
}

interface BaseInfo {
    /** 别名 */
    alias: string
    /** 地区 */
    area?: number
    /** 城市 */
    city?: number
    /** 联系人部门 */
    contactDept?: string
    /** 联系人手机 */
    contactMobile?: string
    /** 联系人 */
    contactName?: string
    /** 联系人职位 */
    contactPost?: string
    /** 到期时间, 13位时间戳 */
    expireTime?: number
    /** 名称 */
    name: string
    /** 省份 */
    province?: number
    /** 简称 */
    shortName?: string
    /** 涉及业务线列表 创培-1，职培-2，院校-3，考评-5 */
    tagIdList?: any[]
}

interface PlatformModule {
    /** 别名 */
    alias?: string
    /** id */
    id: number
    /** 名称 */
    name?: string
    /** 产品线 */
    type?: number
}

/**
 * requestUrl /auth/backend/site/v2/detail
 * method post
 */
export interface ConfigDetailUsingPOSTRequest {
    /** 配置类型:domainInfo-域名信息;auxiliary-辅助信息;additional-附加信息;platform-平台信息;train-创培;career-职培;exam-考评;school-院校 */
    configType?: string
    /** 站点id */
    sid: number
}

/**
 * requestUrl /auth/backend/site/v2/detail
 * method post
 */
export interface ConfigDetailUsingPOSTResponse {
    /** 响应数据 */
    data?: BackendSiteStepDetailDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BackendSiteDetailResponseDto {
    /** 基本信息 */
    baseInfo?: BaseInfo
    /** 域名 + 创培 + 职培 + 考评 + 辅助信息 + 附加信息 + 功能配置 */
    configList?: Config
    /** 站点用户组 */
    groupList?: 用户组响应数据
    /** 站点id */
    sid?: number
}

/**
 * requestUrl /auth/backend/site/v2/detail_by_domain
 * method post
 */
export interface DetailByDomainUsingPOSTRequest {
    /** 配置类型列表:baseInfo-基本信息:domainInfo-域名信息;auxiliary-辅助信息;additional-附加信息;platform-平台信息;train-创培;career-职培;exam-考评;school-院校 */
    configTypeList: any[]
    /** 域名 */
    domain: string
    /** 是否需要用户组信息 */
    needUserGroup?: boolean
    /** 站点id */
    sid?: number
}

/**
 * requestUrl /auth/backend/site/v2/detail_by_domain
 * method post
 */
export interface DetailByDomainUsingPOSTResponse {
    /** 响应数据 */
    data?: BackendSiteDetailResponseDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/site/v2/handle_site_domain_config
 * method get
 */
export interface HandleSiteDomainConfigUsingGETResponse {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/site/v2/save
 * method post
 */
export interface SiteSaveUsingPOSTRequest {
    /** 基本信息 */
    baseInfo?: BaseInfo
    /** 业务线是否开通列表 */
    businessOpenList?: any[]
    /** 域名 + 创培 + 职培 + 考评 + 辅助信息 + 附加信息 + 功能配置 */
    configList?: Config
    /** 配置步骤: baseInfo-基础信息;domainInfo-域名信息;auxiliary-辅助信息;additional-附加信息;platform-平台信息;train-创培;career-职培;exam-考评;school-院校 */
    configStep: string
    /** 必填内容缺失步骤列表 */
    contentMissingList?: any[]
    /** 一级模块, 已开启的模块 */
    moduleList?: PlatformModuleReq
    /** 站点id，新增值为空，修改值不为空 */
    sid?: number
}

/**
 * requestUrl /auth/backend/site/v2/save
 * method post
 */
export interface SiteSaveUsingPOSTResponse {
    /** 响应数据 */
    data?: number
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/site/validate
 * method post
 */
export interface ValidateVerifyCodeUsingPOSTRequest {
    /** 手机号或者email */
    account?: string
    /** 随机key，同一生命周期key不变 */
    key?: string
    /** 验证码 */
    verifyCode?: string
}

/**
 * requestUrl /auth/backend/site/validate
 * method post
 */
export interface ValidateVerifyCodeUsingPOSTResponse {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/site/verify_send
 * method post
 */
export interface SendVerifyCodeUsingPOSTRequest {
    /** 手机号或者email */
    account?: string
    /** 随机key，同一生命周期key不变 */
    key?: string
    /** 站点id，找回密码时必传 */
    sid?: number
    /** 短信类型 0通用  1机构创建 5找回密码 */
    type?: number
}

/**
 * requestUrl /auth/backend/site/verify_send
 * method post
 */
export interface SendVerifyCodeUsingPOSTResponse {
    /** 响应数据 */
    data?: string
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/site_module/delete_site_module/{id}
 * method get
 */
export interface DeleteSiteModuleUsingGETResponse {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/site_module/save_site_module
 * method post
 */
export interface SaveSiteModuleUsingPOSTRequest {
    /** 别名 */
    alias?: string
    /** id */
    id?: number
    /** 身份 */
    identity?: number
    /** 类型 0定制 1角色通用  2身份通用 */
    isBase: number
    /** 角色 1个人 2机构 3资源方  */
    moduleType?: number
    /** 名称 */
    name: string
    /** 业务线 */
    type: number
}

/**
 * requestUrl /auth/backend/site_module/save_site_module
 * method post
 */
export interface SaveSiteModuleUsingPOSTResponse {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRspBackendSiteModulePageDto {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: BackendSiteModulePageDto
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

interface BackendSiteModulePageDto {
    /** 别名 */
    alias?: string
    /** id */
    id?: number
    /** 身份 */
    identity?: number
    /** 身份名称 */
    identityName?: string
    /** 类型 0定制 1角色通用  2身份通用 */
    isBase?: number
    /** 角色 1个人 2机构 3资源方  */
    moduleType?: number
    /** 名称 */
    name?: string
    /** 业务线 */
    type?: number
    /** 业务线名称 */
    typeName?: string
}

/**
 * requestUrl /auth/backend/site_module/sit_module_page
 * method post
 */
export interface SiteModulePageUsingPOSTRequest {
    /** 别名 */
    alias?: string
    /** id */
    id?: number
    /** 身份 */
    identity?: number
    /** 类型 0定制 1角色通用  2身份通用 */
    isBase?: number
    /** 角色 1个人 2机构 3资源方  */
    moduleType?: number
    /** 名称 */
    name?: string
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
    /** 业务线 */
    type?: number
}

/**
 * requestUrl /auth/backend/site_module/sit_module_page
 * method post
 */
export interface SiteModulePageUsingPOSTResponse {
    /** 响应数据 */
    data?: BasePaginationRspBackendSiteModulePageDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/site_module/site_module_detail/{id}
 * method get
 */
export interface SiteModuleDetailUsingGETResponse {
    /** 响应数据 */
    data?: BackendSiteModulePageDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BackendSiteModuleGroupDto {
    /** 角色模块列表 */
    groupModuleList?: GroupModuleDto
    /** 业务线id */
    id?: number
    /** 业务线名称 */
    name?: string
}

interface GroupModuleDto {
    /** 角色名称 */
    name?: string
    /** 模块数据  */
    typeModuleList?: TypeModuleListDto
}

interface TypeModuleListDto {
    /** 类型名称 */
    moduleList?: 站点模块子数据
    /** 类型名称 */
    name?: string
    /**  0定制 1角色通用  2身份通用 */
    type?: number
}

interface 站点模块子数据 {
    /** 是否拥有 */
    has?: boolean
    /** id */
    id?: number
    /** 身份id */
    identity?: number
    /** 名称 */
    name?: string
}

/**
 * requestUrl /auth/backend/site_module/site_module_list/{sid}
 * method get
 */
export interface GetSiteModuleListUsingGETResponse {
    /** 响应数据 */
    data?: BackendSiteModuleGroupDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface UserAppTokenRespDto {
    /**  */
    key?: string
    /**  */
    secret?: string
    /**  */
    sid?: number
}

/**
 * requestUrl /auth/backend/app_token/bind
 * method post
 */
export interface BindUsingPOSTRequest {
    /** AppKey，可选(sm3加密后16进制字符串)，空则随机生成 */
    key?: string
    /** AppSecret，可选(sm3加密后16进制字符串)，空则随机生成 */
    secret?: string
    /** 站点id */
    sid?: number
    /** 用户编码 */
    userCode: string
}

/**
 * requestUrl /auth/backend/app_token/bind
 * method post
 */
export interface BindUsingPOSTResponse {
    /** 响应数据 */
    data?: UserAppTokenRespDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/batch_operate/create_task
 * method post
 */
export interface CreateImportTaskUsingPOSTRequest {
    /** 部门编码 */
    departmentCode?: string
    /** 文件名称 */
    fileName?: string
    /** 文件地址 */
    fileUrl?: string
    /** 机构编码 */
    organizationCode: string
    /** 导出筛选参数 json */
    param?: string
    /** 批量操作类型1机构成员导入 2批量删除 3试题导入 4导出订单报表 5导出订单商品报表 6导出售后单 7标签关联职业 8导入站点职业 */
    type: number
}

/**
 * requestUrl /auth/batch_operate/create_task
 * method post
 */
export interface CreateImportTaskUsingPOSTResponse {
    /** 响应数据 */
    data?: string
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/batch_operate/detail/{code}
 * method get
 */
export interface ImportFileUsingGET_1Response {
    /** 响应数据 */
    data?: BatchDetailDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRsp批量操作请求数据 {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: 批量操作请求数据Res
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

interface 批量操作请求数据Res {
    /** 编码 */
    code?: string
    /** 操作时间 */
    createdAt?: number
    /** 错误文件地址 */
    errorFileUrl?: string
    /** 失败数量 */
    failCount?: number
    /** 文件名称 */
    fileName?: string
    /** 文件地址 */
    fileUrl?: string
    /** 错误信息 */
    info?: string
    /** 操作进度 */
    rate?: number
    /** 状态完成后 0存在错误(展示下载结果) 1全部成功 */
    showStatus?: number
    /** 状态 0未进行 1进行中 2已完成 */
    status?: number
    /** 全部数量 */
    totalCount?: number
    /** 类型名称 */
    type?: number
    /** 类型 */
    typeName?: string
}

/**
 * requestUrl /auth/batch_operate/import_list
 * method post
 */
export interface ImportPageUsingPOSTRequest {
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 机构编码 */
    organizationCode: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
}

/**
 * requestUrl /auth/batch_operate/import_list
 * method post
 */
export interface ImportPageUsingPOSTResponse {
    /** 响应数据 */
    data?: BasePaginationRsp批量操作请求数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/batch_operate/start/{code}
 * method get
 */
export interface StartImportTaskUsingGETResponse {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/batch_operate/update_task
 * method post
 */
export interface UpdateImportTaskUsingPOSTRequest {
    /** 编码 */
    code: string
    /** 错误文件地址 */
    errorFileUrl?: string
    /** 错误信息列表 */
    errorInfo?: string
    /** 失败条数 */
    failCount?: number
    /** 文件名 */
    fileName?: string
    /** 文件地址 */
    fileUrl?: string
    /** 进度 */
    rate?: number
    /** 站点id */
    sid?: number
    /** 状态 0未进行 1进行中 2已完成 */
    status?: number
    /** 总条数 */
    totalCount?: number
}

/**
 * requestUrl /auth/batch_operate/update_task
 * method post
 */
export interface UpdateImportTaskUsingPOSTResponse {
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/captcha/captcha.jpeg
 * method get
 */
export interface CaptchaUsingGETResponse {}

/**
 * requestUrl /auth/captcha/validate
 * method post
 */
export interface ValidateCaptchaUsingPOSTRequest {
    /** 图片验证码key */
    key: string
    /** 图片验证码序列号，同一生命周期，每次刷新验证码+1 */
    seq: number
    /** 图片验证码 */
    text: string
}

/**
 * requestUrl /auth/captcha/validate
 * method post
 */
export interface ValidateCaptchaUsingPOSTResponse {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/company_credit/add
 * method post
 */
export interface AddUsingPOSTRequest {
    /** 地址 */
    address?: string
    /** 工商信用代码 */
    companyCode: string
    /** 法人 */
    legalName?: string
    /** 企业名称 */
    name: string
    /** 注册资金 */
    registerMoney?: string
    /** 状态 success 成功 其他为失败 */
    result?: string
}

/**
 * requestUrl /auth/backend/company_credit/add
 * method post
 */
export interface AddUsingPOSTResponse {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/company_credit/change_status
 * method post
 */
export interface PageUsingPOST_5Request {
    /** 信息库编码 */
    code: string
    /** 状态 0成功  1失败 */
    status: number
}

/**
 * requestUrl /auth/backend/company_credit/change_status
 * method post
 */
export interface PageUsingPOST_5Response {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/company_credit/delete_php
 * method post
 */
export interface DeletePHPUsingPOSTRequest {
    /** 工商信用代码 */
    companyCode: string
    /** 企业名称 */
    name: string
}

/**
 * requestUrl /auth/backend/company_credit/delete_php
 * method post
 */
export interface DeletePHPUsingPOSTResponse {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/company_credit/edit_php
 * method post
 */
export interface EditPHPUsingPOSTRequest {
    /** 地址 */
    address?: string
    /** 编码 */
    code: string
    /** 工商信用代码 */
    companyCode: string
    /** 法人 */
    legalName?: string
    /** 企业名称 */
    name: string
    /** 注册资金 */
    registerMoney?: string
    /** 状态 success 成功 其他为失败 */
    result?: string
}

/**
 * requestUrl /auth/backend/company_credit/edit_php
 * method post
 */
export interface EditPHPUsingPOSTResponse {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 工商信息库返回数据 {
    /** 地址 */
    address?: string
    /** 信息库编码 */
    code?: string
    /** 工商信用代码 */
    companyCode?: string
    /** 法人 */
    legalName?: string
    /** 企业名称 */
    name?: string
    /** 注册资金 */
    registerMoney?: string
    /** 状态 success 成功 其他为失败 */
    result?: string
}

/**
 * requestUrl /auth/backend/company_credit/info_php
 * method post
 */
export interface GetIdCardInfoUsingPOSTRequest {
    /** 工商信用代码 */
    companyCode: string
    /** 企业名称 */
    name: string
}

/**
 * requestUrl /auth/backend/company_credit/info_php
 * method post
 */
export interface GetIdCardInfoUsingPOSTResponse {
    /** 响应数据 */
    data?: 工商信息库返回数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRsp工商信息库返回数据 {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: 工商信息库返回数据
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

/**
 * requestUrl /auth/backend/company_credit/page
 * method post
 */
export interface PageUsingPOST_6Request {
    /** 信用代码 */
    companyCode?: string
    /** 法人姓名 */
    legalName?: string
    /** 公司名称 */
    name?: string
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
}

/**
 * requestUrl /auth/backend/company_credit/page
 * method post
 */
export interface PageUsingPOST_6Response {
    /** 响应数据 */
    data?: BasePaginationRsp工商信息库返回数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/certificate/add
 * method post
 */
export interface AddUsingPOST_1Request {
    /** 地址 */
    address?: string
    /** 出生日期 */
    birthday?: number
    /** 证件类型，1身份证，2护照，3其他 */
    certificateType?: number
    /** 身份证有效期 */
    expiredTime?: number
    /** 证件号码 */
    idCard: string
    /** 姓名 */
    name: string
    /** 结果 默认 验证成功 */
    result?: string
    /** 状态 0 成功 -1失败 */
    resultCode?: number
    /** 性别 1男2女 */
    sex?: number
    /** 类型 1系统判定 2人工判定 */
    type?: number
}

/**
 * requestUrl /auth/backend/certificate/add
 * method post
 */
export interface AddUsingPOST_1Response {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/certificate/audit_pass
 * method post
 */
export interface AuditPassUsingPOSTRequest {
    /** 信息库编码 */
    code: string
}

/**
 * requestUrl /auth/backend/certificate/audit_pass
 * method post
 */
export interface AuditPassUsingPOSTResponse {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/certificate/audit_reject
 * method post
 */
export interface AuditRejectUsingPOSTRequest {
    /** 信息库编码 */
    code: string
}

/**
 * requestUrl /auth/backend/certificate/audit_reject
 * method post
 */
export interface AuditRejectUsingPOSTResponse {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/certificate/change_status
 * method post
 */
export interface ChangeStatusUsingPOST_1Request {
    /** 信息库编码 */
    code: string
    /** 状态 0成功  -1失败 */
    status: number
}

/**
 * requestUrl /auth/backend/certificate/change_status
 * method post
 */
export interface ChangeStatusUsingPOST_1Response {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/certificate/delete_php
 * method post
 */
export interface DeletePHPUsingPOST_1Request {
    /** 身份证号 */
    idCard: string
    /** 姓名 */
    name: string
}

/**
 * requestUrl /auth/backend/certificate/delete_php
 * method post
 */
export interface DeletePHPUsingPOST_1Response {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/certificate/edit
 * method post
 */
export interface EditUsingPOST_1Request {
    /** 地址 */
    address?: string
    /** 出生日期 */
    birthday?: number
    /** 证件类型，1身份证，2护照，3其他 */
    certificateType?: number
    /** 实名信息库编码 */
    code?: string
    /** 身份证有效期 */
    expiredTime?: number
    /** 证件号码8-25位 */
    idCard: string
    /** 姓名 */
    name: string
    /** 结果 默认 验证成功 */
    result?: string
    /** 状态 0 成功 -1失败 */
    resultCode?: number
    /** 性别 1男2女 */
    sex?: number
    /** 类型 1系统判定 2人工判定 */
    type?: number
}

/**
 * requestUrl /auth/backend/certificate/edit
 * method post
 */
export interface EditUsingPOST_1Response {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/certificate/edit_php
 * method post
 */
export interface EditUsingPOST_2Request {
    /** 地址 */
    address?: string
    /** 出生日期 */
    birthday?: number
    /** 证件类型，1身份证，2护照，3其他 */
    certificateType?: number
    /** 实名信息库编码 */
    code?: string
    /** 身份证有效期 */
    expiredTime?: number
    /** 证件号码8-25位 */
    idCard: string
    /** 姓名 */
    name: string
    /** 结果 默认 验证成功 */
    result?: string
    /** 状态 0 成功 -1失败 */
    resultCode?: number
    /** 性别 1男2女 */
    sex?: number
    /** 类型 1系统判定 2人工判定 */
    type?: number
}

/**
 * requestUrl /auth/backend/certificate/edit_php
 * method post
 */
export interface EditUsingPOST_2Response {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 实名信息库返回数据 {
    /** 地址 */
    address?: string
    /** 出生日期 */
    birthday?: number
    /** 证件类型，1身份证，2护照，3其他 */
    certificateType?: number
    /** 信息库编码 */
    code?: string
    /** 身份证有效期 */
    expiredTime?: number
    /** 身份证号 */
    idCard?: string
    /** 身份证正面或护照附件 */
    idcardFront?: string
    /** 姓名 */
    name?: string
    /** 补充说明 */
    remark?: string
    /** 结果 */
    result?: string
    /** 状态 0 成功 -1失败 */
    resultCode?: number
    /** 性别 1男2女 */
    sex?: number
    /** 审批状态,0待审核；1已通过；2未通过 */
    status?: number
}

/**
 * requestUrl /auth/backend/certificate/info_php
 * method post
 */
export interface GetIdCardInfoUsingPOST_1Request {
    /** 身份证号 */
    idCard: string
    /** 姓名 */
    name: string
}

/**
 * requestUrl /auth/backend/certificate/info_php
 * method post
 */
export interface GetIdCardInfoUsingPOST_1Response {
    /** 响应数据 */
    data?: 实名信息库返回数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRsp实名信息库返回数据 {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: 实名信息库返回数据
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

/**
 * requestUrl /auth/backend/certificate/page
 * method post
 */
export interface PageUsingPOST_7Request {
    /** 申请日期 */
    applyTime?: number
    /** 证件类型，1身份证，2护照，3其他 */
    certificateType?: number
    /** 身份证号 */
    idCard?: string
    /** 姓名 */
    name?: string
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
    /** 审批状态,0待审核；1已通过；2未通过 */
    status?: number
}

/**
 * requestUrl /auth/backend/certificate/page
 * method post
 */
export interface PageUsingPOST_7Response {
    /** 响应数据 */
    data?: BasePaginationRsp实名信息库返回数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRsp实名信息库审核数据 {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: 实名信息库审核数据
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

interface 实名信息库审核数据 {
    /** 申请日期 */
    applyTime?: string
    /** 证件照片 */
    certificateImage?: string
    /** 护照/其他证件号码 */
    certificateNo?: string
    /** 证件类型，2护照，3其他 */
    certificateType?: number
    /** 编码 */
    code?: string
    /** 姓名 */
    name?: string
    /** 补充说明 */
    remark?: string
    /** 站点 */
    sid?: number
    /** 站点名称 */
    siteName?: string
    /** 审批状态,0待审核；1已通过；2未通过 */
    status?: number
    /** 用户唯一编码 */
    userCode?: string
}

/**
 * requestUrl /auth/backend/certificate/page_audit
 * method post
 */
export interface PageAuditUsingPOSTRequest {
    /** 申请日期 */
    applyTime?: number
    /** 证件号码 */
    certificateNo?: string
    /** 证件类型，1身份证，2护照，3其他 */
    certificateType?: number
    /** 姓名 */
    name?: string
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
    /** 站点 */
    sid?: number
    /** 审批状态,0待审核；1已通过；2未通过 */
    status?: number
}

/**
 * requestUrl /auth/backend/certificate/page_audit
 * method post
 */
export interface PageAuditUsingPOSTResponse {
    /** 响应数据 */
    data?: BasePaginationRsp实名信息库审核数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/id_card/add
 * method post
 */
export interface AddUsingPOST_2Request {
    /** 地址 */
    address?: string
    /** 出生日期 */
    birthday?: number
    /** 证件类型，1身份证，2护照，3其他 */
    certificateType?: number
    /** 身份证有效期 */
    expiredTime?: number
    /** 证件号码 */
    idCard: string
    /** 姓名 */
    name: string
    /** 结果 默认 验证成功 */
    result?: string
    /** 状态 0 成功 -1失败 */
    resultCode?: number
    /** 性别 1男2女 */
    sex?: number
    /** 类型 1系统判定 2人工判定 */
    type?: number
}

/**
 * requestUrl /auth/backend/id_card/add
 * method post
 */
export interface AddUsingPOST_2Response {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/id_card/audit_pass
 * method post
 */
export interface AuditPassUsingPOST_1Request {
    /** 信息库编码 */
    code: string
}

/**
 * requestUrl /auth/backend/id_card/audit_pass
 * method post
 */
export interface AuditPassUsingPOST_1Response {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/id_card/audit_reject
 * method post
 */
export interface AuditRejectUsingPOST_1Request {
    /** 信息库编码 */
    code: string
}

/**
 * requestUrl /auth/backend/id_card/audit_reject
 * method post
 */
export interface AuditRejectUsingPOST_1Response {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/id_card/change_status
 * method post
 */
export interface ChangeStatusUsingPOST_2Request {
    /** 信息库编码 */
    code: string
    /** 状态 0成功  -1失败 */
    status: number
}

/**
 * requestUrl /auth/backend/id_card/change_status
 * method post
 */
export interface ChangeStatusUsingPOST_2Response {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/id_card/delete_php
 * method post
 */
export interface DeletePHPUsingPOST_2Request {
    /** 身份证号 */
    idCard: string
    /** 姓名 */
    name: string
}

/**
 * requestUrl /auth/backend/id_card/delete_php
 * method post
 */
export interface DeletePHPUsingPOST_2Response {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/id_card/edit
 * method post
 */
export interface EditUsingPOST_3Request {
    /** 地址 */
    address?: string
    /** 出生日期 */
    birthday?: number
    /** 证件类型，1身份证，2护照，3其他 */
    certificateType?: number
    /** 实名信息库编码 */
    code?: string
    /** 身份证有效期 */
    expiredTime?: number
    /** 证件号码8-25位 */
    idCard: string
    /** 姓名 */
    name: string
    /** 结果 默认 验证成功 */
    result?: string
    /** 状态 0 成功 -1失败 */
    resultCode?: number
    /** 性别 1男2女 */
    sex?: number
    /** 类型 1系统判定 2人工判定 */
    type?: number
}

/**
 * requestUrl /auth/backend/id_card/edit
 * method post
 */
export interface EditUsingPOST_3Response {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/id_card/edit_php
 * method post
 */
export interface EditUsingPOST_4Request {
    /** 地址 */
    address?: string
    /** 出生日期 */
    birthday?: number
    /** 证件类型，1身份证，2护照，3其他 */
    certificateType?: number
    /** 实名信息库编码 */
    code?: string
    /** 身份证有效期 */
    expiredTime?: number
    /** 证件号码8-25位 */
    idCard: string
    /** 姓名 */
    name: string
    /** 结果 默认 验证成功 */
    result?: string
    /** 状态 0 成功 -1失败 */
    resultCode?: number
    /** 性别 1男2女 */
    sex?: number
    /** 类型 1系统判定 2人工判定 */
    type?: number
}

/**
 * requestUrl /auth/backend/id_card/edit_php
 * method post
 */
export interface EditUsingPOST_4Response {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/id_card/info_php
 * method post
 */
export interface GetIdCardInfoUsingPOST_2Request {
    /** 身份证号 */
    idCard: string
    /** 姓名 */
    name: string
}

/**
 * requestUrl /auth/backend/id_card/info_php
 * method post
 */
export interface GetIdCardInfoUsingPOST_2Response {
    /** 响应数据 */
    data?: 实名信息库返回数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/id_card/page
 * method post
 */
export interface PageUsingPOST_8Request {
    /** 申请日期 */
    applyTime?: number
    /** 证件类型，1身份证，2护照，3其他 */
    certificateType?: number
    /** 身份证号 */
    idCard?: string
    /** 姓名 */
    name?: string
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
    /** 审批状态,0待审核；1已通过；2未通过 */
    status?: number
}

/**
 * requestUrl /auth/backend/id_card/page
 * method post
 */
export interface PageUsingPOST_8Response {
    /** 响应数据 */
    data?: BasePaginationRsp实名信息库返回数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/id_card/page_audit
 * method post
 */
export interface PageAuditUsingPOST_1Request {
    /** 申请日期 */
    applyTime?: number
    /** 证件号码 */
    certificateNo?: string
    /** 证件类型，1身份证，2护照，3其他 */
    certificateType?: number
    /** 姓名 */
    name?: string
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
    /** 站点 */
    sid?: number
    /** 审批状态,0待审核；1已通过；2未通过 */
    status?: number
}

/**
 * requestUrl /auth/backend/id_card/page_audit
 * method post
 */
export interface PageAuditUsingPOST_1Response {
    /** 响应数据 */
    data?: BasePaginationRsp实名信息库审核数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRspcms批量操作返回数据 {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: cms批量操作返回数据
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

interface cms批量操作返回数据 {
    /** 编码 */
    code?: string
    /** 操作时间 */
    createdAt?: number
    /** 操作人编码 */
    createdBy?: string
    /** 操作人姓名 */
    createdByName?: string
    /** 错误文件地址 */
    errorFileUrl?: string
    /** 失败条数 */
    failCount?: number
    /** 文件名称 */
    fileName?: string
    /** 文件地址 */
    fileUrl?: string
    /** 错误信息 */
    info?: string
    /** 操作进度 */
    rate?: number
    /** 站点id */
    sid?: number
    /** 站点名称 */
    siteName?: string
    /** 状态 0未进行 1进行中 2已完成 */
    status?: number
    /** 总数 */
    totalCount?: number
    /** 类型名称 */
    type?: number
    /** 类型 */
    typeName?: string
}

/**
 * requestUrl /auth/backend/import/page
 * method post
 */
export interface PageUsingPOST_9Request {
    /** 操作人 */
    createdByName?: string
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
    /** 站点id */
    sid?: number
    /** 操作类型 */
    type?: number
}

/**
 * requestUrl /auth/backend/import/page
 * method post
 */
export interface PageUsingPOST_9Response {
    /** 响应数据 */
    data?: BasePaginationRspcms批量操作返回数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 公共分类 {
    /** 键 */
    key?: string
    /** 值 */
    name?: string
}

/**
 * requestUrl /auth/common_data/category
 * method get
 */
export interface CategoryUsingGETResponse {
    /** 响应数据 */
    data?: 公共分类
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/common_data/category_feign/{alias}
 * method get
 */
export interface CategoryUsingGET_1Response {
    /** 响应数据 */
    data?: 公共分类
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 城市数据 {
    /** 行政编码 */
    code?: string
    /** 地区等级  1省级 2市级 3区级 4乡镇级 */
    level?: number
    /** 名称 */
    name?: string
    /** 上级编码 */
    parentCode?: number
}

/**
 * requestUrl /auth/common_data/city
 * method get
 */
export interface CityDataUsingGETResponse {
    /** 响应数据 */
    data?: 城市数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/common_data/city_list
 * method post
 */
export interface CityListUsingPOSTRequest {
    /** 城市编码 */
    codeList: any[]
}

/**
 * requestUrl /auth/common_data/city_list
 * method post
 */
export interface CityListUsingPOSTResponse {
    /** 响应数据 */
    data?: 城市数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/common_data/city_php/{parentCode}
 * method get
 */
export interface CityDataPHPUsingGETResponse {
    /** 响应数据 */
    data?: 城市数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/common_data/import_type
 * method get
 */
export interface GetImportTypeUsingGETResponse {
    /** 响应数据 */
    data?: 公共分类
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 行业数据 {
    /** 行业编码 */
    code?: string
    /** 行业id */
    id?: number
    /** 名称 */
    name?: string
    /** 上级编码 */
    parentCode?: string
}

/**
 * requestUrl /auth/common_data/industry
 * method get
 */
export interface IndustryDataUsingGETResponse {
    /** 响应数据 */
    data?: 行业数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/common_data/industry_php/{parentCode}
 * method get
 */
export interface IndustryDataPHPUsingGETResponse {
    /** 响应数据 */
    data?: 行业数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/app_token/bind_by_token
 * method post
 */
export interface BindByTokenUsingPOSTRequest {
    /** AppKey，可选(sm3加密后16进制字符串)，空则随机生成 */
    key?: string
    /** AppSecret，可选(sm3加密后16进制字符串)，空则随机生成 */
    secret?: string
}

/**
 * requestUrl /auth/app_token/bind_by_token
 * method post
 */
export interface BindByTokenUsingPOSTResponse {
    /** 响应数据 */
    data?: UserAppTokenRespDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 登录响应数据 {
    /** 访问令牌 */
    accessToken?: string
    /** 登录设备 */
    appKey?: string
    /**  */
    cloginB?: boolean
    /** 站点id */
    sid?: number
    /** 用户code */
    userCode?: string
}

/**
 * requestUrl /auth/app_token/get_token
 * method post
 */
export interface GetTokenUsingPOSTRequest {
    /** 登录设备，5：开放平台 */
    appKey: string
    /** AppKey */
    key: string
    /** AppSecret */
    secret: string
}

/**
 * requestUrl /auth/app_token/get_token
 * method post
 */
export interface GetTokenUsingPOSTResponse {
    /** 响应数据 */
    data?: 登录响应数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/group/add_group
 * method post
 */
export interface AddGroupUsingPOSTRequest {
    /** 站点id */
    sid?: number
    /** 角色 */
    type?: number
    /** 用户编码 */
    userCode?: string
}

/**
 * requestUrl /auth/group/add_group
 * method post
 */
export interface AddGroupUsingPOSTResponse {
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/hello/id/gen
 * method get
 */
export interface IdUsingGETResponse {
    /** 响应数据 */
    data?: string
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/hello/world
 * method get
 */
export interface HelloUsingGETResponse {
    /** 响应数据 */
    data?: string
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/identity/component_list
 * method get
 */
export interface GetComponentListUsingGET_1Response {
    /** 响应数据 */
    data?: IdentifyComponentDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/identity/default_component_list
 * method get
 */
export interface GetDefaultComponentListUsingGET_1Response {
    /** 响应数据 */
    data?: IdentifyDefaultComponentDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/import/import
 * method post
 */
export interface ImportFileUsingPOST_1Request {
    /** 部门编码 */
    departmentCode?: string
    /** 文件名称 */
    fileName?: string
    /** 文件地址 */
    fileUrl?: string
    /** 机构编码 */
    organizationCode: string
    /** 导出筛选参数 json */
    param?: string
    /** 批量操作类型1机构成员导入 2批量删除 3试题导入 4导出订单报表 5导出订单商品报表 6导出售后单 7标签关联职业 8导入站点职业 */
    type: number
}

/**
 * requestUrl /auth/import/import
 * method post
 */
export interface ImportFileUsingPOST_1Response {
    /** 响应数据 */
    data?: string
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/open_resource/certify_upload_info
 * method post
 */
export interface CertifyUploadInfoUsingPOSTRequest {
    /** hash */
    hash: string
    /** 文件类型 1导入机构成员 2用户头像 3合同附件 4客户附件 */
    type: number
    /** 地址 */
    url: string
    /** 用户编码 */
    userCode: string
}

/**
 * requestUrl /auth/open_resource/certify_upload_info
 * method post
 */
export interface CertifyUploadInfoUsingPOSTResponse {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface OssUrlRequestDto {
    /**  */
    url?: string
}

/**
 * requestUrl /auth/open_resource/downloadUrl
 * method post
 */
export interface GetDownLoadUrlUsingPOSTRequest {
    /**  */
    url?: string
}

/**
 * requestUrl /auth/open_resource/downloadUrl
 * method post
 */
export interface GetDownLoadUrlUsingPOSTResponse {
    /** 响应数据 */
    data?: OssUrlRequestDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface ResourceDto {
    /**  */
    ext?: string
    /**  */
    hash?: string
    /**  */
    name?: string
    /**  */
    size?: number
    /**  */
    url?: string
    /** 原图（用于图片加水印场景） */
    urlOriginal?: string
}

/**
 * requestUrl /auth/open_resource/file/upload
 * method post
 */
export interface UploadUsingPOSTRequest {}

/**
 * requestUrl /auth/open_resource/file/upload
 * method post
 */
export interface UploadUsingPOSTResponse {
    /** 响应数据 */
    data?: ResourceDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/open_resource/import
 * method post
 */
export interface ImportFileUsingPOST_2Request {
    /** 部门编码 */
    departmentCode?: string
    /** 文件名称 */
    fileName?: string
    /** 文件地址 */
    fileUrl?: string
    /** 机构编码 */
    organizationCode: string
    /** 导出筛选参数 json */
    param?: string
    /** 批量操作类型1机构成员导入 2批量删除 3试题导入 4导出订单报表 5导出订单商品报表 6导出售后单 7标签关联职业 8导入站点职业 */
    type: number
}

/**
 * requestUrl /auth/open_resource/import
 * method post
 */
export interface ImportFileUsingPOST_2Response {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/open_resource/inlineUrl
 * method post
 */
export interface GetInlineUrlUsingPOSTRequest {
    /**  */
    url?: string
}

/**
 * requestUrl /auth/open_resource/inlineUrl
 * method post
 */
export interface GetInlineUrlUsingPOSTResponse {
    /** 响应数据 */
    data?: OssUrlRequestDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/organization/add_identity
 * method post
 */
export interface AddOrganizationIdentityUsingPOSTRequest {
    /** 资源方身份id */
    identity?: number
    /** 机构编码 */
    organizationCode?: string
}

/**
 * requestUrl /auth/organization/add_identity
 * method post
 */
export interface AddOrganizationIdentityUsingPOSTResponse {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRsp员工申请加入列表分页数据 {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: 员工申请加入列表分页数据
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

interface 员工申请加入列表分页数据 {
    /** 申请编码 */
    code?: string
    /** 申请时间 */
    createdAt?: number
    /** 身份证号 */
    idCard?: string
    /** 手机号 */
    mobile?: string
    /** 申请理由 */
    reason?: string
    /** 状态 0待处理  1通过  2拒绝 */
    status?: number
    /** 姓名 */
    userName?: string
}

/**
 * requestUrl /auth/organization/apply_list
 * method post
 */
export interface OrganizationDetailUsingPOSTRequest {
    /** 部门编码 */
    departmentCode?: string
    /** 身份证号 */
    idCard?: string
    /** 手机号 */
    mobile?: string
    /** 姓名 */
    name?: string
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 机构编码 */
    organizationCode?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
}

/**
 * requestUrl /auth/organization/apply_list
 * method post
 */
export interface OrganizationDetailUsingPOSTResponse {
    /** 响应数据 */
    data?: BasePaginationRsp员工申请加入列表分页数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 判断是否二要素合规 {
    /** 信用代码 */
    creditCode?: string
    /** 企业名称 */
    customerName?: string
}

interface 批量处理结果数据 {
    /** 失败条数条数 */
    errorList?: ErrorData
    /** 失败条数条数 */
    errorNum?: number
    /** 成功条数 */
    successNum?: number
}

/**
 * requestUrl /auth/organization/batch_certify
 * method post
 */
export interface BatchCertifyUsingPOSTRequest {
    /** 工商二要素 */
    list?: 判断是否二要素合规
}

/**
 * requestUrl /auth/organization/batch_certify
 * method post
 */
export interface BatchCertifyUsingPOSTResponse {
    /** 响应数据 */
    data?: 批量处理结果数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 我的机构 {
    /** 认证状态 */
    certifyStatus?: boolean
    /** 身份 */
    identityList?: any[]
    /** 机构logo */
    logo?: string
    /** 机构名称 */
    name?: string
    /** 机构编码 */
    organizationCode?: string
    /** 机构名称 */
    organizationName?: string
    /** 机构简称 */
    shortName?: string
    /** 站点 */
    sid?: number
    /**  */
    sname?: string
    /** 角色 2机构 3资源方 */
    type?: number
    /** 机构拥有者 */
    userCode?: string
    /** 所在机构角色 */
    userRole?: string
}

/**
 * requestUrl /auth/organization/can_join_org/{identity}
 * method get
 */
export interface GetCanJoinMerchantUsingGETResponse {
    /** 响应数据 */
    data?: 我的机构
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/organization/certify
 * method post
 */
export interface JudgeCertifyUsingPOSTRequest {
    /** 信用代码 */
    creditCode?: string
    /** 企业名称 */
    customerName?: string
}

/**
 * requestUrl /auth/organization/certify
 * method post
 */
export interface JudgeCertifyUsingPOSTResponse {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/organization/certify_organization
 * method post
 */
export interface SendVerifyCodeUsingPOST_1Request {
    /** 统一信用代码 */
    companyCode?: string
    /** 工商照片 */
    creditImage?: string
    /** 法人姓名 */
    legalPersonName?: string
    /** 机构名称 */
    name?: string
    /** 机构编码 */
    organizationCode: string
}

/**
 * requestUrl /auth/organization/certify_organization
 * method post
 */
export interface SendVerifyCodeUsingPOST_1Response {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/organization/check_permissions
 * method post
 */
export interface CheckPermissionUsingPOSTRequest {
    /** 机构编码 */
    organizationCode: string
    /** 业务线类型 1平台  2职培 3考评  4职培 */
    type: number
    /** 接口路由 */
    url: string
    /** 用户编码 */
    userCode: string
}

/**
 * requestUrl /auth/organization/check_permissions
 * method post
 */
export interface CheckPermissionUsingPOSTResponse {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/organization/create
 * method post
 */
export interface CreateUsingPOST_1Request {
    /** 所在地址区(编码code) */
    area: number
    /** 所在地址市(编码code) */
    city: number
    /** 资源方身份id */
    identity?: number
    /** 所属行业(二级行业id) */
    industryId: number
    /** 机构头像 */
    logo?: string
    /** 机构名称 */
    name: string
    /** 所在地址省份(编码code) */
    province: number
    /** 机构规模(key) */
    scale: number
}

/**
 * requestUrl /auth/organization/create
 * method post
 */
export interface CreateUsingPOST_1Response {
    /** 响应数据 */
    data?: string
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/organization/create_department
 * method post
 */
export interface CreateDepartmentUsingPOST_1Request {
    /** 部门名称 */
    name: string
    /** 机构编码 */
    organizationCode: string
    /** 上级部门编码 */
    parentCode?: string
}

/**
 * requestUrl /auth/organization/create_department
 * method post
 */
export interface CreateDepartmentUsingPOST_1Response {
    /** 响应数据 */
    data?: string
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/organization/create_php
 * method post
 */
export interface CreatePHPSdkUsingPOSTRequest {
    /** 所在地址区(编码code) */
    area: number
    /** 工商照片 */
    certifyImage?: string
    /** 认证状态 */
    certifyStatus: boolean
    /** 所在地址市(编码code) */
    city: number
    /** 统一信用代码 */
    companyCode?: string
    /** 所属行业(二级行业id) */
    industryId: number
    /** logo */
    logo?: string
    /** 机构名称 */
    name: string
    /** 所在地址省份(编码code) */
    province: number
    /** 机构规模(key) */
    scale: number
    /** 站点 */
    sid: number
    /** 类型，2机构，3资源方，跟group表的type枚举对应，默认2 */
    type?: number
    /** 机构拥有者 */
    userCode: string
}

/**
 * requestUrl /auth/organization/create_php
 * method post
 */
export interface CreatePHPSdkUsingPOSTResponse {
    /** 响应数据 */
    data?: string
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/organization/create_staff
 * method post
 */
export interface CreateStaffUsingPOST_1Request {
    /** 证件类型，1身份证，2护照，3其他 */
    certificateType?: number
    /** 部门编码 */
    departmentCode?: string
    /** 身份证号 */
    idCard?: string
    /** 手机号 */
    mobile: string
    /** 姓名 */
    name: string
    /** 机构编码 */
    organizationCode: string
    /** 关联角色编码 */
    roleCode?: string
    /** 账号 */
    username: string
}

/**
 * requestUrl /auth/organization/create_staff
 * method post
 */
export interface CreateStaffUsingPOST_1Response {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface StaffCreateItemDto {
    /** 证件类型，1身份证，2护照，3其他 */
    certificateType?: number
    /** 部门编码 */
    departmentCode?: string
    /** 证件号 */
    idCard?: string
    /** 手机号 */
    mobile: string
    /** 姓名 */
    name: string
    /** 机构编码 */
    organizationCode: string
    /** 关联角色编码 */
    roleCode?: string
    /** 站点id */
    sid: number
}

/**
 * requestUrl /auth/organization/create_staff_php
 * method post
 */
export interface CreateStaffPHPUsingPOSTRequest {
    /** 成员信息 */
    staffList: StaffCreateItemDto
}

/**
 * requestUrl /auth/organization/create_staff_php
 * method post
 */
export interface CreateStaffPHPUsingPOSTResponse {
    /** 响应数据 */
    data?: 批量处理结果数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/organization/deal_apply
 * method post
 */
export interface DealApplyUsingPOSTRequest {
    /** 申请编码 */
    code: string
    /** 机构编码 */
    organizationCode: string
    /** 处理结果 1通过 2拒绝 */
    status: number
}

/**
 * requestUrl /auth/organization/deal_apply
 * method post
 */
export interface DealApplyUsingPOSTResponse {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/organization/delete_apply
 * method post
 */
export interface DelInviteApplyUsingPOSTRequest {
    /** 申请编码 */
    inviteCode?: any[]
    /** 机构编码 */
    organizationCode: string
}

/**
 * requestUrl /auth/organization/delete_apply
 * method post
 */
export interface DelInviteApplyUsingPOSTResponse {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/organization/delete_department
 * method post
 */
export interface DeleteDepartmentUsingPOSTRequest {
    /** 部门编码 */
    code?: string
    /** 机构编码 */
    organizationCode: string
}

/**
 * requestUrl /auth/organization/delete_department
 * method post
 */
export interface DeleteDepartmentUsingPOSTResponse {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/organization/delete_organization
 * method post
 */
export interface DeleteOrganizationUsingPOSTRequest {
    /** code */
    code: string
}

/**
 * requestUrl /auth/organization/delete_organization
 * method post
 */
export interface DeleteOrganizationUsingPOSTResponse {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/organization/delete_staff
 * method post
 */
export interface DeleteStaffUsingPOSTRequest {
    /** 机构编码 */
    organizationCode?: string
    /** 员工用户编码 */
    userCode?: string
}

/**
 * requestUrl /auth/organization/delete_staff
 * method post
 */
export interface DeleteStaffUsingPOSTResponse {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/organization/delete_staff_php
 * method post
 */
export interface DeleteStaffPHPUsingPOSTRequest {
    /** 机构编码 */
    organizationCode: string
    /** 成员用户编码 */
    staffList: any[]
}

/**
 * requestUrl /auth/organization/delete_staff_php
 * method post
 */
export interface DeleteStaffPHPUsingPOSTResponse {
    /** 响应数据 */
    data?: 批量处理结果数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 部门 {
    /** 子部门 */
    children?: 部门
    /** 部门编码 */
    key?: string
    /** 部门上级级编码 */
    parentCode?: string
    /** 部门成员数量 */
    staffCount?: number
    /** 部门名称 */
    title?: string
}

/**
 * requestUrl /auth/organization/department/search
 * method post
 */
export interface DepartmentSearchUsingPOSTRequest {
    /** 部门名称 */
    name: string
    /** 机构编码 */
    organizationCode: string
}

/**
 * requestUrl /auth/organization/department/search
 * method post
 */
export interface DepartmentSearchUsingPOSTResponse {
    /** 响应数据 */
    data?: 部门
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 部门树 {
    /** 子部门 */
    children?: 部门
    /** 机构成员数量 */
    staffCount?: number
    /** 机构名称 */
    title?: string
}

/**
 * requestUrl /auth/organization/department/tree/{organizationCode}
 * method get
 */
export interface DepartmentTreeUsingGETResponse {
    /** 响应数据 */
    data?: 部门树
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 部门员工列表数据 {
    /** 姓名 */
    name?: string
    /** 用户编码 */
    userCode?: string
}

/**
 * requestUrl /auth/organization/department_staff
 * method post
 */
export interface DealApplyUsingPOST_2Request {
    /** 部门编码 */
    departmentCode?: string
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 机构编码 */
    organizationCode?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
}

/**
 * requestUrl /auth/organization/department_staff
 * method post
 */
export interface DealApplyUsingPOST_2Response {
    /** 响应数据 */
    data?: 部门员工列表数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/organization/edit
 * method post
 */
export interface EditUsingPOST_5Request {
    /** 所在地址区(编码code) */
    area: number
    /** 工商照片 */
    certifyImage?: string
    /** 认证状态 */
    certifyStatus?: boolean
    /** 所在地址市(编码code) */
    city: number
    /** 机构编码 */
    code: string
    /** 统一信用代码 */
    companyCode?: string
    /** 所属行业(二级行业id) */
    industryId: number
    /** 机构logo */
    logo?: string
    /** 机构名称 */
    name: string
    /** 所在地址省份(编码code) */
    province: number
    /** 机构规模(key) */
    scale: number
    /** 机构拥有者 */
    userCode: string
}

/**
 * requestUrl /auth/organization/edit
 * method post
 */
export interface EditUsingPOST_5Response {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/organization/edit_base
 * method post
 */
export interface EditBaseInfoUsingPOSTRequest {
    /** 所在地址区(编码code) */
    area: number
    /** 所在地址市(编码code) */
    city: number
    /** 机构编码 */
    code: string
    /** 所属行业(二级行业id) */
    industryId: number
    /** 机构logo */
    logo?: string
    /** 机构名称 */
    name: string
    /** 所在地址省份(编码code) */
    province: number
    /** 机构规模(key) */
    scale: number
}

/**
 * requestUrl /auth/organization/edit_base
 * method post
 */
export interface EditBaseInfoUsingPOSTResponse {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/organization/edit_department
 * method post
 */
export interface CreateDepartmentUsingPOSTRequest {
    /** 部门编码 */
    code?: string
    /** 部门名称 */
    name: string
    /** 机构编码 */
    organizationCode: string
}

/**
 * requestUrl /auth/organization/edit_department
 * method post
 */
export interface CreateDepartmentUsingPOSTResponse {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/organization/edit_modules
 * method post
 */
export interface EditOrganizationSiteModuleUsingPOSTRequest {
    /** 模块id */
    moduleList?: any[]
    /** 机构编码 */
    organizationCode: string
    /** 站点id */
    sid: number
}

/**
 * requestUrl /auth/organization/edit_modules
 * method post
 */
export interface EditOrganizationSiteModuleUsingPOSTResponse {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/organization/edit_staff
 * method post
 */
export interface CreateStaffUsingPOSTRequest {
    /** 机构编码 */
    organizationCode: string
    /** 关联角色编码 */
    roleCode: string
    /** 用户编码 */
    userCode: string
}

/**
 * requestUrl /auth/organization/edit_staff
 * method post
 */
export interface CreateStaffUsingPOSTResponse {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRsp部门员工列表分页数据 {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: 部门员工列表分页数据
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

interface 部门员工列表分页数据 {
    /** 编码 */
    code?: string
    /** 部门 */
    department?: any[]
    /** 身份证号 */
    idCard?: string
    /** 是否管理员 */
    isAdmin?: boolean
    /** 是否主管 */
    isDirector?: boolean
    /** 手机号 */
    mobile?: string
    /** 姓名 */
    name?: string
    /** 关联角色编码 */
    roleCode?: string
    /** 关联角色 */
    roleName?: string
    /** 员工用户编码 */
    userCode?: string
}

/**
 * requestUrl /auth/organization/employee/page
 * method post
 */
export interface EmployeeUsingPOSTRequest {
    /** 部门编码 */
    departmentCode?: string
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 机构编码 */
    organizationCode?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
}

/**
 * requestUrl /auth/organization/employee/page
 * method post
 */
export interface EmployeeUsingPOSTResponse {
    /** 响应数据 */
    data?: BasePaginationRsp部门员工列表分页数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/organization/invite_apply
 * method post
 */
export interface InviteApplyUsingPOSTRequest {
    /** 证件类型，1身份证，2护照，3其他 */
    certificateType?: number
    /** 身份证号 */
    idCard?: string
    /** 邀请码 */
    inviteCode: string
    /** 手机号 */
    mobile: string
    /** 姓名 */
    name: string
    /** 申请理由 */
    reason?: string
}

/**
 * requestUrl /auth/organization/invite_apply
 * method post
 */
export interface InviteApplyUsingPOSTResponse {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 邀请员工数据 {
    /** 部门名称(数组) */
    department?: any[]
    /** 部门名称 */
    departmentName?: string
    /** 邀请码 */
    inviteCode?: string
    /** 邀请二维码 */
    inviteImage?: string
    /** 邀请人 */
    inviteName?: string
    /** 邀请链接 */
    inviteUrl?: string
    /** 机构名称 */
    organizationName?: string
    /** 站点id */
    sid?: number
}

/**
 * requestUrl /auth/organization/invite_code
 * method post
 */
export interface GetInviteCodeUsingPOSTRequest {
    /** 部门编码 */
    departmentCode?: string
    /** 邀请码有效时间  0永久 1三天有效 2一周有效 */
    inviteExpire?: number
    /** 机构编码 */
    organizationCode?: string
}

/**
 * requestUrl /auth/organization/invite_code
 * method post
 */
export interface GetInviteCodeUsingPOSTResponse {
    /** 响应数据 */
    data?: 邀请员工数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/organization/invite_info
 * method post
 */
export interface InviteUsingPOSTRequest {
    /** 邀请码 */
    inviteCode: string
}

/**
 * requestUrl /auth/organization/invite_info
 * method post
 */
export interface InviteUsingPOSTResponse {
    /** 响应数据 */
    data?: 邀请员工数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/organization/is_staff/{organizationCode}
 * method get
 */
export interface IsOrganizationStaffUsingGETResponse {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/organization/list_all_by_codes
 * method post
 */
export interface ListOrgByCodesWithSiteNameUsingPOSTRequest {
    /** 机构编码列表 */
    codeList: any[]
}

/**
 * requestUrl /auth/organization/list_all_by_codes
 * method post
 */
export interface ListOrgByCodesWithSiteNameUsingPOSTResponse {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/organization/list_by_codes
 * method post
 */
export interface ListOrgByCodesUsingPOSTRequest {
    /** 机构编码列表 */
    codeList: any[]
}

/**
 * requestUrl /auth/organization/list_by_codes
 * method post
 */
export interface ListOrgByCodesUsingPOSTResponse {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 业务线站点机构模块信息 {
    /** 别名 */
    alias?: string
    /** 机构是否已拥有该模块 */
    has?: boolean
    /** ID */
    id?: number
    /** 是否是基础模块 0否 1是   基础模块权限默认给 不可编辑 */
    isBase?: number
    /** 模块名称 */
    name?: string
}

/**
 * requestUrl /auth/organization/modules
 * method post
 */
export interface OrganizationSiteModuleUsingPOSTRequest {
    /** 机构编码 */
    organizationCode: string
    /** 站点ID */
    sid: number
    /** 业务线类型 1平台  2职培 3考评  4职培 */
    type: number
}

/**
 * requestUrl /auth/organization/modules
 * method post
 */
export interface OrganizationSiteModuleUsingPOSTResponse {
    /** 响应数据 */
    data?: 业务线站点机构模块信息
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 机构信息 {
    /** 机构唯一code */
    code?: string
    /** 机构logo */
    logo?: string
    /** 机构名称 */
    name?: string
}

/**
 * requestUrl /auth/organization/organization_base_info/{organizationCode}
 * method get
 */
export interface GetOrganizationInfoByOrgCodeUsingGETResponse {
    /** 响应数据 */
    data?: 机构信息
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface OrganizationDetailDto {
    /** 区 */
    area?: number
    /** 区名称 */
    areaName?: string
    /** 认证状态 */
    certifyStatus?: boolean
    /** 市 */
    city?: number
    /** 市名称 */
    cityName?: string
    /** 机构唯一编码 */
    code?: string
    /** 统一信用代码 */
    companyCode?: string
    /** 创建时间 */
    createdAt?: number
    /** 数据创建者 */
    createdBy?: string
    /** 工商证件照 */
    creditImage?: string
    /** 是否已删除 0未删除 1已删除 */
    deleted?: number
    /** 解散状态 0-未解散，1-已解散 */
    dissolveStatus?: number
    /** 所属行业ID */
    industryId?: number
    /** 行业 */
    industryList?: 行业数据
    /** logo */
    logo?: string
    /** 机构名称 */
    name?: string
    /** 省 */
    province?: number
    /** 省名称 */
    provinceName?: string
    /** 规模 */
    scale?: string
    /** 站点id */
    sid?: number
    /** 站点名称 */
    siteName?: string
    /** 人数 */
    staffCount?: number
    /** 状态 0-正常，1-禁用 */
    status?: number
    /** 更新时间 */
    updatedAt?: number
    /** 更新人 */
    updatedBy?: string
    /** 管理员编码 */
    userCode?: string
    /** 管理员姓名 */
    userName?: string
}

/**
 * requestUrl /auth/organization/organization_detail/{organizationCode}
 * method get
 */
export interface OrganizationDetailUsingGETResponse {
    /** 响应数据 */
    data?: OrganizationDetailDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/organization/organization_identity/{organizationCode}
 * method get
 */
export interface GetOrgIdentityListUsingGETResponse {
    /** 响应数据 */
    data?: IdentityDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/organization/send
 * method post
 */
export interface SendVerifyCodeUsingPOST_2Request {
    /** 手机号或者email */
    account?: string
    /** 随机key，同一生命周期key不变 */
    key?: string
    /** 站点id，找回密码时必传 */
    sid?: number
    /** 短信类型 0通用  1机构创建 5找回密码 */
    type?: number
}

/**
 * requestUrl /auth/organization/send
 * method post
 */
export interface SendVerifyCodeUsingPOST_2Response {
    /** 响应数据 */
    data?: string
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/organization/set_director
 * method post
 */
export interface DealApplyUsingPOST_1Request {
    /** 部门编码 */
    departmentCode: string
    /** 设为主管的用户编码 */
    directorCode: string
    /** 机构编码 */
    organizationCode: string
}

/**
 * requestUrl /auth/organization/set_director
 * method post
 */
export interface DealApplyUsingPOST_1Response {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/organization/sync_merchant_identity
 * method get
 */
export interface SyncHistoryMerchantIdentityUsingGETResponse {
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/permission/site_module_permit
 * method get
 */
export interface SiteModulePermitUsingGETResponse {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/resource/file/upload
 * method post
 */
export interface UploadUsingPOST_1Request {}

/**
 * requestUrl /auth/resource/file/upload
 * method post
 */
export interface UploadUsingPOST_1Response {
    /** 响应数据 */
    data?: ResourceDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/resource/private_convert_public
 * method get
 */
export interface PrivateConvertPublicUsingGETResponse {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/role/create
 * method post
 */
export interface CreateUsingPOST_2Request {
    /** 角色编码 */
    code?: string
    /** 角色描述 */
    description?: string
    /** 角色名称 */
    name: string
    /** 机构编码 */
    organizationCode: string
}

/**
 * requestUrl /auth/role/create
 * method post
 */
export interface CreateUsingPOST_2Response {
    /** 响应数据 */
    data?: string
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/role/delete
 * method post
 */
export interface DeleteUsingPOST_1Request {
    /** 机构编码 */
    organizationCode: string
    /** 角色编码 */
    roleCode: string
}

/**
 * requestUrl /auth/role/delete
 * method post
 */
export interface DeleteUsingPOST_1Response {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/role/modify
 * method post
 */
export interface ModifyUsingPOSTRequest {
    /** 角色编码 */
    code?: string
    /** 角色描述 */
    description?: string
    /** 角色名称 */
    name: string
    /** 机构编码 */
    organizationCode: string
}

/**
 * requestUrl /auth/role/modify
 * method post
 */
export interface ModifyUsingPOSTResponse {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRsp角色分页数据 {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: 角色分页数据
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

interface 角色分页数据 {
    /** 编码 */
    code?: string
    /** 描述 */
    description?: string
    /** 角色名称 */
    name?: string
}

/**
 * requestUrl /auth/role/page
 * method post
 */
export interface RolePageUsingPOSTRequest {
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 机构编码 */
    organizationCode?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
}

/**
 * requestUrl /auth/role/page
 * method post
 */
export interface RolePageUsingPOSTResponse {
    /** 响应数据 */
    data?: BasePaginationRsp角色分页数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 角色权限响应数据 {
    /** 别名 */
    alias?: string
    /** api接口 */
    apiList?: any[]
    /** 是否能修改 */
    changeEnable?: boolean
    /** 选中icon */
    checkIcon?: string
    /** 子页面 */
    childList?: any[]
    /** 下级权限 */
    children?: 角色权限响应数据
    /** 描述 */
    description?: string
    /** 是否拥有权限 */
    has?: boolean
    /** 隐藏状态 开启  false    关闭 true */
    hide?: boolean
    /** icon */
    icon?: string
    /** 权限编码id */
    key?: number
    /** 布局-页头   1展示 0关闭 */
    layoutHeader?: number
    /** 布局-菜单   1展示 0关闭 */
    layoutMenu?: number
    /** 是否菜单 0否 1是 */
    menu?: number
    /** 模块id */
    moduleId?: number
    /** 模块名称 */
    moduleName?: string
    /** 打开方式 0当前页面  1新页面 */
    openType?: number
    /** 上级权限链路 */
    parentChain?: 角色权限响应数据
    /** 上级权限名称 */
    parentName?: string
    /** 上级权限id */
    pid?: number
    /** 业务线名称 */
    platformName?: string
    /** 页面路由 */
    route?: string
    /** 排序 */
    sort?: number
    /** 定制 */
    special?: RoleSpecialDto
    /** 终端  1pc  2移动端 */
    terminal?: number
    /** 是否是当前模块的 */
    thisModule?: boolean
    /** 权限名称 */
    title?: string
    /** 类型  1菜单  2页面 3操作 */
    type?: number
    /** 是否微应用 0否 1是 */
    webApplication?: number
}

interface RoleSpecialDto {
    /**  布局-页头   1展示 0关闭 */
    layoutHeader?: number
    /**  布局-菜单   1展示 0关闭 */
    layoutMenu?: number
    /**  名称 */
    name?: string
    /**  打开方式 0当前页面  1新页面 */
    openType?: number
    /**  权限id */
    permissionId?: number
    /**  站点id */
    sid?: number
}

/**
 * requestUrl /auth/role/permissions
 * method post
 */
export interface PermissionListUsingPOSTRequest {
    /** 机构编码 */
    organizationCode: string
    /** 角色编码 */
    roleCode: string
}

/**
 * requestUrl /auth/role/permissions
 * method post
 */
export interface PermissionListUsingPOSTResponse {
    /** 响应数据 */
    data?: 角色权限响应数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/role/permissions/save
 * method post
 */
export interface EditPermissionUsingPOSTRequest {
    /** 机构编码 */
    organizationCode: string
    /** 第三级权限id */
    permissionIds?: any[]
    /** 角色编码 */
    roleCode?: string
}

/**
 * requestUrl /auth/role/permissions/save
 * method post
 */
export interface EditPermissionUsingPOSTResponse {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/role/permissions_list
 * method post
 */
export interface PermissionListUsingPOST_2Request {
    /** 角色编码 */
    roleCode: string
    /** 站点id */
    sid: number
}

/**
 * requestUrl /auth/role/permissions_list
 * method post
 */
export interface PermissionListUsingPOST_2Response {
    /** 响应数据 */
    data?: 角色权限响应数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 角色响应数据 {
    /** 角色编码 */
    code: string
    /** 角色名称 */
    name: string
}

/**
 * requestUrl /auth/role/role_list/{organizationCode}
 * method get
 */
export interface RoleListUsingGETResponse {
    /** 响应数据 */
    data?: 角色响应数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/role/user_permission
 * method post
 */
export interface PermissionListUsingPOST_1Request {
    /** 机构编码 */
    organizationCode: string
    /** 业务线类型 1平台  2职培 3考评  4创培 */
    type: number
}

/**
 * requestUrl /auth/role/user_permission
 * method post
 */
export interface PermissionListUsingPOST_1Response {
    /** 响应数据 */
    data?: 角色权限响应数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/role/v2/user_permission
 * method post
 */
export interface PermissionListV2UsingPOSTRequest {
    /** 机构编码 */
    organizationCode: string
    /** 业务线类型 1平台  2职培 3考评  4创培 */
    type: number
}

/**
 * requestUrl /auth/role/v2/user_permission
 * method post
 */
export interface PermissionListV2UsingPOSTResponse {
    /** 响应数据 */
    data?: 角色权限响应数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/site_agreement/delete/{code}
 * method get
 */
export interface DeleteUsingGETResponse {
    /** 响应数据 */
    data?: string
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface SiteAgreementDto {
    /** 站点协议的Id 唯一性编码 */
    code?: string
    /** 协议内容 */
    context?: string
    /** 站点Id */
    sid?: number
    /** 站点名称 */
    sidName?: string
    /** 协议标题 */
    title?: string
    /** 协议类型  用户协议 1 隐私协议 2 默认是0 */
    type?: string
}

/**
 * requestUrl /auth/backend/site_agreement/info/{code}
 * method get
 */
export interface InfoUsingGETResponse {
    /** 响应数据 */
    data?: SiteAgreementDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRspSiteAgreementDto {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: SiteAgreementDto
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

/**
 * requestUrl /auth/backend/site_agreement/page
 * method get
 */
export interface PageUsingGETResponse {
    /** 响应数据 */
    data?: BasePaginationRspSiteAgreementDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/site_agreement/save_update
 * method post
 */
export interface SaveOrUpdateUsingPOSTRequest {
    /** 站点协议的Id 唯一性编码 */
    code?: string
    /** 协议内容 */
    context?: string
    /** 站点Id */
    sid?: number
    /** 站点名称 */
    sidName?: string
    /** 协议标题 */
    title?: string
    /** 协议类型  用户协议 1 隐私协议 2 默认是0 */
    type?: string
}

/**
 * requestUrl /auth/backend/site_agreement/save_update
 * method post
 */
export interface SaveOrUpdateUsingPOSTResponse {
    /** 响应数据 */
    data?: string
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/site_agreement/list/{sid}
 * method get
 */
export interface ListUsingGETResponse {
    /** 响应数据 */
    data?: SiteAgreementDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/site_feign/all_module
 * method get
 */
export interface AllModuleListUsingGETResponse {
    /** 响应数据 */
    data?: 站点模块数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/site_feign/check_config_exist
 * method post
 */
export interface CheckConfigExistUsingPOST_1Request {
    /** 站点id */
    sid?: number
    /** 站点配置枚举值 */
    siteConfigKeyEnum?: string
    /** 配置值 */
    value?: string
}

/**
 * requestUrl /auth/site_feign/check_config_exist
 * method post
 */
export interface CheckConfigExistUsingPOST_1Response {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface SiteModuleRelationDto {
    /** 编码 */
    id?: number
    /** 模块id */
    moduleId?: number
    /** 站点id */
    sid?: number
}

/**
 * requestUrl /auth/site_feign/list_by_sid/{sid}
 * method get
 */
export interface ListBySidUsingGETResponse {
    /** 响应数据 */
    data?: SiteModuleRelationDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/site_feign/list_by_sid_type
 * method post
 */
export interface ListBySidTypeUsingPOSTRequest {
    /** 站点id */
    sid: number
    /** 模块id */
    type: number
}

/**
 * requestUrl /auth/site_feign/list_by_sid_type
 * method post
 */
export interface ListBySidTypeUsingPOSTResponse {
    /** 响应数据 */
    data?: SiteModuleRelationDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/site_front/v2/detail
 * method post
 */
export interface ConfigDetailUsingPOST_1Request {
    /** 配置类型:domainInfo-域名信息;auxiliary-辅助信息;additional-附加信息;platform-平台信息;train-创培;career-职培;exam-考评;school-院校 */
    configType?: string
    /** 站点id */
    sid: number
}

/**
 * requestUrl /auth/site_front/v2/detail
 * method post
 */
export interface ConfigDetailUsingPOST_1Response {
    /** 响应数据 */
    data?: BackendSiteStepDetailDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/sync_es/sync_auth_log
 * method get
 */
export interface SyncAuthLogUsingGETResponse {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/sync/exam_worker
 * method get
 */
export interface SyncExamWorkerUsingGETResponse {
    /** 响应数据 */
    data?: number
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/sync/login_theme
 * method get
 */
export interface SyncSiteLoginThemeUsingGETResponse {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/user_audit/audit
 * method post
 */
export interface AuditUsingPOSTRequest {
    /** 审核意见 */
    auditRemark?: string
    /** 审核状态 0 待审核 1 审核通过 2 审核未通过 */
    auditStatus?: number
    /** 审核code */
    code?: string
    /** 强制更新 */
    forceUpdate?: boolean
}

/**
 * requestUrl /auth/backend/user_audit/audit
 * method post
 */
export interface AuditUsingPOSTResponse {
    /** 响应数据 */
    data?: string
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/backend/user_audit/count/audit
 * method post
 */
export interface CountAuditUsingPOSTRequest {
    /** 审核状态 0 待审核 1 审核通过 2 审核未通过 */
    auditStatus?: string
    /** 证件类型 */
    certificateType?: number
    /** 证件号码 */
    idCardNo?: string
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
    /** 用户姓名 */
    realName?: string
    /** 站点Id */
    sid?: number
}

/**
 * requestUrl /auth/backend/user_audit/count/audit
 * method post
 */
export interface CountAuditUsingPOSTResponse {
    /** 响应数据 */
    data?: number
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface IdCardInfoDto {
    /** 身份证件号 */
    cardNo?: string
    /** 身份证姓名 */
    name?: string
}

/**
 * requestUrl /auth/backend/user_audit/idcard/info/{idCard}
 * method get
 */
export interface IdCardInfoUsingGETResponse {
    /** 响应数据 */
    data?: IdCardInfoDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRsp用户审核信息 {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: 用户审核信息
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

interface 用户审核信息 {
    /** 提交时间 */
    applyTime?: number
    /** 审核不通过原因 */
    auditRemark?: string
    /** 审核状态 0 待审核 1 审核通过 2 审核未通过 */
    auditStatus?: string
    /** 证件后面照片 */
    cardBackUrl?: string
    /** 证件前面照片 */
    cardFrontUrl?: string
    /** 证件类型 证件类型 0 未知 1身份证，2护照，3其他 */
    certificateType?: string
    /** 审核记录code */
    code?: string
    /** 证件号码 */
    idCardNo?: string
    /** 姓名 */
    realName?: string
    /** 补充说明 */
    remark?: string
    /** 站点Id */
    sid?: number
    /** 站点名称 */
    siteName?: string
    /** 证件照片列表 */
    url?: any[]
    /** 用户code */
    userCode?: string
}

/**
 * requestUrl /auth/backend/user_audit/page
 * method post
 */
export interface PageUsingPOST_10Request {
    /** 审核状态 0 待审核 1 审核通过 2 审核未通过 */
    auditStatus?: string
    /** 证件类型 */
    certificateType?: number
    /** 证件号码 */
    idCardNo?: string
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
    /** 用户姓名 */
    realName?: string
    /** 站点Id */
    sid?: number
}

/**
 * requestUrl /auth/backend/user_audit/page
 * method post
 */
export interface PageUsingPOST_10Response {
    /** 响应数据 */
    data?: BasePaginationRsp用户审核信息
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user_audit/apply
 * method post
 */
export interface ApplyUsingPOSTRequest {
    /** 审核说明 */
    auditRemark?: string
    /** 证件后面照片 */
    cardBackUrl?: string
    /** 证件前面照片 */
    cardFrontUrl?: string
    /** 证件类型 0 未知 1身份证，2护照，3其他 */
    certificateType?: number
    /** 证件号码 */
    idCardNo?: string
    /** 用户真实姓名 */
    name?: string
    /** 补充说明 */
    remark?: string
    /** 站点id */
    sid?: number
}

/**
 * requestUrl /auth/user_audit/apply
 * method post
 */
export interface ApplyUsingPOSTResponse {
    /** 响应数据 */
    data?: string
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 用户审核前端展示对象 {
    /** 审核意见 */
    auditRemark?: string
    /** 审核状态 0 待审核 1 审核通过 2 审核未通过 */
    auditStatus?: string
    /** 用户审核code */
    code?: string
    /** 是否验证身份证号 */
    isValidateIdCard?: boolean
    /** 用户code */
    userCode?: string
}

/**
 * requestUrl /auth/user_audit/details
 * method get
 */
export interface DetailByUserCodeUsingGETResponse {
    /** 响应数据 */
    data?: 用户审核前端展示对象
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 授权登录响应信息 {
    /** token令牌 */
    accessToken?: string
    /** 用户第三方应用唯一标识 */
    authOpenId?: string
    /** 授权类型,wx:微信;dd:钉钉 */
    authType?: string
    /**  */
    cloginB?: boolean
    /** 注册标识 */
    registerFlag?: boolean
    /** 用户编码 */
    userCode?: string
}

/**
 * requestUrl /auth/login/access_token
 * method post
 */
export interface GetAccessTokenUsingPOSTRequest {
    /** 授权应用id */
    appId: string
    /** 登录设备 */
    appKey: string
    /** 授权类型,wx:微信;dd:钉钉 */
    authType: string
    /** 授权码 */
    code: string
    /** 站点id */
    sid: number
    /** 类型，1个人，2机构，3资源方 */
    type: number
}

/**
 * requestUrl /auth/login/access_token
 * method post
 */
export interface GetAccessTokenUsingPOSTResponse {
    /** 响应数据 */
    data?: 授权登录响应信息
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 获取token响应信息 {
    /** token令牌 */
    accessToken?: string
    /** 绑定标识 */
    bindFlag?: boolean
    /** 用户编码 */
    userCode?: string
}

/**
 * requestUrl /auth/login/access_token_by_openid
 * method post
 */
export interface GetAccessTokenByOpenIdUsingPOSTRequest {
    /** 单点登录类型 */
    authType: string
    /** 第三方平台openId */
    openId: string
    /** 类型，1个人，2机构，3资源方 */
    type?: number
}

/**
 * requestUrl /auth/login/access_token_by_openid
 * method post
 */
export interface GetAccessTokenByOpenIdUsingPOSTResponse {
    /** 响应数据 */
    data?: 获取token响应信息
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 授权应用响应信息 {
    /** 应用id */
    appId?: string
    /** 重定向地址 */
    redirectUrl?: string
}

/**
 * requestUrl /auth/login/get_auth_app
 * method get
 */
export interface GetAuthAppInfoUsingGETResponse {
    /** 响应数据 */
    data?: 授权应用响应信息
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface AuthBindResponseDto {
    /** token令牌 */
    accessToken?: string
    /** 注册标识 */
    registerFlag?: boolean
    /** 用户编码 */
    userCode?: string
}

/**
 * requestUrl /auth/login/user_auth_bind
 * method post
 */
export interface UserAuthBindUsingPOSTRequest {
    /** 登录设备 WEB(PC网页);MOBILE(手机移动端);PAD(平板);APPLET(小程序);OPENAPI(开放平台) */
    appKey: string
    /** 授权类型,wx:微信;dd:钉钉 */
    authType: string
    /** 用户组 */
    groupId: number
    /** openId */
    openId: string
    /** 手机号 */
    phone: string
    /** 上一步验证码随机key，存在前置校验必填 */
    preRandomKey?: string
    /** 随机key，同一生命周期key不变 */
    randomKey: string
    /** 站点id */
    sid: number
    /** 类型，1个人，2机构，3资源方 */
    type: number
    /** 验证码 */
    verifyCode: string
}

/**
 * requestUrl /auth/login/user_auth_bind
 * method post
 */
export interface UserAuthBindUsingPOSTResponse {
    /** 响应数据 */
    data?: AuthBindResponseDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface PhpAuthBindResponseDto {
    /** 绑定标识 */
    bindFlag?: boolean
    /** 注册标识 */
    registerFlag?: boolean
}

/**
 * requestUrl /auth/login/user_auth_bind_php
 * method post
 */
export interface UserAuthBindSsoUsingPOSTRequest {
    /** 授权类型,wx:微信;dd:钉钉;sso_:单点登录前缀 */
    authType: string
    /** openId */
    openId: string
    /** 站点id */
    sid: number
    /** 用户编码 */
    userCode: string
}

/**
 * requestUrl /auth/login/user_auth_bind_php
 * method post
 */
export interface UserAuthBindSsoUsingPOSTResponse {
    /** 响应数据 */
    data?: PhpAuthBindResponseDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/login/verify_phone_user_exist
 * method get
 */
export interface VerifyPhoneUserExistUsingGETResponse {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface AuditCertificateResDto {
    /** 审核结果编码，AUDIT_PASSED审核通过，WAIT_AUDIT审核中，AUDIT_REJECTED审核未通过 */
    resultCode?: string
    /** 审核结果信息 */
    resultMessage?: string
}

/**
 * requestUrl /auth/user/v1/audit_certificate
 * method post
 */
export interface AuditCertificateUsingPOSTRequest {
    /** 证件照片url */
    certificateImage?: string
    /** 护照/其他证件号码,8-25位 */
    certificateNo: string
    /** 证件类型，2护照，3其他 */
    certificateType: number
    /** 姓名 */
    name: string
    /** 补充说明 */
    remark?: string
    /** 站点 */
    sid: number
}

/**
 * requestUrl /auth/user/v1/audit_certificate
 * method post
 */
export interface AuditCertificateUsingPOSTResponse {
    /** 响应数据 */
    data?: AuditCertificateResDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 身份证验证请求数据 {
    /** 身份证号 */
    idCard?: string
    /** 姓名 */
    name?: string
}

/**
 * requestUrl /auth/user/v1/batch_certify_id_card
 * method post
 */
export interface BatchCertifyIdCardUsingPOSTRequest {
    /** 用户二要素 */
    list?: 身份证验证请求数据
}

/**
 * requestUrl /auth/user/v1/batch_certify_id_card
 * method post
 */
export interface BatchCertifyIdCardUsingPOSTResponse {
    /** 响应数据 */
    data?: 批量处理结果数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user/v1/bind_certificate
 * method post
 */
export interface BindIdcardUsingPOSTRequest {
    /** 姓名，护照或其他必传 */
    certificateName?: string
    /** 证件号码，护照或其他必传 */
    certificateNo?: string
    /** 证件类型，1身份证（默认），2护照，3其他 */
    certificateType?: number
    /** 是否强制绑定，第一次为false */
    force?: boolean
    /** 身份证反面水印图，身份证必传 */
    idcardBack?: string
    /** 身份证反面，原图 */
    idcardBackOriginal?: string
    /** 身份证正面水印图/护照/其他证件附件 */
    idcardFront?: string
    /** 身份证正面，原图 */
    idcardFrontOriginal?: string
    /** 补充说明 */
    remark?: string
}

/**
 * requestUrl /auth/user/v1/bind_certificate
 * method post
 */
export interface BindIdcardUsingPOSTResponse {
    /** 响应数据 */
    data?: number
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user/v1/bind_email
 * method post
 */
export interface BindEmailUsingPOSTRequest {
    /** 邮箱 */
    email: string
    /** 新邮箱换绑时验证码的随机key */
    newRandomKey?: string
    /** 上一步验证码随机key，换绑必填 */
    preRandomKey: string
    /** 验证码随机key */
    randomKey: string
    /** 验证码 */
    verifyCode: string
}

/**
 * requestUrl /auth/user/v1/bind_email
 * method post
 */
export interface BindEmailUsingPOSTResponse {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user/v1/bind_id_card
 * method post
 */
export interface BindIdcardUsingPOST_1Request {
    /** 姓名，护照或其他必传 */
    certificateName?: string
    /** 证件号码，护照或其他必传 */
    certificateNo?: string
    /** 证件类型，1身份证（默认），2护照，3其他 */
    certificateType?: number
    /** 是否强制绑定，第一次为false */
    force?: boolean
    /** 身份证反面水印图，身份证必传 */
    idcardBack?: string
    /** 身份证反面，原图 */
    idcardBackOriginal?: string
    /** 身份证正面水印图/护照/其他证件附件 */
    idcardFront?: string
    /** 身份证正面，原图 */
    idcardFrontOriginal?: string
    /** 补充说明 */
    remark?: string
}

/**
 * requestUrl /auth/user/v1/bind_id_card
 * method post
 */
export interface BindIdcardUsingPOST_1Response {
    /** 响应数据 */
    data?: number
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user/v1/bind_id_card/php
 * method post
 */
export interface BindIdcardPhpUsingPOSTRequest {
    /** 姓名，护照或其他必传 */
    certificateName?: string
    /** 证件号码，护照或其他必传 */
    certificateNo?: string
    /** 证件类型，1身份证（默认），2护照，3其他 */
    certificateType?: number
    /** 是否强制绑定，第一次为false */
    force?: boolean
    /** 身份证反面水印图，身份证必传 */
    idcardBack?: string
    /** 身份证反面，原图 */
    idcardBackOriginal?: string
    /** 身份证正面水印图/护照/其他证件附件 */
    idcardFront?: string
    /** 身份证正面，原图 */
    idcardFrontOriginal?: string
    /** 补充说明 */
    remark?: string
}

/**
 * requestUrl /auth/user/v1/bind_id_card/php
 * method post
 */
export interface BindIdcardPhpUsingPOSTResponse {
    /** 响应数据 */
    data?: number
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user/v1/bind_idcard_unvalid
 * method post
 */
export interface BindIdCardUnValidUsingPOSTRequest {
    /** 操作人code */
    operatorCode?: string
    /** sid */
    sid?: number
    /** 用户code */
    userCode?: string
    /** 手机号或身份证号 */
    userIdentify?: string
}

/**
 * requestUrl /auth/user/v1/bind_idcard_unvalid
 * method post
 */
export interface BindIdCardUnValidUsingPOSTResponse {
    /** 响应数据 */
    data?: string
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user/v1/bind_mobile
 * method post
 */
export interface BindMobileUsingPOSTRequest {
    /** 手机号 */
    mobile: string
    /** 新手机换绑验证码的随机key */
    newRandomKey?: string
    /** 上一步验证码随机key，换绑必填 */
    preRandomKey?: string
    /** 验证码随机key */
    randomKey: string
    /** 验证码 */
    verifyCode: string
}

/**
 * requestUrl /auth/user/v1/bind_mobile
 * method post
 */
export interface BindMobileUsingPOSTResponse {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user/v1/bind_mobile_unvalid
 * method post
 */
export interface BindMobileUnValidUsingPOSTRequest {
    /** 操作人code */
    operatorCode?: string
    /** sid */
    sid?: number
    /** 用户code */
    userCode?: string
    /** 手机号或身份证号 */
    userIdentify?: string
}

/**
 * requestUrl /auth/user/v1/bind_mobile_unvalid
 * method post
 */
export interface BindMobileUnValidUsingPOSTResponse {
    /** 响应数据 */
    data?: string
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user/v1/certificate_info/{certificate_type}
 * method get
 */
export interface CertificateInfoUsingGET_1Response {
    /** 响应数据 */
    data?: UserCertificateDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 身份证二要素校验结果返回参数 {
    /** 地区code */
    area?: string
    /** 城市code */
    city?: string
    /** 唯一编码 */
    code?: string
    /** 验证成功/身份证校验失败 */
    message?: string
    /** 省份code */
    province?: string
    /** 校验结果：SUCCESS/ERROR */
    result?: string
    /** 性别 1男 2女 */
    sex?: number
    /**  */
    success?: boolean
}

/**
 * requestUrl /auth/user/v1/certify_id_card
 * method post
 */
export interface CertifyIdCardUsingPOSTRequest {
    /** 身份证号 */
    idCard?: string
    /** 姓名 */
    name?: string
}

/**
 * requestUrl /auth/user/v1/certify_id_card
 * method post
 */
export interface CertifyIdCardUsingPOSTResponse {
    /** 响应数据 */
    data?: 身份证二要素校验结果返回参数
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 校验token获取sid返回报文 {
    /** 是否合法token */
    isValid?: boolean
    /** sid */
    sid?: number
    /** userCode */
    userCode?: string
}

/**
 * requestUrl /auth/user/v1/check_token_get_sid
 * method post
 */
export interface CheckTokenGetSidUsingPOSTRequest {
    /** socket地址 */
    socketPath: string
    /** token */
    token: string
}

/**
 * requestUrl /auth/user/v1/check_token_get_sid
 * method post
 */
export interface CheckTokenGetSidUsingPOSTResponse {
    /** 响应数据 */
    data?: 校验token获取sid返回报文
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 用户信息数据 {
    /** 审核状态 0 待审核  1 认证通过 2 认证不通过 */
    auditStatus?: number
    /** 头像 */
    avatar?: string
    /** 证件类型，1身份证，2护照，3其他 */
    certificateType?: number
    /** 编码 */
    code?: string
    /** 创建时间 */
    createdAt?: number
    /** 邮箱，空字符串代表没有绑定过邮箱 */
    email?: string
    /** 激活状态，0未激活1已激活 */
    enable?: number
    /** 性别，男1 女2 */
    gender?: number
    /** 身份证号or护照号or其他证件号，空字符串代表没有绑定过 */
    idCardNo?: string
    /** 是否初始密码，1是，0不是，代表是否设置过密码 */
    isInitPassword?: boolean
    /** 是否身份证号or护照号or其他证件号 */
    isValidateIdCard?: boolean
    /** 是否验证手机号 */
    isValidatePhone?: boolean
    /** 已加入天数 */
    joinedDay?: number
    /** 最近登录时间 */
    lastLoginTs?: number
    /** 最近选择机构编码 */
    lastOrganizationCode?: string
    /** 手机号 */
    mobile?: string
    /** 姓名 */
    name?: string
    /** 昵称 */
    nickname?: string
    /** 站点 */
    sid?: number
    /** 用户名 */
    username?: string
}

/**
 * requestUrl /auth/user/v1/complex_register
 * method post
 */
export interface ComplexRegisterUsingPOSTRequest {
    /** 用户第三方应用唯一标识 */
    authOpenId?: string
    /** 授权类型,wx:微信;dd:钉钉 */
    authType?: string
    /** 证件类型 1身份证，2护照，3其他 默认是 1 */
    certificateType?: number
    /** 用户组 */
    groupId: number
    /** 身份号码 */
    idCardNo: string
    /** 身份 1课程资源方  2 题库资源方 3自有课平台方 4直播培训平台方 */
    identity?: number
    /** 手机号 */
    mobile: string
    /** 上一步验证码随机key，存在前置校验必填 */
    preRandomKey?: string
    /** 随机key，同一生命周期key不变 */
    randomKey: string
    /** 用户的真实姓名 */
    realName: string
    /** 站点id */
    sid: number
    /** 验证码 */
    verifyCode: string
}

/**
 * requestUrl /auth/user/v1/complex_register
 * method post
 */
export interface ComplexRegisterUsingPOSTResponse {
    /** 响应数据 */
    data?: 用户信息数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface sdk创建用户响应数据 {
    /** 用户编码 */
    userCode?: string
}

/**
 * requestUrl /auth/user/v1/create
 * method post
 */
export interface CreateUserUsingPOSTRequest {
    /** 授权类型:单点登录格式为前缀sso_+字符串,如职培拼接站点值sso_zp_1001 */
    authType?: string
    /** 头像 */
    avatar?: string
    /** 证件类型，1身份证，2护照，3其他 4 账号 */
    certificateType?: number
    /** 所属用户组id */
    groupList?: any[]
    /** 身份证/护照/其他证件号，证件号码8-25位 */
    idCard?: string
    /** 是否需要二要素验证 默认需要 */
    ifElementsCertify?: boolean
    /** 是否已实名认证 */
    isCertify?: boolean
    /** 是否初始密码 0是 1不是 */
    isInitPassword?: boolean
    /** 手机号 */
    mobile?: string
    /** 姓名 */
    name?: string
    /** 第三方平台openId,同一授权类型下每个用户此值唯一 */
    openId?: string
    /** 操作人 */
    operator?: string
    /** 密码 */
    password?: string
    /** 加密公钥 */
    publicKey?: string
    /** 站点id */
    sid: number
    /** 来源 */
    source: number
    /** 账号 */
    username?: string
}

/**
 * requestUrl /auth/user/v1/create
 * method post
 */
export interface CreateUserUsingPOSTResponse {
    /** 响应数据 */
    data?: sdk创建用户响应数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user/v1/create/element
 * method post
 */
export interface CreateUserWithElementUsingPOSTRequest {
    /** 授权类型:单点登录格式为前缀sso_+字符串,如职培拼接站点值sso_zp_1001 */
    authType?: string
    /** 头像 */
    avatar?: string
    /** 证件类型，1身份证，2护照，3其他 4 账号 */
    certificateType?: number
    /** 所属用户组id */
    groupList?: any[]
    /** 身份证/护照/其他证件号，证件号码8-25位 */
    idCard?: string
    /** 是否需要二要素验证 默认需要 */
    ifElementsCertify?: boolean
    /** 是否已实名认证 */
    isCertify?: boolean
    /** 是否初始密码 0是 1不是 */
    isInitPassword?: boolean
    /** 手机号 */
    mobile?: string
    /** 姓名 */
    name?: string
    /** 第三方平台openId,同一授权类型下每个用户此值唯一 */
    openId?: string
    /** 操作人 */
    operator?: string
    /** 密码 */
    password?: string
    /** 加密公钥 */
    publicKey?: string
    /** 站点id */
    sid: number
    /** 来源 */
    source: number
    /** 账号 */
    username?: string
}

/**
 * requestUrl /auth/user/v1/create/element
 * method post
 */
export interface CreateUserWithElementUsingPOSTResponse {
    /** 响应数据 */
    data?: sdk创建用户响应数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface UserDto {
    /** 头像 */
    avatar?: string
    /** 编码 */
    code?: string
    /** 创建时间 */
    createdAt?: number
    /** 创建人 */
    createdBy?: string
    /** 是否删除 */
    deleted?: boolean
    /** 邮箱 */
    email?: string
    /** 激活状态，0未激活1已激活 */
    enable?: number
    /** 性别，男1 女2 */
    gender?: number
    /**  */
    groupList?: 用户组响应数据
    /** 身份证号 */
    idCardNo?: string
    /** 是否初始密码 0是 1不是 */
    isInitPassword?: boolean
    /** 是否验证身份证号 */
    isValidateIdCard?: boolean
    /** 是否验证手机号 */
    isValidatePhone?: boolean
    /** 最近登录失败时间 */
    lastLoginFailureTs?: number
    /** 最近登录时间 */
    lastLoginTs?: number
    /** 登录失败次数 */
    loginFailureCount?: number
    /** 手机号 */
    mobile?: string
    /** 姓名 */
    name?: string
    /** 昵称 */
    nickname?: string
    /** 密码 */
    password?: string
    /** 职培密码 */
    passwordCareer?: string
    /** 站点 */
    sid?: number
    /** 来源 */
    source?: number
    /** 状态0正常1禁用 */
    status?: number
    /** 更新时间 */
    updatedAt?: number
    /** 更新人 */
    updatedBy?: string
    /** 用户名 */
    username?: string
}

/**
 * requestUrl /auth/user/v1/create_relation_user
 * method post
 */
export interface CreateOrRelationUserUsingPOSTRequest {
    /** 授权类型:单点登录格式为前缀sso_+字符串,如职培拼接站点值sso_zp_1001 */
    authType?: string
    /** 头像 */
    avatar?: string
    /** 证件类型，1身份证，2护照，3其他 4 账号 */
    certificateType?: number
    /** 所属用户组id */
    groupList?: any[]
    /** 身份证/护照/其他证件号，证件号码8-25位 */
    idCard?: string
    /** 是否需要二要素验证 默认需要 */
    ifElementsCertify?: boolean
    /** 是否已实名认证 */
    isCertify?: boolean
    /** 是否初始密码 0是 1不是 */
    isInitPassword?: boolean
    /** 手机号 */
    mobile?: string
    /** 姓名 */
    name?: string
    /** 第三方平台openId,同一授权类型下每个用户此值唯一 */
    openId?: string
    /** 操作人 */
    operator?: string
    /** 密码 */
    password?: string
    /** 加密公钥 */
    publicKey?: string
    /** 站点id */
    sid: number
    /** 来源 */
    source: number
    /** 账号 */
    username?: string
}

/**
 * requestUrl /auth/user/v1/create_relation_user
 * method post
 */
export interface CreateOrRelationUserUsingPOSTResponse {
    /** 响应数据 */
    data?: UserDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user/v1/get_by_idcard
 * method post
 */
export interface GetByIdCardUsingPOSTRequest {
    /** 操作人code */
    operatorCode?: string
    /** sid */
    sid?: number
    /** 用户code */
    userCode?: string
    /** 手机号或身份证号 */
    userIdentify?: string
}

/**
 * requestUrl /auth/user/v1/get_by_idcard
 * method post
 */
export interface GetByIdCardUsingPOSTResponse {
    /** 响应数据 */
    data?: 用户信息数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user/v1/get_by_mobile
 * method post
 */
export interface GetByMobileUsingPOSTRequest {
    /** 操作人code */
    operatorCode?: string
    /** sid */
    sid?: number
    /** 用户code */
    userCode?: string
    /** 手机号或身份证号 */
    userIdentify?: string
}

/**
 * requestUrl /auth/user/v1/get_by_mobile
 * method post
 */
export interface GetByMobileUsingPOSTResponse {
    /** 响应数据 */
    data?: 用户信息数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user/v1/group_list
 * method get
 */
export interface GroupListUsingGETResponse {
    /** 响应数据 */
    data?: 用户组响应数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user/v1/id_card_info
 * method get
 */
export interface IdCardInfoUsingGET_1Response {
    /** 响应数据 */
    data?: UserCertificateDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user/v1/info
 * method get
 */
export interface QueryByCodeUsingGETResponse {
    /** 响应数据 */
    data?: 用户信息数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user/v1/info/all
 * method get
 */
export interface QueryByCodeAllInfoUsingGETResponse {
    /** 响应数据 */
    data?: 用户信息数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 用户信息所在机构信息 {
    /** 审核状态 0 待审核  1 认证通过 2 认证不通过 */
    auditStatus?: number
    /** 头像 */
    avatar?: string
    /** 证件类型，1身份证，2护照，3其他 */
    certificateType?: number
    /** 编码 */
    code?: string
    /** 创建时间 */
    createdAt?: number
    /** 邮箱，空字符串代表没有绑定过邮箱 */
    email?: string
    /** 激活状态，0未激活1已激活 */
    enable?: number
    /** 性别，男1 女2 */
    gender?: number
    /** 身份证号or护照号or其他证件号，空字符串代表没有绑定过 */
    idCardNo?: string
    /** 是否初始密码，1是，0不是，代表是否设置过密码 */
    isInitPassword?: boolean
    /** 是否身份证号or护照号or其他证件号 */
    isValidateIdCard?: boolean
    /** 是否验证手机号 */
    isValidatePhone?: boolean
    /** 已加入天数 */
    joinedDay?: number
    /** 最近登录时间 */
    lastLoginTs?: number
    /** 最近选择机构编码 */
    lastOrganizationCode?: string
    /** 手机号 */
    mobile?: string
    /** 姓名 */
    name?: string
    /** 昵称 */
    nickname?: string
    /** 机构信息 */
    organization?: 我的机构
    /** 站点 */
    sid?: number
    /** 用户名 */
    username?: string
}

/**
 * requestUrl /auth/user/v1/info/{organizationCode}
 * method get
 */
export interface QueryByOrganizationUsingGETResponse {
    /** 响应数据 */
    data?: 用户信息所在机构信息
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user/v1/info_all
 * method get
 */
export interface QueryByCodeAllInfoUsingGET_1Response {
    /** 响应数据 */
    data?: 用户信息数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user/v1/login
 * method post
 */
export interface LoginUsingPOSTRequest {
    /** 手机号/身份证号，账号 */
    account: string
    /** 登录设备 */
    appKey: string
    /** 用户第三方应用唯一标识 */
    authOpenId?: string
    /** 授权类型,wx:微信;dd:钉钉 */
    authType?: string
    /** 密码 */
    password: string
    /** 加密公钥 */
    publicKey?: string
    /** 站点id */
    sid: number
    /** 类型，1个人，2机构，3资源方 */
    type: number
}

/**
 * requestUrl /auth/user/v1/login
 * method post
 */
export interface LoginUsingPOSTResponse {
    /** 响应数据 */
    data?: 登录响应数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRsp登录记录 {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: 登录记录
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

interface 登录记录 {
    /** 登录ip */
    ip?: string
    /** 登录时间 */
    loginTime?: number
    /** 终端，1PC网页，2小程序 */
    terminal?: number
    /** 终端描述，PC网页/小程序 */
    terminalDesc?: string
    /** 登录方式，1账号登录，2手机验证码 */
    type?: number
    /** 登录方式描述，账号登录/手机验证码 */
    typeDesc?: string
}

/**
 * requestUrl /auth/user/v1/login_log_list/{type}
 * method post
 */
export interface LoginLogListUsingPOSTRequest {
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
}

/**
 * requestUrl /auth/user/v1/login_log_list/{type}
 * method post
 */
export interface LoginLogListUsingPOSTResponse {
    /** 响应数据 */
    data?: BasePaginationRsp登录记录
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user/v1/logout
 * method get
 */
export interface LogoutUsingGETResponse {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user/v1/merchant_verify_register
 * method post
 */
export interface MerchantVerifyRegisterUsingPOSTRequest {
    /** 用户第三方应用唯一标识 */
    authOpenId?: string
    /** 授权类型,wx:微信;dd:钉钉 */
    authType?: string
    /** 用户组，12考生，146资源方 */
    groupId: number
    /** 身份id 1课程资源方  2 题库资源方 3自有课平台方 4直播培训平台方 */
    identity?: number
    /** 手机号 */
    mobile: string
    /** 随机key，同一生命周期key不变 */
    randomKey: string
    /** 站点id */
    sid: number
    /** 类型，1个人，2机构 3资源方 */
    type: number
    /** 验证码 */
    verifyCode: string
}

/**
 * requestUrl /auth/user/v1/merchant_verify_register
 * method post
 */
export interface MerchantVerifyRegisterUsingPOSTResponse {
    /** 响应数据 */
    data?: 登录响应数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user/v1/modify_base_info
 * method post
 */
export interface ModifyBaseInfoUsingPOSTRequest {
    /** 头像 */
    avatar?: string
    /** 昵称 */
    nickname?: string
}

/**
 * requestUrl /auth/user/v1/modify_base_info
 * method post
 */
export interface ModifyBaseInfoUsingPOSTResponse {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user/v1/modify_password
 * method post
 */
export interface ModifyPasswordUsingPOSTRequest {
    /** 旧密码 */
    oldPassword: string
    /** 新密码 */
    password: string
    /** 确认新密码 */
    passwordRepeat: string
    /** 加密公钥 */
    publicKey?: string
}

/**
 * requestUrl /auth/user/v1/modify_password
 * method post
 */
export interface ModifyPasswordUsingPOSTResponse {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user/v1/no_pwd_login
 * method post
 */
export interface NoPwdLoginUsingPOSTRequest {
    /** 账号 */
    account: string
    /** 登录设备,WEB代表PC网页、APPLET代表小程序 */
    appKey: string
    /** 站点id */
    sid: number
    /** 类型，1个人，2机构 */
    type: number
}

/**
 * requestUrl /auth/user/v1/no_pwd_login
 * method post
 */
export interface NoPwdLoginUsingPOSTResponse {
    /** 响应数据 */
    data?: 登录响应数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 身份证信息 {
    /** 住址 */
    address?: string
    /** 过期时间 */
    expiredTime?: string
    /** 姓名 */
    name?: string
    /** 身份证号码 */
    number?: string
}

/**
 * requestUrl /auth/user/v1/ocr_id_card
 * method post
 */
export interface OcrIdCardUsingPOSTRequest {
    /** 身份证反面 */
    idcardBack: string
    /** 身份证正面 */
    idcardFront: string
}

/**
 * requestUrl /auth/user/v1/ocr_id_card
 * method post
 */
export interface OcrIdCardUsingPOSTResponse {
    /** 响应数据 */
    data?: 身份证信息
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user/v1/organization_list
 * method get
 */
export interface OrganizationListUsingGETResponse {
    /** 响应数据 */
    data?: 我的机构
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user/v1/organization_register
 * method post
 */
export interface OrganizationRegisterUsingPOSTRequest {
    /** 用户第三方应用唯一标识 */
    authOpenId?: string
    /** 授权类型,wx:微信;dd:钉钉 */
    authType?: string
    /** 证件类型 1身份证，2护照，3其他 默认是 1 */
    certificateType?: number
    /** 用户组 */
    groupId: number
    /** 身份号码 */
    idCardNo: string
    /** 身份 1课程资源方  2 题库资源方 3自有课平台方 4直播培训平台方 */
    identity?: number
    /** 手机号 */
    mobile: string
    /** 上一步验证码随机key，存在前置校验必填 */
    preRandomKey?: string
    /** 随机key，同一生命周期key不变 */
    randomKey: string
    /** 用户的真实姓名 */
    realName: string
    /** 站点id */
    sid: number
    /** 验证码 */
    verifyCode: string
}

/**
 * requestUrl /auth/user/v1/organization_register
 * method post
 */
export interface OrganizationRegisterUsingPOSTResponse {
    /** 响应数据 */
    data?: 用户信息数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user/v1/pre_complex_register
 * method post
 */
export interface PreComplexRegisterUsingPOSTRequest {
    /** 注册手机号 */
    mobile: string
    /** 上一步验证码随机key，存在前置校验必填 */
    preRandomKey?: string
    /** 随机key */
    randomKey: string
    /** 站点Id */
    sid: number
    /** 验证码 */
    verifyCode: string
}

/**
 * requestUrl /auth/user/v1/pre_complex_register
 * method post
 */
export interface PreComplexRegisterUsingPOSTResponse {
    /** 响应数据 */
    data?: string
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user/v1/public_key
 * method get
 */
export interface GetPublicKeyUsingGETResponse {
    /** 响应数据 */
    data?: string
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user/v1/pwd_login
 * method post
 */
export interface PwdLoginUsingPOSTRequest {
    /** 账号 */
    account: string
    /** 登录设备,WEB代表PC网页、APPLET代表小程序 */
    appKey: string
    /** 密码 */
    password: string
    /** 站点id */
    sid: number
    /** 类型，1个人，2机构 */
    type: number
}

/**
 * requestUrl /auth/user/v1/pwd_login
 * method post
 */
export interface PwdLoginUsingPOSTResponse {
    /** 响应数据 */
    data?: 登录响应数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user/v1/query_by_codes
 * method post
 */
export interface QueryByCodesUsingPOSTRequest {
    /** 编码 */
    codeList?: any[]
}

/**
 * requestUrl /auth/user/v1/query_by_codes
 * method post
 */
export interface QueryByCodesUsingPOSTResponse {
    /** 响应数据 */
    data?: 用户信息数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 用户表 {
    /** 头像 */
    avatar?: string
    /** 证件类型，1身份证，2护照，3其他 */
    certificateType?: number
    /** 编码 */
    code?: string
    /** 创建时间 */
    createdAt?: number
    /** 创建人 */
    createdBy?: string
    /** 是否删除 */
    deleted?: boolean
    /** 邮箱 */
    email?: string
    /** 激活状态，0未激活1已激活 */
    enable?: number
    /** 性别，男1 女2 */
    gender?: number
    /**  */
    groupList?: 用户组
    /** 身份证号or护照号or其他证件号 */
    idCardNo?: string
    /** 是否初始密码 0是 1不是 */
    isInitPassword?: boolean
    /** 是否验证身份证号 */
    isValidateIdCard?: boolean
    /** 是否验证手机号 */
    isValidatePhone?: boolean
    /** 最近登录失败时间 */
    lastLoginFailureTs?: number
    /** 最近登录时间 */
    lastLoginTs?: number
    /** 登录失败次数 */
    loginFailureCount?: number
    /** 手机号 */
    mobile?: string
    /** 姓名 */
    name?: string
    /** 昵称 */
    nickname?: string
    /** 密码 */
    password?: string
    /** 职培密码 */
    passwordCareer?: string
    /** 站点 */
    sid?: number
    /** 来源 */
    source?: number
    /** 状态0正常1禁用 */
    status?: number
    /** 更新时间 */
    updatedAt?: number
    /** 更新人 */
    updatedBy?: string
    /** 用户名 */
    username?: string
}

interface 用户组 {
    /** 创建时间 */
    createdAt?: number
    /** 描述 */
    description?: string
    /** id */
    id?: number
    /** 名称 */
    name?: string
    /** 站点id */
    sid?: number
    /** 类型，1个人，2机构 */
    type?: number
    /** 跳转业务线url */
    url?: string
}

/**
 * requestUrl /auth/user/v1/register
 * method post
 */
export interface RegisterUsingPOSTRequest {
    /** 用户第三方应用唯一标识 */
    authOpenId?: string
    /** 授权类型,wx:微信;dd:钉钉 */
    authType?: string
    /** 用户组 */
    groupId: number
    /** 身份 1课程资源方  2 题库资源方 3自有课平台方 4直播培训平台方 */
    identity?: number
    /** 手机号 */
    mobile: string
    /** 密码 */
    password: string
    /** 确认密码 */
    passwordRepeat: string
    /** 上一步验证码随机key，存在前置校验必填 */
    preRandomKey?: string
    /** 加密公钥 */
    publicKey?: string
    /** 随机key，同一生命周期key不变 */
    randomKey: string
    /** 站点id */
    sid: number
    /** 验证码 */
    verifyCode: string
}

/**
 * requestUrl /auth/user/v1/register
 * method post
 */
export interface RegisterUsingPOSTResponse {
    /** 响应数据 */
    data?: 用户表
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user/v1/reset_password
 * method post
 */
export interface ChangePasswordUsingPOSTRequest {
    /** 手机号 */
    account: string
    /** 密码 */
    password: string
    /** 确认密码 */
    passwordRepeat: string
    /** 上一步验证码随机key，存在前置校验必填 */
    preRandomKey?: string
    /** 加密公钥 */
    publicKey?: string
    /** 验证码随机key */
    randomKey: string
    /** 站点id */
    sid: number
    /** 验证码 */
    verifyCode: string
}

/**
 * requestUrl /auth/user/v1/reset_password
 * method post
 */
export interface ChangePasswordUsingPOSTResponse {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user/v1/set_password
 * method post
 */
export interface SetPasswordUsingPOSTRequest {
    /** 密码 */
    password: string
    /** 确认密码 */
    passwordRepeat: string
    /** 加密公钥 */
    publicKey?: string
}

/**
 * requestUrl /auth/user/v1/set_password
 * method post
 */
export interface SetPasswordUsingPOSTResponse {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user/v1/temp/update_username
 * method post
 */
export interface UpdateUsernameUsingPOSTRequest {
    /** 用户编码 */
    userCode: string
    /** 账号 */
    username: string
}

/**
 * requestUrl /auth/user/v1/temp/update_username
 * method post
 */
export interface UpdateUsernameUsingPOSTResponse {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user/v1/update_choice_organization/{organizationCode}
 * method post
 */
export interface UpdateChoiceOrganizationUsingPOSTResponse {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user/v1/user_group_list/{userCode}
 * method get
 */
export interface UserGroupListUsingGETResponse {
    /** 响应数据 */
    data?: 用户组响应数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user/v1/user_info/sensitive/{userCode}
 * method get
 */
export interface GetUserInfoSensitiveUsingGETResponse {
    /** 响应数据 */
    data?: 用户信息数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user/v1/user_info/{userCode}
 * method get
 */
export interface GetUserInfoUsingGETResponse {
    /** 响应数据 */
    data?: 用户信息数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRsp用户信息数据 {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: 用户信息数据
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

/**
 * requestUrl /auth/user/v1/user_list
 * method post
 */
export interface GetUserListUsingPOSTRequest {
    /** 身份证号 */
    idCardNo?: string
    /** 手机号 */
    mobile?: string
    /** 姓名 */
    name?: string
    /** 排除的codeList */
    noCodes?: any[]
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 机构code */
    organizationCode?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
    /** 站点 */
    sid?: number
}

/**
 * requestUrl /auth/user/v1/user_list
 * method post
 */
export interface GetUserListUsingPOSTResponse {
    /** 响应数据 */
    data?: BasePaginationRsp用户信息数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user/v1/user_organization_list/{userCode}
 * method get
 */
export interface UserOrganizationListUsingGETResponse {
    /** 响应数据 */
    data?: 我的机构
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user/v1/verify_login
 * method post
 */
export interface VerifyLoginUsingPOSTRequest {
    /** 手机号 */
    account: string
    /** 登录设备,WEB代表PC网页、APPLET代表小程序 */
    appKey: string
    /** 用户第三方应用唯一标识 */
    authOpenId?: string
    /** 授权类型,wx:微信;dd:钉钉 */
    authType?: string
    /** 上一步验证码随机key，存在前置校验必填 */
    preRandomKey?: string
    /** 随机key，同一生命周期key不变，无前置校验必填 */
    randomKey?: string
    /** 站点id */
    sid: number
    /** 类型，1个人，2机构 */
    type: number
    /** 验证码 */
    verifyCode: string
}

/**
 * requestUrl /auth/user/v1/verify_login
 * method post
 */
export interface VerifyLoginUsingPOSTResponse {
    /** 响应数据 */
    data?: 登录响应数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user_group/add_user_group
 * method post
 */
export interface AddUserGroupUsingPOSTRequest {
    /** 用户组id */
    groupList: any[]
    /** 站点id */
    sid: number
    /** 用户编码 */
    userCode: string
}

/**
 * requestUrl /auth/user_group/add_user_group
 * method post
 */
export interface AddUserGroupUsingPOSTResponse {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user_group/create
 * method post
 */
export interface CreateUsingPOST_3Request {
    /** 描述 */
    description?: string
    /** 名称 */
    name: string
    /** 站点 */
    sid: number
    /** 类型  1个人 2机构 */
    type: number
    /** 跳转业务线url */
    url?: string
}

/**
 * requestUrl /auth/user_group/create
 * method post
 */
export interface CreateUsingPOST_3Response {
    /** 响应数据 */
    data?: number
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user_group/delete
 * method post
 */
export interface DeleteUsingPOST_2Request {
    /** id */
    id: number
}

/**
 * requestUrl /auth/user_group/delete
 * method post
 */
export interface DeleteUsingPOST_2Response {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user_group/delete_user_group
 * method post
 */
export interface DeleteUserGroupUsingPOSTRequest {
    /** 用户组id */
    groupList: any[]
    /** 用户编码 */
    userCode: string
}

/**
 * requestUrl /auth/user_group/delete_user_group
 * method post
 */
export interface DeleteUserGroupUsingPOSTResponse {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user_group/edit
 * method post
 */
export interface EditUsingPOST_6Request {
    /** 描述 */
    description?: string
    /** id */
    id: number
    /** 名称 */
    name: string
    /** 类型  1个人 2机构 */
    type: number
    /** 跳转业务线url */
    url?: string
}

/**
 * requestUrl /auth/user_group/edit
 * method post
 */
export interface EditUsingPOST_6Response {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user_group/group_list
 * method post
 */
export interface AddUserGroupUsingPOST_1Request {
    /** 用户组id */
    id?: number
    /** 站点id */
    sid?: number
    /** 用户类型 */
    type?: number
}

/**
 * requestUrl /auth/user_group/group_list
 * method post
 */
export interface AddUserGroupUsingPOST_1Response {
    /** 响应数据 */
    data?: 用户组响应数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user_group/remove_type_group
 * method post
 */
export interface RemoveUserTypeGroupRelationUsingPOSTRequest {
    /** 用户角色类型 */
    type?: number
    /** 用户编码 */
    userCode?: string
}

/**
 * requestUrl /auth/user_group/remove_type_group
 * method post
 */
export interface RemoveUserTypeGroupRelationUsingPOSTResponse {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user_identity/add_user_identity
 * method post
 */
export interface AddUserIdentityUsingPOSTRequest {
    /** 身份id   5学员 6讲师  7考务人员 */
    identity: number
    /** 用户编码  */
    userCode: string
}

/**
 * requestUrl /auth/user_identity/add_user_identity
 * method post
 */
export interface AddUserIdentityUsingPOSTResponse {
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user_identity/default_identity
 * method get
 */
export interface GetUserDefaultIdentityUsingGETResponse {
    /** 响应数据 */
    data?: IdentityDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user_identity/list
 * method get
 */
export interface GetUserIdentityUsingGETResponse {
    /** 响应数据 */
    data?: IdentityDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user_identity/set_default/{identity}
 * method post
 */
export interface SetUserDefaultIdentityUsingPOSTResponse {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface NormalFunctionMenuDto {
    /** 子菜单列表 */
    childMenuList?: NormalFunctionMenuDto
    /** 菜单id */
    id?: number
    /** 菜单名称 */
    name?: string
    /** 菜单路由 */
    route?: string
}

/**
 * requestUrl /auth/user_permission/normal_function_list
 * method post
 */
export interface GetNormalFunctionMenuListUsingPOSTRequest {
    /** 身份id */
    identity?: number
    /** 业务线类型 1平台  2职培 3考评  4职培 */
    type: number
    /** 用户编码 */
    userCode: string
}

/**
 * requestUrl /auth/user_permission/normal_function_list
 * method post
 */
export interface GetNormalFunctionMenuListUsingPOSTResponse {
    /** 响应数据 */
    data?: NormalFunctionMenuDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/user_permission/v1/tree
 * method post
 */
export interface PersonalPermissionTreeUsingPOSTRequest {
    /** 身份 */
    identity: number
    /** 业务线类型 1平台  2职培 3考评  4职培 */
    type: number
}

/**
 * requestUrl /auth/user_permission/v1/tree
 * method post
 */
export interface PersonalPermissionTreeUsingPOSTResponse {
    /** 响应数据 */
    data?: 角色权限响应数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/verify/send
 * method post
 */
export interface SendVerifyCodeUsingPOST_3Request {
    /** 手机号或者email */
    account?: string
    /** 随机key，同一生命周期key不变 */
    key?: string
    /** 站点id，找回密码时必传 */
    sid?: number
    /** 短信类型 0通用  1机构创建 5找回密码 */
    type?: number
}

/**
 * requestUrl /auth/verify/send
 * method post
 */
export interface SendVerifyCodeUsingPOST_3Response {
    /** 响应数据 */
    data?: string
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /auth/verify/validate
 * method post
 */
export interface ValidateVerifyCodeUsingPOST_1Request {
    /** 手机号或者email */
    account?: string
    /** 随机key，同一生命周期key不变 */
    key?: string
    /** 验证码 */
    verifyCode?: string
}

/**
 * requestUrl /auth/verify/validate
 * method post
 */
export interface ValidateVerifyCodeUsingPOST_1Response {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}
