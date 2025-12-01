import type { EXAMINE_COMMENT_TYPE_LABEL } from '../const'

/**
 * 考核项目信息
 *
 * AssessmentProjectDto
 */
export interface AssessmentProjectDto {
    /**
     * 考核项目编号
     */
    projectCode?: string
    /**
     * 考核项目名称
     */
    projectName?: string
    /**
     * 任务编号
     */
    taskCode?: string
    /**
     * 任务名称
     */
    taskName?: string
    [property: string]: any
}

/**
 * 响应数据
 *
 * AssessmentProjectCriteriaDto
 */
export interface AssessmentProjectCriteriaDto {
    /**
     * 评价标准列表
     */
    criteriaList?: EvaluationCriteriaItemDto[]
    /**
     * 项目编号
     */
    projectCode?: string
    /**
     * 项目名称
     */
    projectName?: string
    /**
     * 任务编号
     */
    taskCode?: string
    /**
     * 任务名称
     */
    taskName?: string
    [property: string]: any
}

/**
 * 评价标准项
 *
 * EvaluationCriteriaItemDto
 */
export interface EvaluationCriteriaItemDto {
    /**
     * 指标编号
     */
    code?: string
    /**
     * 评价细则
     */
    evaluatedRubric?: string
    /**
     * 评价标准
     */
    evaluatorCriteria?: string
    /**
     * 配分
     */
    weight?: number
    [property: string]: any
}

/**
 * 考核项目学习成果DTO
 *
 * ProjectLearningOutcomeDto
 */
export interface ProjectLearningOutcomeDto {
    /**
     * 编辑/上传内容链接
     */
    contentUrl?: string
    /**
     * 编辑格式(1-在线，2-文件)
     */
    editFormat?: number
    /**
     * 编辑或上传状态(1-已编辑/上传，2-未编辑/上传)
     */
    editStatus?: number
    /**
     * 文件格式(word-文档，excel-表格，mind-脑图)
     */
    fileFormat?: string
    /**
     * 关联小组编码（仅团队成果）
     */
    groupCode?: string
    /**
     * 学习成果编号
     */
    outcomeCode?: string
    /**
     * 学习成果名称
     */
    outcomeName?: string
    /**
     * 排序
     */
    sort?: number
    /**
     * 模版信息
     */
    templateInfo?: string
    /**
     * 协作类型（1-个人，2-团队）
     */
    type?: number
    [property: string]: any
}

/**
 * PeerEvaluationTargetDto
 */
export interface PeerEvaluationTargetDto {
    /**
     * 评价任务编号
     */
    evaluationTask?: string
    /**
     * 被评人用户编码
     */
    userCode?: string
    /**
     * 被评人姓名
     */
    userName?: string
    [property: string]: any
}

/**
 * InterGroupPeerEvaluationTargetDto
 *
 * InterGroupPeerTargetDto
 */
export interface InterGroupPeerTargetDto {
    /**
     * 评价任务编号
     */
    evaluationTask?: string
    /**
     * 被评团队编码
     */
    teamCode?: string
    /**
     * 被评团队组长编码
     */
    teamLeaderCode?: string
    /**
     * 被评团队名称
     */
    teamName?: string
    [property: string]: any
}

/** 当前评价 */
export interface CurrentEvaluationDto {
    /** 用户编码 */
    userCode?: string
    /** 用户名称 */
    userName?: string
    /** 评价任务编号 */
    evaluationTask?: string
    /** 成果列表 */
    outcomeList?: ProjectLearningOutcomeDto[]
    /** 评价标准 */
    criteria?: AssessmentProjectCriteriaDto
    /** 评价类型 */
    type?: keyof typeof EXAMINE_COMMENT_TYPE_LABEL
    /** 评价内容 */
    comment?: string
    /** 评价状态 false未评价 true已评价*/
    status?: boolean
}
