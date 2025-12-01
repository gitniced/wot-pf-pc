/**
 * 响应数据
 *
 * ActivityDetailFrontRespDto
 */
export interface ActivityDetailFrontRespDto {
    /**
     * 活动形式 0:线上，1：线下，2线上+线下
     */
    activityForm?: number | null
    /**
     * 活动形式名称 0:线上，1：线下，2线上+线下
     */
    activityFormName?: null | string
    /**
     * 活动简介富文本
     * 活动介绍
     */
    activityIntroduce?: null | string
    /**
     * 活动名称
     */
    activityName?: null | string
    /**
     * 活动状态，0:未发布，1:未开始，2:进行中，3:已结束
     */
    activityStatus?: number | null
    /**
     * 活动状态，0:未发布，1:未开始，2:进行中，3:已结束
     * 活动状态名称，0:未发布，1:未开始，2:进行中，3:已结束
     */
    activityStatusName?: null | string
    /**
     * 活动地址
     */
    address?: null | string
    /**
     * 是否活动报名
     */
    applyFlag?: boolean | null
    /**
     * 活动code
     */
    code?: null | string
    /**
     * 封面url
     */
    coverUrl?: null | string
    /**
     * 日期描述
     */
    dateDesc?: null | string
    /**
     * 招聘企业数量
     */
    organizationNum?: number | null
    /**
     * 关联岗位数量
     */
    professionNum?: number | null
    /**
     * 详情页pv
     */
    pv?: number | null
    /**
     * 详情页pv描述
     */
    pvStr?: null | string
    /**
     * 关联岗位开关 0:关，1:开
     */
    relateProfessionStatus?: number | null
    /**
     * 站点id
     */
    sid?: number | null
    /**
     * 是否显示活动签到
     */
    signDisplayFlag?: boolean | null
    /**
     * 站点名称
     */
    siteName?: null | string
    /**
     * 主办方名称
     */
    sponsorName?: null | string
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
