import HTTP from '@/servers/http'

/**  保存活动接口  */
export const save = async (params: any) => {
    return await HTTP('/activity/front/activity/save', 'post', params)
}

/**  活动编辑时查详情  */
export const checkDetailsDuringEdit = async (params: any) => {
    return await HTTP('/activity/front/activity/edit/detail', 'post', params)
}

/**  编辑  */
export const edit = async (params: any) => {
    return await HTTP('/activity/front/activity/edit', 'post', params)
}
