import http from '@/servers/http'
import type { RepeatedPaperDetailParams } from './interface'

export const getRepeatedPapaerDetailApi = (params: RepeatedPaperDetailParams) => {
    return http('/question/front/repeat/detail_by_function', 'POST', params)
}

// 获取试卷Title
export const getPaperTitleApi = (code: string) => {
    return http(`/exam/front/detail/${code}`, 'GET', {})
}
