import type { DefaultOptionType } from 'antd/lib/select'

export interface SearchParams {
    discrimination: number
    merchantCode: string
    order: string
    orderBy: string
    pageNo: number
    pageSize: number
    questionLevel: number
    questionType: number
    recommendStatus: number
    referStatus: number
    storageEndTime?: number
    storageStartTime?: number
    titleLike: string
    workLevel: string
    workLike: DefaultOptionType[]
    workName: string
    workType: string
    warehousingTime?: any
}

export interface ExtraSearchParams {
    belongType?: number
    skill?: number
    subject?: number
    sid?: number
    knowledgePointCode?: string
}

export interface TableData {
    currentPage: number
    data: TableItem[]
    pageSize: number
    pages: number
    totalCount: number
}

export interface TableItem {
    analysis: string
    childList: any[]
    code: string
    customContent: CustomContent
    level: number
    merchantCode: string
    optionList: any[]
    parentCode: string
    referenceCount: number
    referenceStatus: number
    storageTime: number
    title: string
    type: number
    recommendStatus: number
    referStatus: number
}

export interface CustomContent {
    discrimination: number
    point: string
    workLevel: string
    workName: string
    workType: string
    authenticatePoint: string
    commonJob?: string
    recommendStatus: number
}

export interface ImportParams {
    merchantCode?: string
    url: string
    name: string
}

export interface FailDtoList {
    code: string
    failMsg: string
    fileImportCode: string
    line: number
    questionType: number
}
