import type { RequestType } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import type { PaginationProps } from 'antd'
import type { TableRowSelection } from 'antd/lib/table/interface'
import type { Key } from 'react'

/**
 * 试题表格类型
 */
export interface TableDataType {
    analysis: string
    childList: {
        analysis: string
        childList: any[]
        code: string
        customContent: Record<string, any>
        level: number
        merchantCode: string
        operatorCode: string
        optionList: {
            answer: string
            code: string
            isAnswer: false
            questionCode: string
            sort: string
            title: string
        }[]
        parentCode: string
        referenceCount: number
        referenceStatus: number
        storageTime: number
        title: string
        type: number
    }[]
    code: string
    customContent: Record<string, any>
    level: number
    merchantCode: string
    operatorCode: string
    optionList: {
        answer: string
        code: string
        isAnswer: false
        questionCode: string
        sort: string
        title: string
    }[]
    parentCode: string
    referenceCount: number
    referenceStatus: number
    storageTime: number
    title: string
    type: number
}

/**
 * 试题 hook
 */
export interface PaginationType {
    total?: number
    pageSize?: number
    current?: number
}

export interface UseTableSearchType {
    selectedKeys: Key[]
    getTableData: ((v: any) => Promise<RequestType>) | undefined
    rowSelection: TableRowSelection<TableDataType>
    selectedRowKeys: TableDataType[]
}

/**
 * 试题form类型
 */
export interface FormParamsType {
    titleLike: string
    questionType: number
    questionLevel: number
    discrimination: number
}
export interface LevelItem {
    needNumber: number
    level: number
    count: number
}

/**
 * 试卷详情
 */
export interface ExamineDetailType {
    authenticateCode: string
    authenticateTitle: string
    chaosOptionsState: number
    chaosOrderState: number
    checkQuestionType: boolean
    checkRandomQuestionNum: boolean
    code: string
    composition: string
    customContent: Record<string, any>
    haveUnificationScore: boolean
    numContinuousState: number
    organizationCode: string
    precautions: string
    qualifiedProp: number
    quoteNumStatus: number
    questionCitedLimit: number
    questionConfigList: {
        needNumber: number
        questionType: number
        score: number
    }[]
    questionStructure: string
    questionTotal: number
    questionTypeLeast: number
    randomQuestionNum: number
    randomQuestionType: number
    randomQuestionState: number
    receiptEndTime: string
    receiptStartTime: string
    savedQuestionTotal: number
    scoreTotal: number
    scoreType: string
    sid: number
    suggestedTime: number
    tags: string
    templateCode: string
    templateTitle: string
    title: string
    trueState: number
    unificationScore: number
    userCode: string
    advancedConfig: string
    totalScore: string
    groupCount: number // 重复试题组数
    taskCode: string // 轮询重复试题的任务code
    difficultyLimit: boolean
    difficultyConfigList: LevelItem[]
}

/**
 * 考评点详情
 */
export interface AuthDetailType {
    detailList: {
        actualGravity: string
        pointList: {
            difficulty: string
            distinction: string
            important: string
            point: string
            pointCode: string
            questionTotal: number
            questionType: string
            // 自定义字段
            rowSpan: number
        }[]
        range: string
        rangeCode: string
        requiredGravity: string
    }[]
    statistics: {
        importantX: number
        importantY: number
        importantZ: number
    }
}
export interface AuthDetailListType {
    actualGravity: string
    difficulty: string
    distinction: string
    important: string
    point: string
    pointCode: string
    questionTotal: number
    questionType: string
    // 自定义字段
    rowSpan: number
    range: string
    rangeCode: string
    requiredGravity: string
}
export interface PublishType {
    success: boolean
    failReasons: string[]
}
