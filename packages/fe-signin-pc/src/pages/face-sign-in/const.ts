/** 签到类型 */
export enum SIGN_TYPE {
    /** 签到 */
    SIGN_IN = 1,
    /** 签退 */
    SIGN_OUT = 2,
}

/** （未）签到/签退 */
export enum UN_SIGN_TYPE {
    /** 未签到/签退 */
    UN_SIGN_IN = 0,
    /** 签到/签退 */
    SIGN_IN = 1,
    /**  4 补卡  */
    CARD_REPLACEMENT = 4,
}

/** 签到类型文案 */
export const SIGN_TYPE_TEXT = {
    [SIGN_TYPE.SIGN_IN]: '签到',
    [SIGN_TYPE.SIGN_OUT]: '签退',
}

/** 摄像头状态 */
export enum CAMERA_TYPE {
    /** 尝试开启 */
    WAIT,
    /** 开启 */
    OPEN,
    /** 关闭 */
    CLOSE,
}

/** 签到/退 时间状态 */
export enum SIGN_TIME_TYPE {
    /** 未到签到/退开始时间 */
    BEFORE = 1,
    /** 处于签到/退时间内 */
    BETWEEN = 2,
    /** 超过签到/退结束时间 */
    AFTER = 3,
}

/** 识别状态 */
export enum IDENTIFY_TYPE {
    /** 等待识别开始 */
    WAIT,
    /** 开始识别 */
    START,
    /** 成功 */
    SUCCESS,
    /** 失败 */
    ERROR,
}

export enum SIGN_AFTER_TYPE {
    /** 开始后 */
    afterStart = 1,
    /** 结束前 */
    beforeEnd = 2,
    /** 结束后 */
    AfterEnd = 3,
}

/** 签到类型文案 */
export const SIGN_AFTER_TYPE_TEXT = {
    [SIGN_AFTER_TYPE.afterStart]: '开始后',
    [SIGN_AFTER_TYPE.beforeEnd]: '结束前',
    [SIGN_AFTER_TYPE.AfterEnd]: '结束后',
}
