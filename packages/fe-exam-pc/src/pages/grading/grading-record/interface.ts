
export interface TaskListItem {
    endTime: number // 考试结束时间
    examCode: string // 考试code
    examTitle: string // 考试名称
    gradingType: 'all' | 'questionType' | 'question' // 阅卷类型
    noReadCount: number // 待阅
    paperCount?: number // 试卷数
    projectTitle: string // 关联项目名称项
    projectType: number // 目类型
    randomPaperNumber?: number // 试卷随机数
    readCount: number // 已阅
    startTime: number // 开始时间
    stuCount?: number // 学生数
    taskCode: string // 任务code
}

export interface TaskListReq {
    pageNo: number
    pageSize: number
    projectTitle?: string
    projectType?: string
    startTime?: number
    endTime?: number
    state?: number,
    examTitle?: string
    organizationCode?: string,
}