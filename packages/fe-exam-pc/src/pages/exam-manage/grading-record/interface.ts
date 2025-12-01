export interface RecordListItem {
    stuCode: string
    stuExamCode: string
    paperCode: string // 试卷code
    paperTitle: string // 试卷名称
    stuName: string // 考生姓名
    certNumber: string // 证件号码
    submitSort: number // 考卷序号
    fullScore: number // 满分
    qualifiedScore: number // 合格分
    submitTime: number // 交卷时间
    objectiveScore: number // 客观题得分
    subjectiveScore: number // 主观题得分
    totalScore: number // 最终成绩
    teacherName: string // 阅卷老师
    isHideMsg?: boolean // 是否隐藏手机号和姓名
    isHideBtn?: boolean // 是否隐藏脱敏按钮
}

export interface RecordListReq {
    pageNo: number
    pageSize: number
    organizationCode?: string
    taskCode?: string
    state?: number // 状态
    certNumber?: string // 证件号码
    stuName?: string // 考生姓名
    teacherName?: string // 阅卷人
}

export interface IRouteParams {
    taskCode: string
}
