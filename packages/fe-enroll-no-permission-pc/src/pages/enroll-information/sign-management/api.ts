import Http from '@/servers/http'

export const getSignListPageApi = (params: any) => {
    return Http('/activity/activity/admin_sign_page', 'POST', params)
}

export const getSignCountApi = () => {
    return Http('/activity/activity/page_sign_count', 'POST', {})
}
