import type { FormInstance } from 'antd'

export interface QuestionItem {
    questionType: number
    needNumber: number
    score: number
    count: number
}
export interface DetailType {
    title: string
    customContent: {
        commonJob: {
            jobName: string
            jobNameCode: number
            jobType: string
            jobTypeCode: number
            jobLevel: string
            jobLevelCode: number
        }
    }
    templateType: string
    templateCode: string
    templateTitle: string
    composition: string
    fromFileCode: string
    fromFileTitle: string
    authenticateCode: string
    authenticateTitle: string
    scoreType: string
    unificationScore: number
    qualifiedProp: number
    questionStructure: string
    questionConfigList: QuestionItem[]
    questionTableData: QuestionItem[]
    templateTableList: QuestionItem[]
    questionTypeLeast: number
    questionTotal: number
    randomQuestionState: number
    randomQuestionNum: number
    chaosOrderState: number
    chaosOptionsState: number
    numContinuousState: number
    receiptStatus: boolean
    receiptStartTime: string
    receiptEndTime: string
    quoteNumStatus: boolean
    questionCitedLimit: number
    suggestedTime: number
    precautions: string
    canEditState: number
}

export interface FormSettingProps {
    form: FormInstance
    type: string
    formData: DetailType
    setFormData: any
}
