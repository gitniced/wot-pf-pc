
/**
 * 如果遇到bug，您可以钉钉搜索封东其或者给 fengdongqi@hzwotu.com 邮箱发邮件
 * 欢迎大家提 issue 或者 PR。
 * @title 沃土组织服务
 * @description 沃土组织服务是一个 Spring Boot项目
 * @version v1.0
 **/


/**
 * requestUrl /organization/backend/organization/approve
 * method post
 */
export interface CertifyApproveUsingPOSTRequest {
  
  /** 审批意见 */
  approveOpinion?: string
  /** 审批状态: 1：通过 2：驳回 */
  approveStatus: number
  /** 组织编码 */
  code: string
}

/**
 * requestUrl /organization/backend/organization/approve
 * method post
 */
export interface CertifyApproveUsingPOSTResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BackendOrganizationDetailDto {
  
  /** 地址 */
  address?: string
  /** 区 */
  area?: number
  /** 区名称 */
  areaName?: string
  /** 认证时间 */
  certifyAt?: number
  /** 认证状态 0-未认证 ；1-已认证；2-审核中 */
  certifyStatus?: number
  /** 市 */
  city?: number
  /** 市名称 */
  cityName?: string
  /** 组织唯一编码 */
  code?: string
  /** 统一信用代码 */
  companyCode?: string
  /** 联系人邮箱 */
  contactEmail?: string
  /** 联系人职务 */
  contactJob?: string
  /** 联系人手机号 */
  contactMobile?: string
  /** 联系人姓名 */
  contactName?: string
  /** 创建时间 */
  createdAt?: number
  /** 证件照片 */
  creditImage?: string
  /** 来源站点 */
  fromSid?: number
  /** 来源站点名称 */
  fromSiteName?: string
  /** 身份 */
  identityList?: any[]
  /** 身份名称 */
  identityNameList?: any[]
  /** 所属行业ID */
  industryId?: number
  /** 行业 */
  industryList?: 行业数据
  /** 法人姓名 */
  legalPersonName?: string
  /** 组织logo */
  logo?: string
  /** 组织名称 */
  name?: string
  /** 省 */
  province?: number
  /** 省名称 */
  provinceName?: string
  /** 规模 */
  scale?: string
  /** 规模 */
  scaleName?: string
  /** 组织简称 */
  shortName?: string
  /** 站点id */
  sid?: number
  /** 站点名称 */
  siteName?: string
  /** 状态 0-正常，1-禁用 */
  status?: number
  /** 角色  2机构 3资源方 */
  type?: number
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
 * requestUrl /organization/backend/organization/detail/{organizationCode}
 * method get
 */
export interface OrganizationDetailUsingGETResponse {
  
  /** 响应数据 */
  data?: BackendOrganizationDetailDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /organization/backend/organization/edit
 * method post
 */
export interface EditBaseInfoUsingPOSTRequest {
  
  /** 地址 */
  address?: string
  /** 所在地址区(编码code) */
  area: number
  /** 所在地址市(编码code) */
  city: number
  /** 组织编码 */
  code: string
  /** 统一信用代码 */
  companyCode?: string
  /** 联系人邮箱 */
  contactEmail?: string
  /** 联系人职务 */
  contactJob?: string
  /** 联系人手机号 */
  contactMobile?: string
  /** 联系人姓名 */
  contactName?: string
  /** 营业执照 法人照片 */
  creditImage?: string
  /** 所属行业(二级行业id) */
  industryId: number
  /** 组织logo */
  logo?: string
  /** 组织名称 */
  name: string
  /** 所在地址省份(编码code) */
  province: number
  /** 组织规模(key) */
  scale: number
  /** 组织简称 */
  shortName?: string
}

/**
 * requestUrl /organization/backend/organization/edit
 * method post
 */
export interface EditBaseInfoUsingPOSTResponse {
  
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
 * requestUrl /organization/backend/organization/modify_status
 * method post
 */
export interface ChangeStatusUsingPOSTRequest {
  
  /** 组织编码 */
  code: string
  /** 状态 0正常  1禁用 */
  status: string
}

/**
 * requestUrl /organization/backend/organization/modify_status
 * method post
 */
export interface ChangeStatusUsingPOSTResponse {
  
  /** 响应数据 */
  data?: Record<string | number | symbol, any>
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspBackendOrganizationDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: BackendOrganizationDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface BackendOrganizationDto {
  
  /** 地址 */
  address?: string
  /** 认证时间 */
  certifyAt?: number
  /** 认证状态 */
  certifyStatus?: number
  /** 组织唯一编码 */
  code?: string
  /** 统一信用代码 */
  companyCode?: string
  /** 联系人邮箱 */
  contactEmail?: string
  /** 联系人职务 */
  contactJob?: string
  /** 联系人手机号 */
  contactMobile?: string
  /** 联系人姓名 */
  contactName?: string
  /** 创建时间 */
  createdAt?: number
  /** 工商证件照 */
  creditImage?: string
  /** 来源站点 */
  fromSid?: number
  /** 法人姓名 */
  legalPersonName?: string
  /** 组织logo */
  logo?: string
  /** 组织名称 */
  name?: string
  /** 组织简称 */
  shortName?: string
  /** 站点id */
  sid?: number
  /** 站点名称 */
  siteName?: string
  /** 组织人数 */
  staffCount?: number
  /** 状态 0-正常，1-禁用 */
  status?: number
  /** 管理员编码 */
  userCode?: string
  /** 管理员姓名 */
  userName?: string
}

/**
 * requestUrl /organization/backend/organization/page
 * method post
 */
export interface PageUsingPOSTRequest {
  
  /** 认证状态 0未认证  1已认证 2审批中 */
  certifyStatus?: number
  /** 组织名称 */
  name?: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 站点id */
  sid?: string
  /** 组织类型 2机构 3资源方 */
  type?: number
}

/**
 * requestUrl /organization/backend/organization/page
 * method post
 */
export interface PageUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspBackendOrganizationDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /organization/backend/organization/page_name
 * method post
 */
export interface PageNameUsingPOSTRequest {
  
  /** 认证状态 0未认证  1已认证 2审批中 */
  certifyStatus?: number
  /** 组织名称 */
  name?: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 站点id */
  sid?: string
  /** 组织类型 2机构 3资源方 */
  type?: number
}

/**
 * requestUrl /organization/backend/organization/page_name
 * method post
 */
export interface PageNameUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspBackendOrganizationDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspBackendOrganizationStaffDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: BackendOrganizationStaffDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface BackendOrganizationStaffDto {
  
  /** 唯一编码 */
  code?: string
  /** 激活状态，0未激活1已激活 */
  enable?: number
  /** 手机号 */
  mobile?: string
  /** 姓名 */
  name?: string
  /** 组织编码 */
  organizationCode?: string
  /** 角色 */
  role?: string
  /** 角色名称 */
  roleName?: string
  /** 用户编码 */
  userCode?: string
}

/**
 * requestUrl /organization/backend/organization/staff_page
 * method post
 */
export interface PageUsingPOST_2Request {
  
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
 * requestUrl /organization/backend/organization/staff_page
 * method post
 */
export interface PageUsingPOST_2Response {
  
  /** 响应数据 */
  data?: BasePaginationRspBackendOrganizationStaffDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /organization/backend/organization/sync_org
 * method get
 */
export interface SyncOrgUsingGETResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspBackendOrganizationPageDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: BackendOrganizationPageDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface BackendOrganizationPageDto {
  
  /** 认证时间 */
  certifyAt?: number
  /** 认证状态 0-未认证 ；1-已认证；2-审核中 */
  certifyStatus?: number
  /** 组织唯一编码 */
  code?: string
  /** 统一信用代码 */
  companyCode?: string
  /** 创建时间 */
  createdAt?: number
  /** 来源站点 */
  fromSid?: number
  /** 来源站点名称 */
  fromSiteName?: string
  /** 身份 */
  identityList?: any[]
  /** 身份名称 */
  identityNameList?: any[]
  /** 组织logo */
  logo?: string
  /** 组织名称 */
  name?: string
  /** 组织简称 */
  shortName?: string
  /** 站点id */
  sid?: number
  /** 站点名称 */
  siteName?: string
  /** 状态 0-正常，1-禁用 */
  status?: number
  /** 角色  2机构 3资源方 */
  type?: number
}

/**
 * requestUrl /organization/backend/organization/v2/page
 * method post
 */
export interface PageUsingPOST_1Request {
  
  /** 认证结束日期 */
  certifyEndTime?: number
  /** 认证开始日期 */
  certifyStartTime?: number
  /** 认证状态 */
  certifyStatus?: number
  /** 创建结束日期 */
  endTime?: number
  /** 注册来源 */
  fromSid?: number
  /** 身份 */
  identity?: number
  /** 组织名称 */
  name?: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 简称 */
  shortName?: string
  /** 站点id */
  sid?: number
  /** 创建开始日期 */
  startTime?: number
  /** 角色  2机构  3资源方 */
  type?: number
}

/**
 * requestUrl /organization/backend/organization/v2/page
 * method post
 */
export interface PageUsingPOST_1Response {
  
  /** 响应数据 */
  data?: BasePaginationRspBackendOrganizationPageDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface RolePermissionDto {
  
  /** 别名 */
  alias?: string
  /** api接口 */
  apiList?: any[]
  /** 是否能修改 */
  changeEnable?: boolean
  /** 选中icon */
  checkIcon?: string
  /** 子页面 */
  childList?: any[]
  /** 下级权限 */
  children?: RolePermissionDto
  /** 描述 */
  description?: string
  /** 是否拥有权限 */
  has?: boolean
  /** 隐藏状态 开启  false    关闭 true */
  hide?: boolean
  /** icon */
  icon?: string
  /** 权限编码id */
  key?: number
  /** 布局-页头   1展示 0关闭 */
  layoutHeader?: number
  /** 布局-菜单   1展示 0关闭 */
  layoutMenu?: number
  /** 是否菜单 0否 1是 */
  menu?: number
  /** 模块id */
  moduleId?: number
  /** 模块名称 */
  moduleName?: string
  /** 打开方式 0当前页面  1新页面 */
  openType?: number
  /** 上级权限链路 */
  parentChain?: RolePermissionDto
  /** 上级权限名称 */
  parentName?: string
  /** 上级权限id */
  pid?: number
  /** 业务线名称 */
  platformName?: string
  /** 页面路由 */
  route?: string
  /** 排序 */
  sort?: number
  /** 定制 */
  special?: RoleSpecialDto
  /** 终端  1pc  2移动端 */
  terminal?: number
  /** 是否是当前模块的 */
  thisModule?: boolean
  /** 权限名称 */
  title?: string
  /** 类型  1菜单  2页面 3操作 */
  type?: number
  /** 是否微应用 0否 1是 */
  webApplication?: number
}

interface RoleSpecialDto {
  
  /**  布局-页头   1展示 0关闭 */
  layoutHeader?: number
  /**  布局-菜单   1展示 0关闭 */
  layoutMenu?: number
  /**  名称 */
  name?: string
  /**  打开方式 0当前页面  1新页面 */
  openType?: number
  /**  权限id */
  permissionId?: number
  /**  站点id */
  sid?: number
}

/**
 * requestUrl /organization/backend/permission/all_permission
 * method get
 */
export interface ListAllPermissionUsingGETResponse {
  
  /** 响应数据 */
  data?: RolePermissionDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /organization/backend/permission/change_module
 * method post
 */
export interface ChangePermissionModuleUsingPOSTRequest {
  
  /** 权限id列表 */
  permissionList?: any[]
  /** 目标模块 */
  targetModule?: number
}

/**
 * requestUrl /organization/backend/permission/change_module
 * method post
 */
export interface ChangePermissionModuleUsingPOSTResponse {
  
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
 * requestUrl /organization/backend/permission/delete_by_module_id/{moduleId}
 * method post
 */
export interface DeleteByModuleIdUsingPOSTRequest {
  
}

/**
 * requestUrl /organization/backend/permission/delete_by_module_id/{moduleId}
 * method post
 */
export interface DeleteByModuleIdUsingPOSTResponse {
  
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
 * requestUrl /organization/backend/permission/delete_permission/{id}
 * method get
 */
export interface DeleteRolePermissionUsingGETResponse {
  
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
 * requestUrl /organization/backend/permission/detail/{id}
 * method get
 */
export interface GetRolePermissionIdUsingGETResponse {
  
  /** 响应数据 */
  data?: RolePermissionDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /organization/backend/permission/get_by_pid/{pid}
 * method get
 */
export interface GetRolePermissionByPidUsingGETResponse {
  
  /** 响应数据 */
  data?: RolePermissionDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface RolePermissionCacheDto {
  
  /**  */
  id?: number
  /**  */
  name?: string
  /**  */
  pid?: number
}

/**
 * requestUrl /organization/backend/permission/list_all
 * method get
 */
export interface ListAllPermissionIdsUsingGETResponse {
  
  /** 响应数据 */
  data?: RolePermissionCacheDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /organization/backend/permission/modify_sort
 * method post
 */
export interface ModifySortUsingPOSTRequest {
  
  /** id */
  id: number
  /** 排序 */
  sort: number
}

/**
 * requestUrl /organization/backend/permission/modify_sort
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
 * requestUrl /organization/backend/permission/modify_status
 * method post
 */
export interface ModifyStatusUsingPOSTRequest {
  
  /** id */
  id: number
  /** 状态 0开启 1关闭 */
  status: number
}

/**
 * requestUrl /organization/backend/permission/modify_status
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

/**
 * requestUrl /organization/backend/permission/module_permission/{moduleId}
 * method get
 */
export interface GetPermissionByModuleUsingGETResponse {
  
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
 * requestUrl /organization/backend/permission/permission_tree
 * method post
 */
export interface PermissionListUsingPOSTRequest {
  
  /** 别名 */
  alias?: string
  /** id */
  id?: number
  /** 模块id */
  moduleId?: number
  /** name */
  name?: string
  /** 上级权限id */
  pid?: number
  /** 业务线id */
  platformId?: number
  /** 终端 */
  terminal?: number
}

/**
 * requestUrl /organization/backend/permission/permission_tree
 * method post
 */
export interface PermissionListUsingPOSTResponse {
  
  /** 响应数据 */
  data?: RolePermissionDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /organization/backend/permission/save_permission
 * method post
 */
export interface SaveRolePermissionUsingPOSTRequest {
  
  /** 别名 */
  alias?: string
  /** api接口 */
  apiList?: any[]
  /** 选中icon */
  checkIcon?: string
  /** 子页面 */
  childList?: any[]
  /** 描述 */
  description?: string
  /** icon */
  icon?: string
  /** ID */
  id?: number
  /** 布局-页头   1展示 0关闭 */
  layoutHeader?: number
  /** 布局-菜单   1展示 0关闭 */
  layoutMenu?: number
  /** 是否菜单 0否 1是 */
  menu?: number
  /** 模块id */
  moduleId: number
  /** 权限名称 */
  name: string
  /** 打开方式 0当前页面  1新页面 */
  openType?: number
  /** 上级权限id */
  pid?: number
  /** 路由 */
  route?: string
  /** 定制 */
  special?: RoleSpecialDto
  /** 终端 */
  terminal: number
  /** 类型  1菜单  2页面  3操作 */
  type?: number
  /** 是否微应用 0否 1是 */
  webApplication: number
}

/**
 * requestUrl /organization/backend/permission/save_permission
 * method post
 */
export interface SaveRolePermissionUsingPOSTResponse {
  
  /** 响应数据 */
  data?: number
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BackendRolePermissionDto {
  
  /** 选中icon */
  checkIcon?: string
  /** icon */
  icon?: string
  /** ID */
  id?: number
  /** 模块id */
  moduleId?: number
  /** 权限名称 */
  name?: string
  /** 上级权限名称 */
  parentName?: string
  /** 上级权限id */
  pid?: number
  /** 路由 */
  route?: string
  /** 终端 */
  terminal?: number
  /** 终端名称 */
  terminalName?: string
  /** 是否微应用 0否 1是 */
  webApplication?: number
}

/**
 * requestUrl /organization/backend/permission/search_permission
 * method post
 */
export interface SearchRolePermissionUsingPOSTRequest {
  
  /** 别名 */
  alias?: string
  /** id */
  id?: number
  /** 名称 */
  name?: string
  /** 上级权限id */
  pid?: number
  /** 终端 1pc  2移动端 */
  terminal?: number
  /** 类型  1菜单  2页面  3操作 */
  type?: number
}

/**
 * requestUrl /organization/backend/permission/search_permission
 * method post
 */
export interface SearchRolePermissionUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BackendRolePermissionDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface WebApplicationDto {
  
  /** 描述 */
  description?: string
  /** entry */
  entry?: string
  /** id */
  id?: number
  /** 应用名 */
  name?: string
}

/**
 * requestUrl /organization/backend/web_application/all
 * method get
 */
export interface AllUsingGETResponse {
  
  /** 响应数据 */
  data?: WebApplicationDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /organization/backend/web_application/delete
 * method post
 */
export interface DetailUsingPOSTRequest {
  
  /** id */
  id: number
}

/**
 * requestUrl /organization/backend/web_application/delete
 * method post
 */
export interface DetailUsingPOSTResponse {
  
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
 * requestUrl /organization/backend/web_application/detail/{id}
 * method get
 */
export interface DetailUsingGETResponse {
  
  /** 响应数据 */
  data?: WebApplicationDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspWebApplicationDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: WebApplicationDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

/**
 * requestUrl /organization/backend/web_application/page
 * method post
 */
export interface PageUsingPOST_4Request {
  
  /** entry */
  entry?: string
  /** id */
  id?: number
  /** name */
  name?: string
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
 * requestUrl /organization/backend/web_application/page
 * method post
 */
export interface PageUsingPOST_4Response {
  
  /** 响应数据 */
  data?: BasePaginationRspWebApplicationDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /organization/backend/web_application/save
 * method post
 */
export interface PageUsingPOST_3Request {
  
  /** 描述 */
  description?: string
  /** entry */
  entry: string
  /** id */
  id?: number
  /** name */
  name: string
}

/**
 * requestUrl /organization/backend/web_application/save
 * method post
 */
export interface PageUsingPOST_3Response {
  
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
 * requestUrl /organization/department/create_department
 * method post
 */
export interface CreateDepartmentUsingPOST_1Request {
  
  /** 部门名称 */
  name: string
  /** 组织编码 */
  organizationCode: string
  /** 上级部门编码 */
  parentCode?: string
}

/**
 * requestUrl /organization/department/create_department
 * method post
 */
export interface CreateDepartmentUsingPOST_1Response {
  
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
 * requestUrl /organization/department/delete_department
 * method post
 */
export interface DeleteDepartmentUsingPOSTRequest {
  
  /** 部门编码 */
  code?: string
  /** 组织编码 */
  organizationCode: string
}

/**
 * requestUrl /organization/department/delete_department
 * method post
 */
export interface DeleteDepartmentUsingPOSTResponse {
  
  /** 响应数据 */
  data?: Record<string | number | symbol, any>
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface DepartmentStaffDto {
  
  /** 姓名 */
  name?: string
  /** 用户编码 */
  userCode?: string
}

/**
 * requestUrl /organization/department/department_staff
 * method post
 */
export interface DealApplyUsingPOSTRequest {
  
  /** 部门编码 */
  departmentCode: string
  /** 组织编码 */
  organizationCode: string
}

/**
 * requestUrl /organization/department/department_staff
 * method post
 */
export interface DealApplyUsingPOSTResponse {
  
  /** 响应数据 */
  data?: DepartmentStaffDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /organization/department/edit_department
 * method post
 */
export interface CreateDepartmentUsingPOSTRequest {
  
  /** 部门编码 */
  code?: string
  /** 部门名称 */
  name: string
  /** 组织编码 */
  organizationCode: string
}

/**
 * requestUrl /organization/department/edit_department
 * method post
 */
export interface CreateDepartmentUsingPOSTResponse {
  
  /** 响应数据 */
  data?: Record<string | number | symbol, any>
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface DepartmentSearchResponseDto {
  
  /** 部门编码 */
  key?: string
  /** 部门上级级编码 */
  parentCode?: string
  /** 部门成员数量 */
  staffCount?: number
  /** 部门名称 */
  title?: string
}

/**
 * requestUrl /organization/department/search
 * method post
 */
export interface DepartmentSearchUsingPOSTRequest {
  
  /** 部门名称 */
  name: string
  /** 组织编码 */
  organizationCode: string
}

/**
 * requestUrl /organization/department/search
 * method post
 */
export interface DepartmentSearchUsingPOSTResponse {
  
  /** 响应数据 */
  data?: DepartmentSearchResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface DepartmentTreeResponseDto {
  
  /** 子部门 */
  children?: DepartmentResponseDto
  /** 组织成员数量 */
  staffCount?: number
  /** 组织名称 */
  title?: string
}

interface DepartmentResponseDto {
  
  /** 子部门 */
  children?: DepartmentResponseDto
  /** 部门编码 */
  key?: string
  /** 部门上级级编码 */
  parentCode?: string
  /** 部门成员数量 */
  staffCount?: number
  /** 部门名称 */
  title?: string
}

/**
 * requestUrl /organization/department/tree/{organizationCode}
 * method get
 */
export interface DepartmentTreeUsingGETResponse {
  
  /** 响应数据 */
  data?: DepartmentTreeResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface NormalFunctionMenuResponseDto {
  
  /** 子菜单列表 */
  childMenuList?: NormalFunctionMenuResponseDto
  /** 菜单id */
  id?: number
  /** 菜单名称 */
  name?: string
  /** 菜单路由 */
  route?: string
}

/**
 * requestUrl /organization/menu/normal_function_list
 * method post
 */
export interface GetNormalFunctionMenuListUsingPOSTRequest {
  
  /** 身份id */
  identity?: number
  /** 组织编码 */
  organizationCode: string
  /** 用户编码 */
  userCode: string
}

/**
 * requestUrl /organization/menu/normal_function_list
 * method post
 */
export interface GetNormalFunctionMenuListUsingPOSTResponse {
  
  /** 响应数据 */
  data?: NormalFunctionMenuResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /organization/organization/add_identity
 * method post
 */
export interface AddOrganizationIdentityUsingPOST_1Request {
  
  /** 资源方身份id */
  identity?: number
  /** 组织编码 */
  organizationCode?: string
}

/**
 * requestUrl /organization/organization/add_identity
 * method post
 */
export interface AddOrganizationIdentityUsingPOST_1Response {
  
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
 * requestUrl /organization/organization/add_identity_php
 * method post
 */
export interface AddOrganizationIdentityUsingPOSTRequest {
  
  /** 资源方身份id */
  identity?: number
  /** 组织编码 */
  organizationCode?: string
}

/**
 * requestUrl /organization/organization/add_identity_php
 * method post
 */
export interface AddOrganizationIdentityUsingPOSTResponse {
  
  /** 响应数据 */
  data?: Record<string | number | symbol, any>
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface CustomerJudgeDto {
  
  /** 信用代码 */
  creditCode?: string
  /** 企业名称 */
  customerName?: string
}

interface BatchDealResponseDto {
  
  /** 失败条数条数 */
  errorList?: ErrorData
  /** 失败条数条数 */
  errorNum?: number
  /** 成功条数 */
  successNum?: number
}

interface ErrorData {
  
  /**  */
  errorCode?: string
  /**  */
  errorMessage?: string
  /**  */
  key?: string
}

/**
 * requestUrl /organization/organization/batch_certify
 * method post
 */
export interface BatchCertifyUsingPOSTRequest {
  
  /** 工商二要素 */
  list?: CustomerJudgeDto
}

/**
 * requestUrl /organization/organization/batch_certify
 * method post
 */
export interface BatchCertifyUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BatchDealResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface OrganizationResponseDto {
  
  /** 审批意见 */
  approveOpinion?: string
  /** 审批状态 1：通过 2：驳回 */
  approveStatus?: number
  /** 认证状态 */
  certifyStatus?: number
  /** 身份 */
  identityList?: any[]
  /** 组织logo */
  logo?: string
  /** 组织名称 */
  name?: string
  /** 组织编码 */
  organizationCode?: string
  /** 组织名称 */
  organizationName?: string
  /** 组织简称 */
  shortName?: string
  /** 站点 */
  sid?: number
  /** 角色 2机构 3资源方 */
  type?: number
  /** 组织拥有者 */
  userCode?: string
  /** 所在组织角色 */
  userRole?: string
}

/**
 * requestUrl /organization/organization/can_join_org/{identity}
 * method get
 */
export interface GetCanJoinMerchantUsingGETResponse {
  
  /** 响应数据 */
  data?: OrganizationResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /organization/organization/certify
 * method post
 */
export interface JudgeCertifyUsingPOSTRequest {
  
  /** 信用代码 */
  creditCode?: string
  /** 企业名称 */
  customerName?: string
}

/**
 * requestUrl /organization/organization/certify
 * method post
 */
export interface JudgeCertifyUsingPOSTResponse {
  
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
 * requestUrl /organization/organization/certify_organization
 * method post
 */
export interface CertifyOrganizationUsingPOSTRequest {
  
  /** 统一信用代码 */
  companyCode?: string
  /** 工商照片 */
  creditImage?: string
  /** 法人姓名 */
  legalPersonName?: string
  /** 人工认证标志 true/false */
  manualCertifyFlag?: boolean
  /** 组织名称 */
  name?: string
  /** 组织编码 */
  organizationCode: string
}

/**
 * requestUrl /organization/organization/certify_organization
 * method post
 */
export interface CertifyOrganizationUsingPOSTResponse {
  
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
 * requestUrl /organization/organization/certify_organization_sdk
 * method post
 */
export interface CertifyOrganizationSDKUsingPOSTRequest {
  
  /** 统一信用代码 */
  companyCode?: string
  /** 工商照片 */
  creditImage?: string
  /** 组织类型 2机构 3资源方 */
  groupType?: number
  /** 法人姓名 */
  legalPersonName?: string
  /** 人工认证标志 true/false */
  manualCertifyFlag?: boolean
  /** 组织名称 */
  name?: string
  /** 组织编码 */
  organizationCode: string
  /** 站点id */
  sid?: number
}

/**
 * requestUrl /organization/organization/certify_organization_sdk
 * method post
 */
export interface CertifyOrganizationSDKUsingPOSTResponse {
  
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
 * requestUrl /organization/organization/change_default_identity
 * method post
 */
export interface ChangeDefaultOrganizationIdentityUsingPOSTRequest {
  
  /** 身份  */
  identity: number
  /** 组织编码 */
  organizationCode: string
}

/**
 * requestUrl /organization/organization/change_default_identity
 * method post
 */
export interface ChangeDefaultOrganizationIdentityUsingPOSTResponse {
  
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
 * requestUrl /organization/organization/change_default_org
 * method post
 */
export interface ChangeDefaultOrganizationUsingPOSTRequest {
  
  /** 类型  2机构 3资源方  */
  groupType: number
  /** 组织编码 */
  organizationCode: string
}

/**
 * requestUrl /organization/organization/change_default_org
 * method post
 */
export interface ChangeDefaultOrganizationUsingPOSTResponse {
  
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
 * requestUrl /organization/organization/check_permissions
 * method post
 */
export interface CheckPermissionUsingPOSTRequest {
  
  /** 组织编码 */
  organizationCode: string
  /** 终端 1pc 2移动端 */
  terminal?: number
  /** 业务线类型 1平台  2职培 3考评  4职培 */
  type: number
  /** 接口路由 */
  url: string
  /** 用户编码 */
  userCode: string
}

/**
 * requestUrl /organization/organization/check_permissions
 * method post
 */
export interface CheckPermissionUsingPOSTResponse {
  
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
 * requestUrl /organization/organization/create
 * method post
 */
export interface CreateUsingPOSTRequest {
  
  /** 地址 */
  address?: string
  /** 所在地址区(编码code) */
  area: number
  /** 认证时间 */
  certifyAt?: number
  /** 所在地址市(编码code) */
  city: number
  /** 联系人邮箱 */
  contactEmail?: string
  /** 联系人职务 */
  contactJob?: string
  /** 联系人手机号 */
  contactMobile?: string
  /** 联系人姓名 */
  contactName?: string
  /** 来源站点 */
  fromSid?: number
  /** 资源方身份id */
  identity?: number
  /** 所属行业(二级行业id) */
  industryId: number
  /** 组织头像 */
  logo?: string
  /** 组织名称 */
  name: string
  /** 所在地址省份(编码code) */
  province: number
  /** 组织规模(key) */
  scale: number
  /** 组织简称 */
  shortName?: string
}

/**
 * requestUrl /organization/organization/create
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

/**
 * requestUrl /organization/organization/create_php
 * method post
 */
export interface CreatePHPSdkUsingPOSTRequest {
  
  /** 地址 */
  address?: string
  /** 所在地址区(编码code) */
  area: number
  /** 认证时间 */
  certifyAt?: number
  /** 工商照片 */
  certifyImage?: string
  /** 认证状态 */
  certifyStatus: boolean
  /** 所在地址市(编码code) */
  city: number
  /** 统一信用代码 */
  companyCode?: string
  /** 联系人邮箱 */
  contactEmail?: string
  /** 联系人职务 */
  contactJob?: string
  /** 联系人手机号 */
  contactMobile?: string
  /** 联系人姓名 */
  contactName?: string
  /** 创建时间 */
  createdAt?: number
  /** 来源站点 */
  fromSid?: number
  /** 身份  8机构  1课程资源方 2题库资源方 3自有课平台方 4 直播培训平台方 */
  identity?: number
  /** 所属行业(二级行业id) */
  industryId: number
  /** logo */
  logo?: string
  /** 组织名称 */
  name: string
  /** 所在地址省份(编码code) */
  province: number
  /** 组织规模(key) */
  scale: number
  /** 组织简称 */
  shortName?: string
  /** 站点 */
  sid: number
  /** 来源 */
  source?: number
  /** 类型，2机构，3资源方，跟group表的type枚举对应，默认2 */
  type?: number
  /** 组织拥有者 */
  userCode: string
}

/**
 * requestUrl /organization/organization/create_php
 * method post
 */
export interface CreatePHPSdkUsingPOSTResponse {
  
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
 * requestUrl /organization/organization/default_identity/{organizationCode}
 * method get
 */
export interface GetUserDefaultOrganizationIdentityUsingGETResponse {
  
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
 * requestUrl /organization/organization/default_organization/{groupType}
 * method get
 */
export interface GetUserDefaultOrganizationUsingGETResponse {
  
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
 * requestUrl /organization/organization/delete_organization
 * method post
 */
export interface DeleteOrganizationUsingPOSTRequest {
  
  /** code */
  code: string
}

/**
 * requestUrl /organization/organization/delete_organization
 * method post
 */
export interface DeleteOrganizationUsingPOSTResponse {
  
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
 * requestUrl /organization/organization/edit
 * method post
 */
export interface EditUsingPOSTRequest {
  
  /** 地址 */
  address?: string
  /** 所在地址区(编码code) */
  area: number
  /** 认证时间 */
  certifyAt?: number
  /** 工商照片 */
  certifyImage?: string
  /** 认证状态 */
  certifyStatus?: number
  /** 所在地址市(编码code) */
  city: number
  /** 组织编码 */
  code: string
  /** 统一信用代码 */
  companyCode?: string
  /** 联系人邮箱 */
  contactEmail?: string
  /** 联系人职务 */
  contactJob?: string
  /** 联系人手机号 */
  contactMobile?: string
  /** 联系人姓名 */
  contactName?: string
  /** 来源站点 */
  fromSid?: number
  /** 所属行业(二级行业id) */
  industryId: number
  /** 组织logo */
  logo?: string
  /** 组织名称 */
  name: string
  /** 所在地址省份(编码code) */
  province: number
  /** 组织规模(key) */
  scale: number
  /** 组织简称 */
  shortName?: string
  /** 来源 */
  source?: number
  /** 组织拥有者 */
  userCode: string
}

/**
 * requestUrl /organization/organization/edit
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
 * requestUrl /organization/organization/edit_base
 * method post
 */
export interface EditBaseInfoUsingPOST_1Request {
  
  /** 地址 */
  address?: string
  /** 所在地址区(编码code) */
  area: number
  /** 所在地址市(编码code) */
  city: number
  /** 组织编码 */
  code: string
  /** 统一信用代码 */
  companyCode?: string
  /** 联系人邮箱 */
  contactEmail?: string
  /** 联系人职务 */
  contactJob?: string
  /** 联系人手机号 */
  contactMobile?: string
  /** 联系人姓名 */
  contactName?: string
  /** 营业执照 法人照片 */
  creditImage?: string
  /** 所属行业(二级行业id) */
  industryId: number
  /** 组织logo */
  logo?: string
  /** 组织名称 */
  name: string
  /** 所在地址省份(编码code) */
  province: number
  /** 组织规模(key) */
  scale: number
  /** 组织简称 */
  shortName?: string
}

/**
 * requestUrl /organization/organization/edit_base
 * method post
 */
export interface EditBaseInfoUsingPOST_1Response {
  
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
 * requestUrl /organization/organization/edit_modules
 * method post
 */
export interface EditOrganizationSiteModuleUsingPOSTRequest {
  
  /** 模块id */
  moduleList?: any[]
  /** 组织编码 */
  organizationCode: string
  /** 站点id */
  sid: number
}

/**
 * requestUrl /organization/organization/edit_modules
 * method post
 */
export interface EditOrganizationSiteModuleUsingPOSTResponse {
  
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
 * requestUrl /organization/organization/is_staff/{organizationCode}
 * method get
 */
export interface IsOrganizationStaffUsingGETResponse {
  
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
 * requestUrl /organization/organization/list_by_codes
 * method post
 */
export interface ListOrgByCodesUsingPOSTRequest {
  
  /** 组织编码列表 */
  codeList: any[]
}

/**
 * requestUrl /organization/organization/list_by_codes
 * method post
 */
export interface ListOrgByCodesUsingPOSTResponse {
  
  /** 响应数据 */
  data?: Record<string | number | symbol, any>
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 站点模块数据 {
  
  /** 别名 */
  alias?: string
  /** id */
  id?: number
  /** 身份id */
  identity?: number
  /** 是否是基础模块 0否(定制) 1是  2身份通用 */
  isBase?: number
  /** 1用户模块 2机构模块  3资源方模块 */
  moduleType?: number
  /** 名称 */
  name?: string
  /** 排序 */
  sort?: number
  /** 类型，1平台2职培3考评4创培5就业 */
  type?: number
  /** 类型描述 */
  typeDesc?: string
}

/**
 * requestUrl /organization/organization/modules
 * method post
 */
export interface OrganizationSiteModuleUsingPOSTRequest {
  
  /** 身份 */
  identity?: number
  /** 组织编码 */
  organizationCode: string
  /** 站点ID */
  sid: number
  /** 业务线类型 1平台  2职培 3考评  4职培 */
  type: number
}

/**
 * requestUrl /organization/organization/modules
 * method post
 */
export interface OrganizationSiteModuleUsingPOSTResponse {
  
  /** 响应数据 */
  data?: 站点模块数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface OrganizationBaseInfoDto {
  
  /** 组织唯一code */
  code?: string
  /** 组织logo */
  logo?: string
  /** 组织名称 */
  name?: string
}

/**
 * requestUrl /organization/organization/organization_base_info/{organizationCode}
 * method get
 */
export interface GetOrganizationInfoByOrgCodeUsingGETResponse {
  
  /** 响应数据 */
  data?: OrganizationBaseInfoDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface OrganizationDetailDto {
  
  /** 地址 */
  address?: string
  /** 审批意见 */
  approveOpinion?: string
  /** 审批状态 1：通过 2：驳回 */
  approveStatus?: number
  /** 区 */
  area?: number
  /** 区名称 */
  areaName?: string
  /** 认证时间 */
  certifyAt?: number
  /** 认证状态 0未认证  1已认证 2审批中 */
  certifyStatus?: number
  /** 市 */
  city?: number
  /** 市名称 */
  cityName?: string
  /** 组织唯一编码 */
  code?: string
  /** 统一信用代码 */
  companyCode?: string
  /** 联系人邮箱 */
  contactEmail?: string
  /** 联系人职务 */
  contactJob?: string
  /** 联系人手机号 */
  contactMobile?: string
  /** 联系人姓名 */
  contactName?: string
  /** 创建时间 */
  createdAt?: number
  /** 数据创建者 */
  createdBy?: string
  /** 工商证件照 */
  creditImage?: string
  /** 是否已删除 0未删除 1已删除 */
  deleted?: number
  /** 解散状态 0-未解散，1-已解散 */
  dissolveStatus?: number
  /** 来源站点 */
  fromSid?: number
  /** 所属行业ID */
  industryId?: number
  /** 行业 */
  industryList?: 行业数据
  /** 法人姓名 */
  legalPersonName?: string
  /** logo */
  logo?: string
  /** 组织名称 */
  name?: string
  /** 省 */
  province?: number
  /** 省名称 */
  provinceName?: string
  /** 规模 */
  scale?: string
  /** 组织简称 */
  shortName?: string
  /** 站点id */
  sid?: number
  /** 站点名称 */
  siteName?: string
  /** 人数 */
  staffCount?: number
  /** 状态 0-正常，1-禁用 */
  status?: number
  /** 类型  2机构 3资源方 */
  type?: number
  /** 更新时间 */
  updatedAt?: number
  /** 更新人 */
  updatedBy?: string
  /** 管理员编码 */
  userCode?: string
  /** 管理员姓名 */
  userName?: string
}

/**
 * requestUrl /organization/organization/organization_detail/{organizationCode}
 * method get
 */
export interface OrganizationDetailUsingGET_1Response {
  
  /** 响应数据 */
  data?: OrganizationDetailDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface IdentityDto {
  
  /** 身份id */
  id?: number
  /** 身份名称 */
  name?: string
  /** 1c用户  2机构 3资源方 */
  type?: string
}

/**
 * requestUrl /organization/organization/organization_identity/{organizationCode}
 * method get
 */
export interface GetOrgIdentityListUsingGETResponse {
  
  /** 响应数据 */
  data?: IdentityDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /organization/organization/organization_list
 * method get
 */
export interface OrganizationListUsingGETResponse {
  
  /** 响应数据 */
  data?: OrganizationResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /organization/organization/organization_list_identity/{identity}
 * method get
 */
export interface OrganizationListLimitIdentityUsingGETResponse {
  
  /** 响应数据 */
  data?: OrganizationResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /organization/organization/organization_permission_ids
 * method post
 */
export interface OrganizationPermissionIdsUsingPOSTRequest {
  
  /** 组织code */
  organizationCode: string
  /** 终端 1pc 2移动端 */
  terminal?: number
}

/**
 * requestUrl /organization/organization/organization_permission_ids
 * method post
 */
export interface OrganizationPermissionIdsUsingPOSTResponse {
  
  /** 响应数据 */
  data?: any[]
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /organization/organization/site_module_permit
 * method get
 */
export interface SiteModulePermitUsingGETResponse {
  
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
 * requestUrl /organization/organization/sync_merchant_identity
 * method get
 */
export interface SyncHistoryMerchantIdentityUsingGETResponse {
  
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /organization/organization/user_organization_list/{userCode}
 * method get
 */
export interface UserOrganizationListUsingGETResponse {
  
  /** 响应数据 */
  data?: OrganizationResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /organization/organization/v2/list_all_permission
 * method post
 */
export interface ListUserAllPermissionIdsUsingPOSTRequest {
  
  /** 身份 */
  identity?: number
  /** 组织code */
  organizationCode?: string
  /** 平台类型 */
  type?: number
  /** 用户code */
  userCode?: string
}

/**
 * requestUrl /organization/organization/v2/list_all_permission
 * method post
 */
export interface ListUserAllPermissionIdsUsingPOSTResponse {
  
  /** 响应数据 */
  data?: any[]
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /organization/organization/v2/user_permission
 * method post
 */
export interface PermissionListV2UsingPOSTRequest {
  
  /** 身份 */
  identity?: number
  /** 是否是组织中心权限 */
  organizationCenter?: number
  /** 组织编码 */
  organizationCode: string
  /** 终端 1pc 2移动端 */
  terminal?: number
  /** 业务线类型 1平台  2职培 3考评  4创培 */
  type: number
}

/**
 * requestUrl /organization/organization/v2/user_permission
 * method post
 */
export interface PermissionListV2UsingPOSTResponse {
  
  /** 响应数据 */
  data?: RolePermissionDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /organization/organization/info/address/add_work_address
 * method post
 */
export interface AddWorkAddressUsingPOSTRequest {
  
  /**  */
  addressInfo?: string
  /**  */
  businessArea?: number
  /**  */
  city?: string
  /**  */
  cityCode?: string
  /**  */
  companyAddress?: string
  /**  */
  latitude?: string
  /**  */
  longitude?: string
  /** 组织编码 */
  organizationCode: string
  /**  */
  province?: string
  /**  */
  provinceCode?: string
  /**  */
  region?: string
  /**  */
  regionCode?: string
}

/**
 * requestUrl /organization/organization/info/address/add_work_address
 * method post
 */
export interface AddWorkAddressUsingPOSTResponse {
  
  /** 响应数据 */
  data?: string
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface OrganizationWorkAddressDto {
  
  /**  */
  addressInfo?: string
  /**  */
  businessArea?: number
  /**  */
  city?: string
  /**  */
  cityCode?: string
  /**  */
  companyAddress?: string
  /**  */
  latitude?: string
  /**  */
  longitude?: string
  /** 组织编码 */
  organizationCode: string
  /**  */
  province?: string
  /**  */
  provinceCode?: string
  /**  */
  region?: string
  /**  */
  regionCode?: string
}

/**
 * requestUrl /organization/organization/info/address/{organizationCode}
 * method get
 */
export interface WorkAddressListUsingGETResponse {
  
  /** 响应数据 */
  data?: OrganizationWorkAddressDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface OrganizationInfoDto {
  
  /** 地址 */
  address?: string
  /** 所在地址区(编码code) */
  area: number
  /** 所在地址市(编码code) */
  city: number
  /** 融资阶段 */
  financing: string
  /** 所属行业(二级行业id) */
  industryId: number
  /** 组织logo */
  logo?: string
  /** 组织名称 */
  name: string
  /** 组织编码 */
  organizationCode: string
  /** 所在地址省份(编码code) */
  province: number
  /** 简历接收邮箱 */
  resumeMail: string
  /** 组织规模(key) */
  scale: number
  /** 组织简称 */
  shortName?: string
}

/**
 * requestUrl /organization/organization/info/base_info/{organizationCode}
 * method get
 */
export interface BaseInfoUsingGETResponse {
  
  /** 响应数据 */
  data?: OrganizationInfoDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface OrganizationBusinessIntroductionDto {
  
  /** 核准日期 */
  approvalTime?: number
  /** 营业结束期限 */
  businessEndTime?: number
  /** 经营范围 */
  businessScope?: string
  /** 营业开始期限 */
  businessStartTime?: number
  /** 公司名称 */
  companyName?: string
  /** 企业类型 */
  companyType?: string
  /** 成立日期 */
  establishmentTime?: number
  /** 曾用名 */
  formerName?: string
  /** 法定代表人 */
  legalRepresentative?: string
  /** 组织编码 */
  organizationCode: string
  /** 所属地区 */
  region?: string
  /** 注册地址 */
  registeredAddress?: string
  /** 注册资金 */
  registeredCapital?: string
  /** 登记机关 */
  registrationAuthority?: string
  /** 统一社会信用代码 */
  unifiedSocialCreditCode?: string
}

/**
 * requestUrl /organization/organization/info/business_introduction_info/{organizationCode}
 * method get
 */
export interface BusinessIntroductionInfoUsingGETResponse {
  
  /** 响应数据 */
  data?: OrganizationBusinessIntroductionDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /organization/organization/info/edit_base_info
 * method post
 */
export interface EditBaseInfoUsingPOST_2Request {
  
  /** 地址 */
  address?: string
  /** 所在地址区(编码code) */
  area: number
  /** 所在地址市(编码code) */
  city: number
  /** 融资阶段 */
  financing: string
  /** 所属行业(二级行业id) */
  industryId: number
  /** 组织logo */
  logo?: string
  /** 组织名称 */
  name: string
  /** 组织编码 */
  organizationCode: string
  /** 所在地址省份(编码code) */
  province: number
  /** 简历接收邮箱 */
  resumeMail: string
  /** 组织规模(key) */
  scale: number
  /** 组织简称 */
  shortName?: string
}

/**
 * requestUrl /organization/organization/info/edit_base_info
 * method post
 */
export interface EditBaseInfoUsingPOST_2Response {
  
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
 * requestUrl /organization/organization/info/edit_business_introduction_info
 * method post
 */
export interface EditBusinessIntroductionInfoUsingPOSTRequest {
  
  /** 核准日期 */
  approvalTime?: number
  /** 营业结束期限 */
  businessEndTime?: number
  /** 经营范围 */
  businessScope?: string
  /** 营业开始期限 */
  businessStartTime?: number
  /** 公司名称 */
  companyName?: string
  /** 企业类型 */
  companyType?: string
  /** 成立日期 */
  establishmentTime?: number
  /** 曾用名 */
  formerName?: string
  /** 法定代表人 */
  legalRepresentative?: string
  /** 组织编码 */
  organizationCode: string
  /** 所属地区 */
  region?: string
  /** 注册地址 */
  registeredAddress?: string
  /** 注册资金 */
  registeredCapital?: string
  /** 登记机关 */
  registrationAuthority?: string
  /** 统一社会信用代码 */
  unifiedSocialCreditCode?: string
}

/**
 * requestUrl /organization/organization/info/edit_business_introduction_info
 * method post
 */
export interface EditBusinessIntroductionInfoUsingPOSTResponse {
  
  /** 响应数据 */
  data?: string
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface Executive {
  
  /** 照片 */
  imgUrl: string
  /** 介绍 */
  introduction: string
  /** 姓名 */
  name: string
  /** 职位 */
  position: string
}

/**
 * requestUrl /organization/organization/info/edit_executive_introduction_info
 * method post
 */
export interface EditExecutiveIntroductionInfoUsingPOSTRequest {
  
  /** 高管信息列表 */
  executiveList: Executive
  /** 组织编码 */
  organizationCode: string
}

/**
 * requestUrl /organization/organization/info/edit_executive_introduction_info
 * method post
 */
export interface EditExecutiveIntroductionInfoUsingPOSTResponse {
  
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
 * requestUrl /organization/organization/info/edit_introduction_info
 * method post
 */
export interface EditIntroductionInfoUsingPOSTRequest {
  
  /** 发展历程 */
  developmentProcess?: string
  /** 公司简介 */
  introduction: string
  /** 组织编码 */
  organizationCode: string
  /** 一句话介绍 */
  simpleIntroduction?: string
}

/**
 * requestUrl /organization/organization/info/edit_introduction_info
 * method post
 */
export interface EditIntroductionInfoUsingPOSTResponse {
  
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
 * requestUrl /organization/organization/info/edit_main_business_info
 * method post
 */
export interface EditMainBusinessInfoUsingPOSTRequest {
  
  /** 主营业务 */
  mainBusiness?: any[]
  /** 组织编码 */
  organizationCode: string
}

/**
 * requestUrl /organization/organization/info/edit_main_business_info
 * method post
 */
export interface EditMainBusinessInfoUsingPOSTResponse {
  
  /** 响应数据 */
  data?: string
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface Photo {
  
  /** 链接 */
  url: string
  /** 文件名 */
  urlName: string
  /** 链接类型 1图片 2视频 */
  urlType: number
}

/**
 * requestUrl /organization/organization/info/edit_photo_info
 * method post
 */
export interface EditPhotoInfoUsingPOSTRequest {
  
  /** 组织编码 */
  organizationCode: string
  /** 相册列表 */
  photoList: Photo
}

/**
 * requestUrl /organization/organization/info/edit_photo_info
 * method post
 */
export interface EditPhotoInfoUsingPOSTResponse {
  
  /** 响应数据 */
  data?: string
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 产品详情 {
  
  /** 产品介绍 */
  introduction: string
  /** 产品logo */
  logo: string
  /** 产品名称 */
  title: string
}

/**
 * requestUrl /organization/organization/info/edit_product_introduction_info
 * method post
 */
export interface EditProductIntroductionInfoUsingPOSTRequest {
  
  /** 组织编码 */
  organizationCode: string
  /** 产品介绍列表 */
  productList: 产品详情
}

/**
 * requestUrl /organization/organization/info/edit_product_introduction_info
 * method post
 */
export interface EditProductIntroductionInfoUsingPOSTResponse {
  
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
 * requestUrl /organization/organization/info/edit_talent_development_info
 * method post
 */
export interface EditTalentDevelopmentInfoUsingPOSTRequest {
  
  /** 能力培养 逗号隔开 */
  abilityTraining?: string
  /** 更多信息 */
  moreInformation?: string
  /** 组织编码 */
  organizationCode: string
  /** 晋升制度 逗号隔开 */
  promotionSystem?: string
  /** 人才激励 逗号隔开 */
  talentIncentive?: string
}

/**
 * requestUrl /organization/organization/info/edit_talent_development_info
 * method post
 */
export interface EditTalentDevelopmentInfoUsingPOSTResponse {
  
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
 * requestUrl /organization/organization/info/edit_welfare_info
 * method post
 */
export interface EditWelfareInfoUsingPOSTRequest {
  
  /** 组织编码 */
  organizationCode: string
  /** 加班情况 */
  overTimeState?: number
  /** 休息时间 */
  restTimeState: number
  /** 工作结束时间 */
  workEndTime: string
  /** 工作开始时间 */
  workStartTime: string
}

/**
 * requestUrl /organization/organization/info/edit_welfare_info
 * method post
 */
export interface EditWelfareInfoUsingPOSTResponse {
  
  /** 响应数据 */
  data?: string
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface OrganizationHomeDto {
  
  /** 工商信息 */
  businessIntroductionDto?: OrganizationBusinessIntroductionDto
  /** 组织唯一code */
  code?: string
  /** 高管信息 */
  executiveList?: Executive
  /** 公司介绍 */
  introductionDto?: OrganizationIntroductionDto
  /** 组织logo */
  logo?: string
  /** 主营业务 */
  mainBuinessList?: any[]
  /** 组织名称 */
  name?: string
  /** 公司相册 */
  photoList?: Photo
  /** 产品介绍 */
  productList?: 产品详情
  /** 人才发展 */
  talentDevelopmentDto?: OrganizationTalentDevelopmentDto
  /** 公司福利 */
  welfareDto?: OrganizationWelfareDto
}

interface OrganizationIntroductionDto {
  
  /** 发展历程 */
  developmentProcess?: string
  /** 公司简介 */
  introduction: string
  /** 组织编码 */
  organizationCode: string
  /** 一句话介绍 */
  simpleIntroduction?: string
}

interface OrganizationTalentDevelopmentDto {
  
  /** 能力培养 逗号隔开 */
  abilityTraining?: string
  /** 更多信息 */
  moreInformation?: string
  /** 组织编码 */
  organizationCode: string
  /** 晋升制度 逗号隔开 */
  promotionSystem?: string
  /** 人才激励 逗号隔开 */
  talentIncentive?: string
}

interface OrganizationWelfareDto {
  
  /** 组织编码 */
  organizationCode: string
  /** 加班情况 */
  overTimeState?: number
  /** 休息时间 */
  restTimeState: number
  /** 工作结束时间 */
  workEndTime: string
  /** 工作开始时间 */
  workStartTime: string
}

/**
 * requestUrl /organization/organization/info/enterprise home/{organizationCode}
 * method get
 */
export interface EnterpriseHomeUsingGETResponse {
  
  /** 响应数据 */
  data?: OrganizationHomeDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface OrganizationExecutiveIntroductionDto {
  
  /** 高管信息列表 */
  executiveList: Executive
  /** 组织编码 */
  organizationCode: string
}

/**
 * requestUrl /organization/organization/info/executive_introduction_info/{organizationCode}
 * method get
 */
export interface ExecutiveIntroductionInfoUsingGETResponse {
  
  /** 响应数据 */
  data?: OrganizationExecutiveIntroductionDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /organization/organization/info/introduction_info/{organizationCode}
 * method get
 */
export interface IntroductionInfoUsingGETResponse {
  
  /** 响应数据 */
  data?: OrganizationIntroductionDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface OrganizationMainBusinessDto {
  
  /** 主营业务 */
  mainBusiness?: any[]
  /** 组织编码 */
  organizationCode: string
}

/**
 * requestUrl /organization/organization/info/main_business_info/{organizationCode}
 * method get
 */
export interface MainBusinessInfoUsingGETResponse {
  
  /** 响应数据 */
  data?: OrganizationMainBusinessDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface OrganizationPhotoDto {
  
  /** 组织编码 */
  organizationCode: string
  /** 相册列表 */
  photoList: Photo
}

/**
 * requestUrl /organization/organization/info/photo_info/{organizationCode}
 * method get
 */
export interface PhotoInfoUsingGETResponse {
  
  /** 响应数据 */
  data?: OrganizationPhotoDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface OrganizationProductIntroductionDto {
  
  /** 组织编码 */
  organizationCode: string
  /** 产品介绍列表 */
  productList: 产品详情
}

/**
 * requestUrl /organization/organization/info/product_introduction_info/{organizationCode}
 * method get
 */
export interface ProductIntroductionInfoUsingGETResponse {
  
  /** 响应数据 */
  data?: OrganizationProductIntroductionDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /organization/organization/info/talent_development_info/{organizationCode}
 * method get
 */
export interface TalentDevelopmentInfoUsingGETResponse {
  
  /** 响应数据 */
  data?: OrganizationTalentDevelopmentDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /organization/organization/info/welfare_info/{organizationCode}
 * method get
 */
export interface WelfareInfoUsingGETResponse {
  
  /** 响应数据 */
  data?: OrganizationWelfareDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /organization/role/create
 * method post
 */
export interface CreateUsingPOST_1Request {
  
  /** 角色编码 */
  code?: string
  /** 角色描述 */
  description?: string
  /** 角色名称 */
  name: string
  /** 组织编码 */
  organizationCode: string
}

/**
 * requestUrl /organization/role/create
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
 * requestUrl /organization/role/delete
 * method post
 */
export interface DeleteUsingPOSTRequest {
  
  /** 组织编码 */
  organizationCode: string
  /** 角色编码 */
  roleCode: string
}

/**
 * requestUrl /organization/role/delete
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

/**
 * requestUrl /organization/role/modify
 * method post
 */
export interface ModifyUsingPOSTRequest {
  
  /** 角色编码 */
  code?: string
  /** 角色描述 */
  description?: string
  /** 角色名称 */
  name: string
  /** 组织编码 */
  organizationCode: string
}

/**
 * requestUrl /organization/role/modify
 * method post
 */
export interface ModifyUsingPOSTResponse {
  
  /** 响应数据 */
  data?: Record<string | number | symbol, any>
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspRolePageDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: RolePageDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface RolePageDto {
  
  /** 编码 */
  code?: string
  /** 描述 */
  description?: string
  /** 角色名称 */
  name?: string
  /** 1自定义角色  2超级管理员 */
  type?: number
}

/**
 * requestUrl /organization/role/page
 * method post
 */
export interface RolePageUsingPOSTRequest {
  
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 组织编码 */
  organizationCode?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
}

/**
 * requestUrl /organization/role/page
 * method post
 */
export interface RolePageUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspRolePageDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface RolePermissionListDto {
  
  /** 别名 */
  alias?: string
  /** api接口 */
  apiList?: any[]
  /** 是否能修改 */
  changeEnable?: boolean
  /** 选中icon */
  checkIcon?: string
  /** 子页面 */
  childList?: any[]
  /** 下级权限 */
  children?: RolePermissionDto
  /** 描述 */
  description?: string
  /** 是否拥有权限 */
  has?: boolean
  /** 隐藏状态 开启  false    关闭 true */
  hide?: boolean
  /** icon */
  icon?: string
  /** 权限编码id */
  key?: number
  /** 布局-页头   1展示 0关闭 */
  layoutHeader?: number
  /** 布局-菜单   1展示 0关闭 */
  layoutMenu?: number
  /** 是否菜单 0否 1是 */
  menu?: number
  /** 模块id */
  moduleId?: number
  /** 模块名称 */
  moduleName?: string
  /** 打开方式 0当前页面  1新页面 */
  openType?: number
  /** 上级权限链路 */
  parentChain?: RolePermissionDto
  /** 上级权限名称 */
  parentName?: string
  /** 上级权限id */
  pid?: number
  /** 业务线id */
  platformId?: number
  /** 业务线名称 */
  platformName?: string
  /** 页面路由 */
  route?: string
  /** 排序 */
  sort?: number
  /** 定制 */
  special?: RoleSpecialDto
  /** 终端  1pc  2移动端 */
  terminal?: number
  /** 是否是当前模块的 */
  thisModule?: boolean
  /** 权限名称 */
  title?: string
  /** 类型  1菜单  2页面 3操作 */
  type?: number
  /** 是否微应用 0否 1是 */
  webApplication?: number
}

/**
 * requestUrl /organization/role/permissions
 * method post
 */
export interface PermissionListUsingPOST_1Request {
  
  /** 组织编码 */
  organizationCode: string
  /** 角色编码 */
  roleCode: string
}

/**
 * requestUrl /organization/role/permissions
 * method post
 */
export interface PermissionListUsingPOST_1Response {
  
  /** 响应数据 */
  data?: RolePermissionListDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /organization/role/permissions/save
 * method post
 */
export interface EditPermissionUsingPOSTRequest {
  
  /** 组织编码 */
  organizationCode: string
  /** 第三级权限id */
  permissionIds?: any[]
  /** 角色编码 */
  roleCode?: string
}

/**
 * requestUrl /organization/role/permissions/save
 * method post
 */
export interface EditPermissionUsingPOSTResponse {
  
  /** 响应数据 */
  data?: Record<string | number | symbol, any>
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface RoleInfoDto {
  
  /** 角色编码 */
  code: string
  /** 角色名称 */
  name: string
  /** 类型 */
  type?: number
}

/**
 * requestUrl /organization/role/role_list/{organizationCode}
 * method get
 */
export interface RoleListUsingGETResponse {
  
  /** 响应数据 */
  data?: RoleInfoDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /organization/permission/get_by_alias/{alias}
 * method get
 */
export interface GetPermissionByAliasUsingGETResponse {
  
  /** 响应数据 */
  data?: RolePermissionDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /organization/permission/site_all_api/{sid}
 * method get
 */
export interface GetSiteAllApiUsingGETResponse {
  
  /** 响应数据 */
  data?: any[]
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /organization/permission/site_all_page/{sid}
 * method get
 */
export interface GetSiteAllPageUsingGETResponse {
  
  /** 响应数据 */
  data?: any[]
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspInviteApplyPageDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: InviteApplyPageDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface InviteApplyPageDto {
  
  /** 申请编码 */
  code?: string
  /** 申请时间 */
  createdAt?: number
  /** 身份证号 */
  idCard?: string
  /** 手机号 */
  mobile?: string
  /** 申请理由 */
  reason?: string
  /** 状态 0待处理  1通过  2拒绝 */
  status?: number
  /** 姓名 */
  userName?: string
}

/**
 * requestUrl /organization/staff/apply_list
 * method post
 */
export interface OrganizationDetailUsingPOSTRequest {
  
  /** 部门编码 */
  departmentCode?: string
  /** 身份证号 */
  idCard?: string
  /** 手机号 */
  mobile?: string
  /** 姓名 */
  name?: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 组织编码 */
  organizationCode?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
}

/**
 * requestUrl /organization/staff/apply_list
 * method post
 */
export interface OrganizationDetailUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspInviteApplyPageDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /organization/staff/create_staff
 * method post
 */
export interface CreateStaffUsingPOST_1Request {
  
  /** 证件类型，1身份证，2护照，3其他 */
  certificateType?: number
  /** 部门编码 */
  departmentCode?: string
  /** 身份证号 */
  idCard?: string
  /** 手机号 */
  mobile: string
  /** 姓名 */
  name: string
  /** 组织编码 */
  organizationCode: string
  /** 关联角色编码 */
  roleCode?: string
  /** 账号 */
  username: string
}

/**
 * requestUrl /organization/staff/create_staff
 * method post
 */
export interface CreateStaffUsingPOST_1Response {
  
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
 * requestUrl /organization/staff/create_staff_cp
 * method post
 */
export interface CreateStaffCpUsingPOSTRequest {
  
  /** 部门编码 */
  departmentCode?: string
  /** 组织编码 */
  organizationCode: string
  /** 关联角色编码 */
  roleCode?: string
  /** 用户编码 */
  userCode: string
}

/**
 * requestUrl /organization/staff/create_staff_cp
 * method post
 */
export interface CreateStaffCpUsingPOSTResponse {
  
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface StaffCreateItemDto {
  
  /** 证件类型，1身份证，2护照，3其他 */
  certificateType?: number
  /** 部门编码 */
  departmentCode?: string
  /** 证件号 */
  idCard?: string
  /** 手机号 */
  mobile: string
  /** 姓名 */
  name: string
  /** 组织编码 */
  organizationCode: string
  /** 关联角色编码 */
  roleCode?: string
  /** 站点id */
  sid: number
}

/**
 * requestUrl /organization/staff/create_staff_php
 * method post
 */
export interface CreateStaffPHPUsingPOSTRequest {
  
  /** 成员信息 */
  staffList: StaffCreateItemDto
}

/**
 * requestUrl /organization/staff/create_staff_php
 * method post
 */
export interface CreateStaffPHPUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BatchDealResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /organization/staff/deal_apply
 * method post
 */
export interface DealApplyUsingPOST_1Request {
  
  /** 申请编码 */
  code: string
  /** 组织编码 */
  organizationCode: string
  /** 处理结果 1通过 2拒绝 */
  status: number
}

/**
 * requestUrl /organization/staff/deal_apply
 * method post
 */
export interface DealApplyUsingPOST_1Response {
  
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
 * requestUrl /organization/staff/delete_apply
 * method post
 */
export interface DelInviteApplyUsingPOSTRequest {
  
  /** 申请编码 */
  inviteCode?: any[]
  /** 组织编码 */
  organizationCode: string
}

/**
 * requestUrl /organization/staff/delete_apply
 * method post
 */
export interface DelInviteApplyUsingPOSTResponse {
  
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
 * requestUrl /organization/staff/delete_staff
 * method post
 */
export interface DeleteStaffUsingPOSTRequest {
  
  /** 组织编码 */
  organizationCode?: string
  /** 员工用户编码 */
  userCode?: string
}

/**
 * requestUrl /organization/staff/delete_staff
 * method post
 */
export interface DeleteStaffUsingPOSTResponse {
  
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
 * requestUrl /organization/staff/delete_staff_php
 * method post
 */
export interface DeleteStaffPHPUsingPOSTRequest {
  
  /** 组织编码 */
  organizationCode: string
  /** 成员用户编码 */
  staffList: any[]
}

/**
 * requestUrl /organization/staff/delete_staff_php
 * method post
 */
export interface DeleteStaffPHPUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BatchDealResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /organization/staff/edit_staff
 * method post
 */
export interface CreateStaffUsingPOSTRequest {
  
  /** 组织编码 */
  organizationCode: string
  /** 关联角色编码 */
  roleCode: string
  /** 用户编码 */
  userCode: string
}

/**
 * requestUrl /organization/staff/edit_staff
 * method post
 */
export interface CreateStaffUsingPOSTResponse {
  
  /** 响应数据 */
  data?: Record<string | number | symbol, any>
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspDepartmentStaffPageDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: DepartmentStaffPageDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface DepartmentStaffPageDto {
  
  /** 编码 */
  code?: string
  /** 部门 */
  department?: any[]
  /** 身份证号 */
  idCard?: string
  /** 是否管理员 */
  isAdmin?: boolean
  /** 是否主管 */
  isDirector?: boolean
  /** 手机号 */
  mobile?: string
  /** 姓名 */
  name?: string
  /** 关联角色编码 */
  roleCode?: string
  /** 关联角色 */
  roleName?: string
  /** 员工用户编码 */
  userCode?: string
}

/**
 * requestUrl /organization/staff/employee/page
 * method post
 */
export interface EmployeeUsingPOSTRequest {
  
  /** 部门编码 */
  departmentCode?: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 组织编码 */
  organizationCode?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
}

/**
 * requestUrl /organization/staff/employee/page
 * method post
 */
export interface EmployeeUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspDepartmentStaffPageDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /organization/staff/invite_apply
 * method post
 */
export interface InviteApplyUsingPOSTRequest {
  
  /** 证件类型，1身份证，2护照，3其他 */
  certificateType?: number
  /** 身份证号 */
  idCard: string
  /** 邀请码 */
  inviteCode: string
  /** 手机号 */
  mobile: string
  /** 姓名 */
  name: string
  /** 申请理由 */
  reason?: string
}

/**
 * requestUrl /organization/staff/invite_apply
 * method post
 */
export interface InviteApplyUsingPOSTResponse {
  
  /** 响应数据 */
  data?: Record<string | number | symbol, any>
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface InviteCodeResponseDto {
  
  /** 部门名称(数组) */
  department?: any[]
  /** 部门名称 */
  departmentName?: string
  /** 邀请码 */
  inviteCode?: string
  /** 邀请二维码 */
  inviteImage?: string
  /** 邀请人 */
  inviteName?: string
  /** 邀请链接 */
  inviteUrl?: string
  /** 组织名称 */
  organizationName?: string
  /** 站点id */
  sid?: number
}

/**
 * requestUrl /organization/staff/invite_code
 * method post
 */
export interface GetInviteCodeUsingPOSTRequest {
  
  /** 部门编码 */
  departmentCode?: string
  /** 邀请码有效时间  0永久 1三天有效 2一周有效 */
  inviteExpire?: number
  /** 组织编码 */
  organizationCode?: string
}

/**
 * requestUrl /organization/staff/invite_code
 * method post
 */
export interface GetInviteCodeUsingPOSTResponse {
  
  /** 响应数据 */
  data?: InviteCodeResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /organization/staff/invite_info
 * method post
 */
export interface InviteUsingPOSTRequest {
  
  /** 邀请码 */
  inviteCode: string
}

/**
 * requestUrl /organization/staff/invite_info
 * method post
 */
export interface InviteUsingPOSTResponse {
  
  /** 响应数据 */
  data?: InviteCodeResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /organization/staff/set_director
 * method post
 */
export interface DealApplyUsingPOST_2Request {
  
  /** 部门编码 */
  departmentCode: string
  /** 设为主管的用户编码 */
  directorCode: string
  /** 组织编码 */
  organizationCode: string
}

/**
 * requestUrl /organization/staff/set_director
 * method post
 */
export interface DealApplyUsingPOST_2Response {
  
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
 * requestUrl /organization/sync/default_role/{typeCode}
 * method get
 */
export interface AddDefaultRoleUsingGETResponse {
  
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
 * requestUrl /organization/sync/org_to_customer
 * method post
 */
export interface SyncToCustomerUsingPOSTRequest {
  
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /**  */
  startTime?: number
}

/**
 * requestUrl /organization/sync/org_to_customer
 * method post
 */
export interface SyncToCustomerUsingPOSTResponse {
  
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
 * requestUrl /organization/sync/sync_org_es
 * method get
 */
export interface SyncHistoryOrgToEsUsingGETResponse {
  
  /** 响应数据 */
  data?: Record<string | number | symbol, any>
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}