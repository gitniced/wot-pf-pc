export interface StatisticsData {
    title: string // 练习标题
    questionCount: number // 总题数
    joinStatus: number // 用户参与类型
    startTime: number // 开始时间
    endTime: number // 结束时间
    userCount: number // 应参加人数
    actualUserCount: number // 实际参加人数
    [key: string]: string | number
}

export interface PracticeQueryParams {
    pageNo: number
    pageSize: number
    practiceCode?: string // 练习Code
    name?: string // 姓名
    account?: string // 账号
    idcard?: string // 身份证
    mobile?: string // 手机号
}

export interface PracticeItem {
    name: string // 姓名
    account: string // 账号
    idcard: string // 身份证
    mobile: string // 手机号
    practicedCount: number // 已练习题数
    wheelCount: number // 已完成轮数
    firstWheelAccuracyScore: number // 首轮正确率
    topWheelAccuracyScore: number // 最高正确率
    startTime: number // 开始时间
    endTime: number // 结束时间
}

export interface KnowledgeCountData {
    knowledgePointCount: KnowledgeCountItem[]
    wrongKnowledgePointCount: KnowledgeCountItem[]
    questionCount?: number
}
export interface KnowledgeCountItem {
    knowledgePointTitle: string
    knowledgePointCode: string
    count: number
    percent: number
    [key: string]: string | number
}