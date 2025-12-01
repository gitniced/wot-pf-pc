
/**
 * 如果遇到bug，您可以钉钉搜索封东其或者给 fengdongqi@hzwotu.com 邮箱发邮件
 * 欢迎大家提 issue 或者 PR。
 * @title 沃土资源方服务
 * @description 沃土资源方服务是一个 Spring Boot项目
 * @version v1.0
 **/


interface 进件商家详情响应体 {
  
  /** 结算账号 */
  account?: string
  /** 结算账号户名 */
  accountName?: string
  /** 结算账号类型，1：个人结算账户，2：单位结算账户 */
  accountType?: number
  /** 详细地址 */
  addressDetail?: string
  /** 受益人身份证反面 */
  beneficiaryIdentityPicBack?: string
  /** 受益人身份证反面招行fieldId */
  beneficiaryIdentityPicBackField?: string
  /** 受益人身份证正面 */
  beneficiaryIdentityPicFront?: string
  /** 受益人身份证正面招行fieldId */
  beneficiaryIdentityPicFrontField?: string
  /** 营业执照图片 */
  bizLicensePic?: string
  /** 营业执照图片招行fieldId */
  bizLicensePicField?: string
  /** 业务流水号，重新签约传参 */
  bizNo?: string
  /** 经营场所图片1 */
  bizPlacePic1?: string
  /** 经营场所图片2 */
  bizPlacePic2?: string
  /** 经营场所图片3 */
  bizPlacePic3?: string
  /** 经营场所图片4 */
  bizPlacePic4?: string
  /** 经营场所图片5 */
  bizPlacePic5?: string
  /** 经营场所图片1招行fieldId */
  bizPlacePicField1?: string
  /** 经营场所图片2招行fieldId */
  bizPlacePicField2?: string
  /** 经营场所图片3招行fieldId */
  bizPlacePicField3?: string
  /** 经营场所图片4招行fieldId */
  bizPlacePicField4?: string
  /** 经营场所图片5招行fieldId */
  bizPlacePicField5?: string
  /** 经营分类，1：实体商户，2：网络商户，3：实体兼网络商户 */
  bizType?: number
  /** 城市编码 */
  city?: string
  /** 唯一编码 */
  code?: string
  /** 是否跨境电商，0：否，1：是 */
  crossBorder?: string
  /** 是否草稿，1：是，2：否 */
  draft?: number
  /** 签约链接过期时间，过期后链接失效 */
  expireTime?: number
  /** 进件失败原因 */
  failReason?: string
  /** 扣费账号 */
  feeAccount?: string
  /** 扣费账号户名 */
  feeAccountName?: string
  /** 证件号码 */
  identityNo?: string
  /** 证件类型，1：营业执照注册号（非三证合一），2：统一社会信用代码（三证合一证件），3：事业单位事业证，4：个体户注册号，5：社会团队社会号 */
  identityType?: number
  /** 法人代表身份证反面 */
  legalIdentityPicBack?: string
  /** 法人代表身份证反面招行fieldId */
  legalIdentityPicBackField?: string
  /** 法人代表身份证正面 */
  legalIdentityPicFront?: string
  /** 法人代表身份证正面招行fieldId */
  legalIdentityPicFrontField?: string
  /** 商户MCC编码 */
  mccCode?: string
  /** 商户MCC名称 */
  mccName?: string
  /** 商户联系电话 */
  mchtPhone?: string
  /** 自然人信息数组 */
  merchantNativeInfoList?: 商户自然人信息Res
  /** 资源方组织机构编码 */
  merchantOrgCode?: string
  /** 商户名称 */
  name?: string
  /** 结算账户开户行所在地 */
  openingBankAddress?: string
  /** 开户行所在地-城市编码 */
  openingBankCity?: string
  /** 结算账户开户行名称 */
  openingBankName?: string
  /** 开户行所在地-省份编码 */
  openingBankProvince?: string
  /** 组织机构代码，营业执照注册号必填 */
  orgCode?: string
  /** 组织机构代码生效日期，营业执照注册号必填 */
  orgCodeEffect?: string
  /** 组织机构代码过期日期，营业执照注册号必填 */
  orgCodeExpiration?: string
  /** 拟开通产品，多个英文逗号分隔，默认为JHP聚合支付，开通产品列表：["JHP","JYT","B2B"] （JHP：聚合支付，JYT:交易通，B2B：B2B云账单） */
  productList?: string
  /** 省份编码 */
  province?: string
  /** 退款账号 */
  refundAccount?: string
  /** 退款账号户名 */
  refundAccountName?: string
  /** 业财-结算主体编码 */
  settleTargetCode?: string
  /** 商户简称 */
  shortName?: string
  /** 招行签约链接 */
  signUrl?: string
  /** 审核状态，1：进件中，2：进件成功，3：进件失败 */
  status?: number
  /** 税务登记证号，营业执照注册号必填 */
  taxCode?: string
  /** 税务登记证生效日期，营业执照注册号必填 */
  taxCodeEffect?: string
  /** 税务登记证过期日期，营业执照注册号必填 */
  taxCodeExpiration?: string
  /** 区县编码 */
  zone?: string
}

interface 商户自然人信息Res {
  
  /** 唯一编码 */
  code?: string
  /** 进件商家唯一编码 */
  merchantCode?: string
  /** 自然人地址 */
  nativeAddress?: string
  /** 证件生效日期 */
  nativeIdentityEffect?: string
  /** 证件失效日期 */
  nativeIdentityExpiration?: string
  /** 证件号码 */
  nativeIdentityNo?: string
  /** 自然人证件类型，1：身份证，2：军官证，3：护照，4：户口簿，5：士兵证，6：港澳来往内地通行证，7：台湾同胞来往内地通行证，8：临时身份证，9：外国人居留证，10：警官证，11：其他 */
  nativeIdentityType?: number
  /** 自然人姓名 */
  nativeName?: string
  /** 自然人电话 */
  nativePhone?: string
  /** 自然人类型，1：法人代表，2：商户负责人，3：授权经办人，6：业务联系人，A：商户管理员，4：受益人 */
  nativeType?: string
  /** 是否同法人，0：否，1：是 */
  sameLegal?: string
}

/**
 * requestUrl /merchant/backend/create/detail
 * method get
 */
export interface DetailUsingGETResponse {
  
  /** 响应数据 */
  data?: 进件商家详情响应体
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /merchant/backend/create/detail_platform
 * method get
 */
export interface DetailPlatformUsingGETResponse {
  
  /** 响应数据 */
  data?: 进件商家详情响应体
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 商户自然人信息Req {
  
  /** 唯一编码 */
  code?: string
  /** 进件商家唯一编码 */
  merchantCode?: string
  /**  */
  nativeAddress?: string
  /** 证件生效日期 */
  nativeIdentityEffect?: string
  /** 证件失效日期 */
  nativeIdentityExpiration?: string
  /** 证件号码 */
  nativeIdentityNo?: string
  /** 自然人证件类型，1：身份证，2：军官证，3：护照，4：户口簿，5：士兵证，6：港澳来往内地通行证，7：台湾同胞来往内地通行证，8：临时身份证，9：外国人居留证，10：警官证，11：其他 */
  nativeIdentityType?: number
  /** 自然人姓名 */
  nativeName?: string
  /** 自然人电话 */
  nativePhone?: string
  /** 自然人类型，1：法人代表，2：商户负责人，3：授权经办人，6：业务联系人，A：商户管理员，4：受益人 */
  nativeType?: string
  /** 是否同法人，0：否，1：是 */
  sameLegal?: string
}

/**
 * requestUrl /merchant/backend/create/draft
 * method post
 */
export interface SaveOrUpdateDraftUsingPOSTRequest {
  
  /** 结算账号 */
  account?: string
  /** 结算账号户名 */
  accountName?: string
  /** 结算账号类型，1：个人结算账户，2：单位结算账户 */
  accountType?: number
  /** 详细地址 */
  addressDetail?: string
  /** 受益人身份证反面 */
  beneficiaryIdentityPicBack?: string
  /** 受益人身份证反面招行fieldId */
  beneficiaryIdentityPicBackField?: string
  /** 受益人身份证正面 */
  beneficiaryIdentityPicFront?: string
  /** 受益人身份证正面招行fieldId */
  beneficiaryIdentityPicFrontField?: string
  /** 营业执照图片 */
  bizLicensePic?: string
  /** 营业执照图片招行fieldId */
  bizLicensePicField?: string
  /** 经营场所图片1 */
  bizPlacePic1?: string
  /** 经营场所图片2 */
  bizPlacePic2?: string
  /** 经营场所图片3 */
  bizPlacePic3?: string
  /** 经营场所图片4 */
  bizPlacePic4?: string
  /** 经营场所图片5 */
  bizPlacePic5?: string
  /** 经营场所图片1招行fieldId */
  bizPlacePicField1?: string
  /** 经营场所图片2招行fieldId */
  bizPlacePicField2?: string
  /** 经营场所图片3招行fieldId */
  bizPlacePicField3?: string
  /** 经营场所图片4招行fieldId */
  bizPlacePicField4?: string
  /** 经营场所图片5招行fieldId */
  bizPlacePicField5?: string
  /** 经营分类，1：实体商户，2：网络商户，3：实体兼网络商户 */
  bizType?: number
  /** 城市编码 */
  city?: string
  /** 唯一编码 */
  code?: string
  /** 是否跨境电商，0：否，1：是 */
  crossBorder?: string
  /** 扣费账号 */
  feeAccount?: string
  /** 扣费账号户名 */
  feeAccountName?: string
  /** 证件号码 */
  identityNo?: string
  /** 证件类型，1：营业执照注册号（非三证合一），2：统一社会信用代码（三证合一证件），3：事业单位事业证，4：个体户注册号，5：社会团队社会号 */
  identityType?: number
  /** 是否有受益人，0：否，1：是 */
  isProfitPeople?: string
  /** 法人代表身份证反面 */
  legalIdentityPicBack?: string
  /** 法人代表身份证反面招行fieldId */
  legalIdentityPicBackField?: string
  /** 法人代表身份证正面 */
  legalIdentityPicFront?: string
  /** 法人代表身份证正面招行fieldId */
  legalIdentityPicFrontField?: string
  /** 商户MCC编码 */
  mccCode?: string
  /** 商户联系电话 */
  mchtPhone?: string
  /** 经营商户为资源方组织编码,平台商户为结算主体编码 */
  merchantOrgCode?: string
  /** 商户名称 */
  name?: string
  /** 商户自然人信息数组 */
  nativePersons?: 商户自然人信息Req
  /** 结算账户开户行所在地 */
  openingBankAddress?: string
  /** 开户行所在地-城市编码 */
  openingBankCity?: string
  /** 结算账户开户行名称 */
  openingBankName?: string
  /** 开户行所在地-省份编码 */
  openingBankProvince?: string
  /** 组织机构代码，营业执照注册号必填 */
  orgCode?: string
  /** 组织机构代码生效日期，营业执照注册号必填 */
  orgCodeEffect?: string
  /** 组织机构代码过期日期，营业执照注册号必填 */
  orgCodeExpiration?: string
  /** 省份编码 */
  province?: string
  /** 退款账号 */
  refundAccount?: string
  /** 退款账号户名 */
  refundAccountName?: string
  /** 业财-结算主体编码 */
  settleTargetCode?: string
  /** 商户简称 */
  shortName?: string
  /** 税务登记证号，营业执照注册号必填 */
  taxCode?: string
  /** 税务登记证生效日期，营业执照注册号必填 */
  taxCodeEffect?: string
  /** 税务登记证过期日期，营业执照注册号必填 */
  taxCodeExpiration?: string
  /** 区县编码 */
  zone?: string
}

/**
 * requestUrl /merchant/backend/create/draft
 * method post
 */
export interface SaveOrUpdateDraftUsingPOSTResponse {
  
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
 * requestUrl /merchant/backend/create/expire_platform_config_cache
 * method get
 */
export interface ExpirePlatformConfigCacheUsingGETResponse {
  
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
 * requestUrl /merchant/backend/create/fill_cache_for_created_merchant
 * method get
 */
export interface FillCacheForCreatedMerchantUsingGETResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface IndustryCategoryRespDto {
  
  /** 下级行业分类数组 */
  childCategory?: IndustryCategoryRespDto
  /** 唯一编码 */
  id?: number
  /** MCC编码 */
  mccCode?: string
  /** 类别名称 */
  name?: string
  /** 上级分类编码，-1为顶级分类 */
  pid?: number
}

/**
 * requestUrl /merchant/backend/create/industry_category_tree
 * method get
 */
export interface IndustryCategoryTreeUsingGETResponse {
  
  /** 响应数据 */
  data?: IndustryCategoryRespDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 进件商家基本信息 {
  
  /** 唯一编码 */
  code?: string
  /** 是否草稿，1：是，2：否 */
  draft?: number
  /** 进件失败原因 */
  failReason?: string
  /** 资源方组织机构编码 */
  merchantOrgCode?: string
  /** 进件商家类型,1:平台商户,2经营商户 */
  merchantType?: number
  /** 商户名称 */
  name?: string
  /** 业财-结算主体编码 */
  settleTargetCode?: string
  /** 审核状态，1：进件中，2：进件成功，3：进件失败 */
  status?: number
}

/**
 * requestUrl /merchant/backend/create/list_platform_by_settlement
 * method get
 */
export interface ListPlatformBySettlementUsingGETResponse {
  
  /** 响应数据 */
  data?: 进件商家基本信息
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRsp商家进件分页响应对象 {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: 商家进件分页响应对象
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface 商家进件分页响应对象 {
  
  /** 唯一编码 */
  code?: string
  /** 进件时间 */
  createTime?: number
  /** 资源方唯一编码（前端展示ID） */
  merchantOrgCode?: string
  /** 资源方机构名称 */
  merchantOrgName?: string
  /** 资源方机构简称 */
  merchantOrgShortName?: string
  /** 进件商家类型,1:平台商户,2经营商户 */
  merchantType?: number
  /** 业财-结算主体编码 */
  settleTargetCode?: string
  /** 审核状态，1：进件中，2：进件成功，3：进件失败 */
  status?: number
}

/**
 * requestUrl /merchant/backend/create/page
 * method post
 */
export interface PageUsingPOSTRequest {
  
  /** 唯一编码 */
  code?: string
  /** 资源方组织机构编码 */
  merchantOrgCode?: string
  /** 资源方组织机构编码-资源方简称传递 */
  merchantOrgCodeForShort?: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 审核状态，1：进件中，2：进件成功，3：进件失败 */
  status?: number
}

/**
 * requestUrl /merchant/backend/create/page
 * method post
 */
export interface PageUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRsp商家进件分页响应对象
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /merchant/backend/create/reset_status
 * method get
 */
export interface ResetStatusUsingGETResponse {
  
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
 * requestUrl /merchant/backend/create/resign
 * method get
 */
export interface ResignUsingGETResponse {
  
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
 * requestUrl /merchant/backend/create/submit
 * method post
 */
export interface FrontSubmitMerchantUsingPOSTRequest {
  
  /** 结算账号 */
  account?: string
  /** 结算账号户名 */
  accountName?: string
  /** 结算账号类型，1：个人结算账户，2：单位结算账户 */
  accountType?: number
  /** 详细地址 */
  addressDetail?: string
  /** 受益人身份证反面 */
  beneficiaryIdentityPicBack?: string
  /** 受益人身份证反面招行fieldId */
  beneficiaryIdentityPicBackField?: string
  /** 受益人身份证正面 */
  beneficiaryIdentityPicFront?: string
  /** 受益人身份证正面招行fieldId */
  beneficiaryIdentityPicFrontField?: string
  /** 营业执照图片 */
  bizLicensePic?: string
  /** 营业执照图片招行fieldId */
  bizLicensePicField?: string
  /** 经营场所图片1 */
  bizPlacePic1?: string
  /** 经营场所图片2 */
  bizPlacePic2?: string
  /** 经营场所图片3 */
  bizPlacePic3?: string
  /** 经营场所图片4 */
  bizPlacePic4?: string
  /** 经营场所图片5 */
  bizPlacePic5?: string
  /** 经营场所图片1招行fieldId */
  bizPlacePicField1?: string
  /** 经营场所图片2招行fieldId */
  bizPlacePicField2?: string
  /** 经营场所图片3招行fieldId */
  bizPlacePicField3?: string
  /** 经营场所图片4招行fieldId */
  bizPlacePicField4?: string
  /** 经营场所图片5招行fieldId */
  bizPlacePicField5?: string
  /** 经营分类，1：实体商户，2：网络商户，3：实体兼网络商户 */
  bizType?: number
  /** 城市编码 */
  city?: string
  /** 唯一编码 */
  code?: string
  /** 是否跨境电商，0：否，1：是 */
  crossBorder?: string
  /** 扣费账号 */
  feeAccount?: string
  /** 扣费账号户名 */
  feeAccountName?: string
  /** 证件号码 */
  identityNo?: string
  /** 证件类型，1：营业执照注册号（非三证合一），2：统一社会信用代码（三证合一证件），3：事业单位事业证，4：个体户注册号，5：社会团队社会号 */
  identityType?: number
  /** 是否有受益人，0：否，1：是 */
  isProfitPeople?: string
  /** 法人代表身份证反面 */
  legalIdentityPicBack?: string
  /** 法人代表身份证反面招行fieldId */
  legalIdentityPicBackField?: string
  /** 法人代表身份证正面 */
  legalIdentityPicFront?: string
  /** 法人代表身份证正面招行fieldId */
  legalIdentityPicFrontField?: string
  /** 商户MCC编码 */
  mccCode?: string
  /** 商户联系电话 */
  mchtPhone?: string
  /** 经营商户为资源方组织编码,平台商户为结算主体编码 */
  merchantOrgCode?: string
  /** 商户名称 */
  name?: string
  /** 商户自然人信息数组 */
  nativePersons?: 商户自然人信息Req
  /** 结算账户开户行所在地 */
  openingBankAddress?: string
  /** 开户行所在地-城市编码 */
  openingBankCity?: string
  /** 结算账户开户行名称 */
  openingBankName?: string
  /** 开户行所在地-省份编码 */
  openingBankProvince?: string
  /** 组织机构代码，营业执照注册号必填 */
  orgCode?: string
  /** 组织机构代码生效日期，营业执照注册号必填 */
  orgCodeEffect?: string
  /** 组织机构代码过期日期，营业执照注册号必填 */
  orgCodeExpiration?: string
  /** 省份编码 */
  province?: string
  /** 退款账号 */
  refundAccount?: string
  /** 退款账号户名 */
  refundAccountName?: string
  /** 业财-结算主体编码 */
  settleTargetCode?: string
  /** 商户简称 */
  shortName?: string
  /** 税务登记证号，营业执照注册号必填 */
  taxCode?: string
  /** 税务登记证生效日期，营业执照注册号必填 */
  taxCodeEffect?: string
  /** 税务登记证过期日期，营业执照注册号必填 */
  taxCodeExpiration?: string
  /** 区县编码 */
  zone?: string
}

/**
 * requestUrl /merchant/backend/create/submit
 * method post
 */
export interface FrontSubmitMerchantUsingPOSTResponse {
  
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
 * requestUrl /merchant/backend/create/upload_image
 * method post
 */
export interface UploadImageUsingPOSTRequest {
  
}

/**
 * requestUrl /merchant/backend/create/upload_image
 * method post
 */
export interface UploadImageUsingPOSTResponse {
  
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
 * requestUrl /merchant/front/create/check_create_success
 * method get
 */
export interface CheckCreateSuccessUsingGETResponse {
  
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
 * requestUrl /merchant/front/create/detail
 * method post
 */
export interface DetailUsingPOSTRequest {
  
  /** 资源方组织编码 */
  merchantOrgCode?: string
  /** 业财-结算主体编码 */
  settleTargetCode?: string
}

/**
 * requestUrl /merchant/front/create/detail
 * method post
 */
export interface DetailUsingPOSTResponse {
  
  /** 响应数据 */
  data?: 进件商家详情响应体
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /merchant/front/create/draft
 * method post
 */
export interface SaveOrUpdateDraftUsingPOST_1Request {
  
  /** 结算账号 */
  account?: string
  /** 结算账号户名 */
  accountName?: string
  /** 结算账号类型，1：个人结算账户，2：单位结算账户 */
  accountType?: number
  /** 详细地址 */
  addressDetail?: string
  /** 受益人身份证反面 */
  beneficiaryIdentityPicBack?: string
  /** 受益人身份证反面招行fieldId */
  beneficiaryIdentityPicBackField?: string
  /** 受益人身份证正面 */
  beneficiaryIdentityPicFront?: string
  /** 受益人身份证正面招行fieldId */
  beneficiaryIdentityPicFrontField?: string
  /** 营业执照图片 */
  bizLicensePic?: string
  /** 营业执照图片招行fieldId */
  bizLicensePicField?: string
  /** 经营场所图片1 */
  bizPlacePic1?: string
  /** 经营场所图片2 */
  bizPlacePic2?: string
  /** 经营场所图片3 */
  bizPlacePic3?: string
  /** 经营场所图片4 */
  bizPlacePic4?: string
  /** 经营场所图片5 */
  bizPlacePic5?: string
  /** 经营场所图片1招行fieldId */
  bizPlacePicField1?: string
  /** 经营场所图片2招行fieldId */
  bizPlacePicField2?: string
  /** 经营场所图片3招行fieldId */
  bizPlacePicField3?: string
  /** 经营场所图片4招行fieldId */
  bizPlacePicField4?: string
  /** 经营场所图片5招行fieldId */
  bizPlacePicField5?: string
  /** 经营分类，1：实体商户，2：网络商户，3：实体兼网络商户 */
  bizType?: number
  /** 城市编码 */
  city?: string
  /** 唯一编码 */
  code?: string
  /** 是否跨境电商，0：否，1：是 */
  crossBorder?: string
  /** 扣费账号 */
  feeAccount?: string
  /** 扣费账号户名 */
  feeAccountName?: string
  /** 证件号码 */
  identityNo?: string
  /** 证件类型，1：营业执照注册号（非三证合一），2：统一社会信用代码（三证合一证件），3：事业单位事业证，4：个体户注册号，5：社会团队社会号 */
  identityType?: number
  /** 是否有受益人，0：否，1：是 */
  isProfitPeople?: string
  /** 法人代表身份证反面 */
  legalIdentityPicBack?: string
  /** 法人代表身份证反面招行fieldId */
  legalIdentityPicBackField?: string
  /** 法人代表身份证正面 */
  legalIdentityPicFront?: string
  /** 法人代表身份证正面招行fieldId */
  legalIdentityPicFrontField?: string
  /** 商户MCC编码 */
  mccCode?: string
  /** 商户联系电话 */
  mchtPhone?: string
  /** 经营商户为资源方组织编码,平台商户为结算主体编码 */
  merchantOrgCode?: string
  /** 商户名称 */
  name?: string
  /** 商户自然人信息数组 */
  nativePersons?: 商户自然人信息Req
  /** 结算账户开户行所在地 */
  openingBankAddress?: string
  /** 开户行所在地-城市编码 */
  openingBankCity?: string
  /** 结算账户开户行名称 */
  openingBankName?: string
  /** 开户行所在地-省份编码 */
  openingBankProvince?: string
  /** 组织机构代码，营业执照注册号必填 */
  orgCode?: string
  /** 组织机构代码生效日期，营业执照注册号必填 */
  orgCodeEffect?: string
  /** 组织机构代码过期日期，营业执照注册号必填 */
  orgCodeExpiration?: string
  /** 省份编码 */
  province?: string
  /** 退款账号 */
  refundAccount?: string
  /** 退款账号户名 */
  refundAccountName?: string
  /** 业财-结算主体编码 */
  settleTargetCode?: string
  /** 商户简称 */
  shortName?: string
  /** 税务登记证号，营业执照注册号必填 */
  taxCode?: string
  /** 税务登记证生效日期，营业执照注册号必填 */
  taxCodeEffect?: string
  /** 税务登记证过期日期，营业执照注册号必填 */
  taxCodeExpiration?: string
  /** 区县编码 */
  zone?: string
}

/**
 * requestUrl /merchant/front/create/draft
 * method post
 */
export interface SaveOrUpdateDraftUsingPOST_1Response {
  
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
 * requestUrl /merchant/front/create/industry_category_tree
 * method get
 */
export interface IndustryCategoryTreeUsingGET_1Response {
  
  /** 响应数据 */
  data?: IndustryCategoryRespDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /merchant/front/create/resign
 * method get
 */
export interface ResignUsingGET_1Response {
  
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
 * requestUrl /merchant/front/create/submit
 * method post
 */
export interface FrontSubmitMerchantUsingPOST_1Request {
  
  /** 结算账号 */
  account?: string
  /** 结算账号户名 */
  accountName?: string
  /** 结算账号类型，1：个人结算账户，2：单位结算账户 */
  accountType?: number
  /** 详细地址 */
  addressDetail?: string
  /** 受益人身份证反面 */
  beneficiaryIdentityPicBack?: string
  /** 受益人身份证反面招行fieldId */
  beneficiaryIdentityPicBackField?: string
  /** 受益人身份证正面 */
  beneficiaryIdentityPicFront?: string
  /** 受益人身份证正面招行fieldId */
  beneficiaryIdentityPicFrontField?: string
  /** 营业执照图片 */
  bizLicensePic?: string
  /** 营业执照图片招行fieldId */
  bizLicensePicField?: string
  /** 经营场所图片1 */
  bizPlacePic1?: string
  /** 经营场所图片2 */
  bizPlacePic2?: string
  /** 经营场所图片3 */
  bizPlacePic3?: string
  /** 经营场所图片4 */
  bizPlacePic4?: string
  /** 经营场所图片5 */
  bizPlacePic5?: string
  /** 经营场所图片1招行fieldId */
  bizPlacePicField1?: string
  /** 经营场所图片2招行fieldId */
  bizPlacePicField2?: string
  /** 经营场所图片3招行fieldId */
  bizPlacePicField3?: string
  /** 经营场所图片4招行fieldId */
  bizPlacePicField4?: string
  /** 经营场所图片5招行fieldId */
  bizPlacePicField5?: string
  /** 经营分类，1：实体商户，2：网络商户，3：实体兼网络商户 */
  bizType?: number
  /** 城市编码 */
  city?: string
  /** 唯一编码 */
  code?: string
  /** 是否跨境电商，0：否，1：是 */
  crossBorder?: string
  /** 扣费账号 */
  feeAccount?: string
  /** 扣费账号户名 */
  feeAccountName?: string
  /** 证件号码 */
  identityNo?: string
  /** 证件类型，1：营业执照注册号（非三证合一），2：统一社会信用代码（三证合一证件），3：事业单位事业证，4：个体户注册号，5：社会团队社会号 */
  identityType?: number
  /** 是否有受益人，0：否，1：是 */
  isProfitPeople?: string
  /** 法人代表身份证反面 */
  legalIdentityPicBack?: string
  /** 法人代表身份证反面招行fieldId */
  legalIdentityPicBackField?: string
  /** 法人代表身份证正面 */
  legalIdentityPicFront?: string
  /** 法人代表身份证正面招行fieldId */
  legalIdentityPicFrontField?: string
  /** 商户MCC编码 */
  mccCode?: string
  /** 商户联系电话 */
  mchtPhone?: string
  /** 经营商户为资源方组织编码,平台商户为结算主体编码 */
  merchantOrgCode?: string
  /** 商户名称 */
  name?: string
  /** 商户自然人信息数组 */
  nativePersons?: 商户自然人信息Req
  /** 结算账户开户行所在地 */
  openingBankAddress?: string
  /** 开户行所在地-城市编码 */
  openingBankCity?: string
  /** 结算账户开户行名称 */
  openingBankName?: string
  /** 开户行所在地-省份编码 */
  openingBankProvince?: string
  /** 组织机构代码，营业执照注册号必填 */
  orgCode?: string
  /** 组织机构代码生效日期，营业执照注册号必填 */
  orgCodeEffect?: string
  /** 组织机构代码过期日期，营业执照注册号必填 */
  orgCodeExpiration?: string
  /** 省份编码 */
  province?: string
  /** 退款账号 */
  refundAccount?: string
  /** 退款账号户名 */
  refundAccountName?: string
  /** 业财-结算主体编码 */
  settleTargetCode?: string
  /** 商户简称 */
  shortName?: string
  /** 税务登记证号，营业执照注册号必填 */
  taxCode?: string
  /** 税务登记证生效日期，营业执照注册号必填 */
  taxCodeEffect?: string
  /** 税务登记证过期日期，营业执照注册号必填 */
  taxCodeExpiration?: string
  /** 区县编码 */
  zone?: string
}

/**
 * requestUrl /merchant/front/create/submit
 * method post
 */
export interface FrontSubmitMerchantUsingPOST_1Response {
  
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
 * requestUrl /merchant/front/create/upload_image
 * method post
 */
export interface UploadImageUsingPOST_1Request {
  
}

/**
 * requestUrl /merchant/front/create/upload_image
 * method post
 */
export interface UploadImageUsingPOST_1Response {
  
  /** 响应数据 */
  data?: string
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}