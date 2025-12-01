import type { FormInstance } from 'antd'
import type { DetailType } from '../FormSetting/interface'
export interface TableItem {
    count: number
    questionType: number
    needNumber: number
    score: number
    [key: string]: number
}
export interface ColumnsProps {
    type: string
    composition: string
    scoreType: string
    inputChange: (value: number | null, type: number, attribute: string) => void
    templateInputChange: (value: number | null, type: number, attribute: string) => void
}
export interface AuthenticateItem {
    code: string
    name: string
    createdBy: string
}
export interface ComposeSettingProps {
    form: FormInstance
    type: string
    formData: DetailType
    setFormData: any
}
export interface ImportFileValues {
    uploadData: {
        name: string
        url: string
    }
    importData: any
}
