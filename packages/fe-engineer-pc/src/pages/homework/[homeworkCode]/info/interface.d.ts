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
 * StudentHomeworkDto
 */
export interface StudentHomeworkDto {
    /**
     * 作业内容内容编码
     */
    contentCode?: string
    /**
     * 学生提交内容信息
     */
    contentInfo?: string
    /**
     * 编辑格式(1-在线，2-文件)
     */
    editFormat?: number
    /**
     * 文件格式(word-文档，excel-表格，mind-脑图)
     */
    fileFormat?: string
    /**
     * 作业文件名称
     */
    fileName?: string
    /**
     * 作业编号
     */
    homeworkCode?: string
    /**
     * 作业名称
     */
    homeworkName?: string
    /**
     * 学习目标
     */
    objectives?: string
    /**
     * 课程要求
     */
    requirements?: string
    /**
     * 作业得分
     */
    score?: number
    /**
     * 排序
     */
    sort?: number
    /**
     * 学生提交状态（0-未编辑，1-未提交，2-已提交，3-已评分）
     */
    submissionStatus?: number
    /**
     * 模版信息
     */
    templateInfo?: string
    /**
     * 更新时间
     */
    updatedAt?: string
    [property: string]: any
}

/**
 * 响应数据
 *
 * AssessmentProjectBaseInfoDto
 */
export interface AssessmentProjectBaseInfoDto {
    /**
     * 课程编号
     */
    courseCode?: string
    /**
     * 考核项目编号
     */
    projectCode?: string
    /**
     * 考核项目名称
     */
    projectName?: string
    /**
     * 学习环节编号
     */
    stageCode?: string
    /**
     * 学习环节名称
     */
    stageName?: string
    /**
     * 学习任务编号
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
