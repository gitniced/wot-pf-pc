// 分类树的类型

export interface CategoryListItem {
    code: string
    sid: string
    siteName: string
    catalogName: string
    openStatus: string
    createdAt: string
}

export interface LabelKey {
    label: string
    key: string
}

/**
 * com.wotu.activityservice.interfaces.dto.activity.front.resp.ActivityPageFrontRespDto
 *
 * ActivityPageFrontRespDto
 */
export interface ActivityPageFrontRespDto {
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
     * 城市描述
     */
    cityDesc?: null | string
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
     * 详情页pv
     */
    pv?: number | null
    /**
     * 详情页pv描述
     */
    pvStr?: null | string
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
