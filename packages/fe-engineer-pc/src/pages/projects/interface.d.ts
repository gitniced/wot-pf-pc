/**
 * 响应数据
 *
 * BasePaginationRspTaskAssessmentPageDto
 */
export interface BasePaginationRspTaskAssessmentPageDto {
    /**
     * 当前页码
     */
    currentPage?: number
    /**
     * 数据
     */
    data?: TaskAssessmentPageDto[]
    /**
     * 总页数
     */
    pages?: number
    /**
     * 每页记录数
     */
    pageSize?: number
    /**
     * 总数
     */
    totalCount?: number
    [property: string]: any
}

/**
 * 任务考核分页条目
 *
 * TaskAssessmentPageDto
 */
export interface TaskAssessmentPageDto {
    /**
     * 授课班级
     */
    className?: string
    /**
     * 课程名称
     */
    courseName?: string
    /**
     * 待评分数量
     */
    pendingGradeCount?: number
    /**
     * 待提交数量
     */
    pendingSubmitCount?: number
    /**
     * 考核项目编码
     */
    projectCode?: string
    /**
     * 考核项目名称
     */
    projectName?: string
    /**
     * 状态：0-未评分，1-部分评分，2-全部评分
     */
    status?: number
    /**
     * 学习任务名称
     */
    taskName?: string
    /**
     * 配分(%)
     */
    weight?: number
    [property: string]: any
}
