import HTTP from '@/servers/http'

/**  活动详情  */
export const getDetailData = async (params: any) => {
    return await HTTP('/activity/front/activity/organization_detail', 'post', params)
}
