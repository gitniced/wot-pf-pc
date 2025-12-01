export enum STEP_ENUM {
    FIRST_STEP = '0',
    SECOND_STEP = '1',
    THIRD_STEP = '2',
}

/**
 * 退款单类型枚举
 */
export enum REFUND_STATUS {
    /** 待审核  */
    WAIT_REFUND = 0,
    /** 退款中 */
    REFUNDING,
    /** 已完成 */
    REFUNDED,
    /** 申请失败 */
    REFUND_REJECT,
}

/** 退款进度的步骤条 */
export enum Step_Status {
    /** 第二步 */
    Two = 1,
    /** 第三步 */
    Three = 2,
    /** 第四步 */
    Four = 3,
}
