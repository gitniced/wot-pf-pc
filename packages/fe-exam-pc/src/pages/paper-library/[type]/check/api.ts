import http from '@/servers/http'
import type { RepeatedPaperDetailParams, DeleteParams } from './interface'

export const getRepeatedPapaerDetailApi = (params: RepeatedPaperDetailParams) => {
    return http('/question/front/repeat/detail_by_function', 'POST', params)
}

// 获取试卷Title
export const getPaperTitleApi = (code: string, params = {}) => {
    return http(`/exam/front/detail/${code}`, 'GET', params)
}

// 删除考题
export const deleteQuestionApi = (params: DeleteParams[]) => {
    return http(`/exam/front/delete_question`, 'post', params)
}
