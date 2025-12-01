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
    randomQuestionType: number
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
    difficultyLimit: boolean
    difficultyTableData?: TestPaperDifficultyConfigDto[]
    templateDifficultyTableData?: TestPaperDifficultyConfigDto[]
}

/**
 * <p>
 * 试卷题目难易度分布配置保存dto
 * </p>
 *
 * TestPaperDifficultyConfigDto
 */
export interface TestPaperDifficultyConfigDto {
    /**
     * 难度 :10容易、20较易、30中等、40较难、50难
     */
    level?: number
    /**
     * 题目数量
     */
    needNumber?: number
    [property: string]: any
}

export interface FormSettingProps {
    form: FormInstance
    type: string
    formData: DetailType
    setFormData: any
}
