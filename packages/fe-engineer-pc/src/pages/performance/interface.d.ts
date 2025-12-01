/**
 * 课堂表现分页响应数据
 *
 * BasePaginationRspClassPerformancePageDto
 */
export interface BasePaginationRspClassPerformancePageDto {
    /**
     * 当前页码
     */
    currentPage?: number
    /**
     * 数据
     */
    data?: ClassPerformancePageDto[]
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
 * 课堂表现分页条目（按步骤）
 *
 * ClassPerformancePageDto
 */
export interface ClassPerformancePageDto {
    /**
     * 课堂表现编码
     */
    code?: string
    /**
     * 班级名称
     */
    className?: string
    /**
     * 课程名称
     */
    courseName?: string
    /**
     * 排课编号
     */
    scheduleCode?: string
    /**
     * 环节编号
     */
    stageCode?: string
    /**
     * 学习环节名称
     */
    stageName?: string
    /**
     * 是否已评分：1已评 0未评
     */
    status?: number
    /**
     * 步骤编号
     */
    stepCode?: string
    /**
     * 步骤名称
     */
    stepName?: string
    /**
     * 任务编号
     */
    taskCode?: string
    /**
     * 学习任务名称
     */
    taskName?: string
    [property: string]: any
}

/**
 * 班级学生信息
 * StudentSimpleDto
 */
export interface StudentSimpleDto {
    /**
     * 学生编码
     */
    code?: string
    /**
     * 手机号
     */
    mobile?: string
    /**
     * 学生姓名
     */
    name?: string
    /**
     * 用户编码
     */
    userCode?: string
    [property: string]: any
}
