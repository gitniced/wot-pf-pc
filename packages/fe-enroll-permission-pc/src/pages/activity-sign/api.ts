import Http from '@/servers/http'

export const getSignListPageApi = (params: any) => {
    return Http('/activity/front/activity/organization_sign_page', 'POST', params)
}
