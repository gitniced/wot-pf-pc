
/**
 * 如果遇到bug，您可以钉钉搜索封东其或者给 fengdongqi@hzwotu.com 邮箱发邮件
 * 欢迎大家提 issue 或者 PR。
 * @title 沃土报名服务
 * @description 沃土报名服务是一个 Spring Boot项目
 * @version v1.0
 **/


interface ActivityAdvDto {
  
  /** 报名结束时间 */
  applyEndTime?: number
  /** 报名开始时间 */
  applyStartTime?: number
  /** 唯一编码 */
  code?: string
  /** 联系方式 */
  contract?: string
  /** 报名活动封面 */
  cover?: string
  /** 活动创建时间 */
  createdAt?: number
  /** 报名项目编码，与商品分类别名alias值一致 */
  entryCode?: string
  /** 报名项目名称 */
  entryName?: string
  /** 活动简介 */
  intro?: string
  /** 报名活动名称 */
  name?: string
  /** 机构编码 */
  organizationCode?: string
  /** 机构logo */
  organizationLogo?: string
  /** 机构名称 */
  organizationName?: string
}

/**
 * requestUrl /apply/front/activity/adv_activity
 * method get
 */
export interface AdvActivityUsingGETResponse {
  
  /** 响应数据 */
  data?: ActivityAdvDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface OrganizationAdvDto {
  
  /** 机构报名活动编码，机构报名为机构编码 */
  activityCode?: string
  /** 机构地址 */
  address?: string
  /** 唯一编码 */
  code?: string
  /** 机构电话 */
  logo?: string
  /** 机构电话 */
  mobile?: string
  /** 机构名称 */
  name?: string
}

/**
 * requestUrl /apply/front/activity/adv_organization
 * method get
 */
export interface AdvOrganizationUsingGETResponse {
  
  /** 响应数据 */
  data?: OrganizationAdvDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /apply/front/activity/close
 * method post
 */
export interface CloseUsingPOSTResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface ActivityDetailDto {
  
  /** 活动结束时间 */
  activityEnd?: string
  /** 活动开始时间 */
  activityStart?: string
  /** 已报名人数 */
  appliedNum?: number
  /** 报名结束时间 */
  applyEndTime?: number
  /** 报名开始时间 */
  applyStartTime?: number
  /** 附件json数组，格式：[{name:附件名称,url:附件链接},{name:附件名称,url:附件链接}] */
  attachmentJson?: string
  /** 报名分类编码，格式: 分类id;职业id,工种id,等级id */
  categoryCode?: string
  /** 报名分类名称 */
  categoryName?: string
  /** 唯一编码 */
  code?: string
  /** 联系方式 */
  contract?: string
  /** 报名活动封面 */
  cover?: string
  /** 活动详情 */
  detail?: string
  /** 报名项目编码，与商品分类别名alias值一致 */
  entryCode?: string
  /** 商品编码 */
  goodsCode?: string
  /** 活动简介 */
  intro?: string
  /** 报名活动名称 */
  name?: string
  /** 是否开启审核：0否，1是 */
  openAudit?: number
  /** 是否开启缴费：0否，1是 */
  openPay?: number
  /** 机构编码 */
  organizationCode?: string
  /** 缴费截止时间 */
  payEndTime?: number
  /** 报名费用 */
  price?: number
  /** 发布状态，0未发布、1已发布 */
  publishStatus?: number
  /** 最大报名人数，-1无限制 */
  quota?: number
  /** 站点 */
  sid?: number
  /** 活动状态，1未开始、2报名中、3已结束 */
  status?: number
  /** 活动类型，1计划、2机构 */
  type?: number
}

/**
 * requestUrl /apply/front/activity/detail
 * method get
 */
export interface DetailUsingGETResponse {
  
  /** 响应数据 */
  data?: ActivityDetailDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface ActivityUserDetailDto {
  
  /** 活动结束时间 */
  activityEnd?: string
  /** 活动开始时间 */
  activityStart?: string
  /** 是否已报名，true：已报名，false：未报名 */
  applied?: boolean
  /** 已报名人数 */
  appliedNum?: number
  /** 报名结束时间 */
  applyEndTime?: number
  /** 报名开始时间 */
  applyStartTime?: number
  /** 附件json数组，格式：[{name:附件名称,url:附件链接},{name:附件名称,url:附件链接}] */
  attachmentJson?: string
  /** 报名分类编码，格式: 分类id;职业id,工种id,等级id */
  categoryCode?: string
  /** 报名分类名称 */
  categoryName?: string
  /** 唯一编码 */
  code?: string
  /** 联系方式 */
  contract?: string
  /** 报名活动封面 */
  cover?: string
  /** 活动详情 */
  detail?: string
  /** 报名项目编码，与商品分类别名alias值一致 */
  entryCode?: string
  /** 商品编码 */
  goodsCode?: string
  /** 活动简介 */
  intro?: string
  /** 报名活动名称 */
  name?: string
  /** 是否开启审核：0否，1是 */
  openAudit?: number
  /** 是否开启缴费：0否，1是 */
  openPay?: number
  /** 机构编码 */
  organizationCode?: string
  /** 机构名称 */
  organizationName?: string
  /** 缴费截止时间 */
  payEndTime?: number
  /** 报名费用 */
  price?: number
  /** 发布状态，0未发布、1已发布 */
  publishStatus?: number
  /** 最大报名人数，-1无限制 */
  quota?: number
  /** 报名记录编码 */
  recordCode?: string
  /** 报名状态：1待审核、2未缴费、3过期未缴费、4报名成功、5报名失败、6已退费 */
  recordStatus?: number
  /** 剩余报名名额 */
  remainNum?: number
  /** 站点 */
  sid?: number
  /** 活动状态，1未开始、2报名中、3已结束 */
  status?: number
  /** 活动类型，1计划、2机构 */
  type?: number
}

/**
 * requestUrl /apply/front/activity/detail_user
 * method get
 */
export interface DetailForUserUsingGETResponse {
  
  /** 响应数据 */
  data?: ActivityUserDetailDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /apply/front/activity/edit
 * method post
 */
export interface EditUsingPOSTRequest {
  
  /** 活动结束时间 */
  activityEnd?: string
  /** 活动开始时间 */
  activityStart?: string
  /** 报名结束时间 */
  applyEndTime?: number
  /** 报名开始时间 */
  applyStartTime?: number
  /** 附件json数组，格式：[{name:附件名称,url:附件链接},{name:附件名称,url:附件链接}] */
  attachmentJson?: string
  /** 唯一编码 */
  code?: string
  /** 联系方式 */
  contract?: string
  /** 报名活动封面 */
  cover?: string
  /** 活动详情 */
  detail?: string
  /** 活动简介 */
  intro?: string
  /** 报名活动名称 */
  name: string
  /** 是否开启审核：0否，1是 */
  openAudit: number
  /** 是否开启缴费：0否，1是 */
  openPay: number
  /** 缴费截止时间 */
  payEndTime: number
  /** 报名费用 */
  price?: number
  /** 发布状态，0未发布、1已发布 */
  publishStatus: number
  /** 最大报名人数，-1无限制 */
  quota?: number
}

/**
 * requestUrl /apply/front/activity/edit
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
 * requestUrl /apply/front/activity/edit_publish
 * method post
 */
export interface EditPublishUsingPOSTResponse {
  
  /** 响应数据 */
  data?: string
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspApplyActivityPageRespDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: ApplyActivityPageRespDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface ApplyActivityPageRespDto {
  
  /** 活动结束时间 */
  activityEnd?: string
  /** 活动开始时间 */
  activityStart?: string
  /** 已报名人数 */
  appliedNum?: number
  /** 报名结束时间 */
  applyEndTime?: number
  /** 报名开始时间 */
  applyStartTime?: number
  /** 报名分类编码 */
  categoryCode?: string
  /** 分类名称 */
  categoryName?: string
  /** 唯一编码 */
  code?: string
  /** 创建时间 */
  createdAt?: number
  /** 报名项目编码 */
  entryCode?: string
  /** 报名项目名称 */
  entryName?: string
  /** 预留字段1 */
  ext1?: string
  /** 预留字段2 */
  ext2?: string
  /** 报名活动名称 */
  name?: string
  /** 是否开启审核：0否，1是 */
  openAudit?: number
  /** 是否开启缴费：0否，1是 */
  openPay?: number
  /** 机构编码 */
  organizationCode?: string
  /** 缴费截止时间 */
  payEndTime?: number
  /** 报名费用 */
  price?: number
  /** 发布状态，0未发布、1已发布 */
  publishStatus?: number
  /** 最大报名人数 */
  quota?: number
  /** 站点 */
  sid?: number
  /** 活动状态，1未开始、2报名中、3已结束 */
  status?: number
  /** 活动类型，1计划、2机构 */
  type?: number
}

/**
 * requestUrl /apply/front/activity/page
 * method post
 */
export interface PageUsingPOSTRequest {
  
  /** 创建时间-查询结束时间 */
  createdEnd?: string
  /** 创建时间-查询开始时间 */
  createdStart?: string
  /** 活动名称 */
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
  /** 发布状态，0未发布、1已发布 */
  publishStatus?: number
  /** 活动状态，1未开始、2报名中、3已结束 */
  status?: number
}

/**
 * requestUrl /apply/front/activity/page
 * method post
 */
export interface PageUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspApplyActivityPageRespDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspApplyActivitySaasListRespDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: ApplyActivitySaasListRespDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface ApplyActivitySaasListRespDto {
  
  /** 活动结束时间 */
  activityEnd?: string
  /** 活动开始时间 */
  activityStart?: string
  /** 报名结束时间 */
  applyEndTime?: number
  /** 报名开始时间 */
  applyStartTime?: number
  /** 报名分类编码 */
  categoryCode?: string
  /** 报名分类名称 */
  categoryName?: string
  /** 唯一编码 */
  code?: string
  /** 创建时间 */
  createdAt?: number
  /** 报名项目编码 */
  entryCode?: string
  /** 报名活动名称 */
  name?: string
  /** 最大报名人数，-1无限制 */
  quota?: number
  /** 剩余名额 */
  remainNum?: number
  /** 活动状态，1未开始、2报名中、3已结束 */
  status?: number
}

/**
 * requestUrl /apply/front/activity/page_activity_saas
 * method post
 */
export interface PageActivitySaasUsingPOSTRequest {
  
  /** 职业id */
  careerId: string
  /** 分类id */
  categoryId: string
  /** 报名项目类型：2评价计划，3培训计划 */
  entryCodeInteger?: number
  /** 职业等级id 或 工种等级id */
  levelId: string
  /** 报名活动名称 */
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
  /** 活动状态，1未开始、2报名中 */
  status?: number
  /** 工种id */
  workId: string
}

/**
 * requestUrl /apply/front/activity/page_activity_saas
 * method post
 */
export interface PageActivitySaasUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspApplyActivitySaasListRespDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspApplyActivitySiteListRespDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: ApplyActivitySiteListRespDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface ApplyActivitySiteListRespDto {
  
  /** 活动结束时间 */
  activityEnd?: string
  /** 活动开始时间 */
  activityStart?: string
  /** 报名结束时间 */
  applyEndTime?: number
  /** 报名开始时间 */
  applyStartTime?: number
  /** 报名分类编码 */
  categoryCode?: string
  /** 报名分类名称 */
  categoryName?: string
  /** 唯一编码 */
  code?: string
  /** 创建时间 */
  createdAt?: number
  /** 报名项目编码 */
  entryCode?: string
  /** 报名活动名称 */
  name?: string
  /** 机构编码 */
  organizationCode?: string
  /** 机构logo */
  organizationLogo?: string
  /** 机构名称 */
  organizationName?: string
  /** 最大报名人数，-1无限制 */
  quota?: number
  /** 剩余名额 */
  remainNum?: number
  /** 活动状态，1未开始、2报名中、3已结束 */
  status?: number
}

/**
 * requestUrl /apply/front/activity/page_activity_site
 * method post
 */
export interface PageActivitySiteUsingPOSTRequest {
  
  /** 职业id */
  careerId: string
  /** 分类id */
  categoryId: string
  /** 报名项目类型：2评价计划，3培训计划 */
  entryCodeInteger?: number
  /** 职业等级id 或 工种等级id */
  levelId: string
  /** 报名活动名称 */
  name?: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 活动状态，1未开始、2报名中 */
  status?: number
  /** 工种id */
  workId: string
}

/**
 * requestUrl /apply/front/activity/page_activity_site
 * method post
 */
export interface PageActivitySiteUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspApplyActivitySiteListRespDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface ApplyActivityRecommendDto {
  
  /** 报名分类编码，格式: 分类id;职业id,工种id,等级id */
  categoryCode?: string
  /** 报名分类名称 */
  categoryName?: string
  /** 唯一编码 */
  code?: string
  /** 报名活动封面 */
  cover?: string
  /** 报名项目编码，与商品分类别名alias值一致 */
  entryCode?: string
  /** 报名项目名称 */
  entryName?: string
  /** 报名活动名称 */
  name?: string
}

/**
 * requestUrl /apply/front/activity/recommend_activity
 * method get
 */
export interface RecommendActivityUsingGETResponse {
  
  /** 响应数据 */
  data?: ApplyActivityRecommendDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /apply/front/activity/save
 * method post
 */
export interface SaveUsingPOSTRequest {
  
  /** 活动结束时间 */
  activityEnd?: string
  /** 活动开始时间 */
  activityStart?: string
  /** 报名结束时间 */
  applyEndTime?: number
  /** 报名开始时间 */
  applyStartTime?: number
  /** 附件json数组，格式：[{name:附件名称,url:附件链接},{name:附件名称,url:附件链接}] */
  attachmentJson?: string
  /** 业务线条目编码，由业务线新建活动传参 */
  bizCode?: string
  /** 职业id */
  careerId: string
  /** 分类id */
  categoryId: string
  /** 联系方式 */
  contract?: string
  /** 报名活动封面 */
  cover?: string
  /** 活动详情 */
  detail?: string
  /** 报名项目类型：2评价计划，3培训计划 */
  entryCodeInteger: number
  /** 活动简介 */
  intro?: string
  /** 职业等级id 或 工种等级id */
  levelId: string
  /** 报名活动名称 */
  name: string
  /** 是否开启审核：0否，1是 */
  openAudit: number
  /** 是否开启缴费：0否，1是 */
  openPay: number
  /** 机构编码 */
  organizationCode: string
  /** 缴费截止时间 */
  payEndTime: number
  /** 报名费用 */
  price?: number
  /** 发布状态，0未发布、1已发布 */
  publishStatus: number
  /** 最大报名人数，-1无限制 */
  quota?: number
  /** 工种id */
  workId: string
}

/**
 * requestUrl /apply/front/activity/save
 * method post
 */
export interface SaveUsingPOSTResponse {
  
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
 * requestUrl /apply/front/record/audit_record
 * method post
 */
export interface AuditRecordUsingPOSTRequest {
  
  /** 审核意见 */
  auditComment?: string
  /** 审核状态：1通过、2拒绝 */
  auditStatus: number
}

/**
 * requestUrl /apply/front/record/audit_record
 * method post
 */
export interface AuditRecordUsingPOSTResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 机构报名记录详情 {
  
  /** 活动结束时间 */
  activityEnd?: string
  /** 活动开始时间 */
  activityStart?: string
  /** 审核状态：1通过，2拒绝 */
  auditStatus?: number
  /** 审核时间 */
  auditTime?: number
  /** 出生年月 */
  birthday?: string
  /** 报名项目编码 */
  entryCode?: string
  /** 报名项目名称 */
  entryName?: string
  /** 活动名称 */
  name?: string
  /** 是否开启审核：0否，1是 */
  openAudit?: number
  /** 是否开启缴费：0否，1是 */
  openPay?: number
  /** 缴费截止时间 */
  payEndTime?: number
  /** 缴费时间 */
  payTime?: number
  /** 报名费用 */
  price?: number
  /** 备注 */
  remark?: string
  /** 报名状态：1待审核、2未缴费、3过期未缴费、4报名成功、5报名失败、6已退费 */
  status?: number
  /** 头像 */
  userAvatar?: string
  /** 性别 */
  userGender?: number
  /** 身份证号 */
  userIdentify?: string
  /** 手机号码 */
  userMobile?: string
  /** 姓名 */
  userName?: string
}

/**
 * requestUrl /apply/front/record/detail
 * method get
 */
export interface DetailUsingGET_1Response {
  
  /** 响应数据 */
  data?: 机构报名记录详情
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /apply/front/record/pay_apply
 * method get
 */
export interface PayApplyUsingGETResponse {
  
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
 * requestUrl /apply/front/record/submit
 * method post
 */
export interface SubmitUsingPOSTRequest {
  
}

/**
 * requestUrl /apply/front/record/submit
 * method post
 */
export interface SubmitUsingPOSTResponse {
  
  /** 响应数据 */
  data?: string
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}