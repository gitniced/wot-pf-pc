import http from '@/servers/http'
import type { IQuestionDetailParams, ISaveAnswerParams, ISubmitAnswerParams } from './interface'

// 做题时间
let ansTimers: any = {}
// 获取答题卡
export const getQuestionAndAnswerList = (code: string) => {
    return http(`/exam/front/exam/list_question/${code}`, 'get', {})
}

// 获取当前试题
export const getCurrentQuestion = (params: IQuestionDetailParams) => {
    return http('/exam/front/detail_question', 'post', params).then(res => {
        ansTimers[params.questionCode] = (new Date()).valueOf()
        return Promise.resolve(res)
    })
}

// 保存答案
export const saveAnswer = (params: ISaveAnswerParams) => {
    return http('/exam/front/exam/submit_answer', 'post', { ...params, answerTime: params.questionCode && (new Date()).valueOf() - (ansTimers[params.questionCode!]) })
}

// 交卷
export const submitAnswer = (params: ISubmitAnswerParams) => {
    return http('/exam/front/exam/submit_exam', 'post', params)
}
