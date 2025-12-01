import type { UN_SIGN_TYPE, SIGN_AFTER_TYPE } from '../face-sign-in/const'

export interface TaskSignParams {
    /** 用户真实姓名 */
    name?: string
    /** 页码，从1开始数，默认是1,示例值(1) */
    pageNo?: number
    /** 单页显示数量，默认是10,示例值(10)	 */
    pageSize?: number
    /** 签到状态 默认 0 未签到 1 已签到	 4补卡 */
    signStatus?: UN_SIGN_TYPE
    /** 签退状态 默认 0 未签到 1 已签到	 4补卡 */
    signOutStatus?: UN_SIGN_TYPE
}

export interface TabCount {
    allCount: number
    signedCount: number
    unSignedCount: number
    taskCode: string
}

export interface TaskRule {
    code: string
    endTime: number
    lat: string
    location: string
    lon: string
    rule: Rule
    sid: number
    startTime: number
    title: string
}

export interface Rule {
    checkFace: number
    code: string
    distance: number
    sid: number
    signAfter: number
    signAfterType: SIGN_AFTER_TYPE
    signBefore: number
    signEnd: number
    signOutAfter: number
    signOutBefore: number
    signStart: number
}

export interface TabCounts {
    key: string
    name: string
    length: number
}

/** 名单数据 */
export interface TaskSignTable {
    totalCount: number
    currentPage: number
    pageSize: number
    data: TaskSignItem[]
    pages: number
    isFirstPage: boolean
    isLastPage: boolean
    hasPreviousPage: boolean
    hasNextPage: boolean
}

/** 名单列表 */
export interface TaskSignItem {
    code: string
    sid: number
    taskCode: string
    userCode: string
    name: string
    signInImg: string
    signStatus: number
    ruleCode: string
    signInTime: number
    signOutTime: number
    signType: number
    createdAt: number
    createdBy: string
    signUserImg: string
    checkType: string
    signOutImg: string
    signOutStatus: number
}
