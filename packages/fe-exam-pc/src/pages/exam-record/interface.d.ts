export interface InvigilationDetailParams {
    admissionTicketNumber: string
    certNumber: string
    examCode: string
    signState: number
    stuName: string
    stuState: number
    organizationCode: string
    pageNo: number
    pageSize: number
}

export interface StuItem {
    certNumber: string
    delayCount: number
    remark: string
    reminderCount: number
    seatNumber: number
    signState: number
    stuCode: string
    stuName: string
    stuState: number
    submitAt: number
}

export interface routeQuery {
    examCode: string
}

export interface LocationParams {
    query: routeQuery
}

export interface ExamDetail {
    address: string
    jobStr: string
    startTime: number
    endTime: number
    examState: number
    needSign: number
    forcedWinding: number
    title: number
}
