import type { BUTTON_ENUM } from './constants'

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
    ip: string
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
    loginLimit: number
}

export interface TipsParams {
    isAllStu: boolean
    examCode: string
    reminder: string
    stuCodeList: string[]
}

export interface DelayParams {
    isAllStu: boolean
    examCode: string
    delay: number
    stuCodeList: string[]
}
export interface RemarkParams {
    isAllStu: boolean
    examCode: string
    remark: string
    stuCodeList: string[]
}

export interface WindingParams {
    sid: number
    userCode: string
    account: string
    verifyCode: string
    stuCode: string
    examCode: string
    key: string
}

export type EnumButton = keyof typeof BUTTON_ENUM

export interface SendForcedSms {
    sid: number
    userCode: string
    account: string
    type: 0 | 1 | 5
    examCode: string
    key: string
}


export interface AddLoginTimesParams {
    /**
     * 考试code
     */
    examCode: null | string;
    /**
     * 学生codes
     */
    userCodes: any[] | null;
    [property: string]: any;
}
