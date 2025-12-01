
/**
 * 如果遇到bug，您可以钉钉搜索封东其或者给 fengdongqi@hzwotu.com 邮箱发邮件
 * 欢迎大家提 issue 或者 PR。
 * @title 沃土ocr识别服务
 * @description 沃土ocr识别服务是一个 Spring Boot项目
 * @version v1.0
 **/


interface 工商信息一致性校验响应体 {
  
  /** 营业执照图片链接 */
  passed: boolean
  /** 未通过原因 */
  reason?: string
}

/**
 * requestUrl /ocr/v1.0/check_enterprise_info
 * method post
 */
export interface CheckEnterpriseBizInfoUsingPOSTRequest {
  
  /** 机构名称 */
  companyName: string
  /** 社会统一信用代码 */
  creditNo: string
  /** 营业执照图片链接 */
  licenseUrl: string
}

/**
 * requestUrl /ocr/v1.0/check_enterprise_info
 * method post
 */
export interface CheckEnterpriseBizInfoUsingPOSTResponse {
  
  /** 响应数据 */
  data?: 工商信息一致性校验响应体
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface EnterpriseBizInfoDto {
  
  /** 企业地址 */
  address: string
  /** 市 */
  city: string
  /** 注册码 */
  companyCode: string
  /** 企业名称 */
  companyName: string
  /** 登记状态 */
  companyStatus: string
  /** 企业信用代码 */
  creditNo: string
  /** 核准时间 */
  issueDate: string
  /** 法定代表人 */
  legalPerson: string
  /** 所在省份 */
  province: string
}

/**
 * requestUrl /ocr/v1.0/enterprise_base_info
 * method get
 */
export interface GetEnterpriseBizInfoUsingGETResponse {
  
  /** 响应数据 */
  data?: EnterpriseBizInfoDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 营业执照ocr信息 {
  
  /** 地址 */
  address: string
  /** 单位名称 */
  companyName: string
  /** 类型 */
  companyType: string
  /** 社会信用代码 */
  creditNo: string
  /** 法人 */
  legalPerson: string
  /** 证件编号 */
  licenseNo: string
  /** 经营范围 */
  scope: string
}

/**
 * requestUrl /ocr/v1.0/ocr_license
 * method post
 */
export interface OcrLicenseUsingPOSTRequest {
  
  /** 营业执照图片链接 */
  url: string
}

/**
 * requestUrl /ocr/v1.0/ocr_license
 * method post
 */
export interface OcrLicenseUsingPOSTResponse {
  
  /** 响应数据 */
  data?: 营业执照ocr信息
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 分页响应数据ocr识别api调用记录响应体 {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: ocr识别api调用记录响应体
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface ocr识别api调用记录响应体 {
  
  /** ocr接口名称 */
  apiName?: string
  /** 唯一编号 */
  code?: string
  /** 调用时间 */
  createdAt?: number
  /** 调用用户编码 */
  createdBy?: string
  /** 接口参数 */
  paramJson?: string
}

/**
 * requestUrl /ocr/v1.0/page_record
 * method get
 */
export interface PageRecordUsingGETResponse {
  
  /** 响应数据 */
  data?: 分页响应数据ocr识别api调用记录响应体
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}