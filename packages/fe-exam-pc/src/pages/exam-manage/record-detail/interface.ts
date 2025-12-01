
export interface OptionItem {
    sort: string
    isAnswer: number // 是否是答案
    answer: string 
}

export interface Item {
    title: string // 题干
    analysis: string // 解析
    questionCode: string // 题目Code
    score: number // 题目得分
    logicSort: number // 题目序号
    questionType: number // 题型
    makringTeacher: { name: string, score: number}[] // 阅卷人
    objectiveState: number // 是否是客观题
    options: OptionItem[]
    childList?: Item[]
}
export interface QuestionItem {
    logicSort: string // 序号
    questionList: Item[] // 题目
    questionType: number // 题型
    title: string // 题目名称
    totalQuestion: number // 总题数
    totalScore: number // 总分
    unificationScore: number // 单个题目的分数
    minSort: string
}

export interface AnswerItem {
    answer: string | string[]
    childList?: AnswerItem[]
    questionCode: string
    score: number
    state: number
}

export interface RecordDetail {
    answerList: AnswerItem[] // 答案列表
    examTitle: string // 考试名称
    gradingType: 'all' | 'questionType' | 'question' // 阅卷方式
    paperTitle: string // 试卷名称
    stuName: string // 学生名称
    questionList: QuestionItem[] // 题目
}

export interface IRouteParams  {
    stuExamCode: string
}