/** 报名状态 */
export const REGISTERED_STATUS = {
    /** 未报名 */
    NOT_REGISTERED: 0,
    /** 待审核 */
    PENDING_REVIEW: 1,
    /** 未缴费 */
    UNPAID: 2,
    /** 过期未缴费 */
    OVERDUE_UNPAID: 3,
    /** 报名成功 */
    SUCCESS: 4,
    /** 报名失败 */
    FAIL: 5,
    /** 已退费 */
    REFUNDED: 6,
    /** 已取消 */
    CANCEL: 7,
}

/** 活动状态 */
export const ACTIVITY_STATUS = {
    /** 未开始 */
    NOT_START: 1,
    /** 报名中 */
    REGISTERING: 2,
    /** 已结束  */
    END: 3,
}
