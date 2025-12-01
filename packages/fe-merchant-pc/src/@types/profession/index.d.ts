
/**
 * 如果遇到bug，您可以钉钉搜索封东其或者给 fengdongqi@hzwotu.com 邮箱发邮件
 * 欢迎大家提 issue 或者 PR。
 * @title 沃土待办服务
 * @description 沃土待办服务是一个 Spring Boot项目
 * @version v1.0
 **/


/**
 * requestUrl /profession/backend/bi/import/job_demand_search_rank
 * method post
 */
export interface ImportJobDemandSearchRankUsingPOSTRequest {
  
}

/**
 * requestUrl /profession/backend/bi/import/job_demand_search_rank
 * method post
 */
export interface ImportJobDemandSearchRankUsingPOSTResponse {
  
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
 * requestUrl /profession/backend/bi/import/shortage_job_rank
 * method post
 */
export interface ImportShortageJobRankUsingPOSTRequest {
  
}

/**
 * requestUrl /profession/backend/bi/import/shortage_job_rank
 * method post
 */
export interface ImportShortageJobRankUsingPOSTResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 分页响应数据短缺职业排行榜数据 {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: 短缺职业排行榜数据
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface 短缺职业排行榜数据 {
  
  /** 职业代码 */
  jobCode?: string
  /** 职业名称 */
  jobName?: string
  /** 短缺排位 */
  rank?: number
}

/**
 * requestUrl /profession/front/bi/shortage_job_rank/list
 * method get
 */
export interface ListUsingGETResponse {
  
  /** 响应数据 */
  data?: 分页响应数据短缺职业排行榜数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 用于枚举对象 {
  
  /** 枚举code值 */
  code?: number
  /** 枚举描述 */
  desc?: string
}

/**
 * requestUrl /profession/drop_down/education
 * method get
 */
export interface GeEducationUsingGETResponse {
  
  /** 响应数据 */
  data?: 用于枚举对象
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /profession/drop_down/experience
 * method get
 */
export interface GeExperienceUsingGETResponse {
  
  /** 响应数据 */
  data?: 用于枚举对象
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /profession/drop_down/salary_type
 * method get
 */
export interface GetSalaryTypeUsingGETResponse {
  
  /** 响应数据 */
  data?: 用于枚举对象
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /profession/drop_down/settlement_type
 * method get
 */
export interface GetSettlementTypeUsingGETResponse {
  
  /** 响应数据 */
  data?: 用于枚举对象
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 兼职招聘对象 {
  
  /** 兼职招聘对象code */
  code?: string
  /** 教育程度 */
  education?: number
  /** 经验 */
  experience?: number
  /** 招聘截止时间 */
  requireEndTime?: number
  /** 最高薪 */
  salaryMax?: number
  /** 最低薪 */
  salaryMin?: number
  /** 薪水类型  0 默认 1 元/时  2 元/天  3 元/周  4 元/月 */
  salaryType?: number
  /** 结算类型 默认 0  月结 1 周结 2 日结 3 完工结 */
  settlementType?: number
  /** 工作日 */
  workDays?: any[]
  /** 工作结束时间 */
  workTimeEnd?: number
  /** 工作开始时间 */
  workTimeStart?: number
  /** 工作时间类型 0 默认 1 不限时间 2 自定义时间 */
  workTimeType?: number
}

interface 实习招聘对象 {
  
  /** 实习招聘对象code */
  code?: string
  /** 教育程度 */
  education?: number
  /** 经验 */
  experience?: number
  /** 最高日薪 */
  salaryMax?: number
  /** 最低日薪 */
  salaryMin?: number
  /** 薪水类型  0 默认 1 元/时  2 元/天  3 元/周  4 元/月 */
  salaryType?: number
  /** 周最小工作天数 */
  workMinDayWeek?: number
  /** 月最小工作天数 */
  workMinMonth?: number
}

interface 校园招聘对象 {
  
  /** 校园招聘对象code */
  code?: string
  /** 教育程度 */
  education?: number
  /** 经验 */
  experience?: number
  /** 毕业时间 */
  graduateTime?: number
  /** 招聘截止时间 */
  requireEndTime?: number
  /** 最高月薪 */
  salaryMax?: number
  /** 最低月薪 */
  salaryMin?: number
  /** 薪资月数 */
  salaryMonth?: number
  /** 薪水类型  0 默认 1 元/时  2 元/天  3 元/周  4 元/月 */
  salaryType?: number
}

interface 社会招聘需求对象 {
  
  /** 社会招聘需求对象code */
  code?: string
  /** 教育程度 */
  education?: number
  /** 经验 */
  experience?: number
  /** 最高月薪 */
  salaryMax?: number
  /** 最低月薪 */
  salaryMin?: number
  /** 薪资月数 */
  salaryMonth?: number
  /** 薪水类型  0 默认 1 元/时  2 元/天  3 元/周  4 元/月 */
  salaryType?: number
}

/**
 * requestUrl /profession/front/enterprise/add
 * method post
 */
export interface AddProfessionUsingPOSTRequest {
  
  /** 地址code */
  addressCode?: string
  /** 职位对象code */
  code?: string
  /** 职位描述 */
  desc?: string
  /** 组织code */
  organizationCode?: string
  /** 兼职招聘数据对象 */
  partTimeRecruit?: 兼职招聘对象
  /** 实习招聘数据对象 */
  practiceRecruit?: 实习招聘对象
  /** 职位名称 */
  professionName?: string
  /** 职位类型Id */
  professionTypeId?: number
  /** 招聘类型 0 默认 1 社招 2 校招 3 实习 4 兼职 */
  recruitType?: number
  /** 校招数据对象 */
  schoolRecruitDto?: 校园招聘对象
  /** 站点Id */
  sid?: number
  /** 社会招聘数据对象 */
  socialRecruit?: 社会招聘需求对象
  /** 来源  1 平台  2  职培 3 考评 4 创培 */
  source?: string
  /** 标签code */
  tagCodes?: any[]
  /** 职位类型 */
  type?: number
}

/**
 * requestUrl /profession/front/enterprise/add
 * method post
 */
export interface AddProfessionUsingPOSTResponse {
  
  /** 响应数据 */
  data?: string
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 职位计数 {
  
  /** 全部 */
  allCount?: number
  /** 关闭 */
  closedCount?: number
  /** 招聘中 */
  recruitCount?: number
  /** 待发布 */
  unPublishCount?: number
}

/**
 * requestUrl /profession/front/enterprise/count
 * method post
 */
export interface CountQueryUsingPOSTRequest {
  
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 企业code */
  organizationCode?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 职业名称 */
  professionName?: string
  /** 站点id */
  sid?: number
  /** 签到状态 0 待发布 1 已发布 2 下架 */
  status?: number
  /** 类型 1 企业 2 校企合作 3 其他 */
  type?: number
}

/**
 * requestUrl /profession/front/enterprise/count
 * method post
 */
export interface CountQueryUsingPOSTResponse {
  
  /** 响应数据 */
  data?: 职位计数
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /profession/front/enterprise/delete_by_codes)
 * method post
 */
export interface DeleteByCodesUsingPOSTRequest {
  
  /** 职位code列表 */
  professionCodeList?: any[]
}

/**
 * requestUrl /profession/front/enterprise/delete_by_codes)
 * method post
 */
export interface DeleteByCodesUsingPOSTResponse {
  
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
 * requestUrl /profession/front/enterprise/edit
 * method post
 */
export interface EditProfessionUsingPOSTRequest {
  
  /** 地址code */
  addressCode?: string
  /** 职位对象code */
  code?: string
  /** 职位描述 */
  desc?: string
  /** 组织code */
  organizationCode?: string
  /** 兼职招聘数据对象 */
  partTimeRecruit?: 兼职招聘对象
  /** 实习招聘数据对象 */
  practiceRecruit?: 实习招聘对象
  /** 职位名称 */
  professionName?: string
  /** 职位类型Id */
  professionTypeId?: number
  /** 招聘类型 0 默认 1 社招 2 校招 3 实习 4 兼职 */
  recruitType?: number
  /** 校招数据对象 */
  schoolRecruitDto?: 校园招聘对象
  /** 站点Id */
  sid?: number
  /** 社会招聘数据对象 */
  socialRecruit?: 社会招聘需求对象
  /** 来源  1 平台  2  职培 3 考评 4 创培 */
  source?: string
  /** 标签code */
  tagCodes?: any[]
  /** 职位类型 */
  type?: number
}

/**
 * requestUrl /profession/front/enterprise/edit
 * method post
 */
export interface EditProfessionUsingPOSTResponse {
  
  /** 响应数据 */
  data?: string
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 职业详情对象 {
  
  /** 地址code */
  addressCode?: string
  /** 地址名称 */
  addressName?: string
  /** 职位对象code */
  code?: string
  /** 职位描述 */
  desc?: string
  /** 组织code */
  organizationCode?: string
  /** 兼职招聘数据对象 */
  partTimeRecruit?: 兼职招聘对象
  /** 实习招聘数据对象 */
  practiceRecruit?: 实习招聘对象
  /** 职位名称 */
  professionName?: string
  /** 职位类型Id */
  professionTypeId?: number
  /** 招聘类型 0 默认 1 社招 2 校招 3 实习 4 兼职 */
  recruitType?: number
  /** 校招数据对象 */
  schoolRecruitDto?: 校园招聘对象
  /** 站点Id */
  sid?: number
  /** 社会招聘数据对象 */
  socialRecruit?: 社会招聘需求对象
  /** 来源  1 平台  2  职培 3 考评 4 创培 */
  source?: string
  /** 签到状态 默认 0 待发布 1 已发布 2 下架 */
  status?: number
  /** 标签code */
  tags?: 标签对象
  /** 职位类型 */
  type?: number
}

interface 标签对象 {
  
  /** 标签code */
  code?: string
  /** 职位类型Id */
  professionTypeId?: number
  /** 标签名称 */
  tagName?: string
  /** 标签类型  0自定义标签 1 推荐标签 */
  tagType?: number
}

/**
 * requestUrl /profession/front/enterprise/info/{code}
 * method get
 */
export interface InfoUsingGETResponse {
  
  /** 响应数据 */
  data?: 职业详情对象
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 分页响应数据ProfessionListFrontDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: ProfessionListFrontDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface ProfessionListFrontDto {
  
  /** 地址code */
  addressCode?: string
  /** 审核状态  0 待审核 1 审核通过 2 审核不通过 */
  auditStatus?: number
  /** 城市名称 */
  cityName?: string
  /** 职位code */
  code?: string
  /** 职位描述 */
  desc?: string
  /** 教育程度 */
  education?: number
  /** 经验 */
  experience?: number
  /** 行业code */
  industryCode?: string
  /** 组织code */
  organizationCode?: string
  /** 职位名称 */
  professionName?: string
  /** 职位类型Id */
  professionTypeId?: string
  /**  招聘类型 0 默认 1 社招 2 校招 3 实习 4 兼职 */
  recruitType?: number
  /** 最高月薪 */
  salaryMax?: number
  /** 最低月薪 */
  salaryMin?: number
  /** 薪水类型 1 元/时  2 元/天  3 元/周  4 元/月 */
  salaryType?: number
  /** 站点id */
  sid?: number
  /** 来源默认0 未知 1 平台  2  职培 3 考评 4 创培 */
  source?: number
  /** 签到状态 默认 0 待发布 1 已发布 2 下架 */
  status?: number
  /** 职业类型 1 企业 2 校企合作 3 其他 */
  type?: number
}

/**
 * requestUrl /profession/front/enterprise/page
 * method post
 */
export interface PageUsingPOSTRequest {
  
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 企业code */
  organizationCode?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 职业名称 */
  professionName?: string
  /** 站点id */
  sid?: number
  /** 签到状态 0 待发布 1 已发布 2 下架 */
  status?: number
  /** 类型 1 企业 2 校企合作 3 其他 */
  type?: number
}

/**
 * requestUrl /profession/front/enterprise/page
 * method post
 */
export interface PageUsingPOSTResponse {
  
  /** 响应数据 */
  data?: 分页响应数据ProfessionListFrontDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /profession/front/enterprise/update_status
 * method post
 */
export interface UpdateStatusUsingPOSTRequest {
  
  /** 职位code */
  code?: string
  /** 签到状态 默认 0 待发布 1 已发布 2 下架 */
  status?: number
}

/**
 * requestUrl /profession/front/enterprise/update_status
 * method post
 */
export interface UpdateStatusUsingPOSTResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 门户列表卡片 {
  
  /** 地址信息 */
  addressDto?: AddressDto
  /** 职位code */
  code?: string
  /** 企业信息 */
  organization?: OrganizationDto
  /** 职位名称 */
  professionName?: string
  /** 职位类型Id */
  professionTypeId?: string
  /**  招聘类型 0 默认 1 社招 2 校招 3 实习 4 兼职 */
  recruitType?: string
  /** 招聘人信息 */
  recruiter?: 招聘人信息
  /** 站点id */
  sid?: number
  /** 来源默认0 未知 1 平台  2  职培 3 考评 4 创培 */
  source?: string
  /** 签到状态 默认 0 待发布 1 已发布 2 下架 */
  status?: number
  /** 标签列表 */
  tagDtoList?: 标签映射对象
}

interface AddressDto {
  
  /** 城市id */
  cityId?: number
  /** 城市名称 */
  cityName?: string
  /** 区/县id */
  districtId?: number
  /** 区/县名称 */
  districtName?: string
  /** 省份id */
  provinceId?: number
  /** 省份名称 */
  provinceName?: string
}

interface OrganizationDto {
  
  /** 企业融资状态 */
  financing?: string
  /** 组织code */
  organizationCode?: string
  /** 企业名称 */
  organizationName?: string
  /** 企业规模 是接口枚举 */
  scale?: number
}

interface 招聘人信息 {
  
  /** 用户头像 */
  icon?: string
  /** 招聘人用户code */
  userCode?: string
  /** 招聘人名称 */
  userName?: string
}

interface 标签映射对象 {
  
  /** 标签mapping code */
  code?: string
  /** 职位code */
  professionCode?: string
  /** 职位类型Id */
  professionTypeId?: number
  /** 标签code */
  tagCode?: string
  /** 标签名称 */
  tagName?: string
  /** 标签类型  0自定义标签 1 推荐标签 */
  tagType?: number
}

/**
 * requestUrl /profession/front/portal/list/similar
 * method post
 */
export interface ListSimilarProfessionsUsingPOSTRequest {
  
  /** 职位类型Id */
  professionTypeId?: number
}

/**
 * requestUrl /profession/front/portal/list/similar
 * method post
 */
export interface ListSimilarProfessionsUsingPOSTResponse {
  
  /** 响应数据 */
  data?: 门户列表卡片
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /profession/front/tag/add_batch
 * method post
 */
export interface AddBatchUsingPOSTRequest {
  
}

/**
 * requestUrl /profession/front/tag/add_batch
 * method post
 */
export interface AddBatchUsingPOSTResponse {
  
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
 * requestUrl /profession/front/tag/list/profess_type
 * method get
 */
export interface ListByProfessionTypeUsingGETResponse {
  
  /** 响应数据 */
  data?: 标签对象
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /profession/front/tag/list/tag_name
 * method post
 */
export interface ListByQueryUsingPOSTRequest {
  
  /** 机构code */
  organizationCode?: string
  /** 职业类型Id */
  professionTypeId?: number
  /** 标签code */
  tagCodes?: any[]
  /** 标签名称 */
  tagName?: string
  /** 标签类型 0 自定义 1 推荐标签 */
  tagType?: number
}

/**
 * requestUrl /profession/front/tag/list/tag_name
 * method post
 */
export interface ListByQueryUsingPOSTResponse {
  
  /** 响应数据 */
  data?: 标签对象
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}