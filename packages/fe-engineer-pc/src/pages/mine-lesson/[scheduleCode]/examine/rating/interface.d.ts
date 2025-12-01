/**
 * 响应数据
 *
 * CourseClassInfoDto
 */
export interface CourseClassInfoDto {
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
    [property: string]: any
}

/**
 * 课程考核构成项
 *
 * CourseEvaluationDto
 */
export interface CourseEvaluationDto {
    /**
     * 考核项编号
     */
    code?: string
    /**
     * 课程编号
     */
    courseCode?: string
    /**
     * 考核细则
     */
    evaluatedRubric?: string
    /**
     * 考核项名称
     */
    name?: string
    /**
     * 是否完成评分
     */
    scored?: boolean
    /**
     * 任务编号（任务考核用）
     */
    taskCode?: string
    /**
     * 类型：1课堂表现 2课后作业 3任务考核 4终结性考核
     */
    type?: number
    /**
     * 配分权重
     */
    weight?: number
    [property: string]: any
}

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

/**
 * 响应数据
 *
 * FinalAssessmentByScheduleResDto
 */
export interface FinalAssessmentByScheduleResDto {
    /**
     * 终结性考核列表
     */
    finalAssessmentList?: StudentEvaDto[]
    /**
     * 排课编号
     */
    scheduleCode?: string
    /**
     * 状态:0-待评分，1-已评分，2-未导入，
     */
    status?: number
    [property: string]: any
}

/**
 * 终结性考核得分表格条目
 *
 * StudentEvaDto
 */
export interface StudentEvaDto {
    /**
     * 评语
     */
    comment?: string
    /**
     * 评价任务编号
     */
    evaluationTask?: string
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
