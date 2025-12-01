import Http from '@/servers/http'
import type { PracticeQueryParams } from './interface'

export const getStatisticsDataApi = (practiceCode: string) => {
    return Http(`/question/front/practice/get_simple_count_detail/${practiceCode}`, 'GET', {})
}

// 获取用户练习数据
export const getPracticeListApi = (params: PracticeQueryParams) => {
    return Http('/question/front/practice/person_wheel_page', 'POST', params)
}

// 获取知识点统计数据
export const getKnowledgeDataApi = (practiceCode: string) => {
    return Http(`/question/front/practice/get_knowledge_count/${practiceCode}`, 'GET', {})
}