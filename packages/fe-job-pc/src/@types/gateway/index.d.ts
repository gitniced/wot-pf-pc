
/**
 * 如果遇到bug，您可以钉钉搜索封东其或者给 fengdongqi@hzwotu.com 邮箱发邮件
 * 欢迎大家提 issue 或者 PR。
 * @title 沃土网关服务
 * @description 沃土网关服务是一个 Spring Boot项目
 * @version v1.0
 **/


/**
 * requestUrl /captcha/ticket/validate
 * method post
 */
export interface ValidateCaptchaUsingPOSTRequest {
  
  /** 前端回调函数返回的随机字符串 */
  randstr: string
  /** 票据 */
  ticket: string
}

/**
 * requestUrl /captcha/ticket/validate
 * method post
 */
export interface ValidateCaptchaUsingPOSTResponse {
  
  /** 响应数据 */
  data: Record<string | number | symbol, any>
  /** 响应消息 */
  message: string
  /** 响应消息编码 */
  messageCode: string
  /** 是否成功 */
  success: boolean
}

/**
 * requestUrl /chuhe/permission/authz
 * method post
 */
export interface RolePermissionAuthzUsingPOSTRequest {
  
  /** api路由地址 */
  apiRoute?: string
}

/**
 * requestUrl /chuhe/permission/authz
 * method post
 */
export interface RolePermissionAuthzUsingPOSTResponse {
  
  /** 响应数据 */
  data: Record<string | number | symbol, any>
  /** 响应消息 */
  message: string
  /** 响应消息编码 */
  messageCode: string
  /** 是否成功 */
  success: boolean
}

/**
 * requestUrl /swagger-resources
 * method get
 */
export interface SwaggerResourcesUsingGETResponse {
  
}