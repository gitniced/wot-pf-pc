
/**
 * 如果遇到bug，您可以钉钉搜索封东其或者给 fengdongqi@hzwotu.com 邮箱发邮件
 * 欢迎大家提 issue 或者 PR。
 * @title 沃土AI服务
 * @description 沃土AI服务是一个 Spring Boot项目
 * @version v1.0
 **/


interface ChatPageResDto {
  
  /** 对话内容 */
  content?: string
  /** 创建时间 */
  createdAt?: number
  /** 对话角色 */
  messageRole?: string
  /** 一问一答同一code */
  messageSerialnumber?: string
  /** 当前提问序号 */
  orderid?: number
  /** 对话code */
  recordCode?: string
}

/**
 * requestUrl /ai/front/page
 * method post
 */
export interface PageUsingPOSTRequest {
  
  /** 会话code */
  sessionCode: string
}

/**
 * requestUrl /ai/front/page
 * method post
 */
export interface PageUsingPOSTResponse {
  
  /** 响应数据 */
  data?: ChatPageResDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface ChatSendResDto {
  
  /** 一问一答同一code */
  messageSerialnumber?: string
  /** 对话code */
  recordCode?: string
  /** 会话code */
  sessionCode?: string
}

/**
 * requestUrl /ai/front/send
 * method post
 */
export interface SendMessageUsingPOSTRequest {
  
  /** 对话内容 */
  content: string
  /** 无数量限制模式 */
  isNoLimit?: boolean
  /** 会话code */
  sessionCode?: string
  /** 模版code */
  templateCode?: string
}

/**
 * requestUrl /ai/front/send
 * method post
 */
export interface SendMessageUsingPOSTResponse {
  
  /** 响应数据 */
  data?: ChatSendResDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspTemplatePageResDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: TemplatePageResDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface TemplatePageResDto {
  
  /** 模版内容 */
  content?: string
  /** 模版code */
  templateCode?: string
  /** 模版标题 */
  title?: string
}

/**
 * requestUrl /ai/front/template/page
 * method post
 */
export interface TemplatePageUsingPOSTRequest {
  
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
 * requestUrl /ai/front/template/page
 * method post
 */
export interface TemplatePageUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspTemplatePageResDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspSessionPageResDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: SessionPageResDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface SessionPageResDto {
  
  /** 创建时间 */
  createdAt?: number
  /** 会话code */
  sessionCode?: string
  /** 会话标题 */
  title?: string
}

/**
 * requestUrl /ai/front/session/page
 * method post
 */
export interface PageUsingPOST_1Request {
  
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
 * requestUrl /ai/front/session/page
 * method post
 */
export interface PageUsingPOST_1Response {
  
  /** 响应数据 */
  data?: BasePaginationRspSessionPageResDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}