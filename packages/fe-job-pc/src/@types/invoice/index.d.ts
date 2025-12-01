
/**
 * 如果遇到bug，您可以钉钉搜索封东其或者给 fengdongqi@hzwotu.com 邮箱发邮件
 * 欢迎大家提 issue 或者 PR。
 * @title 沃土发票服务
 * @description 沃土发票服务是一个 Spring Boot项目
 * @version v1.0
 **/


/**
 * requestUrl /invoice/backend/audit
 * method post
 */
export interface AuditUsingPOSTRequest {
  
  /** 唯一编码 */
  code: string
  /** 驳回原因 */
  rejectReason?: string
  /** 开票状态，1：待审核、2：待开票、3：已驳回、4：已开票 */
  status: number
}

/**
 * requestUrl /invoice/backend/audit
 * method post
 */
export interface AuditUsingPOSTResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 发票详细返回对象 {
  
  /** 收件邮寄地址 */
  address?: string
  /** 开票金额 */
  amount?: number
  /** 企业抬头-银行账号 */
  bankAccount?: string
  /** 买家名称 */
  buyerName?: string
  /** 唯一编码 */
  code?: string
  /** 申请时间 */
  createAt?: number
  /** 电子发票接收邮箱 */
  email?: string
  /** 个人抬头-身份证号 */
  idCard?: string
  /** 发票代码 */
  invoiceMark?: string
  /** 申请编号 */
  invoiceNo?: string
  /** 发票号码 */
  invoiceNumber?: string
  /** 开票时间 */
  invoiceTime?: number
  /** 发票类型，1：普通发票、2：增值税专用发票 */
  invoiceType?: string
  /** 开票附件url */
  invoiceUrl?: string
  /** 红蓝票类型 */
  makeType?: number
  /** 收件联系人 */
  name?: string
  /** 企业抬头-开户行 */
  openningBank?: string
  /** 订单总额 */
  orderAmount?: number
  /** 订单编号和订单编码对象数组，name为订单编号，value为订单编码 */
  orderNoAndCodeList?: 键值对返回对象stringstring
  /** 收件人联系电话 */
  phone?: string
  /** 驳回原因 */
  rejectReason?: string
  /** 开票状态，1：待审核、2：待开票、3：已驳回、4：已开票 */
  status?: number
  /** 企业抬头-税号 */
  taxNum?: string
  /** 地址 */
  titleAddress?: string
  /** 抬头名称 */
  titleName?: string
  /** 姓名 */
  titlePersonName?: string
  /** 电话 */
  titlePhone?: string
  /** 抬头类型，1：企业、2：个人 */
  titleType?: number
  /** 抬头类型描述 */
  titleTypeDesc?: string
  /** 物流单号 */
  trackingNo?: string
}

interface 键值对返回对象stringstring {
  
  /** 名称 */
  name?: string
  /** 值 */
  value?: string
}

/**
 * requestUrl /invoice/backend/blue_detail/{code}
 * method get
 */
export interface BlueDetailUsingGETResponse {
  
  /** 响应数据 */
  data?: 发票详细返回对象
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 键值对返回对象stringboolean {
  
  /** 名称 */
  name?: string
  /** 值 */
  value?: boolean
}

/**
 * requestUrl /invoice/backend/feign/check_for_invoice
 * method post
 */
export interface CheckForInvoiceUsingPOSTRequest {
  
}

/**
 * requestUrl /invoice/backend/feign/check_for_invoice
 * method post
 */
export interface CheckForInvoiceUsingPOSTResponse {
  
  /** 响应数据 */
  data?: 键值对返回对象stringboolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRsp发票分页列表返回对象 {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: 发票分页列表返回对象
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface 发票分页列表返回对象 {
  
  /** 开票金额 */
  amount?: number
  /** 蓝票唯一编码 */
  blueCode?: string
  /** 唯一编码 */
  code?: string
  /** 申请编号 */
  invoiceNo?: string
  /** 开票时间 */
  invoiceTime?: number
  /** 开票类型，1：普通发票、2：增值税专用发票 */
  invoiceType?: number
  /** 开票类别，1：蓝票，2：红票 */
  makeType?: number
  /** 个人抬头-姓名 */
  name?: string
  /** 开票状态，1：待审核、2：待开票、3：已驳回、4：已开票 */
  status?: number
  /** 抬头名称 */
  titleName?: string
  /** 抬头类型，1：企业、2：个人 */
  titleType?: number
}

/**
 * requestUrl /invoice/backend/feign/getInvoicingByUserCode
 * method post
 */
export interface GetInvoicingByUserCodesUsingPOSTRequest {
  
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /**  */
  userCode?: string
}

/**
 * requestUrl /invoice/backend/feign/getInvoicingByUserCode
 * method post
 */
export interface GetInvoicingByUserCodesUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRsp发票分页列表返回对象
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /invoice/backend/make_invoice
 * method post
 */
export interface MakeInvoiceUsingPOSTRequest {
  
  /** 发票唯一编码 */
  code?: string
  /** 发票代码 */
  invoiceMark: string
  /** 发票号码 */
  invoiceNumber: string
  /** 电子发票地址 */
  invoiceUrl?: string
  /** 发货物流单号 */
  trackingNo?: string
}

/**
 * requestUrl /invoice/backend/make_invoice
 * method post
 */
export interface MakeInvoiceUsingPOSTResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 红票详情返回对象 {
  
  /** 收件邮寄地址 */
  address?: string
  /** 开票金额 */
  amount?: number
  /** 寄回物流单号 */
  backTrackingNo?: string
  /** 买家名称 */
  buyerName?: string
  /** 唯一编码 */
  code?: string
  /** 申请时间 */
  createAt?: number
  /** 电子发票接收邮箱 */
  email?: string
  /** 发票代码 */
  invoiceMark?: string
  /** 申请编号 */
  invoiceNo?: string
  /** 发票号码 */
  invoiceNumber?: string
  /** 开票时间 */
  invoiceTime?: number
  /** 发票类型，1：普通发票、2：增值税专用发票 */
  invoiceType?: string
  /** 开票附件url */
  invoiceUrl?: string
  /** 收件联系人 */
  name?: string
  /** 订单总额 */
  orderAmount?: number
  /**  */
  orderNoAndCodeList?: 键值对返回对象stringstring
  /** 收件人联系电话 */
  phone?: string
  /** 红票关联的售后单编码 */
  refundCode?: string
  /** 驳回原因 */
  rejectReason?: string
  /** 开票状态，1：待审核、2：待开票、3：已驳回、4：已开票 */
  status?: number
  /** 物流单号 */
  trackingNo?: string
}

/**
 * requestUrl /invoice/backend/red_detail/{code}
 * method get
 */
export interface RedDetailUsingGETResponse {
  
  /** 响应数据 */
  data?: 红票详情返回对象
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /invoice/front/apply_blue
 * method post
 */
export interface ApplyBlueUsingPOSTRequest {
  
  /** 收件地址 */
  address?: string
  /** 邮箱 */
  email?: string
  /** 用户身份 */
  identity?: number
  /** 开票类型，1：普通发票、2：增值税专用发票 */
  invoiceType: number
  /** 联系人 */
  name?: string
  /** 需开发票的订单编码数组 */
  orderCodeList: any[]
  /** 是否机构用户 */
  orgUser?: boolean
  /** 机构用户，订单所属组织编码 */
  organizationCode?: string
  /** 联系电话 */
  phone?: string
  /** 抬头编码 */
  titleCode: string
}

/**
 * requestUrl /invoice/front/apply_blue
 * method post
 */
export interface ApplyBlueUsingPOSTResponse {
  
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
 * requestUrl /invoice/front/apply_red
 * method post
 */
export interface ApplyRedUsingPOSTRequest {
  
  /** 寄回物流单号 */
  backTrackingNo?: string
  /** 用户身份 */
  identity?: number
  /** 发票代码 */
  invoiceMark: string
  /** 发票号码 */
  invoiceNumber: string
  /** 开票类型，1：普通发票、2：增值税专用发票 */
  invoiceType: number
  /** 是否机构用户 */
  orgUser?: boolean
  /** 机构用户，订单所属组织编码 */
  organizationCode?: string
  /** 售后单编码 */
  refundOrderCode: string
}

/**
 * requestUrl /invoice/front/apply_red
 * method post
 */
export interface ApplyRedUsingPOSTResponse {
  
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
 * requestUrl /invoice/front/blue_detail/{code}
 * method get
 */
export interface BlueDetailUsingGET_1Response {
  
  /** 响应数据 */
  data?: 发票详细返回对象
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 蓝票基本信息返回对象 {
  
  /** 专票-收件地址 */
  address?: string
  /** 开票金额 */
  amount?: number
  /** 寄回物流单号 */
  backTrackingNo?: string
  /** 红票所属蓝票编码 */
  blueCode?: string
  /** 唯一编码 */
  code?: string
  /** 发票接收邮箱 */
  email?: string
  /** 发票代码 */
  invoiceMark?: string
  /** 发票编号 */
  invoiceNo?: string
  /** 发票号码 */
  invoiceNumber?: string
  /** 开票时间 */
  invoiceTime?: number
  /** 开票类型，1：普通发票、2：增值税专用发票 */
  invoiceType?: number
  /** 开票附件url */
  invoiceUrl?: string
  /** 开票类别，1：蓝票，2：红票 */
  makeType?: number
  /** 专票收件人 */
  name?: string
  /** 专票-联系电话 */
  phone?: string
  /** 驳回原因 */
  rejectReason?: string
  /** 开票状态，1：待审核、2：待开票、3：已驳回、4：已开票 */
  status?: number
  /** 物流单号 */
  trackingNo?: string
  /** 用户编码 */
  userCode?: string
}

/**
 * requestUrl /invoice/front/blue_detail_by_order_code
 * method get
 */
export interface BlueDetailByOrderCodeUsingGETResponse {
  
  /** 响应数据 */
  data?: 蓝票基本信息返回对象
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /invoice/front/red_detail/{code}
 * method get
 */
export interface RedDetailUsingGET_1Response {
  
  /** 响应数据 */
  data?: 红票详情返回对象
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /invoice/backend/invoice_config/delete
 * method post
 */
export interface DeleteInvoiceConfigUsingPOSTResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface InvoiceConfigDetailDto {
  
  /** 诺诺发票-应用key */
  appKey?: string
  /** 诺诺发票-应用密码 */
  appSecret?: string
  /** 结算主体编码 */
  settleTargetCode?: string
  /** 税号 */
  taxNum?: string
}

/**
 * requestUrl /invoice/backend/invoice_config/get_by_settlement
 * method get
 */
export interface GetBySettlementUsingGETResponse {
  
  /** 响应数据 */
  data?: InvoiceConfigDetailDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /invoice/backend/invoice_config/save
 * method post
 */
export interface SaveOrUpdateUsingPOSTRequest {
  
  /** 诺诺发票-应用key */
  appKey?: string
  /** 诺诺发票-应用密码 */
  appSecret?: string
  /** 结算主体编码 */
  settleTargetCode?: string
  /** 税号 */
  taxNum?: string
}

/**
 * requestUrl /invoice/backend/invoice_config/save
 * method post
 */
export interface SaveOrUpdateUsingPOSTResponse {
  
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
 * requestUrl /invoice/notify/apply
 * method post
 */
export interface ApplyNotifyUsingPOSTResponse {
  
  /**  */
  message?: string
  /**  */
  status?: string
}

/**
 * requestUrl /invoice/front/title/delete
 * method post
 */
export interface DeleteUsingPOSTResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 抬头详情返回对象 {
  
  /** 地址 */
  address?: string
  /** 银行账号 */
  bankAccount?: string
  /** 唯一编码 */
  code?: string
  /** 创建时间 */
  createdAt?: number
  /** 创建人 */
  createdBy?: string
  /** 身份证号 */
  idCard?: string
  /** 姓名 */
  name?: string
  /** 开户行 */
  openningBank?: string
  /** 电话 */
  phone?: string
  /** 税号 */
  taxNum?: string
  /** 抬头名称 */
  titleName?: string
  /** 抬头类型，1：企业，2：个人 */
  type?: number
  /** 更新时间 */
  updatedAt?: number
  /** 更新者 */
  updatedBy?: string
  /** 用户编码 */
  userCode?: string
}

/**
 * requestUrl /invoice/front/title/detail
 * method get
 */
export interface DetailUsingGETResponse {
  
  /** 响应数据 */
  data?: 抬头详情返回对象
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /invoice/front/title/insert
 * method post
 */
export interface InsertUsingPOSTRequest {
  
  /** 地址 */
  address?: string
  /** 银行账号 */
  bankAccount?: string
  /** 身份证号 */
  idCard?: string
  /** 姓名 */
  name?: string
  /** 开户行 */
  openningBank?: string
  /** 电话 */
  phone?: string
  /** 税号 */
  taxNum?: string
  /** 抬头名称 */
  titleName?: string
  /** 抬头类型，1：企业，2：个人 */
  type?: number
  /** 用户编码 */
  userCode?: string
}

/**
 * requestUrl /invoice/front/title/insert
 * method post
 */
export interface InsertUsingPOSTResponse {
  
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
 * requestUrl /invoice/front/title/update
 * method post
 */
export interface UpdateUsingPOSTRequest {
  
  /** 地址 */
  address?: string
  /** 银行账号 */
  bankAccount?: string
  /** 唯一编码 */
  code?: string
  /** 身份证号 */
  idCard?: string
  /** 姓名 */
  name?: string
  /** 开户行 */
  openningBank?: string
  /** 电话 */
  phone?: string
  /** 税号 */
  taxNum?: string
  /** 抬头名称 */
  titleName?: string
}

/**
 * requestUrl /invoice/front/title/update
 * method post
 */
export interface UpdateUsingPOSTResponse {
  
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
 * requestUrl /invoice/lock/initStock
 * method get
 */
export interface InitStockUsingGETResponse {
  
}

/**
 * requestUrl /invoice/lock/secKill
 * method get
 */
export interface SecKillUsingGETResponse {
  
  /** 响应数据 */
  data?: number
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}