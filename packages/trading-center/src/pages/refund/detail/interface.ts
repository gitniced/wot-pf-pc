export type REFUND_DETAIL = {
    code: string //唯一编码
    payAccount: string //支付账户
    payerName: string //支付方名称
    paymentCode: string //支付单编码
    refundAmount: number //退款金额
    refundOrderCode: string //退款单编码
    refundTime: number //退款时间
    sid: number //站点id
    status: number //退款状态，0失败，1成功
}

export type ORDER_DETAIL = {
    amount: number
    code: string
    customerName: string
}

export type REFUND_INFO = {
    code: string //退款单id
    createdAt: number //创建时间
    invoicingStatus: number //开票类型0未开票1已开票
    orderCode: string //订单id
    payType: number //支付方式0线上支付1线下支付
    payTypeName: string //支付方式名称0线上支付1线下支付
    proofUrl: string //退款凭证URL
    refundAmount: number //应退金额
    refundDetailDto: REFUND_DETAIL //退款详情
    refundOrderOfOrderDto: ORDER_DETAIL //订单信息
    refundTypeName: string //退回方式名
    rejectReason: string //驳回原因
    settleTargetName: string //	结算对象名称
    status: number //退款单状态 0 待审核,1 退款中,2 已完成,3 申请失败
    statusName: string //状态名称
    orderNo: string //订单编号
    customerName: string //买家名称
    /** 订单金额 */
    totalAmount: string
    refundCount: string
    refundReason: string
    /** 商品信息 */
    goodsOrder: Record<string, any>
    auditTime: number
    updatedAt: number
    errorReason?: string
    account?: string
}
