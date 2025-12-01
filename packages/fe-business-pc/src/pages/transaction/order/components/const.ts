/**
 * 退款单的状态
 */
export enum REFUND_STATUS {
    examine = 0,
    padding = 1,
    success = 2,
    reject = 3,
}

/**
 * 退款单对应的状态文字枚举
 */
export const refundText: Record<number, string> = {
    [REFUND_STATUS.examine]: '待审核',
    [REFUND_STATUS.padding]: '售后中',
    [REFUND_STATUS.success]: '已完成',
    [REFUND_STATUS.reject]: '申请失败',
}

/**
 * 支付类型的枚举
 */
export enum PLAY_STATUS {
    wx = 1,
    offline = 2,
    play = 0,
}

/**
 * 支付状态文字枚举
 */
export const playStatusText: Record<number, string> = {
    [PLAY_STATUS.wx]: '微信支付',
    [PLAY_STATUS.offline]: '线下支付',
    [PLAY_STATUS.play]: '支付宝支付',
}

/**
 * 订单状态的枚举
 */
export enum ORDER_STATUS {
    noPlay = 1,
    padding = 2,
    play = 3,
    success = 4,
    close = 5,
}

/**
 * 订单状态的支付文字
 */
export const orderStatusText: Record<number, string> = {
    [ORDER_STATUS.noPlay]: '未支付',
    [ORDER_STATUS.padding]: '支付待确认',
    [ORDER_STATUS.play]: '已支付',
    [ORDER_STATUS.success]: '已完成',
    [ORDER_STATUS.close]: '已关闭',
}

/**
 * 订单状态 对应的微标的文字
 */
export const orderStatusPoint: Record<
    string,
    'warning' | 'error' | 'success' | 'default' | 'processing' | undefined
> = {
    [ORDER_STATUS.noPlay]: 'warning',
    [ORDER_STATUS.padding]: 'processing',
    [ORDER_STATUS.play]: 'success',
    [ORDER_STATUS.success]: 'success',
    [ORDER_STATUS.close]: 'default',
}
