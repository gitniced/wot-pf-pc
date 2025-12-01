import type { DetailType } from '../FormSetting/interface'

export interface BaseSettingProps {
    type: string
    formData: DetailType
    setFormData: any
}

export interface TableItem {
    canEditState: number
    code: string
    composition: string
    createBy: string
    createdAt: number
    customContent: {
        commonJob: {
            jobName: string
            jobType: string
            jobLevel: string
        }
    }
    title: string
    usedState: number
}
export interface TemplateList {
    currentPage: number
    data: TableItem[]
    pageSize: number
    pages: number
    totalCount: number
}
