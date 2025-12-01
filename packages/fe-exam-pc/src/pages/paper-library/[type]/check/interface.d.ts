export interface RepeatedPaperDetailParams {
    sourceFunction: 'exam'
    sourceCode: string
}

export interface RepeatedPaperDetail {
    taskCode: string
    totalGroup: number
    totalQuestion: number
    questions: QuestionItem[][]
}

export interface RepeatedResultParams {
    pageNo: number // 分页
    pageSize: number
    taskCode: string
}

export interface OptionItem {
    code: string
    questionCode: string
    sort: string
    isAnswer: boolean // 是否是答案
    answer: string
}

export interface QuestionItem {
    type: number // 题目类型
    level: number // 题目等级
    title: string // 题干
    sort?: string
    optionList: OptionItem[] // 选项
    code: string // 题目Code
    childList?: QuestionItem[]
    analysis?: string // 解析
    distinction?: string // 区分度
    authPoint?: string // 鉴定点
    referenceStatus?: number // 引用状态 10,已引用20
    referenceCount?: number // 引用次数
    recommendStatus?: number // 推荐状态10未推荐,20已推荐
}

export interface PollingResult {
    pollingStatus: number
    repeatedList: QuestionItem[][]
    showDelete?: boolean
}

export interface QuestionListProps {
    questionList: QuestionItem[]
    showDelete?: boolean
    onDelete?: (questionList: QuestionItem[]) => void
}
export interface DeleteParams {
    paperCode: string
    questionCode: string
    questionType: number
    userCode: number
}
