
/**
 * 如果遇到bug，您可以钉钉搜索封东其或者给 fengdongqi@hzwotu.com 邮箱发邮件
 * 欢迎大家提 issue 或者 PR。
 * @title 沃土学习服务
 * @description 沃土学习服务是一个 Spring Boot项目
 * @version v1.0
 **/


/**
 * requestUrl /study/queue_message/save
 * method post
 */
export interface SaveUsingPOSTRequest {
  
  /** 确认报错信息 */
  ackErrorContent?: string
  /** 消费报错信息 */
  consumeErrorContent?: string
  /** 参数内容 */
  content?: string
  /** 创建时间 */
  createTime?: number
  /** 消息描述 */
  description?: string
  /** ID */
  id: number
  /** 是否消息确认：0-未确认 1-已确认 */
  isAck?: number
  /** 是否报错：0-未报错 1-已报错 */
  isError?: number
  /** 是否消息发送：0-发送失败 1-发送成功 */
  isSend?: number
  /** 消息队列ID */
  messageId?: string
  /** 生产报错信息 */
  produceErrorContent?: string
  /** 站点 */
  site: string
  /** 执行结果 */
  successResult?: string
  /** 消息标签 */
  tag?: string
  /** 更新时间 */
  updateTime?: number
}

/**
 * requestUrl /study/queue_message/save
 * method post
 */
export interface SaveUsingPOSTResponse {
  
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
 * requestUrl /study/study_log/save
 * method post
 */
export interface SaveUsingPOST_1Request {
  
  /** 班级id */
  classId?: number
  /** 课程id */
  courseId?: number
  /** 创建时间 */
  createTime?: number
  /** 是否结束 0-否，1-是 */
  end?: number
  /** 预留字段1 */
  ext1?: string
  /** 预留字段2 */
  ext2?: string
  /** ip */
  ip?: string
  /** 站点 */
  site: string
  /** 是否开始 0-否，1-是 */
  start?: number
  /** 学习时间 */
  startTime?: number
  /** 消息标签 */
  tag?: string
  /** 学习间隔 */
  time?: number
  /** 用户id */
  uid: number
  /** 视频id */
  videoId?: number
}

/**
 * requestUrl /study/study_log/save
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