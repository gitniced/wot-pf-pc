
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
    makringTeacher: string // 阅卷人
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
}

export interface AnswerItem {
    answer: string | string[]
    childList?: AnswerItem[]
    questionCode: string
    score: number
    state: number
}

export interface GradingDetail {
    stuExamCode: string
    answerList: AnswerItem[] // 答案列表
    examTitle: string // 考试名称
    gradingType: 'all' | 'questionType' | 'question' // 阅卷方式
    isFinish: boolean // 是否完成阅卷
    noReadCount: number // 待阅卷数量
    paperTitle: string // 试卷名称
    readCount: number // 已阅卷数量
    stuName: string // 学生名称
    subjectiveScore: number // 客观题得分
    submitSort: number // 考卷序号
    questionList: QuestionItem[] // 题目
    scoreList: ScoreItem[] // 得分
}

export interface GradingDetailReq {
    stuCode?: string // 学生code 编辑需要传
    taskCode: string // 考试任务code
    sensitiveState?: number
}

export interface ScoreItem {
    score?: number | string
    questionCode: string
    childList?: ScoreItem[]
}

export interface CorrectiveGradesReq {
    stuExamCode: string
    scoreList: ScoreItem[]
}

export interface IQuery {
    stuCode?: string
}