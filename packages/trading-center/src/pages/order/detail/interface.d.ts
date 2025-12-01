export interface detailType {
    agentCode: string
    agentName: string
    buyerType: string
    city: number
    cityName: string
    code: string
    contract: string
    contractOrder: boolean
    createdAt: number
    customerCode: string
    customerName: string
    goodsList: any[]
    invoicingStatus: number
    invoicingTime: number
    orderNo: string
    payTime: number
    payment: string
    province: number
    provinceName: string
    remark: string
    settleTargetCode: string
    settleTargetName: string
    sid: number
    sname: string
    status: number
    tagNameList: string[]
    totalAmount: number
    userCode: string
}
interface ContractBaseInfoDto {
    /** 区 */
    area?: number
    /** 市 */
    city?: number
    /**  */
    cityName?: string
    /** 编码 */
    code?: string
    /** 合同结束时间 */
    contractEnd?: number
    /** 合同编号 */
    contractNo?: string
    /** 合同签订时间 */
    contractStart?: number
    /** 合同tag */
    contractTags?: any[]
    /** 创建时间 */
    createdAt?: number
    /** 客户编码 */
    customerCode?: string
    /** 验收时间 */
    deliverTime?: number
    /** 甲方 */
    partyA?: string
    /** 甲方签字人 */
    partyASign?: string
    /** 乙方 */
    partyB?: string
    /** 乙方签字人 */
    partyBSign?: string
    /** 省 */
    province?: number
    /**  */
    provinceName?: string
    /** 销售负责人 */
    saleNames?: any[]
    /** 服务周期结束时间 */
    serviceEnd?: number
    /** 服务周期开始时间 */
    serviceStart?: number
    /** 结算标准 */
    settleStandard?: string
    /** 结算类型 */
    settleType?: number
    /** 分成比例 */
    sharePercent?: number
    /** 合同名称 */
    title?: string
    /** 合同类型 */
    type?: number
    /** 单价 */
    unitPrice?: number
}
interface ProductOrdersType {
    /** 商品订单唯一编码 */
    code: string
    /** 优惠价(暂时无用字段) */
    discountPrice: number
    /** 商品属性名称 */
    goodsAttributes?: string
    /** 商品类目名称 */
    goodsCategories?: string
    /** 商品编码 */
    goodsCode: string
    /** 商品图片 */
    goodsImage?: string
    /** 商品名称 */
    goodsName: string
    /** 是否存在售后单，存在则展示查看售后按钮 */
    hasRefunded?: boolean
    /** 订单编码 */
    orderCode?: string
    /** 实付单价 */
    preferentialPrice: number
    /** 商品原价 */
    price: number
    /** 购买数量 */
    quantity: number
    /** 退款状态 0可退款 1不可继续退款(有在进行中的退款) */
    refundStatus?: number
    /** 正在进行中的退款单 */
    refundingOrderCode?: string
    /** 剩余可退款金额 */
    remainRefundAmount?: number
    /** 剩余可退款数量 */
    remainRefundQuantity?: number
}
interface ReservedInfo {
    /** 支付数量，例如学员个数 */
    bizCount?: number
    /** 业务名称 */
    bizName?: string
    /** 结束日期 */
    endDate?: string
    /** 商品编码 */
    goodsCode?: string
    /** 项目名称 */
    itemName?: string
    /** 业务保留字段,用于关联交易中心订单:如报名记录编码、班级编码等 */
    reservedCode?: string
    /** 开始日期 */
    startDate?: string
}
interface OfflinePaymentType {
    /** 唯一编码 */
    code?: string
    /** 上传时间 */
    createdAt?: number
    /** 订单编码 */
    orderCode?: string
    /** 附件URL */
    paymentProof?: string
    /** 备注 */
    paymentRemark?: string
    /** 收款凭证url */
    receiptProof?: string
    /** 收款备注 */
    receiptRemark?: string
}

interface TransactionFlowType {
    /** 账务类型，1：订单支付，2：支付手续费，3：订单退款，4：退款手续费，5：清分至平台商户，6：清分至经营商户 */
    billType?: number
    /** 唯一编码 */
    code?: string
    /** 订单编码 */
    orderCode?: string
    /** 业务线订单ID */
    orderNo?: string
    /** 订单支付编码，支付码刷新时变化 */
    orderPayCode?: string
    /** 支付账户 */
    payAccount?: string
    /** 支付方式：支付宝 0：微信 1：银联 */
    payWay?: number
    /** 支付方式描述 */
    payWayName?: string
    /** 收款账户 */
    payee?: string
    /** 收款方名称 */
    payeeName?: string
    /** 支付方名称 */
    payerName?: string
    /** 退款单编码 */
    refundOrderCode?: string
    /** 结算单id */
    settlementNo?: string
    /** 站点id */
    sid?: number
    /** 交易状态，0失败，1成功 */
    status?: number
    /** 支付金额 */
    tradeAmount?: number
    /** TransactionFlowType */
    tradeNo?: string
    /** 支付时间 */
    tradeTime?: number
}
interface PaymentRecordType {
    /**  */
    delayProof?: string
    /**  */
    offlinePaymentDto?: OfflinePaymentType
    /**  */
    onlinePaymentDto?: TransactionFlowType
    /**  */
    payDeadline?: number
    /**  */
    remark?: string
}
/** 订单详情type */
export type OrderInfoType = {
    /** 是否自动关闭订单:0否,1是 */
    autoClose?: number
    /** 开户行 */
    bank?: string
    /** 银行账户 */
    bankAccount?: string
    /** 买家类型，1：个人，2：机构 */
    buyerType?: number
    /** 唯一编码 */
    code?: string
    /** 合同 */
    contract?: ContractBaseInfoDto
    /** 合同订单业务类型:1班级,2计划 */
    contractOrderType?: number
    /** 合同tag */
    contractTags?: any[]
    /** 创建时间，下单时间 */
    createdAt?: number
    /** 订单预计支付时间 */
    expectPayTime?: number
    /** 商品订单列表 */
    goodsOrderList?: ProductOrdersType[]
    /** 开票状态，0未开票，10开票中，1已开票 */
    invoicingStatus?: number
    /** 结算主体名称 */
    name?: string
    /** 订单编号 */
    orderNo?: string
    /** 实际支付-实付款 */
    payAmount?: number
    /** 订单支付状态：1未支付、2已延期、3已逾期、4待审核、5待上传凭证、6支付成功、7支付关闭 */
    payStatus?: number
    /** 支付时间 */
    payTime?: number
    /** 支付方式，0：支付宝，1：微信，2：线下支付 */
    payType?: number
    /** PaymentRecordType */
    payment?: PaymentRecordType
    /** 优惠金额 */
    preferential?: number
    /** 优惠名称：1大客户优惠，2阶梯优惠，3预付优惠，4特殊优惠，5奖励优惠 */
    preferentialType?: number
    /** 备注 */
    remark?: string
    /** 业务线信息 */
    reservedInfoList?: ReservedInfo
    /** 销售负责人 */
    saleNames?: any[]
    /** 结算主体编码 */
    settleTargetCode?: string
    /** 站点 */
    sid?: number
    /** 订单状态，1未支付、2支付待确认、3已支付、4已完成、5已关闭 */
    status?: number
    /** 总额，支付待确认、已支付、已完成、已关闭+支付成功（payStatus） 显示 实付款 */
    totalAmount?: number | string
    /** 用户编码 */
    userCode?: string
}
