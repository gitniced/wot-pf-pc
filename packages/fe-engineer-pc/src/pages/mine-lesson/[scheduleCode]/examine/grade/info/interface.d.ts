/**
 * 响应数据
 *
 * TaskAssessmentScoreTableGroupDto
 */
export interface TaskAssessmentScoreTableGroupDto {
    /**
     * 该任务下的表格行集合
     */
    items?: TaskAssessmentScoreTableItemDto[]
    /**
     * 学生头像
     */
    studentAvatar?: string
    /**
     * 学生姓名
     */
    studentName?: string
    /**
     * 学习任务编码
     */
    taskCode?: string
    /**
     * 学习任务名称
     */
    taskName?: string
    /**
     * 用户编码
     */
    userCode?: string
    [property: string]: any
}

/**
 * 学生任务考核得分表格-行
 *
 * TaskAssessmentScoreTableItemDto
 */
export interface TaskAssessmentScoreTableItemDto {
    /**
     * 考核类型
     */
    assessmentType?: string
    /**
     * 考核项目编码
     */
    projectCode?: string
    /**
     * 考核项目名称
     */
    projectName?: string
    /**
     * 得分
     */
    score?: number
    /**
     * 评分状态
     */
    status?: number
    /**
     * 学习任务编码
     */
    taskCode?: string
    /**
     * 学习任务名称
     */
    taskName?: string
    /**
     * 配分
     */
    weight?: number
    [property: string]: any
}
