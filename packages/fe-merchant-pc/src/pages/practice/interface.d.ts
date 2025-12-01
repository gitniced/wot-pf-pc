import { CustomDataNode, KnowledgeItem } from "./edit/components/interface"
import type { QUESTION_SELECT_TYPE } from "./edit/constants"

export interface RouteQuery {
    code?: string
}

interface CustomContent {
    jobLevel?: string
    jobLevelCode?: number
    jobName?: string
    jobNameCode?: number
    jobType?: string
    jobTypeCode?: number
}


interface KnowledgePointInfoItem {
    knowledgePointName: string,
    knowledgePointCode: string,
    knowledgePointLevelCode: string
}

export interface SelectQuestionDto {
    commonJobCustomDtoList?: CustomContent[] // 按职业工种等级选择的集合
    knowledgePointInfoList?: KnowledgePointInfoItem[] // 按知识点分类选择的集合
    judgeCount?: number // 判断题题数
    multipleCount?: number // 多选题题数
    singleCount?: number // 单选题题数
    totalCount?: number // 总体数
    fixedCount?: number // 组合题数
}

export interface PracticeListParams {
    pageNo: number
    pageSize: number
    organizationCode?: string // 机构code
    practiceStatus?: number // 刷题状态 0-未开始 1-已结束 2-练习中
    publishStatus?: number // 发布状态
    publishOtherStatus?: number // 0-未推送 1-已推送
    titleLike?: string // 刷题标题模糊查询
    sid: number
}

// 刷题详情
export interface PracticeListItem {
    code: string
    title: string // 刷题标题
    questionCount: number // 试题数量
    publishStatus?: number // 发布状态
    publishOtherStatus?: number // 推送状态
    organizationCode?: string // 机构code
    selectQuestionDto?: SelectQuestionDto
    questionType: QUESTION_SELECT_TYPE 
}

export interface CreatePracticeParams {
    sid: string // 站点ID
    code?: string
    title?: string // 刷题标题
    organizationCode?: string // 机构code
    jobs?: CustomContent[] | null // 刷题选择详情数据
    knowledgePoints?: KnowledgePointInfoItem[]
    publishStatus?: number // 发布状态
    status?: number // 刷题状态 0-未开始 1-已结束 2-练习中
    belongType: number
    questionType?: QUESTION_SELECT_TYPE
}

export interface PracticeQuestionParams {
    jobs: CustomContent[]
    knowledgePointInfos?: KnowledgePointInfoItem[]
    organizationCode?: string // 机构code
    subject: number
    belongType: number
    sid: number
}