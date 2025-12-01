export interface QuestionItemType {
    questionType: number
    questionCode: string
    title: string
    options: {
        sort: string
        isAnswer: number
        answer: string
    }[]
    analysis: string
    childList: QuestionItemType[]
    logicSort: string
    realSort: number
    score: number
}
export interface QuestionListType {
    logicSort: string
    title: string
    totalQuestion: number
    totalScore: number
    minSort: string
    maxSort: string
    unificationScore: number
    questionType: number
    questionList: QuestionItemType[]
}
export interface ExamDetailType {
    title: string
    customContent: {
        commonJob: {
            jobName: string
            jobType: string
            jobLevel: string
        }
    }
    scoreType: string
    precautions: string
}
export interface TopicProps {
    examDetail?: ExamDetailType
    questionItem: QuestionListType
}
