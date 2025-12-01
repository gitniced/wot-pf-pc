
/**
 * 如果遇到bug，您可以钉钉搜索封东其或者给 fengdongqi@hzwotu.com 邮箱发邮件
 * 欢迎大家提 issue 或者 PR。
 * @title 订单API文档
 * @description 订单是一个 Spring Boot项目
 * @version v1.0
 **/


/**
 * requestUrl /order/backend/cancel
 * method post
 */
export interface CancelUsingPOSTRequest {
  
  /** 关闭原因 */
  closeReason: string
  /** 订单唯一编码 */
  code: string
}

/**
 * requestUrl /order/backend/cancel
 * method post
 */
export interface CancelUsingPOSTResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BackendOrderGoodsReqDto {
  
  /** 优惠价 */
  discountPrice: number
  /** 商品编码 */
  goodsCode: string
  /** 购买数量 */
  quantity: number
}

interface ReservedInfo {
  
  /** 支付数量，例如学员个数 */
  bizCount?: number
  /** 业务名称 */
  bizName?: string
  /** 业务保留字段,用于关联交易中心订单:如报名记录编码、班级编码等 */
  reservedCode?: string
}

/**
 * requestUrl /order/backend/create
 * method post
 */
export interface CreateUsingPOSTRequest {
  
  /** 代理商编码 */
  agentCode?: string
  /** 是否自动关闭订单:0否,1是 */
  autoClose: number
  /** 买家类型，1：个人，2：机构 */
  buyerType: number
  /** 订单编码，传递则使用，不传则自动生成 */
  code?: string
  /** 合同编码 */
  contractCode?: string
  /** 是否合同型订单，true(1)：是，false(0)：否 */
  contractOrder: number
  /** 合同订单业务类型:1班级,2计划 */
  contractOrderType?: number
  /** 合同订单预计支付时间-选填，到达预计支付时间未支付则逾期 */
  expectPayTime?: number
  /** 商品列表 */
  goodsList: BackendOrderGoodsReqDto
  /** 用户身份 */
  identity: number
  /** 机构用户必填，订单所属组织编码 */
  organizationCode?: string
  /** 备注 */
  remark?: string
  /** 业务线保留信息,用于关联交易中心订单:如报名记录编码、班级编码等 */
  reservedInfos?: ReservedInfo
  /** 站点id */
  sid: number
  /** 用户编码 */
  userCode: string
}

/**
 * requestUrl /order/backend/create
 * method post
 */
export interface CreateUsingPOSTResponse {
  
  /** 响应数据 */
  data?: string
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BackendOrderDetailDto {
  
  /** 代理商编码 */
  agentCode?: string
  /** 订单商品所属代理商家编码 */
  agentMerchantCode?: string
  /** 代理卖家名称 */
  agentMerchantName?: string
  /** 买家类型，1：个人，2：机构 */
  buyerType?: number
  /** 关闭原因 */
  closeReason?: string
  /** 唯一编码 */
  code?: string
  /** 合同 */
  contract?: ContractBaseInfoDto
  /** 是否合同型订单，true(1)：是，false(0)：否 */
  contractOrder?: number
  /** 合同订单业务类型:1班级,2计划 */
  contractOrderType?: number
  /** 合同tag */
  contractTags?: any[]
  /** 创建时间，下单时间 */
  createdAt?: number
  /** 客户编码 */
  customerCode?: string
  /** 订单预计支付时间 */
  expectPayTime?: number
  /** 商品订单列表 */
  goodsOrderList?: BackendOrderGoodsDetailDto
  /** 是否已延期支付 */
  hasApplyDelay?: boolean
  /** 用户身份 */
  identity?: number
  /** 开票时间 */
  invoicingTime?: number
  /** 卖家名称 */
  merchantName?: string
  /** 订单商品所属商家编码 */
  merchantOrgCode?: string
  /** 用户手机号（创建人手机号） */
  mobile?: string
  /** 订单编号 */
  orderNo?: string
  /** 机构用户，订单所属组织编码 */
  organizationCode?: string
  /** 机构名称 */
  organizationName?: string
  /** 订单支付状态：1未支付、2已延期、3已逾期、4待审核、5待上传凭证、6支付成功、7支付关闭 */
  payStatus?: number
  /** 支付时间 */
  payTime?: number
  /** 支付方式，0：支付宝，1：微信，2：线下支付 */
  payType?: number
  /** 支付记录 */
  payment?: 支付记录
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
  /** 站点名称 */
  siteName?: string
  /** 订单状态，1未支付、2支付待确认、3已支付、4已完成、5已关闭 */
  status?: number
  /** 总额 */
  totalAmount?: number
  /** 用户编码 */
  userCode?: string
  /** 用户名称（创建人） */
  userName?: string
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
  /** 合作优惠 */
  preferential?: number
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

interface BackendOrderGoodsDetailDto {
  
  /** 编码 */
  code?: string
  /** 优惠价 */
  discountPrice?: number
  /** 商品属性 */
  goodsAttributes?: string
  /** 商品类目名称 */
  goodsCategories?: string
  /** 商品编码 */
  goodsCode?: string
  /** 商品图片 */
  goodsImage?: string
  /** 商品名称 */
  goodsName?: string
  /** 订单编码 */
  orderCode?: string
  /** 商品原价 */
  price?: number
  /** 购买数量 */
  quantity?: number
  /** 用户编码 */
  userCode?: string
}

interface 支付记录 {
  
  /**  */
  delayProof?: string
  /**  */
  offlinePaymentDto?: 线下支付响应体
  /**  */
  onlinePaymentDto?: 交易流水
  /**  */
  payDeadline?: number
  /**  */
  remark?: string
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

interface 交易流水 {
  
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
  /** 交易流水 */
  tradeNo?: string
  /** 支付时间 */
  tradeTime?: number
}

/**
 * requestUrl /order/backend/detail/{code}
 * method get
 */
export interface DetailUsingGETResponse {
  
  /** 响应数据 */
  data?: BackendOrderDetailDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /order/backend/invoice_status
 * method post
 */
export interface InvoiceStatusUsingPOSTRequest {
  
  /** 开票时间 */
  invoiceTime?: number
  /** 订单编码 */
  orderCodeList?: any[]
}

/**
 * requestUrl /order/backend/invoice_status
 * method post
 */
export interface InvoiceStatusUsingPOSTResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 订单详情feign返回对象 {
  
  /** 代理商编码 */
  agentCode?: string
  /** 买家类型1无客户2客户 */
  buyerType?: number
  /** 唯一编码 */
  code?: string
  /** 是否合同型订单，true(1)：是，false(0)：否 */
  contractOrder?: number
  /** 创建时间，下单时间 */
  createdAt?: number
  /** 创建人 */
  createdBy?: string
  /** 客户编码 */
  customerCode?: string
  /** 客户名称 */
  customerName?: string
  /** 是否删除 */
  deleted?: boolean
  /** 订单预计支付时间 */
  expectPayTime?: number
  /** 开票状态，0未开票，1已开票 */
  invoicingStatus?: number
  /** 开票时间 */
  invoicingTime?: number
  /** 订单编号 */
  orderNo?: string
  /** 订单支付状态：1未支付、2已延期、3已逾期、4待审核、5待上传凭、6支付成功、7支付关闭 */
  payStatus?: number
  /** 支付时间 */
  payTime?: number
  /** 支付方式，0：支付宝，1：微信，2：线下支付 */
  payType?: number
  /** 业务线保留字段,用于关联交易中心订单:如报名记录编码、班级编码等 */
  reservedCodes?: any[]
  /** 结算主体编码 */
  settleTargetCode?: string
  /** 站点 */
  sid?: number
  /** 订单状态，1未支付、2支付待确认、3已支付、4已完成、5已关闭 */
  status?: number
  /** 总额 */
  totalAmount?: number
  /** 更新时间 */
  updatedAt?: number
  /** 更新者 */
  updatedBy?: string
  /** 用户编码 */
  userCode?: string
}

/**
 * requestUrl /order/backend/list_detail
 * method get
 */
export interface ListDetailForFeignUsingGETResponse {
  
  /** 响应数据 */
  data?: 订单详情feign返回对象
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 订单基本信息 {
  
  /** 代理商编码 */
  agentCode?: string
  /** 买家类型1无客户2客户 */
  buyerType?: number
  /** 客户所在的市 */
  city?: number
  /** 唯一编码 */
  code?: string
  /** 是否合同型订单，true(1)：是，false(0)：否 */
  contractOrder?: number
  /** 创建时间，下单时间 */
  createdAt?: number
  /** 客户编码 */
  customerCode?: string
  /** 开票状态，0未开票，1已开票 */
  invoicingStatus?: number
  /** 开票时间 */
  invoicingTime?: number
  /** 订单编号 */
  orderNo?: string
  /** 订单支付状态：1未支付、2已延期、3已逾期、4待审核、5待上传凭证、6支付成功、7支付关闭 */
  payStatus?: number
  /** 支付时间 */
  payTime?: number
  /** 客户所在的省 */
  province?: number
  /** 结算主体编码 */
  settleTargetCode?: string
  /** 站点 */
  sid?: number
  /** 订单状态，1未支付、2支付待确认、3已支付、4已完成、5已关闭 */
  status?: number
  /** 总额 */
  totalAmount?: number
  /** 用户编码 */
  userCode?: string
}

/**
 * requestUrl /order/backend/list_order_and_suborder_info
 * method get
 */
export interface ListOrderAndSuborderInfoUsingGETResponse {
  
  /** 响应数据 */
  data?: 订单基本信息
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BackendOrderBasicListRespDto {
  
  /** 唯一编码 */
  code?: string
  /** 创建时间 */
  createdAt?: number
  /** 订单编号 */
  orderNo?: string
  /** 支付时间 */
  payTime?: number
  /** 站点 */
  sid?: number
  /** 站点名称 */
  siteName?: string
  /** 订单状态，1未支付、2支付待确认、3已支付、4已完成、5已关闭 */
  status?: number
  /** 业务标签 */
  tags?: any[]
  /** 订单金额 */
  totalAmount?: number
}

/**
 * requestUrl /order/backend/list_order_basic_info
 * method get
 */
export interface ListOrderBasicInfoUsingGETResponse {
  
  /** 响应数据 */
  data?: BackendOrderBasicListRespDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /order/backend/modify_goods_count
 * method post
 */
export interface ModifyGoodsCountUsingPOSTRequest {
  
  /** 商品数量 */
  newQuality: number
  /** 订单编码 */
  orderCode: string
}

/**
 * requestUrl /order/backend/modify_goods_count
 * method post
 */
export interface ModifyGoodsCountUsingPOSTResponse {
  
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
 * requestUrl /order/backend/order_pay_status_and_count
 * method get
 */
export interface GetOrderPayStatusAndCountUsingGETResponse {
  
  /** 响应数据 */
  data?: Record<string | number | symbol, any>
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /order/backend/order_pay_status_paid
 * method post
 */
export interface OrderPayStatusPaidUsingPOSTResponse {
  
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
 * requestUrl /order/backend/order_status_and_count
 * method get
 */
export interface GetOrderStatusAndCountUsingGETResponse {
  
  /** 响应数据 */
  data?: Record<string | number | symbol, any>
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /order/backend/overdue
 * method post
 */
export interface OverdueUsingPOSTResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspBackendOrderPageRespDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: BackendOrderPageRespDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface BackendOrderPageRespDto {
  
  /** 代理商编码 */
  agentCode?: string
  /** 订单商品所属代理商家编码 */
  agentMerchantCode?: string
  /** 代理商 */
  agentName?: string
  /** 买家名称（待用户接入es后去除字段） */
  buyerName?: string
  /** 买家类型，1：个人，2：机构 */
  buyerType?: number
  /** 是否可开蓝票 0不可开 1可开 */
  canBlueInvoice?: number
  /** 是否可开红票 0不可开 1可开 */
  canRedInvoice?: number
  /** 唯一编码 */
  code?: string
  /** 是否合同型订单，true(1)：是，false(0)：否 */
  contractOrder?: number
  /** 创建时间，下单时间 */
  createdAt?: number
  /** 客户编码 */
  customerCode?: string
  /** 是否已申请延期 */
  delayed?: boolean
  /** 合同订单预计支付时间 */
  expectPayTime?: number
  /**  */
  ext1?: string
  /**  */
  ext2?: string
  /** 用户身份 */
  identity?: number
  /** 开票状态，0未开票，1已开票 */
  invoicingStatus?: number
  /** 卖家名称（待组织接入es后去除字段） */
  merchantName?: string
  /** 订单商品所属商家编码 */
  merchantOrgCode?: string
  /** 商品订单列表 */
  orderGoodsList?: 商品订单
  /** 订单编号 */
  orderNo?: string
  /** 机构用户，订单所属组织编码 */
  organizationCode?: string
  /** 订单支付状态：1未支付、2已延期、3已逾期、4待审核、5待上传凭证、6支付成功、7支付关闭 */
  payStatus?: number
  /** 支付时间 */
  payTime?: number
  /** 支付方式，0：支付宝，1：微信，2：线下支付 */
  payType?: number
  /** 备注 */
  remark?: string
  /** 结算对象编码 */
  settleTargetCode?: string
  /** 平台主体(结算对象名称) */
  settleTargetName?: string
  /** 站点 */
  sid?: number
  /** 站点名称 */
  siteName?: string
  /** 订单状态，1未支付、2支付待确认、3已支付、4已完成、5已关闭 */
  status?: number
  /** 业务标签 */
  tags?: any[]
  /** 总额 */
  totalAmount?: number
  /** 用户编码 */
  userCode?: string
}

interface 商品订单 {
  
  /** 商品订单唯一编码 */
  code: string
  /** 优惠价 */
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
  /** 是否存在售后单 */
  hasRefunded?: boolean
  /** 订单编码 */
  orderCode?: string
  /** 商品原价 */
  price: number
  /** 购买数量 */
  quantity: number
}

/**
 * requestUrl /order/backend/page
 * method post
 */
export interface PageUsingPOSTRequest {
  
  /** 实收款-最高金额 */
  amountHigh?: number
  /** 实收款-最低金额 */
  amountLow?: number
  /** 买家 */
  buyerCode?: string
  /** 买家类型，1：个人，2：机构 */
  buyerType?: number
  /** 订单类型：0平台型订单、1合同型订单 */
  contractOrder?: number
  /** 创建日期-查询结束时间 */
  createEndTime?: number
  /** 创建日期-查询开始时间 */
  createStartTime?: number
  /** 卖家 */
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
  /** 1未支付、2已延期、3已逾期、4待审核、5待上传凭、6支付成功、7支付关闭 */
  payStatus?: number
  /** 支付方式，0：线上支付，1：线下支付 */
  payType?: number
  /** 省份id数组 */
  provinces?: any[]
  /** 备注 */
  remark?: string
  /** 站点 */
  sid?: number
  /** 订单状态，1未支付、2支付待确认、3已支付、4已完成、5已关闭 */
  status?: number
  /** tag编号数组 */
  tags?: any[]
}

/**
 * requestUrl /order/backend/page
 * method post
 */
export interface PageUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspBackendOrderPageRespDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRsp键值对返回对象stringstring {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: 键值对返回对象stringstring
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface 键值对返回对象stringstring {
  
  /** 名称 */
  name?: string
  /** 值 */
  value?: string
}

/**
 * requestUrl /order/backend/page_order_buyer
 * method post
 */
export interface PageOrderBuyerUsingPOSTRequest {
  
  /** 买家类型，1：个人，2：机构 */
  buyerType?: number
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 客户所属省份id数组 */
  provinces?: any[]
  /** 业务标签数组 */
  tags?: any[]
}

/**
 * requestUrl /order/backend/page_order_buyer
 * method post
 */
export interface PageOrderBuyerUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRsp键值对返回对象stringstring
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /order/backend/paid
 * method post
 */
export interface BackendPaidUsingPOSTRequest {
  
  /** 订单编码 */
  code?: string
  /** 订单支付状态：1未支付、2已延期、3已逾期、4待审核、5待上传凭证、6支付成功、7支付关闭 */
  payStatus?: number
  /** 支付时间 */
  payTime?: number
  /** 支付方式，0：支付宝，1：微信，2：线下支付 */
  payType?: number
}

/**
 * requestUrl /order/backend/paid
 * method post
 */
export interface BackendPaidUsingPOSTResponse {
  
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
 * requestUrl /order/backend/pay_confirm
 * method post
 */
export interface PayConfirmUsingPOSTResponse {
  
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
 * requestUrl /order/backend/pay_delay
 * method post
 */
export interface PayDelayUsingPOSTRequest {
  
  /** 订单编码 */
  orderCode?: string
  /** 预计支付时间 */
  payDeadLine?: number
}

/**
 * requestUrl /order/backend/pay_delay
 * method post
 */
export interface PayDelayUsingPOSTResponse {
  
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
 * requestUrl /order/backend/reset_invoice_status
 * method post
 */
export interface ResetInvoiceStatusUsingPOSTRequest {
  
}

/**
 * requestUrl /order/backend/reset_invoice_status
 * method post
 */
export interface ResetInvoiceStatusUsingPOSTResponse {
  
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
 * requestUrl /order/backend/rollback_paid
 * method post
 */
export interface RollbackPaidUsingPOSTRequest {
  
  /** 订单编码 */
  code?: string
  /** 订单支付状态：1未支付、2已延期、3已逾期、4待审核、5待上传凭、6支付成功、7支付关闭 */
  payStatus?: number
  /** 订单状态，1未支付、2支付待确认、3已支付、4已完成、5已关闭 */
  status?: number
}

/**
 * requestUrl /order/backend/rollback_paid
 * method post
 */
export interface RollbackPaidUsingPOSTResponse {
  
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
 * requestUrl /order/backend/set_to_invoicing
 * method post
 */
export interface SetToInvoicingUsingPOSTRequest {
  
}

/**
 * requestUrl /order/backend/set_to_invoicing
 * method post
 */
export interface SetToInvoicingUsingPOSTResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface SyncGoodsOrderDto {
  
  /** 商品编码 */
  goodsCode?: string
  /** 购买数量 */
  quantity?: number
}

/**
 * requestUrl /order/backend/sync_order
 * method post
 */
export interface SyncOrderUsingPOSTRequest {
  
  /** 代理商编码 */
  agentCode?: string
  /** 是否自动关闭订单:0否,1是，此接口不传则默认为0 */
  autoClose?: number
  /** 买家类型，1：个人，2：机构 */
  buyerType: number
  /** 开票控制：是否可开蓝票 0不可开 1可开 */
  canBlueInvoice: number
  /** 开票控制：是否可开红票 0不可开 1可开 */
  canRedInvoice: number
  /** 关闭原因 */
  closeReason?: string
  /** 合同编码 */
  contractCode?: string
  /** 是否合同型订单，true(1)：是，false(0)：否 */
  contractOrder: number
  /** 合同订单业务类型:1班级,2计划 */
  contractOrderType?: number
  /** 是否已申请延期，有延期记录则传true */
  delayed: boolean
  /** 订单预计支付时间 */
  expectPayTime?: number
  /** 商品订单集合 */
  goodsOrders: SyncGoodsOrderDto
  /** 用户身份，个人用户必传，机构用户传机构身份即可 */
  identity?: number
  /** 开票状态，0未开票，1已开票，2开票中 */
  invoicingStatus: number
  /** 开票时间 */
  invoicingTime?: number
  /** 订单编号 */
  orderNo?: string
  /** 机构用户，订单所属组织编码，机构用户必传 */
  organizationCode?: string
  /** 订单支付状态：1未支付、2已延期、3已逾期、4待审核、5待上传凭证、6支付成功、7支付关闭 */
  payStatus: number
  /** 支付时间 */
  payTime?: number
  /** 支付方式，0：支付宝，1：微信，2：线下支付 */
  payType?: number
  /** 客户所在省份编号 */
  province?: number
  /** 售后状态 0无售后 1售后中 2已售后 */
  refundStatus: number
  /** 备注 */
  remark?: string
  /** 业务线保留信息,用于关联交易中心订单:如报名记录编码、班级编码等 */
  reservedInfos?: ReservedInfo
  /** 站点 */
  sid: number
  /** 订单状态，1未支付、2支付待确认、3已支付、4已完成、5已关闭 */
  status: number
  /** 订单业务标签，枚举值：1创培，2职培，3院校，4线下，5考评 */
  tags: any[]
  /** 总额 */
  totalAmount: number
  /** 用户编码，个人、机构用户都必传 */
  userCode: string
}

/**
 * requestUrl /order/backend/sync_order
 * method post
 */
export interface SyncOrderUsingPOSTResponse {
  
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
 * requestUrl /order/backend/update_contract_order_end_time
 * method post
 */
export interface UpdateContractOrderEndTimeUsingPOSTRequest {
  
  /** 合同唯一编码 */
  contractCode?: string
  /** 合同到期时间 */
  contractEnd?: number
}

/**
 * requestUrl /order/backend/update_contract_order_end_time
 * method post
 */
export interface UpdateContractOrderEndTimeUsingPOSTResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface InDueStatByCustomer {
  
  /** 客户编码 */
  customerCode?: string
  /** 客户名称 */
  customerName?: string
  /** 待回款金额 */
  inDueAmount?: number
  /** 区域名称 */
  locationName?: string
  /** 订单数 */
  orderCount?: number
  /** 省份编码 */
  province?: number
  /** 排名 */
  rank?: number
  /** 销售金额 */
  saleAmount?: number
  /** 销售跟进人 */
  saleFollower?: SaleFollower
}

interface SaleFollower {
  
  /** 跟进人编码 */
  adminCode?: string
  /** 跟进人名称 */
  adminName?: string
}

/**
 * requestUrl /order/backend/stat/in_due_stat
 * method post
 */
export interface InDueStatUsingPOSTRequest {
  
  /** 查询结束时间 */
  endTime?: string
  /** 销售员所在省份编码，与客户编码任选其一传参 */
  provinces?: any[]
  /** 查询开始时间 */
  startTime?: string
  /** 业务标签 */
  tags?: any[]
}

/**
 * requestUrl /order/backend/stat/in_due_stat
 * method post
 */
export interface InDueStatUsingPOSTResponse {
  
  /** 响应数据 */
  data?: InDueStatByCustomer
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface OrderCountAndAmountStatDto {
  
  /** 待回款金额 */
  inDueAmount?: number
  /** 订单数 */
  orderCount?: number
  /** 销售金额 */
  saleAmount?: number
  /** 按省份统计时返回，订单创建数+销售金额数据 */
  statDataByProvince?: OrderCountAndAmountByProvinceStatDto
}

interface OrderCountAndAmountByProvinceStatDto {
  
  /** 订单数 */
  orderCount?: number
  /** 省份编码 */
  provinceCode?: number
  /** 省份名称 */
  provinceName?: string
  /** 销售金额 */
  saleAmount?: number
}

/**
 * requestUrl /order/backend/stat/order_count_and_amount_stat_for_market
 * method post
 */
export interface OrderCountAndAmountStatForMarketUsingPOSTRequest {
  
  /** 查询结束时间 */
  endTime?: string
  /** 销售员所在省份编码，与客户编码任选其一传参 */
  provinces?: any[]
  /** 查询开始时间 */
  startTime?: string
  /** 业务标签 */
  tags?: any[]
}

/**
 * requestUrl /order/backend/stat/order_count_and_amount_stat_for_market
 * method post
 */
export interface OrderCountAndAmountStatForMarketUsingPOSTResponse {
  
  /** 响应数据 */
  data?: OrderCountAndAmountStatDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /order/backend/stat/order_count_and_amount_stat_for_sale
 * method post
 */
export interface OrderCountAndAmountStatForSaleUsingPOSTRequest {
  
}

/**
 * requestUrl /order/backend/stat/order_count_and_amount_stat_for_sale
 * method post
 */
export interface OrderCountAndAmountStatForSaleUsingPOSTResponse {
  
  /** 响应数据 */
  data?: OrderCountAndAmountStatDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface OrderCountStatRespDto {
  
  /** 本月订单总数 */
  currentMonthCount?: number
  /** 本周订单总数 */
  currentWeekCount?: number
  /** 环比上月 */
  monthRatio?: number
  /** 环比上周 */
  weekRatio?: number
}

/**
 * requestUrl /order/backend/stat/order_count_stat
 * method post
 */
export interface OrderCountStatUsingPOSTRequest {
  
  /** 客户编码，与销售员所在省份编码任选其一传参 */
  customerCode?: string
  /** 查询结束时间 */
  endTime?: string
  /** 销售员所在省份编码，与客户编码任选其一传参 */
  provinces?: any[]
  /** 查询开始时间 */
  startTime?: string
}

/**
 * requestUrl /order/backend/stat/order_count_stat
 * method post
 */
export interface OrderCountStatUsingPOSTResponse {
  
  /** 响应数据 */
  data?: OrderCountStatRespDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface OrderCountStatByDayRespDto {
  
  /** 本周订单总数 */
  count?: number
  /** 日期 */
  day?: string
  /** 日期-周 */
  dayOfWeek?: string
}

/**
 * requestUrl /order/backend/stat/order_count_stat_by_day
 * method post
 */
export interface OrderCountStatByDayUsingPOSTRequest {
  
  /** 查询结束时间 */
  endTime?: string
  /** 销售员所在省份编码，与客户编码任选其一传参 */
  provinces?: any[]
  /** 查询开始时间 */
  startTime?: string
  /** 业务标签 */
  tags?: any[]
}

/**
 * requestUrl /order/backend/stat/order_count_stat_by_day
 * method post
 */
export interface OrderCountStatByDayUsingPOSTResponse {
  
  /** 响应数据 */
  data?: OrderCountStatByDayRespDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface OrderInDueAndSaleDto {
  
  /** 日期 */
  date?: string
  /** 日期中文名称 */
  dateName?: string
  /** 待回款金额 */
  inDueAmount?: number
  /** 销售金额 */
  saleAmount?: number
}

/**
 * requestUrl /order/backend/stat/order_in_due_and_sale_stat
 * method post
 */
export interface OrderInDueAndSaleStatUsingPOSTRequest {
  
  /** 查询结束时间 */
  endTime?: string
  /** 销售员所在省份编码，与客户编码任选其一传参 */
  provinces?: any[]
  /** 查询开始时间 */
  startTime?: string
  /** 业务标签 */
  tags?: any[]
}

/**
 * requestUrl /order/backend/stat/order_in_due_and_sale_stat
 * method post
 */
export interface OrderInDueAndSaleStatUsingPOSTResponse {
  
  /** 响应数据 */
  data?: OrderInDueAndSaleDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface OrderStatInYearDto {
  
  /** 待回款金额 */
  inDueAmount?: number
  /** 订单数 */
  orderCount?: number
  /** 年份 */
  year?: string
}

/**
 * requestUrl /order/backend/stat/order_stat_in_year
 * method post
 */
export interface OrderStatInYearUsingPOSTRequest {
  
}

/**
 * requestUrl /order/backend/stat/order_stat_in_year
 * method post
 */
export interface OrderStatInYearUsingPOSTResponse {
  
  /** 响应数据 */
  data?: OrderStatInYearDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BackendRepaymentRateDto {
  
  /** 回款率变化百分比 */
  changeRate?: number
  /** 回款率百分比 */
  rate?: number
}

/**
 * requestUrl /order/backend/stat/repayment_rate
 * method post
 */
export interface RepaymentRateUsingPOSTRequest {
  
  /** 客户编码，与销售员所在省份编码任选其一传参 */
  customerCode?: string
  /** 查询结束时间 */
  endTime?: string
  /** 销售员所在省份编码，与客户编码任选其一传参 */
  provinces?: any[]
  /** 查询开始时间 */
  startTime?: string
}

/**
 * requestUrl /order/backend/stat/repayment_rate
 * method post
 */
export interface RepaymentRateUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BackendRepaymentRateDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /order/backend/stat/sales_stat
 * method post
 */
export interface SalesStatUsingPOSTRequest {
  
  /** 客户编码，与销售员所在省份编码任选其一传参 */
  customerCode?: string
  /** 查询结束时间 */
  endTime?: string
  /** 销售员所在省份编码，与客户编码任选其一传参 */
  provinces?: any[]
  /** 查询开始时间 */
  startTime?: string
}

/**
 * requestUrl /order/backend/stat/sales_stat
 * method post
 */
export interface SalesStatUsingPOSTResponse {
  
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
 * requestUrl /order/backend/stat/stat_in_due_money
 * method post
 */
export interface StatInDueMoneyUsingPOSTRequest {
  
  /** 客户编码，与销售员所在省份编码任选其一传参 */
  customerCode?: string
  /** 查询结束时间 */
  endTime?: string
  /** 销售员所在省份编码，与客户编码任选其一传参 */
  provinces?: any[]
  /** 查询开始时间 */
  startTime?: string
}

/**
 * requestUrl /order/backend/stat/stat_in_due_money
 * method post
 */
export interface StatInDueMoneyUsingPOSTResponse {
  
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
 * requestUrl /order/backend/refund_order/apply
 * method post
 */
export interface ApplyForBackendUsingPOSTRequest {
  
  /** 商品编码 */
  goodsCode?: string
  /** 用户身份id */
  identity?: number
  /** 订单编码 */
  orderCode?: string
  /** 是否机构用户 */
  orgUser?: boolean
  /** 机构用户必填，售后单所属组织编码 */
  organizationCode?: string
  /** 退款商品数量 */
  refundCount?: number
  /** 退款原因 */
  refundReason?: string
  /** 业务保留字段，例如班级编码 */
  reservedCode: string
  /** 用户编码 */
  userCode: string
}

/**
 * requestUrl /order/backend/refund_order/apply
 * method post
 */
export interface ApplyForBackendUsingPOSTResponse {
  
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
 * requestUrl /order/backend/refund_order/audit
 * method post
 */
export interface RefundOrderAuditUsingPOSTRequest {
  
  /** 售后单ID */
  code?: string
  /** 售后单拒绝原因 */
  rejectReason?: string
  /** 售后单状态 1通过 3拒绝 */
  status?: number
}

/**
 * requestUrl /order/backend/refund_order/audit
 * method post
 */
export interface RefundOrderAuditUsingPOSTResponse {
  
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface RefundOrderDetailFeignRespDto {
  
  /**  */
  code?: string
  /**  */
  createdAt?: number
  /**  */
  createdBy?: string
  /**  */
  deleted?: boolean
  /**  */
  goodsCode?: string
  /**  */
  orderCode?: string
  /**  */
  payType?: number
  /**  */
  proofUrl?: string
  /**  */
  refundAmount?: number
  /**  */
  refundCount?: number
  /**  */
  refundReason?: string
  /**  */
  rejectReason?: string
  /**  */
  reservedCode?: string
  /**  */
  status?: number
  /**  */
  updatedAt?: number
  /**  */
  updatedBy?: string
}

/**
 * requestUrl /order/backend/refund_order/detail
 * method get
 */
export interface DetailUsingGET_1Response {
  
  /** 响应数据 */
  data?: RefundOrderDetailFeignRespDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 售后单列表对象 {
  
  /** 唯一编码 */
  code?: string
  /** 创建时间 */
  createdAt?: number
  /** 商品编号 */
  goodsCode?: string
  /** 订单编号 */
  orderCode?: string
  /** 退款金额 */
  refundAmount?: number
  /** 售后单状态 0待审核 1售后中 2已完成 3申请失败 */
  status?: number
}

/**
 * requestUrl /order/backend/refund_order/list_completed_by_order_codes
 * method get
 */
export interface ListCompletedByOrderCodesUsingGETResponse {
  
  /** 响应数据 */
  data?: 售后单列表对象
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BackendRefundBasicInfoDto {
  
  /** 唯一编码 */
  code?: string
  /** 创建时间 */
  createdAt?: number
  /** 支付方式，0：支付宝，1：微信，2：线下支付 */
  payType?: number
  /** 退款金额 */
  refundAmount?: number
  /** 退款数量 */
  refundCount?: number
  /** 站点id */
  sid?: number
  /** 站点名称 */
  siteName?: string
  /** 售后单状态 0待审核 1售后中 2已完成 3申请失败 */
  status?: number
}

/**
 * requestUrl /order/backend/refund_order/list_refund_basic_info
 * method get
 */
export interface ListRefundBasicInfoUsingGETResponse {
  
  /** 响应数据 */
  data?: BackendRefundBasicInfoDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface RefundOrder {
  
  /**  */
  auditTime?: number
  /**  */
  buyerType?: number
  /**  */
  code?: string
  /**  */
  createdAt?: number
  /**  */
  createdBy?: string
  /**  */
  deleted?: boolean
  /**  */
  errorReason?: string
  /**  */
  goodsCode?: string
  /**  */
  goodsName?: string
  /**  */
  identity?: number
  /**  */
  merchantIdentity?: number
  /**  */
  merchantOrgCode?: string
  /**  */
  orderCode?: string
  /**  */
  orderGoodsCode?: string
  /**  */
  orderNo?: string
  /**  */
  organizationCode?: string
  /**  */
  payType?: number
  /**  */
  proofUrl?: string
  /**  */
  province?: number
  /**  */
  refundAmount?: number
  /**  */
  refundByCount?: number
  /**  */
  refundCount?: number
  /**  */
  refundReason?: string
  /**  */
  rejectReason?: string
  /**  */
  reservedCode?: string
  /**  */
  sid?: number
  /**  */
  status?: number
  /**  */
  updatedAt?: number
  /**  */
  updatedBy?: string
  /**  */
  userCode?: string
}

/**
 * requestUrl /order/backend/refund_order/list_refund_order/{code}
 * method get
 */
export interface GetRefundOrderByOrderCodeUsingGETResponse {
  
  /** 响应数据 */
  data?: RefundOrder
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspBackendRefundOrderPageRespDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: BackendRefundOrderPageRespDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface BackendRefundOrderPageRespDto {
  
  /** 买家类型，1：个人，2：机构 */
  buyerType?: number
  /** 唯一编码 */
  code?: string
  /** 创建时间 */
  createdAt?: number
  /** 预留字段1 */
  ext1?: string
  /** 预留字段2 */
  ext2?: string
  /** 商品唯一编码 */
  goodsCode?: string
  /** 商品名称 */
  goodsName?: string
  /** 用户身份id */
  identity?: number
  /** 开票状态，0未开票，1已开票 */
  invoicingStatus?: number
  /** 订单商品所属商家编码 */
  merchantOrgCode?: string
  /** 订单编码 */
  orderCode?: string
  /** 商品订单唯一编码 */
  orderGoodsCode?: string
  /** 订单编号 */
  orderNo?: string
  /** 机构用户，售后单所属组织编码 */
  organizationCode?: string
  /** 支付方式，0：支付宝，1：微信，2：线下支付 */
  payType?: number
  /** 单价 */
  price?: number
  /** 应退金额 */
  refundAmount?: number
  /** 是否按照数量退款 */
  refundByCount?: number
  /** 退款数量 */
  refundCount?: number
  /** 退款原因 */
  refundReason?: string
  /** 站点 */
  sid?: number
  /** 站点名称 */
  siteName?: string
  /** 状态 0 待审核,1 售后中,2 已完成,3 申请失败 */
  status?: number
  /** 用户编码 */
  userCode?: string
}

/**
 * requestUrl /order/backend/refund_order/page
 * method post
 */
export interface RefundOrderPageUsingPOSTRequest {
  
  /** 售后单ID */
  code?: string
  /** 创建时间结束 */
  createdEnd?: string
  /** 创建时间开始 */
  createdStart?: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 订单ID */
  orderNo?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 支付方式，0：支付宝，1：微信，2：线下支付 */
  payType?: number
  /** 省份id数组 */
  provinces?: any[]
  /** 站点 */
  sid?: number
  /** 售后状态 0待审核 1售后中 2完成 3申请失败  */
  status?: number
  /** tag编号数组 */
  tags?: any[]
}

/**
 * requestUrl /order/backend/refund_order/page
 * method post
 */
export interface RefundOrderPageUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspBackendRefundOrderPageRespDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 退款单信息包装类 {
  
  /** 退款金额 */
  refundAmount?: number
  /** 售后单ID */
  refundCode?: string
  /** 退款信息 */
  refundDetailDto?: 交易流水
  /** 退款单状态 */
  refundStatus?: number
  /** 退款单状态名字 */
  refundStatusName?: string
  /** 退款类型：1线上退款，2线下退款 */
  refundType?: number
  /** 退款类型名称 */
  refundTypeName?: string
  /** 退款凭证 */
  refundVoucher?: string
}

/**
 * requestUrl /order/backend/refund_order/refund_record/{code}
 * method get
 */
export interface GetRefundRecordByRefundOrderCodeUsingGETResponse {
  
  /** 响应数据 */
  data?: 退款单信息包装类
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /order/backend/refund_order/refund_status
 * method post
 */
export interface RefundStatusUsingPOSTRequest {
  
  /** 售后单ID */
  code?: string
  /** 售后单状态 2, 已完成 */
  status?: number
}

/**
 * requestUrl /order/backend/refund_order/refund_status
 * method post
 */
export interface RefundStatusUsingPOSTResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 售后单详情 {
  
  /** 售后单id */
  code?: string
  /** 创建时间 */
  createdAt?: number
  /** 信用代码 */
  creditCode?: string
  /** 买家名称 */
  customerName?: string
  /** 退款商品 */
  goodsInfo?: 商品分页返回数据
  /** 开票类型0未开票1已开票 */
  invoiceStatus?: number
  /** 开票类型名字0未开票1已开票 */
  invoiceStatusName?: string
  /** 订单id */
  orderCode?: string
  /** 订单NO */
  orderNo?: string
  /** 支付方式，0：支付宝，1：微信，2：线下支付 */
  payType?: number
  /** 支付方式，0：支付宝，1：微信，2：线下支付 */
  payTypeName?: string
  /** 单价 */
  price?: number
  /** 退款凭证URL */
  proofUrl?: string
  /** 退款金额 */
  refundAmount?: number
  /** 退款数量 */
  refundCount?: number
  /** 退款记录 */
  refundDetailDto?: 交易流水
  /** 退款原因 */
  refundReason?: string
  /** 退款方式 线上退回、人工退回 */
  refundTypeName?: string
  /** 驳回原因 */
  rejectReason?: string
  /** 订单备注 */
  remark?: string
  /** 结算对象名称 */
  settleTargetName?: string
  /** 站点 */
  sid?: number
  /** 站点名称 */
  sidName?: string
  /** 状态 0 待审核,1 售后中,2 已完成,3 申请失败 */
  status?: number
  /** 状态名称 */
  statusName?: string
  /** 订单金额 */
  totalAmount?: number
}

interface 商品分页返回数据 {
  
  /** 代理商家编码 */
  agentMerchantCode?: string
  /** 代理商家编码 */
  agentMerchantName?: string
  /** 类目详情 */
  categoryList?: any[]
  /** 商品编码 */
  code?: string
  /** 创建时间 */
  createdAt?: number
  /** 优惠价 */
  discountPrice?: number
  /** 属性 */
  goodsAttributeList?: 商品属性数据
  /** 类目key */
  goodsCategoryAlias?: string
  /** 类目Id */
  goodsCategoryId?: number
  /** 商品主图 */
  imageUrl?: string
  /** 物料编码 */
  matterCode?: string
  /** 商家身份 */
  merchantIdentity?: number
  /** 商家名称 */
  merchantName?: string
  /** 商家编码 */
  merchantOrgCode?: string
  /** 商品名称 */
  name?: string
  /** 单价 */
  price?: number
  /**  推送方式：点播课：取推送方式  1普通推送  2代理推送，自有课/私有课：无 */
  pushMode?: number
  /** 数量 */
  quantity?: number
  /** 服务费比率 */
  serviceFeeRatio?: number
  /** 站点id */
  sid?: number
  /** 站点信息 */
  site?: 站点基本信息列表
  /** 状态 0 开启  1关闭  */
  status?: number
  /** 标签 */
  tagList?: 标签数据
  /** 税率 */
  taxRate?: number
  /** 商品类型 */
  type?: number
  /** 商品类型名称 */
  typeName?: number
}

interface 商品属性数据 {
  
  /** 属性编码 */
  attributeCode?: string
  /** 编码 */
  code?: string
  /** 是否必填 */
  isRequire?: boolean
  /** 名称 */
  name?: string
  /** 属性值 */
  value?: string
}

interface 站点基本信息列表 {
  
  /** 别名 */
  alias?: string
  /** 辅助信息+附加信息 */
  configList?: 站点保存请求体
  /** 站点id */
  id?: number
  /** 站点名称 */
  name?: string
  /** 站点简称 */
  shortName?: string
  /** 移动端域名 */
  wapDomain?: string
}

interface 站点保存请求体 {
  
  /** 描述 */
  description: string
  /** 配置key */
  key: string
  /** 配置值 */
  value: string
}

interface 标签数据 {
  
  /** id */
  id?: number
  /** 标题 */
  name?: string
  /** 类型 */
  type?: number
}

/**
 * requestUrl /order/backend/refund_order/summary/{code}
 * method get
 */
export interface RefundOrderSummaryUsingGETResponse {
  
  /** 响应数据 */
  data?: 售后单详情
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /order/backend/refund_order/upload_voucher
 * method post
 */
export interface UploadVoucherUsingPOSTRequest {
  
  /** 售后单ID */
  code?: string
  /** 退款凭证url */
  proofUrl?: string
}

/**
 * requestUrl /order/backend/refund_order/upload_voucher
 * method post
 */
export interface UploadVoucherUsingPOSTResponse {
  
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /order/front/base_info/{code}
 * method get
 */
export interface BaseInfoUsingGETResponse {
  
  /** 响应数据 */
  data?: 订单基本信息
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /order/front/cancel
 * method post
 */
export interface CancelUsingPOST_1Request {
  
  /** 唯一编码 */
  code: string
  /** 机构编码 */
  organizationCode: string
}

/**
 * requestUrl /order/front/cancel
 * method post
 */
export interface CancelUsingPOST_1Response {
  
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /order/front/check_order_for_blue_invoice
 * method post
 */
export interface CheckOrderForBlueInvoiceUsingPOSTRequest {
  
}

/**
 * requestUrl /order/front/check_order_for_blue_invoice
 * method post
 */
export interface CheckOrderForBlueInvoiceUsingPOSTResponse {
  
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
 * requestUrl /order/front/check_order_for_red_invoice
 * method post
 */
export interface CheckOrderForRedInvoiceUsingPOSTRequest {
  
}

/**
 * requestUrl /order/front/check_order_for_red_invoice
 * method post
 */
export interface CheckOrderForRedInvoiceUsingPOSTResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface OrderGoodsReqDto {
  
  /** 优惠价 */
  discountPrice?: number
  /** 商品编码 */
  goodsCode: string
  /** 商品原价 */
  price: number
  /** 购买数量 */
  quantity: number
}

/**
 * requestUrl /order/front/create
 * method post
 */
export interface CreateUsingPOST_1Request {
  
  /** 代理商编码 */
  agentCode?: string
  /** 买家类型，1：个人，2：机构 */
  buyerType: number
  /** 合同编码 */
  contractCode?: string
  /** 是否合同型订单，true(1)：是，false(0)：否 */
  contractOrder: number
  /** 合同订单预计支付时间-选填，到达预计支付时间未支付则逾期 */
  expectPayTime?: number
  /** 商品列表 */
  goodsList: OrderGoodsReqDto
  /** 用户身份 */
  identity: number
  /** 订单编号 */
  orderNo: string
  /** 机构用户必填，订单所属组织编码 */
  organizationCode?: string
  /** 备注 */
  remark?: string
  /** 总额 */
  totalAmount: number
}

/**
 * requestUrl /order/front/create
 * method post
 */
export interface CreateUsingPOST_1Response {
  
  /** 响应数据 */
  data?: string
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 买家订单详情数据 {
  
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
  goodsOrderList?: 买家商品订单
  /** 结算主体名称 */
  name?: string
  /** 订单编号 */
  orderNo?: string
  /** 订单支付状态：1未支付、2已延期、3已逾期、4待审核、5待上传凭证、6支付成功、7支付关闭 */
  payStatus?: number
  /** 支付时间 */
  payTime?: number
  /** 支付方式，0：支付宝，1：微信，2：线下支付 */
  payType?: number
  /** 支付记录 */
  payment?: 支付记录
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
  totalAmount?: number
  /** 用户编码 */
  userCode?: string
}

interface 买家商品订单 {
  
  /** 商品订单唯一编码 */
  code: string
  /** 优惠价 */
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

/**
 * requestUrl /order/front/detail_buyer
 * method post
 */
export interface FrontDetailForBuyerUsingPOSTRequest {
  
  /** 订单唯一编码 */
  code?: string
  /** 用户身份 */
  identity?: number
  /** 是否机构用户 */
  orgUser?: boolean
  /** 机构用户，订单所属组织编码 */
  organizationCode?: string
}

/**
 * requestUrl /order/front/detail_buyer
 * method post
 */
export interface FrontDetailForBuyerUsingPOSTResponse {
  
  /** 响应数据 */
  data?: 买家订单详情数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 订单详情数据 {
  
  /** 买家类型，1：个人，2：机构 */
  buyerType?: number
  /** 唯一编码 */
  code?: string
  /** 创建时间，下单时间 */
  createdAt?: number
  /** 商品订单列表 */
  goodsOrderList?: 商品订单
  /** 用户手机号（创建人手机号） */
  mobile?: string
  /** 订单编号 */
  orderNo?: string
  /** 机构用户，订单所属组织编码 */
  organizationCode?: string
  /** 机构名称 */
  organizationName?: string
  /** 订单支付状态：1未支付、2已延期、3已逾期、4待审核、5待上传凭证、6支付成功、7支付关闭 */
  payStatus?: number
  /** 支付时间 */
  payTime?: number
  /** 支付方式，0：支付宝，1：微信，2：线下支付 */
  payType?: number
  /** 备注 */
  remark?: string
  /** 站点 */
  sid?: number
  /** 订单状态，1未支付、2支付待确认、3已支付、4已完成、5已关闭 */
  status?: number
  /** 总额，支付待确认、已支付、已完成、已关闭+支付成功（payStatus） 显示 实付款 */
  totalAmount?: number
  /** 用户编码 */
  userCode?: string
  /** 用户名称（创建人） */
  userName?: string
}

/**
 * requestUrl /order/front/detail_merchant
 * method post
 */
export interface FrontDetailForMerchantUsingPOSTRequest {
  
  /** 订单唯一编码 */
  code?: string
  /** 用户身份 */
  identity?: number
  /** 商家组织编码 */
  merchantOrgCode?: string
}

/**
 * requestUrl /order/front/detail_merchant
 * method post
 */
export interface FrontDetailForMerchantUsingPOSTResponse {
  
  /** 响应数据 */
  data?: 订单详情数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /order/front/get_order_no
 * method get
 */
export interface GetOrderNoUsingGETResponse {
  
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
 * requestUrl /order/front/modify_remark
 * method post
 */
export interface ModifyRemarkUsingPOSTRequest {
  
  /** 唯一编码 */
  code: string
  /** 备注 */
  remark?: string
}

/**
 * requestUrl /order/front/modify_remark
 * method post
 */
export interface ModifyRemarkUsingPOSTResponse {
  
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /order/front/paid
 * method post
 */
export interface PaidUsingPOSTRequest {
  
  /** 订单编码 */
  code?: string
  /** 支付时间 */
  payTime?: number
  /** 支付方式，0：支付宝，1：微信，2：线下支付 */
  payType?: number
}

/**
 * requestUrl /order/front/paid
 * method post
 */
export interface PaidUsingPOSTResponse {
  
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
 * requestUrl /order/front/refund_order/apply
 * method post
 */
export interface ApplyForFrontUsingPOSTRequest {
  
  /** 商品编码 */
  goodsCode?: string
  /** 用户身份id */
  identity?: number
  /** 订单编号 */
  orderCode?: string
  /** 商品订单唯一编码 */
  orderGoodsCode?: string
  /** 是否机构用户 */
  orgUser?: boolean
  /** 机构用户必填，售后单所属组织编码 */
  organizationCode?: string
  /** 退款金额 */
  refundAmount?: number
  /** 退款商品数量 */
  refundCount?: number
  /** 退款原因 */
  refundReason?: string
}

/**
 * requestUrl /order/front/refund_order/apply
 * method post
 */
export interface ApplyForFrontUsingPOSTResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BuyerRefundOrderDetailDto {
  
  /** 退款目标账户 */
  account?: string
  /** 审核时间 */
  auditTime?: number
  /** 售后单编号 */
  code?: string
  /** 创建时间 */
  createdAt?: number
  /** 退款失败原因 */
  errorReason?: string
  /** 商品订单 */
  goodsOrder?: 买家商品订单
  /** 订单编码 */
  orderCode?: string
  /** 订单创建时间 */
  orderCreatedAt?: number
  /** 订单编号 */
  orderNo?: string
  /** 支付时间 */
  payTime?: number
  /** 支付方式，0：支付宝，1：微信，2：线下支付 */
  payType?: number
  /** 退款凭证url */
  proofUrl?: string
  /** 退款金额 */
  refundAmount?: number
  /** 退款数量 */
  refundCount?: number
  /** 退款原因 */
  refundReason?: string
  /** 驳回原因 */
  rejectReason?: string
  /** 售后单状态 0待审核 1售后中 2已完成 3申请失败 */
  status?: number
  /** 更新时间-完成时间 */
  updatedAt?: number
}

/**
 * requestUrl /order/front/refund_order/detail
 * method get
 */
export interface DetailUsingGET_2Response {
  
  /** 响应数据 */
  data?: BuyerRefundOrderDetailDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}