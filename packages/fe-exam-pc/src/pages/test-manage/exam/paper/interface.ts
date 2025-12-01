export interface IQuestionDetailParams {
    examCode: string
    paperCode: string
    questionCode: string
}

export interface AnswerItem {
    questionCode: string // 对应的题目code
    questionType: number // 对应的题目type
    answer?: string | string[]
    isMarked?: boolean // 是否做了标记
    isPartial?: boolean // 是否部分作答（多选、填空）
    childList?: AnswerItem[]
}

export interface Item {
    questionCode: string // 对应的题目
    questionType: number // 题目类型
    questionSort: string
}

// 答题卡
export interface QuestionItem {
    logicSort: string // 题型序号
    title: string // 题型标题
    totalScore: number // 题型总分
    totalQuestion: number // 题型题目个数
    unificationScore?: number // 每一题的分数 为0单独设置，不显示分值
    questionType: number // 题目类型
    questionList: Item[]
}

export interface ListRes {
    answerList: AnswerItem[]
    questionList: QuestionItem[]
}

export interface OptionItem {
    sort: string // 选项序号
    title: string // 选项内容
}

// 当前试题
export interface CurrentQuestion {
    questionCode: string // 题目Code
    questionType: number // 题目类型
    title: string // 题目标题
    options?: OptionItem[] // 题目选项
    questionSort?: string // 题目序号
    childList?: CurrentQuestion[] // 子题
}

export interface IQuestionProps {
    // 题目code，如果是基础题型（除组合题+案例分析题除外），题目code为母题的code
    // 如果是复杂题型（组合题+案例分析题），题目code为子题的code
    questionCode?: string
    // 题目类型
    questionType?: number
    // 如果是基础题型，直接调用store里面修改答案的方法即可
    // 如果是复杂题型，则需要在父组件（Compose）中记录子题答案，修改完之后在调用store里面的方法
    onChange?: (answer: AnswerItem) => void
    // // 题目code，如果是基础题型（除组合题+案例分析题除外），options为母题的options
    // 如果是复杂题型（组合题+案例分析题），options为子题的options
    options?: OptionItem[]
}

export type ISaveAnswerParams = Omit<IQuestionDetailParams, 'questionCode'> & {
    answerList: AnswerItem[]
    questionCode?: string
}

export type ISubmitAnswerParams = Omit<IQuestionDetailParams, 'questionCode'> & {
    forceSubmit?: number
}

export interface ScoreResult {
    generateState: boolean
    score: number
    answeredTime: number
    specialJump: boolean
}

export type MessageDataType = 'reminder' | 'delay' | 'forcedWinding'

export interface MessageData {
    answerEndTime: number
    messageContent: string
    messageType: MessageDataType
    newContent: boolean
}
