export interface QuestionItem {
    questionType: number
    needNumber: number
    score: number
    count: number
}

export interface LevelItem {
    needNumber: number
    level: number
    count: number
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
    authenticateCode: string
    authenticateTitle: string
    scoreType: string
    unificationScore: number
    qualifiedProp: number
    questionStructure: string
    questionConfigList: QuestionItem[]
    questionTableData: QuestionItem[]
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
    examinationCommitmentLetter: string
    expertReviewMaterials: string
    questionSourceType: number
    difficultyLimit: boolean
    difficultyConfigList: LevelItem[]
}
