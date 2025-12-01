import http from '@/servers/http'

export const getFrontDetail = (code: string, params: Record<string, any>) => {
    return http(`/exam/front/detail/${code}`, 'get', params)
}

export const postFrontGetGenerate = (paperCode: string, commonParams: Record<string, any>) => {
    return http(`/exam/front/get_generate/${paperCode}`, 'post', commonParams)
}

export const postFrontUpdate = (params: Record<string, any>) => {
    return http(`/exam/front/update`, 'post', params)
}

export const postFrontCreate = (params: Record<string, any>) => {
    return http(`/exam/front/create`, 'post', params)
}
