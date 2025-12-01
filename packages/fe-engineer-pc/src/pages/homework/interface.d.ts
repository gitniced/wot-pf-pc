/**
 * 响应数据
 *
 * BasePaginationRspHomeworkPageItemDto
 */
export interface BasePaginationRspHomeworkPageItemDto {
    /**
     * 当前页码
     */
    currentPage?: number
    /**
     * 数据
     */
    data?: HomeworkPageItemDto[]
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
 * com.wotu.wilservice.eval.interfaces.dto.homework.HomeworkPageItemDto
 *
 * HomeworkPageItemDto
 */
export interface HomeworkPageItemDto {
    /**
     * 活动编码
     */
    activityCode?: string
    /**
     * 活动名称
     */
    activityName?: string
    /**
     * 班级编码
     */
    classCode?: string
    /**
     * 班级名称
     */
    className?: string
    /**
     * 课程编码
     */
    courseCode?: string
    /**
     * 课程名称
     */
    courseName?: string
    /**
     * 已评分数量
     */
    gradedCount?: number
    /**
     * 课后作业编码
     */
    homeworkCode?: string
    /**
     * 课后作业名称
     */
    homeworkName?: string
    /**
     * 待评分数量
     */
    pendingGradeCount?: number
    /**
     * 待提交数量
     */
    pendingSubmitCount?: number
    /**
     * 排课编码
     */
    scheduleCode?: string
    /**
     * 学习环节/阶段编码
     */
    stageCode?: string
    /**
     * 学习环节/阶段名称
     */
    stageName?: string
    /**
     * 学习步骤编码
     */
    stepCode?: string
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
