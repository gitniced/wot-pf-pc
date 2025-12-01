import HTTP from '@/servers/http'

/**  活动详情  */
export const getDetailData = async (params: any) => {
    return await HTTP('/activity/front/activity/organization_detail', 'post', params)
}

/**  活动详情-关联岗位  */
export const getRelationData = async (params: any) => {
    return await HTTP('/activity/front/activity/detail/profession', 'post', params)
}
/**   活动详情-活动名单 */
export const getActivityList = async (params: any) => {
    return await HTTP('/activity/front/activity/detail/apply', 'post', params)
}

/**   活动详情-活动名单-排序  */
export const getRelationSort = async (params: any) => {
    return await HTTP('/activity/front/activity/edit/profession/sort', 'post', params)
}

/**  活动回顾详情  */
export const getReviewData = async (params: any) => {
    return await HTTP('/activity/front/activity/activity_review_info', 'post', params)
}
