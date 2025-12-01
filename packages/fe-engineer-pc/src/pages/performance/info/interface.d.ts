/**
 * 响应数据
 *
 * ClassPerformanceBaseInfoDto
 */
export interface ClassPerformanceBaseInfoDto {
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
     * 排课编号
     */
    scheduleCode?: string
    /**
     * 学习环节编码
     */
    stageCode?: string
    /**
     * 学习环节名称
     */
    stageName?: string
    /**
     * 步骤编号
     */
    stepCode?: string
    /**
     * 步骤名称
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

/**
 * 响应数据
 *
 * ClassPerformanceByScheduleResDto
 */
export interface ClassPerformanceByScheduleResDto {
    /**
     * 班级编码
     */
    classCode?: string
    /**
     * 课程编码
     */
    courseCode?: string
    /**
     * 排课编号
     */
    scheduleCode?: string
    /**
     * 学生列表
     */
    students?: StudentPerformanceDto[]
    [property: string]: any
}

/**
 * StudentPerformanceDto
 */
export interface StudentPerformanceDto {
    /**
     * 评语
     */
    comment?: string
    /**
     * 手机号
     */
    mobile?: string
    /**
     * 学生姓名
     */
    name?: string
    /**
     * 得分
     */
    score?: number
    /**
     * 学生编码
     */
    studentCode?: string
    /**
     * 用户编码
     */
    userCode?: string
    [property: string]: any
}
