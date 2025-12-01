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

/**
 * 响应数据
 *
 * AssessmentProjectCriteriaDto
 */
export interface AssessmentProjectCriteriaDto {
    /**
     * 课程编号
     */
    courseCode?: string
    /**
     * 评价标准列表
     */
    criteriaList?: EvaluationCriteriaItemDto[]
    /**
     * 项目编号
     */
    projectCode?: string
    /**
     * 项目名称
     */
    projectName?: string
    /**
     * 任务编号
     */
    taskCode?: string
    /**
     * 任务名称
     */
    taskName?: string
    [property: string]: any
}

/**
 * 评价标准项
 *
 * EvaluationCriteriaItemDto
 */
export interface EvaluationCriteriaItemDto {
    /**
     * 指标编号
     */
    code?: string
    /**
     * 评价细则
     */
    evaluatedRubric?: string
    /**
     * 评价标准
     */
    evaluatorCriteria?: string
    /**
     * 配分
     */
    weight?: number
    [property: string]: any
}

/**
 * 考核项目学习成果DTO
 *
 * ProjectLearningOutcomeDto
 */
export interface ProjectLearningOutcomeDto {
    /**
     * 编辑/上传内容链接
     */
    contentUrl?: string
    /**
     * 编辑格式(1-在线，2-文件)
     */
    editFormat?: number
    /**
     * 编辑或上传状态(1-已编辑/上传，2-未编辑/上传)
     */
    editStatus?: number
    /**
     * 文件格式(word-文档，excel-表格，mind-脑图)
     */
    fileFormat?: string
    /**
     * 关联小组编码（仅团队成果）
     */
    groupCode?: string
    /**
     * 学习成果编号
     */
    outcomeCode?: string
    /**
     * 学习成果名称
     */
    outcomeName?: string
    /**
     * 排序
     */
    sort?: number
    /**
     * 模版信息
     */
    templateInfo?: string
    /**
     * 协作类型（1-个人，2-团队）
     */
    type?: number
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

/**
 * 响应数据
 *
 * ProjectScoreDetailsDto
 */
export interface ProjectScoreDetailsDto {
    /**
     * 评语（总体评价意见）
     */
    comment?: string
    /**
     * 各评价指标的得分明细列表
     */
    criterionScores?: CriterionScoreDto[]
    /**
     * 被评人用户编码
     */
    evaluatedCode?: string
    /**
     * 考核项目编码
     */
    projectCode?: string
    /**
     * 评价类型：1-自评，2-组内互评，3-组间互评，4-师评
     */
    type?: number
    [property: string]: any
}

/**
 * com.wotu.wilservice.eval.interfaces.dto.CriterionScoreDto
 *
 * CriterionScoreDto
 */
export interface CriterionScoreDto {
    /**
     * 评价指标编码
     */
    criterionCode?: string
    /**
     * 指标得分
     */
    score?: number
    /**
     * 指标配分权重（
     */
    weight?: number
    [property: string]: any
}
