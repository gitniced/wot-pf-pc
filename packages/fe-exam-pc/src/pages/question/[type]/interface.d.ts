export interface CommonJobParams {
    sid?: number // 站点ID
    pageNo: number
    pageSize?: number
    idList?: number[] // 职业编码
    name?: string // 职业名称
    enableStatus?: number
}

//
export interface CommonPointParams {
    pageNo: number
    pageSize?: number
}

export interface KnowledgeParams {
    belongType: number // 来源 机构/资源方/站点
    skill?: number
    subject?: number
    sid?: number
    organizationCode?: string
}

export interface KnowledgeOption {
    value: string
    label: string
    levelCode: string
    children?: KnowledgeOption[]
}

export interface KnowledgeItem {
    belongType: number // 来源 机构/资源方/站点
    skill: number
    subject: number
    code: string
    level: number
    levelCode: string
    organizationCode: string
    sid: number
    sort: number
    title: string
    totalQuestion: number
    childList: KnowledgeItem[]
}

export interface RouteQuery {
    workName: string
    workNameCode: number
    workType: string
    workTypeCode: number
    workLevel: string
    workLevelCode: number
    code?: string
    isNewVersion?: string
}

interface OptionItem {
    code?: string
    answer?: string
    isAnswer: boolean
    questionCode?: string
    sort?: number
    title?: string
}

export interface AuthenticateItem {
    code: string
    name: string
    firstRangeCode: string
    firstRangeName: string
    pointCode: string
    pointName: string
    secondRangeCode: string
    secondRangeName: string
    thirdRangeCode: string
    thirdRangeName: string
}

export interface KnowledgePoint {
    code: string
    levelCode: string
    codeList: (string | number)[]
}

export interface CommonJob {
    jobName: string
    jobNameCode: number
    jobLevel?: string
    jobLevelCode?: number
    jobType?: string
    jobTypeCode?: number
}
interface CustomContent {
    commonJob?: CommonJob
    authenticatePoint?: AuthenticateItem
    knowledgePoint?: KnowledgePoint
    discrimination?: number
    recommendStatus?: number
    referStatus?: number
}
export interface QuestionListItem {
    analysis?: string // 解析
    code?: string
    customContent?: CustomContent
    level: number
    type: number
    optionList?: OptionItem[]
    title?: string
    childList?: QuestionListItem[]
    reviewStatus?: number
}

export interface QuestionListParams {
    pageNo: number
    pageSize: number
    belongType?: number // 国家/省级/资源方/机构
    skill?: number // 理论/技能
    subject?: number // 真题/模拟题
    organizationCode?: string // 机构code
    questionLevel?: number // 难易程度
    storageStartTime?: number | null // 入库开始时间
    storageEndTime?: number | null // 入库结束时间
    updateStartTime?: number | null // 更新开始时间
    updateEndTime?: number | null // 更新结束时间
    titleLike?: string // 题目/题干
    workName?: number // 职业
    workType?: number // 工种
    workLevel?: number // 等级
    workNameCode?: number // 职业
    workTypeCode?: number // 工种
    workLevelCode?: number // 等级
    knowledgePointCode?: string // 知识点Code
    pointCode?: string
    point?: number[]
}

export interface CreateOptionItem {
    code?: string // 唯一标识
    isAnswer: boolean // 是否是正确答案
    answer?: string // 答案
    title?: string // 选项
    questionCode?: string // 题目code
    sort?: string // 排序
}

// 新建试题
export interface CreateQuestionParams {
    belongType?: number // 国家/省级/资源方/机构
    skill?: number // 理论/技能
    subject?: number // 真题/模拟题
    organizationCode: string // 机构Code
    customContent: CustomContent
    type: number // 题目类型
    level: number // 题目等级
    title?: string // 题干
    optionList: OptionItem[] // 选项
    code?: string // 题目Code
    analysis?: string // 解析
    childList?: QuestionListItem[]
    parentCode?: string // 小题对应的组合题大题的code（不是组合题中的小题不用填）
}
