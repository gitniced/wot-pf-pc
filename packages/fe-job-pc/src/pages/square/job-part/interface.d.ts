/**
 * 公司列表
 */
export interface CompanyActivityListRespDto {
    /**
     * 当前页码.
     * 当前页码
     */
    currentPage?: number | null
    /**
     * The data.
     * 数据
     */
    data?: CompanyActivityListItemRespDto[] | null
    /**
     * 总页数
     */
    pages?: number | null
    /**
     * 每页记录数.
     * 每页记录数
     */
    pageSize?: number | null
    /**
     * 总数.
     * 总数
     */
    totalCount?: number | null
    [property: string]: any
}

/**
 * 公司岗位
 */
export interface CompanyActivityListItemRespDto {
    /**
     * 企业code
     */
    organizationCode?: null | string
    /**
     * 企业名称
     */
    organizationName?: null | string
    /**
     * 企业logo
     */
    organizationLogo?: null | string
    /**
     * 活动code
     */
    code?: null | string
    /**
     * 企业融资状态
     */
    financing?: null | string
    /**
     * 融资阶段字符串
     */
    financingName?: null | string
    /**
     * 职位列表
     */
    professionList?: JobActivityListItemRespDto[] | null
    /**
     * 公司规模
     */
    scale?: number | null
    /**
     * 公司规模名称
     */
    scaleName?: null | string
    /**
     * 站点id
     */
    sid?: number | null
    /**
     * 站点名称
     */
    siteName?: null | string
    [property: string]: any
}

/**
 * 岗位列表
 */
export interface JobActivityListRespDto {
    /**
     * 当前页码.
     * 当前页码
     */
    currentPage?: number | null
    /**
     * The data.
     * 数据
     */
    data?: JobActivityListItemRespDto[] | null
    /**
     * 总页数
     */
    pages?: number | null
    /**
     * 每页记录数.
     * 每页记录数
     */
    pageSize?: number | null
    /**
     * 总数.
     * 总数
     */
    totalCount?: number | null
    [property: string]: any
}

/**
 * 岗位
 */
export interface JobActivityListItemRespDto {
    /**
     * 城市
     */
    city?: null | string
    /**
     * 城市名称
     */
    cityName?: null | string
    /**
     * 企业code
     */
    organizationCode?: null | string
    /**
     * 企业logo
     */
    organizationLogo?: null | string
    /**
     * 企业名称
     */
    organizationName?: null | string
    /**
     * 岗位code
     */
    professionCode?: null | string
    /**
     * 岗位名称
     */
    professionName?: null | string
    /**
     * 职位类型Id
     */
    professionTypeId?: number | null
    /**
     * 职位类型名称
     */
    professionTypeName?: number | null
    /**
     * 省份
     */
    province?: null | string
    /**
     * 省份名称
     */
    provinceName?: null | string
    /**
     * 招聘人信息
     */
    recruiterInfo?: ProfessionRecruiterInfoFrontRespDto
    /**
     * 招聘类型
     */
    recruitType?: null | string
    /**
     * 招聘类型名称
     */
    recruitTypeName?: null | string
    /**
     * 区
     */
    region?: null | string
    /**
     * 区名称
     */
    regionCode?: null | string
    /**
     * 薪水
     */
    salaryDesc?: null | string
    /**
     * 标签列表
     */
    tagList?: ProfessionTagMappingFrontRespDto[] | null
    [property: string]: any
}

/**
 * 招聘人信息
 *
 * ProfessionRecruiterInfoFrontRespDto
 */
export interface ProfessionRecruiterInfoFrontRespDto {
    /**
     * 用户头像
     */
    icon?: null | string
    /**
     * 招聘人身份
     */
    identity?: null | string
    /**
     * 招聘人用户code
     */
    userCode?: null | string
    /**
     * 招聘人名称
     */
    userName?: null | string
    [property: string]: any
}

/**
 * 标签映射对象
 *
 * ProfessionTagMappingFrontRespDto
 */
export interface ProfessionTagMappingFrontRespDto {
    /**
     * 职位code
     */
    professionCode?: null | string
    /**
     * 标签code
     */
    tagCode?: null | string
    /**
     * 标签名称
     */
    tagName?: null | string
    [property: string]: any
}

/**
 * 响应数据
 *
 * ActivityApplyCheckRespDto
 */
export interface ActivityApplyCheckRespDto {
    /**
     * 是否在活动名单
     */
    successFlag: boolean
    [property: string]: any
}
