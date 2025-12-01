export interface RecordListItem {
    examCode: string // 试卷code
    examTitle: string // 试卷名称
    submitSort: number // 试卷序号
    submitTime: number // 交卷时间
    teacherName: string // 阅卷人
    scoreSubmitTime: number // 成绩提交时间
}

export interface RecordListReq {
    pageNo: number
    pageSize: number,
}

export interface RecordDetail {
    taskCode?: string,
    examCode?: string
}


export interface routeQuery {
    examCode: string
}

export interface LocationParams {
    query: routeQuery
}


export interface IRouteParams {
    taskCode: string
}
