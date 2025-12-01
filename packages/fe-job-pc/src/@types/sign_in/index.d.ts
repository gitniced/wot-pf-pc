
/**
 * 如果遇到bug，您可以钉钉搜索封东其或者给 fengdongqi@hzwotu.com 邮箱发邮件
 * 欢迎大家提 issue 或者 PR。
 * @title 沃土签到服务
 * @description 沃土签到服务是一个 Spring Boot项目
 * @version v1.0
 **/


interface BasePaginationRspRulePageDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: RulePageDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface RulePageDto {
  
  /** 是否开启人脸验证  0不开启  1开启 */
  checkFace: number
  /** 编码 */
  code?: string
  /** 创建时间 */
  createAt?: number
  /** 创建人code */
  createBy?: string
  /** 范围限制 0代表无范围限制 */
  distance?: number
  /** 规则名称 */
  ruleName?: string
  /** 站点id */
  sid: number
  /** 签到 开始后后时间限制  单位分 */
  signAfter?: number
  /** 签到 结束节点的类型  1开始后 2 结束前 3结束后 */
  signAfterType?: number
  /** 签到 开始前时间限制  单位分  */
  signBefore?: number
  /** 是否需要签退 0否 1是 */
  signEnd?: number
  /** 签退 结束开始后后时间限制  单位分 */
  signOutAfter?: number
  /** 签退 结束前时间限制  单位分  */
  signOutBefore?: number
  /** 是否需要签到 0否 1是 */
  signStart?: number
  /** 站点名称 */
  siteName?: string
  /** 打卡模式 1分散打卡 2 集中打卡 */
  type?: number
  /** 更新人code */
  updateBy?: string
}

/**
 * requestUrl /sign_in/backend/sign/rule/page
 * method post
 */
export interface PageRuleUsingPOSTRequest {
  
  /** 创建时间结束时间 */
  createAtEnd?: number
  /** 创建时间开始时间 */
  createAtStart?: number
  /** 0 关闭限制距离  1 开启 */
  distance?: number
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 规则名称 */
  ruleName?: string
  /** 站点id */
  sid: number
  /** 是否需要签退 0否 1是 */
  signEnd?: number
  /** 是否需要签到 0否 1是 */
  signStart?: number
  /** 打卡模式 1分散打卡 2 集中打卡 */
  type?: number
}

/**
 * requestUrl /sign_in/backend/sign/rule/page
 * method post
 */
export interface PageRuleUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspRulePageDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 签到记录dto {
  
  /** 签到是否在有效范围  0否 1是 */
  arrive: number
  /** 打卡方式1 手动 2 自动 */
  checkType?: number
  /** 唯一编码 */
  code?: string
  /** 人脸照片 签到时候人脸照片 */
  faceImage?: string
  /** 规则code */
  ruleCode?: string
  /** 签到类型 1 集中签到 2 分散签到 */
  ruleType?: number
  /** 站点id */
  sid: number
  /** 签到照片 */
  signImage?: string
  /** 签到地点 */
  signLocation?: string
  /** 签到备注 */
  signRemark?: string
  /** 签到时间 */
  signTime: number
  /** 任务编码 */
  taskCode: string
  /** 类型 1签到  2签退 */
  type: number
  /** 用户编码 */
  userCode: string
}

/**
 * requestUrl /sign_in/backend/sign/sign_detail/{code}
 * method get
 */
export interface SignDetailUsingGETResponse {
  
  /** 响应数据 */
  data?: 签到记录dto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspSignPageDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: SignPageDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface SignPageDto {
  
  /** 是否到达签到范围  0否 1是 */
  arrive?: number
  /** 是否开启人脸识别  0否 1是 */
  checkFace?: number
  /** 打卡方式1 手动 2 自动 */
  checkType?: number
  /** 唯一编码 */
  code?: string
  /** 打卡范围 0未开启  有值则具体XX米 */
  distance?: number
  /** 人脸照片 签到时候人脸照片 */
  faceImage?: string
  /** 任务地点 */
  location?: string
  /** 规则code */
  ruleCode?: string
  /** 打卡规则结束时间 */
  ruleEndTime?: number
  /** 规则名称 */
  ruleName?: string
  /** 打卡规则开始时间 */
  ruleStartTime?: number
  /** 签到类型 1 集中签到 2 分散签到 */
  ruleType?: number
  /** 站点id */
  sid?: number
  /** 签到图片 */
  signImage?: string
  /** 用户签到地址 */
  signLocation?: string
  /** 签到备注 */
  signRemark?: string
  /** 签到时间 */
  signTime?: number
  /** 站点名称 */
  siteName?: string
  /** 任务编码 */
  taskCode?: string
  /** 任务结束时间 */
  taskEndTime?: number
  /** 任务名称 */
  taskName?: string
  /** 任务开始时间 */
  taskStartTime?: number
  /** 类型 1签到  2签退 */
  type?: number
  /** 用户编码 */
  userCode?: string
  /** 用户姓名 */
  userName?: string
}

/**
 * requestUrl /sign_in/backend/sign/sign_page
 * method post
 */
export interface SignHistoryPageUsingPOSTRequest {
  
  /** 打卡方式1 手动 2 自动 */
  checkType?: number
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 规则code */
  ruleCode?: string
  /** 签到类型 1 集中签到 2 分散签到 */
  ruleType?: number
  /** 站点id */
  sid?: number
  /** 任务编码 */
  taskCode?: string
}

/**
 * requestUrl /sign_in/backend/sign/sign_page
 * method post
 */
export interface SignHistoryPageUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspSignPageDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspTaskPageResponseDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: TaskPageResponseDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface TaskPageResponseDto {
  
  /** 任务编码 */
  code?: string
  /** 标题 */
  title?: string
}

/**
 * requestUrl /sign_in/backend/sign/task_page
 * method post
 */
export interface TaskPageUsingPOSTRequest {
  
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 标题 */
  title?: string
}

/**
 * requestUrl /sign_in/backend/sign/task_page
 * method post
 */
export interface TaskPageUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspTaskPageResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /sign_in/front/check/central
 * method post
 */
export interface CheckUsingPOSTRequest {
  
  /** 签到模式 1 签到 2 签退 */
  checkMode?: number
  /** 签到验证类型 0 默认 1 手动 2 自动 */
  checkType?: number
  /** 图片url */
  imgUrl?: string
  /** 任务code */
  taskCode?: string
  /** 用户签到code */
  taskUserSignCode?: string
}

/**
 * requestUrl /sign_in/front/check/central
 * method post
 */
export interface CheckUsingPOSTResponse {
  
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
 * requestUrl /sign_in/front/check/face/recognize
 * method post
 */
export interface RecognizeUsingPOSTRequest {
  
  /** 人面照片Url */
  faceImgUrl?: string
  /** 任务code */
  taskCode?: string
  /** 被识别的人的用户code */
  userCode?: string
}

/**
 * requestUrl /sign_in/front/check/face/recognize
 * method post
 */
export interface RecognizeUsingPOSTResponse {
  
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
 * requestUrl /sign_in/rule/create
 * method post
 */
export interface CreateUsingPOSTRequest {
  
  /** 是否开启人脸验证  0不开启  1开启 */
  checkFace: number
  /** 编码 */
  code?: string
  /** 创建人code */
  createBy?: string
  /** 范围限制 0代表无范围限制 */
  distance: number
  /** 规则名称 */
  ruleName?: string
  /** 站点id */
  sid: number
  /** 签到 开始后后时间限制  单位分 */
  signAfter: number
  /** 签到 结束节点的类型  1开始后 2 结束前 3结束后 */
  signAfterType: number
  /** 签到 开始前时间限制  单位分  */
  signBefore: number
  /** 是否需要签退 0否 1是 */
  signEnd: number
  /** 签退 结束开始后后时间限制  单位分 */
  signOutAfter?: number
  /** 签退 结束前时间限制  单位分  */
  signOutBefore?: number
  /** 是否需要签到 0否 1是 */
  signStart: number
  /** 来源 0 未知  1 平台  2  职培 3 考评 4 创培 */
  source?: number
  /** 打卡模式 1分散打卡 2 集中打卡 */
  type: number
  /** 更新人code */
  updateBy?: string
}

/**
 * requestUrl /sign_in/rule/create
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
 * requestUrl /sign_in/rule/edit
 * method post
 */
export interface EditUsingPOSTRequest {
  
  /** 是否开启人脸验证  0不开启  1开启 */
  checkFace: number
  /** 编码 */
  code?: string
  /** 创建人code */
  createBy?: string
  /** 范围限制 0代表无范围限制 */
  distance: number
  /** 规则名称 */
  ruleName?: string
  /** 站点id */
  sid: number
  /** 签到 开始后后时间限制  单位分 */
  signAfter: number
  /** 签到 结束节点的类型  1开始后 2 结束前 3结束后 */
  signAfterType: number
  /** 签到 开始前时间限制  单位分  */
  signBefore: number
  /** 是否需要签退 0否 1是 */
  signEnd: number
  /** 签退 结束开始后后时间限制  单位分 */
  signOutAfter?: number
  /** 签退 结束前时间限制  单位分  */
  signOutBefore?: number
  /** 是否需要签到 0否 1是 */
  signStart: number
  /** 来源 0 未知  1 平台  2  职培 3 考评 4 创培 */
  source?: number
  /** 打卡模式 1分散打卡 2 集中打卡 */
  type: number
  /** 更新人code */
  updateBy?: string
}

/**
 * requestUrl /sign_in/rule/edit
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

interface 站点签到规则数据 {
  
  /** 是否开启人脸验证  0不开启  1开启 */
  checkFace: number
  /** 编码 */
  code?: string
  /** 创建人code */
  createBy?: string
  /** 范围限制 0代表无范围限制 */
  distance: number
  /** 规则名称 */
  ruleName?: string
  /** 站点id */
  sid: number
  /** 签到 开始后后时间限制  单位分 */
  signAfter: number
  /** 签到 结束节点的类型  1开始后 2 结束前 3结束后 */
  signAfterType: number
  /** 签到 开始前时间限制  单位分  */
  signBefore: number
  /** 是否需要签退 0否 1是 */
  signEnd: number
  /** 签退 结束开始后后时间限制  单位分 */
  signOutAfter?: number
  /** 签退 结束前时间限制  单位分  */
  signOutBefore?: number
  /** 是否需要签到 0否 1是 */
  signStart: number
  /** 来源 0 未知  1 平台  2  职培 3 考评 4 创培 */
  source?: number
  /** 打卡模式 1分散打卡 2 集中打卡 */
  type: number
  /** 更新人code */
  updateBy?: string
}

/**
 * requestUrl /sign_in/rule/{sid}
 * method get
 */
export interface ListBySidUsingGETResponse {
  
  /** 响应数据 */
  data?: 站点签到规则数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /sign_in/task/create
 * method post
 */
export interface CreateUsingPOST_1Request {
  
  /** 任务编码 */
  code?: string
  /** 结束时间 */
  endTime: number
  /** 纬度 */
  lat?: string
  /** 签到位置 */
  location: string
  /** 经度 */
  lon?: string
  /** 规则编码 */
  ruleCode: string
  /** 站点id */
  sid: number
  /** 开始时间 */
  startTime: number
  /** 标题 */
  title: string
}

/**
 * requestUrl /sign_in/task/create
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
 * requestUrl /sign_in/task/edit
 * method post
 */
export interface EditUsingPOST_1Request {
  
  /** 任务编码 */
  code?: string
  /** 结束时间 */
  endTime: number
  /** 纬度 */
  lat?: string
  /** 签到位置 */
  location: string
  /** 经度 */
  lon?: string
  /** 规则编码 */
  ruleCode: string
  /** 站点id */
  sid: number
  /** 开始时间 */
  startTime: number
  /** 标题 */
  title: string
}

/**
 * requestUrl /sign_in/task/edit
 * method post
 */
export interface EditUsingPOST_1Response {
  
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
 * requestUrl /sign_in/task/get_verify_token
 * method post
 */
export interface GetVerifyTokenUsingPOSTResponse {
  
  /** 响应数据 */
  data?: string
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface TaskInfoDto {
  
  /** 任务编码 */
  code?: string
  /** 结束时间 */
  endTime: number
  /** 到达签退时间 1 未到达  2 已到达 3 已超时 */
  inSignOutTime?: number
  /** 达签到时间 1 未到达  2 已到达 3 已超时 */
  inSignTime?: number
  /** 当前时间 */
  nowTime?: number
  /** 签到规则 */
  rule?: 站点签到规则数据
  /** 站点id */
  sid?: number
  /** 签到最后面试 */
  signInAfterTime?: number
  /** 签到最前面时间 */
  signInBeforeTime?: number
  /** 签退最后时间 */
  signOutAfterTime?: number
  /** 签退最前面时间 */
  signOutBeforeTime?: number
  /** 开始时间 */
  startTime: number
  /** 标题 */
  title?: string
}

/**
 * requestUrl /sign_in/task/info/{code}
 * method get
 */
export interface GetTaskInfoUsingGETResponse {
  
  /** 响应数据 */
  data?: TaskInfoDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /sign_in/task/list_sign_history
 * method post
 */
export interface ListUserSignHistoryUsingPOSTRequest {
  
  /** 任务编码 */
  taskCodes: any[]
  /** 用户编码 */
  userCode: string
}

/**
 * requestUrl /sign_in/task/list_sign_history
 * method post
 */
export interface ListUserSignHistoryUsingPOSTResponse {
  
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
 * requestUrl /sign_in/task/sava_sign
 * method post
 */
export interface SignUsingPOSTRequest {
  
  /** 纬度 */
  lat?: string
  /** 经度 */
  lon?: string
  /** 签到照片 */
  signImage?: string
  /** 签到地点 */
  signLocation?: string
  /** 签到备注 */
  signRemark?: string
  /** 任务编码 */
  taskCode: string
  /** 类型 1签到 2签退 */
  type: number
  /** 人脸验证token */
  verifyToken?: string
}

/**
 * requestUrl /sign_in/task/sava_sign
 * method post
 */
export interface SignUsingPOSTResponse {
  
  /** 响应数据 */
  data?: Record<string | number | symbol, any>
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 用户签到情况数据 {
  
  /** 是否在有效范围  0否 1是 */
  arrive?: number
  /** 到达签退时间 1 未到达  2 已到达 3 已超时 */
  inSignOutTime?: number
  /** 达签到时间 1 未到达  2 已到达 3 已超时 */
  inSignTime?: number
  /** 当前时间 */
  nowTime?: number
  /** 签到规则 */
  rule?: 站点签到规则数据
  /** 站点id */
  sid?: number
  /** 签退情况信息 */
  signEndItem: 签到子数据
  /** 签到情况信息 */
  signStartItem: 签到子数据
}

interface 签到子数据 {
  
  /** 签到是否在有效范围  0否 1是 */
  arrive?: number
  /** 签到照片 */
  signImage?: string
  /** 签到地点 */
  signLocation?: string
  /** 签到备注 */
  signRemark?: string
  /** 签到时间 */
  signTime?: number
}

/**
 * requestUrl /sign_in/task/sign_info/{taskCode}
 * method get
 */
export interface UserSignInfoUsingGETResponse {
  
  /** 响应数据 */
  data?: 用户签到情况数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /sign_in/task/v2/sign_info
 * method post
 */
export interface UserSignInfoUsingPOSTRequest {
  
  /** 纬度 */
  lat?: string
  /** 经度 */
  lon?: string
  /** 任务编码 */
  taskCode: string
}

/**
 * requestUrl /sign_in/task/v2/sign_info
 * method post
 */
export interface UserSignInfoUsingPOSTResponse {
  
  /** 响应数据 */
  data?: 用户签到情况数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 签到任务详情数据 {
  
  /** 任务编码 */
  code?: string
  /** 结束时间 */
  endTime: number
  /** 纬度 */
  lat?: string
  /** 签到位置 */
  location: string
  /** 经度 */
  lon?: string
  /** 签到规则 */
  rule?: 站点签到规则数据
  /** 站点id */
  sid: number
  /** 开始时间 */
  startTime: number
  /** 标题 */
  title: string
}

/**
 * requestUrl /sign_in/task/{code}
 * method get
 */
export interface GetByCodeUsingGETResponse {
  
  /** 响应数据 */
  data?: 签到任务详情数据
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /sign_in/task_user_sign/add_batch
 * method post
 */
export interface AddBatchUsingPOSTRequest {
  
}

/**
 * requestUrl /sign_in/task_user_sign/add_batch
 * method post
 */
export interface AddBatchUsingPOSTResponse {
  
  /** 响应数据 */
  data?: any[]
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface TaskUserDeleteDto {
  
  /**  */
  taskCode?: string
  /**  */
  userCode?: any[]
}

/**
 * requestUrl /sign_in/task_user_sign/delete_batch
 * method post
 */
export interface DeleteBatchUsingPOSTRequest {
  
  /**  */
  codes?: any[]
  /**  */
  sid?: number
  /**  */
  taskUser?: TaskUserDeleteDto
}

/**
 * requestUrl /sign_in/task_user_sign/delete_batch
 * method post
 */
export interface DeleteBatchUsingPOSTResponse {
  
  /** 响应数据 */
  data?: any[]
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface TaskUserCountDto {
  
  /** 签到和未签到的总人数 */
  allCount?: number
  /** 已经签到人数 */
  signedCount?: number
  /** 任务code */
  taskCode?: string
  /** 未签到人数 */
  unSignedCount?: number
}

/**
 * requestUrl /sign_in/front/task_sign_user/count
 * method get
 */
export interface CountUsingGETResponse {
  
  /** 响应数据 */
  data?: TaskUserCountDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRsp签到用户对象 {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: 签到用户对象
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface 签到用户对象 {
  
  /** 签到验证类型 1 手动 2 自动 */
  checkType?: string
  /** 记录主键code */
  code?: string
  /** 创建时间 */
  createdAt?: number
  /** 创建人 */
  createdBy?: string
  /** 用户名 */
  name?: string
  /** 规则编码 */
  ruleCode?: string
  /** 站点id */
  sid?: number
  /** 签到使用的图片url */
  signInImg?: string
  /** 签到时间 */
  signInTime?: number
  /** 用户签退图片 */
  signOutImg?: string
  /** 签退状态 默认 0 未签退 1 已签退 */
  signOutStatus?: number
  /** 签退时间 */
  signOutTime?: number
  /** 签到状态 默认 0 未签到 1 已签到 */
  signStatus?: string
  /** 签到类型 冗余签到规则 1 分散签到 2 集中签到 */
  signType?: string
  /** 用户签到图片 之前导入的图片 */
  signUserImg?: string
  /** 任务code */
  taskCode?: string
  /** 用户code */
  userCode?: string
}

/**
 * requestUrl /sign_in/front/task_sign_user/page
 * method post
 */
export interface PageUsingPOSTRequest {
  
  /** 主键code列表 */
  codes?: any[]
  /** 创建结束时间 */
  createdAtEnd?: number
  /** 创建开始时间 */
  createdAtStart?: number
  /** 创建人 */
  createdBy?: string
  /** 用户真实姓名 */
  name?: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 规则编码 */
  ruleCodes?: any[]
  /** 站点 */
  sid?: number
  /** 签退状态 默认 0 未签到 1 已签到 */
  signOutStatus?: any[]
  /** 签到状态 默认 0 未签到 1 已签到 */
  signStatus?: any[]
  /** 签到类型 冗余签到规则 1 分散签到 2 集中签到 */
  signType?: number
  /** 任务code */
  taskCodes?: any[]
  /** 用户code */
  userCodes?: any[]
}

/**
 * requestUrl /sign_in/front/task_sign_user/page
 * method post
 */
export interface PageUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRsp签到用户对象
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}