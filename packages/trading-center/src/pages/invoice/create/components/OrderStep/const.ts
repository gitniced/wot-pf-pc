export enum ORDER_STATUS_ENUM {
    /** 未支付 */
    unpaid = 1,
    /** 支付待确认 */
    payConfirm = 2,
    /** 已支付  */
    paid = 3,
    /** 已完成 */
    completed = 4,
    /** 已关闭 */
    closed = 5,
    /**  6部分支付  */
    partialPayment = 6,
}

export const ORDER_STATUS_MAP: Record<string, string> = {
    [ORDER_STATUS_ENUM.unpaid]: '未支付',
    [ORDER_STATUS_ENUM.payConfirm]: '支付待确认',
    [ORDER_STATUS_ENUM.paid]: '已支付',
    [ORDER_STATUS_ENUM.completed]: '已完成',
    [ORDER_STATUS_ENUM.closed]: '已关闭',
    [ORDER_STATUS_ENUM.partialPayment]: '部分支付',
}
