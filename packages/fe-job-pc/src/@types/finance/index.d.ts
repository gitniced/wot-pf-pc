
/**
 * 如果遇到bug，您可以钉钉搜索封东其或者给 fengdongqi@hzwotu.com 邮箱发邮件
 * 欢迎大家提 issue 或者 PR。
 * @title 业财API文档
 * @description 业财是一个 Spring Boot项目
 * @version v1.0
 **/


/**
 * requestUrl /finance/attached_contract/delete
 * method post
 */
export interface DeleteAttachedContractUsingPOSTRequest {
  
  /** code */
  code?: string
}

/**
 * requestUrl /finance/attached_contract/delete
 * method post
 */
export interface DeleteAttachedContractUsingPOSTResponse {
  
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface AttachedContractPageResponseDto {
  
  /**  协议编号 */
  attachedNo: string
  /** 编码 */
  code?: string
  /**  主协议编码 */
  contractCode: string
  /**  客户编码 */
  customerCode: string
  /**  结束时间 */
  endTime: number
  /**  协议原件 */
  fileUrl: string
  /**  分成比率 */
  sharePercent: number
  /**  签订站点 */
  sid: number
  /**  签订时间 */
  signAt: number
  /**  站点名称 */
  siteName: string
  /**  开始时间 */
  startTime: number
  /**  协议名称 */
  title: string
}

/**
 * requestUrl /finance/attached_contract/detail/{code}
 * method get
 */
export interface DetailUsingGETResponse {
  
  /** 响应数据 */
  data?: AttachedContractPageResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /finance/attached_contract/org_attached_contract
 * method post
 */
export interface GetOrgAttachedContractListUsingPOSTRequest {
  
  /** 组织编码 */
  organizationCode: string
}

/**
 * requestUrl /finance/attached_contract/org_attached_contract
 * method post
 */
export interface GetOrgAttachedContractListUsingPOSTResponse {
  
  /** 响应数据 */
  data?: AttachedContractPageResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspAttachedContractPageResponseDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: AttachedContractPageResponseDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

/**
 * requestUrl /finance/attached_contract/page
 * method post
 */
export interface PageUsingPOSTRequest {
  
  /**  主协议编码 */
  contractCode: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
}

/**
 * requestUrl /finance/attached_contract/page
 * method post
 */
export interface PageUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspAttachedContractPageResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /finance/attached_contract/save
 * method post
 */
export interface SaveAttachedContractUsingPOSTRequest {
  
  /**  协议编号 */
  attachedNo: string
  /** 编码 */
  code?: string
  /**  主协议编码 */
  contractCode: string
  /**  客户编码 */
  customerCode: string
  /**  结束时间 */
  endTime: number
  /**  协议原件 */
  fileUrl: string
  /**  分成比率 */
  sharePercent: number
  /**  签订站点 */
  sid: number
  /**  签订时间 */
  signAt: number
  /**  开始时间 */
  startTime: number
  /**  协议名称 */
  title: string
}

/**
 * requestUrl /finance/attached_contract/save
 * method post
 */
export interface SaveAttachedContractUsingPOSTResponse {
  
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /finance/contact/create
 * method post
 */
export interface CreateContactUsingPOSTRequest {
  
  /** 客户联系人code */
  code?: string
  /** 客户id */
  customerCode: string
  /** 邮箱地址 */
  email?: string
  /** 联系人手机号 */
  mobile: string
  /** 联系人 */
  name: string
  /** 职务 */
  post?: string
  /** 角色/备注 */
  role?: string
}

/**
 * requestUrl /finance/contact/create
 * method post
 */
export interface CreateContactUsingPOSTResponse {
  
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
 * requestUrl /finance/contact/delete/{contactCode}
 * method post
 */
export interface DeleteContactUsingPOSTResponse {
  
  /** 响应数据 */
  data?: Record<string | number | symbol, any>
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 客户联系人requestresp {
  
  /** 客户联系人code */
  code?: string
  /** 客户id */
  customerCode: string
  /** 邮箱地址 */
  email?: string
  /** 联系人手机号 */
  mobile: string
  /** 联系人 */
  name: string
  /** 职务 */
  post?: string
  /** 角色/备注 */
  role?: string
}

/**
 * requestUrl /finance/contact/list/{customerCode}
 * method get
 */
export interface GetContactUsingGETResponse {
  
  /** 响应数据 */
  data?: 客户联系人requestresp
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRsp客户联系人requestresp {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: 客户联系人requestresp
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

/**
 * requestUrl /finance/contact/page
 * method post
 */
export interface GetAllCustomerPageUsingPOSTRequest {
  
  /** 是否全部联系人 0否  1是 */
  all?: number
  /**  */
  customerCode?: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
}

/**
 * requestUrl /finance/contact/page
 * method post
 */
export interface GetAllCustomerPageUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRsp客户联系人requestresp
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /finance/contact/update
 * method post
 */
export interface UpdateContactUsingPOSTRequest {
  
  /** 客户联系人code */
  code?: string
  /** 客户id */
  customerCode: string
  /** 邮箱地址 */
  email?: string
  /** 联系人手机号 */
  mobile: string
  /** 联系人 */
  name: string
  /** 职务 */
  post?: string
  /** 角色/备注 */
  role?: string
}

/**
 * requestUrl /finance/contact/update
 * method post
 */
export interface UpdateContactUsingPOSTResponse {
  
  /** 响应数据 */
  data?: 客户联系人requestresp
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /finance/contract/add_attachment
 * method post
 */
export interface AddAttachmentUsingPOSTRequest {
  
  /** 合同编码 */
  contractCode: string
  /** 描述 */
  description?: string
  /** 哈希值 */
  hash: string
  /** 文件名 */
  name: string
  /** 文件大小 */
  size: number
  /** 文件地址 */
  url: string
}

/**
 * requestUrl /finance/contract/add_attachment
 * method post
 */
export interface AddAttachmentUsingPOSTResponse {
  
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
 * requestUrl /finance/contract/add_goods
 * method post
 */
export interface AddGoodsUsingPOSTRequest {
  
  /** 合同编码 */
  contractCode: string
  /** 新增的商品编码 */
  goodsCodes: any[]
}

/**
 * requestUrl /finance/contract/add_goods
 * method post
 */
export interface AddGoodsUsingPOSTResponse {
  
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
 * requestUrl /finance/contract/add_remark
 * method post
 */
export interface AddRemarkUsingPOSTRequest {
  
  /** 内容 */
  content: string
  /** 合同编码 */
  contractCode: string
  /** 备注标题 */
  title: string
}

/**
 * requestUrl /finance/contract/add_remark
 * method post
 */
export interface AddRemarkUsingPOSTResponse {
  
  /** 响应数据 */
  data?: Record<string | number | symbol, any>
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRsp合同附件相应数据 {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: 合同附件相应数据
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface 合同附件相应数据 {
  
  /** 附件编码 */
  code?: string
  /** 上传时间 */
  createdAt?: number
  /** 上传者编码 */
  createdBy?: string
  /** 上传者姓名 */
  createdByName?: string
  /** 描述 */
  description?: string
  /** 附件名 */
  name?: string
  /** 大小 */
  size?: number
  /** url */
  url?: string
}

/**
 * requestUrl /finance/contract/contract_attachment
 * method post
 */
export interface ContractAttachmentUsingPOSTRequest {
  
  /** 合同编码 */
  contractCode?: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
}

/**
 * requestUrl /finance/contract/contract_attachment
 * method post
 */
export interface ContractAttachmentUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRsp合同附件相应数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRsp合同备注返回数据 {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: 合同备注返回数据
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface 合同备注返回数据 {
  
  /** 备注编码 */
  code?: string
  /** 备注内容 */
  content?: string
  /** 创建时间 */
  createdAt?: number
  /** 填写人编码 */
  createdBy?: string
  /** 填写人姓名 */
  createdByName?: string
  /** 备注标题 */
  title?: string
}

/**
 * requestUrl /finance/contract/contract_remark
 * method post
 */
export interface ContractRemarkUsingPOSTRequest {
  
  /** 合同编码 */
  contractCode?: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
}

/**
 * requestUrl /finance/contract/contract_remark
 * method post
 */
export interface ContractRemarkUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRsp合同备注返回数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /finance/contract/create
 * method post
 */
export interface CreateUsingPOSTRequest {
  
  /** 区域市 */
  city: string
  /** 合同有效期 */
  contractEnd?: number
  /** 合同编号 */
  contractNo: string
  /** 签订日期 */
  contractStart: number
  /** 客户编码 */
  customerCode: string
  /** 交付验收时间 */
  deliverTime?: number
  /** 商品编码 */
  goodsCodes?: any[]
  /** 甲方(结算主体名称) */
  partyA: string
  /** 甲方签字人 */
  partyASign: string
  /** 乙方（客户名称） */
  partyB: string
  /** 乙方签字人 */
  partyBSign: string
  /** 合作优惠 */
  preferential?: number
  /** 区域省 */
  province: string
  /** 负责跟进人员编码 */
  saleCode: any[]
  /** 服务周期结束时间 */
  serviceEnd?: number
  /** 服务周期开始时间 */
  serviceStart?: number
  /** 结算标准，1开班人数，2合格人数，3考评人数，4理论合格人数，5补贴人数 */
  settleStandard?: string
  /** 结算主体 */
  settleTarget: string
  /** 结算方式，1按班结算，2按月结算，3按季结算，4半年结算，5一年结算 */
  settleType?: number
  /** 分成比例 */
  sharePercent?: number
  /** 站点 */
  sid?: number
  /** 标签 */
  tags: any[]
  /** 合同名称 */
  title: string
  /** 合同类型 */
  type: number
  /** 合作单价 */
  unitPrice?: number
}

/**
 * requestUrl /finance/contract/create
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

interface 合同客户信息数据 {
  
  /** 市编码 */
  city?: string
  /** 区域-市名称 */
  cityName?: string
  /** 客户编码 */
  code?: string
  /** 联系人电话 */
  contactMobile?: string
  /** 联系人 */
  contactName?: string
  /** 联系人职务 */
  contactPost?: string
  /** 客户标签 */
  customerTagName?: any[]
  /** 隐藏状态 false正常  true隐藏 */
  deleted?: boolean
  /** 客户等级 */
  level?: number
  /** 客户等级名称 */
  levelName?: string
  /** 客户名称 */
  name?: string
  /** 省编码 */
  province?: string
  /** 区域-省名称 */
  provinceName?: string
  /** 负责跟进人 */
  saleName?: any[]
  /** 标签 */
  tagName?: any[]
  /** 客户类型   1销售客户  2供应商 */
  typeList?: any[]
}

/**
 * requestUrl /finance/contract/customer/{contractCode}
 * method get
 */
export interface CustomerUsingGETResponse {
  
  /** 响应数据 */
  data?: 合同客户信息数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /finance/contract/db2es
 * method get
 */
export interface Sync2esUsingGETResponse {
  
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
 * requestUrl /finance/contract/delete_attachment/{attachmentCode}
 * method post
 */
export interface DeleteRemarkUsingPOST_1Response {
  
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
 * requestUrl /finance/contract/delete_goods
 * method post
 */
export interface DeleteGoodsUsingPOSTRequest {
  
  /** 合同编码 */
  contractCode: string
  /** 商品编码 */
  goodsCode: string
}

/**
 * requestUrl /finance/contract/delete_goods
 * method post
 */
export interface DeleteGoodsUsingPOSTResponse {
  
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
 * requestUrl /finance/contract/delete_remark/{remarkCode}
 * method post
 */
export interface DeleteRemarkUsingPOSTResponse {
  
  /** 响应数据 */
  data?: Record<string | number | symbol, any>
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 合同详情_概览 {
  
  /** 区域市 */
  city?: number
  /** 区域市名称 */
  cityName?: string
  /** 编码 */
  code?: string
  /** 合同有效期 */
  contractEnd?: number
  /** 合同编号 */
  contractNo?: string
  /** 签订日期 */
  contractStart?: number
  /** 客户编码 */
  customerCode?: string
  /** 交付/验收时间 */
  deliverTime?: number
  /** 甲方名称code */
  partACode?: string
  /** 甲方名称(结算主体) */
  partyA?: string
  /** 甲方签字人 */
  partyASign?: string
  /** 乙方(结算主体) */
  partyB?: string
  /** 乙方签字人 */
  partyBSign?: string
  /** 分成优惠 */
  preferential?: number
  /** 区域省 */
  province?: number
  /** 区域省名称 */
  provinceName?: string
  /** 关联商品编码 */
  relatedGoodsCodes?: any[]
  /** 销售负责人编码 */
  saleCode?: any[]
  /** 销售负责人 */
  saleName?: AdminPageDto
  /** 服务周期 结束 */
  serviceEnd?: number
  /** 服务周期 开始 */
  serviceStart?: number
  /** 结算标准 */
  settleStandard?: string
  /** 结算标准 */
  settleStandardName?: string
  /** 结算方式 */
  settleType?: number
  /** 结算方式 名称 */
  settleTypeName?: string
  /** 分成比例 */
  sharePercent?: number
  /** 站点id */
  sid?: number
  /** 站点 */
  siteName?: string
  /** 标签id */
  tagId?: any[]
  /** 标签名称 */
  tagName?: 标签数据
  /** 合同名称 */
  title?: string
  /** 合同类型 */
  type?: number
  /** 合同类型名称 */
  typeName?: string
  /** 合作单价 */
  unitPrice?: number
}

interface AdminPageDto {
  
  /**  */
  avatar?: string
  /**  */
  code?: string
  /**  */
  mobile?: string
  /**  */
  name?: string
  /**  */
  roleName?: string
  /**  */
  status?: number
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
 * requestUrl /finance/contract/detail/{contractCode}
 * method get
 */
export interface DetailUsingGET_1Response {
  
  /** 响应数据 */
  data?: 合同详情_概览
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /finance/contract/edit
 * method post
 */
export interface EditUsingPOSTRequest {
  
  /** 区域市 */
  city: string
  /** 合同编码 */
  code: string
  /** 合同有效期 */
  contractEnd: number
  /** 合同编号 */
  contractNo: string
  /** 签订日期 */
  contractStart: number
  /** 客户编码 */
  customerCode: string
  /** 交付验收时间 */
  deliverTime: number
  /** 商品编码 */
  goodsCodes?: any[]
  /** 甲方编码(结算主体) */
  partyA: string
  /** 甲方签字人 */
  partyASign: string
  /** 乙方编码(结算主体) */
  partyB: string
  /** 乙方签字人 */
  partyBSign: string
  /** 合作优惠 */
  preferential: number
  /** 区域省 */
  province: string
  /** 负责跟进人员编码 */
  saleCode: any[]
  /** 服务周期结束时间 */
  serviceEnd: number
  /** 服务周期开始时间 */
  serviceStart: number
  /** 结算标准 */
  settleStandard: string
  /** 结算主体 */
  settleTarget: string
  /** 结算方式 */
  settleType: number
  /** 分成比例 */
  sharePercent: number
  /** 站点 */
  sid?: number
  /** 标签 */
  tags: any[]
  /** 合同名称 */
  title: string
  /** 合同类型 */
  type: number
  /** 合作单价 */
  unitPrice: number
}

/**
 * requestUrl /finance/contract/edit
 * method post
 */
export interface EditUsingPOSTResponse {
  
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
 * requestUrl /finance/contract/edit_remark
 * method post
 */
export interface EditRemarkUsingPOSTRequest {
  
  /** 备注编码 */
  code: string
  /** 内容 */
  content: string
  /** 备注标题 */
  title: string
}

/**
 * requestUrl /finance/contract/edit_remark
 * method post
 */
export interface EditRemarkUsingPOSTResponse {
  
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
 * requestUrl /finance/contract/feign_order/getcontract/{orderCode}
 * method get
 */
export interface GetContractByOrderCodeUsingGETResponse {
  
  /** 响应数据 */
  data?: 合同详情_概览
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
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
  /** 门户h5 URL */
  portalH5Url?: string
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

/**
 * requestUrl /finance/contract/goods_list/{contractCode}
 * method get
 */
export interface GoodsListUsingGETResponse {
  
  /** 响应数据 */
  data?: 商品分页返回数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
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

/**
 * requestUrl /finance/contract/list_base_info
 * method post
 */
export interface ListBaseInfoByCodesUsingPOSTRequest {
  
  /** 合同编码列表 */
  list?: any[]
}

/**
 * requestUrl /finance/contract/list_base_info
 * method post
 */
export interface ListBaseInfoByCodesUsingPOSTResponse {
  
  /** 响应数据 */
  data?: ContractBaseInfoDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRsp合同分页返回数据 {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: 合同分页返回数据
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface 合同分页返回数据 {
  
  /** 区域市 */
  city?: number
  /** 区域市名称 */
  cityName?: string
  /** 合同编号 */
  contractNo?: string
  /** 签订日期 */
  contractStart?: number
  /** 甲方(结算主体) */
  partyA?: string
  /** 甲方签字人 */
  partyASign?: string
  /** 乙方(结算主体) */
  partyB?: string
  /** 乙方签字人 */
  partyBSign?: string
  /** 区域省 */
  province?: number
  /** 区域省名称 */
  provinceName?: string
  /** 销售负责人编码 */
  saleCode?: any[]
  /** 销售负责人 */
  saleName?: any[]
  /** 服务周期结束 */
  serviceEnd?: number
  /** 服务周期开始 */
  serviceStart?: number
  /** 标签名称 */
  tagName?: any[]
  /** 合同名称 */
  title?: string
  /** 合同类型 */
  type?: number
  /** 合同类型名称 */
  typeName?: string
}

/**
 * requestUrl /finance/contract/page
 * method post
 */
export interface PageUsingPOST_1Request {
  
  /** 区域市 */
  city?: number
  /** 合同编码 */
  code?: string
  /** 合同编号 */
  contractNo?: string
  /** 客户编码 */
  customerCode?: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 区域省 */
  province?: number
  /** 区域省列表 */
  provinceList?: any[]
  /** 销售负责人 */
  saleCode?: any[]
  /** 标签 */
  tags?: any[]
  /** 合同名称 */
  title?: string
}

/**
 * requestUrl /finance/contract/page
 * method post
 */
export interface PageUsingPOST_1Response {
  
  /** 响应数据 */
  data?: BasePaginationRsp合同分页返回数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /finance/contract/query_contract
 * method post
 */
export interface QueryContractUsingPOSTRequest {
  
  /** 组织编码 */
  organizationCode?: string
  /** 站点id */
  sid?: number
}

/**
 * requestUrl /finance/contract/query_contract
 * method post
 */
export interface QueryContractUsingPOSTResponse {
  
  /** 响应数据 */
  data?: ContractBaseInfoDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface RegionDataDetailDto {
  
  /** 合同数 */
  contractNum?: number
  /** 客户数 */
  customerNum?: number
  /** 省份编码 */
  province?: number
  /** 省份名称 */
  provinceName?: string
}

/**
 * requestUrl /finance/contract/region_data
 * method post
 */
export interface RegionDataUsingPOSTRequest {
  
  /** 结束时间 */
  endTime?: number
  /** 省份 */
  province?: number
  /** 开始时间 */
  startTime?: number
  /** 业务标签 */
  tag?: number
}

/**
 * requestUrl /finance/contract/region_data
 * method post
 */
export interface RegionDataUsingPOSTResponse {
  
  /** 响应数据 */
  data?: RegionDataDetailDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface SaleStatisticDto {
  
  /** 合同数据 */
  contractData?: ContractNumDto
  /** 客户数据 */
  customerData?: CustomerNumDto
}

interface ContractNumDto {
  
  /** 新增合同数 */
  addNum?: number
  /** 预过期合同数 */
  expireNum?: number
  /** 待完善合同数 */
  intactNum?: number
  /** 合同数 */
  total?: number
}

interface CustomerNumDto {
  
  /** 新增客户数 */
  addNum?: number
  /** 待完善客户数 */
  intactNum?: number
  /** 客户数 */
  total?: number
}

/**
 * requestUrl /finance/contract/sale_statistic
 * method post
 */
export interface SaleStatisticUsingPOSTRequest {
  
  /** 结束时间 */
  endTime?: number
  /** 省份 */
  province?: number
  /** 开始时间 */
  startTime?: number
  /** 业务标签 */
  tag?: number
}

/**
 * requestUrl /finance/contract/sale_statistic
 * method post
 */
export interface SaleStatisticUsingPOSTResponse {
  
  /** 响应数据 */
  data?: SaleStatisticDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /finance/contract/sync_attachment
 * method post
 */
export interface SyncAttachmentUsingPOSTRequest {
  
  /** 合同编码 */
  contractCode: string
  /** 描述 */
  description?: string
  /** 哈希值 */
  hash: string
  /** 文件名 */
  name: string
  /** 文件大小 */
  size: number
  /** 文件地址 */
  url: string
}

/**
 * requestUrl /finance/contract/sync_attachment
 * method post
 */
export interface SyncAttachmentUsingPOSTResponse {
  
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspContractIndexDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: ContractIndexDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface ContractIndexDto {
  
  /** 区域市 */
  city?: number
  /** 区域市名称 */
  cityName?: string
  /** 合同code */
  code?: string
  /** 合同编号 */
  contractNo?: string
  /** 签订日期 */
  contractStart?: number
  /** 创建时间 */
  createdAt?: number
  /** 甲方(结算对象) */
  partyA?: string
  /** 甲方签字人 */
  partyASign?: string
  /** 乙方(结算对象) */
  partyB?: string
  /** 乙方签字人 */
  partyBSign?: string
  /** 区域省 */
  province?: number
  /** 区域省名称 */
  provinceName?: string
  /** 销售负责人编码 */
  saleCode?: any[]
  /** 销售负责人 */
  saleName?: any[]
  /** 服务周期结束 */
  serviceEnd?: number
  /** 服务周期开始 */
  serviceStart?: number
  /** 标签code */
  tagNames?: any[]
  /** 标签code */
  tags?: any[]
  /** 合同名称 */
  title?: string
  /** 合同类型 */
  type?: number
  /** 合同类型名称 */
  typeName?: string
}

/**
 * requestUrl /finance/contract/v2/page
 * method post
 */
export interface PageV2UsingPOSTRequest {
  
  /** 市code */
  city?: number
  /** 合同编号 */
  contractNo?: string
  /** 客户编码 */
  customerCode?: string
  /** 是否已完善  0否 1是 */
  intact?: number
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 筛选省code */
  province?: number
  /** 省code列表 */
  provinceList?: any[]
  /** 跟进销售code */
  saleCode?: any[]
  /** 过期 0否 1是 */
  serviceEndOver?: number
  /** 业务标签code */
  tags?: any[]
  /** 合同名称 */
  title?: string
  /** 合同类型  1销售合同  2供应商合同 */
  type?: number
}

/**
 * requestUrl /finance/contract/v2/page
 * method post
 */
export interface PageV2UsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspContractIndexDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 客户附件resp {
  
  /** code */
  code?: string
  /** 上传时间 */
  createdAt?: number
  /** 上传者 */
  createdBy?: string
  /** 客户code */
  customerCode?: string
  /** 描述 */
  description?: string
  /** 下载url */
  downloadUrl?: string
  /** 附件名 */
  name?: string
  /** 大小 */
  size?: number
  /** url */
  url?: string
}

/**
 * requestUrl /finance/customer/attachment/add
 * method post
 */
export interface GetAttachmentUsingPOSTRequest {
  
  /** 客户id */
  customerCode?: string
  /** 备注描述 */
  description?: string
  /** 哈希值 */
  hash: string
  /** 文件名 */
  name: string
  /** 文件大小 */
  size: number
  /** 文件类型 */
  typeName: string
  /** 文件地址 */
  url: string
}

/**
 * requestUrl /finance/customer/attachment/add
 * method post
 */
export interface GetAttachmentUsingPOSTResponse {
  
  /** 响应数据 */
  data?: 客户附件resp
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /finance/customer/attachment/delete/{attachmentCode}
 * method post
 */
export interface DeleteAttachmentUsingPOSTResponse {
  
  /** 响应数据 */
  data?: 客户附件resp
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /finance/customer/attachment/list/{customerCode}
 * method get
 */
export interface GetAttachmentUsingGETResponse {
  
  /** 响应数据 */
  data?: 客户附件resp
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRsp客户附件resp {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: 客户附件resp
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

/**
 * requestUrl /finance/customer/attachment/page
 * method post
 */
export interface GetAllCustomerPageUsingPOST_1Request {
  
  /**  */
  customerCode?: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
}

/**
 * requestUrl /finance/customer/attachment/page
 * method post
 */
export interface GetAllCustomerPageUsingPOST_1Response {
  
  /** 响应数据 */
  data?: BasePaginationRsp客户附件resp
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /finance/customer_comment/add
 * method post
 */
export interface AddCommentUsingPOSTRequest {
  
  /** 评价内容 */
  comment: string
  /** 客户编码 */
  customerCode: string
  /** 等级 根据alias  customer_comment_level获取 */
  level?: number
}

/**
 * requestUrl /finance/customer_comment/add
 * method post
 */
export interface AddCommentUsingPOSTResponse {
  
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /finance/customer_comment/delete
 * method post
 */
export interface DeleteCommentUsingPOSTRequest {
  
  /** code */
  code?: string
}

/**
 * requestUrl /finance/customer_comment/delete
 * method post
 */
export interface DeleteCommentUsingPOSTResponse {
  
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /finance/customer_comment/level/{customerCode}
 * method get
 */
export interface DeleteCommentUsingGETResponse {
  
  /** 响应数据 */
  data?: string
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspCustomerCommentPageItemDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: CustomerCommentPageItemDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface CustomerCommentPageItemDto {
  
  /** 管理员编码 */
  adminCode?: string
  /** 管理员头像 */
  avatar?: string
  /** 评价编码 */
  code?: string
  /** 内容 */
  comment?: string
  /** 创建时间 */
  createdAt?: number
  /** 等级 */
  level?: number
  /** 等级名称 */
  levelName?: string
  /** 管理员姓名 */
  name?: string
}

/**
 * requestUrl /finance/customer_comment/page
 * method post
 */
export interface CommentPageUsingPOSTRequest {
  
  /** 客户编码 */
  customerCode: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
}

/**
 * requestUrl /finance/customer_comment/page
 * method post
 */
export interface CommentPageUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspCustomerCommentPageItemDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRsp银行信息 {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: 银行信息
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface 银行信息 {
  
  /** 地址 */
  address?: string
  /** 银行账号 */
  bankAccount?: string
  /**  */
  code?: string
  /** 联系人 */
  contactName?: string
  /** 联系电话 */
  contactPhone?: string
  /** 开户行 */
  openningBank?: string
}

/**
 * requestUrl /finance/customer/bankInfoOfPage
 * method post
 */
export interface GetCustomerBankInfoOfPageUsingPOSTRequest {
  
  /**  */
  customerCode?: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
}

/**
 * requestUrl /finance/customer/bankInfoOfPage
 * method post
 */
export interface GetCustomerBankInfoOfPageUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRsp银行信息
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface CustomerUserDto {
  
  /** 头像 */
  avatar?: string
  /** 证件类型，1身份证，2护照，3其他 */
  certificateType?: number
  /** 编码 */
  code?: string
  /** 注册时间 */
  createdAt?: number
  /** 邮箱，空字符串代表没有绑定过邮箱 */
  email?: string
  /** 激活状态，0未激活1已激活 */
  enable?: number
  /** 性别，男1 女2 */
  gender?: number
  /** 身份证号，空字符串代表没有绑定过身份证 */
  idCardNo?: string
  /** 是否初始密码，1是，0不是，代表是否设置过密码 */
  isInitPassword?: boolean
  /** 是否验证身份证号 */
  isValidateIdCard?: boolean
  /** 是否验证手机号 */
  isValidatePhone?: boolean
  /** 最近登录时间 */
  lastLoginTs?: number
  /** 最近选择组织编码 */
  lastOrganizationCode?: string
  /** 手机号 */
  mobile?: string
  /** 姓名 */
  name?: string
  /** 昵称 */
  nickname?: string
  /** 站点 */
  sid?: number
  /** 站点名称 */
  siteName?: string
  /** 用户名 */
  username?: string
}

/**
 * requestUrl /finance/customer/connect_user
 * method post
 */
export interface GetConnectUserUsingPOSTRequest {
  
  /** 客户编码 */
  customerCode: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
}

/**
 * requestUrl /finance/customer/connect_user
 * method post
 */
export interface GetConnectUserUsingPOSTResponse {
  
  /** 响应数据 */
  data?: CustomerUserDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface SupplierInfoDto {
  
  /** 详细地址 */
  address?: string
  /** 区 */
  area?: number
  /** 区 */
  areaName?: string
  /** 市 */
  city?: number
  /** 市 */
  cityName?: string
  /** 营业执照 */
  creditImage?: string
  /** 客户编码 */
  customerCode?: string
  /** 行业 */
  industryId?: number
  /** 行业 */
  industryList?: 行业数据
  /** 平台网址 */
  platformUrl?: string
  /** 省 */
  province?: number
  /** 省 */
  provinceName?: string
  /** 规模 */
  scale?: number
  /** 规模 */
  scaleName?: string
}

interface 行业数据 {
  
  /** 行业编码 */
  code?: string
  /** 行业id */
  id?: number
  /** 名称 */
  name?: string
  /** 上级编码 */
  parentCode?: string
  /** 上级行业id */
  pid?: number
}

/**
 * requestUrl /finance/customer/create
 * method post
 */
export interface CreateCustomerUsingPOSTRequest {
  
  /** 商机 */
  businessOpportunity?: string
  /** 市   */
  city: string
  /** 唯一id */
  code?: string
  /** 联系人 */
  contact: string
  /** 信用代码 */
  creditCode: string
  /** 客户标签 */
  customerTags: any[]
  /** 合作优惠 */
  discountPercent?: string
  /** 跟进人 */
  follower: any[]
  /** 来源平台 */
  fromPlat?: number
  /** 是否有优惠多种状态 */
  hasPolicy?: number
  /** 客户等级 */
  level: number
  /** 联系人电话 */
  mobile: string
  /** 客户名称 */
  name: string
  /** 政策类型 */
  policyType?: string
  /** 联系人职务 */
  post: string
  /** 地区省  */
  province: string
  /** 销售类型 */
  saleMode?: number
  /** 补贴标准 */
  subsidyStandard?: string
  /** 供应商信息 */
  supplierInfo?: SupplierInfoDto
  /** 标签 */
  tags: any[]
  /** 客户类型  1销售客户  2供应商 */
  typeList?: any[]
}

/**
 * requestUrl /finance/customer/create
 * method post
 */
export interface CreateCustomerUsingPOSTResponse {
  
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
 * requestUrl /finance/customer/createBankInfo
 * method post
 */
export interface CreateCustomerBankInfoUsingPOSTRequest {
  
  /**  */
  address?: string
  /**  */
  bankAccount?: string
  /**  */
  code?: string
  /**  */
  contactName?: string
  /**  */
  contactPhone?: string
  /**  */
  customerCode?: string
  /**  */
  openningBank?: string
}

/**
 * requestUrl /finance/customer/createBankInfo
 * method post
 */
export interface CreateCustomerBankInfoUsingPOSTResponse {
  
  /** 响应数据 */
  data?: Record<string | number | symbol, any>
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface CustomerCommentStatisticDto {
  
  /** 客户评价等级 */
  level?: number
  /** 客户评价等级名称 */
  levelName?: string
  /** 月环比 */
  monthPercent?: number
  /** 数量 */
  num?: number
}

/**
 * requestUrl /finance/customer/customer_comment
 * method post
 */
export interface CustomerCommentStatisticUsingPOSTRequest {
  
  /** 结束时间 */
  endTime?: number
  /** 省份 */
  province?: number
  /** 开始时间 */
  startTime?: number
  /** 业务标签 */
  tag?: number
}

/**
 * requestUrl /finance/customer/customer_comment
 * method post
 */
export interface CustomerCommentStatisticUsingPOSTResponse {
  
  /** 响应数据 */
  data?: CustomerCommentStatisticDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /finance/customer/db2es
 * method get
 */
export interface Sync2esUsingGET_1Response {
  
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
 * requestUrl /finance/customer/delete/{customerCode}
 * method post
 */
export interface DeleteCustomerUsingPOSTResponse {
  
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
 * requestUrl /finance/customer/deleteBankInfo/{code}
 * method get
 */
export interface DeleteCustomerBankInfoUsingGETResponse {
  
  /** 响应数据 */
  data?: Record<string | number | symbol, any>
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 客户详情resp {
  
  /** 商机 */
  businessOpportunity?: string
  /** 市 */
  city?: string
  /** 城市缩写 */
  cityAbbreviation?: string
  /** 市 */
  cityName?: string
  /** 唯一id */
  code?: string
  /** 联系人 */
  contact?: string
  /** 信用代码 */
  creditCode?: string
  /** 客户标签 */
  customerTags?: any[]
  /** 客户标签名 */
  customerTagsName?: any[]
  /** 优惠模式 */
  discountPercent?: string
  /** 跟进人 */
  follower?: any[]
  /** 跟进人名字 */
  followerNames?: any[]
  /** 来源平台code */
  fromPlat?: number
  /** 来源平台 */
  fromPlatName?: string
  /** 是否有优惠 */
  hasPolicy?: number
  /** 客户等级 */
  level?: number
  /** 客户等级名 */
  levelName?: string
  /** 联系人电话 */
  mobile?: string
  /** 客户名称 */
  name?: string
  /** 政策类型 */
  policyType?: string
  /** 联系人职务 */
  post?: string
  /** 地区省 */
  province?: string
  /** 地区省 */
  provinceName?: string
  /** 销售模式 */
  saleMode?: number
  /** 销售模式名 */
  saleModeName?: string
  /** 补贴标准 */
  subsidyStandard?: string
  /** 供应商信息 */
  supplierInfo?: SupplierInfoDto
  /** 标签id */
  tags?: any[]
  /** 标签名字 */
  tagsName?: any[]
  /** 客户类型  1销售客户  2供应商 */
  typeList?: any[]
}

/**
 * requestUrl /finance/customer/detail/{code}
 * method get
 */
export interface GetCustomerSummaryUsingGETResponse {
  
  /** 响应数据 */
  data?: 客户详情resp
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 分页返回 {
  
  /** 市 */
  city?: string
  /** 城市缩写 */
  cityAbbreviation?: string
  /** 市 */
  cityName?: string
  /** 唯一id */
  code?: string
  /** 联系人 */
  contact?: string
  /** 信用代码 */
  creditCode?: string
  /** 客户标签 */
  customerTags?: any[]
  /** 客户标签名 */
  customerTagsName?: any[]
  /** 跟进人 */
  follower?: any[]
  /** 跟进人名字 */
  followerNames?: any[]
  /** 客户等级 */
  level?: number
  /** 客户等级名 */
  levelName?: string
  /** 联系人电话 */
  mobile?: string
  /** 客户名称 */
  name?: string
  /** 联系人职务 */
  post?: string
  /** 地区省 */
  province?: string
  /** 地区省 */
  provinceName?: string
  /** 标签id */
  tags?: any[]
  /** 标签名字 */
  tagsName?: any[]
}

/**
 * requestUrl /finance/customer/feign_order/getCustomerDtos
 * method post
 */
export interface GetCustomerDtoByCustomerCodesUsingPOSTRequest {
  
  /**  */
  customerCodes?: any[]
}

/**
 * requestUrl /finance/customer/feign_order/getCustomerDtos
 * method post
 */
export interface GetCustomerDtoByCustomerCodesUsingPOSTResponse {
  
  /** 响应数据 */
  data?: 分页返回
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /finance/customer/followers/{customerCode}
 * method get
 */
export interface GetFollowsUsingGETResponse {
  
  /** 响应数据 */
  data?: any[]
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
  /** 唯一编码 */
  code?: string
  /** 申请编号 */
  invoiceNo?: string
  /** 开票时间 */
  invoiceTime?: number
  /** 抬头名称 */
  invoiceTitle?: string
  /** 开票类型，1：普通发票、2：增值税专用发票 */
  invoiceType?: number
  /** 红票还是蓝票 */
  makeType?: number
  /** 开票状态，1：待审核、2：待开票、3：已驳回、4：已开票 */
  status?: number
}

/**
 * requestUrl /finance/customer/getInvoiceOfPage
 * method post
 */
export interface GetInvoiceOfPageUsingPOSTRequest {
  
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
 * requestUrl /finance/customer/getInvoiceOfPage
 * method post
 */
export interface GetInvoiceOfPageUsingPOSTResponse {
  
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
 * requestUrl /finance/customer/judge
 * method post
 */
export interface JudgeUsingPOSTRequest {
  
  /** 信用代码 */
  creditCode: string
  /**  */
  customerCode?: string
  /** 用户名 */
  customerName: string
}

/**
 * requestUrl /finance/customer/judge
 * method post
 */
export interface JudgeUsingPOSTResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRsp客户索引dto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: 客户索引dto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface 客户索引dto {
  
  /** 市 */
  city?: string
  /** 市 */
  cityName?: string
  /** 唯一id */
  code?: string
  /** 联系人 */
  contact?: string
  /** 创建时间 */
  createdAt?: number
  /** 信用代码 */
  creditCode?: string
  /** 客户标签 */
  customerTags?: any[]
  /** 客户标签名 */
  customerTagsName?: any[]
  /** flag是否被隐藏 */
  deleted?: number
  /** 跟进人code */
  follower?: any[]
  /** 跟进人名字 */
  followerNames?: any[]
  /** 客户等级 */
  level?: number
  /** 客户等级名 */
  levelName?: string
  /** 联系人电话 */
  mobile?: string
  /** 客户名称 */
  name?: string
  /** 联系人职务 */
  post?: string
  /** 地区省 */
  province?: string
  /** 地区省 */
  provinceName?: string
  /** 标签id */
  tags?: any[]
  /** 标签名字 */
  tagsName?: any[]
  /** 客户类型 */
  typeList?: any[]
  /** 客户类型名 */
  typeNameList?: any[]
}

/**
 * requestUrl /finance/customer/list_hide
 * method post
 */
export interface GetListOfHideUsingPOSTRequest {
  
  /** 区 */
  city?: number
  /** 客户编号 */
  code?: string
  /** 客户标签 */
  customerTags?: any[]
  /** 是否被删除 */
  deleted?: number
  /** 跟进人 */
  followerList?: any[]
  /** 是否完善 */
  intact?: number
  /** 等级 */
  level?: number
  /** 客户名称 */
  name?: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 地区Id */
  province?: number
  /** 地区Id列表 */
  provinceList?: any[]
  /** 业务标签 */
  tags?: any[]
  /** 类型 */
  typeList?: any[]
}

/**
 * requestUrl /finance/customer/list_hide
 * method post
 */
export interface GetListOfHideUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRsp客户索引dto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /finance/customer/modifyBankInfo
 * method post
 */
export interface ModifyCustomerBankInfoUsingPOSTRequest {
  
  /**  */
  address?: string
  /**  */
  bankAccount?: string
  /**  */
  code?: string
  /**  */
  contactName?: string
  /**  */
  contactPhone?: string
  /**  */
  customerCode?: string
  /**  */
  openningBank?: string
}

/**
 * requestUrl /finance/customer/modifyBankInfo
 * method post
 */
export interface ModifyCustomerBankInfoUsingPOSTResponse {
  
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
 * requestUrl /finance/customer/page
 * method post
 */
export interface GetAllCustomerPageUsingPOST_2Request {
  
  /** 区 */
  city?: number
  /** 客户编号 */
  code?: string
  /** 客户标签 */
  customerTags?: any[]
  /** 是否被删除 */
  deleted?: number
  /** 跟进人 */
  followerList?: any[]
  /** 是否完善 */
  intact?: number
  /** 等级 */
  level?: number
  /** 客户名称 */
  name?: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 地区Id */
  province?: number
  /** 地区Id列表 */
  provinceList?: any[]
  /** 业务标签 */
  tags?: any[]
  /** 类型 */
  typeList?: any[]
}

/**
 * requestUrl /finance/customer/page
 * method post
 */
export interface GetAllCustomerPageUsingPOST_2Response {
  
  /** 响应数据 */
  data?: BasePaginationRsp客户索引dto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /finance/customer/query_by_org_code/{orgCode}
 * method get
 */
export interface QueryCustomerByOrgCodeUsingGETResponse {
  
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
 * requestUrl /finance/customer/reload_follower
 * method get
 */
export interface ReloadFollowerUsingGETResponse {
  
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /finance/customer/remove/{code}
 * method post
 */
export interface DeleteFromHideUsingPOSTRequest {
  
}

/**
 * requestUrl /finance/customer/remove/{code}
 * method post
 */
export interface DeleteFromHideUsingPOSTResponse {
  
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
 * requestUrl /finance/customer/update
 * method post
 */
export interface UpdateCustomerUsingPOSTRequest {
  
  /** 商机 */
  businessOpportunity?: string
  /** 市   */
  city: string
  /** 唯一id */
  code?: string
  /** 联系人 */
  contact: string
  /** 信用代码 */
  creditCode: string
  /** 客户标签 */
  customerTags: any[]
  /** 合作优惠 */
  discountPercent?: string
  /** 跟进人 */
  follower: any[]
  /** 来源平台 */
  fromPlat?: number
  /** 是否有优惠多种状态 */
  hasPolicy?: number
  /** 客户等级 */
  level: number
  /** 联系人电话 */
  mobile: string
  /** 客户名称 */
  name: string
  /** 政策类型 */
  policyType?: string
  /** 联系人职务 */
  post: string
  /** 地区省  */
  province: string
  /** 销售类型 */
  saleMode?: number
  /** 补贴标准 */
  subsidyStandard?: string
  /** 供应商信息 */
  supplierInfo?: SupplierInfoDto
  /** 标签 */
  tags: any[]
  /** 客户类型  1销售客户  2供应商 */
  typeList?: any[]
}

/**
 * requestUrl /finance/customer/update
 * method post
 */
export interface UpdateCustomerUsingPOSTResponse {
  
  /** 响应数据 */
  data?: Record<string | number | symbol, any>
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 回款跟进订单关系 {
  
  /** 跟进记录编码 */
  followCode?: string
  /** 金额 */
  money?: number
  /** 订单编号 */
  orderNo?: string
}

/**
 * requestUrl /finance/customer/follow_record/create
 * method post
 */
export interface AddFollowRecordUsingPOSTRequest {
  
  /** 唯一code */
  code?: string
  /** 联系人code */
  contactCode: string
  /** 联系人名 */
  contactName?: string
  /** 跟进时间 */
  createdAt: number
  /** 客户code */
  customerCode: string
  /** 客户名称 */
  customerName?: string
  /** 跟进类型 1拜访跟进  2回款跟进 */
  followType: number
  /** 跟进类型名称 */
  followTypeName?: string
  /** 关联订单信息 */
  orderList?: 回款跟进订单关系
  /** 订单总金额 */
  orderMoney?: number
  /** 跟进人 */
  saler: string
  /** 跟进内容 */
  summary: string
  /** 跟进方式code */
  type: number
  /** 跟进方式 */
  typeName?: string
}

/**
 * requestUrl /finance/customer/follow_record/create
 * method post
 */
export interface AddFollowRecordUsingPOSTResponse {
  
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
 * requestUrl /finance/customer/follow_record/delete/{followRecordCode}
 * method post
 */
export interface DeleteFollowRecordUsingPOSTResponse {
  
  /** 响应数据 */
  data?: Record<string | number | symbol, any>
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface CustomerFollowRecordDtoWrapper {
  
  /**  */
  customerFollowRecordDtos?: 客户跟进记录请求响应
  /**  */
  groupId?: string
}

interface 客户跟进记录请求响应 {
  
  /** 唯一code */
  code?: string
  /** 联系人code */
  contactCode: string
  /** 联系人名 */
  contactName?: string
  /** 跟进时间 */
  createdAt: number
  /** 客户code */
  customerCode: string
  /** 客户名称 */
  customerName?: string
  /** 跟进类型 1拜访跟进  2回款跟进 */
  followType: number
  /** 跟进类型名称 */
  followTypeName?: string
  /** 关联订单信息 */
  orderList?: 回款跟进订单关系
  /** 订单总金额 */
  orderMoney?: number
  /** 跟进人 */
  saler: string
  /** 跟进内容 */
  summary: string
  /** 跟进方式code */
  type: number
  /** 跟进方式 */
  typeName?: string
}

/**
 * requestUrl /finance/customer/follow_record/list/{customerCode}
 * method get
 */
export interface GetFollowRecordUsingGETResponse {
  
  /** 响应数据 */
  data?: CustomerFollowRecordDtoWrapper
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /finance/customer/follow_record/one/{followCode}
 * method get
 */
export interface GetOneFollowRecordUsingGETResponse {
  
  /** 响应数据 */
  data?: 客户跟进记录请求响应
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspCustomerFollowRecordDtoWrapper {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: CustomerFollowRecordDtoWrapper
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

/**
 * requestUrl /finance/customer/follow_record/page
 * method post
 */
export interface GetAllCustomerPageUsingPOST_3Request {
  
  /** 客户编码 */
  customerCode: string
  /** 跟进类型  1拜访跟进  2回款跟进 */
  followType?: number
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
}

/**
 * requestUrl /finance/customer/follow_record/page
 * method post
 */
export interface GetAllCustomerPageUsingPOST_3Response {
  
  /** 响应数据 */
  data?: BasePaginationRspCustomerFollowRecordDtoWrapper
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /finance/customer/remark/create
 * method post
 */
export interface CreateContactUsingPOST_1Request {
  
  /** 唯一code */
  code?: string
  /** 备注内容 */
  content: string
  /** 客户code */
  customerCode: string
  /** 备注标题 */
  title: string
}

/**
 * requestUrl /finance/customer/remark/create
 * method post
 */
export interface CreateContactUsingPOST_1Response {
  
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
 * requestUrl /finance/customer/remark/delete/{remarkCode}
 * method post
 */
export interface DeleteContactUsingPOST_1Response {
  
  /** 响应数据 */
  data?: Record<string | number | symbol, any>
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 备注 {
  
  /** 唯一code */
  code?: string
  /** 备注内容 */
  content?: string
  /** 创建时间 */
  createdAt?: number
  /** 客户code */
  customerCode?: string
  /** 客户备注标题 */
  title?: string
  /** 编写人 */
  updatedBy?: string
}

/**
 * requestUrl /finance/customer/remark/get/{remarkCode}
 * method get
 */
export interface GetRemarkUsingGETResponse {
  
  /** 响应数据 */
  data?: 备注
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /finance/customer/remark/list/{customerCode}
 * method get
 */
export interface GetRemarksUsingGETResponse {
  
  /** 响应数据 */
  data?: 备注
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRsp备注 {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: 备注
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

/**
 * requestUrl /finance/customer/remark/page
 * method post
 */
export interface GetAllCustomerPageUsingPOST_4Request {
  
  /**  */
  customerCode?: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
}

/**
 * requestUrl /finance/customer/remark/page
 * method post
 */
export interface GetAllCustomerPageUsingPOST_4Response {
  
  /** 响应数据 */
  data?: BasePaginationRsp备注
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /finance/customer/remark/update
 * method post
 */
export interface UpdateContactUsingPOST_1Request {
  
  /** 唯一code */
  code?: string
  /** 备注内容 */
  content: string
  /** 客户code */
  customerCode: string
  /** 备注标题 */
  title: string
}

/**
 * requestUrl /finance/customer/remark/update
 * method post
 */
export interface UpdateContactUsingPOST_1Response {
  
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
 * requestUrl /finance/front/contract/detail/{contractCode}
 * method get
 */
export interface DetailUsingGET_2Response {
  
  /** 响应数据 */
  data?: 合同详情_概览
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /finance/front/contract/goods_list/{contractCode}
 * method get
 */
export interface GoodsListUsingGET_1Response {
  
  /** 响应数据 */
  data?: 商品分页返回数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspCustomerContractPageDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: CustomerContractPageDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface CustomerContractPageDto {
  
  /** 区域市 */
  city?: number
  /** 区域市名称 */
  cityName?: string
  /** 合同code */
  code?: string
  /** 合同结束时间 */
  contractEnd?: number
  /** 合同编号 */
  contractNo?: string
  /** 签订日期 */
  contractStart?: number
  /** 创建时间 */
  createdAt?: number
  /** 甲方(结算主体) */
  partyA?: string
  /** 甲方签字人 */
  partyASign?: string
  /** 乙方(结算主体) */
  partyB?: string
  /** 乙方签字人 */
  partyBSign?: string
  /** 区域省 */
  province?: number
  /** 区域省名称 */
  provinceName?: string
  /** 剩余天数 */
  remainingDays?: string
  /** 销售负责人编码 */
  saleCode?: any[]
  /** 销售负责人 */
  saleName?: any[]
  /** 服务周期结束 */
  serviceEnd?: number
  /** 服务周期开始 */
  serviceStart?: number
  /** 结算标准 */
  settleStandard?: string
  /** 结算标准名称 */
  settleStandardName?: string
  /** 结算类型 */
  settleType?: number
  /** 结算类型名称 */
  settleTypeName?: string
  /** 标签code */
  tagNames?: any[]
  /** 标签code */
  tags?: any[]
  /** 合同名称 */
  title?: string
  /** 合同类型 */
  type?: number
  /** 合同类型名称 */
  typeName?: string
}

/**
 * requestUrl /finance/front/contract/page
 * method post
 */
export interface CustomerContractPageUsingPOSTRequest {
  
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 组织编码 */
  organizationCode: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
}

/**
 * requestUrl /finance/front/contract/page
 * method post
 */
export interface CustomerContractPageUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspCustomerContractPageDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface SettlementObjectFrontDetailDto {
  
  /** 开户行 */
  bank?: string
  /** 银行账号 */
  bankAccount?: string
  /** 结算主体名称 */
  name?: string
}

/**
 * requestUrl /finance/front/settlement_object/detail
 * method get
 */
export interface DetailUsingGET_3Response {
  
  /** 响应数据 */
  data?: SettlementObjectFrontDetailDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRsp操作日志respDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: 操作日志respDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface 操作日志respDto {
  
  /** 操作结果 */
  action?: string
  /** 用户code */
  adminCode?: string
  /** code */
  code?: string
  /** 操作时间 */
  createdAt?: number
  /** ip地址 */
  ip?: string
  /** 手机号码 */
  mobile?: string
  /** 操作模块 */
  module?: string
  /** json */
  param?: string
  /** 用户名 */
  userName?: string
}

/**
 * requestUrl /finance/operationlog/page
 * method post
 */
export interface PageUsingPOST_2Request {
  
  /** 管理员账号 */
  adminAccount?: string
  /** 操作结束时间 */
  execEndTime?: number
  /** 操作开始时间 */
  execStartTime?: number
  /** 操作模块 */
  module?: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 用户code */
  userCode?: string
  /** 用户名 */
  userName?: string
}

/**
 * requestUrl /finance/operationlog/page
 * method post
 */
export interface PageUsingPOST_2Response {
  
  /** 响应数据 */
  data?: BasePaginationRsp操作日志respDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /finance/overdue_management/edit_push_status
 * method post
 */
export interface EditPushStatusUsingPOSTResponse {
  
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
 * requestUrl /finance/overdue_management/overdue_count
 * method post
 */
export interface OverdueCountUsingPOSTRequest {
  
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
 * requestUrl /finance/overdue_management/overdue_count
 * method post
 */
export interface OverdueCountUsingPOSTResponse {
  
  /** 响应数据 */
  data?: number
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface OverdueCustomerRankDto {
  
  /** 客户编码 */
  customerCode?: string
  /** 客户名称 */
  customerName?: string
  /** 逾期金额 */
  overdueAmount?: number
  /** 排名 */
  rank?: number
}

/**
 * requestUrl /finance/overdue_management/overdue_customer_rank
 * method post
 */
export interface OverdueCustomerRankUsingPOSTRequest {
  
}

/**
 * requestUrl /finance/overdue_management/overdue_customer_rank
 * method post
 */
export interface OverdueCustomerRankUsingPOSTResponse {
  
  /** 响应数据 */
  data?: OverdueCustomerRankDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BackendOverdueStatRespDto {
  
  /** 统计项 */
  stats?: OverdueStatItem
  /** 总逾期金额 */
  totalAmount?: number
}

interface OverdueStatItem {
  
  /** 逾期金额 */
  amount?: number
  /** 逾期统计枚举，1:5天以内,2:6~10天,3:11~20天,4:21~30天,5:31~90天,6:91天以上 */
  overdueStat?: number
  /** 占比% */
  ratio?: string
}

/**
 * requestUrl /finance/overdue_management/overdue_stat
 * method post
 */
export interface OverdueStatUsingPOSTRequest {
  
  /** 客户编码 */
  customerCode?: string
  /** 预计支付日期-结束日期 */
  expectPayEnd?: string
  /** 预计支付日期-开始日期 */
  expectPayStart?: string
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
  /** 省份id数组 */
  provinces?: any[]
  /** 逾期推送状态，1:推送,2:暂停 */
  pushStatusQuery?: number
  /** 站点id */
  sid?: number
  /** 逾期阶段查询，1:短信通知，2:智能外呼,3:发送催款函,4:暂停服务通知,5:限制服务,6人工干预 */
  stageQuery?: number
  /** 逾期统计查询，1:5天以内,2:6~10天,3:11~20天,4:21~30天,5:31~90天,6:91天以上 */
  statQuery?: number
  /** tag编号数组 */
  tags?: any[]
}

/**
 * requestUrl /finance/overdue_management/overdue_stat
 * method post
 */
export interface OverdueStatUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BackendOverdueStatRespDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface OverdueManagementWaringDto {
  
  /** 逾期金额 */
  overdueAmount?: number
  /** 逾期订单数 */
  overdueCount?: number
}

/**
 * requestUrl /finance/overdue_management/overdue_warning
 * method post
 */
export interface OverdueWarningUsingPOSTRequest {
  
}

/**
 * requestUrl /finance/overdue_management/overdue_warning
 * method post
 */
export interface OverdueWarningUsingPOSTResponse {
  
  /** 响应数据 */
  data?: OverdueManagementWaringDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspBackendOverdueManagementPageRespDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: BackendOverdueManagementPageRespDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface BackendOverdueManagementPageRespDto {
  
  /** 唯一编码 */
  code?: string
  /** 创建时间 */
  createdAt?: number
  /** 客户编码 */
  customerCode?: string
  /** 客户名称 */
  customerName?: string
  /** 预计支付日期-预计支付时间取日期 */
  expectPayDate?: string
  /** 预留字段1 */
  ext1?: string
  /** 预留字段2 */
  ext2?: string
  /** 订单编码 */
  orderCode?: string
  /** 订单编号 */
  orderNo?: string
  /** 逾期天数 */
  overdueDays?: number
  /** 逾期阶段，1:短信通知，2:智能外呼,3:发送催款函,4:暂停服务通知,5:限制服务,6人工干预 */
  overdueStage?: number
  /** 逾期统计枚举，1:5天以内,2:6~10天,3:11~20天,4:21~30天,5:31~90天,6:91天以上 */
  overdueStat?: number
  /** 客户所在省份编号，同订单 */
  province?: number
  /** 省份名称 */
  provinceName?: string
  /** 推送状态，1:开启,2:关闭 */
  pushStatus?: number
  /** 站点 */
  sid?: number
  /** 站点名称 */
  siteName?: string
  /** 业务标签，同订单 */
  tags?: any[]
  /** 订单总额 */
  totalAmount?: number
}

/**
 * requestUrl /finance/overdue_management/page_overdue_management
 * method post
 */
export interface PageOverdueManagementUsingPOSTRequest {
  
  /** 客户编码 */
  customerCode?: string
  /** 预计支付日期-结束日期 */
  expectPayEnd?: string
  /** 预计支付日期-开始日期 */
  expectPayStart?: string
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
  /** 省份id数组 */
  provinces?: any[]
  /** 逾期推送状态，1:推送,2:暂停 */
  pushStatusQuery?: number
  /** 站点id */
  sid?: number
  /** 逾期阶段查询，1:短信通知，2:智能外呼,3:发送催款函,4:暂停服务通知,5:限制服务,6人工干预 */
  stageQuery?: number
  /** 逾期统计查询，1:5天以内,2:6~10天,3:11~20天,4:21~30天,5:31~90天,6:91天以上 */
  statQuery?: number
  /** tag编号数组 */
  tags?: any[]
}

/**
 * requestUrl /finance/overdue_management/page_overdue_management
 * method post
 */
export interface PageOverdueManagementUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspBackendOverdueManagementPageRespDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface ReceiveDetailDto {
  
  /** 账龄名称 */
  ageName?: string
  /**  账龄 */
  aging?: number
  /** 应收单id */
  arNo?: string
  /** 业务编码(班级id) */
  bizCode?: any[]
  /**  业务日期(结班日期) */
  businessTime?: number
  /** 应收单编码 */
  code?: string
  /**  客户编码 */
  customerCode?: string
  /**  客户名称 */
  customerName?: string
  /**  单据类型  1暂估应收单  2财务应收单 */
  documentType?: number
  /**  到期日期 */
  expireAt?: number
  /**  订单金额 */
  orderMoney?: number
  /**  省份 (跟合同走) */
  province?: string
  /**  省份 (跟合同走) */
  provinceName?: string
  /** 销售负责人 */
  saleName?: AdminPageDto
  /** 已结算金额 */
  settleMoney?: number
  /** 结算主体 */
  settleTarget?: string
  /** 结算主体名称 */
  settleTargetName?: string
  /** 标签id */
  tagId?: any[]
  /** 标签名称 */
  tagName?: 标签数据
  /**  立账类型  1标准应收单 */
  type?: number
}

/**
 * requestUrl /finance/receive/detail/{code}
 * method get
 */
export interface DetailUsingGET_4Response {
  
  /** 响应数据 */
  data?: ReceiveDetailDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /finance/receive/month_money/{customerCode}
 * method get
 */
export interface MonthReceiveMoneyUsingGETResponse {
  
  /** 响应数据 */
  data?: number
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspReceivePageDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: ReceivePageDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface ReceivePageDto {
  
  /** 账龄名称 */
  ageName?: string
  /**  账龄 */
  aging?: number
  /** 应收单id */
  arNo?: string
  /**  业务日期(结班日期) */
  businessTime?: number
  /** 应收单编码 */
  code?: string
  /**  客户编码 */
  customerCode?: string
  /**  客户名称 */
  customerName?: string
  /**  单据类型  1暂估应收单  2财务应收单 */
  documentType?: number
  /**  到期日期 */
  expireAt?: number
  /**  是否已有财务应收(是否已结算) 0否 1是  */
  hasFinance?: number
  /**  1标准应收路径  2预开票应收路径 */
  module?: number
  /**  订单金额 */
  orderMoney?: number
  /**  省份 (跟合同走) */
  province?: string
  /**  省份 (跟合同走) */
  provinceName?: string
  /** 已结算金额 */
  settleMoney?: number
  /**  立账类型  1标准应收单 */
  type?: number
}

/**
 * requestUrl /finance/receive/page
 * method post
 */
export interface PageUsingPOST_3Request {
  
  /**  账龄 */
  aging?: number
  /** 应收单id */
  arNo?: string
  /** 业务编码(班级id) */
  bizCode?: any[]
  /**  业务日期结束 */
  businessEndTime?: number
  /**  业务日期开始 */
  businessStartTime?: number
  /**  客户编码 */
  customerCode?: string
  /**  单据类型  1暂估应收单  2财务应收单 */
  documentType?: number
  /**  到期日期结束 */
  expireEndAt?: number
  /**  到期日期开始 */
  expireStartAt?: number
  /**  是否已有财务应收(是否已结算) 0否 1是  */
  hasFinance?: number
  /** 排除的应收单编码 */
  notCode?: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /**  省份 */
  province?: string
  /**  省份列表 */
  provinceList?: any[]
}

/**
 * requestUrl /finance/receive/page
 * method post
 */
export interface PageUsingPOST_3Response {
  
  /** 响应数据 */
  data?: BasePaginationRspReceivePageDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface ReceiveGoodsDto {
  
  /**  应收单编码 */
  arCode?: string
  /**  业务编码(备注) */
  bizCode?: any[]
  /** 多级类目 */
  categoryList?: any[]
  /** 编码 */
  code?: string
  /**  商品分类 */
  goodsCategory?: number
  /**  商品编码 */
  goodsCode?: string
  /**  商品名称 */
  goodsName?: string
  /**  物料编码 */
  matterCode?: string
  /**  数量 */
  num?: number
  /**  不含税价 */
  price?: number
  /**  不含税金额 */
  priceMoney?: number
  /** 税额 */
  taxMoney?: number
  /**  含税价 */
  taxPrice?: number
  /**  税率 */
  taxRate?: number
  /**  价税合计 */
  totalMoney?: number
}

/**
 * requestUrl /finance/receive/receive_goods/{code}
 * method get
 */
export interface ReceiveGoodsUsingGETResponse {
  
  /** 响应数据 */
  data?: ReceiveGoodsDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface ReceiveStatisticDto {
  
  /** 明细 */
  list?: ReceiveStatisticItemDto
  /** 总金额 */
  totalMoney?: string
}

interface ReceiveStatisticItemDto {
  
  /** 金额 */
  money?: string
  /** 占比(小数 百分比自行转换)  */
  percent?: string
  /** 标题 */
  title?: string
}

/**
 * requestUrl /finance/receive/statistics
 * method post
 */
export interface StatisticsReceiveUsingPOSTRequest {
  
  /**  账龄 */
  aging?: number
  /** 应收单id */
  arNo?: string
  /** 业务编码(班级id) */
  bizCode?: any[]
  /**  业务日期结束 */
  businessEndTime?: number
  /**  业务日期开始 */
  businessStartTime?: number
  /**  客户编码 */
  customerCode?: string
  /**  单据类型  1暂估应收单  2财务应收单 */
  documentType?: number
  /**  到期日期结束 */
  expireEndAt?: number
  /**  到期日期开始 */
  expireStartAt?: number
  /**  是否已有财务应收(是否已结算) 0否 1是  */
  hasFinance?: number
  /** 排除的应收单编码 */
  notCode?: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /**  省份 */
  province?: string
  /**  省份列表 */
  provinceList?: any[]
}

/**
 * requestUrl /finance/receive/statistics
 * method post
 */
export interface StatisticsReceiveUsingPOSTResponse {
  
  /** 响应数据 */
  data?: ReceiveStatisticDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /finance/receive/sub_class_end
 * method post
 */
export interface SubClassEndUsingPOSTRequest {
  
  /** 业务编码(班级id) */
  bizCode: any[]
  /** 业务日期(结班日期 毫秒级时间戳) */
  businessTime: number
  /** 合同编码 */
  contractCode: string
  /** 商品编码 */
  goodsCode: string
  /** 商品数量 */
  num: number
}

/**
 * requestUrl /finance/receive/sub_class_end
 * method post
 */
export interface SubClassEndUsingPOSTResponse {
  
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface ReceiveGoodsStatisticDto {
  
  /** 商品排行 */
  goodsList?: GoodsItem
  /** 已培训班次 */
  trainClass?: number
  /** 已培训人次 */
  trainStudent?: number
}

interface GoodsItem {
  
  /** 商品名称 */
  name?: string
  /** 数量(万) */
  num?: number
}

/**
 * requestUrl /finance/receive/train_statistic
 * method post
 */
export interface ReceiveGoodsStatisticUsingPOSTRequest {
  
  /** 结束时间 */
  endTime?: number
  /** 省份 */
  province?: number
  /** 开始时间 */
  startTime?: number
  /** 业务标签 */
  tag?: number
}

/**
 * requestUrl /finance/receive/train_statistic
 * method post
 */
export interface ReceiveGoodsStatisticUsingPOSTResponse {
  
  /** 响应数据 */
  data?: ReceiveGoodsStatisticDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /finance/settlement_object/delete/{code}
 * method post
 */
export interface DeleteSettlementObjectUsingPOSTResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface SettlementObjectDetailDto {
  
  /** 地址 */
  address?: string
  /** 支付应用id */
  appId?: string
  /** 支付应用密钥（加密） */
  appSecret?: string
  /** 开户行 */
  bank?: string
  /** 银行账号 */
  bankAccount?: string
  /** 业务编码，结算主体标识 */
  bizCode?: string
  /** 唯一编码 */
  code?: string
  /** 联系人电话 */
  contactMobile?: string
  /** 联系人姓名 */
  contactName?: string
  /** 税号 */
  dutyNo?: string
  /** 诺诺发票-应用key */
  invoiceAppKey?: string
  /** 诺诺发票-应用密码 */
  invoiceAppSecret?: string
  /** 商户号/平台商户号 */
  merId?: string
  /** 进件应用id,正式环境同支付应用id */
  merchantAppId?: string
  /** 进件应用密钥,正式环境同支付应用密钥（加密） */
  merchantAppSecret?: string
  /** 进件私钥,正式环境同支付私钥（加密） */
  merchantPrivateKey?: string
  /** 结算主体名 */
  name?: string
  /** 支付私钥（加密） */
  privateKey?: string
  /** 支付公钥（加密） */
  publicKey?: string
  /** 手续费率 */
  serviceChargeRatio?: number
  /** 进件状态，-1：未进件，1：进件中，2：进件成功，3：进件失败 */
  status?: number
  /** 收银员id */
  userId?: string
}

/**
 * requestUrl /finance/settlement_object/detail
 * method get
 */
export interface DetailUsingGET_5Response {
  
  /** 响应数据 */
  data?: SettlementObjectDetailDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 结算主体表 {
  
  /** 地址 */
  address?: string
  /** 开户行 */
  bank?: string
  /** 银行账号 */
  bankAccount?: string
  /** 业务编码，结算主体标识 */
  bizCode?: string
  /** 唯一编码 */
  code?: string
  /** 联系号码 */
  contactMobile?: string
  /** 联系人 */
  contactName?: string
  /**  */
  createdAt?: number
  /**  */
  createdBy?: string
  /**  */
  deleted?: number
  /** 税号 */
  dutyNo?: string
  /** 开票参数是否全部填写:0否,1是 */
  invoiceConfigFull?: number
  /** 结算主体名称 */
  name?: string
  /**  */
  updatedAt?: number
  /**  */
  updatedBy?: string
}

/**
 * requestUrl /finance/settlement_object/detail_basic
 * method get
 */
export interface DetailBasicUsingGETResponse {
  
  /** 响应数据 */
  data?: 结算主体表
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /finance/settlement_object/feign_order
 * method get
 */
export interface GetSettlementObjectUsingGETResponse {
  
  /** 响应数据 */
  data?: 结算主体表
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /finance/settlement_object/feign_order/getSettlementsByCodes
 * method post
 */
export interface GetSettlementObjectsUsingPOSTRequest {
  
  /**  */
  codes?: any[]
}

/**
 * requestUrl /finance/settlement_object/feign_order/getSettlementsByCodes
 * method post
 */
export interface GetSettlementObjectsUsingPOSTResponse {
  
  /** 响应数据 */
  data?: 结算主体表
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /finance/settlement_object/list
 * method get
 */
export interface GetAllSettlementObjectUsingGETResponse {
  
  /** 响应数据 */
  data?: 结算主体表
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface SettlementObjectSiteDto {
  
  /** 地址 */
  address?: string
  /** 开户行 */
  bank?: string
  /** 银行账号 */
  bankAccount?: string
  /** 业务编码，结算主体标识 */
  bizCode?: string
  /** 唯一编码 */
  code?: string
  /** 联系号码 */
  contactMobile?: string
  /** 联系人 */
  contactName?: string
  /** 结算主体是否进件成功 */
  createSuccess?: boolean
  /**  */
  createdAt?: number
  /**  */
  createdBy?: string
  /**  */
  deleted?: number
  /** 税号 */
  dutyNo?: string
  /** 开票参数是否全部填写:0否,1是 */
  invoiceConfigFull?: number
  /** 结算主体名称 */
  name?: string
  /**  */
  updatedAt?: number
  /**  */
  updatedBy?: string
}

/**
 * requestUrl /finance/settlement_object/list_settle_object
 * method get
 */
export interface ListSettleObjectUsingGETResponse {
  
  /** 响应数据 */
  data?: SettlementObjectSiteDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /finance/settlement_object/list_via_biz_code
 * method get
 */
export interface ListViaBizCodeUsingGETResponse {
  
  /** 响应数据 */
  data?: Record<string | number | symbol, any>
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspSettleObjectPageRespDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: SettleObjectPageRespDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface SettleObjectPageRespDto {
  
  /** 地址 */
  address?: string
  /** 开户行 */
  bank?: string
  /** 银行账号 */
  bankAccount?: string
  /** 业务编码，结算主体标识 */
  bizCode?: string
  /** 唯一编码 */
  code?: string
  /** 联系号码 */
  contactMobile?: string
  /** 联系人 */
  contactName?: string
  /**  */
  createdAt?: number
  /**  */
  createdBy?: string
  /**  */
  deleted?: number
  /** 税号 */
  dutyNo?: string
  /** 开票参数是否全部填写:0否,1是 */
  invoiceConfigFull?: number
  /** 结算主体名称 */
  name?: string
  /** 进件状态，-1：未进件，1：进件中，2：进件成功，3：进件失败 */
  status?: number
  /**  */
  updatedAt?: number
  /**  */
  updatedBy?: string
}

/**
 * requestUrl /finance/settlement_object/page
 * method post
 */
export interface GetAllSettlementObjectPageUsingPOSTRequest {
  
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
}

/**
 * requestUrl /finance/settlement_object/page
 * method post
 */
export interface GetAllSettlementObjectPageUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspSettleObjectPageRespDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /finance/settlement_object/save_or_update
 * method post
 */
export interface SaveOrUpdateSettlementObjectUsingPOSTRequest {
  
  /** 地址 */
  address: string
  /** 支付应用id */
  appId?: string
  /** 支付应用密钥（加密） */
  appSecret?: string
  /** 开户行 */
  bank: string
  /** 银行账号 */
  bankAccount: string
  /** 业务编码，结算主体标识 */
  bizCode?: string
  /** 唯一编码，更新必填 */
  code?: string
  /** 联系人电话 */
  contactMobile: string
  /** 联系人姓名 */
  contactName: string
  /** 税号 */
  dutyNo: string
  /** 诺诺发票-应用key */
  invoiceAppKey?: string
  /** 诺诺发票-应用密码 */
  invoiceAppSecret?: string
  /** 商户号/平台商户号 */
  merId?: string
  /** 进件应用id,正式环境同支付应用id */
  merchantAppId?: string
  /** 进件应用密钥,正式环境同支付应用密钥（加密） */
  merchantAppSecret?: string
  /** 进件私钥,正式环境同支付私钥（加密） */
  merchantPrivateKey?: string
  /** 结算主体名 */
  name: string
  /** 支付私钥（加密） */
  privateKey?: string
  /** 支付公钥（加密） */
  publicKey?: string
  /** 手续费率 */
  serviceChargeRatio?: number
  /** 收银员id */
  userId?: string
}

/**
 * requestUrl /finance/settlement_object/save_or_update
 * method post
 */
export interface SaveOrUpdateSettlementObjectUsingPOSTResponse {
  
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
 * requestUrl /finance/train/sub_train
 * method post
 */
export interface SubTrainStatisticUsingPOSTRequest {
  
  /**  培训班次 */
  classNum: number
  /**  合作机构 */
  orgNum: number
  /**  合格人数 */
  passNum: number
  /**  省份编码 */
  province: number
  /**  统计日期 */
  statisticDate: number
  /**  培训人次 */
  studentNum: number
  /** 业务线编码 1创培2职培3院校4线下5考评11就业12其他 */
  type: number
}

/**
 * requestUrl /finance/train/sub_train
 * method post
 */
export interface SubTrainStatisticUsingPOSTResponse {
  
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 培训情况数据 {
  
  /**  培训班次 */
  classNum?: number
  /**  合作机构 */
  orgNum?: number
  /**  合格人数 */
  passNum?: number
  /** 合格率 */
  passPercent?: number
  /**  培训人次 */
  studentNum?: number
}

/**
 * requestUrl /finance/train/train_data
 * method post
 */
export interface TrainDataUsingPOSTRequest {
  
  /** 查询结束时间 */
  endTime?: number
  /** 省份编码 */
  province?: number
  /** 查询开始时间 */
  startTime?: number
  /** 业务标签 */
  tag?: number
}

/**
 * requestUrl /finance/train/train_data
 * method post
 */
export interface TrainDataUsingPOSTResponse {
  
  /** 响应数据 */
  data?: 培训情况数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}