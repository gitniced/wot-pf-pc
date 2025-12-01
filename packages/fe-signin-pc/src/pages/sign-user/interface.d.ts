import type { SIGN_AFTER_TYPE } from '../face-sign-in/const'

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
export interface SignTypeTabItem {
    key: string
    tab: string
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
    type: number
}

export interface TabCounts {
    key: string
    name: string
    length: number
}

export interface TableData {
    /**证件号 */
    certificate: string
    /**证件类型，1身份证，2护照，3其他 */
    certificateType: number
    /**打卡方式1 手动 2 自动  4补卡 */
    checkType: number
    /** 签到人脸识别时间*/
    inFaceIdentifyAt: number
    /** 签到人脸识别状态*/
    inFacePass: number
    /** 签到人脸识别备注*/
    inFaceRemark: string
    /**手机号 */
    mobile: string
    /**用户名 */
    name: string
    /** 签退人脸识别时间*/
    outFaceIdentifyAt: number
    /** 签退人脸识别状态*/
    outFacePass: number
    /** 签退人脸识别备注*/
    outFaceRemark: string
    /**签退状态 默认 0 未签退 1 已签退 2外勤 */
    signOutStatus: number
    /**签到照片 */
    signImage: string
    /**签到位置 */
    signLocation: string
    /**签到备注 */
    signRemark: string
    /**签到状态 默认 0 未签到 1 已签到 2外勤 */
    signStatus: number
    /**签到时间 */
    signTime: number
    /**任务code */
    taskCode: string
    /**类型 1签到 2签退 */
    type: number
    /**用户code */
    userCode: string
    /**  脱敏手机号  */
    sensitiveMobile: number
}
