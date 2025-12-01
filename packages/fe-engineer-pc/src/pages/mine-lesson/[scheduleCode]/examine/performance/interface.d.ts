/**
 * 响应数据
 *
 * StuClassPerformanceScoreDto
 */
export interface StuClassPerformanceScoreDto {
    /**
     * 学生任务表格集合
     */
    items?: ClassPerformanceScoreTableGroupDto[]
    /**
     * 学生头像
     */
    studentAvatar?: string
    /**
     * 学生姓名
     */
    studentName?: string
    /**
     * 用户编码
     */
    userCode?: string
    [property: string]: any
}

/**
 * 学习任务 + 表格集合
 *
 * ClassPerformanceScoreTableGroupDto
 */
export interface ClassPerformanceScoreTableGroupDto {
    /**
     * 该任务下的表格行集合
     */
    items?: ClassPerformanceScoreTableItemDto[]
    /**
     * 学习任务编码
     */
    taskCode?: string
    /**
     * 学习任务名称
     */
    taskName?: string
    [property: string]: any
}

/**
 * 学生课堂表现得分表格-行
 *
 * ClassPerformanceScoreTableItemDto
 */
export interface ClassPerformanceScoreTableItemDto {
    /**
     * 评语
     */
    comment?: string
    /**
     * 得分
     */
    score?: number
    /**
     * 学习环节名称
     */
    stageName?: string
    /**
     * 评分状态
     */
    status?: string
    /**
     * 学习步骤名称
     */
    stepName?: string
    /**
     * 学习任务编码
     */
    taskCode?: string
    /**
     * 学习任务名称
     */
    taskName?: string
    [property: string]: any
}
