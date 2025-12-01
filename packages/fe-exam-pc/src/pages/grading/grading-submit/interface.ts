export interface SubmitItem {
    examCode: string // 考试Code
    examTitle: string // 考试名称
    submitSort: number // 试卷序号
    submitTime: number // 提交时间
    subjectiveScore: number // 主观题得分
    teacherName: string // 阅卷老师
    stuCode: string
}

export interface SubmitListReq {
    pageNo: number
    pageSize: number,
    taskCode?: string,
    examCode?: string
}


export interface IRouteParams {
    taskCode: string
}

export interface routeQuery {
    examCode: string
}

export interface LocationParams {
    query: routeQuery
}


export type submitReq = Pick<SubmitListReq,"taskCode" | "examCode">