import type { SIGN_AFTER_TYPE } from './const'
export interface TaskRule {
    code: string
    title: string
    nowTime: number
    sid: number
    inSignTime: number
    inSignOutTime: number
    rule: Rule
    startTime: number
    endTime: number
    signInStartTime: number
    signInEndTime: number
    signOutStartTime: number
    signOutEndTime: number
}

interface Rule {
    code: string
    sid: number
    distance: number
    signBefore: number
    signAfter: number
    signAfterType: SIGN_AFTER_TYPE
    signOutBefore: number
    signOutAfter: number
    checkFace: number
    signEnd: number
    signStart: number
    type: number
    createBy: string
    updateBy: string
    source: number
}

export interface TabCount {
    allCount: number
    signedCount: number
    unSignedCount: number
    taskCode: string
}

export interface TabCounts {
    key: string
    name: string
    length: number
}

/** 名单列表 */
export interface TaskSignTable {
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
