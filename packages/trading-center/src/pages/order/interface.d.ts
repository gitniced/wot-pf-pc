/** 订单的状态 */
export enum STATUSENUM {
    /** 全部 前端自定义字段 调用接口判断移除 */
    ALL_STATUS = '0',

    /** 未支付 */
    UNPAID_STATUS = '1',
    /** 支付待确认 */
    CONFIRM_STATUS = '2',
    /** 已支付 */
    SUCCESS_STATUS = '3',
    /** 已完成 */
    DONE_STATUS = '4',
    /**  已关闭 */
    CLOSE_STATUS = '5',
    /**  、6部分支付  */
    PART_STATUS = '6',
}

/** 订单的支付状态 */
export enum PlayStatus {
    /** 未支付 */
    NO_PLAY = '1',

    /** 延期支付 */
    DELAY_STATUS = '2',

    /** 逾期 */
    OVERDUE_STATUS = '3',

    /** 待审核 */
    TODO_STATUS = '4',

    /** 上传收款凭证 */
    UPLOAD_STATUS = '5',

    /** 支付成功 */
    SUCCESS_STATUS = '6',

    /** 支付关闭 */
    CLOSE_STATUS = '7',
}

/** 订单的支付状态 */
export enum INVOICE_STATUS_MAP {
    /** 未支付 */
    NO_PLAY = '1',

    /** 延期支付 */
    DELAY_STATUS = '2',

    /** 逾期 */
    OVERDUE_STATUS = '3',

    /** 待审核 */
    TODO_STATUS = '4',

    /** 上传收款凭证 */
    UPLOAD_STATUS = '5',

    /** 支付成功 */
    SUCCESS_STATUS = '6',

    /** 支付关闭 */
    CLOSE_STATUS = '7',
}
