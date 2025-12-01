
import Http from '@/servers/http'
import type { GradingDetail } from './interface'

// 获取阅卷任务详情
export const getGradingDetail = (gradingCode: string) => {
    return Http(`/exam/front/grading/detail/${gradingCode}`, 'get', {})
}

// 获取客观题
export const getQuestionList = (taskCode: string) => {
    return Http(`/exam/front/grading/list_grading_question/${taskCode}`, 'get', {})
}

// 保存阅卷配置
export const saveGradingSetting = (params: Partial<GradingDetail>, taskCode: string) => {
    return Http(`/exam/front/grading/update/${taskCode}`, 'POST', params)
}