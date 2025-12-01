export type TABLE_ITEM = {
    code: string
    createdAt: number
    invoicingStatus: number
    orderCode: string
    payType: number
    payTypeName: string
    proofUrl: string
    refundAmount: number
    status: string
    statusName: string
    canApplyRedInvoice: boolean
    orderNo: string
}

export type FormDataType = {
    code?: string
    orderNo?: string
    status?: string
}

export enum INVOICING_STATUS {
    // 未开票
    NOT_INVOICE = 0,
    // 已开票
    INVOICED = 1,
}

export enum REFUND_ORDER_STATUS {
    /** 待审核 */
    REVIEWED = 0,
    /** 退款中 */
    AFTER_SALE = 1,
    /** 完成 */
    SUCCESS = 2,
    /** 申请失败 */
    FAIL = 3,
}

/**
 * 退款单状态枚举
 */
export const pointStatusMap: Record<
    string,
    { status: 'warning' | 'success' | 'error' | 'processing'; text: string }
> = {
    [REFUND_ORDER_STATUS.REVIEWED]: {
        status: 'warning',
        text: '待审核',
    },
    [REFUND_ORDER_STATUS.AFTER_SALE]: {
        status: 'processing',
        text: '退款中',
    },
    [REFUND_ORDER_STATUS.SUCCESS]: {
        status: 'success',
        text: '已完成',
    },
    [REFUND_ORDER_STATUS.FAIL]: {
        status: 'error',
        text: '申请失败',
    },
}
