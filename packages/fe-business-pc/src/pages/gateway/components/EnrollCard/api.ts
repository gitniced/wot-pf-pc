import Http from '@/servers/http'

//获取默认报名活动列表
export const getDefaultEnrollListApi = (params: any) => {
    return Http(`/apply/front/activity/page`, 'post', params, { repeatFilter: false })
}
