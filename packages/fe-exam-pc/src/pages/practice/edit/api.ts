import Http from '@/servers/http'

import type { KnowledgeListParams } from './components/interface'
import { getLocalStorage } from '@/storage'

// 获取知识点列表
export const getKnowledgeList = (params: KnowledgeListParams) => {
    return Http('/question/front/knowledge/list', 'POST', params)
}


// 查询该站点可以获取到的资源方推送刷题
export const getPracticeListByMerchantApi = () => {
    return Http(`/question/front/practice/list_publish_practice?sid=${getLocalStorage('SID')}`, 'GET', {})
}

// 获取刷题的题目详情
export const getSelectQuestionApi = (practiceCode: string) => {
    return Http(`/question/front/practice/get_select_question/${practiceCode}`, 'GET', {})
}