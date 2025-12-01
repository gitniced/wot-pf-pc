/**
 * 响应数据
 *
 * TaskAssessmentStudentsResDto
 */
export interface TaskAssessmentStudentsResDto {
    /**
     * 已评分数量
     */
    gradedCount?: number
    /**
     * 待评分数量
     */
    pendingGradeCount?: number
    /**
     * 待提交数量
     */
    pendingSubmitCount?: number
    /**
     * 学生列表
     */
    students?: StudentEvaDto[]
    [property: string]: any
}

/**
 * StudentPerformanceDto
 *
 * StudentEvaDto
 */
export interface StudentEvaDto {
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

/**
 * 响应数据
 *
 * HomeworkBaseInfoDto
 */
export interface HomeworkBaseInfoDto {
    /**
     * 学习活动
     */
    activityCode?: string
    activityName?: string
    /**
     * 作业
     */
    homeworkCode?: string
    homeworkName?: string
    /**
     * 学习环节
     */
    stageCode?: string
    stageName?: string
    /**
     * 学习步骤
     */
    stepCode?: string
    stepName?: string
    /**
     * 学习任务
     */
    taskCode?: string
    taskName?: string
    [property: string]: any
}

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
