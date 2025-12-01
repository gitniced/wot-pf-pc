
/**
 * 如果遇到bug，您可以钉钉搜索封东其或者给 fengdongqi@hzwotu.com 邮箱发邮件
 * 欢迎大家提 issue 或者 PR。
 * @title 沃土待办服务
 * @description 沃土待办服务是一个 Spring Boot项目
 * @version v1.0
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
 * requestUrl /todo/front/data/batch_create
 * method post
 */
export interface CreateUsingPOSTRequest {
  
}

/**
 * requestUrl /todo/front/data/batch_create
 * method post
 */
export interface CreateUsingPOSTResponse {
  
  /** 响应数据 */
  data?: ErrorListResultErrorData
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /todo/front/data/create
 * method post
 */
export interface CreateUsingPOST_1Request {
  
  /** code */
  code?: string
  /** 身份id */
  identityId?: number
  /** 月度新增数量 */
  monthCount?: number
  /** 名称 */
  name?: string
  /** 组织code */
  organizationCode?: string
  /** 站点 */
  sid?: number
  /** 总数量 */
  totalCount?: number
  /** 用户code */
  userCode?: string
}

/**
 * requestUrl /todo/front/data/create
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
 * requestUrl /todo/front/data/delete/{code}
 * method post
 */
export interface DeleteUsingPOSTRequest {
  
}

/**
 * requestUrl /todo/front/data/delete/{code}
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

interface 数据概览 {
  
  /** code */
  code?: string
  /** 身份id */
  identityId?: number
  /** 月度新增数量 */
  monthCount?: number
  /** 名称 */
  name?: string
  /** 组织code */
  organizationCode?: string
  /** 站点 */
  sid?: number
  /** 总数量 */
  totalCount?: number
  /** 用户code */
  userCode?: string
}

/**
 * requestUrl /todo/front/data/detail/{code}
 * method get
 */
export interface DetailUsingGETResponse {
  
  /** 响应数据 */
  data?: 数据概览
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /todo/front/data/update
 * method post
 */
export interface UpdateUsingPOSTRequest {
  
  /** code */
  code?: string
  /** 更新数量: 新增或减少 */
  totalCount?: number
}

/**
 * requestUrl /todo/front/data/update
 * method post
 */
export interface UpdateUsingPOSTResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface FunctionDto {
  
  /** 常用功能模块id */
  moduleId: number
  /** 常用功能名称 */
  moduleName: string
  /** 常用功能路由 */
  moduleRoute: string
}

/**
 * requestUrl /todo/front/normal_function/edit
 * method post
 */
export interface EditUsingPOSTRequest {
  
  /** 功能列表 */
  functionList?: FunctionDto
  /** 身份id */
  identityId: number
  /** 组织code */
  organizationCode?: string
  /** 站点id */
  sid: number
  /** 用户code */
  userCode: string
}

/**
 * requestUrl /todo/front/normal_function/edit
 * method post
 */
export interface EditUsingPOSTResponse {
  
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
 * requestUrl /todo/front/normal_function/edit_default
 * method post
 */
export interface EditDefaultUsingPOSTRequest {
  
  /** 功能列表 */
  functionList?: FunctionDto
  /** 身份id */
  identityId: number
  /** 用户code */
  userCode: string
}

/**
 * requestUrl /todo/front/normal_function/edit_default
 * method post
 */
export interface EditDefaultUsingPOSTResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface NormalFunctionResponseDto {
  
  /** 编码 */
  code?: string
  /** 身份id */
  identityId?: number
  /** 常用功能模块id */
  moduleId?: number
  /** 常用功能名称 */
  moduleName?: string
  /** 常用功能路由 */
  moduleRoute?: string
  /** 组织code */
  organizationCode?: string
  /** 站点 */
  sid?: number
  /** 用户code */
  userCode?: string
}

/**
 * requestUrl /todo/front/normal_function/list
 * method post
 */
export interface ListUsingPOSTRequest {
  
  /** 身份id */
  identityId: number
  /** 组织code */
  organizationCode?: string
  /** 站点id */
  sid: number
  /** 用户code */
  userCode: string
}

/**
 * requestUrl /todo/front/normal_function/list
 * method post
 */
export interface ListUsingPOSTResponse {
  
  /** 响应数据 */
  data?: NormalFunctionResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /todo/front/schedule/batch_create
 * method post
 */
export interface CreateUsingPOST_2Request {
  
}

/**
 * requestUrl /todo/front/schedule/batch_create
 * method post
 */
export interface CreateUsingPOST_2Response {
  
  /** 响应数据 */
  data?: ErrorListResultErrorData
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /todo/front/schedule/create
 * method post
 */
export interface CreateUsingPOST_3Request {
  
  /** 统计值 */
  code?: string
  /** 日程内容 */
  content?: string
  /** 结束时间 */
  endTime?: number
  /** 身份id */
  identityId?: number
  /** 日程类型 */
  name?: string
  /** 组织code */
  organizationCode?: string
  /** 站点 */
  sid?: number
  /** 开始时间 */
  startTime?: number
  /** 用户code */
  userCode?: string
  /** 是否为全天 */
  wholeDay?: boolean
}

/**
 * requestUrl /todo/front/schedule/create
 * method post
 */
export interface CreateUsingPOST_3Response {
  
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
 * requestUrl /todo/front/schedule/delete/{code}
 * method post
 */
export interface DeleteUsingPOST_1Request {
  
}

/**
 * requestUrl /todo/front/schedule/delete/{code}
 * method post
 */
export interface DeleteUsingPOST_1Response {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 我的日程 {
  
  /** 统计值 */
  code?: string
  /** 日程内容 */
  content?: string
  /** 结束时间 */
  endTime?: number
  /** 身份id */
  identityId?: number
  /** 日程类型 */
  name?: string
  /** 组织code */
  organizationCode?: string
  /** 站点 */
  sid?: number
  /** 开始时间 */
  startTime?: number
  /** 用户code */
  userCode?: string
  /** 是否为全天 */
  wholeDay?: boolean
}

/**
 * requestUrl /todo/front/schedule/detail/{code}
 * method get
 */
export interface DetailUsingGET_1Response {
  
  /** 响应数据 */
  data?: 我的日程
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /todo/front/aliasCode/update
 * method post
 */
export interface UpdateByAliasCodeUsingPOSTRequest {
  
  /** 别名code */
  aliasCode?: string
  /** code */
  code?: string
  /** 待办事项内容 */
  content?: string
  /** 身份id */
  identityId?: number
  /** 待办事项名称 */
  name?: string
  /** 组织code */
  organizationCode?: string
  /** 跳转链接 */
  redirectUrl?: string
  /** 站点 */
  sid?: number
  /** 待办事项状态 0待办 1已完成 */
  status?: number
  /** 用户code */
  userCode?: string
}

/**
 * requestUrl /todo/front/aliasCode/update
 * method post
 */
export interface UpdateByAliasCodeUsingPOSTResponse {
  
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
 * requestUrl /todo/front/batch_create
 * method post
 */
export interface CreateUsingPOST_4Request {
  
}

/**
 * requestUrl /todo/front/batch_create
 * method post
 */
export interface CreateUsingPOST_4Response {
  
  /** 响应数据 */
  data?: ErrorListResultErrorData
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /todo/front/create
 * method post
 */
export interface CreateUsingPOST_5Request {
  
  /** 别名code */
  aliasCode?: string
  /** code */
  code?: string
  /** 待办事项内容 */
  content?: string
  /** 身份id */
  identityId?: number
  /** 待办事项名称 */
  name?: string
  /** 组织code */
  organizationCode?: string
  /** 跳转链接 */
  redirectUrl?: string
  /** 站点 */
  sid?: number
  /** 待办事项状态 0待办 1已完成 */
  status?: number
  /** 用户code */
  userCode?: string
}

/**
 * requestUrl /todo/front/create
 * method post
 */
export interface CreateUsingPOST_5Response {
  
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
 * requestUrl /todo/front/delete/{code}
 * method post
 */
export interface DeleteUsingPOST_2Request {
  
}

/**
 * requestUrl /todo/front/delete/{code}
 * method post
 */
export interface DeleteUsingPOST_2Response {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 待办事项detail {
  
  /** 别名code */
  aliasCode?: string
  /** code */
  code?: string
  /** 待办事项内容 */
  content?: string
  /** 身份id */
  identityId?: number
  /** 待办事项名称 */
  name?: string
  /** 组织code */
  organizationCode?: string
  /** 跳转链接 */
  redirectUrl?: string
  /** 站点 */
  sid?: number
  /** 待办事项状态 0待办 1已完成 */
  status?: number
  /** 用户code */
  userCode?: string
}

/**
 * requestUrl /todo/front/detail/{code}
 * method get
 */
export interface DetailUsingGET_2Response {
  
  /** 响应数据 */
  data?: 待办事项detail
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /todo/front/list
 * method post
 */
export interface ListUsingPOST_1Request {
  
  /** 别名列表 */
  aliasCodeList?: any[]
  /** 待办code列表 */
  codeList?: any[]
  /** 创建结束时间 */
  createDateEnd?: number
  /** 创建开始时间 */
  createDateStart?: number
  /** 查询数据是否删除 默认查询不删除数据 */
  deleted?: boolean
  /** 机构code列表 */
  orgCodeList?: any[]
  /** 站点id列表的 */
  sidList?: any[]
  /** 待办状态列表 */
  statusList?: any[]
  /** 用户code列表 */
  userCodeList?: any[]
}

/**
 * requestUrl /todo/front/list
 * method post
 */
export interface ListUsingPOST_1Response {
  
  /** 响应数据 */
  data?: 待办事项detail
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /todo/front/update
 * method post
 */
export interface UpdateUsingPOST_1Request {
  
  /** 别名code */
  aliasCode?: string
  /** code */
  code?: string
  /** 待办事项内容 */
  content?: string
  /** 身份id */
  identityId?: number
  /** 待办事项名称 */
  name?: string
  /** 组织code */
  organizationCode?: string
  /** 跳转链接 */
  redirectUrl?: string
  /** 站点 */
  sid?: number
  /** 待办事项状态 0待办 1已完成 */
  status?: number
  /** 用户code */
  userCode?: string
}

/**
 * requestUrl /todo/front/update
 * method post
 */
export interface UpdateUsingPOST_1Response {
  
  /** 响应数据 */
  data?: string
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}