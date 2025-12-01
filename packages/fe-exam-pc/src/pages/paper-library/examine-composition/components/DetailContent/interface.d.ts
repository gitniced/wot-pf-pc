import type { DetailType } from '../FormSetting/interface'

export interface ColumnsProps {
    scoreType: string
    isEdit: boolean
}

export interface QuestionItem {
    questionType: number
    needNumber: number
    score: number
    count: number
}
export interface DetailContentProps {
    isEdit: boolean
    formData: DetailType
    setFormData?: any
}
