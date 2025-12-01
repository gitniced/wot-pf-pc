import HTTP from '@/servers/http'

export const getPositionData = async (params: any) => {
    let data = await HTTP('/activity/front/activity/page/profession', 'post', {
        ...params,
    })

    return data
}
