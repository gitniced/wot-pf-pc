const BaseImgUrl = 'https://static.zpimg.cn/public/fe-merchant-pc'

export const MarkImgUrl = `${BaseImgUrl}/mark.png`
export const MarkMiniImgUrl = `${BaseImgUrl}/mark_mini.png`
export const SuccessIcon = `${BaseImgUrl}/smile_succ.png`
export const ClockIcon = `${BaseImgUrl}/clock.png`
export const ArrowDownIcon = `${BaseImgUrl}/arrow_down.png`
export const LogoutIcon = `${BaseImgUrl}/logout.png`
export const LogoutWhiteIcon = `${BaseImgUrl}/logout_white.png`
export const NotEnrollImgUrl = `${BaseImgUrl}/not_enroll.png`
// 考试状态
export enum ExamStatus {
    FINISHED = 3,
}

export enum MessageType {
    REMINDER = 'reminder', // 提醒
    DELAY = 'delay', // 延时
    FORCE_WINDING = 'forcedWinding', // 监考老师强制收卷
}

// 自动交卷
export enum FORCE_SUBMIT {
    CUT_AUTO = 1,
}

// 考生交卷状态
export enum FORCED_WINDING_STATE {
    SELF, // 自己主动交卷
    TEEACHER, // 监考老师强制收卷
    CUT_SCREEN, // 切屏自动收卷
}
