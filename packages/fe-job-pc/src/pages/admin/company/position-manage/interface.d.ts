export interface ProfessionListFrontDto {
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

export interface ProfessionListFrontDto {
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

export interface ProfessionPage {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: ProfessionListFrontDto[]
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

export interface ProfessionStatus {
    /** 全部 */
    allCount?: number
    /** 关闭 */
    closedCount?: number
    /** 招聘中 */
    recruitCount?: number
    /** 待发布 */
    unPublishCount?: number
}
