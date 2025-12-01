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
export interface ImportJobDemandSearchRankUsingPOSTRequest {}

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
export interface ImportShortageJobRankUsingPOSTRequest {}

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

interface BasePaginationRspShortageJobRankDto {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: ShortageJobRankDto
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

interface ShortageJobRankDto {
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
    data?: BasePaginationRspShortageJobRankDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /profession/admin/batch/take_down
 * method post
 */
export interface BatchTakeDownUsingPOSTRequest {
    /** 职位code */
    codeList?: any[]
    /** 上下架状态 默认 0 待发布 1 上架 2 下架 */
    status?: number
}

/**
 * requestUrl /profession/admin/batch/take_down
 * method post
 */
export interface BatchTakeDownUsingPOSTResponse {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface ProfessionAdminCountDto {
    /** 全部 */
    allCount?: number
    /** 关闭 */
    offShelveECount?: number
    /** 招聘中 */
    onShelveCount?: number
}

/**
 * requestUrl /profession/admin/count
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
    /** 签到状态 0 待上架 1 已上架 2 下架 */
    status?: any[]
    /** 类型 1 企业 2 校企合作 3 其他 */
    type?: number
}

/**
 * requestUrl /profession/admin/count
 * method post
 */
export interface CountQueryUsingPOSTResponse {
    /** 响应数据 */
    data?: ProfessionAdminCountDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRspProfessionListAdminDto {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: ProfessionListAdminDto
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

interface ProfessionListAdminDto {
    /** 地址code */
    addressCode?: string
    /** 工作地址 */
    cityName?: string
    /** 职位关联code */
    code?: string
    /** 职位描述 */
    desc?: string
    /** 教育程度 */
    education?: number
    /** 教育程度名称 */
    educationName?: string
    /** 经验 */
    experience?: number
    /** 经验名称 */
    experienceName?: string
    /** 组织code */
    organizationCode?: string
    /** 机构名称 */
    organizationName?: string
    /** 职位code */
    professionCode?: string
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
    /** 薪资月份 */
    salaryMonth?: number
    /** 薪水类型 1 元/时  2 元/天  3 元/周  4 元/月 */
    salaryType?: number
    /** 0 待上架 1 上架 2 下架 */
    shelvesStatus?: number
    /** 站点id */
    sid?: number
    /** 来源默认0 未知 1 平台  2  职培 3 考评 4 创培 */
    source?: number
    /** 签到状态 默认 0 待发布 1 已发布 2 已关闭 */
    status?: number
    /** 职业类型 1 企业 2 校企合作 3 其他 */
    type?: number
    /** 单位 0 元 1 千元 2 万元 */
    uint?: number
}

/**
 * requestUrl /profession/admin/page
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
    /** 签到状态 0 待上架 1 已上架 2 下架 */
    status?: any[]
    /** 类型 1 企业 2 校企合作 3 其他 */
    type?: number
}

/**
 * requestUrl /profession/admin/page
 * method post
 */
export interface PageUsingPOSTResponse {
    /** 响应数据 */
    data?: BasePaginationRspProfessionListAdminDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface CodeDescDto {
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
    data?: CodeDescDto
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
    data?: CodeDescDto
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
    data?: CodeDescDto
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
    data?: CodeDescDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface ProfessionSimpleDto {
    /** 职位code */
    code?: string
    /** 机构code */
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
    /** 薪水月份 */
    salaryMonth?: number
    /** 薪水类型  0 默认 1 元/时  2 元/天  3 元/周  4 元/月 */
    salaryType?: number
    /** 站点id */
    sid?: number
    /** 来源默认0 未知 1 平台  2  职培 3 考评 4 创培 */
    source?: number
    /** 签到状态 默认 0 待发布 1 已发布 2 下架 */
    status?: number
    /** 单位 0 元 1 千元 2 万元 */
    unit?: number
}

/**
 * requestUrl /profession/feign/list/codeList
 * method post
 */
export interface ListByCodeListUsingPOSTRequest {
    /** 职位code列表查询 */
    codeList?: any[]
}

/**
 * requestUrl /profession/feign/list/codeList
 * method post
 */
export interface ListByCodeListUsingPOSTResponse {
    /** 响应数据 */
    data?: ProfessionSimpleDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /profession/feign/list/org_code_list
 * method post
 */
export interface ListByOrganizationCodeListUsingPOSTRequest {
    /** 机构code列表 */
    orgCodeList?: any[]
}

/**
 * requestUrl /profession/feign/list/org_code_list
 * method post
 */
export interface ListByOrganizationCodeListUsingPOSTResponse {
    /** 响应数据 */
    data?: ProfessionSimpleDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface OrgProfessionStatisticDto {
    /** 城市计数 */
    cityCount?: number
    /** 职位总数 */
    professionCount?: number
    /** 职位类型总数 */
    professionTypeCount?: number
}

/**
 * requestUrl /profession/feign/statistic/count_org_code
 * method post
 */
export interface CountOrgProfessionStatisticUsingPOSTRequest {
    /** 机构code */
    orgCode?: string
}

/**
 * requestUrl /profession/feign/statistic/count_org_code
 * method post
 */
export interface CountOrgProfessionStatisticUsingPOSTResponse {
    /** 响应数据 */
    data?: OrgProfessionStatisticDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface PartTimeRecruitDto {
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
    /** 单位 0 元 1 千元 2 万元 */
    uint?: number
    /** 工作日 */
    workDays?: any[]
    /** 工作结束时间 */
    workTimeEnd?: string
    /** 工作开始时间 */
    workTimeStart?: string
    /** 工作时间类型 0 默认 1 不限时间 2 自定义时间 */
    workTimeType?: number
}

interface PracticeRecruitDto {
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
    /** 单位 0 元 1 千元 2 万元 */
    uint?: number
    /** 周最小工作天数 */
    workMinDayWeek?: number
    /** 月最小工作天数 */
    workMinMonth?: number
}

interface SchoolRecruitDto {
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
    /** 单位 0 元 1 千元 2 万元 */
    uint?: number
}

interface SocialRecruitDto {
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
    /** 单位 0 元 1 千元 2 万元 */
    uint?: number
}

/**
 * requestUrl /profession/front/org/enterprise/add
 * method post
 */
export interface AddProfessionUsingPOSTRequest {
    /** 地址code */
    addressCode?: string
    /** 城市code */
    cityCode?: string
    /** 职位对象code */
    code?: string
    /** 职位描述 */
    desc?: string
    /** 组织code */
    organizationCode?: string
    /** 兼职招聘数据对象 */
    partTimeRecruit?: PartTimeRecruitDto
    /** 实习招聘数据对象 */
    practiceRecruit?: PracticeRecruitDto
    /** 职位名称 */
    professionName?: string
    /** 职位类型Id */
    professionTypeId?: number
    /** 省份code */
    provinceCode?: string
    /** 招聘类型 0 默认 1 社招 2 校招 3 实习 4 兼职 */
    recruitType?: number
    /** 地区code */
    regionCode?: string
    /** 校招数据对象 */
    schoolRecruitDto?: SchoolRecruitDto
    /** 站点Id */
    sid?: number
    /** 社会招聘数据对象 */
    socialRecruit?: SocialRecruitDto
    /** 来源  1 平台  2  职培 3 考评 4 创培 */
    source?: number
    /** 标签code */
    tagCodes?: any[]
    /** 类型 1 企业 2 校企合作 3 其他 */
    type?: number
}

/**
 * requestUrl /profession/front/org/enterprise/add
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

interface ProfessionCountDto {
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
export interface CountQueryUsingPOST_1Request {
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
export interface CountQueryUsingPOST_1Response {
    /** 响应数据 */
    data?: ProfessionCountDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /profession/front/enterprise/delete_by_codes
 * method post
 */
export interface DeleteByCodesUsingPOSTRequest {
    /** 职位code列表 */
    professionCodeList?: any[]
}

/**
 * requestUrl /profession/front/enterprise/delete_by_codes
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
    /** 城市code */
    cityCode?: string
    /** 职位对象code */
    code?: string
    /** 职位描述 */
    desc?: string
    /** 组织code */
    organizationCode?: string
    /** 兼职招聘数据对象 */
    partTimeRecruit?: PartTimeRecruitDto
    /** 实习招聘数据对象 */
    practiceRecruit?: PracticeRecruitDto
    /** 职位名称 */
    professionName?: string
    /** 职位类型Id */
    professionTypeId?: number
    /** 省份code */
    provinceCode?: string
    /** 招聘类型 0 默认 1 社招 2 校招 3 实习 4 兼职 */
    recruitType?: number
    /** 地区code */
    regionCode?: string
    /** 校招数据对象 */
    schoolRecruitDto?: SchoolRecruitDto
    /** 站点Id */
    sid?: number
    /** 社会招聘数据对象 */
    socialRecruit?: SocialRecruitDto
    /** 来源  1 平台  2  职培 3 考评 4 创培 */
    source?: number
    /** 标签code */
    tagCodes?: any[]
    /** 类型 1 企业 2 校企合作 3 其他 */
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

interface ProfessionInfoDto {
    /** 地址code */
    addressCode?: string
    /** 地址名称 */
    addressName?: string
    /** 城市code */
    cityCode?: string
    /** 职位对象code */
    code?: string
    /** 职位描述 */
    desc?: string
    /** 组织code */
    organizationCode?: string
    /** 兼职招聘数据对象 */
    partTimeRecruit?: PartTimeRecruitDto
    /** 实习招聘数据对象 */
    practiceRecruit?: PracticeRecruitDto
    /** 职位名称 */
    professionName?: string
    /** 职位类型Id */
    professionTypeId?: number
    /** 省份code */
    provinceCode?: string
    /** 招聘类型 0 默认 1 社招 2 校招 3 实习 4 兼职 */
    recruitType?: number
    /** 地区code */
    regionCode?: string
    /** 校招数据对象 */
    schoolRecruitDto?: SchoolRecruitDto
    /** 站点Id */
    sid?: number
    /** 社会招聘数据对象 */
    socialRecruit?: SocialRecruitDto
    /** 来源  1 平台  2  职培 3 考评 4 创培 */
    source?: string
    /** 签到状态 默认 0 待发布 1 已发布 2 下架 */
    status?: number
    /** 标签code */
    tags?: TagDto
    /** 职位类型 */
    type?: number
}

interface TagDto {
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
    data?: ProfessionInfoDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRspProfessionListFrontDto {
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
    /** 单位 0 元 1 千元 2 万元 */
    uint?: number
}

/**
 * requestUrl /profession/front/enterprise/page
 * method post
 */
export interface PageUsingPOST_1Request {
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
export interface PageUsingPOST_1Response {
    /** 响应数据 */
    data?: BasePaginationRspProfessionListFrontDto
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

/**
 * requestUrl /profession/openapi/close_profession
 * method post
 */
export interface CloseProfessionUsingPOSTRequest {
    /** 职位code */
    code?: string
}

/**
 * requestUrl /profession/openapi/close_profession
 * method post
 */
export interface CloseProfessionUsingPOSTResponse {
    /** 响应数据 */
    data?: string
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface ProfessionAddressOpenApiDto {
    /** 详细地址 */
    addressInfo?: string
    /** 商圈 */
    businessArea?: number
    /** 城市id */
    cityCode?: string
    /** 工作地址code */
    code?: string
    /** 工作地址 */
    companyAddress?: string
    /** 维度 */
    latitude?: string
    /** 经度 */
    longitude?: string
    /** 省份id */
    provinceCode?: string
    /** 区/县id */
    regionCode?: string
}

interface ProfessionOrganizationOpenApiDto {
    /** 地址 */
    address?: string
    /** 所在地址区(编码code) */
    area: number
    /** 认证时间 */
    certifyAt?: number
    /** 工商照片 */
    certifyImage?: string
    /** 所在地址市(编码code) */
    city: number
    /** 统一信用代码 */
    companyCode?: string
    /** 联系人邮箱 */
    contactEmail?: string
    /** 联系人职务 */
    contactJob?: string
    /** 联系人手机号 */
    contactMobile?: string
    /** 联系人姓名 */
    contactName?: string
    /** 所属行业(二级行业id) */
    industryId: number
    /** logo */
    logo?: string
    /** 组织名称 */
    name: string
    /** 第三方组织唯一标识 */
    openKey?: string
    /** 所在地址省份(编码code) */
    province: number
    /** 组织规模(key) */
    scale: number
    /** 组织简称 */
    shortName?: string
}

interface 职位发布人信息 {
    /** 头像url */
    avatar?: string
    /** 用户code */
    code?: string
    /** 邮箱地址 */
    email?: string
    /** 身份证号 */
    idCardNo?: string
    /** 手机号 */
    mobile?: string
    /** 用户真实姓名 */
    name?: string
    /** 用户名 */
    userName?: string
}

interface 开放平台职位对象Req {
    /** 工作地址信息 */
    address?: ProfessionAddressOpenApiDto
    /** 职位code */
    code?: string
    /** 职位描述 */
    desc?: string
    /** 组织code */
    organization?: ProfessionOrganizationOpenApiDto
    /** 职位名称 */
    professionName?: string
    /** 职位类型Id */
    professionTypeId?: number
    /** 招聘类型 0 默认 1 社招 2 校招 3 实习 4 兼职 */
    recruitType?: number
    /** 职位发布人信息 */
    recruiter?: 职位发布人信息
    /** 职位需求 */
    require?: 开放平台职位对象Req
    /** 标签code */
    tags?: any[]
}

interface 开放平台职位对象Res {
    /** 招聘需求对象code */
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
    /** 结算类型 默认 0  月结 1 周结 2 日结 3 完工结 */
    settlementType?: number
    /** 单位 0 元 1 千元 2 万元 */
    uint?: number
    /** 工作日 */
    workDays?: any[]
    /** 周最小工作天数 */
    workMinDayWeek?: number
    /** 月最小工作天数 */
    workMinMonth?: number
    /** 工作结束时间 */
    workTimeEnd?: string
    /** 工作开始时间 */
    workTimeStart?: string
    /** 工作时间类型 0 默认 1 不限时间 2 自定义时间 */
    workTimeType?: number
}

/**
 * requestUrl /profession/openapi/create_profession
 * method post
 */
export interface CreateProfessionUsingPOSTRequest {
    /** 工作地址信息 */
    address?: ProfessionAddressOpenApiDto
    /** 职位code */
    code?: string
    /** 职位描述 */
    desc?: string
    /** 组织code */
    organization?: ProfessionOrganizationOpenApiDto
    /** 职位名称 */
    professionName?: string
    /** 职位类型Id */
    professionTypeId?: number
    /** 招聘类型 0 默认 1 社招 2 校招 3 实习 4 兼职 */
    recruitType?: number
    /** 职位发布人信息 */
    recruiter?: 职位发布人信息
    /** 职位需求 */
    require?: 开放平台职位对象Req
    /** 标签code */
    tags?: any[]
}

/**
 * requestUrl /profession/openapi/create_profession
 * method post
 */
export interface CreateProfessionUsingPOSTResponse {
    /** 响应数据 */
    data?: 开放平台职位对象Res
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /profession/openapi/publish_profession
 * method post
 */
export interface PublishProfessionUsingPOSTRequest {
    /** 职位code */
    code?: string
}

/**
 * requestUrl /profession/openapi/publish_profession
 * method post
 */
export interface PublishProfessionUsingPOSTResponse {
    /** 响应数据 */
    data?: string
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface ProfessionOrgCardDto {
    /** 机构信息dto */
    organizationSimpleDto?: OrganizationSimpleBaseDto
    /** 职位列表 */
    professionList?: ProfessionCardDto[]
    customContent?: string
}

interface OrganizationSimpleBaseDto {
    /** 认证状态 */
    certifyStatus?: boolean
    /** 组织编码 */
    code?: string
    /** 企业融资状态 */
    financing?: string
    /** 融资阶段字符串 */
    financingName?: string
    /** 行业id */
    industryId?: number
    /** 行业名称 */
    industryName?: string
    /** 组织logo */
    logo?: string
    /** 组织名称 */
    name?: string
    /** 组织编码 */
    organizationCode?: string
    /** 组织名称 */
    organizationName?: string
    /** 接收邮箱简历 */
    resumeMail?: string
    /** 公司规模 */
    scale?: number
    /** 公司规模名称 */
    scaleName?: string
    /** 组织简称 */
    shortName?: string
    /** 站点 */
    sid?: number
    /**  */
    sname?: string
    /** 组织拥有者 */
    userCode?: string
    /** 所在组织角色 */
    userRole?: string
}

interface ProfessionCardDto {
    /** 地址信息 */
    addressDto?: AddressDto
    /** 职位code */
    code?: string
    /** 企业信息 */
    organization?: OrganizationSimpleBaseDto
    /** 机构code */
    organizationCode?: string
    /** 职位名称 */
    professionName?: string
    /** 职位类型Id */
    professionTypeId?: string
    /** 职位需求的简单对象 */
    recruitSimpleDto?: ProfessionRecruitSimpleDto
    /**  招聘类型 0 默认 1 社招 2 校招 3 实习 4 兼职 */
    recruitType?: string
    /** 招聘人信息 */
    recruiter?: RecruiterInfoDto
    /** 站点id */
    sid?: number
    /** 来源默认0 未知 1 平台  2  职培 3 考评 4 创培 */
    source?: string
    /** 签到状态 默认 0 待发布 1 已发布 2 下架 */
    status?: number
    /** 标签列表 */
    tagDtoList?: TagMappingDto
}

interface AddressDto {
    /** 详细地址 */
    addressInfo?: string
    /** 商圈 */
    businessArea?: number
    /** 城市id */
    cityCode?: string
    /** 城市名称 */
    cityName?: string
    /**  */
    code?: string
    /** 工作地址 */
    companyAddress?: string
    /** 维度 */
    latitude?: string
    /** 经度 */
    longitude?: string
    /** 省份id */
    provinceCode?: string
    /** 省份名称 */
    provinceName?: string
    /** 区/县id */
    regionCode?: string
    /** 区/县名称 */
    regionName?: string
}

interface ProfessionRecruitSimpleDto {
    /** 实习招聘对象code */
    code?: string
    /** 教育程度 */
    education?: number
    /** 教育程度名称 */
    educationName?: string
    /** 经验 */
    experience?: number
    /** 经验名称 */
    experienceName?: string
    /** 职位code */
    professionCode?: string
    /** 薪水最大值 */
    salaryMax?: number
    /** 薪水最小值 */
    salaryMin?: number
    /** 薪资月数 */
    salaryMonth?: number
    /** 薪水类型  0 默认 1 元/时  2 元/天  3 元/周  4 元/月 */
    salaryType?: number
    /** 单位 0 元 1 千元 2 万元 */
    uint?: number
}

interface RecruiterInfoDto {
    /** 用户头像 */
    icon?: string
    /** 招聘人用户code */
    userCode?: string
    /** 招聘人名称 */
    userName?: string
}

interface TagMappingDto {
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
 * requestUrl /profession/front/portal/get/org_card
 * method post
 */
export interface GetOrgCardUsingPOSTRequest {
    /** 期望职位类型Id */
    expectProfessionTypeId?: number
    /** 不包含的id */
    notInclude?: string
    /** 机构code */
    organizationCode?: string
    /** 站点Id */
    sid?: number
}

/**
 * requestUrl /profession/front/portal/get/org_card
 * method post
 */
export interface GetOrgCardUsingPOSTResponse {
    /** 响应数据 */
    data?: ProfessionOrgCardDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface PortalProfessionInfoDto {
    /** 地址信息 */
    address?: AddressDto
    /** 职位对象code */
    code?: string
    /** 职位描述 */
    desc?: string
    /** 公司简介 */
    introductionDto?: OrgIntroductionDto
    /** 机构的工商信息 */
    orgBusinessInfo?: OrganizationBusinessDto
    /** 公司基本信息 */
    organizationBase?: OrganizationSimpleBaseDto
    /** 组织code */
    organizationCode?: string
    /** 职位名称 */
    professionName?: string
    /** 职位类型Id */
    professionTypeId?: number
    /** 职位需求信息 */
    recruitSimpleDto?: ProfessionRecruitSimpleDto
    /** 招聘类型 0 默认 1 社招 2 校招 3 实习 4 兼职 */
    recruitType?: number
    /** 招聘者信息 */
    recruiter?: RecruiterInfoDto
    /** 站点Id */
    sid?: number
    /** 来源  1 平台  2  职培 3 考评 4 创培 */
    source?: string
    /** 签到状态 默认 0 待发布 1 已发布 2 下架 */
    status?: number
    /** 标签code */
    tags?: TagDto
    /** 职位类型 */
    type?: number
}

interface OrgIntroductionDto {
    /** 发展历程 */
    developmentProcess?: string
    /** 公司简介 */
    introduction?: string
    /** 组织编码 */
    organizationCode?: string
    /** 一句话介绍 */
    simpleIntroduction?: string
}

interface OrganizationBusinessDto {
    /** 公司名称 */
    companyName?: string
    /** 法定代表人 */
    legalRepresentative?: string
    /** 组织编码 */
    organizationCode?: string
    /** 注册地址 */
    registeredAddress?: string
    /** 注册资金 */
    registeredCapital?: string
    /** 统一社会信用代码 */
    unifiedSocialCreditCode?: string
}

/**
 * requestUrl /profession/front/portal/info/{code}
 * method get
 */
export interface InfoUsingGET_1Response {
    /** 响应数据 */
    data?: PortalProfessionInfoDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /profession/front/portal/list/choices
 * method post
 */
export interface ListChoicesUsingPOSTRequest {
    /** 求职意向code */
    expectCode?: string
    /** 期望职位类型Id */
    expectProfessionTypeId?: number
    /** 求职者的openkey 区分多班次求职实训 */
    openKey?: string
    /** 机构code */
    organizationCode?: string
    /** 站点Id */
    sid?: number
    /** 用户code */
    userCode?: string
}

/**
 * requestUrl /profession/front/portal/list/choices
 * method post
 */
export interface ListChoicesUsingPOSTResponse {
    /** 响应数据 */
    data?: ProfessionCardDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /profession/front/portal/list/hot
 * method post
 */
export interface ListHotProfessionsUsingPOSTRequest {
    /** 期望职位类型Id */
    expectProfessionTypeId?: number
    /** 机构code */
    organizationCode?: string
    /** 站点Id */
    sid?: number
}

/**
 * requestUrl /profession/front/portal/list/hot
 * method post
 */
export interface ListHotProfessionsUsingPOSTResponse {
    /** 响应数据 */
    data?: ProfessionCardDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /profession/front/portal/list/new
 * method post
 */
export interface ListNewProfessionsUsingPOSTRequest {
    /** 期望职位类型Id */
    expectProfessionTypeId?: number
    /** 不包含的id */
    notInclude?: string
    /** 机构code */
    organizationCode?: string
    /** 站点Id */
    sid?: number
}

/**
 * requestUrl /profession/front/portal/list/new
 * method post
 */
export interface ListNewProfessionsUsingPOSTResponse {
    /** 响应数据 */
    data?: ProfessionCardDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /profession/front/portal/list/org
 * method post
 */
export interface ListOrgProfessionsUsingPOSTRequest {}

/**
 * requestUrl /profession/front/portal/list/org
 * method post
 */
export interface ListOrgProfessionsUsingPOSTResponse {
    /** 响应数据 */
    data?: ProfessionOrgCardDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface SimilarProfessionCardDto {
    /** 地址信息 */
    addressDto?: AddressDto
    /** 职位code */
    code?: string
    /** 企业信息 */
    organization?: OrganizationSimpleDto
    /** 职位名称 */
    professionName?: string
    /** 职位类型Id */
    professionTypeId?: string
    /**  招聘类型 0 默认 1 社招 2 校招 3 实习 4 兼职 */
    recruitType?: string
    /** 招聘人信息 */
    recruiter?: RecruiterInfoDto
    /** 站点id */
    sid?: number
    /** 来源默认0 未知 1 平台  2  职培 3 考评 4 创培 */
    source?: string
    /** 签到状态 默认 0 待发布 1 已发布 2 下架 */
    status?: number
    /** 标签列表 */
    tagDtoList?: TagMappingDto
}

interface OrganizationSimpleDto {
    /** 企业融资状态 */
    financing?: string
    /** 企业融资状态名称 */
    financingName?: string
    /** 组织code */
    organizationCode?: string
    /** 企业名称 */
    organizationName?: string
    /** 企业规模 是接口枚举 */
    scale?: number
    /** 企业规模名称 */
    scaleName?: string
}

/**
 * requestUrl /profession/front/portal/list/similar
 * method post
 */
export interface ListSimilarProfessionsUsingPOSTRequest {
    /** 不被包含的code */
    notInclude?: string
    /** 职位类型Id */
    professionTypeId?: number
    /** 站点Id */
    sid?: number
}

/**
 * requestUrl /profession/front/portal/list/similar
 * method post
 */
export interface ListSimilarProfessionsUsingPOSTResponse {
    /** 响应数据 */
    data?: SimilarProfessionCardDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRspProfessionCardDto {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: ProfessionCardDto
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

/**
 * requestUrl /profession/front/portal/page/search
 * method post
 */
export interface PageSearchUsingPOSTRequest {
    /** 城市code */
    cityCodes?: any[]
    /** 教育程度 */
    educations?: any[]
    /** 经验 */
    experiences?: any[]
    /** 行业Id */
    industryIds?: any[]
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
    /** 职位名称 */
    professionName?: string
    /** 职位类型Id */
    professionTypeIds?: any[]
    /** 省份code */
    provinceCodes?: any[]
    /** 职位需求类型 */
    recruitTypes?: any[]
    /** 地区code */
    regionCodes?: any[]
    /** 最高月薪 */
    salaryMax?: number
    /** 最低月薪 */
    salaryMin?: number
    /** 薪水类型  0 默认 1 元/时  2 元/天  3 元/周  4 元/月 */
    salaryType?: number
    /** 企业规模 */
    scales?: any[]
    /** 站点Id */
    sid?: number
    /** 单位 */
    uint?: number
}

/**
 * requestUrl /profession/front/portal/page/search
 * method post
 */
export interface PageSearchUsingPOSTResponse {
    /** 响应数据 */
    data?: BasePaginationRspProfessionCardDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /profession/front/tag/add
 * method post
 */
export interface AddBatchUsingPOST_1Request {
    /** 标签主键code */
    code?: string
    /** 机构Code */
    organizationCode?: string
    /** 职位类型Id */
    professionTypeId?: number
    /** 标签名称 */
    tagName?: string
    /** 标签类型  0自定义标签 1 推荐标签 */
    tagType?: number
}

/**
 * requestUrl /profession/front/tag/add
 * method post
 */
export interface AddBatchUsingPOST_1Response {
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
 * requestUrl /profession/front/tag/add_batch
 * method post
 */
export interface AddBatchUsingPOSTRequest {}

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
    data?: TagDto
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
    data?: TagDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}
