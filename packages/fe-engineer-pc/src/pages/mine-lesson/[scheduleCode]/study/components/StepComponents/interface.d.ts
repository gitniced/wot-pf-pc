import type { PersonCollaboration, TeamCollaboration } from './const'

/**
 * 活动基本详情DTO
 *
 * LearningActivityDto
 */
export interface LearningActivityDto {
    /**
     * 活动编号
     */
    code?: string
    /**
     * 知识点
     */
    knowledgePoints?: KnowledgePointDto[]
    /**
     * 活动名称
     */
    name?: string
    /**
     * 排序
     */
    sort?: number
    /**
     * 步骤编号
     */
    stepCode?: string
    /**
     * 学生活动内容
     */
    studentContent?: string
    /**
     * 教师活动内容
     */
    teacherContent?: string
    /**
     * 协作类型（1-个人，2-团队）
     */
    type?: number
    [property: string]: any
}

/**
 * 知识点数据传输对象
 *
 * KnowledgePointDto
 */
export interface KnowledgePointDto {
    /**
     * 知识点编号
     */
    knowledgePointCode?: string
    /**
     * 知识点描述
     */
    knowledgePointDescription?: string
    /**
     * 知识点名称
     */
    knowledgePointName?: string
    [property: string]: any
}

/**
 * 学习成果DTO
 *
 * OutcomeItemDto
 */
export interface OutcomeItemDto {
    /**
     * 成果编号
     */
    code?: string
    /**
     * 编辑/上传内容链接
     */
    contentUrl?: string
    /**
     * 编辑人编码
     */
    editCode?: string
    /**
     * 编辑格式(1-在线，2-文件)
     */
    editFormat?: number
    /**
     * 编辑人姓名
     */
    editName?: string
    /**
     * 编辑或上传状态(1-已，2-未)
     */
    editStatus?: number
    /**
     * 编辑时间
     */
    editTime?: string
    /**
     * 文件格式(word-文档，excel-表格，mind-脑图)
     */
    fileFormat?: string
    /**
     * 关联小组编码（仅团队成果）
     */
    groupCode?: string
    /**
     * 成果名称
     */
    name?: string
    /**
     * 排序
     */
    sort?: number
    /**
     * 模版信息(url或文件id)
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
 * ActivitySubmissionStatusDto
 */
export interface ActivitySubmissionStatusDto {
    /**
     * 课后作业提交状态Map，key为作业编码，value为是否已提交
     */
    homeworkSubmissionStatus?: MapBoolean
    /**
     * 学生是否为团队组长
     */
    isTeamLeader?: boolean
    /**
     * 学习成果是否已提交
     */
    outcomeSubmitted?: boolean
    /**
     * 课堂测验是否已提交
     */
    quizSubmitted?: boolean
    [property: string]: any
}

/**
 * 课后作业提交状态Map，key为作业编码，value为是否已提交
 *
 * MapBoolean
 */
export interface MapBoolean {
    key?: boolean
    [property: string]: any
}

/**
 * 学生课后作业DTO
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

/** 协作类型 */
export type CollaborationType = typeof PersonCollaboration | typeof TeamCollaboration

/**
 * 响应数据
 *
 * ActivityClassStatusStatisticsDto
 */
export interface ActivityClassStatusStatisticsDto {
    /**
     * 课堂表现状态
     */
    classPerformanceStatus?: boolean
    /**
     * 课后作业状态列表（单个作业维度）
     */
    homeworkStats?: HomeworkStatusStatisticsDto[]
    /**
     * 学习成果-待提交人数
     */
    outcomePendingCount?: number
    /**
     * 学习成果-已提交人数
     */
    outcomeSubmittedCount?: number
    /**
     * 协作类型
     */
    type?: number
    [property: string]: any
}

/**
 * 课后作业状态统计（单作业维度）
 *
 * HomeworkStatusStatisticsDto
 */
export interface HomeworkStatusStatisticsDto {
    /**
     * 已评分人数
     */
    gradedCount?: number
    /**
     * 作业编码
     */
    homeworkCode?: string
    /**
     * 作业名称
     */
    homeworkName?: string
    /**
     * 未提交人数
     */
    pendingCount?: number
    /**
     * 已提交人数
     */
    submittedCount?: number
    [property: string]: any
}

/**
 * 响应数据
 *
 * MapListLearningResourceSimpleDto
 */
export interface MapListLearningResourceSimpleDto {
    key?: Key[]
    [property: string]: any
}

/**
 * key
 */
export interface Key {
    /**
     * 资源编码
     */
    code?: string
    /**
     * 资源内容
     */
    content: string
    /**
     * 资源格式（word：文档 excel：表格 mind：脑图 drawing：图纸 attachment：附件 demand：点播课 device：设备）
     */
    fileFormat: string
    /**
     * 资源名称
     */
    name: string
    /**
     * 资源库编码
     */
    resourceLibraryCode?: string
    /**
     * 序号
     */
    serialNumber: number
    /**
     * 资源类型（1公共/2 个人/3 活动）
     */
    type?: number
    /**
     * 资源类型
     */
    fileType?: string
    /**
     * 资源大小MB
     */
    fileSize?: number
    /**
     * 视频时长
     */
    size?: string
    [property: string]: any
}

/**
 * 响应数据
 *
 * ResourceLibraryDetailDto
 */
export interface ResourceLibraryDetailDto {
    /**
     * code
     */
    code?: string
    /**
     * 内容
     */
    content?: string
    /**
     * 格式
     */
    format?: string
    /**
     * 资源名字
     */
    name?: string
    /**
     * 类型 1公共 2个人
     */
    type?: number
    [property: string]: any
}

/** 学习资源列表 */
export interface ResourceListDto {
    key: string
    value: string
    list: Key[]
}

export interface AnswerItem {
    value: string | string[]
    code: string
    subQuestionList?: AnswerItem[]
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
