import Http from '@/servers/http'
import type {
    PracticeListParams,
    CreatePracticeParams,
    PersonItem,
    PersonListParams,
    PracticeQuestionParams,
} from './interface'

// 获取刷题列表
export const getPracticeListApi = (params: Partial<PracticeListParams>) => {
    return Http('/question/front/practice/page', 'POST', params)
}

// 更新发布状态
export const updatePublishStatusApi = (publishStatus: number, practiceCode: string) => {
    return Http('/question/front/practice/update_publish', 'POST', { publishStatus, practiceCode })
}
// 创建刷题前置
export const createPracticePreApi = (params: Partial<CreatePracticeParams>) => {
    return Http('/question/front/practice/preCreate', 'POST', params)
}
// 创建刷题
export const createPracticeApi = (params: CreatePracticeParams) => {
    return Http('/question/front/practice/createOrUpdate', 'POST', params)
}

// 删除刷题
export const deletePracticeApi = (codeList: string[]) => {
    return Http('/question/front/practice/batch/delete', 'POST', { codeList })
}

// 根据自定义字段请求题目数量
export const getPracticeQuestionApi = (params: PracticeQuestionParams) => {
    return Http('/question/front/practice/job/count', 'POST', params)
}

// 创建刷题用户
export const createPersonApi = (params: PersonItem & { practiceCode: string }) => {
    return Http('/question/front/practice/user/create', 'POST', params)
}

// 获取刷题用户列表
export const getPersonListApi = (params: PersonListParams) => {
    return Http('/question/front/practice/user/page', 'POST', params)
}

// 批量删除刷题用户
export const batchDeletePersonsApi = (codeList: string[], practiceCode: string) => {
    return Http('/question/front/practice/user/batch/delete', 'POST', { codeList, practiceCode })
}

// 获取刷题详情
export const getPracticeDetailApi = (code: string) => {
    return Http(`/question/front/practice/detail/${code}`, 'GET', {})
}

// 获取分享刷题详情
export const getPracticeShareDetailApi = (code: string) => {
    return Http(`/question/front/practice/share/detail/${code}`, 'GET', {})
}

// 获取门户别名
export const getPortalInfo = (orgCode: string) => {
    return Http(`/business/portal/one?organizationCode=${orgCode}`, 'GET', {})
}
