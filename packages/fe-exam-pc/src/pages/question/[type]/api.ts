import http from '@/servers/http'
import type {
    CommonJobParams,
    QuestionListParams,
    CreateQuestionParams,
    KnowledgeParams,
} from './interface'
import type { RepeatedResultParams, RepeatTaskParams } from './check/interface'

// 获取职业工种等级下拉数据
export const getCommonJobListApi = (params: CommonJobParams) => {
    return http('/admin/site_profession/base_page_list', 'POST', params)
}

// 获取试题分类下拉列表
export const getKnowledgeListApi = (params: KnowledgeParams) => {
    return http('/question/front/knowledge/list', 'POST', params)
}

// 获取题库列表
export const getQuestionListApi = (params: Partial<QuestionListParams>) => {
    return http('/question/front/page', 'POST', params)
}

// 新建试题
export const createQuestionApi = (params: CreateQuestionParams) => {
    return http('/question/front/create', 'POST', params)
}

// 新建版本试题
export const createVersionApi = (params: CreateQuestionParams) => {
    return http('/question/front/create_version', 'POST', params)
}

// 编辑试题
export const editQuestionApi = (params: CreateQuestionParams) => {
    return http('/question/front/edit', 'POST', params)
}

// 删除试题
export const deleteQuestionApi = (codeList: string[]) => {
    return http('/question/front/batch/delete', 'post', { codeList })
}

// 获取题目详情
export const getQuestionDetailApi = (code: string) => {
    return http(`/question/front/detail/${code}`, 'GET', {})
}

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

// 更新题目开启状态
export const updateStatusApi = (code: string) => {
    return http('/question/front/update_enable_status', 'POST', { code })
}


// 获取试题分析
export const getQuestionAnalyze = (questionCode: string) => {
    return http('/question/front/get_question_analyze', 'GET', { questionCode })
}


// 获取要素细目表详情
export const getAuthenticateDetail = (code: string) => {
    return http(`/question/front/authenticate/detail/${code}`, 'GET', {})
}

// 校验数据
export const checkData = (params: any) => {
    return http(`/question/front/all_delete_check`, 'POST', params)
}

// 全部删除
export const allDelete = (params: any) => {
    return http(`/question/front/all_delete`, 'POST', params)
}
