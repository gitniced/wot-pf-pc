
/**
 * 如果遇到bug，您可以钉钉搜索封东其或者给 fengdongqi@hzwotu.com 邮箱发邮件
 * 欢迎大家提 issue 或者 PR。
 * @title 问卷API文档
 * @description 问卷中心是一个 Spring Boot项目
 * @version v1.0
 **/


/**
 * requestUrl /questionnaire/backend/collect/delete/{code}
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

interface QuestionnaireDataCollectDetailDto {
  
  /** 编码 */
  code?: string
  /** 创建时间 */
  createdAt?: number
  /** 答题完成时间 */
  endTime?: number
  /** 身份证号，空字符串代表没有绑定过身份证 */
  idCardNo?: string
  /**  */
  items?: QuestionnaireItemDetailResDto
  /** 手机号 */
  mobile?: string
  /** 姓名 */
  name?: string
  /** 填写结果 */
  originalData?: Record<string | number | symbol, any>
  /** 问卷名称 */
  questionnaireCode?: string
  /** 问卷名称 */
  questionnaireName?: string
  /** 来源站点 */
  sid?: number
  /** 站点名称 */
  siteName?: string
  /** 答题开始时间 */
  startTime?: number
  /** 更新时间 */
  updatedAt?: number
  /** 用户编码 */
  userCode?: string
}

interface QuestionnaireItemDetailResDto {
  
  /** 主键 */
  code?: string
  /** 题型顺序 */
  itemPosition?: number
  /** 问卷编码 */
  questionnaireCode?: string
  /** 表单配置原始JSON */
  scheme?: Record<string | number | symbol, any>
  /** 排序 */
  sort?: number
  /** 表单项类型 */
  type?: number
}

/**
 * requestUrl /questionnaire/backend/collect/getDetail/{code}
 * method get
 */
export interface GetDetailUsingGETResponse {
  
  /** 响应数据 */
  data?: QuestionnaireDataCollectDetailDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspQuestionnaireDataCollectDetailDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: QuestionnaireDataCollectDetailDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

/**
 * requestUrl /questionnaire/backend/collect/query_page
 * method post
 */
export interface QueryPageUsingPOSTRequest {
  
  /** 提交结束时间 */
  endTime?: number
  /** 身份证号 */
  idCardNo?: string
  /** 手机号 */
  mobile?: string
  /** 问卷名称 */
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
  /** 提交开始时间 */
  startTime?: number
  /** 姓名 */
  userName?: string
}

/**
 * requestUrl /questionnaire/backend/collect/query_page
 * method post
 */
export interface QueryPageUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspQuestionnaireDataCollectDetailDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /questionnaire/front/collect/create
 * method post
 */
export interface CreateUsingPOSTRequest {
  
  /** 答题完成时间 */
  endTime?: number
  /** 填写结果 */
  originalData?: Record<string | number | symbol, any>
  /** 问卷编码 */
  questionnaireCode?: string
  /** 来源站点 */
  sid?: number
  /** 答题开始时间 */
  startTime?: number
  /** 用户编码 */
  userCode?: string
}

/**
 * requestUrl /questionnaire/front/collect/create
 * method post
 */
export interface CreateUsingPOSTResponse {
  
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
 * requestUrl /questionnaire/front/collect/getDetail/{code}
 * method get
 */
export interface GetDetailUsingGET_1Response {
  
  /** 响应数据 */
  data?: QuestionnaireDataCollectDetailDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /questionnaire/front/collect/get_last_questionnaire
 * method post
 */
export interface GetLastQuestionnaireUsingPOSTRequest {
  
  /** 问卷code */
  questionnaireCode?: string
  /** 用户code */
  userCode?: string
}

/**
 * requestUrl /questionnaire/front/collect/get_last_questionnaire
 * method post
 */
export interface GetLastQuestionnaireUsingPOSTResponse {
  
  /** 响应数据 */
  data?: QuestionnaireDataCollectDetailDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /questionnaire/front/collect/update
 * method post
 */
export interface UpdateUsingPOSTRequest {
  
  /** 用户问卷code */
  code?: string
  /** 答题完成时间 */
  endTime?: number
  /** 填写结果 */
  originalData?: Record<string | number | symbol, any>
  /** 问卷编码 */
  questionnaireCode?: string
  /** 来源站点 */
  sid?: number
  /** 答题开始时间 */
  startTime?: number
  /** 用户编码 */
  userCode?: string
}

/**
 * requestUrl /questionnaire/front/collect/update
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

/**
 * requestUrl /questionnaire/backend/manage/cancel/collect/{code}
 * method post
 */
export interface CancelCollectUsingPOSTRequest {
  
}

/**
 * requestUrl /questionnaire/backend/manage/cancel/collect/{code}
 * method post
 */
export interface CancelCollectUsingPOSTResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface UpdateQuestionnaireItemReqDto {
  
  /** 编码 */
  code?: string
  /** 题型顺序 */
  itemPosition?: number
  /** 表单配置原始JSON */
  scheme?: Record<string | number | symbol, any>
  /** 排序 */
  sort?: number
  /** 题型类型 */
  type?: number
  /** 题型枚举 */
  typeDesc?: string
}

/**
 * requestUrl /questionnaire/backend/manage/create
 * method post
 */
export interface CreateUsingPOST_1Request {
  
  /** 提交次数 */
  commitCount?: number
  /** 封面url */
  coverUrl?: Record<string | number | symbol, any>
  /** 问卷描述 */
  description?: string
  /** 是否限制用户，1-是，0-否 */
  isLimitUser?: number
  /** 是否多次提交，1-是，0-否 */
  isManyCommit?: number
  /** 是否允许修改结果页面，1-是，0-否 */
  isModify?: number
  /** 问卷名称 */
  name?: string
  /** 机构编码 */
  organizationCode?: string
  /** 机构编码名称 */
  organizationName?: string
  /** 结果页 */
  resultPage?: string
  /** 站点id */
  sid?: number
  /** 站点名称 */
  siteName?: string
  /** 问卷状态，1-未发布，2-收集中 */
  status?: number
  /** 问卷类型，1-系统问卷，2-用户问卷 */
  type?: number
  /** 题型List */
  updateQuestionnaireItems?: UpdateQuestionnaireItemReqDto
  /** 限制用户List */
  userCodeList?: any[]
}

/**
 * requestUrl /questionnaire/backend/manage/create
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
 * requestUrl /questionnaire/backend/manage/delete/{code}
 * method post
 */
export interface DeleteUsingPOST_1Request {
  
}

/**
 * requestUrl /questionnaire/backend/manage/delete/{code}
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

interface QuestionnaireDetailResDto {
  
  /** 编码 */
  code?: string
  /** 收集人数 */
  collectCount?: number
  /** 提交次数 */
  commitCount?: number
  /** 封面url */
  coverUrl?: Record<string | number | symbol, any>
  /** 创建时间 */
  createdAt?: number
  /** 问卷描述 */
  description?: string
  /** 答题结束时间 */
  endTime?: number
  /** 填写人数 */
  fillCount?: number
  /** 是否关联限制用户 */
  isAssociationUser?: number
  /** 是否限制用户，1-是，0-否 */
  isLimitUser?: number
  /** 是否多次提交，1-是，0-否 */
  isManyCommit?: number
  /** 当前用户是否能多次提交问卷，1-是，0-否 */
  isManyCommitQuestionnaire?: number
  /** 是否允许修改结果页面，1-是，0-否 */
  isModify?: number
  /** 问卷名称 */
  name?: string
  /** 机构编码 */
  organizationCode?: string
  /** 机构名称 */
  organizationName?: string
  /** 门户h5 URL */
  portalH5Url?: string
  /** 题目详情 */
  questionnaireItemDetails?: QuestionnaireItemDetailResDto
  /** 结果页 */
  resultPage?: string
  /** 站点 */
  sid?: number
  /** 站点名称 */
  siteName?: string
  /** 答题开始时间 */
  startTime?: number
  /** 问卷状态，1-未发布，2-收集中 */
  status?: number
  /** 问卷状态描述，1-未发布，2-收集中 */
  statusDesc?: number
  /** 问卷类型，1-系统问卷，2-用户问卷 */
  type?: number
  /** 问卷描述，1-系统问卷，2-用户问卷 */
  typeDesc?: string
  /** 移动端域名 */
  wapDomain?: string
}

/**
 * requestUrl /questionnaire/backend/manage/getDetail/{code}
 * method get
 */
export interface GetDetailUsingGET_2Response {
  
  /** 响应数据 */
  data?: QuestionnaireDetailResDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /questionnaire/backend/manage/publish
 * method post
 */
export interface PublishUsingPOSTRequest {
  
  /** code */
  code?: string
  /** 提交次数 */
  commitCount?: number
  /** 封面url */
  coverUrl?: Record<string | number | symbol, any>
  /** 问卷描述 */
  description?: string
  /** 是否限制用户，1-是，0-否 */
  isLimitUser?: number
  /** 是否多次提交，1-是，0-否 */
  isManyCommit?: number
  /** 是否允许修改结果页面，1-是，0-否 */
  isModify?: number
  /** 问卷名称 */
  name?: string
  /** 机构编码 */
  organizationCode?: string
  /** 机构编码名称 */
  organizationName?: string
  /** 结果页 */
  resultPage?: string
  /** 站点id */
  sid?: number
  /** 站点名称 */
  siteName?: string
  /** 问卷状态，1-未发布，2-收集中 */
  status?: number
  /** 问卷类型，1-系统问卷，2-用户问卷 */
  type?: number
  /** 题型List */
  updateQuestionnaireItems?: UpdateQuestionnaireItemReqDto
  /** 限制用户List */
  userCodeList?: any[]
}

/**
 * requestUrl /questionnaire/backend/manage/publish
 * method post
 */
export interface PublishUsingPOSTResponse {
  
  /** 响应数据 */
  data?: string
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspQuestionnaireDetailResDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: QuestionnaireDetailResDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

/**
 * requestUrl /questionnaire/backend/manage/query_page
 * method post
 */
export interface QueryPageUsingPOST_1Request {
  
  /** 问卷名称 */
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
  /** 站点 */
  sid?: number
  /** 问卷状态，1-未发布，2-收集中 */
  status?: number
}

/**
 * requestUrl /questionnaire/backend/manage/query_page
 * method post
 */
export interface QueryPageUsingPOST_1Response {
  
  /** 响应数据 */
  data?: BasePaginationRspQuestionnaireDetailResDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /questionnaire/backend/manage/update
 * method post
 */
export interface UpdateUsingPOST_1Request {
  
  /** code */
  code?: string
  /** 提交次数 */
  commitCount?: number
  /** 封面url */
  coverUrl?: Record<string | number | symbol, any>
  /** 问卷描述 */
  description?: string
  /** 是否限制用户，1-是，0-否 */
  isLimitUser?: number
  /** 是否多次提交，1-是，0-否 */
  isManyCommit?: number
  /** 是否允许修改结果页面，1-是，0-否 */
  isModify?: number
  /** 问卷名称 */
  name?: string
  /** 机构编码 */
  organizationCode?: string
  /** 机构编码名称 */
  organizationName?: string
  /** 结果页 */
  resultPage?: string
  /** 站点id */
  sid?: number
  /** 站点名称 */
  siteName?: string
  /** 问卷状态，1-未发布，2-收集中 */
  status?: number
  /** 问卷类型，1-系统问卷，2-用户问卷 */
  type?: number
  /** 题型List */
  updateQuestionnaireItems?: UpdateQuestionnaireItemReqDto
  /** 限制用户List */
  userCodeList?: any[]
}

/**
 * requestUrl /questionnaire/backend/manage/update
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

/**
 * requestUrl /questionnaire/front/manage/getDetail/{code}
 * method get
 */
export interface GetDetailUsingGET_3Response {
  
  /** 响应数据 */
  data?: QuestionnaireDetailResDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /questionnaire/front/manage/get_questionnaire_detail
 * method post
 */
export interface GetQuestionnaireDetailUsingPOSTRequest {
  
  /** 问卷code */
  code?: string
  /** 用户code */
  userCode?: string
}

/**
 * requestUrl /questionnaire/front/manage/get_questionnaire_detail
 * method post
 */
export interface GetQuestionnaireDetailUsingPOSTResponse {
  
  /** 响应数据 */
  data?: QuestionnaireDetailResDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /questionnaire/backend/user_limit/batch_delete
 * method post
 */
export interface BatchDeleteUsingPOSTRequest {
  
  /** 用户限制code */
  codeList?: any[]
}

/**
 * requestUrl /questionnaire/backend/user_limit/batch_delete
 * method post
 */
export interface BatchDeleteUsingPOSTResponse {
  
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
 * requestUrl /questionnaire/backend/user_limit/batch_update_time
 * method post
 */
export interface BatchUpdateTimeUsingPOSTRequest {
  
  /** 编码List */
  codeList?: any[]
  /** 答题结束时间 */
  endTime?: number
  /** 答题开始时间 */
  startTime?: number
}

/**
 * requestUrl /questionnaire/backend/user_limit/batch_update_time
 * method post
 */
export interface BatchUpdateTimeUsingPOSTResponse {
  
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
 * requestUrl /questionnaire/backend/user_limit/create
 * method post
 */
export interface CreateUsingPOST_2Request {
  
  /** 问卷编码 */
  questionnaireCode?: string
  /** sid */
  sid?: number
  /** 用户编码List */
  userCodeList?: any[]
}

/**
 * requestUrl /questionnaire/backend/user_limit/create
 * method post
 */
export interface CreateUsingPOST_2Response {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspQuestionnaireUserLimitDetailDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: QuestionnaireUserLimitDetailDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface QuestionnaireUserLimitDetailDto {
  
  /**  */
  code?: string
  /** 创建时间 */
  createdAt?: number
  /**  */
  deleted?: number
  /** 答题结束时间 */
  endTime?: number
  /** 身份证号，空字符串代表没有绑定过身份证 */
  idCardNo?: string
  /** 手机号 */
  mobile?: string
  /** 姓名 */
  name?: string
  /**  */
  questionnaireCode?: string
  /**  */
  questionnaireName?: string
  /** 站点 */
  sid?: number
  /** 站点名称 */
  siteName?: string
  /** 答题开始时间 */
  startTime?: number
  /**  */
  updatedAt?: number
  /** 用户编码 */
  userCode?: string
  /** 账号 */
  userName?: string
}

/**
 * requestUrl /questionnaire/backend/user_limit/query_page
 * method post
 */
export interface QueryPageUsingPOST_2Request {
  
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
  /** 问卷code */
  questionnaireCode?: string
}

/**
 * requestUrl /questionnaire/backend/user_limit/query_page
 * method post
 */
export interface QueryPageUsingPOST_2Response {
  
  /** 响应数据 */
  data?: BasePaginationRspQuestionnaireUserLimitDetailDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface ResponseBasePaginationRspUserInfoDto {
  
  /** 响应数据 */
  data?: BasePaginationRspUserInfoDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspUserInfoDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: UserInfoDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface UserInfoDto {
  
  /** 头像 */
  avatar?: string
  /** 证件类型，1身份证，2护照，3其他 */
  certificateType?: number
  /** 编码 */
  code?: string
  /** 邮箱，空字符串代表没有绑定过邮箱 */
  email?: string
  /** 激活状态，0未激活1已激活 */
  enable?: number
  /** 性别，男1 女2 */
  gender?: number
  /** 身份证号，空字符串代表没有绑定过身份证 */
  idCardNo?: string
  /** 是否初始密码，1是，0不是，代表是否设置过密码 */
  isInitPassword?: boolean
  /** 是否验证身份证号 */
  isValidateIdCard?: boolean
  /** 是否验证手机号 */
  isValidatePhone?: boolean
  /** 最近登录时间 */
  lastLoginTs?: number
  /** 最近选择组织编码 */
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
 * requestUrl /questionnaire/backend/user_limit/sit_users
 * method post
 */
export interface GetSitUserListUsingPOSTRequest {
  
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
  /** 组织code */
  organizationCode?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 问卷code */
  questionnaireCode?: string
  /** 站点 */
  sid?: number
}

/**
 * requestUrl /questionnaire/backend/user_limit/sit_users
 * method post
 */
export interface GetSitUserListUsingPOSTResponse {
  
  /** 响应数据 */
  data?: ResponseBasePaginationRspUserInfoDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}