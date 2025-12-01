import type { CustomContent } from '../interface'

// 创建查询任务参数
export interface RepeatTaskParams {
    code?: string
    organizationCode?: string // 机构code
    sid?: number // 站点ID
    title?: string[] | string // 题目标题
    belongType?: number
    questionCodes?: number[] // 题目code列表,仅按照题目code查重模式使用
    customContent?: CustomContent
    questionType?: number // 题目类型
    subject?: number
    skill?: number
    type?: 'all' | 'title' | 'codes' // 查重模式 all:全局扫描 title:按照标题查重 codes:按照题目code查重
}
export interface RepeatedResultParams {
    taskCode: string
}

export interface PollingResult {
    showDelete?: boolean
    showEdit?: boolean
    pollingStatus: number
    repeatedList: QuestionItem[][]
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

export interface QuestionListProps {
    questionList: QuestionItem[]
    maxCount?: number
    showEdit?: boolean
    showDelete?: boolean
    onDelete?: (questionList: QuestionItem[]) => void
}
