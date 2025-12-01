
export interface IPaperDetail {
    // 来源 机构 ｜ 老师
    source?: 'organization' | 'teacher'
    gradingType: 'all' | 'questionType' | 'question',
    examTitle: string
    paperTitle: string
    stuName?: string // 学员名称
    submitSort?: number // 考卷序号
    isFinish?: boolean
}