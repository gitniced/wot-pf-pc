/**
 * 如果遇到bug，您可以钉钉搜索封东其或者给 fengdongqi@hzwotu.com 邮箱发邮件
 * 欢迎大家提 issue 或者 PR。
 * @title 沃土搜索服务
 * @description 沃土搜索服务是一个 Spring Boot项目
 * @version v1.0
 * @date 2023/7/25 17:44:41
 **/

interface 键值对返回对象intlong {
    /** 键 */
    name?: number
    /** 值 */
    value?: number
}

/**
 * requestUrl /search/front/apply/activity_status_count
 * method get
 */
export interface CountActivityStatusUsingGETResponse {
    /** 响应数据 */
    data?: 键值对返回对象intlong
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
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
    /** 报名项目编码，REVIEWS_PLAN：评价计划、TRAINING_PLAN：培训计划 */
    entryCode?: string
    /** 报名活动名称 */
    name?: string
    /** 剩余名额 */
    remainNum?: number
    /** 活动状态，1未开始、2报名中、3已结束 */
    status?: number
}

/**
 * requestUrl /search/front/apply/list_activity_saas
 * method post
 */
export interface ListActivitySaasUsingPOSTRequest {
    /** 职业id */
    careerId: string
    /** 报名分类编码 */
    categoryCode?: string
    /** 分类id */
    categoryId: string
    /** 报名项目类型：2评价计划，3培训计划 */
    entryCodeInteger?: number
    /** 职业等级id 或 工种等级id */
    levelId: string
    /** 报名活动名称 */
    name?: string
    /** 机构编码 */
    organizationCode?: string
    /** 活动状态，1未开始、2报名中 */
    status?: number
    /** 工种id */
    workId: string
}

/**
 * requestUrl /search/front/apply/list_activity_saas
 * method post
 */
export interface ListActivitySaasUsingPOSTResponse {
    /** 响应数据 */
    data?: ApplyActivitySaasListRespDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
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
    /** 报名项目编码，REVIEWS_PLAN：评价计划、TRAINING_PLAN：培训计划 */
    entryCode?: string
    /** 报名活动名称 */
    name?: string
    /** 机构编码 */
    organizationCode?: string
    /** 机构名称 */
    organizationName?: string
    /** 剩余名额 */
    remainNum?: number
    /** 活动状态，1未开始、2报名中、3已结束 */
    status?: number
}

/**
 * requestUrl /search/front/apply/list_activity_site
 * method post
 */
export interface ListActivitySiteUsingPOSTRequest {
    /** 职业id */
    careerId: string
    /** 报名分类编码 */
    categoryCode?: string
    /** 分类id */
    categoryId: string
    /** 报名项目类型：2评价计划，3培训计划 */
    entryCodeInteger?: number
    /** 职业等级id 或 工种等级id */
    levelId: string
    /** 报名活动名称 */
    name?: string
    /** 活动状态，1未开始、2报名中 */
    status?: number
    /** 工种id */
    workId: string
}

/**
 * requestUrl /search/front/apply/list_activity_site
 * method post
 */
export interface ListActivitySiteUsingPOSTResponse {
    /** 响应数据 */
    data?: ApplyActivitySiteListRespDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRspApplyRecordUserDto {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: ApplyRecordUserDto
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

interface ApplyRecordUserDto {
    title: string
    code: string
    cancelFlag?: number
    cancelEnd: number
    type: number
    showReapply: number
    /** 报名活动编码 */
    activityCode?: string
    /** 活动结束时间 */
    activityEnd?: string
    /** 活动开始时间，培训计划为培训开始时间，评价计划为认定考试时间 */
    activityStart?: string
    /** 失败原因 */
    auditComment?: string
    /** 报名时间 */
    createdAt?: string
    /** 报名项目编码 */
    entryCode?: string
    /** 报名项目名称 */
    entryName?: string
    /** 报名活动名称 */
    name?: string
    /** 机构编码 */
    organizationCode?: string
    /** 机构logo */
    organizationLogo?: string
    /** 机构名称 */
    organizationName?: string
    /** 缴费截止时间 */
    payEndTime?: number
    /** 缴费时间 */
    payTime?: number
    /** 报名费用 */
    price?: string
    /** 报名状态：1待审核、2未缴费、3过期未缴费、4报名成功、5报名失败、6已退费 */
    status: number
}

/**
 * requestUrl /search/front/apply/list_user_record
 * method post
 */
export interface PageUserRecordUsingPOSTRequest {
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
    /** 报名状态：1待审核、2未缴费、3过期未缴费、4报名成功、5报名失败、6已退费 */
    status?: number
}

/**
 * requestUrl /search/front/apply/list_user_record
 * method post
 */
export interface PageUserRecordUsingPOSTResponse {
    /** 响应数据 */
    data?: BasePaginationRspApplyRecordUserDto
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
    /** 报名分类编码，职业工种等级id，英文逗号分隔 */
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
    /** 最大报名人数，-1无限制 */
    quota?: number
    /** 站点 */
    sid?: number
    /** 活动状态，1未开始、2报名中、3已结束 */
    status?: number
}

/**
 * requestUrl /search/front/apply/page_activity
 * method post
 */
export interface PageActivityUsingPOSTRequest {
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
 * requestUrl /search/front/apply/page_activity
 * method post
 */
export interface PageActivityUsingPOSTResponse {
    /** 响应数据 */
    data?: BasePaginationRspApplyActivityPageRespDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRspApplyRecordPageRespDto {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: ApplyRecordPageRespDto
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

interface ApplyRecordPageRespDto {
    /** 报名活动编码 */
    activityCode?: string
    /** 活动结束时间 */
    activityEnd?: string
    /** 报名活动名称 */
    activityName?: string
    /** 活动开始时间 */
    activityStart?: string
    /** 报名渠道：1站点门户、2机构门户、3推广链接、31报名链接、32报名二维码、33报名海报 */
    applyChannel?: number
    /** 审核意见 */
    auditComment?: string
    /** 出生年月 */
    birthday?: string
    /** 唯一编码 */
    code?: string
    /** 创建时间，报名时间 */
    createdAt?: number
    /** 报名项目编码 */
    entryCode?: string
    /** 报名项目名称 */
    entryName?: string
    /** 预留字段1 */
    ext1?: string
    /** 预留字段2 */
    ext2?: string
    /** 报名人机构code */
    organizationCode?: string
    /** 缴费截止时间 */
    payEndTime?: number
    /** 站点 */
    sid?: number
    /** 报名状态：1待审核、2未缴费、3过期未缴费、4报名成功、5报名失败、6已退费 */
    status?: number
    /** 报名项目类型，1计划、2机构 */
    type?: number
    /** 头像 */
    userAvatar?: string
    /** 报名用户编码 */
    userCode?: string
    /** 性别 */
    userGender?: number
    /** 报名方身份证 */
    userIdentify?: string
    /** 报名方mobile */
    userMobile?: string
    /** 报名方姓名 */
    userName?: string
}

/**
 * requestUrl /search/front/apply/page_record
 * method post
 */
export interface PageRecordUsingPOSTRequest {
    /** 报名活动编码 */
    activityCode?: string
    /** 报名渠道：1站点门户、2机构门户、3推广链接、31报名链接、32报名二维码、33报名海报 */
    applyChannel?: number
    /** 创建时间-查询结束时间 */
    createdEnd?: string
    /** 创建时间-查询开始时间 */
    createdStart?: string
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
    /** 报名状态：1待审核、2未缴费、3过期未缴费、4报名成功、5报名失败、6已退费 */
    status?: number
    /** 身份证 */
    userIdentify?: string
    /** 手机号 */
    userMobile?: string
    /** 姓名 */
    userName?: string
}

/**
 * requestUrl /search/front/apply/page_record
 * method post
 */
export interface PageRecordUsingPOSTResponse {
    /** 响应数据 */
    data?: BasePaginationRspApplyRecordPageRespDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /search/front/apply/record_status_count
 * method get
 */
export interface CountRecordStatusUsingGETResponse {
    /** 响应数据 */
    data?: 键值对返回对象intlong
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /search/sync/apply/delete_activity
 * method post
 */
export interface DeleteActivityUsingPOSTResponse {
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
 * requestUrl /search/sync/apply/delete_record
 * method post
 */
export interface DeleteRecordUsingPOSTResponse {
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
 * requestUrl /search/sync/apply/save_activity
 * method post
 */
export interface SaveActivityUsingPOSTRequest {
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
}

/**
 * requestUrl /search/sync/apply/save_activity
 * method post
 */
export interface SaveActivityUsingPOSTResponse {
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
 * requestUrl /search/sync/apply/save_record
 * method post
 */
export interface SaveRecordUsingPOSTRequest {
    /** 报名活动编码 */
    activityCode?: string
    /** 报名渠道：1站点门户、2机构门户、3推广链接、31报名链接、32报名二维码、33报名海报 */
    applyChannel?: number
    /** 审核意见 */
    auditComment?: string
    /** 出生年月 */
    birthday?: string
    /** 唯一编码 */
    code?: string
    /** 创建时间，报名时间 */
    createdAt?: number
    /** 预留字段1 */
    ext1?: string
    /** 预留字段2 */
    ext2?: string
    /** 报名人机构code */
    organizationCode?: string
    /** 站点 */
    sid?: number
    /** 报名状态：1待审核、2未缴费、3过期未缴费、4报名成功、5报名失败、6已退费 */
    status?: number
    /** 报名项目类型，1计划、2机构 */
    type?: number
    /** 报名用户编码 */
    userCode?: string
    /** 报名方身份证 */
    userIdentify?: string
    /** 报名方mobile */
    userMobile?: string
    /** 报名方姓名 */
    userName?: string
}

/**
 * requestUrl /search/sync/apply/save_record
 * method post
 */
export interface SaveRecordUsingPOSTResponse {
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
 * requestUrl /search/sync/apply/update_activity
 * method post
 */
export interface UpdateActivityUsingPOSTRequest {
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
    /** 唯一编码 */
    code?: string
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
    /** 缴费截止时间 */
    payEndTime?: number
    /** 报名费用 */
    price?: number
    /** 发布状态，0未发布、1已发布 */
    publishStatus?: number
    /** 最大报名人数 */
    quota?: number
    /** 活动状态，1未开始、2报名中、3已结束 */
    status?: number
}

/**
 * requestUrl /search/sync/apply/update_activity
 * method post
 */
export interface UpdateActivityUsingPOSTResponse {
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
 * requestUrl /search/sync/apply/update_record_status
 * method post
 */
export interface UpdateRecordStatusUsingPOSTResponse {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRsp合同Index {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: 合同Index
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

interface 合同Index {
    /** 区域市 */
    city?: number
    /** 区域市名称 */
    cityName?: string
    /** 合同code */
    code?: string
    /** 合同编号 */
    contractNo?: string
    /** 签订日期 */
    contractStart?: number
    /** 创建时间 */
    createdAt?: number
    /** 客户编码 */
    customerCode?: string
    /** 甲方(结算对象) */
    partyA?: string
    /** 甲方签字人 */
    partyASign?: string
    /** 乙方(结算对象) */
    partyB?: string
    /** 乙方签字人 */
    partyBSign?: string
    /** 区域省 */
    province?: number
    /** 区域省名称 */
    provinceName?: string
    /** 销售负责人编码 */
    saleCode?: any[]
    /** 销售负责人 */
    saleName?: any[]
    /** 服务周期结束 */
    serviceEnd?: number
    /** 服务周期开始 */
    serviceStart?: number
    /** 结算对象编码 */
    settleTarget?: string
    /** 站点id */
    sid?: number
    /** 标签code */
    tagNames?: any[]
    /** 标签code */
    tags?: any[]
    /** 合同名称 */
    title?: string
    /** 合同类型 */
    type?: number
    /** 合同类型名称 */
    typeName?: string
}

/**
 * requestUrl /search/backend/contract/page
 * method post
 */
export interface PageUsingPOSTRequest {
    /** 市code */
    city?: number
    /** 合同编号 */
    contractNo?: string
    /** 客户编码 */
    customerCode?: string
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
    /** 省code列表 */
    provinceList?: any[]
    /** 跟进销售code */
    saleCode?: any[]
    /** 业务标签code */
    tags?: any[]
    /** 合同名称 */
    title?: string
}

/**
 * requestUrl /search/backend/contract/page
 * method post
 */
export interface PageUsingPOSTResponse {
    /** 响应数据 */
    data?: BasePaginationRsp合同Index
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /search/sync/contract/get
 * method get
 */
export interface GetByContractCodeUsingGETResponse {
    /** 响应数据 */
    data?: 合同Index
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /search/sync/contract/page
 * method post
 */
export interface PageUsingPOST_1Request {
    /** 市code */
    city?: number
    /** 合同编号 */
    contractNo?: string
    /** 客户编码 */
    customerCode?: string
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
    /** 省code列表 */
    provinceList?: any[]
    /** 跟进销售code */
    saleCode?: any[]
    /** 业务标签code */
    tags?: any[]
    /** 合同名称 */
    title?: string
}

/**
 * requestUrl /search/sync/contract/page
 * method post
 */
export interface PageUsingPOST_1Response {
    /** 响应数据 */
    data?: BasePaginationRsp合同Index
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /search/sync/contract/save
 * method post
 */
export interface SaveUsingPOSTRequest {
    /** 区域市 */
    city?: number
    /** 区域市名称 */
    cityName?: string
    /** 合同code */
    code?: string
    /** 合同编号 */
    contractNo?: string
    /** 签订日期 */
    contractStart?: number
    /** 创建时间 */
    createdAt?: number
    /** 客户编码 */
    customerCode?: string
    /** 甲方(结算对象) */
    partyA?: string
    /** 甲方签字人 */
    partyASign?: string
    /** 乙方(结算对象) */
    partyB?: string
    /** 乙方签字人 */
    partyBSign?: string
    /** 区域省 */
    province?: number
    /** 区域省名称 */
    provinceName?: string
    /** 销售负责人编码 */
    saleCode?: any[]
    /** 销售负责人 */
    saleName?: any[]
    /** 服务周期结束 */
    serviceEnd?: number
    /** 服务周期开始 */
    serviceStart?: number
    /** 标签名称 */
    tagNames?: any[]
    /** 标签 */
    tags?: any[]
    /** 合同名称 */
    title?: string
    /** 合同类型 */
    type?: number
    /** 合同类型名称 */
    typeName?: string
}

/**
 * requestUrl /search/sync/contract/save
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
 * requestUrl /search/sync/contract/update
 * method post
 */
export interface UpdateUsingPOSTRequest {
    /** 区域市 */
    city?: number
    /** 区域市名称 */
    cityName?: string
    /** 合同code */
    code?: string
    /** 合同编号 */
    contractNo?: string
    /** 签订日期 */
    contractStart?: number
    /** 创建时间 */
    createdAt?: number
    /** 客户编码 */
    customerCode?: string
    /** 甲方(结算对象) */
    partyA?: string
    /** 甲方签字人 */
    partyASign?: string
    /** 乙方(结算对象) */
    partyB?: string
    /** 乙方签字人 */
    partyBSign?: string
    /** 区域省 */
    province?: number
    /** 区域省名称 */
    provinceName?: string
    /** 销售负责人编码 */
    saleCode?: any[]
    /** 销售负责人 */
    saleName?: any[]
    /** 服务周期结束 */
    serviceEnd?: number
    /** 服务周期开始 */
    serviceStart?: number
    /** 标签名称 */
    tagNames?: any[]
    /** 标签 */
    tags?: any[]
    /** 合同名称 */
    title?: string
    /** 合同类型 */
    type?: number
    /** 合同类型名称 */
    typeName?: string
}

/**
 * requestUrl /search/sync/contract/update
 * method post
 */
export interface UpdateUsingPOSTResponse {
    /** 响应数据 */
    data?: string
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRsp客户Index {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: 客户Index
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

interface 客户Index {
    /** 市 */
    city?: string
    /** 市 */
    cityName?: string
    /** 唯一id */
    code?: string
    /** 联系人 */
    contact?: string
    /** 创建时间 */
    createdAt?: number
    /** 信用代码 */
    creditCode?: string
    /** 客户标签 */
    customerTags?: any[]
    /** 客户标签名 */
    customerTagsName?: any[]
    /** flag是否被隐藏 */
    deleted?: number
    /** 跟进人code */
    follower?: any[]
    /** 跟进人名字 */
    followerNames?: any[]
    /** 客户等级 */
    level?: number
    /** 客户等级名 */
    levelName?: string
    /** 联系人电话 */
    mobile?: string
    /** 客户名称 */
    name?: string
    /** 联系人职务 */
    post?: string
    /** 地区省 */
    province?: string
    /** 地区省 */
    provinceName?: string
    /** 标签id */
    tags?: any[]
    /** 标签名字 */
    tagsName?: any[]
    /** 客户类型 */
    typeList?: any[]
    /** 客户类型名 */
    typeNameList?: any[]
}

/**
 * requestUrl /search/backend/customer/page
 * method post
 */
export interface PageUsingPOST_2Request {
    /** 区 */
    city?: number
    /** 客户编号 */
    code?: string
    /** 客户标签 */
    customerTags?: any[]
    /** 是否被删除 */
    deleted?: number
    /** 跟进人 */
    followerList?: any[]
    /** 等级 */
    level?: number
    /** 客户名称 */
    name?: string
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
    /** 地区Id */
    province?: number
    /** 地区Id列表 */
    provinceList?: any[]
    /** 业务标签 */
    tags?: any[]
    /** 类型 */
    typeList?: any[]
}

/**
 * requestUrl /search/backend/customer/page
 * method post
 */
export interface PageUsingPOST_2Response {
    /** 响应数据 */
    data?: BasePaginationRsp客户Index
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /search/sync/customer/page
 * method post
 */
export interface CustomerPageUsingPOSTRequest {
    /** 区 */
    city?: number
    /** 客户编号 */
    code?: string
    /** 客户标签 */
    customerTags?: any[]
    /** 是否被删除 */
    deleted?: number
    /** 跟进人 */
    followerList?: any[]
    /** 等级 */
    level?: number
    /** 客户名称 */
    name?: string
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
    /** 地区Id */
    province?: number
    /** 地区Id列表 */
    provinceList?: any[]
    /** 业务标签 */
    tags?: any[]
    /** 类型 */
    typeList?: any[]
}

/**
 * requestUrl /search/sync/customer/page
 * method post
 */
export interface CustomerPageUsingPOSTResponse {
    /** 响应数据 */
    data?: BasePaginationRsp客户Index
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /search/sync/customer/save
 * method post
 */
export interface SaveUsingPOST_1Request {
    /** 市 */
    city?: string
    /** 市 */
    cityName?: string
    /** code */
    code?: string
    /** 联系人 */
    contact?: string
    /** 创建时间 */
    createdAt?: number
    /** 信用代码 */
    creditCode?: string
    /** 客户标签 */
    customerTags?: any[]
    /** 客户标签名 */
    customerTagsName?: any[]
    /** deleted */
    deleted?: number
    /** 跟进人 */
    follower?: any[]
    /** 跟进人名字 */
    followerNames?: any[]
    /** 客户等级 */
    level?: number
    /** 客户等级名 */
    levelName?: string
    /** 联系人电话 */
    mobile?: string
    /** 客户名称 */
    name?: string
    /** 联系人职务 */
    post?: string
    /** 地区省 */
    province?: string
    /** 地区省 */
    provinceName?: string
    /** 标签id */
    tags?: any[]
    /** 标签名字 */
    tagsName?: any[]
    /** 客户类型 */
    typeList?: any[]
    /** 客户类型名 */
    typeNameList?: any[]
}

/**
 * requestUrl /search/sync/customer/save
 * method post
 */
export interface SaveUsingPOST_1Response {
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
 * requestUrl /search/sync/customer/update
 * method post
 */
export interface UpdateUsingPOST_1Request {
    /** 市 */
    city?: string
    /** 市 */
    cityName?: string
    /** code */
    code?: string
    /** 联系人 */
    contact?: string
    /** 创建时间 */
    createdAt?: number
    /** 信用代码 */
    creditCode?: string
    /** 客户标签 */
    customerTags?: any[]
    /** 客户标签名 */
    customerTagsName?: any[]
    /** deleted */
    deleted?: number
    /** 跟进人 */
    follower?: any[]
    /** 跟进人名字 */
    followerNames?: any[]
    /** 客户等级 */
    level?: number
    /** 客户等级名 */
    levelName?: string
    /** 联系人电话 */
    mobile?: string
    /** 客户名称 */
    name?: string
    /** 联系人职务 */
    post?: string
    /** 地区省 */
    province?: string
    /** 地区省 */
    provinceName?: string
    /** 标签id */
    tags?: any[]
    /** 标签名字 */
    tagsName?: any[]
    /** 客户类型 */
    typeList?: any[]
    /** 客户类型名 */
    typeNameList?: any[]
}

/**
 * requestUrl /search/sync/customer/update
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

interface BasePaginationRsp商品分页列表返回对象 {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: 商品分页列表返回对象
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

interface 商品分页列表返回对象 {
    /** 代理商家编码 */
    agentMerchantCode?: string
    /** 代理商家名称 */
    agentMerchantName?: string
    /** 商品类型链路详情 */
    categoryList?: any[]
    /** 唯一编码 */
    code?: string
    /** 创建时间 */
    createdAt?: number
    /**  状态，0开启  1关闭 */
    deleted?: number
    /** 预留字段1 */
    ext1?: string
    /** 预留字段2 */
    ext2?: string
    /** 商品类目id */
    goodsCategoryId?: number
    /** 物料编码 */
    matterCode?: string
    /** 商家名称 */
    merchantName?: string
    /** 商家编码 */
    merchantOrgCode?: string
    /** 商品名称 */
    name?: string
    /** 价格 */
    price?: number
    /** 站点信息 */
    site?: 站点基本信息列表
    /**  状态，0开启  1关闭 */
    status?: number
    /** 商品类型标签数组 */
    tagList?: 标签数据
    /** 税率 */
    taxRate?: number
    /** 商品类型 1：自营，2：第三方 */
    type?: number
    /** 类型名称 */
    typeName?: string
    /** 更新时间 */
    updatedAt?: number
}

interface 站点基本信息列表 {
    /** 别名 */
    alias?: string
    /** 创建时间 */
    createdAt?: number
    /** 站点id */
    id?: number
    /** 一级模块列表 */
    modules?: any[]
    /** 站点名称 */
    name?: string
    /** 站点简称 */
    shortName?: string
    /** 更新时间 */
    updatedAt?: number
}

interface 标签数据 {
    /** id */
    id?: number
    /** 标题 */
    name?: string
    /** 类型 */
    type?: number
}

/**
 * requestUrl /search/backend/goods/page
 * method post
 */
export interface PageUsingPOST_4Request {
    /** 商品编码 */
    codes?: any[]
    /** 结束日期 */
    endTime?: number
    /** 类目id */
    goodsCategoryId?: number
    /** 商家 */
    merchantOrgCode?: string
    /** 商品名称 */
    name?: string
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
    /** 开始日期 */
    startTime?: number
    /** 状态 */
    status?: number
    /** 标签id */
    tagId?: number
    /** 商品类型 */
    type?: number
}

/**
 * requestUrl /search/backend/goods/page
 * method post
 */
export interface PageUsingPOST_4Response {
    /** 响应数据 */
    data?: BasePaginationRsp商品分页列表返回对象
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRsp商品分类分页返回数据 {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: 商品分类分页返回数据
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

interface 商品分类分页返回数据 {
    /** 关联下级数 */
    childNum?: number
    /** 操作时间 */
    createdAt?: number
    /** id */
    id?: number
    /** 类目名称 */
    name?: string
    /** 上级id */
    parentId?: number
    /** 上级名称 */
    parentName?: string
    /** 排序 */
    sort?: number
    /** 状态 0 开启  1关闭  */
    status?: number
    /** 标签 */
    tagList?: 标签数据
}

/**
 * requestUrl /search/backend/goods/page_category
 * method post
 */
export interface PageUsingPOST_3Request {
    /** 类目名称 */
    name?: string
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
    /** 标签id */
    tagList?: any[]
}

/**
 * requestUrl /search/backend/goods/page_category
 * method post
 */
export interface PageUsingPOST_3Response {
    /** 响应数据 */
    data?: BasePaginationRsp商品分类分页返回数据
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /search/sync/goods/batch_delete_category
 * method post
 */
export interface BatchDeleteGoodsCategoryUsingPOSTRequest {
    /** id */
    ids: any[]
}

/**
 * requestUrl /search/sync/goods/batch_delete_category
 * method post
 */
export interface BatchDeleteGoodsCategoryUsingPOSTResponse {
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
 * requestUrl /search/sync/goods/delete_goods
 * method post
 */
export interface DeleteGoodsUsingPOSTRequest {
    /** 代理商家 */
    agentMerchantCode?: string
    /** 商品编码 */
    code?: string
    /** 创建时间 */
    createdAt?: number
    /**  状态，0正常  1删除 */
    deleted?: number
    /** 类目id */
    goodsCategoryId?: number
    /** 物料编码 */
    matterCode?: string
    /** 商家 */
    merchantOrgCode?: string
    /** 商品名称 */
    name?: string
    /** 单价 */
    price?: number
    /** 站点id */
    sid?: number
    /**  状态，0开启  1关闭 */
    status?: number
    /** 税率 */
    taxRate?: number
    /**  商品类型 1：自营，2：第三方 */
    type?: number
}

/**
 * requestUrl /search/sync/goods/delete_goods
 * method post
 */
export interface DeleteGoodsUsingPOSTResponse {
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
 * requestUrl /search/sync/goods/modify_category_sort
 * method post
 */
export interface ModifyGoodsCategorySortUsingPOSTRequest {
    /** 创建时间 */
    createdAt?: number
    /**  状态，0开启  1关闭 */
    deleted?: number
    /** id */
    id?: number
    /** 类目名称 */
    name?: string
    /** 上级id */
    parentId?: number
    /** 排序 */
    sort?: number
    /**  状态，0开启  1关闭 */
    status?: number
    /** 标签 */
    tagList?: any[]
}

/**
 * requestUrl /search/sync/goods/modify_category_sort
 * method post
 */
export interface ModifyGoodsCategorySortUsingPOSTResponse {
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
 * requestUrl /search/sync/goods/modify_category_status
 * method post
 */
export interface ModifyGoodsCategoryStatusUsingPOSTRequest {
    /** 创建时间 */
    createdAt?: number
    /**  状态，0开启  1关闭 */
    deleted?: number
    /** id */
    id?: number
    /** 类目名称 */
    name?: string
    /** 上级id */
    parentId?: number
    /** 排序 */
    sort?: number
    /**  状态，0开启  1关闭 */
    status?: number
    /** 标签 */
    tagList?: any[]
}

/**
 * requestUrl /search/sync/goods/modify_category_status
 * method post
 */
export interface ModifyGoodsCategoryStatusUsingPOSTResponse {
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
 * requestUrl /search/sync/goods/modify_goods_status
 * method post
 */
export interface ModifyGoodsStatusUsingPOSTRequest {
    /** 代理商家 */
    agentMerchantCode?: string
    /** 商品编码 */
    code?: string
    /** 创建时间 */
    createdAt?: number
    /**  状态，0正常  1删除 */
    deleted?: number
    /** 类目id */
    goodsCategoryId?: number
    /** 物料编码 */
    matterCode?: string
    /** 商家 */
    merchantOrgCode?: string
    /** 商品名称 */
    name?: string
    /** 单价 */
    price?: number
    /** 站点id */
    sid?: number
    /**  状态，0开启  1关闭 */
    status?: number
    /** 税率 */
    taxRate?: number
    /**  商品类型 1：自营，2：第三方 */
    type?: number
}

/**
 * requestUrl /search/sync/goods/modify_goods_status
 * method post
 */
export interface ModifyGoodsStatusUsingPOSTResponse {
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
 * requestUrl /search/sync/goods/save
 * method post
 */
export interface SaveGoodsUsingPOSTRequest {
    /** 代理商家 */
    agentMerchantCode?: string
    /** 商品编码 */
    code?: string
    /** 创建时间 */
    createdAt?: number
    /**  状态，0正常  1删除 */
    deleted?: number
    /** 类目id */
    goodsCategoryId?: number
    /** 物料编码 */
    matterCode?: string
    /** 商家 */
    merchantOrgCode?: string
    /** 商品名称 */
    name?: string
    /** 单价 */
    price?: number
    /** 站点id */
    sid?: number
    /**  状态，0开启  1关闭 */
    status?: number
    /** 税率 */
    taxRate?: number
    /**  商品类型 1：自营，2：第三方 */
    type?: number
}

/**
 * requestUrl /search/sync/goods/save
 * method post
 */
export interface SaveGoodsUsingPOSTResponse {
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
 * requestUrl /search/sync/goods/save_category
 * method post
 */
export interface SaveGoodsCategoryUsingPOSTRequest {
    /** 创建时间 */
    createdAt?: number
    /**  状态，0开启  1关闭 */
    deleted?: number
    /** id */
    id?: number
    /** 类目名称 */
    name?: string
    /** 上级id */
    parentId?: number
    /** 排序 */
    sort?: number
    /**  状态，0开启  1关闭 */
    status?: number
    /** 标签 */
    tagList?: any[]
}

/**
 * requestUrl /search/sync/goods/save_category
 * method post
 */
export interface SaveGoodsCategoryUsingPOSTResponse {
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
 * requestUrl /search/sync/goods/update
 * method post
 */
export interface UpdateGoodsUsingPOSTRequest {
    /** 代理商家 */
    agentMerchantCode?: string
    /** 商品编码 */
    code?: string
    /** 创建时间 */
    createdAt?: number
    /**  状态，0正常  1删除 */
    deleted?: number
    /** 类目id */
    goodsCategoryId?: number
    /** 物料编码 */
    matterCode?: string
    /** 商家 */
    merchantOrgCode?: string
    /** 商品名称 */
    name?: string
    /** 单价 */
    price?: number
    /** 站点id */
    sid?: number
    /**  状态，0开启  1关闭 */
    status?: number
    /** 税率 */
    taxRate?: number
    /**  商品类型 1：自营，2：第三方 */
    type?: number
}

/**
 * requestUrl /search/sync/goods/update
 * method post
 */
export interface UpdateGoodsUsingPOSTResponse {
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
 * requestUrl /search/sync/goods/update_category
 * method post
 */
export interface UpdateGoodsCategoryUsingPOSTRequest {
    /** 创建时间 */
    createdAt?: number
    /**  状态，0开启  1关闭 */
    deleted?: number
    /** id */
    id?: number
    /** 类目名称 */
    name?: string
    /** 上级id */
    parentId?: number
    /** 排序 */
    sort?: number
    /**  状态，0开启  1关闭 */
    status?: number
    /** 标签 */
    tagList?: any[]
}

/**
 * requestUrl /search/sync/goods/update_category
 * method post
 */
export interface UpdateGoodsCategoryUsingPOSTResponse {
    /** 响应数据 */
    data?: string
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 发票分页列表返回对象 {
    /** 开票金额 */
    amount?: number
    /** 红票所属蓝票编码 */
    blueCode?: string
    /** 唯一编码 */
    code?: string
    /** 创建时间 */
    createdAt?: number
    /** 预留字段1 */
    ext1?: string
    /** 预留字段2 */
    ext2?: string
    /** 发票编号（标签高亮） */
    highlightInvoiceNo?: string
    /** 用户身份id */
    identity?: number
    /** 发票编号 */
    invoiceNo?: string
    /** 开票时间 */
    invoiceTime?: number
    /** 开票类型，1：普通发票、2：增值税专用发票 */
    invoiceType?: number
    /** 开票附件url */
    invoiceUrl?: string
    /** 开票类别，1：蓝票，2：红票 */
    makeType?: number
    /** 个人抬头-姓名 */
    name?: string
    /** 发票订单编码数组 */
    orderCodes?: any[]
    /** 机构用户，发票所属机构编码 */
    organizationCode?: string
    /** 客户所在省份编号 */
    province?: number
    /** 驳回原因 */
    rejectReason?: string
    /** 开票状态，1：待审核、2：待开票、3：已驳回、4：已开票 */
    status?: number
    /** 抬头名称 */
    titleName?: string
    /** 物流单号 */
    trackingNo?: string
    /** 用户编码 */
    userCode?: string
}

/**
 * requestUrl /search/backend/invoice/history
 * method get
 */
export interface InvoiceHistoryUsingGETResponse {
    /** 响应数据 */
    data?: 发票分页列表返回对象
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRsp发票分页列表返回对象 {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: 发票分页列表返回对象
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

/**
 * requestUrl /search/backend/invoice/page
 * method post
 */
export interface PageUsingPOST_5Request {
    /** 开票日期-查询结束日期 */
    endTime?: string
    /** 发票申请编号 */
    invoiceNo?: string
    /** 开票类型，1：普通发票、2：增值税专用发票 */
    invoiceType?: number
    /** 开票类别，1：蓝票，2：红票 */
    makeType?: number
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
    /** 省份id数组 */
    provinces?: any[]
    /** 开票日期-查询开始日期 */
    startTime?: string
    /** 开票状态，1：待审核、2：待开票、3：已驳回、4：已开票 */
    status?: number
    /** tag编号数组 */
    tags?: any[]
}

/**
 * requestUrl /search/backend/invoice/page
 * method post
 */
export interface PageUsingPOST_5Response {
    /** 响应数据 */
    data?: BasePaginationRsp发票分页列表返回对象
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /search/backend/invoice/status_count
 * method get
 */
export interface StatusCountUsingGETResponse {
    /** 响应数据 */
    data?: 键值对返回对象intlong
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 发票抬头分页列表返回对象 {
    /** 地址 */
    address?: string
    /** 银行账号 */
    bankAccount?: string
    /** 唯一编码 */
    code?: string
    /** 创建时间 */
    createdAt?: number
    /** 0正常  1删除 */
    deleted?: number
    /** 预留字段1 */
    ext1?: string
    /** 预留字段2 */
    ext2?: string
    /** 身份证号 */
    idCard?: string
    /** 姓名 */
    name?: string
    /** 开户行 */
    openningBank?: string
    /** 电话 */
    phone?: string
    /** 税号 */
    taxNum?: string
    /** 抬头名称 */
    titleName?: string
    /** 抬头类型，1：企业，2：个人 */
    type?: number
    /** 用户编码 */
    userCode?: string
}

/**
 * requestUrl /search/front/invoice/list_title
 * method post
 */
export interface ListUserTitleUsingPOSTRequest {
    /** 抬头类型，1：企业，2：个人 */
    type: number
}

/**
 * requestUrl /search/front/invoice/list_title
 * method post
 */
export interface ListUserTitleUsingPOSTResponse {
    /** 响应数据 */
    data?: 发票抬头分页列表返回对象
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /search/front/invoice/page
 * method post
 */
export interface PageUsingPOST_6Request {
    /** 用户身份id */
    identity?: number
    /** 发票申请编号 */
    invoiceNo?: string
    /** 开票类型，1：普通发票、2：增值税专用发票 */
    invoiceType?: number
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 是否机构用户 */
    orgUser?: boolean
    /** 机构用户，发票所属机构编码 */
    organizationCode?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
    /** 开票状态，1：待审核、2：待开票、3：已驳回、4：已开票 */
    status?: number
}

/**
 * requestUrl /search/front/invoice/page
 * method post
 */
export interface PageUsingPOST_6Response {
    /** 响应数据 */
    data?: BasePaginationRsp发票分页列表返回对象
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /search/sync/invoice/delete_invoice
 * method post
 */
export interface DeleteInvoiceUsingPOSTResponse {
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
 * requestUrl /search/sync/invoice/delete_title
 * method post
 */
export interface DeleteInvoiceTitleUsingPOSTResponse {
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
 * requestUrl /search/sync/invoice/save_invoice
 * method post
 */
export interface SaveInvoiceUsingPOSTRequest {
    /** 开票金额 */
    amount?: number
    /** 红票所属蓝票编码 */
    blueCode?: string
    /** 唯一编码 */
    code?: string
    /** 创建时间 */
    createdAt?: number
    /** 预留字段1 */
    ext1?: string
    /** 预留字段2 */
    ext2?: string
    /** 用户身份 */
    identity?: number
    /** 发票编号 */
    invoiceNo?: string
    /** 开票类型，1：普通发票、2：增值税专用发票 */
    invoiceType?: number
    /** 开票类别，1：蓝票，2：红票 */
    makeType?: number
    /** 个人抬头-姓名 */
    name?: string
    /** 创建时间 */
    orderCodes?: any[]
    /** 机构用户，订单所属机构编码 */
    organizationCode?: string
    /** 客户所在省份编号 */
    province?: number
    /** 开票状态，1：待审核、2：待开票、3：已驳回、4：已开票 */
    status?: number
    /** 抬头名称 */
    titleName?: string
    /** 用户编码 */
    userCode?: string
}

/**
 * requestUrl /search/sync/invoice/save_invoice
 * method post
 */
export interface SaveInvoiceUsingPOSTResponse {
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
 * requestUrl /search/sync/invoice/save_title
 * method post
 */
export interface SaveInvoiceTitleUsingPOSTRequest {
    /** 地址 */
    address?: string
    /** 银行账号 */
    bankAccount?: string
    /** 唯一编码 */
    code?: string
    /** 创建时间 */
    createdAt?: number
    /** 身份证号 */
    idCard?: string
    /** 姓名 */
    name?: string
    /** 开户行 */
    openningBank?: string
    /** 电话 */
    phone?: string
    /** 税号 */
    taxNum?: string
    /** 抬头名称 */
    titleName?: string
    /** 抬头类型，1：企业，2：个人 */
    type?: number
    /** 用户编码 */
    userCode?: string
}

/**
 * requestUrl /search/sync/invoice/save_title
 * method post
 */
export interface SaveInvoiceTitleUsingPOSTResponse {
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
 * requestUrl /search/sync/invoice/update_invoice
 * method post
 */
export interface UpdateInvoiceUsingPOSTRequest {
    /**  */
    code: string
    /**  */
    invoiceTime?: number
    /**  */
    invoiceUrl?: string
    /**  */
    rejectReason?: string
    /**  */
    status: number
    /**  */
    trackingNo?: string
}

/**
 * requestUrl /search/sync/invoice/update_invoice
 * method post
 */
export interface UpdateInvoiceUsingPOSTResponse {
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
 * requestUrl /search/sync/invoice/update_title
 * method post
 */
export interface UpdateInvoiceTitleUsingPOSTRequest {
    /** 地址 */
    address?: string
    /** 银行账号 */
    bankAccount?: string
    /** 唯一编码 */
    code?: string
    /** 创建时间 */
    createdAt?: number
    /** 身份证号 */
    idCard?: string
    /** 姓名 */
    name?: string
    /** 开户行 */
    openningBank?: string
    /** 电话 */
    phone?: string
    /** 税号 */
    taxNum?: string
    /** 抬头名称 */
    titleName?: string
    /** 抬头类型，1：企业，2：个人 */
    type?: number
    /** 用户编码 */
    userCode?: string
}

/**
 * requestUrl /search/sync/invoice/update_title
 * method post
 */
export interface UpdateInvoiceTitleUsingPOSTResponse {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRsp用户端登录日志信息返回对象 {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: 用户端登录日志信息返回对象
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

interface 用户端登录日志信息返回对象 {
    /** 唯一编码 */
    code?: string
    /** 预留字段1 */
    ext1?: string
    /** 预留字段2 */
    ext2?: string
    /** 登录ip */
    ip?: string
    /** 登录时间 */
    loginTime?: number
    /** 站点 */
    sid?: number
    /** 终端，1PC网页，2小程序 */
    terminal?: number
    /** 终端描述，PC网页/小程序 */
    terminalDesc?: string
    /** 类型，1账号登录，2手机验证码登录 */
    type?: number
    /** 登录方式描述，账号登录/手机验证码 */
    typeDesc?: string
    /** 用户编码 */
    userCode?: string
}

/**
 * requestUrl /search/front/login/auth_list/{type}
 * method post
 */
export interface ListAuthLogUsingPOSTRequest {
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
 * requestUrl /search/front/login/auth_list/{type}
 * method post
 */
export interface ListAuthLogUsingPOSTResponse {
    /** 响应数据 */
    data?: BasePaginationRsp用户端登录日志信息返回对象
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /search/sync/merchant_org/save
 * method post
 */
export interface SaveMerchantUsingPOSTRequest {
    /** 唯一编码 */
    code?: string
    /** 创建时间 */
    createdAt?: number
    /** 状态  0正常  1删除 */
    deleted?: number
    /** 预留字段1 */
    ext1?: string
    /** 预留字段2 */
    ext2?: string
    /** 商户名称 */
    name?: string
    /** 简称 */
    shortName?: string
    /** 状态  0正常  1禁用 */
    status?: number
    /** 用户编码 */
    userCode?: string
}

/**
 * requestUrl /search/sync/merchant_org/save
 * method post
 */
export interface SaveMerchantUsingPOSTResponse {
    /** 响应数据 */
    data?: string
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 操作日志Index {
    /** 模块细分 */
    action?: string
    /** 操作人code */
    adminCode?: string
    /** 操作人name */
    adminName?: string
    /** 唯一编码 */
    code?: string
    /** 创建时间 */
    createdAt?: number
    /** ip地址 */
    ip?: string
    /** 更新的主键 */
    keyCode?: string
    /** 模块 */
    module?: string
    /** 请求参数 */
    param?: string
}

/**
 * requestUrl /search/backend/operation_log/detail
 * method get
 */
export interface DetailUsingGETResponse {
    /** 响应数据 */
    data?: 操作日志Index
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRsp操作日志Index {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: 操作日志Index
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

/**
 * requestUrl /search/backend/operation_log/page
 * method post
 */
export interface PageUsingPOST_7Request {
    /** 管理员账号 */
    adminAccount?: string
    /** 操作结束时间 */
    execEndTime?: number
    /** 操作开始时间 */
    execStartTime?: number
    /** 操作模块 */
    module?: string
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
    /** userCode */
    userCode?: string
    /** 用户名 */
    userName?: string
}

/**
 * requestUrl /search/backend/operation_log/page
 * method post
 */
export interface PageUsingPOST_7Response {
    /** 响应数据 */
    data?: BasePaginationRsp操作日志Index
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /search/sync/operation_log/save
 * method post
 */
export interface SaveUsingPOST_2Request {
    /** 模块细分 */
    action?: string
    /** 操作人code */
    adminCode?: string
    /** 操作人name */
    adminName?: string
    /** 唯一编码 */
    code?: string
    /** 创建时间 */
    createdAt?: number
    /** ip地址 */
    ip?: string
    /** 更新的主键 */
    keyCode?: string
    /** 模块 */
    module?: string
    /** 请求参数 */
    param?: string
}

/**
 * requestUrl /search/sync/operation_log/save
 * method post
 */
export interface SaveUsingPOST_2Response {
    /** 响应数据 */
    data?: string
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 售后单索引 {
    /** 买家类型，1：个人，2：机构 */
    buyerType?: number
    /** 唯一编码 */
    code?: string
    /** 创建时间 */
    createdAt?: number
    /** 预留字段1 */
    ext1?: string
    /** 预留字段2 */
    ext2?: string
    /** 商品唯一编码 */
    goodsCode?: string
    /** 商品名称 */
    goodsName?: string
    /** 用户身份id */
    identity?: number
    /** 商家身份 */
    merchantIdentity?: number
    /** 订单商品所属商家编码 */
    merchantOrgCode?: string
    /** 订单编码 */
    orderCode?: string
    /** 商品订单唯一编码 */
    orderGoodsCode?: string
    /** 订单编号 */
    orderNo?: string
    /** 机构用户，售后单所属机构编码 */
    organizationCode?: string
    /** 支付方式，0：支付宝，1：微信，2：线下支付 */
    payType?: number
    /** 客户所在省份编号 */
    province?: number
    /** 应退金额 */
    refundAmount?: number
    /** 是否按照数量退款 */
    refundByCount?: number
    /** 退款数量 */
    refundCount?: number
    /** 退款原因 */
    refundReason?: string
    /** 站点 */
    sid?: number
    /** 状态 0 待审核,1 售后中,2 已完成,3 申请失败 */
    status?: number
    /** 业务标签 */
    tags?: any[]
    /** 用户编码 */
    userCode?: string
}

/**
 * requestUrl /search/backend/order/list_refund_order
 * method get
 */
export interface ListRefundOrdersByOrderCodeUsingGETResponse {
    /** 响应数据 */
    data?: 售后单索引
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /search/backend/order/order_pay_status_and_count
 * method get
 */
export interface GetOrderPayStatusAndCountUsingGETResponse {
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
 * requestUrl /search/backend/order/order_status_and_count
 * method get
 */
export interface GetOrderStatusAndCountUsingGETResponse {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRsp键值对返回对象stringstring {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: 键值对返回对象stringstring
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

interface 键值对返回对象stringstring {
    /** 键 */
    name?: string
    /** 值 */
    value?: string
}

/**
 * requestUrl /search/backend/order/page_backend_order_buyer
 * method post
 */
export interface PageBackendOrderBuyerUsingPOSTRequest {
    /** 买家类型，1：个人，2：机构 */
    buyerType?: number
    /** 买家名称 */
    name?: string
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
    /** 客户所属省份id数组 */
    provinces?: any[]
    /** 业务标签数组 */
    tags?: any[]
}

/**
 * requestUrl /search/backend/order/page_backend_order_buyer
 * method post
 */
export interface PageBackendOrderBuyerUsingPOSTResponse {
    /** 响应数据 */
    data?: BasePaginationRsp键值对返回对象stringstring
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRspBackendOrderPageRespDto {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: BackendOrderPageRespDto
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

interface BackendOrderPageRespDto {
    /** 代理商编码 */
    agentCode?: string
    /** 订单商品所属代理商家编码 */
    agentMerchantCode?: string
    /** 代理商 */
    agentName?: string
    /** 业务编码，例如活动编码、班级编码 */
    bizCodes?: any[]
    /** 买家名称 */
    buyerName?: string
    /** 买家类型，1：个人，2：机构 */
    buyerType?: number
    /** 是否可开蓝票 0不可开 1可开 */
    canBlueInvoice?: number
    /** 是否可开红票 0不可开 1可开 */
    canRedInvoice?: number
    /** 唯一编码 */
    code?: string
    /** 合同订单编码：目前为一笔订单只有单个合同，扩展用 */
    contractCodes?: any[]
    /** 是否合同型订单，true(1)：是，false(0)：否 */
    contractOrder?: number
    /** 创建时间，下单时间 */
    createdAt?: number
    /** 客户编码 */
    customerCode?: string
    /** 是否已申请延期 */
    delayed?: boolean
    /** 合同订单预计支付时间 */
    expectPayTime?: number
    /**  */
    ext1?: string
    /**  */
    ext2?: string
    /** 用户身份 */
    identity?: number
    /** 开票状态，0未开票，1已开票 */
    invoicingStatus?: number
    /** 商家身份 */
    merchantIdentity?: number
    /** 卖家名称 */
    merchantName?: string
    /** 订单商品所属商家编码 */
    merchantOrgCode?: string
    /** 商品订单列表 */
    orderGoodsList?: 商品订单
    /** 订单编号 */
    orderNo?: string
    /** 机构用户，订单所属机构编码 */
    organizationCode?: string
    /** 订单支付状态：1未支付、2已延期、3已逾期、4待审核、5待上传凭证、6支付成功、7支付关闭 */
    payStatus?: number
    /** 支付时间 */
    payTime?: number
    /** 支付方式，0：支付宝，1：微信，2：线下支付 */
    payType?: number
    /** 客户所在省份编号 */
    province?: number
    /** 备注 */
    remark?: string
    /** 结算对象编码 */
    settleTargetCode?: string
    /** 平台主体(结算对象名称) */
    settleTargetName?: string
    /** 站点 */
    sid?: number
    /** 站点名称 */
    siteName?: string
    /** 订单状态，1未支付、2支付待确认、3已支付、4已完成、5已关闭 */
    status?: number
    /** 业务标签 */
    tags?: any[]
    /** 总额 */
    totalAmount?: number
    /** 用户编码 */
    userCode?: string
}

interface 商品订单 {
    /** 编码 */
    code?: string
    /** 创建时间 */
    createdAt?: number
    /** 优惠价 */
    discountPrice?: number
    /**  */
    ext1?: string
    /**  */
    ext2?: string
    /** 商品属性名称 */
    goodsAttributes?: string
    /** 商品类目名称 */
    goodsCategories?: string
    /** 商品类目别名 */
    goodsCategoryAlias?: string
    /** 商品编码 */
    goodsCode?: string
    /** 商品图片 */
    goodsImage?: string
    /** 商品名称 */
    goodsName?: string
    /** 订单编码 */
    orderCode?: string
    /** 商品原价 */
    price?: number
    /** 购买数量 */
    quantity?: number
    /** 服务费比例：点播课：取课程服务费比例；自有课：取推送设置中填写的自有课平台方服务费比例；私有课：无 */
    serviceFeeRatio?: number
    /** 税率 */
    taxRate?: number
    /** 用户编码 */
    userCode?: string
}

/**
 * requestUrl /search/backend/order/page_order
 * method post
 */
export interface PageOrderUsingPOSTRequest {
    /** 实收款-最高金额 */
    amountHigh?: number
    /** 实收款-最低金额 */
    amountLow?: number
    /** 买家 */
    buyerCode?: string
    /** 买家类型，1：个人，2：机构 */
    buyerType?: number
    /** 订单类型：0平台型订单、1合同型订单 */
    contractOrder?: number
    /** 创建日期-查询结束时间 */
    createEndTime?: number
    /** 创建日期-查询开始时间 */
    createStartTime?: number
    /** 卖家 */
    merchantOrgCode?: string
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 订单编号 */
    orderNo?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
    /** 1未支付、2已延期、3已逾期、4待审核、5待上传凭、6支付成功、7支付关闭 */
    payStatus?: number
    /** 支付方式，0：线上支付，1：线下支付 */
    payType?: number
    /** 省份id数组 */
    provinces?: any[]
    /** 备注 */
    remark?: string
    /** 站点 */
    sid?: number
    /** 订单状态，1未支付、2支付待确认、3已支付、4已完成、5已关闭 */
    status?: number
    /** tag编号数组 */
    tags?: any[]
}

/**
 * requestUrl /search/backend/order/page_order
 * method post
 */
export interface PageOrderUsingPOSTResponse {
    /** 响应数据 */
    data?: BasePaginationRspBackendOrderPageRespDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /search/backend/order/page_order_for_contract
 * method post
 */
export interface PageOrderForContractUsingPOSTRequest {
    /** 业务编码，例如活动编码、班级编码 */
    bizCode?: string
    /** 合同编码 */
    contractCode?: string
    /** 客户编码 */
    customerCode?: string
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
 * requestUrl /search/backend/order/page_order_for_contract
 * method post
 */
export interface PageOrderForContractUsingPOSTResponse {
    /** 响应数据 */
    data?: BasePaginationRspBackendOrderPageRespDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRspBackendRefundOrderPageRespDto {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: BackendRefundOrderPageRespDto
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

interface BackendRefundOrderPageRespDto {
    /** 买家类型，1：个人，2：机构 */
    buyerType?: number
    /** 唯一编码 */
    code?: string
    /** 创建时间 */
    createdAt?: number
    /** 预留字段1 */
    ext1?: string
    /** 预留字段2 */
    ext2?: string
    /** 商品唯一编码 */
    goodsCode?: string
    /** 商品名称 */
    goodsName?: string
    /** 用户身份id */
    identity?: number
    /** 开票状态，0未开票，1已开票 */
    invoicingStatus?: number
    /** 商家身份 */
    merchantIdentity?: number
    /** 订单商品所属商家编码 */
    merchantOrgCode?: string
    /** 订单编码 */
    orderCode?: string
    /** 商品订单唯一编码 */
    orderGoodsCode?: string
    /** 订单编号 */
    orderNo?: string
    /** 机构用户，售后单所属机构编码 */
    organizationCode?: string
    /** 支付方式，0：支付宝，1：微信，2：线下支付 */
    payType?: number
    /** 单价 */
    price?: number
    /** 客户所在省份编号 */
    province?: number
    /** 应退金额 */
    refundAmount?: number
    /** 是否按照数量退款 */
    refundByCount?: number
    /** 退款数量 */
    refundCount?: number
    /** 退款原因 */
    refundReason?: string
    /** 站点 */
    sid?: number
    /** 站点名称 */
    siteName?: string
    /** 状态 0 待审核,1 售后中,2 已完成,3 申请失败 */
    status?: number
    /** 业务标签 */
    tags?: any[]
    /** 用户编码 */
    userCode?: string
}

/**
 * requestUrl /search/backend/order/page_refund
 * method post
 */
export interface PageRefundUsingPOSTRequest {
    /** 售后单ID */
    code?: string
    /** 创建时间结束 */
    createdEnd?: string
    /** 创建时间开始 */
    createdStart?: string
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 订单ID */
    orderNo?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
    /** 支付方式，0：支付宝，1：微信，2：线下支付 */
    payType?: number
    /** 省份id数组 */
    provinces?: any[]
    /** 站点 */
    sid?: number
    /** 售后状态 0待审核 1售后中 2完成 3申请失败  */
    status?: number
    /** tag编号数组 */
    tags?: any[]
}

/**
 * requestUrl /search/backend/order/page_refund
 * method post
 */
export interface PageRefundUsingPOSTResponse {
    /** 响应数据 */
    data?: BasePaginationRspBackendRefundOrderPageRespDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /search/front/order/buyer_status_count
 * method post
 */
export interface GetBuyerOrderStatusAndCountUsingPOSTRequest {
    /** 用户身份 */
    identity?: number
    /** 是否机构用户 */
    orgUser?: boolean
    /** 机构用户，订单所属机构编码 */
    organizationCode?: string
}

/**
 * requestUrl /search/front/order/buyer_status_count
 * method post
 */
export interface GetBuyerOrderStatusAndCountUsingPOSTResponse {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 我的可开票订单列表响应对象 {
    /** 可开票金额 */
    availableAmount?: number
    /** 订单编码 */
    code?: string
    /** 下单时间 */
    createdAt?: number
    /** 订单ID */
    orderNo?: string
    /** 售后状态 0无售后 1售后中 2已售后 */
    refundStatus?: number
    /** 订单状态，1未支付、2支付待确认、3已支付、4已完成、5已关闭 */
    status?: number
    /** 订单金额 */
    totalAmount?: number
}

/**
 * requestUrl /search/front/order/list_for_invoice
 * method post
 */
export interface ListForInvoiceUsingPOSTRequest {
    /** 查询结束时间 */
    endTime?: string
    /** 用户身份 */
    identity?: number
    /** 订单ID */
    orderNo?: string
    /** 订单状态，1未支付、2支付待确认、3已支付、4已完成、5已关闭 */
    orderStatus?: number
    /** 是否机构用户 */
    orgUser?: boolean
    /** 机构用户，订单所属机构编码 */
    organizationCode?: string
    /** 查询开始时间 */
    startTime?: string
}

/**
 * requestUrl /search/front/order/list_for_invoice
 * method post
 */
export interface ListForInvoiceUsingPOSTResponse {
    /** 响应数据 */
    data?: 我的可开票订单列表响应对象
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRspMerchantOrderPageRespDto {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: MerchantOrderPageRespDto
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

interface MerchantOrderPageRespDto {
    /** 代理商编码 */
    agentCode?: string
    /** 订单商品所属代理商家编码 */
    agentMerchantCode?: string
    /** 代理商 */
    agentName?: string
    /** 业务编码，例如活动编码、班级编码 */
    bizCodes?: any[]
    /** 买家名称 */
    buyerName?: string
    /** 买家类型，1：个人，2：机构 */
    buyerType?: number
    /** 是否可开蓝票 0不可开 1可开 */
    canBlueInvoice?: number
    /** 是否可开红票 0不可开 1可开 */
    canRedInvoice?: number
    /** 唯一编码 */
    code?: string
    /** 合同订单编码：目前为一笔订单只有单个合同，扩展用 */
    contractCodes?: any[]
    /** 是否合同型订单，true(1)：是，false(0)：否 */
    contractOrder?: number
    /** 创建时间，下单时间 */
    createdAt?: number
    /** 客户编码 */
    customerCode?: string
    /** 是否已申请延期 */
    delayed?: boolean
    /** 合同订单预计支付时间 */
    expectPayTime?: number
    /**  */
    ext1?: string
    /**  */
    ext2?: string
    /** 用户身份 */
    identity?: number
    /** 开票状态，0未开票，1已开票 */
    invoicingStatus?: number
    /** 商家身份 */
    merchantIdentity?: number
    /** 订单商品所属商家编码 */
    merchantOrgCode?: string
    /** 商品订单列表 */
    orderGoodsDtos?: MerchantOrderGoodsDto
    /** 商品订单列表 */
    orderGoodsList?: 商品订单
    /** 订单编号 */
    orderNo?: string
    /** 机构用户，订单所属机构编码 */
    organizationCode?: string
    /** 订单支付状态：1未支付、2已延期、3已逾期、4待审核、5待上传凭证、6支付成功、7支付关闭 */
    payStatus?: number
    /** 支付时间 */
    payTime?: number
    /** 支付方式，0：支付宝，1：微信，2：线下支付 */
    payType?: number
    /** 客户所在省份编号 */
    province?: number
    /** 备注 */
    remark?: string
    /** 结算对象编码 */
    settleTargetCode?: string
    /** 平台主体(结算对象名称) */
    settleTargetName?: string
    /** 站点 */
    sid?: number
    /** 订单状态，1未支付、2支付待确认、3已支付、4已完成、5已关闭 */
    status?: number
    /** 业务标签 */
    tags?: any[]
    /** 总额 */
    totalAmount?: number
    /** 用户编码 */
    userCode?: string
}

interface MerchantOrderGoodsDto {
    /** 编码 */
    code?: string
    /** 创建时间 */
    createdAt?: number
    /** 优惠价 */
    discountPrice?: number
    /**  */
    ext1?: string
    /**  */
    ext2?: string
    /** 商品属性名称 */
    goodsAttributes?: string
    /** 商品类目名称 */
    goodsCategories?: string
    /** 商品类目别名 */
    goodsCategoryAlias?: string
    /** 商品编码 */
    goodsCode?: string
    /** 商品图片 */
    goodsImage?: string
    /** 商品名称 */
    goodsName?: string
    /** 是否存在退款单 */
    hasRefund?: boolean
    /** 订单编码 */
    orderCode?: string
    /** 商品原价 */
    price?: number
    /** 购买数量 */
    quantity?: number
    /** 服务费比例：点播课：取课程服务费比例；自有课：取推送设置中填写的自有课平台方服务费比例；私有课：无 */
    serviceFeeRatio?: number
    /** 税率 */
    taxRate?: number
    /** 用户编码 */
    userCode?: string
}

/**
 * requestUrl /search/front/order/page_merchant_order
 * method post
 */
export interface PageMerchantOrderUsingPOSTRequest {
    /** 实收款-最高金额 */
    amountHigh?: number
    /** 实收款-最低金额 */
    amountLow?: number
    /** 买家 */
    buyerCode?: string
    /** 买家类型，1：个人，2：机构 */
    buyerType?: number
    /** 创建日期-查询结束时间 */
    createEndTime?: string
    /** 创建日期-查询开始时间 */
    createStartTime?: string
    /** 商品名称 */
    goodsName?: string
    /** 用户身份 */
    identity?: number
    /** 订单商品所属商家编码 */
    merchantOrgCode?: string
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 订单编号 */
    orderNo?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
    /** 支付方式，0：线上支付，1：线下支付 */
    payType?: number
    /** 站点id */
    sid?: number
    /** 订单状态，1未支付、2支付待确认、3已支付、4已完成、5已关闭 */
    status?: number
}

/**
 * requestUrl /search/front/order/page_merchant_order
 * method post
 */
export interface PageMerchantOrderUsingPOSTResponse {
    /** 响应数据 */
    data?: BasePaginationRspMerchantOrderPageRespDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRspMerchantRefundOrderPageRespDto {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: MerchantRefundOrderPageRespDto
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

interface MerchantRefundOrderPageRespDto {
    /** 买家类型，1：个人，2：机构 */
    buyerType?: number
    /** 唯一编码 */
    code?: string
    /** 创建时间 */
    createdAt?: number
    /** 预留字段1 */
    ext1?: string
    /** 预留字段2 */
    ext2?: string
    /** 商品唯一编码 */
    goodsCode?: string
    /** 商品名称 */
    goodsName?: string
    /** 用户身份id */
    identity?: number
    /** 商家身份 */
    merchantIdentity?: number
    /** 订单商品所属商家编码 */
    merchantOrgCode?: string
    /** 订单编码 */
    orderCode?: string
    /** 商品订单唯一编码 */
    orderGoodsCode?: string
    /** 订单编号 */
    orderNo?: string
    /** 机构用户，售后单所属机构编码 */
    organizationCode?: string
    /** 支付方式，0：支付宝，1：微信，2：线下支付 */
    payType?: number
    /** 客户所在省份编号 */
    province?: number
    /** 应退金额 */
    refundAmount?: number
    /** 是否按照数量退款 */
    refundByCount?: number
    /** 退款数量 */
    refundCount?: number
    /** 退款单对应商品单信息 */
    refundGoodsOrder?: MerchantRefundGoodsOrder
    /** 退款原因 */
    refundReason?: string
    /** 站点 */
    sid?: number
    /** 状态 0 待审核,1 售后中,2 已完成,3 申请失败 */
    status?: number
    /** 业务标签 */
    tags?: any[]
    /** 用户编码 */
    userCode?: string
}

interface MerchantRefundGoodsOrder {
    /** 编码 */
    code?: string
    /** 商品属性名称 */
    goodsAttributes?: string
    /** 商品类目名称 */
    goodsCategories?: string
    /** 商品编码 */
    goodsCode?: string
    /** 商品图片 */
    goodsImage?: string
    /** 商品名称 */
    goodsName?: string
    /** 订单编码 */
    orderCode?: string
}

/**
 * requestUrl /search/front/order/page_merchant_refund_order
 * method post
 */
export interface PageMerchantRefundOrderUsingPOSTRequest {
    /** 买家类型，1：个人，2：机构 */
    buyerType?: number
    /** 售后编号 */
    code?: string
    /** 创建日期-查询结束时间 */
    createEndTime?: string
    /** 创建日期-查询开始时间 */
    createStartTime?: string
    /** 商品名称 */
    goodsName?: string
    /** 用户身份 */
    identity?: number
    /** 订单商品所属商家编码 */
    merchantOrgCode?: string
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 订单编号 */
    orderNo?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
    /** 站点id */
    sid?: number
    /** 状态 0 待审核,1 售后中,2 已完成,3 申请失败 */
    status?: number
}

/**
 * requestUrl /search/front/order/page_merchant_refund_order
 * method post
 */
export interface PageMerchantRefundOrderUsingPOSTResponse {
    /** 响应数据 */
    data?: BasePaginationRspMerchantRefundOrderPageRespDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /search/front/order/page_order_buyer
 * method post
 */
export interface PageOrderBuyerUsingPOSTRequest {
    /** 实收款-最高金额 */
    amountHigh?: number
    /** 实收款-最低金额 */
    amountLow?: number
    /** 买家 */
    buyerCode?: string
    /** 买家类型，1：个人，2：机构 */
    buyerType?: number
    /** 创建日期-查询结束时间 */
    createEndTime?: string
    /** 创建日期-查询开始时间 */
    createStartTime?: string
    /** 商品名称 */
    goodsName?: string
    /** 用户身份 */
    identity?: number
    /** 订单商品所属商家编码 */
    merchantOrgCode?: string
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 订单编号 */
    orderNo?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
    /** 支付方式，0：线上支付，1：线下支付 */
    payType?: number
    /** 站点id */
    sid?: number
    /** 订单状态，1未支付、2支付待确认、3已支付、4已完成、5已关闭 */
    status?: number
}

/**
 * requestUrl /search/front/order/page_order_buyer
 * method post
 */
export interface PageOrderBuyerUsingPOSTResponse {
    /** 响应数据 */
    data?: BasePaginationRsp键值对返回对象stringstring
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRsp键值对返回对象stringint {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: 键值对返回对象stringint
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

interface 键值对返回对象stringint {
    /** 键 */
    name?: string
    /** 值 */
    value?: number
}

/**
 * requestUrl /search/front/order/page_order_sid
 * method post
 */
export interface PageOrderSidUsingPOSTRequest {
    /** 实收款-最高金额 */
    amountHigh?: number
    /** 实收款-最低金额 */
    amountLow?: number
    /** 买家 */
    buyerCode?: string
    /** 买家类型，1：个人，2：机构 */
    buyerType?: number
    /** 创建日期-查询结束时间 */
    createEndTime?: string
    /** 创建日期-查询开始时间 */
    createStartTime?: string
    /** 商品名称 */
    goodsName?: string
    /** 用户身份 */
    identity?: number
    /** 订单商品所属商家编码 */
    merchantOrgCode?: string
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 订单编号 */
    orderNo?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
    /** 支付方式，0：线上支付，1：线下支付 */
    payType?: number
    /** 站点id */
    sid?: number
    /** 订单状态，1未支付、2支付待确认、3已支付、4已完成、5已关闭 */
    status?: number
}

/**
 * requestUrl /search/front/order/page_order_sid
 * method post
 */
export interface PageOrderSidUsingPOSTResponse {
    /** 响应数据 */
    data?: BasePaginationRsp键值对返回对象stringint
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRspBuyerOrderPageRespDto {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: BuyerOrderPageRespDto
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

interface BuyerOrderPageRespDto {
    /** 代理商编码 */
    agentCode?: string
    /** 订单商品所属代理商家编码 */
    agentMerchantCode?: string
    /** 代理商 */
    agentName?: string
    /** 业务编码，例如活动编码、班级编码 */
    bizCodes?: any[]
    /** 买家类型，1：个人，2：机构 */
    buyerType?: number
    /** 是否可申请蓝票， true：可申请 */
    canApplyBlueInvoice?: boolean
    /** 是否可开蓝票 0不可开 1可开 */
    canBlueInvoice?: number
    /** 是否可取消订单， true：可取消 */
    canCancel?: boolean
    /** 是否可开红票 0不可开 1可开 */
    canRedInvoice?: number
    /** 唯一编码 */
    code?: string
    /** 合同订单编码：目前为一笔订单只有单个合同，扩展用 */
    contractCodes?: any[]
    /** 是否合同型订单，true(1)：是，false(0)：否 */
    contractOrder?: number
    /** 创建时间，下单时间 */
    createdAt?: number
    /** 客户编码 */
    customerCode?: string
    /** 是否已申请延期 */
    delayed?: boolean
    /** 合同订单预计支付时间 */
    expectPayTime?: number
    /**  */
    ext1?: string
    /**  */
    ext2?: string
    /** 用户身份 */
    identity?: number
    /** 开票状态，0未开票，1已开票 */
    invoicingStatus?: number
    /** 商家身份 */
    merchantIdentity?: number
    /** 订单商品所属商家编码 */
    merchantOrgCode?: string
    /** 商品订单列表 */
    orderGoodsList?: 商品订单
    /** 订单编号 */
    orderNo?: string
    /** 机构用户，订单所属机构编码 */
    organizationCode?: string
    /** 订单支付状态：1未支付、2已延期、3已逾期、4待审核、5待上传凭证、6支付成功、7支付关闭 */
    payStatus?: number
    /** 支付时间 */
    payTime?: number
    /** 支付方式，0：支付宝，1：微信，2：线下支付 */
    payType?: number
    /** 客户所在省份编号 */
    province?: number
    /** 备注 */
    remark?: string
    /** 结算对象编码 */
    settleTargetCode?: string
    /** 平台主体(结算对象名称) */
    settleTargetName?: string
    /** 站点 */
    sid?: number
    /** 订单状态，1未支付、2支付待确认、3已支付、4已完成、5已关闭 */
    status?: number
    /** 业务标签 */
    tags?: any[]
    /** 总额 */
    totalAmount?: number
    /** 用户编码 */
    userCode?: string
}

/**
 * requestUrl /search/front/order/page_user_order
 * method post
 */
export interface PageUserOrderUsingPOSTRequest {
    /** 商品名称 */
    goodsName?: string
    /** 用户身份 */
    identity?: number
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 订单编号 */
    orderNo?: string
    /** 是否机构用户 */
    orgUser?: boolean
    /** 机构用户，订单所属机构编码 */
    organizationCode?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
    /** 结束支付时间 */
    payTimeEnd?: string
    /** 起始支付时间 */
    payTimeStart?: string
    /** 是否查询已逾期订单 */
    queryDelayed?: boolean
    /** 订单状态，1未支付、2支付待确认、3已支付、4已完成、5已关闭 */
    status?: number
}

/**
 * requestUrl /search/front/order/page_user_order
 * method post
 */
export interface PageUserOrderUsingPOSTResponse {
    /** 响应数据 */
    data?: BasePaginationRspBuyerOrderPageRespDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRspBuyerRefundOrderPageRespDto {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: BuyerRefundOrderPageRespDto
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

interface BuyerRefundOrderPageRespDto {
    /** 买家类型，1：个人，2：机构 */
    buyerType?: number
    /** 是否可开红票 */
    canApplyRedInvoice?: boolean
    /** 唯一编码 */
    code?: string
    /** 创建时间 */
    createdAt?: number
    /** 预留字段1 */
    ext1?: string
    /** 预留字段2 */
    ext2?: string
    /** 商品唯一编码 */
    goodsCode?: string
    /** 商品名称 */
    goodsName?: string
    /** 用户身份id */
    identity?: number
    /** 商家身份 */
    merchantIdentity?: number
    /** 订单商品所属商家编码 */
    merchantOrgCode?: string
    /** 订单编码 */
    orderCode?: string
    /** 商品订单唯一编码 */
    orderGoodsCode?: string
    /** 订单编号 */
    orderNo?: string
    /** 机构用户，售后单所属机构编码 */
    organizationCode?: string
    /** 支付方式，0：支付宝，1：微信，2：线下支付 */
    payType?: number
    /** 客户所在省份编号 */
    province?: number
    /** 应退金额 */
    refundAmount?: number
    /** 是否按照数量退款 */
    refundByCount?: number
    /** 退款数量 */
    refundCount?: number
    /** 退款单对应商品单信息 */
    refundGoodsOrder?: MerchantRefundGoodsOrder
    /** 退款原因 */
    refundReason?: string
    /** 站点 */
    sid?: number
    /** 状态 0 待审核,1 售后中,2 已完成,3 申请失败 */
    status?: number
    /** 业务标签 */
    tags?: any[]
    /** 用户编码 */
    userCode?: string
}

/**
 * requestUrl /search/front/order/page_user_refund_order
 * method post
 */
export interface PageUserRefundOrderUsingPOSTRequest {
    /** 售后单编号 */
    code?: string
    /** 用户身份 */
    identity?: number
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 商品订单编码 */
    orderGoodsCode?: string
    /** 订单编号 */
    orderNo?: string
    /** 是否机构用户 */
    orgUser?: boolean
    /** 机构用户，订单所属机构编码 */
    organizationCode?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
    /** 订单状态，1未支付、2支付待确认、3已支付、4已完成、5已关闭 */
    status?: number
}

/**
 * requestUrl /search/front/order/page_user_refund_order
 * method post
 */
export interface PageUserRefundOrderUsingPOSTResponse {
    /** 响应数据 */
    data?: BasePaginationRspBuyerRefundOrderPageRespDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /search/sync/order/delete_order
 * method post
 */
export interface DeleteUsingPOSTResponse {
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 商品订单保存请求体 {
    /** 编码 */
    code?: string
    /** 创建时间 */
    createdAt?: number
    /** 优惠价 */
    discountPrice?: number
    /** 预留字段1 */
    ext1?: string
    /** 预留字段2 */
    ext2?: string
    /** 商品属性 */
    goodsAttributes?: string
    /** 商品类目名称 */
    goodsCategories?: string
    /** 商品类目别名 */
    goodsCategoryAlias?: string
    /** 商品编码 */
    goodsCode?: string
    /** 商品图片 */
    goodsImage?: string
    /** 商品名称 */
    goodsName?: string
    /** 订单编码 */
    orderCode?: string
    /** 商品原价 */
    price?: number
    /** 购买数量 */
    quantity?: number
    /** 服务费比例：点播课：取课程服务费比例；自有课：取推送设置中填写的自有课平台方服务费比例；私有课：无 */
    serviceFeeRatio?: number
    /** 税率 */
    taxRate?: number
    /** 用户编码 */
    userCode?: string
}

/**
 * requestUrl /search/sync/order/save_order
 * method post
 */
export interface SaveOrderUsingPOSTRequest {
    /** 代理商编码 */
    agentCode?: string
    /** 订单商品所属代理商家编码 */
    agentMerchantCode?: string
    /** 代理商 */
    agentName?: string
    /** 买家类型，1：个人，2：机构 */
    buyerType?: number
    /** 是否可开蓝票 0不可开 1可开 */
    canBlueInvoice?: number
    /** 是否可开红票 0不可开 1可开 */
    canRedInvoice?: number
    /** 唯一编码 */
    code?: string
    /** 合同订单编码：目前为一笔订单只有单个合同，扩展用 */
    contractCodes?: any[]
    /** 是否合同型订单，true(1)：是，false(0)：否 */
    contractOrder?: number
    /** 创建时间，下单时间 */
    createdAt?: number
    /** 客户编码 */
    customerCode?: string
    /** 合同订单预计支付时间 */
    expectPayTime?: number
    /** 预留字段1 */
    ext1?: string
    /** 预留字段2 */
    ext2?: string
    /** 用户身份 */
    identity?: number
    /** 开票状态，0未开票，1已开票 */
    invoicingStatus?: number
    /** 商家身份 */
    merchantIdentity?: number
    /** 订单商品所属商家编码 */
    merchantOrgCode?: string
    /** 商品订单数组 */
    orderGoodsList?: 商品订单保存请求体
    /** 订单编号 */
    orderNo?: string
    /** 机构用户，订单所属机构编码 */
    organizationCode?: string
    /** 订单支付状态：1未支付、2已延期、3已逾期、4待审核、5待上传凭证、6支付成功、7支付关闭 */
    payStatus?: number
    /** 支付时间 */
    payTime?: number
    /** 支付方式，0：支付宝，1：微信，2：线下支付 */
    payType?: number
    /** 客户所在省份编号 */
    province?: number
    /** 备注 */
    remark?: string
    /** 结算对象编码 */
    settleTargetCode?: string
    /** 平台主体(结算对象名称) */
    settleTargetName?: string
    /** 站点 */
    sid?: number
    /** 订单状态，1未支付、2支付待确认、3已支付、4已完成、5已关闭 */
    status?: number
    /** 业务标签 */
    tags?: any[]
    /** 总额 */
    totalAmount?: number
    /** 用户编码 */
    userCode?: string
}

/**
 * requestUrl /search/sync/order/save_order
 * method post
 */
export interface SaveOrderUsingPOSTResponse {
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
 * requestUrl /search/sync/order/save_refund_order
 * method post
 */
export interface SaveRefundOrderUsingPOSTRequest {
    /** 买家类型，1：个人，2：机构 */
    buyerType?: number
    /** 唯一编码 */
    code?: string
    /** 创建时间 */
    createdAt?: number
    /** 预留字段1 */
    ext1?: string
    /** 预留字段1 */
    ext2?: string
    /** 商品唯一编码 */
    goodsCode?: string
    /** 商品名称 */
    goodsName?: string
    /** 用户身份id */
    identity?: number
    /** 商家身份 */
    merchantIdentity?: number
    /** 订单商品所属商家编码 */
    merchantOrgCode?: string
    /** 订单编码 */
    orderCode?: string
    /** 商品订单唯一编码 */
    orderGoodsCode?: string
    /** 订单编号 */
    orderNo?: string
    /** 机构用户，售后单所属机构编码 */
    organizationCode?: string
    /** 支付方式，0：支付宝，1：微信，2：线下支付 */
    payType?: number
    /** 客户所在省份编号 */
    province?: number
    /** 应退金额 */
    refundAmount?: number
    /** 是否按照数量退款 */
    refundByCount?: number
    /** 退款数量 */
    refundCount?: number
    /** 退款原因 */
    refundReason?: string
    /** 站点 */
    sid?: number
    /** 状态 0 待审核,1 售后中,2 已完成,3 申请失败 */
    status?: number
    /** 业务标签 */
    tags?: any[]
    /** 用户编码 */
    userCode?: string
}

/**
 * requestUrl /search/sync/order/save_refund_order
 * method post
 */
export interface SaveRefundOrderUsingPOSTResponse {
    /** 响应数据 */
    data?: string
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRsp机构信息索引dto {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: 机构信息索引dto
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

interface 机构信息索引dto {
    /** 地址 */
    address?: string
    /** 审批状态   0-缺省；1-已通过：2-已驳回 */
    approveStatus?: number
    /** 区 */
    area?: number
    /** 认证时间 */
    certifyAt?: number
    /** 认证状态  0-未认证 ；1-已认证；2-审核中 */
    certifyStatus?: number
    /** 市 */
    city?: number
    /** 唯一编码 */
    code?: string
    /** 统一信用代码 */
    companyCode?: string
    /** 创建时间 */
    createdAt?: number
    /** 是否已删除 */
    deleted?: number
    /** 预留字段1 */
    ext1?: string
    /** 预留字段2 */
    ext2?: string
    /** 来源站点 */
    fromSid?: number
    /** 身份 */
    identityList?: any[]
    /** 行业 */
    industryId?: number
    /** 法人姓名 */
    legalPersonName?: string
    /** 机构logo */
    logo?: string
    /** 名称 */
    name?: string
    /** 省 */
    province?: number
    /** 规模 */
    scale?: number
    /** 简称 */
    shortName?: string
    /** 站点 */
    sid?: number
    /** 状态0正常1解散 */
    status?: number
    /** 角色类型，2机构，3资源方，跟group表的type枚举对应 */
    type?: number
    /** 更新时间 */
    updatedAt?: number
    /** 编码 */
    userCode?: string
}

/**
 * requestUrl /search/sync/organization/page
 * method post
 */
export interface PageUsingPOST_8Request {
    /** 认证结束日期 */
    certifyEndTime?: number
    /** 认证开始日期 */
    certifyStartTime?: number
    /** 认证状态 */
    certifyStatus?: number
    /** 创建结束日期 */
    endTime?: number
    /** 注册来源 */
    fromSid?: number
    /** 身份 */
    identity?: number
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
    /** 简称 */
    shortName?: string
    /** 站点id */
    sid?: number
    /** 创建开始日期 */
    startTime?: number
    /** 角色  2机构  3资源方 */
    type?: number
}

/**
 * requestUrl /search/sync/organization/page
 * method post
 */
export interface PageUsingPOST_8Response {
    /** 响应数据 */
    data?: BasePaginationRsp机构信息索引dto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /search/sync/organization/save
 * method post
 */
export interface SaveUsingPOST_3Request {
    /** 地址 */
    address?: string
    /** 审批状态   0-缺省；1-已通过：2-已驳回 */
    approveStatus?: number
    /** 区 */
    area?: number
    /** 认证时间 */
    certifyAt?: number
    /** 认证状态  0-未认证 ；1-已认证；2-审核中 */
    certifyStatus?: number
    /** 市 */
    city?: number
    /** 唯一编码 */
    code?: string
    /** 统一信用代码 */
    companyCode?: string
    /** 创建时间 */
    createdAt?: number
    /** 是否已删除 */
    deleted?: number
    /** 预留字段1 */
    ext1?: string
    /** 预留字段2 */
    ext2?: string
    /** 来源站点 */
    fromSid?: number
    /** 身份 */
    identityList?: any[]
    /** 行业 */
    industryId?: number
    /** 法人姓名 */
    legalPersonName?: string
    /** 机构logo */
    logo?: string
    /** 名称 */
    name?: string
    /** 省 */
    province?: number
    /** 规模 */
    scale?: number
    /** 简称 */
    shortName?: string
    /** 站点 */
    sid?: number
    /** 状态0正常1解散 */
    status?: number
    /** 角色类型，2机构，3资源方，跟group表的type枚举对应 */
    type?: number
    /** 更新时间 */
    updatedAt?: number
    /** 编码 */
    userCode?: string
}

/**
 * requestUrl /search/sync/organization/save
 * method post
 */
export interface SaveUsingPOST_3Response {
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRsp交易流水返回对象 {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: 交易流水返回对象
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

interface 交易流水返回对象 {
    /** 支付状态，0失败，1成功 */
    billType?: number
    /** 唯一编码 */
    code?: string
    /** 创建时间 */
    createdAt?: number
    /** 预留字段1 */
    ext1?: string
    /** 预留字段2 */
    ext2?: string
    /** 订单编码 */
    orderCode?: string
    /** 业务线订单ID */
    orderNo?: string
    /** 订单支付编码，支付码刷新时变化 */
    orderPayCode?: string
    /** 支付账户 */
    payAccount?: string
    /** 支付方式：支付宝 0：微信 1：银联 */
    payWay?: number
    /** 收款账户 */
    payee?: string
    /** 收款方名称 */
    payeeName?: string
    /** 支付方名称 */
    payerName?: string
    /** 站点id */
    sid?: number
    /** 站点名称 */
    siteName?: string
    /** 站点简称 */
    siteShortName?: string
    /** 支付状态，0失败，1成功 */
    status?: number
    /** 交易金额 */
    tradeAmount?: number
    /** 交易时间 */
    tradeTime?: number
}

/**
 * requestUrl /search/backend/pay/page_payment
 * method post
 */
export interface PagePaymentUsingPOSTRequest {
    /** 流水ID */
    code?: string
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 订单编码 */
    orderNo?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
    /** 支付账户 */
    payAccount?: string
    /** 支付金额结束 */
    payAmountEnd?: number
    /** 支付金额起始 */
    payAmountStart?: number
    /** 支付时间结束 */
    payTimeEnd?: string
    /** 支付时间起始 */
    payTimeStart?: string
    /** 收款方名称 */
    payeeName?: string
    /** 支付方名称 */
    payerName?: string
    /** 站点id */
    sid?: number
}

/**
 * requestUrl /search/backend/pay/page_payment
 * method post
 */
export interface PagePaymentUsingPOSTResponse {
    /** 响应数据 */
    data?: BasePaginationRsp交易流水返回对象
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /search/sync/payment/save_online
 * method post
 */
export interface SaveOnlineFromOrderUsingPOSTRequest {}

/**
 * requestUrl /search/sync/payment/save_online
 * method post
 */
export interface SaveOnlineFromOrderUsingPOSTResponse {
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
 * requestUrl /search/sync/payment/update_online_from_notify
 * method post
 */
export interface UpdateOnlineFromNotifyUsingPOSTRequest {}

/**
 * requestUrl /search/sync/payment/update_online_from_notify
 * method post
 */
export interface UpdateOnlineFromNotifyUsingPOSTResponse {
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
 * requestUrl /search/sync/payment/update_online_from_order
 * method post
 */
export interface UpdateOnlineFromOrderUsingPOSTRequest {}

/**
 * requestUrl /search/sync/payment/update_online_from_order
 * method post
 */
export interface UpdateOnlineFromOrderUsingPOSTResponse {
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
 * requestUrl /search/front/recommend/detail/{code}
 * method post
 */
export interface DetailRecommendUsingPOSTResponse {
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
 * requestUrl /search/front/recommend/get_carousel_status
 * method get
 */
export interface GetCarouselStatusUsingGETResponse {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 推荐位自定义搜索请求体 {
    /** 是否为精确搜索 0模糊搜索 1精确搜索 */
    exactSearchFlag?: boolean
    /** key */
    key?: string
    /** value */
    value?: string
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
 * requestUrl /search/front/recommend/page
 * method post
 */
export interface PageUsingPOST_9Request {
    /** 自定义搜索List */
    customSearchList?: 推荐位自定义搜索请求体
    /** 表单别名 */
    formAlias?: string
    /** 表单编码 */
    formCode?: string
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
    /** 状态 */
    status?: number
}

/**
 * requestUrl /search/front/recommend/page
 * method post
 */
export interface PageUsingPOST_9Response {
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
 * requestUrl /search/front/recommend/update_carousel_status
 * method post
 */
export interface UpdateCarouselStatusUsingPOSTRequest {}

/**
 * requestUrl /search/front/recommend/update_carousel_status
 * method post
 */
export interface UpdateCarouselStatusUsingPOSTResponse {
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
 * requestUrl /search/sync/recommend/delete
 * method post
 */
export interface DeleteUsingPOST_1Request {
    /** 编码 */
    code?: string
    /** 创建时间 */
    createdAt?: number
    /** 自定义字段内容 */
    customContent?: Record<string | number | symbol, any>
    /** 表单别名 */
    formAlias?: string
    /** 表单编码 */
    formCode?: string
    /** 排序 */
    sort?: number
    /** 状态 */
    status?: number
}

/**
 * requestUrl /search/sync/recommend/delete
 * method post
 */
export interface DeleteUsingPOST_1Response {
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
 * requestUrl /search/sync/recommend/save
 * method post
 */
export interface SaveUsingPOST_4Request {
    /** 编码 */
    code?: string
    /** 创建时间 */
    createdAt?: number
    /** 自定义字段内容 */
    customContent?: Record<string | number | symbol, any>
    /** 表单别名 */
    formAlias?: string
    /** 表单编码 */
    formCode?: string
    /** 排序 */
    sort?: number
    /** 状态 */
    status?: number
}

/**
 * requestUrl /search/sync/recommend/save
 * method post
 */
export interface SaveUsingPOST_4Response {
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
 * requestUrl /search/sync/recommend/update
 * method post
 */
export interface UpdateUsingPOST_2Request {
    /** 编码 */
    code?: string
    /** 创建时间 */
    createdAt?: number
    /** 自定义字段内容 */
    customContent?: Record<string | number | symbol, any>
    /** 表单别名 */
    formAlias?: string
    /** 表单编码 */
    formCode?: string
    /** 排序 */
    sort?: number
    /** 状态 */
    status?: number
}

/**
 * requestUrl /search/sync/recommend/update
 * method post
 */
export interface UpdateUsingPOST_2Response {
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
 * requestUrl /search/sync/recommend/update_by_form
 * method post
 */
export interface UpdateByFormCodeUsingPOSTRequest {
    /** 编码 */
    code?: string
    /** 创建时间 */
    createdAt?: number
    /** 自定义字段内容 */
    customContent?: Record<string | number | symbol, any>
    /** 表单别名 */
    formAlias?: string
    /** 表单编码 */
    formCode?: string
    /** 排序 */
    sort?: number
    /** 状态 */
    status?: number
}

/**
 * requestUrl /search/sync/recommend/update_by_form
 * method post
 */
export interface UpdateByFormCodeUsingPOSTResponse {
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
 * requestUrl /search/sync/async/save
 * method post
 */
export interface SaveAsyncUsingPOSTRequest {
    /**  */
    content?: string
    /**  */
    deliverTime?: number
    /**  */
    key?: string
    /**  */
    shardingKey?: string
    /**  */
    tag?: string
}

/**
 * requestUrl /search/sync/async/save
 * method post
 */
export interface SaveAsyncUsingPOSTResponse {
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
 * requestUrl /search/sync/sign_in/save
 * method post
 */
export interface SaveSignInHistoryUsingPOSTRequest {
    /** 签到是否在有效范围  0否 1是 */
    arrive: number
    /** 唯一编码 */
    code?: string
    /** 站点id */
    sid: number
    /** 签到照片 */
    signImage?: string
    /** 签到地点 */
    signLocation?: string
    /** 签到备注 */
    signRemark?: string
    /** 签到时间 */
    signTime: number
    /** 任务编码 */
    taskCode: string
    /** 类型 1签到  2签退 */
    type: number
    /** 用户编码 */
    userCode: string
}

/**
 * requestUrl /search/sync/sign_in/save
 * method post
 */
export interface SaveSignInHistoryUsingPOSTResponse {
    /** 响应数据 */
    data?: string
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 签到记录dto {
    /** 签到是否在有效范围  0否 1是 */
    arrive: number
    /** 唯一编码 */
    code?: string
    /** 站点id */
    sid: number
    /** 签到照片 */
    signImage?: string
    /** 签到地点 */
    signLocation?: string
    /** 签到备注 */
    signRemark?: string
    /** 签到时间 */
    signTime: number
    /** 任务编码 */
    taskCode: string
    /** 类型 1签到  2签退 */
    type: number
    /** 用户编码 */
    userCode: string
}

/**
 * requestUrl /search/sync/sign_in/sign_detail/{code}
 * method get
 */
export interface SignDetailUsingGETResponse {
    /** 响应数据 */
    data?: 签到记录dto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRspSignPageResponseDto {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: SignPageResponseDto
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

interface SignPageResponseDto {
    /** 是否到达签到范围  0否 1是 */
    arrive?: number
    /** 是否开启人脸识别  0否 1是 */
    checkFace?: number
    /** 唯一编码 */
    code?: string
    /** 打卡范围 0未开启  有值则具体XX米 */
    distance?: number
    /** 任务地点 */
    location?: string
    /** 打卡规则结束时间 */
    ruleEndTime?: number
    /** 打卡规则开始时间 */
    ruleStartTime?: number
    /** 站点id */
    sid?: number
    /** 签到图片 */
    signImage?: string
    /** 用户签到地址 */
    signLocation?: string
    /** 签到备注 */
    signRemark?: string
    /** 签到时间 */
    signTime?: number
    /** 站点名称 */
    siteName?: string
    /** 任务编码 */
    taskCode?: string
    /** 任务结束时间 */
    taskEndTime?: number
    /** 任务名称 */
    taskName?: string
    /** 任务开始时间 */
    taskStartTime?: number
    /** 类型 1签到  2签退 */
    type?: number
    /** 用户编码 */
    userCode?: string
    /** 用户姓名 */
    userName?: string
}

/**
 * requestUrl /search/sync/sign_in/sign_history_page
 * method post
 */
export interface SignHistoryPageUsingPOSTRequest {
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
    /** 任务编码 */
    taskCode?: string
}

/**
 * requestUrl /search/sync/sign_in/sign_history_page
 * method post
 */
export interface SignHistoryPageUsingPOSTResponse {
    /** 响应数据 */
    data?: BasePaginationRspSignPageResponseDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /search/sync/sign_in/user_task_history
 * method post
 */
export interface GetUserTaskHistoryUsingPOSTRequest {
    /** 任务编码 */
    taskCodes: any[]
    /** 用户编码 */
    userCode: string
}

/**
 * requestUrl /search/sync/sign_in/user_task_history
 * method post
 */
export interface GetUserTaskHistoryUsingPOSTResponse {
    /** 响应数据 */
    data?: Record<string | number | symbol, any>
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRsp站点基本信息列表 {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: 站点基本信息列表
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

/**
 * requestUrl /search/backend/site/page
 * method post
 */
export interface PageUsingPOST_10Request {
    /**  */
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
 * requestUrl /search/backend/site/page
 * method post
 */
export interface PageUsingPOST_10Response {
    /** 响应数据 */
    data?: BasePaginationRsp站点基本信息列表
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /search/sync/site/save
 * method post
 */
export interface SaveSiteUsingPOSTRequest {
    /** 别名 */
    alias?: string
    /** 创建时间 */
    createdAt?: number
    /** 唯一编码 */
    id?: number
    /** 一级模块列表 */
    modules?: any[]
    /** 站点名称 */
    name?: string
    /** pc域名 */
    pcDomain?: string
    /** 更新时间 */
    updatedAt?: number
}

/**
 * requestUrl /search/sync/site/save
 * method post
 */
export interface SaveSiteUsingPOSTResponse {
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
 * requestUrl /search/sync/site/update
 * method post
 */
export interface UpdateSiteUsingPOSTRequest {
    /** 别名 */
    alias?: string
    /** 创建时间 */
    createdAt?: number
    /** 唯一编码 */
    id?: number
    /** 一级模块列表 */
    modules?: any[]
    /** 站点名称 */
    name?: string
    /** pc域名 */
    pcDomain?: string
    /** 更新时间 */
    updatedAt?: number
}

/**
 * requestUrl /search/sync/site/update
 * method post
 */
export interface UpdateSiteUsingPOSTResponse {
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
 * requestUrl /search/sync/tag/save
 * method post
 */
export interface SaveTagUsingPOSTRequest {
    /** 创建时间 */
    createdAt?: number
    /** 唯一编码 */
    id?: string
    /** 标签名称 */
    name?: string
    /** 类型 1业务标签 2客户标签 */
    type?: number
}

/**
 * requestUrl /search/sync/tag/save
 * method post
 */
export interface SaveTagUsingPOSTResponse {
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
 * requestUrl /search/sync/tag/update
 * method post
 */
export interface UpdateTagUsingPOSTRequest {
    /** 创建时间 */
    createdAt?: number
    /** 唯一编码 */
    id?: string
    /** 标签名称 */
    name?: string
    /** 类型 1业务标签 2客户标签 */
    type?: number
}

/**
 * requestUrl /search/sync/tag/update
 * method post
 */
export interface UpdateTagUsingPOSTResponse {
    /** 响应数据 */
    data?: string
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
    code?: string
    /**  */
    iconUrl?: string
    /**  */
    permissionIdList?: any[]
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
    /** 机构code */
    organizationCode?: string
    /** url */
    redirectUrl?: string
    /** 站点 */
    sid?: number
    /** 总数量 */
    totalCount?: number
    /** 用户code */
    userCode?: string
}

/**
 * requestUrl /search/front/todo/data-overview/list
 * method post
 */
export interface ListDataOverviewUsingPOSTRequest {
    /** 组件名称 */
    componentList?: AccessManageCacheDto
    /** 身份code */
    identityId: number
    /** 限制条数 */
    limit?: number
    /** 机构code, 有则传 */
    organizationCode: string
    /** 站点 */
    sid?: number
    /** 角色 1个人 2机构 3资源方 */
    type: number
    /** 用户code */
    userCode: string
}

/**
 * requestUrl /search/front/todo/data-overview/list
 * method post
 */
export interface ListDataOverviewUsingPOSTResponse {
    /** 响应数据 */
    data?: 数据概览
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 待办事项统计返回值 {
    /** iconUrl */
    iconUrl?: string
    /** url */
    redirectUrl?: string
    /** 统计值 */
    todoCount?: number
    /** 待办名称 */
    todoName?: string
}

/**
 * requestUrl /search/front/todo/list
 * method post
 */
export interface ListUsingPOSTRequest {
    /** 组件名称 */
    componentList?: AccessManageCacheDto
    /** 身份code */
    identityId: number
    /** 机构code, 有则传 */
    organizationCode: string
    /** 站点 */
    sid?: number
    /** 角色 1个人 2机构 3资源方 */
    type: number
    /** userCode */
    userCode?: string
}

/**
 * requestUrl /search/front/todo/list
 * method post
 */
export interface ListUsingPOSTResponse {
    /** 响应数据 */
    data?: 待办事项统计返回值
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /search/front/todo/schedule/date
 * method post
 */
export interface ListHasScheduleUsingPOSTRequest {
    /** 结束时间 */
    endTime?: number
    /** 开始时间 */
    startTime?: number
}

/**
 * requestUrl /search/front/todo/schedule/date
 * method post
 */
export interface ListHasScheduleUsingPOSTResponse {
    /** 响应数据 */
    data?: any[]
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
    /** 机构code */
    organizationCode?: string
    /** 我的日程跳转url */
    redirectUrl?: string
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
 * requestUrl /search/front/todo/schedule/list
 * method post
 */
export interface ListScheduleUsingPOSTRequest {
    /** 组件名称 */
    componentList?: AccessManageCacheDto
    /** 结束时间 */
    endTime?: number
    /** 身份code */
    identityId: number
    /** 机构code, 有则传 */
    organizationCode: string
    /** 站点 */
    sid?: number
    /** 开始时间 */
    startTime?: number
    /** 角色 1个人 2机构 3资源方 */
    type: number
    /** 用户code */
    userCode: string
}

/**
 * requestUrl /search/front/todo/schedule/list
 * method post
 */
export interface ListScheduleUsingPOSTResponse {
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
 * requestUrl /search/sync/todo/clear_data
 * method post
 */
export interface ClearDataOverviewUsingPOSTResponse {
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
 * requestUrl /search/sync/todo/create_schedule
 * method post
 */
export interface CreateScheduleUsingPOSTRequest {
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
    /** 机构code */
    organizationCode?: string
    /** 我的日程跳转url */
    redirectUrl?: string
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
 * requestUrl /search/sync/todo/create_schedule
 * method post
 */
export interface CreateScheduleUsingPOSTResponse {
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
 * requestUrl /search/sync/todo/delete
 * method post
 */
export interface DeleteUsingPOST_2Request {
    /** code */
    code?: string
    /** 待办事项内容 */
    content?: string
    /** 创建时间 */
    createdAt?: number
    /** 身份id */
    identityId?: number
    /** 待办事项名称 */
    name?: string
    /** 机构code */
    organizationCode?: string
    /** 跳转url */
    redirectUrl?: string
    /** 站点 */
    sid?: number
    /** 待办事项状态 */
    status?: number
    /** 用户code */
    userCode?: string
}

/**
 * requestUrl /search/sync/todo/delete
 * method post
 */
export interface DeleteUsingPOST_2Response {
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
 * requestUrl /search/sync/todo/delete_data
 * method post
 */
export interface DeleteDataOverviewUsingPOSTRequest {
    /** code */
    code?: string
    /** 身份id */
    identityId?: number
    /** 月度新增数量 */
    monthCount?: number
    /** 名称 */
    name?: string
    /** 机构code */
    organizationCode?: string
    /** url */
    redirectUrl?: string
    /** 站点 */
    sid?: number
    /** 总数量 */
    totalCount?: number
    /** 用户code */
    userCode?: string
}

/**
 * requestUrl /search/sync/todo/delete_data
 * method post
 */
export interface DeleteDataOverviewUsingPOSTResponse {
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
 * requestUrl /search/sync/todo/delete_schedule
 * method post
 */
export interface DeleteScheduleUsingPOSTRequest {
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
    /** 机构code */
    organizationCode?: string
    /** 我的日程跳转url */
    redirectUrl?: string
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
 * requestUrl /search/sync/todo/delete_schedule
 * method post
 */
export interface DeleteScheduleUsingPOSTResponse {
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
 * requestUrl /search/sync/todo/save
 * method post
 */
export interface SaveUsingPOST_5Request {
    /** code */
    code?: string
    /** 待办事项内容 */
    content?: string
    /** 创建时间 */
    createdAt?: number
    /** 身份id */
    identityId?: number
    /** 待办事项名称 */
    name?: string
    /** 机构code */
    organizationCode?: string
    /** 跳转url */
    redirectUrl?: string
    /** 站点 */
    sid?: number
    /** 待办事项状态 */
    status?: number
    /** 用户code */
    userCode?: string
}

/**
 * requestUrl /search/sync/todo/save
 * method post
 */
export interface SaveUsingPOST_5Response {
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
 * requestUrl /search/sync/todo/save_data
 * method post
 */
export interface SaveDataOverviewUsingPOSTRequest {
    /** code */
    code?: string
    /** 身份id */
    identityId?: number
    /** 月度新增数量 */
    monthCount?: number
    /** 名称 */
    name?: string
    /** 机构code */
    organizationCode?: string
    /** url */
    redirectUrl?: string
    /** 站点 */
    sid?: number
    /** 总数量 */
    totalCount?: number
    /** 用户code */
    userCode?: string
}

/**
 * requestUrl /search/sync/todo/save_data
 * method post
 */
export interface SaveDataOverviewUsingPOSTResponse {
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
 * requestUrl /search/sync/todo/update_data
 * method post
 */
export interface UpdateDataOverviewUsingPOSTRequest {
    /** code */
    code?: string
    /** 身份id */
    identityId?: number
    /** 月度新增数量 */
    monthCount?: number
    /** 名称 */
    name?: string
    /** 机构code */
    organizationCode?: string
    /** url */
    redirectUrl?: string
    /** 站点 */
    sid?: number
    /** 总数量 */
    totalCount?: number
    /** 用户code */
    userCode?: string
}

/**
 * requestUrl /search/sync/todo/update_data
 * method post
 */
export interface UpdateDataOverviewUsingPOSTResponse {
    /** 响应数据 */
    data?: string
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}
