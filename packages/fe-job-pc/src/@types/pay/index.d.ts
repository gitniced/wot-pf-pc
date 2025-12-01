
/**
 * 如果遇到bug，您可以钉钉搜索封东其或者给 fengdongqi@hzwotu.com 邮箱发邮件
 * 欢迎大家提 issue 或者 PR。
 * @title 沃土支付服务
 * @description 沃土支付服务是一个 Spring Boot项目
 * @version v1.0
 **/


/**
 * requestUrl /pay/backend/audit_offline
 * method post
 */
export interface AuditOfflineUsingPOSTRequest {
  
  /** 订单唯一编码 */
  orderCode?: string
  /** 驳回原因 */
  reason?: string
  /** 审核状态：2通过，4驳回 */
  status?: number
}

/**
 * requestUrl /pay/backend/audit_offline
 * method post
 */
export interface AuditOfflineUsingPOSTResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /pay/backend/close_pay_order
 * method post
 */
export interface ClosePayOrderUsingPOSTResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /pay/backend/delay_payment
 * method post
 */
export interface DelayPaymentUsingPOSTRequest {
  
  /** 延期凭证链接 */
  delayProof?: string
  /** 订单编码 */
  orderCode?: string
  /** 预计支付时间 */
  payDeadline?: number
  /** 备注信息 */
  remark?: string
}

/**
 * requestUrl /pay/backend/delay_payment
 * method post
 */
export interface DelayPaymentUsingPOSTResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 支付流水 {
  
  /** 账务类型，1：订单支付，2：订单退款，3：清分至平台商户，4：清分至经营商户 */
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
  /** 支付方式，0支付宝，1微信，2银联 */
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
  /** 手续费 */
  serviceCharge?: number
  /** 结算单id */
  settlementNo?: string
  /** 站点id */
  sid?: number
  /** 站点名称 */
  siteName?: string
  /** 站点简称 */
  siteShortName?: string
  /** 交易状态，0失败，1成功 */
  status?: number
  /** 交易金额 */
  tradeAmount?: number
  /** 交易流水 */
  tradeNo?: string
  /** 交易时间 */
  tradeTime?: number
}

/**
 * requestUrl /pay/backend/detail/{code}
 * method get
 */
export interface DetailUsingGETResponse {
  
  /** 响应数据 */
  data?: 支付流水
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 线下支付响应体 {
  
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

/**
 * requestUrl /pay/backend/detail_offline
 * method get
 */
export interface DetailOfflineUsingGETResponse {
  
  /** 响应数据 */
  data?: 线下支付响应体
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRsp支付流水 {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: 支付流水
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

/**
 * requestUrl /pay/backend/page
 * method post
 */
export interface PageUsingPOSTRequest {
  
  /** 账务类型，1：订单支付，2：订单退款，3：清分至平台商户，4：清分至经营商户 */
  billType?: number
  /** 流水ID */
  code?: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 订单编码 */
  orderNo?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 支付账户 */
  payAccount?: string
  /** 收款账户 */
  payee?: string
  /** 收款方名称 */
  payeeName?: string
  /** 支付方名称 */
  payerName?: string
  /** 站点id */
  sid?: number
  /** 支付金额结束 */
  tradeAmountEnd?: number
  /** 支付金额起始 */
  tradeAmountStart?: number
  /** 支付时间结束 */
  tradeTimeEnd?: number
  /** 支付时间起始 */
  tradeTimeStart?: number
}

/**
 * requestUrl /pay/backend/page
 * method post
 */
export interface PageUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRsp支付流水
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /pay/backend/receipt_proof
 * method post
 */
export interface ReceiptProofUsingPOSTRequest {
  
  /** 订单编码 */
  orderCode: string
  /** 凭据链接 */
  proof: string
  /**  */
  remark?: string
}

/**
 * requestUrl /pay/backend/receipt_proof
 * method post
 */
export interface ReceiptProofUsingPOSTResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /pay/backend/sync_delay_payment
 * method post
 */
export interface SyncDelayPaymentUsingPOSTRequest {
  
  /** 延期凭证链接 */
  delayProof?: string
  /** 订单编码 */
  orderCode?: string
  /** 预计支付时间 */
  payDeadline?: number
  /** 备注信息 */
  remark?: string
}

/**
 * requestUrl /pay/backend/sync_delay_payment
 * method post
 */
export interface SyncDelayPaymentUsingPOSTResponse {
  
  /** 响应数据 */
  data?: string
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /pay/backend/sync_offline_payment
 * method post
 */
export interface SyncOfflinePaymentUsingPOSTRequest {
  
  /** 订单编码 */
  orderCode?: string
  /** 付款凭据链接 */
  paymentProof?: string
  /** 付款备注信息 */
  paymentRemark?: string
  /** 驳回原因 */
  reason?: string
  /** 收款凭据链接 */
  receiptProof?: string
  /** 收款备注信息 */
  receiptRemark?: string
  /** 线下支付审核状态：1待审核、2待上传凭证、3通过、4驳回 */
  status?: number
  /** 用户编码 */
  userCode?: string
}

/**
 * requestUrl /pay/backend/sync_offline_payment
 * method post
 */
export interface SyncOfflinePaymentUsingPOSTResponse {
  
  /** 响应数据 */
  data?: string
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /pay/backend/sync_online_payment
 * method post
 */
export interface SyncOnlinePaymentUsingPOSTRequest {
  
  /** 账务类型，1：订单支付，2：订单退款，3：清分至平台商户，4：清分至经营商户 */
  billType?: number
  /** 订单编码 */
  orderCode?: string
  /** 订单编号 */
  orderNo?: string
  /** 订单支付编码(30字符)，支付码刷新时变化，历史数据没有可以随便造，唯一即可 */
  orderPayCode?: string
  /** 支付账户（50字符），历史数据没有可以随便造 */
  payAccount?: string
  /** 支付方式：0支付宝、1微信、2支付宝(h5) */
  payWay?: number
  /** 收款账户，历史数据没有可以随便造 */
  payee?: string
  /** 收款方名称，历史数据没有可以随便造 */
  payeeName?: string
  /** 支付方名称（120字符），历史数据没有可以随便造 */
  payerName?: string
  /** 客户所在省份编号，跟随订单 */
  province?: number
  /** 退款单编码，退款流水则需要填写，退款单编码 */
  refundOrderCode?: string
  /** 手续费 */
  serviceCharge?: number
  /** 结算单id，清分结算单编码，billType为5或6 */
  settlementNo?: string
  /** 站点id */
  sid?: number
  /** 交易状态，0失败，1成功 */
  status?: number
  /** 交易金额，跟随订单支付金额 */
  tradeAmount?: number
  /** 交易编号，历史数据没有可以随便造，唯一即可 */
  tradeNo?: string
  /** 交易时间，订单支付时间 */
  tradeTime?: number
}

/**
 * requestUrl /pay/backend/sync_online_payment
 * method post
 */
export interface SyncOnlinePaymentUsingPOSTResponse {
  
  /** 响应数据 */
  data?: string
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /pay/backend/update_receipt_proof
 * method post
 */
export interface UpdateReceiptProofUsingPOSTRequest {
  
  /** 订单编码 */
  orderCode: string
  /** 凭据链接 */
  proof: string
  /**  */
  remark?: string
}

/**
 * requestUrl /pay/backend/update_receipt_proof
 * method post
 */
export interface UpdateReceiptProofUsingPOSTResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 支付记录 {
  
  /**  */
  delayProof?: string
  /**  */
  offlinePaymentDto?: 线下支付响应体
  /**  */
  onlinePaymentDto?: 支付流水
  /**  */
  payDeadline?: number
  /**  */
  remark?: string
}

/**
 * requestUrl /pay/front/detail/order/v2/{orderCode}
 * method get
 */
export interface DetailByOrderV2UsingGETResponse {
  
  /** 响应数据 */
  data?: 支付记录
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /pay/front/detail/order/{orderCode}
 * method get
 */
export interface DetailByOrderUsingGETResponse {
  
  /** 响应数据 */
  data?: 支付流水
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /pay/front/detail/order_codes
 * method post
 */
export interface DetailByOrderCodesUsingPOSTRequest {
  
  /**  */
  orderCodes?: any[]
}

/**
 * requestUrl /pay/front/detail/order_codes
 * method post
 */
export interface DetailByOrderCodesUsingPOSTResponse {
  
  /** 响应数据 */
  data?: 支付流水
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface H5PayRespDto {
  
  /** 过期时间 */
  expiredTime?: number
  /** 订单编码 */
  orderCode?: string
  /** 订单编号 */
  orderNo?: string
  /** 支付金额 */
  payAmount?: number
  /** Native二维码 */
  qrCode?: string
}

/**
 * requestUrl /pay/front/h5_pay
 * method post
 */
export interface H5PayUsingPOSTRequest {
  
  /** 订单号 */
  orderCode: string
}

/**
 * requestUrl /pay/front/h5_pay
 * method post
 */
export interface H5PayUsingPOSTResponse {
  
  /** 响应数据 */
  data?: H5PayRespDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 支付结果响应参数 {
  
  /** 返回内容 */
  bizContent?: BizContent
  /** 编码方式,固定为UTF-8 */
  encoding?: string
  /** 返回码,错误信息 */
  errCode?: string
  /** 招行返回的业务错误码，成功为SUCCESS，失败为FAIL，若此时errCode为SYSTERM_ERROR则表示本次请求处理异常，并非交易结果是失败状态，需要商户再次发起查询确认 */
  respCode?: string
  /** 返回码,应答信息 */
  respMsg?: string
  /** 返回码,SUCCESS/FAIL，此字段是通信标识，非交易标识，交易是否成功需要查看respCode来判断。SUCCESS表示商户上送的报文符合规范，FAIL表示报文内的字段不符合规范，包括长度超长、非法字符、签名错误等 */
  returnCode?: string
  /** 签名 */
  sign?: string
  /** 签名方法,02：SM2 */
  signMethod?: string
  /** 版本号,固定为0.0.1 */
  version?: string
}

interface BizContent {
  
  /** 支付宝支付的交易返回，如：koh***@sandbox.com */
  buyerLogonId?: string
  /** 平台订单号 */
  cmbOrderId: string
  /** 银联优惠信息 */
  couponInfo?: string
  /** 交易币种,默认156，目前只支持人民币（156） */
  currencyCode: string
  /** 优惠金额,单位为分 */
  dscAmt: string
  /** 第三方系统返回的交易完成日期，此日期仅在交易成功是返回，不保证是实际清算日期，格式为yyyyMMdd */
  endDate?: string
  /** 第三方系统返回的交易完成时间，此时间仅在交易成功是返回，格式为HHmmss支付宝和微信通道的成功交易返回此字段,银联通道的交易无论成功与否，均不返回此字段 */
  endTime?: string
  /** 商户保留域,若被查询交易有上送此字段，则返回此字段 */
  mchReserved?: string
  /** 商户号 */
  merId: string
  /** 用户标识 */
  openId?: string
  /** 订单优惠金额 */
  orderCouponAmt?: string
  /** 商户订单号 */
  orderId: string
  /** 订单原始金额 */
  orderOrigAmt?: string
  /** 付款银行,支付宝支付：ALIPAYACCOUNT 支付宝账户,PCREDIT 蚂蚁花呗, DEBIT_CARD 借记卡,CREDIT_CARD 信用卡,MIXED_CARD 借贷合一卡 ,等微信支付：CMB_CREDIT 等 */
  payBank?: string
  /**  */
  payTime?: string
  /** 支付方式ZF：支付宝 WX：微信 YL：银 */
  payType: string
  /** 优惠券信息 */
  promotionDetail?: string
  /** 第三方订单号,支付宝、微信侧的订单号 */
  thirdOrderId?: string
  /** 交易状态C - 订单已关闭D - 交易已撤销P - 交易在进行F - 交易失败S - 交易成功R - 转入退款 */
  tradeState?: string
  /** 交易金额,单位为分 */
  txnAmt: string
  /** 招行响应的订单生成时间，yyyyMMddHHmmss */
  txnTime?: string
  /** 收银员 */
  userId?: string
}

/**
 * requestUrl /pay/front/order_query/{orderCode}
 * method get
 */
export interface OrderQueryUsingGETResponse {
  
  /** 响应数据 */
  data?: 支付结果响应参数
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /pay/front/pay_proof
 * method post
 */
export interface PayProofUsingPOSTRequest {
  
  /** 订单编码 */
  orderCode: string
  /** 凭据链接 */
  proof: string
  /**  */
  remark?: string
}

/**
 * requestUrl /pay/front/pay_proof
 * method post
 */
export interface PayProofUsingPOSTResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 支付码申请响应体 {
  
  /** 过期时间 */
  expiredTime?: number
  /** 生成时间 */
  generatedTime?: number
  /** 商品名称列表 */
  goodsNameList?: any[]
  /** 当前时间 */
  nowTime?: number
  /** 订单编码 */
  orderCode?: string
  /** 订单编号 */
  orderNo?: string
  /** 支付金额 */
  payAmount?: number
  /** 收款方 */
  payeeName?: string
  /** 支付二维码code */
  qrCode?: string
  /** 支付二维码url */
  qrCodeUrl?: string
}

/**
 * requestUrl /pay/front/qrcode_apply
 * method post
 */
export interface QrcodeApplyUsingPOSTRequest {
  
  /** 订单号 */
  orderCode: string
}

/**
 * requestUrl /pay/front/qrcode_apply
 * method post
 */
export interface QrcodeApplyUsingPOSTResponse {
  
  /** 响应数据 */
  data?: 支付码申请响应体
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /pay/front/qrcode_result/{orderCode}
 * method get
 */
export interface QrcodeResultUsingGETResponse {
  
  /** 响应数据 */
  data?: number
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 退款响应参数 {
  
  /** 平台退款订单号 */
  cmbOrderId?: string
  /** 完成时间 */
  endTime?: number
  /** 返回码,错误信息 */
  errCode?: string
  /** 第三方错误描述，退款交易在第三方处理失败时返回第三方的错误信息 */
  errDescription?: string
  /** 退款处理状态，P 退款正在处理（原交易为微信渠道）S 退款成功（原交易为支付宝、银联渠道） */
  refundState?: string
  /** 返回码 */
  respCode?: string
  /** 返回码,应答信息 */
  respMsg?: string
  /** 返回码,SUCCESS/FAIL */
  returnCode?: string
  /** 发送时间 */
  txnTime?: number
}

/**
 * requestUrl /pay/front/refund
 * method post
 */
export interface RefundUsingPOSTRequest {
  
  /** 商品编号 */
  goodsCode?: string
  /** 订单号 */
  orderCode: string
  /** 退款金额 */
  refundAmount: number
  /** 退款单号 */
  refundCode: string
}

/**
 * requestUrl /pay/front/refund
 * method post
 */
export interface RefundUsingPOSTResponse {
  
  /** 响应数据 */
  data?: 退款响应参数
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /pay/front/refund/detail/{refundOrderCode}
 * method get
 */
export interface RefundDetailUsingGETResponse {
  
  /** 响应数据 */
  data?: 支付流水
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /pay/front/refund/list
 * method post
 */
export interface RefundListUsingPOSTRequest {
  
  /**  */
  refundOrderCodes?: any[]
}

/**
 * requestUrl /pay/front/refund/list
 * method post
 */
export interface RefundListUsingPOSTResponse {
  
  /** 响应数据 */
  data?: 支付流水
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /pay/hello/id/gen
 * method get
 */
export interface IdUsingGETResponse {
  
  /** 响应数据 */
  data?: string
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /pay/hello/world
 * method get
 */
export interface HelloUsingGETResponse {
  
  /** 响应数据 */
  data?: string
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /pay/backend/merchant/check_merchant_config
 * method get
 */
export interface CheckMerchantConfigUsingGETResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /pay/backend/merchant/delete_config
 * method post
 */
export interface DeleteConfigUsingPOSTResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface PlatformMerchantFullConfigDetailDto {
  
  /** 支付应用id */
  appId?: string
  /** 支付应用密钥（加密） */
  appSecret?: string
  /** 诺诺发票-应用key（加密） */
  invoiceAppKey?: string
  /** 诺诺发票-应用密码（加密） */
  invoiceAppSecret?: string
  /** 开票-税号 */
  invoiceTaxNum?: string
  /** 商户号/平台商户号 */
  merId?: string
  /** 商户名 */
  merName?: string
  /** 进件应用id,正式环境同支付应用id */
  merchantAppId?: string
  /** 进件应用密钥,正式环境同支付应用密钥（加密） */
  merchantAppSecret?: string
  /** 进件私钥,正式环境同支付私钥（加密） */
  merchantPrivateKey?: string
  /** 支付私钥（加密） */
  privateKey?: string
  /** 支付公钥（加密） */
  publicKey?: string
  /** 手续费率 */
  serviceChargeRatio?: number
  /** 结算主体编码 */
  settleTargetCode?: string
  /** 收银员id */
  userId?: string
}

/**
 * requestUrl /pay/backend/merchant/get_full_config_by_settlement
 * method get
 */
export interface GetFullConfigBySettlementUsingGETResponse {
  
  /** 响应数据 */
  data?: PlatformMerchantFullConfigDetailDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface MerchantConfigDto {
  
  /** 支付应用id */
  appId?: string
  /** 支付应用密钥（加密） */
  appSecret?: string
  /** 商户号/平台商户号 */
  merId?: string
  /** 进件应用id,正式环境同支付应用id */
  merchantAppId?: string
  /** 进件应用密钥,正式环境同支付应用密钥（加密） */
  merchantAppSecret?: string
  /** 进件私钥,正式环境同支付私钥（加密） */
  merchantPrivateKey?: string
  /** 支付私钥（加密） */
  privateKey?: string
  /** 支付公钥（加密） */
  publicKey?: string
  /** 结算主体编码 */
  settleTargetCode?: string
}

/**
 * requestUrl /pay/backend/merchant/get_merchant_config_by_settlement
 * method get
 */
export interface GetMerchantConfigBySettlementUsingGETResponse {
  
  /** 响应数据 */
  data?: MerchantConfigDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /pay/backend/merchant/save_merchant_info
 * method post
 */
export interface SaveInfoUsingPOSTRequest {
  
  /** 经营商户号 */
  merchantNo?: string
  /** 资源方组织机构编码 */
  merchantOrgCode?: string
  /** 门店id */
  storeId?: string
}

/**
 * requestUrl /pay/backend/merchant/save_merchant_info
 * method post
 */
export interface SaveInfoUsingPOSTResponse {
  
  /** 响应数据 */
  data?: string
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /pay/backend/merchant/save_or_update_platform_merchant_config
 * method post
 */
export interface SaveOrUpdatePlatformMerchantConfigUsingPOSTRequest {
  
  /** 支付应用id */
  appId?: string
  /** 支付应用密钥（加密） */
  appSecret?: string
  /** 唯一编码 */
  id?: number
  /** 诺诺发票-应用key（加密） */
  invoiceAppKey?: string
  /** 诺诺发票-应用密码（加密） */
  invoiceAppSecret?: string
  /** 开票-税号 */
  invoiceTaxNum?: string
  /** 商户号/平台商户号 */
  merId?: string
  /** 商户名 */
  merName?: string
  /** 进件应用id,正式环境同支付应用id */
  merchantAppId?: string
  /** 进件应用密钥,正式环境同支付应用密钥（加密） */
  merchantAppSecret?: string
  /** 进件私钥,正式环境同支付私钥（加密） */
  merchantPrivateKey?: string
  /** 支付私钥（加密） */
  privateKey?: string
  /** 支付公钥（加密） */
  publicKey?: string
  /** 手续费率 */
  serviceChargeRatio?: number
  /** 结算主体编码 */
  settleTargetCode?: string
  /** 收银员id */
  userId?: string
}

/**
 * requestUrl /pay/backend/merchant/save_or_update_platform_merchant_config
 * method post
 */
export interface SaveOrUpdatePlatformMerchantConfigUsingPOSTResponse {
  
  /** 响应数据 */
  data?: string
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /pay/backend/merchant/sync_platform_config
 * method post
 */
export interface SyncPlatformConfigUsingPOSTRequest {
  
  /** 经营商户号 */
  managementMerId?: string
  /** 经营商户门店号 */
  managementMerShopId?: string
  /** 结算主体编码 */
  settleTargetCode?: string
}

/**
 * requestUrl /pay/backend/merchant/sync_platform_config
 * method post
 */
export interface SyncPlatformConfigUsingPOSTResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /pay/notify/qrcode_apply
 * method get
 */
export interface QrcodeApplyUsingGETResponse {
  
  /** 响应数据 */
  data?: number
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /pay/notify/qrcode_apply
 * method post
 */
export interface QrcodeApplyUsingPOST_1Response {
  
  /** 编码方式 */
  encoding: string
  /** 响应的失败码，商户返回的业务错误码，成功为SUCCESS，失败为FAIL */
  respCode?: string
  /** 响应的失败详细描述，请求处理失败的详细描述信息 */
  respMsg?: string
  /** 返回码，SUCCESS/FAIL,SUCCESS表示商户接收通知成功并校验成功 */
  returnCode?: string
  /** 签名 */
  sign: string
  /** 签名方法 */
  signMethod: string
  /** 版本号 */
  version: string
}

/**
 * requestUrl /pay/notify/refund
 * method post
 */
export interface RefundUsingPOST_1Response {
  
  /** 编码方式 */
  encoding: string
  /** 响应的失败码，商户返回的业务错误码，成功为SUCCESS，失败为FAIL */
  respCode?: string
  /** 响应的失败详细描述，请求处理失败的详细描述信息 */
  respMsg?: string
  /** 返回码，SUCCESS/FAIL,SUCCESS表示商户接收通知成功并校验成功 */
  returnCode?: string
  /** 签名 */
  sign: string
  /** 签名方法 */
  signMethod: string
  /** 版本号 */
  version: string
}

/**
 * requestUrl /pay/notify/refund_result
 * method get
 */
export interface RefundResultUsingGETResponse {
  
  /** 响应数据 */
  data?: number
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface NoticeData {
  
  /**  */
  bankAcceptTime?: string
  /**  */
  bankSettleNo?: string
  /**  */
  currencyCode?: string
  /**  */
  feeAmt?: string
  /**  */
  mchReserved?: string
  /**  */
  merchantNo?: string
  /**  */
  orderDate?: string
  /**  */
  orderNo?: string
  /**  */
  requestNo?: string
  /**  */
  resultDescription?: string
  /**  */
  settleAmt?: string
  /**  */
  settleDate?: string
  /**  */
  settleState?: string
  /**  */
  settleTime?: string
  /**  */
  subMerchantNo?: string
  /**  */
  subOrderNo?: string
  /**  */
  txnType?: string
}

/**
 * requestUrl /pay/settle_notify/settle
 * method post
 */
export interface SettleUsingPOSTRequest {
  
  /**  */
  charset?: string
  /**  */
  noticeData?: NoticeData
  /**  */
  respCode?: string
  /**  */
  respMessage?: string
  /**  */
  sign?: string
  /**  */
  signType?: string
  /**  */
  version?: string
}

/**
 * requestUrl /pay/settle_notify/settle
 * method post
 */
export interface SettleUsingPOSTResponse {
  
  /** 编码方式 */
  encoding: string
  /** 响应的失败码，商户返回的业务错误码，成功为SUCCESS，失败为FAIL */
  respCode?: string
  /** 响应的失败详细描述，请求处理失败的详细描述信息 */
  respMsg?: string
  /** 返回码，SUCCESS/FAIL,SUCCESS表示商户接收通知成功并校验成功 */
  returnCode?: string
  /** 签名 */
  sign: string
  /** 签名方法 */
  signMethod: string
  /** 版本号 */
  version: string
}

interface 结算单详情 {
  
  /** 结算单唯一编码 */
  code?: string
  /** 生成时间 */
  createdAt?: number
  /** 商家 */
  merchantOrgName?: string
  /** 订单金额 */
  orderAmount?: number
  /** 订单唯一编码，查询订单详情 */
  orderCode?: string
  /** 订单id */
  orderNo?: string
  /** 打款凭证url */
  payReceipt?: string
  /** 退款金额 */
  refundAmount?: number
  /** 结算金额 */
  settlementAmount?: number
  /** 结算id */
  settlementNo?: string
  /** 结算时间 */
  settlementTime?: number
  /** 站点id */
  sid?: number
  /** 站点名称 */
  siteName?: string
  /** 结算状态，1：未结算，2：结算成功，3：结算失败，4：结算失败（重试失败） */
  status?: number
}

/**
 * requestUrl /pay/backend/settlement/detail
 * method get
 */
export interface DetailUsingGET_1Response {
  
  /** 响应数据 */
  data?: 结算单详情
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 结算单分页卡片响应体 {
  
  /**  */
  failed?: 结算单小计对象
  /**  */
  pageData?: BasePaginationRsp结算单分页响应体
  /**  */
  settled?: 结算单小计对象
  /**  */
  unsettled?: 结算单小计对象
}

interface 结算单小计对象 {
  
  /** 金额 */
  orderAmount?: number
  /** 订单数 */
  orderCount?: number
}

interface BasePaginationRsp结算单分页响应体 {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: 结算单分页响应体
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface 结算单分页响应体 {
  
  /** 平台清分流水号 */
  bankSettlementNo?: string
  /** 结算单唯一编码 */
  code?: string
  /** 生成时间 */
  createdAt?: number
  /** 资源方唯一编码 */
  merchantOrgCode?: string
  /** 商家 */
  merchantOrgName?: string
  /** 订单唯一编码 */
  orderCode?: string
  /** 订单编号 */
  orderNo?: string
  /** 打款凭证链接url */
  payReceipt?: string
  /** 结算金额 */
  settlementAmount?: number
  /** 结算id */
  settlementNo?: string
  /** 结算时间 */
  settlementTime?: number
  /** 站点id */
  sid?: number
  /** 站点名称 */
  siteName?: string
  /** 站点简称 */
  siteShortName?: string
  /** 结算状态，1：未结算，2：结算成功，3：结算失败，4：结算失败（重试失败） */
  status?: number
}

/**
 * requestUrl /pay/backend/settlement/page
 * method post
 */
export interface PageSettlementUsingPOSTRequest {
  
  /** 生成时间-结束查询时间 */
  createdEnd?: number
  /** 生成时间-开始查询时间 */
  createdStart?: number
  /** 资源方编码code */
  merchantOrgCode?: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 订单编号 */
  orderNo?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 结算时间-结束查询时间 */
  settleEnd?: number
  /** 结算时间-开始查询时间 */
  settleStart?: number
  /** 结算id */
  settlementNo?: string
  /** 站点id */
  sid?: number
  /** 结算状态，1：未结算，2：结算成功，3：结算失败，4：结算失败（重试失败） */
  status?: number
}

/**
 * requestUrl /pay/backend/settlement/page
 * method post
 */
export interface PageSettlementUsingPOSTResponse {
  
  /** 响应数据 */
  data?: 结算单分页卡片响应体
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRsp结算单明细分页响应体 {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: 结算单明细分页响应体
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface 结算单明细分页响应体 {
  
  /** 结算明细唯一编码 */
  code?: string
  /** 商品编码 */
  goodsCode?: string
  /** 商品名称 */
  goodsName?: string
  /** 商品价格 */
  price?: number
  /** 购买数量 */
  quantity?: number
  /** 退款金额 */
  refundAmount?: number
  /** 退款数量 */
  refundQuantity?: number
  /** 服务费比例 */
  serviceFeeRatio?: number
  /** 结算金额 */
  settlementAmount?: number
  /** 小计金额 */
  totalPrice?: number
}

/**
 * requestUrl /pay/backend/settlement/page_settlement_detail
 * method post
 */
export interface PageSettlementDetailUsingPOSTRequest {
  
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /**  */
  settlementCode?: string
}

/**
 * requestUrl /pay/backend/settlement/page_settlement_detail
 * method post
 */
export interface PageSettlementDetailUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRsp结算单明细分页响应体
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRsp未结算数据分页响应体 {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: 未结算数据分页响应体
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface 未结算数据分页响应体 {
  
  /** 结算单唯一编码 */
  code?: string
  /** 生成时间 */
  createdAt?: number
  /** 资源方唯一编码 */
  merchantOrgCode?: string
  /** 商家 */
  merchantOrgName?: string
  /** 订单唯一编码，查询订单详情 */
  orderCode?: string
  /** 订单id */
  orderNo?: string
  /** 结算金额 */
  settlementAmount?: number
  /** 结算id */
  settlementNo?: string
  /** 站点id */
  sid?: number
  /** 站点名称 */
  siteName?: string
}

/**
 * requestUrl /pay/backend/settlement/page_unsettled
 * method post
 */
export interface PageUnsettledUsingPOSTRequest {
  
  /** 生成时间-结束查询时间 */
  createdEnd?: number
  /** 生成时间-开始查询时间 */
  createdStart?: number
  /** 资源方唯一编码 */
  merchantOrgCode?: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 站点id */
  sid?: number
}

/**
 * requestUrl /pay/backend/settlement/page_unsettled
 * method post
 */
export interface PageUnsettledUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRsp未结算数据分页响应体
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 商品订单结算单保存请求体 {
  
  /** 商品唯一编码 */
  goodsCode?: string
  /** 商品单价 */
  price?: number
  /** 购买数量 */
  quantity?: number
  /** 退款金额 */
  refundAmount?: number
  /** 退款数量 */
  refundQuantity?: number
  /** 服务费比例 */
  serviceFeeRatio?: number
  /** 结算金额 */
  settlementAmount?: number
  /** 小计价格 */
  totalPrice?: number
}

/**
 * requestUrl /pay/backend/settlement/save
 * method post
 */
export interface SaveUsingPOSTRequest {
  
  /** 结算单唯一编码 */
  code?: string
  /** 资源方唯一编码 */
  merchantOrgCode?: string
  /** 订单金额 */
  orderAmount?: number
  /** 订单唯一编码 */
  orderCode?: string
  /** 订单id */
  orderNo?: string
  /** 退款金额 */
  refundAmount?: number
  /** 结算主体编码 */
  settleTargetCode?: string
  /** 结算金额 */
  settlementAmount?: number
  /** 商品订单结算单列表 */
  settlementOrderGoodsList?: 商品订单结算单保存请求体
  /** 站点id */
  sid?: number
  /** 结算状态，1：未结算，2：结算成功，3：结算失败，4：结算失败（重试失败） */
  status?: number
  /** 结算类型，1：线上结算，2：线下结算 */
  type?: number
}

/**
 * requestUrl /pay/backend/settlement/save
 * method post
 */
export interface SaveUsingPOSTResponse {
  
  /** 响应数据 */
  data?: string
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /pay/backend/settlement/settle
 * method post
 */
export interface SettleUsingPOST_1Request {
  
  /**  */
  payReceipt?: string
  /**  */
  settlementOrderCodeList?: any[]
  /**  */
  totalAmount?: number
}

/**
 * requestUrl /pay/backend/settlement/settle
 * method post
 */
export interface SettleUsingPOST_1Response {
  
  /** 响应数据 */
  data?: string
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}