import http from '@/servers/http'
import type { CommonJobParams, RepeatTaskParams, RepeatedResultParams } from './interface'
import type { KnowledgeParams } from '../../pages/question/[type]/components/QuestionTypes/interface'

// 标题查重
export const getRepeatedQuestionListByTitleApi = (params: RepeatTaskParams) => {
    return http('/question/front/repeat/quick_title_search', 'POST', params)
}
// 查询重复题目
export const getRepeatedQuestionListApi = (params: RepeatedResultParams) => {
    return http('/question/front/repeat/get_result', 'POST', params)
}

// 创建查询任务
export const createRepeatTaskApi = (params: RepeatTaskParams) => {
    return http('/question/front/repeat/create', 'POST', params)
}

// 删除试题
export const deleteQuestionApi = (codeList: string[]) => {
    return http('/question/front/batch/delete', 'post', { codeList })
}

// 获取职业工种等级下拉数据
export const getCommonJobListApi = (params: CommonJobParams) => {
    return http('/admin/site_profession/base_page_list', 'POST', params)
}

// 获取试题分类下拉列表
export const getKnowledgeListApi = (params: KnowledgeParams) => {
    return http('/question/front/knowledge/list', 'POST', params)
}
