import Http from '@/servers/http'
// 获取分页列表
export const getListPageApi = (params: any) => {
    return Http('/auth/front/user_pool/page_list', 'POST', params)
}

export const saveFollow = (data: any) => {
    return Http('/auth/front/user_pool/save_follow', 'POST', data)
}
