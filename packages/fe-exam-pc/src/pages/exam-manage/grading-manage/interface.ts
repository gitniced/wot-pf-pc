export interface GradingListItem {
    examCode: string // 试卷Code
    taskCode: string // 阅卷任务Code
    examTitle: string // 考试名称
    startTime: number // 考试开始时间
    endTime: number // 考试结束时间
    projectTitle: string // 关联项目
    projectType: number // 项目类型
    markingTeacherCount: number // 阅卷老师数
    stuCount: number // 考生数
    paperCount: number // 试卷数
    randomPaperNumber: number // 随机数
    gradingType: 'all' | 'questionType' | 'question' // 阅卷方式
    submitPaperCount?: number // 已交卷数
    qualifiedCount?: number // 合格人数
    unQualifiedCount?: number // 不合格人数
}

export interface GradingReq {
    pageNo: number
    pageSize: number
    organizationCode?: string // 机构Code
    title?: string // 考试名称
    startTime?: number | null // 考试开时间
    endTime?: number | null // 考试结束时间
    projectTitle?: string // 关联项目
    projectType?: number // 项目类型
    state?: number // 考试状态
}
