import http from '@/servers/http'

export const getFrontPointCount = (params: Record<string, any>) => {
    return http(`question/front/point/count`, 'post', params)
}