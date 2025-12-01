
/**
 * 如果遇到bug，您可以钉钉搜索封东其或者给 fengdongqi@hzwotu.com 邮箱发邮件
 * 欢迎大家提 issue 或者 PR。
 * @title 表单API文档
 * @description 表单是一个 Spring Boot项目
 * @version v1.0
 **/


/**
 * requestUrl /form/v1.2/check_alias
 * method post
 */
export interface CheckAliasUsingPOSTRequest {
  
  /** 别名 */
  alias?: string
  /** 编码,编辑时必传 */
  code?: string
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
 * requestUrl /form/v1.2/check_alias
 * method post
 */
export interface CheckAliasUsingPOSTResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 表单字段数据 {
  
  /** 别名 */
  alias?: string
  /** 编码 */
  code?: string
  /** 自定义排序 */
  customSort?: number
  /** 自定义字段属性json类型 */
  property?: Record<string | number | symbol, any>
  /** 名称 */
  title?: string
  /** 字段类型，text,customerName,orderDetail */
  type?: string
}

/**
 * requestUrl /form/v1.2/create
 * method post
 */
export interface CreateUsingPOSTRequest {
  
  /** 别名 */
  alias?: string
  /** 表单分类，推荐位RECOMMEND，合同CONTRACT */
  category?: string
  /** 编码,更新时必传 */
  code?: string
  /** 字段列表 */
  fieldList?: 表单字段数据
  /** 表单名称 */
  name?: string
  /** 备注 */
  remark?: string
  /** 站点 */
  sid?: number
  /** 状态0正常1禁用 */
  status?: number
}

/**
 * requestUrl /form/v1.2/create
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
 * requestUrl /form/v1.2/delete/{code}
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

interface 表单详情数据 {
  
  /** 别名 */
  alias?: string
  /** 表单分类，推荐位RECOMMEND，合同CONTRACT */
  category?: string
  /** 编码,更新时必传 */
  code?: string
  /** 字段列表 */
  fieldList?: 表单字段数据
  /** 表单名称 */
  name?: string
  /** 备注 */
  remark?: string
  /** 站点 */
  sid?: number
  /** 状态0正常1禁用 */
  status?: number
}

/**
 * requestUrl /form/v1.2/detail/{code}
 * method get
 */
export interface DetailUsingGETResponse {
  
  /** 响应数据 */
  data?: 表单详情数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /form/v1.2/modify
 * method post
 */
export interface SaveUsingPOSTRequest {
  
  /** 别名 */
  alias?: string
  /** 表单分类，推荐位RECOMMEND，合同CONTRACT */
  category?: string
  /** 编码,更新时必传 */
  code?: string
  /** 字段列表 */
  fieldList?: 表单字段数据
  /** 表单名称 */
  name?: string
  /** 备注 */
  remark?: string
  /** 站点 */
  sid?: number
  /** 状态0正常1禁用 */
  status?: number
}

/**
 * requestUrl /form/v1.2/modify
 * method post
 */
export interface SaveUsingPOSTResponse {
  
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
 * requestUrl /form/v1.2/modify_status
 * method post
 */
export interface RoleModifyStatusUsingPOSTRequest {
  
  /** 编码 */
  code?: string
  /** 状态0正常1禁用 */
  status?: number
}

/**
 * requestUrl /form/v1.2/modify_status
 * method post
 */
export interface RoleModifyStatusUsingPOSTResponse {
  
  /** 响应数据 */
  data?: Record<string | number | symbol, any>
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRsp表单分页响应体 {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: 表单分页响应体
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface 表单分页响应体 {
  
  /** 别名 */
  alias?: string
  /** 表单分类，推荐位RECOMMEND，合同CONTRACT */
  category?: string
  /** 编码 */
  code?: string
  /** 表单名称 */
  name?: string
  /** 站点 */
  sid?: number
  /**  */
  sname?: string
  /** 状态0正常1禁用 */
  status?: number
}

/**
 * requestUrl /form/v1.2/page
 * method post
 */
export interface PageUsingPOSTRequest {
  
  /** 别名 */
  alias?: string
  /** 表单名称 */
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
}

/**
 * requestUrl /form/v1.2/page
 * method post
 */
export interface PageUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRsp表单分页响应体
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /form/front/v1.2/detail/{code}
 * method get
 */
export interface DetailUsingGET_1Response {
  
  /** 响应数据 */
  data?: 表单详情数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /form/recommend/create
 * method post
 */
export interface CreateUsingPOST_1Request {
  
  /** 编码，编辑时必传 */
  code?: string
  /** 自定义字段内容 */
  customContent?: Record<string | number | symbol, any>
  /** 表单编码 */
  formCode?: string
  /** 排序 */
  sort?: number
}

/**
 * requestUrl /form/recommend/create
 * method post
 */
export interface CreateUsingPOST_1Response {
  
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
 * requestUrl /form/recommend/delete/{code}
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

interface 推荐位详情 {
  
  /** 编码 */
  code?: string
  /** 自定义字段内容 */
  customContent?: Record<string | number | symbol, any>
  /** 表单编码 */
  formCode?: string
  /** 排序 */
  sort?: number
  /** 状态0正常1禁用 */
  status?: number
}

/**
 * requestUrl /form/recommend/detail/{code}
 * method get
 */
export interface DetailUsingGET_2Response {
  
  /** 响应数据 */
  data?: 推荐位详情
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /form/recommend/detail_by_sid/{sid}
 * method get
 */
export interface DetailBySidUsingGETResponse {
  
  /** 响应数据 */
  data?: 推荐位详情
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /form/recommend/flush
 * method get
 */
export interface FlushUsingGETResponse {
  
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
 * requestUrl /form/recommend/list_by_sid/{sid}
 * method get
 */
export interface ListBySidUsingGETResponse {
  
  /** 响应数据 */
  data?: 推荐位详情
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /form/recommend/modify
 * method post
 */
export interface ModifyUsingPOSTRequest {
  
  /** 编码，编辑时必传 */
  code?: string
  /** 自定义字段内容 */
  customContent?: Record<string | number | symbol, any>
  /** 表单编码 */
  formCode?: string
  /** 排序 */
  sort?: number
}

/**
 * requestUrl /form/recommend/modify
 * method post
 */
export interface ModifyUsingPOSTResponse {
  
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
 * requestUrl /form/recommend/modify_sort
 * method post
 */
export interface ModifySortUsingPOSTRequest {
  
  /** 编码 */
  code?: string
  /** 排序 */
  sort?: number
}

/**
 * requestUrl /form/recommend/modify_sort
 * method post
 */
export interface ModifySortUsingPOSTResponse {
  
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
 * requestUrl /form/recommend/modify_status
 * method post
 */
export interface RoleModifyStatusUsingPOST_1Request {
  
  /** 编码 */
  code?: string
  /** 状态0正常1禁用 */
  status?: number
}

/**
 * requestUrl /form/recommend/modify_status
 * method post
 */
export interface RoleModifyStatusUsingPOST_1Response {
  
  /** 响应数据 */
  data?: Record<string | number | symbol, any>
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRsp推荐位详情 {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: 推荐位详情
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

/**
 * requestUrl /form/recommend/page
 * method post
 */
export interface PageUsingPOST_1Request {
  
  /** 表单别名 */
  formAlias?: string
  /** 表单编码 */
  formCode?: string
  /** 身份id列表 */
  identitys?: any[]
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
  /** 状态 */
  status?: number
}

/**
 * requestUrl /form/recommend/page
 * method post
 */
export interface PageUsingPOST_1Response {
  
  /** 响应数据 */
  data?: BasePaginationRsp推荐位详情
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /form/front/recommend/page
 * method post
 */
export interface PageUsingPOST_2Request {
  
  /** 表单别名 */
  formAlias?: string
  /** 表单编码 */
  formCode?: string
  /** 身份id列表 */
  identitys?: any[]
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
  /** 状态 */
  status?: number
}

/**
 * requestUrl /form/front/recommend/page
 * method post
 */
export interface PageUsingPOST_2Response {
  
  /** 响应数据 */
  data?: BasePaginationRsp推荐位详情
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}