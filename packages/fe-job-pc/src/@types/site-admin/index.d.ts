
/**
 * 如果遇到bug，您可以钉钉搜索封东其或者给 fengdongqi@hzwotu.com 邮箱发邮件
 * 欢迎大家提 issue 或者 PR。
 * @title 沃土用户服务
 * @description 沃土用户服务是一个 Spring Boot项目
 * @version v1.0
 **/


interface 角色区域权限表 {
  
  /** 区域id */
  cityId?: number
  /** 编码 */
  code?: string
  /** 角色code */
  roleCode?: string
}

/**
 * requestUrl /site-admin/v1.1/city_config
 * method get
 */
export interface CityConfigUsingGETResponse {
  
  /** 响应数据 */
  data?: 角色区域权限表
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 管理员权限数据 {
  
  /** 前端路由 */
  frontRoute?: string
  /** 显示状态，0显示，1隐藏 */
  hide?: number
  /** 图标 */
  icon?: string
  /** 编码 */
  id?: number
  /** 默认勾选 */
  isDefault?: boolean
  /** 菜单 */
  isMenu?: boolean
  /** 层级 */
  level?: number
  /** 名称 */
  name?: string
  /** 上级id */
  pid?: number
  /**  */
  pname?: string
  /** 别名 */
  route?: string
  /** 站点 */
  sid?: number
  /** 排序 */
  sort?: number
}

/**
 * requestUrl /site-admin/v1.1/permission/create
 * method post
 */
export interface PermissionCreateUsingPOSTRequest {
  
  /** 前端路由 */
  frontRoute?: string
  /** 显示状态，0显示，1隐藏 */
  hide?: number
  /** 图标 */
  icon?: string
  /** 编码 */
  id?: number
  /** 默认勾选 */
  isDefault?: boolean
  /** 菜单 */
  isMenu?: boolean
  /** 层级 */
  level?: number
  /** 名称 */
  name?: string
  /** 上级id */
  pid?: number
  /**  */
  pname?: string
  /** 别名 */
  route?: string
  /** 站点 */
  sid?: number
  /** 排序 */
  sort?: number
}

/**
 * requestUrl /site-admin/v1.1/permission/create
 * method post
 */
export interface PermissionCreateUsingPOSTResponse {
  
  /** 响应数据 */
  data?: 管理员权限数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /site-admin/v1.1/permission/delete/{id}
 * method post
 */
export interface PermissionDeleteUsingPOSTResponse {
  
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
 * requestUrl /site-admin/v1.1/permission/list/{pid}
 * method get
 */
export interface PermissionListByPidUsingGETResponse {
  
  /** 响应数据 */
  data?: 管理员权限数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /site-admin/v1.1/permission/modify
 * method post
 */
export interface PermissionModifyUsingPOSTRequest {
  
  /** 前端路由 */
  frontRoute?: string
  /** 显示状态，0显示，1隐藏 */
  hide?: number
  /** 图标 */
  icon?: string
  /** 编码 */
  id?: number
  /** 默认勾选 */
  isDefault?: boolean
  /** 菜单 */
  isMenu?: boolean
  /** 层级 */
  level?: number
  /** 名称 */
  name?: string
  /** 上级id */
  pid?: number
  /**  */
  pname?: string
  /** 别名 */
  route?: string
  /** 站点 */
  sid?: number
  /** 排序 */
  sort?: number
}

/**
 * requestUrl /site-admin/v1.1/permission/modify
 * method post
 */
export interface PermissionModifyUsingPOSTResponse {
  
  /** 响应数据 */
  data?: 管理员权限数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /site-admin/v1.1/permission/modify_hide
 * method post
 */
export interface PermissionModifyHideUsingPOSTRequest {
  
  /** 显示状态，0显示，1隐藏 */
  hide?: number
  /** 编码 */
  id?: number
}

/**
 * requestUrl /site-admin/v1.1/permission/modify_hide
 * method post
 */
export interface PermissionModifyHideUsingPOSTResponse {
  
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
 * requestUrl /site-admin/v1.1/permission/modify_sort
 * method post
 */
export interface PermissionModifySortUsingPOSTRequest {
  
  /** 编码 */
  id?: number
  /** 排序 */
  sort?: number
}

/**
 * requestUrl /site-admin/v1.1/permission/modify_sort
 * method post
 */
export interface PermissionModifySortUsingPOSTResponse {
  
  /** 响应数据 */
  data?: number
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 权限树 {
  
  /**  */
  child?: 权限树
  /** 编码 */
  id?: number
  /** 名称 */
  name?: string
}

/**
 * requestUrl /site-admin/v1.1/permission/p_tree/{id}
 * method get
 */
export interface PermissionPTreeByIdUsingGETResponse {
  
  /** 响应数据 */
  data?: 权限树
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRsp管理员权限数据 {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: 管理员权限数据
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

/**
 * requestUrl /site-admin/v1.1/permission/page
 * method post
 */
export interface PermissionPageUsingPOSTRequest {
  
  /** 前端路由 */
  frontRoute?: string
  /** 显示状态，0显示，1隐藏 */
  hide?: number
  /** 名称 */
  name?: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 上级id */
  pid?: number
  /** 路由 */
  route?: string
}

/**
 * requestUrl /site-admin/v1.1/permission/page
 * method post
 */
export interface PermissionPageUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRsp管理员权限数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /site-admin/v1.1/permission/tree
 * method post
 */
export interface PermissionTreeUsingPOSTRequest {
  
  /** 前端路由 */
  frontRoute?: string
  /** 显示状态，0显示，1隐藏 */
  hide?: number
  /** 名称 */
  name?: string
  /** 别名/路由 */
  route?: string
}

/**
 * requestUrl /site-admin/v1.1/permission/tree
 * method post
 */
export interface PermissionTreeUsingPOSTResponse {
  
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
 * requestUrl /site-admin/v1.1/permission_config
 * method get
 */
export interface PermissionConfigUsingGETResponse {
  
  /** 响应数据 */
  data?: 管理员权限数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /site-admin/v1.1/permission_list
 * method get
 */
export interface PermissionListUsingGETResponse {
  
  /** 响应数据 */
  data?: 管理员权限数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRsp角色名称分页数据 {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: 角色名称分页数据
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface 角色名称分页数据 {
  
  /** 编码 */
  code?: string
  /** 名称 */
  name?: string
}

/**
 * requestUrl /site-admin/v1.1/role/admin/page
 * method post
 */
export interface RoleAdminPageUsingPOSTRequest {
  
  /** 姓名 */
  name?: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 状态0正常1禁用 */
  status?: number
}

/**
 * requestUrl /site-admin/v1.1/role/admin/page
 * method post
 */
export interface RoleAdminPageUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRsp角色名称分页数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /site-admin/v1.1/role/delete/{code}
 * method post
 */
export interface RoleDeleteUsingPOSTResponse {
  
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
 * requestUrl /site-admin/v1.1/role/modify_status
 * method post
 */
export interface RoleModifyStatusUsingPOSTRequest {
  
  /** 编码 */
  code?: string
  /** 状态0正常1禁用 */
  status?: number
}

/**
 * requestUrl /site-admin/v1.1/role/modify_status
 * method post
 */
export interface RoleModifyStatusUsingPOSTResponse {
  
  /** 响应数据 */
  data?: Record<string | number | symbol, any>
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRsp角色分页数据 {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: 角色分页数据
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface 角色分页数据 {
  
  /** 编码 */
  code?: string
  /** 创建时间 */
  createdAt?: number
  /** 描述 */
  description?: string
  /** 默认角色 */
  isDefault?: boolean
  /** 名称 */
  name?: string
  /** 状态0正常1禁用 */
  status?: number
}

/**
 * requestUrl /site-admin/v1.1/role/page
 * method post
 */
export interface RolePageUsingPOSTRequest {
  
  /** 姓名 */
  name?: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 状态0正常1禁用 */
  status?: number
}

/**
 * requestUrl /site-admin/v1.1/role/page
 * method post
 */
export interface RolePageUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRsp角色分页数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /site-admin/v1.1/role/page_enable
 * method post
 */
export interface RolePageEnableUsingPOSTRequest {
  
  /** 姓名 */
  name?: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 状态0正常1禁用 */
  status?: number
}

/**
 * requestUrl /site-admin/v1.1/role/page_enable
 * method post
 */
export interface RolePageEnableUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRsp角色分页数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 角色业务权限表 {
  
  /** 编码 */
  code?: string
  /** 角色code */
  roleCode?: string
  /** 业务id */
  tagId?: number
}

/**
 * requestUrl /site-admin/v1.1/role/save
 * method post
 */
export interface RoleSaveUsingPOSTRequest {
  
  /** 管理员区域权限列表 */
  cityList?: 角色区域权限表
  /** 编码, 更新时必传 */
  code?: string
  /** 创建时间 */
  createdAt?: number
  /** 描述 */
  description?: string
  /** 名称 */
  name?: string
  /** 管理员权限列表 */
  permissionList?: 管理员权限数据
  /** 状态0正常1禁用 */
  status?: number
  /** 业务权限列表 */
  tagList?: 角色业务权限表
}

/**
 * requestUrl /site-admin/v1.1/role/save
 * method post
 */
export interface RoleSaveUsingPOSTResponse {
  
  /** 响应数据 */
  data?: Record<string | number | symbol, any>
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 管理员角色详情 {
  
  /** 管理员区域权限列表 */
  cityList?: 角色区域权限表
  /** 编码, 更新时必传 */
  code?: string
  /** 创建时间 */
  createdAt?: number
  /** 描述 */
  description?: string
  /** 名称 */
  name?: string
  /** 管理员权限列表 */
  permissionList?: 管理员权限数据
  /** 状态0正常1禁用 */
  status?: number
  /** 业务权限列表 */
  tagList?: 角色业务权限表
}

/**
 * requestUrl /site-admin/v1.1/role/{code}
 * method get
 */
export interface RoleDetailUsingGETResponse {
  
  /** 响应数据 */
  data?: 管理员角色详情
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /site-admin/v1.1/role_permission/authz
 * method post
 */
export interface RolePermissionAuthzUsingPOSTRequest {
  
  /** url路径 */
  path: string
}

/**
 * requestUrl /site-admin/v1.1/role_permission/authz
 * method post
 */
export interface RolePermissionAuthzUsingPOSTResponse {
  
}

/**
 * requestUrl /site-admin/v1.1/role_permission/authz_phpsdk
 * method post
 */
export interface RolePermissionAuthzV2UsingPOSTRequest {
  
  /** api路由地址 */
  apiRoute?: string
}

/**
 * requestUrl /site-admin/v1.1/role_permission/authz_phpsdk
 * method post
 */
export interface RolePermissionAuthzV2UsingPOSTResponse {
  
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
 * requestUrl /site-admin/v1.1/tag_config
 * method get
 */
export interface TagConfigUsingGETResponse {
  
  /** 响应数据 */
  data?: 角色业务权限表
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /site-admin/base_profession_catalog/delete/{id}
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

interface BaseProfessionCatalogResponseDto {
  
  /** 启用状态 0：禁用；1：启用 */
  enableStatus?: number
  /** 是否存在子级，true:存在 */
  existChild?: boolean
  /** 主键 */
  id?: number
  /** 分类等级 */
  level?: number
  /** 分类名 */
  name?: string
  /** 父级id */
  pid?: number
  /** 所有父级id，用逗号隔开 */
  pidAll?: string
  /** 所有父级id，用逗号隔开 */
  pidAllName?: string
  /** 排序 */
  sort?: number
}

/**
 * requestUrl /site-admin/base_profession_catalog/edit
 * method post
 */
export interface EditUsingPOSTRequest {
  
  /** 主键，更新必传 */
  id?: number
  /** 分类等级 */
  level: number
  /** 分类名 */
  name: string
  /** 父级id */
  pid: number
  /** 所有父级id，多个用逗号隔开 */
  pidAll: string
  /** 排序 */
  sort?: number
}

/**
 * requestUrl /site-admin/base_profession_catalog/edit
 * method post
 */
export interface EditUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BaseProfessionCatalogResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /site-admin/base_profession_catalog/move_level
 * method post
 */
export interface MoveLevelUsingPOSTRequest {
  
  /** 主键 */
  id: number
  /** 分类等级 */
  level: number
  /** 父级id */
  pid: number
  /** 所有父级id，多个用逗号隔开 */
  pidAll: string
  /** 排序 */
  sort: number
}

/**
 * requestUrl /site-admin/base_profession_catalog/move_level
 * method post
 */
export interface MoveLevelUsingPOSTResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspBaseProfessionCatalogResponseDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: BaseProfessionCatalogResponseDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

/**
 * requestUrl /site-admin/base_profession_catalog/page_list
 * method post
 */
export interface GetCatalogPageListUsingPOSTRequest {
  
  /** 分类名称 */
  name?: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 父级id */
  pid?: number
}

/**
 * requestUrl /site-admin/base_profession_catalog/page_list
 * method post
 */
export interface GetCatalogPageListUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspBaseProfessionCatalogResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface CatalogBaseResponseDto {
  
  /** 启用状态 0：禁用；1：启用 */
  enableStatus?: number
  /** 主键 */
  id?: number
  /** 分类等级 */
  level?: number
  /** 分类名 */
  name?: string
  /** 父级id */
  pid?: number
  /** 所有父级id，用逗号隔开 */
  pidAll?: string
  /** 所有父级id，用逗号隔开 */
  pidAllName?: string
  /** 排序 */
  sort?: number
}

/**
 * requestUrl /site-admin/base_profession_catalog/recently_used_list
 * method get
 */
export interface GetRecentlyUsedListUsingGETResponse {
  
  /** 响应数据 */
  data?: CatalogBaseResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /site-admin/base_profession_catalog/tree
 * method post
 */
export interface ProfessionCatalogTreeUsingPOSTRequest {
  
  /** 分类名称 */
  name?: string
  /** 职业页码，默认0 */
  pageNo?: number
  /** 职业每页数量， 默认0 */
  pageSize?: number
  /** 父级id */
  pid?: number
}

/**
 * requestUrl /site-admin/base_profession_catalog/tree
 * method post
 */
export interface ProfessionCatalogTreeUsingPOSTResponse {
  
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
 * requestUrl /site-admin/base_profession_catalog/update_sort
 * method post
 */
export interface UpdateSortUsingPOSTRequest {
  
}

/**
 * requestUrl /site-admin/base_profession_catalog/update_sort
 * method post
 */
export interface UpdateSortUsingPOSTResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BaseProfessionInfoDetailResponseDto {
  
  /** 分类id */
  catalogId?: number
  /** 完整分类id，用逗号隔开 */
  catalogIdAll?: string
  /** 完整分类名称，用逗号隔开 */
  catalogNameAll?: string
  /** 编码 */
  code?: string
  /** 启用状态 0：禁用；1：启用 */
  enableStatus?: number
  /** 职业标准文件列表 */
  fileList?: BaseProfessionFileRelationDto
  /** 主键 */
  id?: number
  /** 名称 */
  name?: string
  /** 排序 */
  sort?: number
  /** 工种列表 */
  workTypeList?: BaseProfessionWorkTypeDto
}

interface BaseProfessionFileRelationDto {
  
  /** 职业标准文件名 */
  fileName?: string
  /** 职业标准文件url */
  standardFile?: string
}

interface BaseProfessionWorkTypeDto {
  
  /** 工种编码 */
  code?: string
  /** 主键 */
  id?: number
  /** 工种名称 */
  name?: string
  /** 排序 */
  sort?: number
}

/**
 * requestUrl /site-admin/base_profession_info/batch_detail
 * method post
 */
export interface GetBatchDetailUsingPOSTRequest {
  
}

/**
 * requestUrl /site-admin/base_profession_info/batch_detail
 * method post
 */
export interface GetBatchDetailUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BaseProfessionInfoDetailResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /site-admin/base_profession_info/batch_update_catalog
 * method post
 */
export interface BatchUpdateCatalogUsingPOSTRequest {
  
  /** 分类id */
  catalogId: number
  /** 完整分类id，用逗号隔开 */
  catalogIdAll: string
  /** 职业id列表 */
  idList: any[]
}

/**
 * requestUrl /site-admin/base_profession_info/batch_update_catalog
 * method post
 */
export interface BatchUpdateCatalogUsingPOSTResponse {
  
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
 * requestUrl /site-admin/base_profession_info/check_work_type_used
 * method get
 */
export interface CheckWorkTypeUsedUsingGETResponse {
  
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
 * requestUrl /site-admin/base_profession_info/delete/work_type/{id}
 * method get
 */
export interface DeleteWorkTypeUsingGETResponse {
  
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
 * requestUrl /site-admin/base_profession_info/delete/{id}
 * method post
 */
export interface DeleteUsingPOST_1Response {
  
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
 * requestUrl /site-admin/base_profession_info/detail
 * method get
 */
export interface GetDetailUsingGETResponse {
  
  /** 响应数据 */
  data?: BaseProfessionInfoDetailResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BaseProfessionWorkTypeEditDto {
  
  /** 工种编码 */
  code: string
  /** 主键，更新时必填 */
  id?: number
  /** 工种名称 */
  name: string
  /** 排序 */
  sort?: number
}

/**
 * requestUrl /site-admin/base_profession_info/edit
 * method post
 */
export interface EditUsingPOST_1Request {
  
  /** 分类id */
  catalogId: number
  /** 完整分类id，用逗号隔开 */
  catalogIdAll?: string
  /** 编码 */
  code?: string
  /** 职业标准文件列表 */
  fileList?: BaseProfessionFileRelationDto
  /** 主键，更新必传 */
  id?: number
  /** 名称 */
  name?: string
  /** 排序 */
  sort?: number
  /** 工种列表 */
  workTypeList?: BaseProfessionWorkTypeEditDto
}

/**
 * requestUrl /site-admin/base_profession_info/edit
 * method post
 */
export interface EditUsingPOST_1Response {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspBaseProfessionInfoResponseDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: BaseProfessionInfoResponseDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface BaseProfessionInfoResponseDto {
  
  /** 分类id */
  catalogId?: number
  /** 完整分类id，用逗号隔开 */
  catalogIdAll?: string
  /** 完整分类名称，用逗号隔开 */
  catalogNameAll?: string
  /** 编码 */
  code?: string
  /** 启用状态 0：禁用；1：启用 */
  enableStatus?: number
  /** 是否存在标准 */
  existStandard?: number
  /** 主键 */
  id?: number
  /** 名称 */
  name?: string
  /** 排序 */
  sort?: number
  /** 工种列表 */
  workTypeList?: BaseProfessionWorkTypeDto
}

/**
 * requestUrl /site-admin/base_profession_info/page_list
 * method post
 */
export interface GetCatalogPageListUsingPOST_1Request {
  
  /** 分类id */
  catalogId?: number
  /** 启用状态 0：禁用；1：启用 */
  enableStatus?: number
  /** 是否存在标准 */
  existStandard?: number
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 职业编码 */
  professionCode?: string
  /** 职业名称 */
  professionName?: string
  /** 工种编码 */
  workTypeCode?: string
  /** 工种名称 */
  workTypeName?: string
}

/**
 * requestUrl /site-admin/base_profession_info/page_list
 * method post
 */
export interface GetCatalogPageListUsingPOST_1Response {
  
  /** 响应数据 */
  data?: BasePaginationRspBaseProfessionInfoResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /site-admin/base_profession_info/recently_used_list
 * method get
 */
export interface GetRecentlyUsedListUsingGET_1Response {
  
  /** 响应数据 */
  data?: BaseProfessionInfoResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /site-admin/base_profession_info/update_status
 * method post
 */
export interface UpdateStatusUsingPOSTRequest {
  
  /** 启用状态 0：禁用；1：启用 */
  enableStatus: number
  /** 主键 */
  id: number
}

/**
 * requestUrl /site-admin/base_profession_info/update_status
 * method post
 */
export interface UpdateStatusUsingPOSTResponse {
  
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
 * requestUrl /site-admin/v1.1/delete/{code}
 * method post
 */
export interface DeleteUsingPOST_2Response {
  
  /** 响应数据 */
  data?: Record<string | number | symbol, any>
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 管理员详情 {
  
  /** 头像 */
  avatar?: string
  /** 城市 */
  city?: number
  /** 编码,更新时必传 */
  code?: string
  /** 手机号 */
  mobile: string
  /** 姓名 */
  name: string
  /** 省份 */
  province?: number
  /** 角色code */
  roleCode: string
  /** 角色详情 */
  roleDetail?: 管理员角色详情
  /** 角色名称 */
  roleName?: string
  /** 站点 */
  sid?: number
  /** 来源 1平台 2职培 3考评 4创培 5职培资源方 */
  source?: number
  /** 状态0正常1禁用 */
  status?: number
}

/**
 * requestUrl /site-admin/v1.1/detail/{code}
 * method get
 */
export interface DetailUsingGETResponse {
  
  /** 响应数据 */
  data?: 管理员详情
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /site-admin/v1.1/detail_current
 * method get
 */
export interface DetailCurrentUsingGETResponse {
  
  /** 响应数据 */
  data?: 管理员详情
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 管理员分页数据 {
  
  /** 地区 */
  area?: number
  /** 城市 */
  city?: number
  /** 编码 */
  code?: string
  /** 手机号 */
  mobile?: string
  /** 姓名 */
  name?: string
  /** 省份 */
  province?: number
  /** 角色 */
  roleName?: string
  /** 站点 */
  sid?: number
  /** 状态0正常1禁用 */
  status?: number
}

/**
 * requestUrl /site-admin/v1.1/list
 * method post
 */
export interface ListUsingPOSTRequest {
  
  /** 管理员编码 */
  codeList: any[]
}

/**
 * requestUrl /site-admin/v1.1/list
 * method post
 */
export interface ListUsingPOSTResponse {
  
  /** 响应数据 */
  data?: 管理员分页数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface cms登录响应体 {
  
  /** 访问令牌 */
  accessToken?: string
  /** 登录设备 */
  appKey?: string
  /** 是否需要重设密码 */
  needResetPassword?: boolean
  /** 用户code */
  userCode?: string
}

/**
 * requestUrl /site-admin/v1.1/login
 * method post
 */
export interface LoginUsingPOSTRequest {
  
  /** 手机号 */
  account: string
  /** 登录设备,WEB, APPLET */
  appKey: string
  /** 密码 */
  password: string
  /** 加密公钥 */
  publicKey?: string
}

/**
 * requestUrl /site-admin/v1.1/login
 * method post
 */
export interface LoginUsingPOSTResponse {
  
  /** 响应数据 */
  data?: cms登录响应体
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRsp登录记录 {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: 登录记录
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface 登录记录 {
  
  /** 用户编码 */
  adminCode?: string
  /** 手机号 */
  adminMobile?: string
  /** 名称 */
  adminName?: string
  /** 城市 */
  city?: string
  /** 编码 */
  code?: string
  /** 登录ip */
  ip?: string
  /** 登录时间 */
  loginTime?: number
  /** 角色 */
  roleName?: string
  /** 终端，1PC网页，2小程序 */
  terminal?: number
  /** 终端描述，PC网页/小程序 */
  terminalDesc?: string
  /** 登录方式，1账号登录，2手机验证码 */
  type?: number
  /** 登录方式描述，账号登录/手机验证码 */
  typeDesc?: string
}

/**
 * requestUrl /site-admin/v1.1/login_log_all
 * method post
 */
export interface LoginLogListUsingPOSTRequest {
  
  /** 结束登录时间 */
  loginTimeEnd?: number
  /** 起始登录时间 */
  loginTimeStart?: number
  /** 账号 */
  mobile?: string
  /** 姓名 */
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
 * requestUrl /site-admin/v1.1/login_log_all
 * method post
 */
export interface LoginLogListUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRsp登录记录
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /site-admin/v1.1/login_log_list/{type}
 * method post
 */
export interface LoginLogListUsingPOST_1Request {
  
  /** 结束登录时间 */
  loginTimeEnd?: number
  /** 起始登录时间 */
  loginTimeStart?: number
  /** 账号 */
  mobile?: string
  /** 姓名 */
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
 * requestUrl /site-admin/v1.1/login_log_list/{type}
 * method post
 */
export interface LoginLogListUsingPOST_1Response {
  
  /** 响应数据 */
  data?: BasePaginationRsp登录记录
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /site-admin/v1.1/logout
 * method get
 */
export interface LogoutUsingGETResponse {
  
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
 * requestUrl /site-admin/v1.1/modify_base_info
 * method post
 */
export interface ModifyBaseInfoUsingPOSTRequest {
  
  /** 头像 */
  avatar?: string
  /** 城市 */
  city?: number
  /** 手机号 */
  mobile?: string
  /** 名称 */
  name?: string
  /** 省份 */
  province?: number
}

/**
 * requestUrl /site-admin/v1.1/modify_base_info
 * method post
 */
export interface ModifyBaseInfoUsingPOSTResponse {
  
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
 * requestUrl /site-admin/v1.1/modify_password
 * method post
 */
export interface ModifyPasswordUsingPOST_1Request {
  
  /** 旧密码 */
  oldPassword: string
  /** 新密码 */
  password: string
  /** 确认新密码 */
  passwordRepeat: string
  /** 加密公钥 */
  publicKey?: string
}

/**
 * requestUrl /site-admin/v1.1/modify_password
 * method post
 */
export interface ModifyPasswordUsingPOST_1Response {
  
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
 * requestUrl /site-admin/v1.1/modify_password_php
 * method post
 */
export interface ModifyPasswordUsingPOSTRequest {
  
  /** 新密码 */
  password: string
  /** 用户编码 */
  userCode: string
}

/**
 * requestUrl /site-admin/v1.1/modify_password_php
 * method post
 */
export interface ModifyPasswordUsingPOSTResponse {
  
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
 * requestUrl /site-admin/v1.1/modify_status
 * method post
 */
export interface ModifyStatusUsingPOSTRequest {
  
  /** 编码 */
  code?: string
  /** 状态0正常1禁用 */
  status?: number
}

/**
 * requestUrl /site-admin/v1.1/modify_status
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

interface BasePaginationRsp管理员分页数据 {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: 管理员分页数据
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

/**
 * requestUrl /site-admin/v1.1/page
 * method post
 */
export interface PageUsingPOSTRequest {
  
  /** 姓名 */
  name?: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 角色code */
  roleCode?: string
  /** 状态0正常1禁用 */
  status?: number
}

/**
 * requestUrl /site-admin/v1.1/page
 * method post
 */
export interface PageUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRsp管理员分页数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspPermissionAdminPageDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: PermissionAdminPageDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface PermissionAdminPageDto {
  
  /** 姓名 */
  name?: string
  /** 角色编码 */
  roleCode?: string
  /** 角色名称 */
  roleName?: string
  /** 是否是销售员 */
  salesUserFlag?: boolean
  /** 用户编码 */
  userCode?: string
}

/**
 * requestUrl /site-admin/v1.1/page_by_permission
 * method post
 */
export interface PageByPermissionUsingPOSTRequest {
  
  /** 用户姓名 */
  name?: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 10-沃土云;15-职业培训;20-考评认证;25-就业服务;30-创业培训;35-院校业务;50-业财;55-人事 */
  permissionId?: number
}

/**
 * requestUrl /site-admin/v1.1/page_by_permission
 * method post
 */
export interface PageByPermissionUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspPermissionAdminPageDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /site-admin/v1.1/public_key
 * method get
 */
export interface GetPublicKeyUsingGETResponse {
  
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
 * requestUrl /site-admin/v1.1/reset_init_password/{code}
 * method post
 */
export interface ResetInitPasswordUsingPOSTResponse {
  
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
 * requestUrl /site-admin/v1.1/reset_password
 * method post
 */
export interface ChangePasswordUsingPOSTRequest {
  
  /** 手机号 */
  account: string
  /** 密码 */
  password: string
  /** 确认密码 */
  passwordRepeat: string
  /** 加密公钥 */
  publicKey?: string
  /** 验证码随机key */
  randomKey: string
  /** 验证码 */
  verifyCode: string
}

/**
 * requestUrl /site-admin/v1.1/reset_password
 * method post
 */
export interface ChangePasswordUsingPOSTResponse {
  
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
 * requestUrl /site-admin/v1.1/save
 * method post
 */
export interface SaveUsingPOSTRequest {
  
  /** 头像 */
  avatar?: string
  /** 城市 */
  city?: number
  /** 编码,更新时必传 */
  code?: string
  /** 手机号 */
  mobile: string
  /** 姓名 */
  name: string
  /** 省份 */
  province?: number
  /** 角色code */
  roleCode: string
  /** 角色详情 */
  roleDetail?: 管理员角色详情
  /** 角色名称 */
  roleName?: string
  /** 站点 */
  sid?: number
  /** 来源 1平台 2职培 3考评 4创培 5职培资源方 */
  source?: number
  /** 状态0正常1禁用 */
  status?: number
}

/**
 * requestUrl /site-admin/v1.1/save
 * method post
 */
export interface SaveUsingPOSTResponse {
  
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
 * requestUrl /site-admin/v1.1/verify_login
 * method post
 */
export interface VerifyLoginUsingPOSTRequest {
  
  /** 手机号 */
  account: string
  /** 登录设备,WEB代表PC网页、APPLET代表小程序 */
  appKey: string
  /** 随机key，同一生命周期key不变 */
  randomKey: string
  /** 验证码 */
  verifyCode: string
}

/**
 * requestUrl /site-admin/v1.1/verify_login
 * method post
 */
export interface VerifyLoginUsingPOSTResponse {
  
  /** 响应数据 */
  data?: cms登录响应体
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /site-admin/v1.1/verify_password
 * method post
 */
export interface ValidatePasswordUsingPOSTRequest {
  
  /** 密码 */
  password: string
}

/**
 * requestUrl /site-admin/v1.1/verify_password
 * method post
 */
export interface ValidatePasswordUsingPOSTResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface CommonLevelInfoDto {
  
  /** 别名 */
  alias?: string
  /** id */
  id?: number
  /** 等级名称 */
  name?: string
  /** 排序 */
  sort?: number
}

/**
 * requestUrl /site-admin/common_profession_level/list
 * method get
 */
export interface GetAllUsingGETResponse {
  
  /** 响应数据 */
  data?: CommonLevelInfoDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /site-admin/common_profession_used/check_is_related
 * method post
 */
export interface CheckIsRelatedUsingPOSTRequest {
  
  /** 分类id */
  catalogId?: number
  /** 职业id */
  professionId: number
  /** 职业类型 0：职业大典；1：站点目录 */
  professionType: number
  /** 站点id */
  sid?: number
  /** 工种id */
  workId?: number
}

/**
 * requestUrl /site-admin/common_profession_used/check_is_related
 * method post
 */
export interface CheckIsRelatedUsingPOSTResponse {
  
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
 * requestUrl /site-admin/common_profession_used/delete
 * method post
 */
export interface DeleteUsedRelationUsingPOSTRequest {
  
  /** 业务线类型 1平台,2职培,3考评,4创培 */
  businessType: string
  /** 分类id */
  catalogId?: number
  /** 职业id */
  professionId: number
  /** 职业类型 0：职业大典；1：站点目录 */
  professionType: number
  /** 站点id */
  sid?: number
  /** 工种id */
  workId?: number
}

/**
 * requestUrl /site-admin/common_profession_used/delete
 * method post
 */
export interface DeleteUsedRelationUsingPOSTResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspCommonProfessionUsedRelationResponseDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: CommonProfessionUsedRelationResponseDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface CommonProfessionUsedRelationResponseDto {
  
  /** 业务线类型 2职培,3考评,4创培 */
  businessType?: string
  /** 分类id */
  catalogId?: number
  /** 主键 */
  id?: number
  /** 职业id */
  professionId?: number
  /** 职业类型 0：职业大典；1：站点目录 */
  professionType?: number
  /** 站点id */
  sid?: number
  /** 工种id */
  workId?: number
}

/**
 * requestUrl /site-admin/common_profession_used/page_list
 * method post
 */
export interface GetUsedRelationPageListUsingPOSTRequest {
  
  /** 业务线类型 2职培,3考评,4创培 */
  businessType: string
  /** 分类id */
  catalogId?: number
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 职业id */
  professionId?: number
  /** 职业类型 0：职业大典；1：站点目录 */
  professionType: number
  /** 站点id */
  sid?: number
  /** 工种id */
  workId?: number
}

/**
 * requestUrl /site-admin/common_profession_used/page_list
 * method post
 */
export interface GetUsedRelationPageListUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspCommonProfessionUsedRelationResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /site-admin/common_profession_used/save
 * method post
 */
export interface SaveUsedRelationUsingPOSTRequest {
  
  /** 业务线类型 1平台,2职培,3考评,4创培 */
  businessType: string
  /** 分类id */
  catalogId?: number
  /** 职业id */
  professionId: number
  /** 职业类型 0：职业大典；1：站点目录 */
  professionType: number
  /** 站点id */
  sid?: number
  /** 工种id */
  workId?: number
}

/**
 * requestUrl /site-admin/common_profession_used/save
 * method post
 */
export interface SaveUsedRelationUsingPOSTResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface AddressResponseDto {
  
  /** 区 */
  area?: string
  /** 市 */
  city?: string
  /** 省 */
  province?: string
}

/**
 * requestUrl /site-admin/front/ip_address/address_info
 * method get
 */
export interface GetAddressUsingGETResponse {
  
  /** 响应数据 */
  data?: AddressResponseDto
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
 * requestUrl /site-admin/operationlog/page
 * method post
 */
export interface PageUsingPOST_1Request {
  
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
 * requestUrl /site-admin/operationlog/page
 * method post
 */
export interface PageUsingPOST_1Response {
  
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
 * requestUrl /site-admin/php/base_catalog/save
 * method post
 */
export interface SaveBaseCatalogUsingPOSTRequest {
  
  /** 主键id */
  id?: number
  /** 分类等级 */
  level: number
  /** 分类名 */
  name: string
  /** 操作人,2职培,3考评,4创培 */
  operatorCode: string
  /** 父级id,顶级分类id为0 */
  pid: number
  /** 排序 */
  sort?: number
}

/**
 * requestUrl /site-admin/php/base_catalog/save
 * method post
 */
export interface SaveBaseCatalogUsingPOSTResponse {
  
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
 * requestUrl /site-admin/php/base_profession/save
 * method post
 */
export interface SaveBaseProfessionUsingPOSTRequest {
  
  /** 分类id */
  catalogId: number
  /** 编码 */
  code?: string
  /** 职业标准文件列表 */
  fileList?: BaseProfessionFileRelationDto
  /** 主键id */
  id?: number
  /** 名称 */
  name?: string
  /** 操作人,2职培,3考评,4创培 */
  operatorCode: string
  /** 排序 */
  sort?: number
  /** 工种列表 */
  workTypeList?: BaseProfessionWorkTypeEditDto
}

/**
 * requestUrl /site-admin/php/base_profession/save
 * method post
 */
export interface SaveBaseProfessionUsingPOSTResponse {
  
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
 * requestUrl /site-admin/php/catalog/save
 * method post
 */
export interface SaveCatalogUsingPOSTRequest {
  
  /** 分类等级 */
  level: number
  /** 分类名 */
  name: string
  /** 操作人,2职培,3考评,4创培 */
  operatorCode: string
  /** 图片 */
  picture?: string
  /** 父级id */
  pid: number
  /** 站点id */
  sid: number
  /** 排序 */
  sort?: number
}

/**
 * requestUrl /site-admin/php/catalog/save
 * method post
 */
export interface SaveCatalogUsingPOSTResponse {
  
  /** 响应数据 */
  data?: number
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface LabelValueEditDto {
  
  /** 标签值id，更新必传 */
  id?: number
  /** 排序 */
  sort?: number
  /** 标签值 */
  value: string
}

/**
 * requestUrl /site-admin/php/label/save
 * method post
 */
export interface SaveLabelUsingPOSTRequest {
  
  /** 启用状态,内部标签固定为1启用状态 */
  enableStatus?: number
  /** 内部标签标识,不允许删除,默认0 */
  innerLabelFlag?: number
  /** 标签值列表 */
  labelValueList: LabelValueEditDto
  /** 标签名称 */
  name: string
  /** 操作人,2职培,3考评,4创培 */
  operatorCode: string
  /** 是否展示 */
  showFlag?: number
  /** 站点id */
  sid: number
  /** 排序 */
  sort?: number
}

/**
 * requestUrl /site-admin/php/label/save
 * method post
 */
export interface SaveLabelUsingPOSTResponse {
  
  /** 响应数据 */
  data?: number
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface ProfessionLabelEditDto {
  
  /** 标签值id */
  labelId: number
  /** 标签值id */
  labelValueId: number
}

interface CommonLevelInfoEditDto {
  
  /** 补贴标准 */
  allowanceStandard?: number
  /** 课时标准 */
  classHourStandard?: number
  /** 启用状态 */
  enableStatus?: number
  /** id */
  id?: number
  /** 等级关联id */
  levelRelationId?: number
  /** 排序 */
  sort?: number
}

interface ProfessionWorkTypeEditDto {
  
  /** 补贴标准 */
  allowanceStandard?: number
  /** 课时标准 */
  classHourStandard?: number
  /** 工种编码 */
  code?: string
  /** 存在等级标识 0；不存在 1：存在 */
  existLevel: number
  /** 主键，更新时必填 */
  id?: number
  /** 等级列表 */
  levelInfoList?: CommonLevelInfoEditDto
  /** 工种名称 */
  name: string
  /** 排序 */
  sort?: number
}

/**
 * requestUrl /site-admin/php/profession/save
 * method post
 */
export interface SaveProfessionUsingPOSTRequest {
  
  /** 补贴标准 */
  allowanceStandard?: number
  /** 附件 */
  attachFile?: string
  /** 附件名称 */
  attachFileName?: string
  /** 对应职业大典id */
  baseProfessionId?: number
  /** 分类id,多个用逗号隔开 */
  catalogIds: string
  /** 课时标准 */
  classHourStandard?: number
  /** 编码 */
  code?: string
  /** 启用状态 */
  enableStatus?: number
  /** 存在等级标识 0；不存在 1：存在 */
  existLevel: number
  /** 存在工种标识 0；不存在 1：存在 */
  existWorkType: number
  /** 标签列表 */
  labelList?: ProfessionLabelEditDto
  /** 等级列表 */
  levelInfoList?: CommonLevelInfoEditDto
  /** 名称 */
  name?: string
  /** 操作人,2职培,3考评,4创培 */
  operatorCode: string
  /** 站点id */
  sid: number
  /** 排序 */
  sort?: number
  /** 工种列表 */
  workTypeList?: ProfessionWorkTypeEditDto
}

/**
 * requestUrl /site-admin/php/profession/save
 * method post
 */
export interface SaveProfessionUsingPOSTResponse {
  
  /** 响应数据 */
  data?: number
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface ProfessionCatalogResponseDto {
  
  /** 启用状态 0：禁用；1：启用 */
  enableStatus?: number
  /** 是否存在子级，true:存在 */
  existChild?: boolean
  /** 主键 */
  id?: number
  /** 分类等级 */
  level?: number
  /** 分类名 */
  name?: string
  /** 图片 */
  picture?: string
  /** 父级id */
  pid?: number
  /** 所有父级id，用逗号隔开 */
  pidAll?: string
  /** 所有父级id，用逗号隔开 */
  pidAllName?: string
  /** 站点id */
  sid: number
  /** 排序 */
  sort?: number
}

/**
 * requestUrl /site-admin/site_profession_catalog/batch_detail
 * method post
 */
export interface GetDetailUsingPOSTRequest {
  
}

/**
 * requestUrl /site-admin/site_profession_catalog/batch_detail
 * method post
 */
export interface GetDetailUsingPOSTResponse {
  
  /** 响应数据 */
  data?: ProfessionCatalogResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /site-admin/site_profession_catalog/child_by_pid
 * method get
 */
export interface GetCatalogAllByPidUsingGETResponse {
  
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
 * requestUrl /site-admin/site_profession_catalog/delete/{id}
 * method post
 */
export interface DeleteUsingPOST_3Response {
  
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
 * requestUrl /site-admin/site_profession_catalog/edit
 * method post
 */
export interface EditUsingPOST_2Request {
  
  /** 主键， 更新必填 */
  id?: number
  /** 分类等级 */
  level: number
  /** 分类名 */
  name: string
  /** 图片 */
  picture?: string
  /** 父级id */
  pid: number
  /** 所有父级id，用逗号隔开 */
  pidAll: string
  /** 站点id */
  sid: number
  /** 排序 */
  sort?: number
}

/**
 * requestUrl /site-admin/site_profession_catalog/edit
 * method post
 */
export interface EditUsingPOST_2Response {
  
  /** 响应数据 */
  data?: ProfessionCatalogResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspProfessionCatalogResponseDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: ProfessionCatalogResponseDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

/**
 * requestUrl /site-admin/site_profession_catalog/page_list
 * method post
 */
export interface GetCatalogPageListUsingPOST_2Request {
  
  /** 分类名称 */
  name?: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 父级id */
  pid?: number
  /** 站点id */
  sid: number
}

/**
 * requestUrl /site-admin/site_profession_catalog/page_list
 * method post
 */
export interface GetCatalogPageListUsingPOST_2Response {
  
  /** 响应数据 */
  data?: BasePaginationRspProfessionCatalogResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /site-admin/site_profession_catalog/tree
 * method post
 */
export interface ProfessionCatalogTreeUsingPOST_1Request {
  
  /** 分类id列表 */
  idList?: any[]
  /** 分类名称 */
  name?: string
  /** 职业页码，默认0 */
  pageNo?: number
  /** 职业每页数量， 默认0 */
  pageSize?: number
  /** 站点id */
  sid: number
}

/**
 * requestUrl /site-admin/site_profession_catalog/tree
 * method post
 */
export interface ProfessionCatalogTreeUsingPOST_1Response {
  
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
 * requestUrl /site-admin/site_profession_catalog/update_sort
 * method post
 */
export interface UpdateSortUsingPOST_1Request {
  
}

/**
 * requestUrl /site-admin/site_profession_catalog/update_sort
 * method post
 */
export interface UpdateSortUsingPOST_1Response {
  
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
 * requestUrl /site-admin/profession_label/batch_delete_relation
 * method post
 */
export interface BatchDeleteRelationUsingPOSTRequest {
  
}

/**
 * requestUrl /site-admin/profession_label/batch_delete_relation
 * method post
 */
export interface BatchDeleteRelationUsingPOSTResponse {
  
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
 * requestUrl /site-admin/profession_label/delete/{id}
 * method post
 */
export interface DeleteUsingPOST_4Response {
  
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
 * requestUrl /site-admin/profession_label/delete_relation/{id}
 * method post
 */
export interface DeleteRelationUsingPOSTResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface ProfessionLabelDetailResponseDto {
  
  /** 启用状态 */
  enableStatus?: number
  /** id主键 */
  id?: number
  /** 内部标签标识,不允许删除,默认0 */
  innerLabelFlag?: number
  /** 标签值列表 */
  labelValueList?: LabelValueDto
  /** 标签名称 */
  name?: string
  /** 是否展示，默认1 */
  showFlag?: number
  /** 站点id */
  sid?: number
  /** 排序 */
  sort?: number
}

interface LabelValueDto {
  
  /** 标签值id */
  id?: number
  /** 排序 */
  sort?: number
  /** 标签值 */
  value?: string
}

/**
 * requestUrl /site-admin/profession_label/detail
 * method get
 */
export interface GetDetailUsingGET_1Response {
  
  /** 响应数据 */
  data?: ProfessionLabelDetailResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /site-admin/profession_label/edit
 * method post
 */
export interface EditUsingPOST_3Request {
  
  /** 启用状态，0未启用 1启用,内部标签固定为启用状态 */
  enableStatus?: number
  /** id主键,更新必传 */
  id?: number
  /** 是否内部标签标识, 0不是，1是，内部标识不允许删除,默认0 */
  innerLabelFlag?: number
  /** 标签值列表 */
  labelValueList: LabelValueEditDto
  /** 标签名称 */
  name: string
  /** 是否展示 */
  showFlag?: number
  /** 站点id */
  sid: number
  /** 排序 */
  sort?: number
}

/**
 * requestUrl /site-admin/profession_label/edit
 * method post
 */
export interface EditUsingPOST_3Response {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspProfessionLabelBaseResponseDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: ProfessionLabelBaseResponseDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface ProfessionLabelBaseResponseDto {
  
  /** id主键 */
  id?: number
  /** 标签值列表 */
  labelValueList?: LabelValueDto
  /** 标签名称 */
  name?: string
  /** 排序 */
  sort?: number
}

/**
 * requestUrl /site-admin/profession_label/enable_label_page
 * method post
 */
export interface GetEnableLabelPageListUsingPOSTRequest {
  
  /** 标签名称 */
  labelName?: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 站点id */
  sid: number
}

/**
 * requestUrl /site-admin/profession_label/enable_label_page
 * method post
 */
export interface GetEnableLabelPageListUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspProfessionLabelBaseResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspLabelManageResponseDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: LabelManageResponseDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface LabelManageResponseDto {
  
  /** 启用状态 */
  enableStatus?: number
  /** id主键 */
  id?: number
  /** 内部标签标识,不允许删除,默认0 */
  innerLabelFlag?: number
  /** 标签值统计 */
  labelValueCount?: number
  /** 标签名称 */
  name?: string
  /** 职业统计 */
  professionCount?: number
  /** 是否展示，默认1 */
  showFlag?: number
  /** 站点id */
  sid?: number
  /** 站点名称 */
  sidName?: string
  /** 排序 */
  sort?: number
}

/**
 * requestUrl /site-admin/profession_label/manage_page
 * method post
 */
export interface GetManagePageListUsingPOSTRequest {
  
  /** 启用状态 */
  enableStatus?: number
  /** 内部标签标识,不允许删除,默认0 */
  innerLabelFlag?: number
  /** 标签名称 */
  labelName?: string
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
 * requestUrl /site-admin/profession_label/manage_page
 * method post
 */
export interface GetManagePageListUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspLabelManageResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface LabelDetailResponseDto {
  
  /** 标签id */
  labelId?: number
  /** 标签名称 */
  labelName?: string
  /** 标签值列表 */
  labelValueList?: LabelValueDto
}

/**
 * requestUrl /site-admin/profession_label/relation_list_by_profession
 * method get
 */
export interface GetRelationListByProfessionUsingGETResponse {
  
  /** 响应数据 */
  data?: LabelDetailResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspLabelRelationResponseDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: LabelRelationResponseDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface LabelRelationResponseDto {
  
  /** 主键id */
  id?: number
  /** 标签值 */
  labelValue?: string
  /** 标签值id */
  labelValueId?: number
  /** 职业id */
  professionId?: number
  /** 职业名称 */
  professionName?: string
}

/**
 * requestUrl /site-admin/profession_label/relation_page
 * method post
 */
export interface GetRelationPageListUsingPOSTRequest {
  
  /** 标签id */
  labelId: number
  /** 标签值id */
  labelValueId?: number
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 职业id */
  professionId?: number
}

/**
 * requestUrl /site-admin/profession_label/relation_page
 * method post
 */
export interface GetRelationPageListUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspLabelRelationResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspLabelProfessionResponseDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: LabelProfessionResponseDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface LabelProfessionResponseDto {
  
  /** 职业id */
  professionId?: number
  /** 职业名称 */
  professionName?: string
}

/**
 * requestUrl /site-admin/profession_label/relation_profession_name_page
 * method post
 */
export interface GetRelationProfessionNamePageListUsingPOSTRequest {
  
  /** 标签id */
  labelId: number
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 职业名称 */
  professionName?: string
}

/**
 * requestUrl /site-admin/profession_label/relation_profession_name_page
 * method post
 */
export interface GetRelationProfessionNamePageListUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspLabelProfessionResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspLabelValueResponseDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: LabelValueResponseDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface LabelValueResponseDto {
  
  /** 标签值 */
  labelValue?: string
  /** 标签值id */
  labelValueId?: number
}

/**
 * requestUrl /site-admin/profession_label/relation_value_name_page
 * method post
 */
export interface GetRelationValuePageListUsingPOSTRequest {
  
  /** 标签id */
  labelId: number
  /** 标签值 */
  labelValue?: string
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
 * requestUrl /site-admin/profession_label/relation_value_name_page
 * method post
 */
export interface GetRelationValuePageListUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspLabelValueResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /site-admin/profession_label/update_sort
 * method post
 */
export interface UpdateSortUsingPOST_2Request {
  
  /** 主键 */
  id: number
  /** 排序 */
  sort?: number
}

/**
 * requestUrl /site-admin/profession_label/update_sort
 * method post
 */
export interface UpdateSortUsingPOST_2Response {
  
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
 * requestUrl /site-admin/profession_label/update_status
 * method post
 */
export interface UpdateStatusUsingPOST_1Request {
  
  /** 启用状态 0：禁用；1：启用 */
  enableStatus: number
  /** 主键 */
  id: number
}

/**
 * requestUrl /site-admin/profession_label/update_status
 * method post
 */
export interface UpdateStatusUsingPOST_1Response {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface ProfessionInfoDetailResponseDto {
  
  /** 补贴标准 */
  allowanceStandard?: number
  /** 附件 */
  attachFile?: string
  /** 附件名称 */
  attachFileName?: string
  /** 对应职业大典完整分类 */
  baseCatalogIdAll?: string
  /** 对应职业大典id */
  baseProfessionId?: number
  /** 对应职业大典完整名称 */
  baseProfessionNameAll?: string
  /** 完整分类id，同类用逗号隔开，异类分号隔开 */
  catalogIdAll?: string
  /** 分类id */
  catalogIds?: string
  /** 完整分类名称，同类用逗号隔开，异类分号隔开 */
  catalogNameAll?: string
  /** 课时标准 */
  classHourStandard?: number
  /** 编码 */
  code?: string
  /** 启用状态 0：禁用；1：启用 */
  enableStatus?: number
  /** 存在等级标识 0；不存在 1：存在 */
  existLevel?: number
  /** 存在工种标识 0；不存在 1：存在 */
  existWorkType?: number
  /** 主键 */
  id?: number
  /** 标签列表 */
  labelList?: ProfessionLabelDetailDto
  /** 等级列表 */
  levelInfoList?: CommonLevelInfoDetailDto
  /** 必填内容缺失，默认0，批量导入常用 */
  missingContent?: number
  /** 名称 */
  name?: string
  /** 站点id */
  sid?: number
  /** 排序 */
  sort?: number
  /** 工种列表 */
  workTypeList?: ProfessionWorkTypeDetailDto
}

interface ProfessionLabelDetailDto {
  
  /** id主键 */
  id?: number
  /** 内部标签标识,不允许删除,默认0 */
  innerLabelFlag?: number
  /** 标签值列表 */
  labelValueList?: LabelValueDto
  /** 标签名称 */
  name?: string
  /** 是否展示，默认1 */
  showFlag?: number
  /** 站点id */
  sid?: number
  /** 排序 */
  sort?: number
}

interface CommonLevelInfoDetailDto {
  
  /** 别名 */
  alias?: string
  /** 补贴标准 */
  allowanceStandard?: number
  /** 课时标准 */
  classHourStandard?: number
  /** 启用状态 0：禁用；1：启用 */
  enableStatus?: number
  /** id */
  id?: number
  /** 等级关联id */
  levelRelationId?: number
  /** 等级名称 */
  name?: string
  /** 排序 */
  sort?: number
}

interface ProfessionWorkTypeDetailDto {
  
  /** 补贴标准 */
  allowanceStandard?: number
  /** 课时标准 */
  classHourStandard?: number
  /** 工种编码 */
  code?: string
  /** 存在等级标识 0；不存在 1：存在 */
  existLevel?: number
  /** 主键 */
  id?: number
  /** 等级列表 */
  levelInfoList?: CommonLevelInfoDetailDto
  /** 等级名称，多个逗号隔开 */
  levelNames?: string
  /** 工种名称 */
  name?: string
  /** 职业id */
  professionId?: number
  /** 排序 */
  sort?: number
}

/**
 * requestUrl /site-admin/site_profession/batch_detail
 * method post
 */
export interface GetBatchDetailUsingPOST_1Request {
  
}

/**
 * requestUrl /site-admin/site_profession/batch_detail
 * method post
 */
export interface GetBatchDetailUsingPOST_1Response {
  
  /** 响应数据 */
  data?: ProfessionInfoDetailResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /site-admin/site_profession/check_work_type_used
 * method get
 */
export interface CheckWorkTypeUsedUsingGET_1Response {
  
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
 * requestUrl /site-admin/site_profession/delete/{id}
 * method post
 */
export interface DeleteUsingPOST_5Response {
  
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
 * requestUrl /site-admin/site_profession/detail
 * method get
 */
export interface GetDetailUsingGET_2Response {
  
  /** 响应数据 */
  data?: ProfessionInfoDetailResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /site-admin/site_profession/detail_by_level
 * method post
 */
export interface GetDetailByLevelRelationUsingPOSTRequest {
  
  /** 等级关联id列表 */
  idList: any[]
  /** 是否只展示匹配到的等级，默认false返回职业全量详情信息 */
  onlyShowMatchedLevel?: boolean
}

/**
 * requestUrl /site-admin/site_profession/detail_by_level
 * method post
 */
export interface GetDetailByLevelRelationUsingPOSTResponse {
  
  /** 响应数据 */
  data?: ProfessionInfoDetailResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /site-admin/site_profession/detail_by_work
 * method post
 */
export interface GetDetailByWorkUsingPOSTRequest {
  
  /** 工种id列表 */
  idList: any[]
  /** 是否只展示匹配到的工种，默认false返回职业全量详情信息 */
  onlyShowMatchedWork?: boolean
}

/**
 * requestUrl /site-admin/site_profession/detail_by_work
 * method post
 */
export interface GetDetailByWorkUsingPOSTResponse {
  
  /** 响应数据 */
  data?: ProfessionInfoDetailResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /site-admin/site_profession/edit
 * method post
 */
export interface EditUsingPOST_4Request {
  
  /** 补贴标准 */
  allowanceStandard?: number
  /** 附件 */
  attachFile?: string
  /** 附件名称 */
  attachFileName?: string
  /** 对应职业大典id */
  baseProfessionId: number
  /** 完整分类id，同类逗号隔开，异类分号隔开 */
  catalogIdAll: string
  /** 分类id,多个用逗号隔开 */
  catalogIds: string
  /** 课时标准 */
  classHourStandard?: number
  /** 编码 */
  code?: string
  /** 启用状态 */
  enableStatus?: number
  /** 存在等级标识 0；不存在 1：存在 */
  existLevel: number
  /** 存在工种标识 0；不存在 1：存在 */
  existWorkType: number
  /** 主键，更新必传 */
  id?: number
  /** 标签列表 */
  labelList?: ProfessionLabelEditDto
  /** 等级列表 */
  levelInfoList?: CommonLevelInfoEditDto
  /** 名称 */
  name?: string
  /** 站点id */
  sid: number
  /** 排序 */
  sort?: number
  /** 工种列表 */
  workTypeList?: ProfessionWorkTypeEditDto
}

/**
 * requestUrl /site-admin/site_profession/edit
 * method post
 */
export interface EditUsingPOST_4Response {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspProfessionInfoResponseDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: ProfessionInfoResponseDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface ProfessionInfoResponseDto {
  
  /** 对应职业大典id */
  baseProfessionId?: number
  /** 完整分类id，同类用逗号隔开，异类分号隔开 */
  catalogIdAll?: string
  /** 分类id */
  catalogIds?: string
  /** 完整分类名称，同类用逗号隔开，异类分号隔开 */
  catalogNameAll?: string
  /** 编码 */
  code?: string
  /** 启用状态 0：禁用；1：启用 */
  enableStatus?: number
  /** 主键 */
  id?: number
  /** 等级列表 */
  levelInfoList?: CommonLevelInfoDetailDto
  /** 等级名称，多个逗号隔开 */
  levelNames?: string
  /** 必填内容缺失，默认0，批量导入常用 */
  missingContent?: number
  /** 名称 */
  name?: string
  /** 站点id */
  sid?: number
  /** 排序 */
  sort?: number
  /** 工种列表 */
  workTypeList?: ProfessionWorkTypeDto
}

interface ProfessionWorkTypeDto {
  
  /** 工种编码 */
  code?: string
  /** 主键 */
  id?: number
  /** 等级名称，多个逗号隔开 */
  levelNames?: string
  /** 工种名称 */
  name?: string
  /** 排序 */
  sort?: number
}

/**
 * requestUrl /site-admin/site_profession/page_list
 * method post
 */
export interface GetPageListUsingPOSTRequest {
  
  /** 对应职业大典id */
  baseProfessionId?: number
  /** 分类id */
  catalogId?: number
  /** 启用状态 0：禁用；1：启用 */
  enableStatus?: number
  /** 职业id列表 */
  idList?: any[]
  /** 标签值id列表 */
  labelValueIdList?: any[]
  /** 是否只展示匹配到的工种 */
  onlyShowMatchedWorkType?: boolean
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 职业编码 */
  professionCode?: string
  /** 职业名称 */
  professionName?: string
  /** 站点id */
  sid: number
  /** 工种id列表 */
  workIdList?: any[]
  /** 工种编码 */
  workTypeCode?: string
  /** 工种名称 */
  workTypeName?: string
}

/**
 * requestUrl /site-admin/site_profession/page_list
 * method post
 */
export interface GetPageListUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspProfessionInfoResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspProfessionInfoMissingResponseDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: ProfessionInfoMissingResponseDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface ProfessionInfoMissingResponseDto {
  
  /** 主键 */
  id?: number
  /** 名称 */
  name?: string
}

/**
 * requestUrl /site-admin/site_profession/page_missing_list
 * method post
 */
export interface GetMissingPageListUsingPOSTRequest {
  
  /** 分类id */
  catalogId?: number
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 站点id */
  sid: number
}

/**
 * requestUrl /site-admin/site_profession/page_missing_list
 * method post
 */
export interface GetMissingPageListUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspProfessionInfoMissingResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspSiteProfessionMixResponseDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: SiteProfessionMixResponseDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface SiteProfessionMixResponseDto {
  
  /** 分类id */
  catalogIds?: string
  /** 分类名称 */
  catalogNames?: string
  /** 等级唯一别名 */
  levelAlias?: string
  /** 等级id */
  levelId?: number
  /** 等级名称 */
  levelName?: string
  /** 等级关联id */
  levelRelationId?: number
  /** 职业编码 */
  professionCode?: string
  /** 职业id */
  professionId?: number
  /** 职业名称 */
  professionName?: string
  /** 站点id */
  sid?: number
  /** 工种编码 */
  workCode?: string
  /** 工种id */
  workId?: number
  /** 工种名称 */
  workName?: string
}

/**
 * requestUrl /site-admin/site_profession/profession_mix_page
 * method post
 */
export interface GetProfessionMixPageListUsingPOSTRequest {
  
  /** 分类id */
  catalogId?: number
  /** 等级启用状态 0：禁用；1：启用 */
  levelEnableStatus?: number
  /** 等级id列表 */
  levelIdList?: any[]
  /** 等级关联id列表 */
  levelRelationIdList?: any[]
  /** 匹配等级为空的信息，仅在职业id和等级id都存在的情况下生效 */
  matchLevelNull?: boolean
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 职业启用状态 0：禁用；1：启用 */
  professionEnableStatus?: number
  /** 职业id列表 */
  professionIdList?: any[]
  /** 站点id */
  sid?: number
  /** 工种id列表 */
  workIdList?: any[]
}

/**
 * requestUrl /site-admin/site_profession/profession_mix_page
 * method post
 */
export interface GetProfessionMixPageListUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspSiteProfessionMixResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspProfessionNameResponseDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: ProfessionNameResponseDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface ProfessionNameResponseDto {
  
  /** 职业id */
  id?: number
  /** 职业名称 */
  name?: string
}

/**
 * requestUrl /site-admin/site_profession/profession_name_page
 * method post
 */
export interface GetProfessionNamePageListUsingPOSTRequest {
  
  /** 启用状态 0：禁用；1：启用 */
  enableStatus?: number
  /** 职业id列表 */
  idList?: any[]
  /** 职业名称 */
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
  sid: number
}

/**
 * requestUrl /site-admin/site_profession/profession_name_page
 * method post
 */
export interface GetProfessionNamePageListUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspProfessionNameResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspProfessionManageDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: ProfessionManageDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface ProfessionManageDto {
  
  /** 职业统计 */
  professionCount?: number
  /** 站点id */
  sid?: number
  /** 站点名称 */
  sidName?: string
  /** 工种统计 */
  workTypeCount?: number
}

/**
 * requestUrl /site-admin/site_profession/site_page
 * method post
 */
export interface GetCatalogPageListUsingPOST_3Request {
  
  /** 站点名称 */
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
 * requestUrl /site-admin/site_profession/site_page
 * method post
 */
export interface GetCatalogPageListUsingPOST_3Response {
  
  /** 响应数据 */
  data?: BasePaginationRspProfessionManageDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /site-admin/site_profession/update_sort
 * method post
 */
export interface UpdateSortUsingPOST_3Request {
  
  /** 主键 */
  id: number
  /** 排序 */
  sort?: number
}

/**
 * requestUrl /site-admin/site_profession/update_sort
 * method post
 */
export interface UpdateSortUsingPOST_3Response {
  
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
 * requestUrl /site-admin/site_profession/update_status
 * method post
 */
export interface UpdateStatusUsingPOST_2Request {
  
  /** 启用状态 0：禁用；1：启用 */
  enableStatus: number
  /** 主键 */
  id: number
}

/**
 * requestUrl /site-admin/site_profession/update_status
 * method post
 */
export interface UpdateStatusUsingPOST_2Response {
  
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
 * requestUrl /site-admin/site_profession/work_detail
 * method post
 */
export interface GetWorkTypeDetailListUsingPOSTRequest {
  
}

/**
 * requestUrl /site-admin/site_profession/work_detail
 * method post
 */
export interface GetWorkTypeDetailListUsingPOSTResponse {
  
  /** 响应数据 */
  data?: ProfessionWorkTypeDetailDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspWorkNameResponseDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: WorkNameResponseDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface WorkNameResponseDto {
  
  /** 工种id */
  id?: number
  /** 工种名称 */
  name?: string
}

/**
 * requestUrl /site-admin/site_profession/work_name_page
 * method post
 */
export interface GetWorkNamePageListUsingPOSTRequest {
  
  /** 启用状态 0：禁用；1：启用 */
  enableStatus?: number
  /** 名称 */
  name?: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 职业id */
  professionId?: number
  /** 站点id */
  sid: number
}

/**
 * requestUrl /site-admin/site_profession/work_name_page
 * method post
 */
export interface GetWorkNamePageListUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspWorkNameResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /site-admin/site_profession/work_update_sort
 * method post
 */
export interface UpdateWorkTypeSortUsingPOSTRequest {
  
  /** 主键 */
  id: number
  /** 排序 */
  sort?: number
}

/**
 * requestUrl /site-admin/site_profession/work_update_sort
 * method post
 */
export interface UpdateWorkTypeSortUsingPOSTResponse {
  
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
 * requestUrl /site-admin/sales_user/delete/{code}
 * method post
 */
export interface SaveUsingPOST_2Response {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface SalesUserResponseDto {
  
  /** 区域权限列表 */
  cityList?: SalesUserCityDto
  /** id/编码 */
  code?: string
  /** 用户名称 */
  name?: string
  /** 角色code */
  roleCode?: string
  /** 角色名称 */
  roleName?: string
  /** 业务id列表,多个逗号隔开 */
  tagIds?: string
  /** 用户编码 */
  userCode?: string
}

interface SalesUserCityDto {
  
  /** 区域id */
  cityId?: number
  /** 区域名称 */
  cityName?: string
}

/**
 * requestUrl /site-admin/sales_user/detail
 * method get
 */
export interface GetDetailByCodeUsingGETResponse {
  
  /** 响应数据 */
  data?: SalesUserResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspSalesUserNameResponseDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: SalesUserNameResponseDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface SalesUserNameResponseDto {
  
  /** 销售员编码 */
  code?: string
  /** 用户名称 */
  name?: string
  /** 用户编码 */
  userCode?: string
}

/**
 * requestUrl /site-admin/sales_user/name_page
 * method post
 */
export interface GetNamePageUsingPOSTRequest {
  
  /** 区域code, 目前只支持省或全国 */
  cityId?: string
  /** 用户名 */
  name?: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 业务权限id，多个逗号隔开 */
  tagId?: string
}

/**
 * requestUrl /site-admin/sales_user/name_page
 * method post
 */
export interface GetNamePageUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspSalesUserNameResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspSalesUserResponseDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: SalesUserResponseDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

/**
 * requestUrl /site-admin/sales_user/page
 * method post
 */
export interface PageUsingPOST_2Request {
  
  /** 区域code, 目前只支持省或全国 */
  cityId?: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 是否展示城市列表 */
  showCityList?: boolean
  /** 业务权限id，多个逗号隔开 */
  tagId?: string
  /** 用户名 */
  userName?: string
}

/**
 * requestUrl /site-admin/sales_user/page
 * method post
 */
export interface PageUsingPOST_2Response {
  
  /** 响应数据 */
  data?: BasePaginationRspSalesUserResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /site-admin/sales_user/save
 * method post
 */
export interface SaveUsingPOST_1Request {
  
  /** 区域权限列表 */
  cityList?: SalesUserCityDto
  /** 编码 */
  code?: string
  /** 用户名称 */
  name?: string
  /** 角色code */
  roleCode?: string
  /** 角色名称 */
  roleName?: string
  /** 业务id,多个逗号隔开 */
  tagIds?: string
  /** 用户编码 */
  userCode?: string
}

/**
 * requestUrl /site-admin/sales_user/save
 * method post
 */
export interface SaveUsingPOST_1Response {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface UserPageConfigDto {
  
  /** 编码 */
  code?: string
  /** 配置类型,pageSize:页面size；columns:自定义列 */
  configKey?: string
  /** 配置值 */
  configValue?: string
  /** 模块 */
  module?: string
  /** 用户编码 */
  userCode?: string
}

/**
 * requestUrl /site-admin/page_config/list
 * method get
 */
export interface GetConfigListUsingGETResponse {
  
  /** 响应数据 */
  data?: UserPageConfigDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /site-admin/page_config/save
 * method post
 */
export interface SavePageConfigUsingPOSTRequest {
  
  /** 编码 */
  code?: string
  /** 配置类型,pageSize:页面size；columns:自定义列 */
  configKey?: string
  /** 配置值 */
  configValue?: string
  /** 模块 */
  module?: string
  /** 用户编码 */
  userCode?: string
}

/**
 * requestUrl /site-admin/page_config/save
 * method post
 */
export interface SavePageConfigUsingPOSTResponse {
  
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
 * requestUrl /site-admin/verify/send
 * method post
 */
export interface SendVerifyCodeUsingPOSTRequest {
  
  /** 手机号或者email */
  account?: string
  /** 随机key，同一生命周期key不变 */
  key?: string
  /** 短信类型 0通用  1组织创建 */
  type?: number
}

/**
 * requestUrl /site-admin/verify/send
 * method post
 */
export interface SendVerifyCodeUsingPOSTResponse {
  
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
 * requestUrl /site-admin/verify/validate
 * method post
 */
export interface ValidateVerifyCodeUsingPOSTRequest {
  
  /** 手机号或者email */
  account?: string
  /** 随机key，同一生命周期key不变 */
  key?: string
  /** 验证码 */
  verifyCode?: string
}

/**
 * requestUrl /site-admin/verify/validate
 * method post
 */
export interface ValidateVerifyCodeUsingPOSTResponse {
  
  /** 响应数据 */
  data?: Record<string | number | symbol, any>
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}