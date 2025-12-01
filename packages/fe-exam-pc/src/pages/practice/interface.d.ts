export interface RouteQuery {
    code?: string
    sourceType?: string
}

interface CustomContent {
    jobLevel?: string
    jobLevelCode?: number
    jobName?: string
    jobNameCode?: number
    jobType?: string
    jobTypeCode?: number
}

// 参与用户详情
export interface PersonItem {
    personCertNumber: string // 刷题人员证件号
    code: string // 人员code
    personName: string // 人员姓名
    personPhone: string // 人员手机号
    personType?: string // 人员类型
    username?: string // 人员账号名
    byUsername?: boolean // 是否通过账号名添加
}

export interface PersonListParams {
    pageNo: number
    pageSize: number
    practiceCode?: string
    personCertNumber?: string // 刷题人员证件号
    personName?: string // 人员姓名
    personPhone?: string // 人员手机号
    username?: string // 账号名
}

interface KnowledgePointInfoItem {
    knowledgePointName: string
    knowledgePointCode: string
    knowledgePointLevelCode: string
}

export interface SelectQuestionDto {
    commonJobCustomDtoList?: CustomContent[] // 按职业工种等级选择的集合
    knowledgePointInfoList?: KnowledgePointInfoItem[] // 按知识点分类选择的集合
    judgeCount?: number // 判断题题数
    multipleCount?: number // 多选题题数
    singleCount?: number // 单选题题数
    totalCount?: number // 总体数
    fixedCount?: number // 组合题
}

// 刷题选择详情数据
export interface PracticeSelectDto {
    jobs: CustomContent[]
    userCodes?: string[]
}

export interface PracticeListParams {
    pageNo: number
    pageSize: number
    organizationCode?: string // 机构code
    practiceStatus?: number // 刷题状态 0-未开始 1-已结束 2-练习中
    publishStatus?: number // 发布状态
    titleLike?: string // 刷题标题模糊查询
}

// 刷题详情
export interface PracticeListItem {
    code: string
    title: string // 刷题标题
    questionCount: number // 试题数量
    joinStatus?: number // 参与状态 0-不限 1-指定用户
    personDtoList: PersonItem[]
    publishStatus?: number // 发布状态
    shelvesStatus?: number // 0-下架 1-上架
    startTime?: number | null // 开始时间
    endTime?: number | null // 结束时间
    organizationCode?: string // 机构code
    status?: number // 刷题状态 0-未开始 1-已结束 2-练习中
    shareUrl?: string // 分享链接
    practiceSelectDto?: PracticeSelectDto // 刷题选择详情数据
    selectQuestionDto?: SelectQuestionDto
    sourceType?: number // 刷题来源
    sourceCode?: string // 刷题来源code
    questionType: number // 选题类型
}

export interface CreatePracticeParams {
    sid: string // 站点ID
    code?: string
    title?: string // 刷题标题
    organizationCode?: string // 机构code
    joinStatus?: number // 参与状态 0-不限 1-指定用户
    jobs?: CustomContent[] | null // 刷题选择详情数据
    knowledgePoints?: KnowledgePointInfoItem[]
    publishStatus?: number // 发布状态
    status?: number // 刷题状态 0-未开始 1-已结束 2-练习中
    startTime?: number | null // 开始时间
    endTime?: number | null // 结束时间
    belongType: number
    sourceType?: number // 刷题来源
    sourceCode?: string // 刷题来源code
    questionType?: number
}

export interface PracticeQuestionParams {
    jobs: CustomContent[]
    organizationCode?: string // 机构code
    subject: number
    belongType: number
    knowledgePointInfos: KnowledgePointInfoItem[]
}

// 分享刷题详情
export interface ShareDetail {
    content: string // 刷题内容
    organizationName: string // 机构名称
    startTime: number // 刷题开始时间
    title: string // 刷题标题
    questionCount: number // 共有多少道题目
}

// 资源方刷题
export interface MerchantPracticeItem {
    practiceCode: string
    title: string
    startTime: number
    endTime: number
}
