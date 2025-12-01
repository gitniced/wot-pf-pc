import type { FormInstance } from 'antd'
import type { MutableRefObject } from 'react'

// 查询表单属性
export type SearchFormType = {
    formRef: MutableRefObject<FormInstance<any> | undefined>
    // 点击查询 重置 按钮的回调函数
    onSearch: (values?: any) => void
}

// 表单字段类型
export type FormParamsType = {
    customContent?: {
        jobName?: string
        jobType?: string
        jobLevel?: string
    }
    publishState?: number[]
    referenceState?: number[]
    composition?: string[]
    title?: string
}

// 列表 table 数据类型
export type TableDataType = {
    code: string
    composition: string
    createdAt: number
    customContent: string
    fullOrderBy: string
    generateState: string
    order: string
    orderBy: string
    pageNo: number
    pageSize: number
    publishState: string
    referenceNum: number
    referenceState: string
    title: string
}

// 题目类型
export interface QuestionDetailType {
    questionList: {
        analysis: string
        customContent: Record<string, any>
        difficulty: string
        distinction: string
        logicSort: number
        options: {
            answer: string
            isAnswer: number
            sort: number
        }[]
        childList: QuestionDetailType['questionList']
        point: string
        pointCode: string
        questionType: number
        questionCode: string
        code: string
        realSort: number
        score: number
        title: string
    }[]
    logicSort: string
    questionType: number
    totalQuestion: number
    totalScore: number
    unificationScore: number
    needNumber: number
}
export interface PublishType {
    success: boolean
    failReasons: string[]
}
