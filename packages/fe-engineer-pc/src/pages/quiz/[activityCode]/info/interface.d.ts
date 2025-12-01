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

/**
 * 响应数据
 *
 * TeachStudentQuestionDto
 */
export interface TeachStudentQuestionDto {
    /**
     * 答案列表
     */
    answerList?: QuestionAnswerDto[]
    /**
     * 评论列表
     */
    commentList?: QuestionCorrectDto[]
    /**
     * 题目列表
     */
    questionList?: QuestionListElement[]
    [property: string]: any
}

/**
 * 题目答案
 *
 * QuestionAnswerDto
 */
export interface QuestionAnswerDto {
    /**
     * 题目编码
     */
    questionCode: string
    /**
     * 状态 0:未提交 1已提交 2正确 3错误
     */
    state?: number
    /**
     * 子题答案
     */
    subAnswer?: QuestionAnswerDto[]
    /**
     * 答案 有可能是List<String> 或是String
     */
    value: { [key: string]: any }
    [property: string]: any
}

/**
 * 批改问题
 *
 * QuestionCorrectDto
 */
export interface QuestionCorrectDto {
    /**
     * 评语
     */
    comment?: string
    /**
     * 题目编码
     */
    questionCode: string
    /**
     * 分数
     */
    score: number
    /**
     * 子题答案
     */
    subCorrect?: QuestionCorrectDto[]
    [property: string]: any
}

/**
 * 题目简单信息
 *
 * QuestionSimpleDto
 */
export interface QuestionListElement {
    /**
     * 解析
     */
    analysis?: string
    /**
     * 题型（10-课堂测验）
     */
    belongType: number
    /**
     * 题目编码
     */
    code?: string
    /**
     * 选项列表
     */
    options?: QuestionOptionSimpleDto[]
    /**
     * 父题编码
     */
    parentCode?: string
    /**
     * 序号
     */
    serialNumber: number
    /**
     * 子题
     */
    subQuestions?: SubQuestionElement[]
    /**
     * 题目/提干
     */
    title: string
    /**
     * 类型（10判断题、20单选题、30多选题、40填空题、50简答题、60组合题 70计算题、80论述题、90案例分析题）
     */
    type: number
    [property: string]: any
}

/**
 * QuestionOptionSimpleDto
 *
 * 题目选项简单信息
 */
export interface QuestionOptionSimpleDto {
    /**
     * 答案
     */
    answer?: string
    /**
     * 选项编码
     */
    code?: string
    /**
     * 是否答案
     */
    isAnswer?: boolean
    /**
     * 排序（限定为A~Z）
     */
    sort?: string
    [property: string]: any
}

/**
 * QuestionSimpleDto
 *
 * 题目简单信息
 */
export interface SubQuestionElement {
    /**
     * 解析
     */
    analysis?: string
    /**
     * 题型（10-课堂测验）
     */
    belongType: number
    /**
     * 题目编码
     */
    code?: string
    /**
     * 选项列表
     */
    options?: QuestionOptionSimpleDto[]
    /**
     * 父题编码
     */
    parentCode?: string
    /**
     * 序号
     */
    serialNumber: number
    /**
     * 子题
     */
    subQuestions?: SubQuestionElement[]
    /**
     * 题目/提干
     */
    title: string
    /**
     * 类型（10判断题、20单选题、30多选题、40填空题、50简答题、60组合题 70计算题、80论述题、90案例分析题）
     */
    type: number
    [property: string]: any
}
