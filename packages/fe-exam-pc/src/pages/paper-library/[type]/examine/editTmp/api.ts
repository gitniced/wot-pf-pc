import http from '@/servers/http'

// 获取试卷详情
export const getFrontDetail = (code: string, params: Record<string, any>) => {
    return http(`/exam/front/detail/${code}`, 'GET', params)
}
// 获取考评点分布详情
export const getAuthDetailByCode = (code: string, params: Record<string, any>) => {
    return http(`/exam/front/get_auth_detail/${code}`, 'GET', params)
}

// 获取题型分布详情
export const getQuestionDetailByCode = (code: string, params: Record<string, any>) => {
    return http(`/exam/front/get_question_detail/${code}`, 'GET', params)
}

// 试卷发布
export const postUpdatePublish = (params: Record<string, any>) => {
    return http(`/exam/front/update_publish`, 'post', params)
}

// 保存分数
export const setQuestionScore = (params: Record<string, any>) => {
    return http(`/exam/front/set_question_score`, 'post', params)
}

// 删除考题
export const deleteQuestion = (params: Record<string, any>) => {
    return http(`/exam/front/delete_question`, 'post', params)
}

// 添加试题
export const addQuestion = (params: Record<string, any>) => {
    return http(`/exam/front/add_question`, 'post', params)
}

// 保存注意事项
export const updatePrecautions = (params: Record<string, any>) => {
    return http(`/exam/front/update_precautions`, 'post', params)
}

// 批量设置分数
export const batchSetQuestionScore = (params: Record<string, any>) => {
    return http(`/exam/front/batch_set_question_score`, 'post', params)
}
