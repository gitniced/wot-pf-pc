/**
 * 响应数据
 *
 * StuHomeworkScoreInfoDto
 */
export interface StuHomeworkScoreInfoDto {
    /**
     * 学生任务表格集合
     */
    items?: HomeworkScoreTableGroupDto[]
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
 * HomeworkScoreTableGroupDto
 */
export interface HomeworkScoreTableGroupDto {
    /**
     * 该任务下的表格行集合
     */
    items?: HomeworkScoreStuItemDto[]
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
 * 学生课后作业得分表格-行
 *
 * HomeworkScoreStuItemDto
 */
export interface HomeworkScoreStuItemDto {
    /**
     * 评语
     */
    comment?: string
    /**
     * 课后作业名称
     */
    homeworkName?: string
    /**
     * 得分
     */
    score?: number
    /**
     * 学习环节名称
     */
    stageName?: string
    /**
     * 评分状态 0-未提交，1-已提交，2-已评分
     */
    status?: number
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
