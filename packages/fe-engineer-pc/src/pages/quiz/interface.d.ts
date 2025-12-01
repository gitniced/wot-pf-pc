/**
 * 响应数据
 *
 * TeahcerClassQuestionPageResDto
 */
export interface TeahcerClassQuestionPageResDto {
    /**
     * 分页信息
     */
    page?: BasePaginationRspClassQuestionPageResDtoItem
    /**
     * 待批改数量
     */
    toCorrect?: number
    [property: string]: any
}

/**
 * 分页信息
 *
 * BasePaginationRspClassQuestionPageResDtoItem
 */
export interface BasePaginationRspClassQuestionPageResDtoItem {
    /**
     * 当前页码
     */
    currentPage?: number
    /**
     * 数据
     */
    data?: ClassQuestionPageResDtoItem[]
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
 * 课堂测验分页返回项
 *
 * ClassQuestionPageResDtoItem
 */
export interface ClassQuestionPageResDtoItem {
    /**
     * 活动code
     */
    activityCode?: string
    /**
     * 活动名称
     */
    activityName?: string
    /**
     * 班级code
     */
    classCode?: string
    /**
     * 班级名称
     */
    className?: string
    /**
     * 课程code
     */
    courseCode?: string
    /**
     * 课程名称
     */
    courseName?: string
    /**
     * 排课code
     */
    scheduleCode?: string
    /**
     * 学习环节名称
     */
    stageName?: string
    /**
     * 状态 1无需批改 2全部批改 3部分批改 4未批改
     */
    status?: number
    /**
     * 步骤名称
     */
    stepName?: string
    /**
     * 学习任务名称
     */
    taskName?: string
    /**
     * 待批改
     */
    toCorrect?: number
    /**
     * 待提交
     */
    toSubmit?: number
    [property: string]: any
}
