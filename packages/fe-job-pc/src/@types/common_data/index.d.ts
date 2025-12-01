
/**
 * 如果遇到bug，您可以钉钉搜索封东其或者给 fengdongqi@hzwotu.com 邮箱发邮件
 * 欢迎大家提 issue 或者 PR。
 * @title 沃土公共数据服务
 * @description 沃土公共数据服务是一个 Spring Boot项目
 * @version v1.0
 **/


interface 职位库 {
  
  /** 职位编码 */
  code?: string
  /** 职位id */
  id?: number
  /** 职位名称 */
  name?: string
  /** 上级编码 */
  parentCode?: string
  /** 上级id */
  pid?: number
}

/**
 * requestUrl /common_data/capacity/capacity_list
 * method post
 */
export interface CapacityListUsingPOSTRequest {
  
  /** 职位id */
  idList: any[]
}

/**
 * requestUrl /common_data/capacity/capacity_list
 * method post
 */
export interface CapacityListUsingPOSTResponse {
  
  /** 响应数据 */
  data?: 职位库
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /common_data/capacity/list_by_pid/{pid}
 * method get
 */
export interface ListByPidUsingGETResponse {
  
  /** 响应数据 */
  data?: 职位库
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRsp职位库树形结构 {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: 职位库树形结构
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface 职位库树形结构 {
  
  /** 下级职位 */
  childList?: 职位库树形结构
  /** 职位编码 */
  code?: string
  /** 职位id */
  id?: number
  /** 职位名称 */
  name?: string
  /** 上级编码 */
  parentCode?: string
  /** 上级id */
  pid?: number
}

/**
 * requestUrl /common_data/capacity/list_by_top
 * method post
 */
export interface ListByTopUsingPOSTRequest {
  
  /** 需要展示的子职位个数 */
  limit?: number
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
 * requestUrl /common_data/capacity/list_by_top
 * method post
 */
export interface ListByTopUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRsp职位库树形结构
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /common_data/capacity/list_three_level_id/{id}
 * method get
 */
export interface ListThreeLevelByTopIdUsingGETResponse {
  
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
 * requestUrl /common_data/capacity/list_tree/{id}
 * method get
 */
export interface ListSecondCapacityTreeUsingGETResponse {
  
  /** 响应数据 */
  data?: 职位库树形结构
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 公共分类 {
  
  /** 键 */
  key?: string
  /** 值 */
  name?: string
}

/**
 * requestUrl /common_data/category/category
 * method get
 */
export interface CategoryUsingGETResponse {
  
  /** 响应数据 */
  data?: 公共分类
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /common_data/category/category_feign/{alias}
 * method get
 */
export interface CategoryUsingGET_1Response {
  
  /** 响应数据 */
  data?: 公共分类
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 城市数据 {
  
  /** 城市名称缩写 */
  abbreviation?: string
  /** 行政编码 */
  code?: string
  /** 地区等级  1省级 2市级 3区级 4乡镇级 */
  level?: number
  /** 名称 */
  name?: string
  /** 上级编码 */
  parentCode?: string
}

/**
 * requestUrl /common_data/city/city
 * method get
 */
export interface CityDataUsingGETResponse {
  
  /** 响应数据 */
  data?: 城市数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /common_data/city/city_list
 * method post
 */
export interface CityListUsingPOSTRequest {
  
  /** 城市编码 */
  codeList: any[]
}

/**
 * requestUrl /common_data/city/city_list
 * method post
 */
export interface CityListUsingPOSTResponse {
  
  /** 响应数据 */
  data?: 城市数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /common_data/city/city_php/{parentCode}
 * method get
 */
export interface CityDataPHPUsingGETResponse {
  
  /** 响应数据 */
  data?: 城市数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /common_data/city/detail/{code}
 * method get
 */
export interface DetailUsingGETResponse {
  
  /** 响应数据 */
  data?: 城市数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /common_data/city/list/query
 * method post
 */
export interface ListQueryUsingPOSTRequest {
  
  /**  */
  code?: string
  /** 等级  1省级 2市级 3区级 4乡镇级 */
  level?: string
  /** 城市名称 右模糊 */
  name?: string
  /** 父code */
  parentCode?: string
}

/**
 * requestUrl /common_data/city/list/query
 * method post
 */
export interface ListQueryUsingPOSTResponse {
  
  /** 响应数据 */
  data?: 城市数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface DictRespDto {
  
  /**  */
  childList?: DictRespDto
  /** 字典编码 */
  dictCode?: string
  /** 字典描述 */
  dictDesc?: string
  /** 字典名称 */
  dictName?: string
  /**  */
  id?: number
  /** 父级code */
  parentCode?: string
  /** 排序 */
  sort?: number
}

/**
 * requestUrl /common_data/dict/list
 * method get
 */
export interface ListUsingGETRequest {
  
  /** 排序 */
  asc?: boolean
  /** 字典编码 */
  dictCode?: string
  /** 字典名称 */
  dictName?: string
  /** 父级code */
  parentCode?: any[]
}

/**
 * requestUrl /common_data/dict/list
 * method get
 */
export interface ListUsingGETResponse {
  
  /** 响应数据 */
  data?: DictRespDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /common_data/dict/list_by_parent_code/{parentCode}
 * method get
 */
export interface ListByParentCodeUsingGETResponse {
  
  /** 响应数据 */
  data?: DictRespDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /common_data/import_type/import_type
 * method get
 */
export interface GetImportTypeUsingGETResponse {
  
  /** 响应数据 */
  data?: 公共分类
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /common_data/industry/all
 * method get
 */
export interface GetAllIndustriesUsingGETResponse {
  
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
 * requestUrl /common_data/industry/industry_chain/{id}
 * method get
 */
export interface IndustryDataPHPUsingGETResponse {
  
  /** 响应数据 */
  data?: string
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
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
 * requestUrl /common_data/industry/industry_php/{parentCode}
 * method get
 */
export interface IndustryDataPHPUsingGET_1Response {
  
  /** 响应数据 */
  data?: 行业数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /common_data/industry/list
 * method get
 */
export interface IndustryDataUsingGETResponse {
  
  /** 响应数据 */
  data?: 行业数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /common_data/industry/list_by_pid/{pid}
 * method get
 */
export interface IndustryDataUsingGET_1Response {
  
  /** 响应数据 */
  data?: 行业数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 业务线数据 {
  
  /** 默认用户组id */
  defaultUserGroup?: number
  /** 描述 */
  description?: string
  /** 业务线id */
  id?: number
  /** 登陆校验域名 */
  loginHost?: string
  /** 登陆校验地址 */
  loginPath?: string
  /** 名称 */
  name?: string
}

/**
 * requestUrl /common_data/platform/list
 * method get
 */
export interface ListUsingGET_1Response {
  
  /** 响应数据 */
  data?: 业务线数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /common_data/platform/one/{id}
 * method get
 */
export interface GetPlatformByPrimaryKeyUsingGETResponse {
  
  /** 响应数据 */
  data?: 业务线数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 专业库Res {
  
  /** 专业编码 */
  code?: string
  /** 专业id */
  id?: number
  /** 专业名称 */
  name?: string
  /** 上级id */
  pid?: number
}

/**
 * requestUrl /common_data/speciality/list_by_parent_code/{parentCode}
 * method get
 */
export interface ListByParentCodeUsingGET_1Response {
  
  /** 响应数据 */
  data?: 专业库Res
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /common_data/speciality/search_speciality
 * method post
 */
export interface SearchSpecialtyUsingPOSTRequest {
  
  /** 查找值 */
  keyword: string
}

/**
 * requestUrl /common_data/speciality/search_speciality
 * method post
 */
export interface SearchSpecialtyUsingPOSTResponse {
  
  /** 响应数据 */
  data?: 专业库Res
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /common_data/speciality/speciality_list
 * method post
 */
export interface GetSpecialityListUsingPOSTRequest {
  
  /** 专业编码 */
  codeList: any[]
}

/**
 * requestUrl /common_data/speciality/speciality_list
 * method post
 */
export interface GetSpecialityListUsingPOSTResponse {
  
  /** 响应数据 */
  data?: 专业库Res
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 标签数据 {
  
  /** id */
  id?: number
  /** 标题 */
  name?: string
  /** 排序值 */
  sort?: number
  /** 类型 */
  type?: number
}

/**
 * requestUrl /common_data/tag/list
 * method get
 */
export interface ListUsingGET_2Response {
  
  /** 响应数据 */
  data?: 标签数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /common_data/tag/list_by_ids
 * method post
 */
export interface ListByIdsUsingPOSTRequest {
  
  /** 标签id */
  idList: any[]
}

/**
 * requestUrl /common_data/tag/list_by_ids
 * method post
 */
export interface ListByIdsUsingPOSTResponse {
  
  /** 响应数据 */
  data?: 标签数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /common_data/tag/list_by_type/{type}
 * method get
 */
export interface ListBytypeUsingGETResponse {
  
  /** 响应数据 */
  data?: 标签数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /common_data/tag/type_ids_list
 * method post
 */
export interface SelectTypeTagByPrimaryKeysUsingPOSTRequest {
  
  /** 标签id */
  idList: any[]
  /** 类型 */
  type: number
}

/**
 * requestUrl /common_data/tag/type_ids_list
 * method post
 */
export interface SelectTypeTagByPrimaryKeysUsingPOSTResponse {
  
  /** 响应数据 */
  data?: 标签数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}