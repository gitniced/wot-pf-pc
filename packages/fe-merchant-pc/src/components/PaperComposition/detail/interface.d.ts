export interface QuestionItem {
    questionType: number
    needNumber: number
    score: number
}

export interface DetailType {
    title: string
    customContent: {
        commonJob: {
            jobName: string
            jobType: string
            jobLevel: string
        }
    }
    composition: string
    authenticateTitle: string
    scoreType: string
    unificationScore: number
    qualifiedProp: number
    questionStructure: string
    questionConfigList: QuestionItem[]
    questionTypeLeast: number
    questionTotal: number
    randomQuestionState: number
    randomQuestionNum: number
    chaosOrderState: number
    chaosOptionsState: number
    numContinuousState: number
    receiptStartTime: string
    receiptEndTime: string
    questionCitedLimit: number
    suggestedTime: number
    precautions: string
    canEditState: number
}
