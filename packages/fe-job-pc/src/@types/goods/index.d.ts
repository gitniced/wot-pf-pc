
/**
 * 如果遇到bug，您可以钉钉搜索封东其或者给 fengdongqi@hzwotu.com 邮箱发邮件
 * 欢迎大家提 issue 或者 PR。
 * @title 沃土商品服务
 * @description 沃土商品服务是一个 Spring Boot项目
 * @version v1.0
 **/


interface 商品类目属性数据 {
  
  /** 编码 */
  code?: string
  /** 是否必填 */
  isRequire: boolean
  /** 名称 */
  name: string
}

/**
 * requestUrl /goods/category/category_attribute/{id}
 * method get
 */
export interface CategoryAttributeUsingGETResponse {
  
  /** 响应数据 */
  data?: 商品类目属性数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /goods/category/create
 * method post
 */
export interface CreateUsingPOSTRequest {
  
  /** 属性 */
  attributeList?: 商品类目属性数据
  /** 类目名称 */
  name: string
  /** 上级id */
  parentId?: number
  /** 排序 */
  sort?: number
  /** 标签id */
  tagList: any[]
}

/**
 * requestUrl /goods/category/create
 * method post
 */
export interface CreateUsingPOSTResponse {
  
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
 * requestUrl /goods/category/delete
 * method post
 */
export interface DeleteUsingPOSTRequest {
  
  /** id */
  id: number
}

/**
 * requestUrl /goods/category/delete
 * method post
 */
export interface DeleteUsingPOSTResponse {
  
  /** 响应数据 */
  data?: Record<string | number | symbol, any>
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 商品类目详情返回数据 {
  
  /** 属性 */
  attributeList?: 商品类目属性数据
  /** 创建时间 */
  createdAt?: number
  /** id */
  id?: number
  /** 物料编码 */
  matterCode?: string
  /** 类目名称 */
  name?: string
  /** 上级类目明细 */
  parentChain?: 商品类目列表
  /** 上级id */
  parentId?: number
  /** 上级名称 */
  parentName?: string
  /** 排序 */
  sort?: number
  /** 标签 */
  tagList?: 标签数据
  /** 修改时间 */
  updatedAt?: number
}

interface 商品类目列表 {
  
  /** id */
  id?: number
  /** 类目名称 */
  name?: string
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
 * requestUrl /goods/category/detail/{id}
 * method get
 */
export interface DetailUsingGETResponse {
  
  /** 响应数据 */
  data?: 商品类目详情返回数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /goods/category/edit
 * method post
 */
export interface EditUsingPOSTRequest {
  
  /** 属性 */
  attributeList?: 商品类目属性数据
  /** id */
  id: number
  /** 类目名称 */
  name: string
  /** 排序 */
  sort?: number
  /** 标签 */
  tagList: any[]
}

/**
 * requestUrl /goods/category/edit
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
 * requestUrl /goods/category/list/{parentId}
 * method get
 */
export interface ListByParentIdUsingGETResponse {
  
  /** 响应数据 */
  data?: 商品类目列表
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /goods/category/modify_sort
 * method post
 */
export interface ModifySortUsingPOSTRequest {
  
  /** id */
  id: number
  /** 排序 */
  sort: number
}

/**
 * requestUrl /goods/category/modify_sort
 * method post
 */
export interface ModifySortUsingPOSTResponse {
  
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
 * requestUrl /goods/category/modify_status
 * method post
 */
export interface ModifyStatusUsingPOSTRequest {
  
  /** id */
  id: number
  /** 状态 0开启  1 关闭 */
  status: number
}

/**
 * requestUrl /goods/category/modify_status
 * method post
 */
export interface ModifyStatusUsingPOSTResponse {
  
  /** 响应数据 */
  data?: Record<string | number | symbol, any>
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRsp商品分类分页返回数据 {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: 商品分类分页返回数据
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface 商品分类分页返回数据 {
  
  /** 关联下级数 */
  childNum?: number
  /** 操作时间 */
  createdAt?: number
  /** id */
  id?: number
  /** 物料编码 */
  matterCode?: string
  /** 类目名称 */
  name?: string
  /** 上级id */
  parentId?: number
  /** 上级名称 */
  parentName?: string
  /** 排序 */
  sort?: number
  /** 状态 0 开启  1关闭  */
  status?: number
  /** 标签 */
  tagList?: 标签数据
}

/**
 * requestUrl /goods/category/page
 * method post
 */
export interface PageUsingPOSTRequest {
  
  /** 类目名称 */
  name?: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 标签id */
  tagId?: number
}

/**
 * requestUrl /goods/category/page
 * method post
 */
export interface PageUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRsp商品分类分页返回数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /goods/category/sync_old_category
 * method get
 */
export interface SyncHistoryUsingGETResponse {
  
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 商品类目树结构 {
  
  /** 下级类目 */
  children?: 商品类目树结构
  /** id */
  key?: number
  /** 上级类目id */
  parentId?: number
  /** 类目名称 */
  title?: string
}

/**
 * requestUrl /goods/category/tree
 * method get
 */
export interface TreeUsingGETResponse {
  
  /** 响应数据 */
  data?: 商品类目树结构
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /goods/category/tree_normal
 * method get
 */
export interface TreeNormalUsingGETResponse {
  
  /** 响应数据 */
  data?: 商品类目树结构
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 添加商品属性数据 {
  
  /** 属性编码 */
  attributeCode: string
  /** 属性值 */
  value: string
}

/**
 * requestUrl /goods/v1/goods/create
 * method post
 */
export interface CreateUsingPOST_1Request {
  
  /** 代理商家 */
  agentMerchantCode?: string
  /** 属性 */
  attributeList?: 添加商品属性数据
  /** 商品唯一编码，不传则自动生成 */
  code?: string
  /** 商品简介 */
  content: string
  /** 类目别名 */
  goodsCategoryAlias: string
  /** 类目id */
  goodsCategoryId: number
  /** 辅图列表 */
  imageList?: any[]
  /** 主图 */
  imageUrl: string
  /** 物料编码 */
  matterCode: string
  /** 商家身份 */
  merchantIdentity?: number
  /** 商家 */
  merchantOrgCode?: string
  /** 商品名称 */
  name: string
  /** 单价 */
  price: number
  /** 推送类型 1普通推送  2代理推送 */
  pushMode?: number
  /** 服务费比例 */
  serviceFeeRatio?: number
  /** 站点id */
  sid?: number
  /** 税率 */
  taxRate: number
  /** 商品类型 1自营  2第三方 */
  type?: number
}

/**
 * requestUrl /goods/v1/goods/create
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

/**
 * requestUrl /goods/v1/goods/delete
 * method post
 */
export interface DeleteUsingPOST_1Request {
  
  /** code */
  code: string
}

/**
 * requestUrl /goods/v1/goods/delete
 * method post
 */
export interface DeleteUsingPOST_1Response {
  
  /** 响应数据 */
  data?: Record<string | number | symbol, any>
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 商品详情返回数据 {
  
  /** 代理商家编码 */
  agentMerchantCode?: string
  /** 代理商家编码 */
  agentMerchantName?: string
  /** 多级类目 */
  categoryList?: 商品类目列表
  /** 商品编码 */
  code?: string
  /** 商品简介 */
  content?: string
  /** 属性 */
  goodsAttributeList?: 商品属性数据
  /** 类目id */
  goodsCategoryId?: number
  /** 辅图列表 */
  imageList?: any[]
  /** 主图 */
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
  /** 推送方式 1普通推送  2代理推送 */
  pushMode?: number
  /** 服务费比率 */
  serviceFeeRatio?: number
  /** 站点 */
  site?: 站点基本信息列表
  /** 标签 */
  tagList?: 标签数据
  /** 税率 */
  taxRate?: number
  /** 商品类型 1自营  2第三方 */
  type?: number
  /** 商品类型 1自营  2第三方 */
  typeName?: string
}

interface 商品属性数据 {
  
  /** 属性编码 */
  attributeCode?: string
  /** 编码 */
  code?: string
  /** 商品编码 */
  goodsCode?: string
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
  /** 结算方式  1线上 2线下 */
  settleType?: string
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
 * requestUrl /goods/v1/goods/detail/{code}
 * method get
 */
export interface DetailUsingGET_1Response {
  
  /** 响应数据 */
  data?: 商品详情返回数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /goods/v1/goods/edit
 * method post
 */
export interface EditUsingPOST_1Request {
  
  /** 代理商家编码 */
  agentMerchantCode?: string
  /** 属性 */
  attributeList?: 添加商品属性数据
  /** 商品编码 */
  code: string
  /** 商品简介 */
  content: string
  /** 辅图列表 */
  imageList?: any[]
  /** 主图 */
  imageUrl: string
  /** 物料编码 */
  matterCode: string
  /** 商家编码 */
  merchantOrgCode?: string
  /** 商品名称 */
  name: string
  /** 单价 */
  price: number
  /** 服务费比率 */
  serviceFeeRatio?: number
  /** 上下架状态：0上架，1下架 */
  status?: number
  /** 税率 */
  taxRate: number
  /** 商品类型 */
  type?: number
}

/**
 * requestUrl /goods/v1/goods/edit
 * method post
 */
export interface EditUsingPOST_1Response {
  
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

/**
 * requestUrl /goods/v1/goods/list_by_codes
 * method post
 */
export interface ListByCodesUsingPOSTRequest {
  
  /** 商品编码 */
  codeList: any[]
}

/**
 * requestUrl /goods/v1/goods/list_by_codes
 * method post
 */
export interface ListByCodesUsingPOSTResponse {
  
  /** 响应数据 */
  data?: 商品分页返回数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /goods/v1/goods/modify_status
 * method post
 */
export interface ModifyStatusUsingPOST_1Request {
  
  /** code */
  code: string
  /** 状态 0开启  1 关闭 */
  status?: number
}

/**
 * requestUrl /goods/v1/goods/modify_status
 * method post
 */
export interface ModifyStatusUsingPOST_1Response {
  
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRsp商品分页返回数据 {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: 商品分页返回数据
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

/**
 * requestUrl /goods/v1/goods/page
 * method post
 */
export interface PageUsingPOST_1Request {
  
  /** 商品编码 */
  code?: string
  /** 结束日期 */
  endTime?: number
  /** 类目id */
  goodsCategoryId?: number
  /** 商品名称 */
  name?: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 开始日期 */
  startTime?: number
  /** 状态 */
  status?: number
  /** 标签id */
  tagId?: number
}

/**
 * requestUrl /goods/v1/goods/page
 * method post
 */
export interface PageUsingPOST_1Response {
  
  /** 响应数据 */
  data?: BasePaginationRsp商品分页返回数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /goods/front/v1/goods/list_by_codes
 * method post
 */
export interface ListByCodesUsingPOST_1Request {
  
  /** 商品编码 */
  codeList: any[]
}

/**
 * requestUrl /goods/front/v1/goods/list_by_codes
 * method post
 */
export interface ListByCodesUsingPOST_1Response {
  
  /** 响应数据 */
  data?: 商品分页返回数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}