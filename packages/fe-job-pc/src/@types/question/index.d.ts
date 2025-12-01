
/**
 * 如果遇到bug，您可以钉钉搜索封东其或者给 fengdongqi@hzwotu.com 邮箱发邮件
 * 欢迎大家提 issue 或者 PR。
 * @title 沃土题库服务
 * @description 沃土题库服务是一个 Spring Boot项目
 * @version v1.0
 **/


interface BasePaginationRspAuthenticateDetailDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: AuthenticateDetailDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface AuthenticateDetailDto {
  
  /** code */
  code?: string
  /** 鉴定范围 */
  firstRangeList?: AuthenticateRangeDto
  /** 代码名称 */
  name?: string
}

interface AuthenticateRangeDto {
  
  /** code */
  code?: string
  /** 鉴定点代码 */
  codeMark?: string
  /** 等级 */
  level?: number
  /** name */
  name?: string
  /** 下层鉴定范围 */
  nextRangeList?: AuthenticateRangeDto
  /**  */
  pcode?: string
  /** 鉴定点 */
  pointDto?: AuthenticatePointDto
  /** 比重 */
  rate?: number
}

interface AuthenticatePointDto {
  
  /** code */
  code?: string
  /** 鉴定点代码 */
  codeMark?: string
  /** 重要程度 */
  important?: string
  /** name */
  name?: string
}

/**
 * requestUrl /question/front/authenticate/page
 * method post
 */
export interface PageAuthenticateUsingPOSTRequest {
  
  /** 等级code */
  levelCode?: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 组织code */
  orgCode?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
}

/**
 * requestUrl /question/front/authenticate/page
 * method post
 */
export interface PageAuthenticateUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspAuthenticateDetailDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspCommonJobDetailDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: CommonJobDetailDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface CommonJobDetailDto {
  
  /** id */
  id?: number
  /** 职业name */
  name?: string
  /** 工种 */
  workList?: CommonJobWorkDto
}

interface CommonJobWorkDto {
  
  /**  */
  id?: number
  /** 职业id */
  jobId?: number
  /** 等级dto */
  levelList?: CommonJobLevelDto
  /** 工种name */
  name?: string
}

interface CommonJobLevelDto {
  
  /** id */
  id?: number
  /** 工种等级 */
  name?: string
}

/**
 * requestUrl /question/front/job/page
 * method post
 */
export interface PageJobUsingPOSTRequest {
  
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 职业code */
  workCode?: number
  /** 职业名称Like */
  workName?: string
}

/**
 * requestUrl /question/front/job/page
 * method post
 */
export interface PageJobUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspCommonJobDetailDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /question/front/practice/batch/delete
 * method post
 */
export interface BatchDeleteUsingPOSTRequest {
  
  /** 刷题code的List */
  codeList?: any[]
  /** 操作人code */
  operatorCode?: string
}

/**
 * requestUrl /question/front/practice/batch/delete
 * method post
 */
export interface BatchDeleteUsingPOSTResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface PracticeJobCustomDto {
  
  /** 等级 */
  jobLevel?: string
  /** 等级code */
  jobLevelCode?: string
  /** 职业 */
  jobName?: string
  /** 职业code */
  jobNameCode?: string
  /** 工种 */
  jobType?: string
  /** 工种code */
  jobTypeCode?: string
}

interface PracticePersonDto {
  
  /** 操作人code */
  operatorCode?: string
  /** 刷题人员证件号 */
  personCertNumber?: string
  /** 人员code */
  personCode?: string
  /** 人员姓名 */
  personName?: string
  /** 刷题人员手机号 */
  personPhone?: string
  /** 人员类型 */
  personType?: string
  /** 刷题code */
  practiceCode?: string
}

interface PracticeSelectQuestionDto {
  
  /** 选定的职业列表 */
  commonJobCustomDtoList?: CommonJobCustomDto
  /** 判断题数 */
  judgeCount?: number
  /** 多选题数 */
  multipleCount?: number
  /** 单选题数 */
  singleCount?: number
  /** 总题数 */
  totalCount?: number
}

interface CommonJobCustomDto {
  
  /** 等级名称 */
  jobLevel?: string
  /** 等级code */
  jobLevelCode?: number
  /** 职业名称 */
  jobName?: string
  /** 职业code */
  jobNameCode?: number
  /** 工种名称 */
  jobType?: string
  /** 工种code */
  jobTypeCode?: number
}

/**
 * requestUrl /question/front/practice/createOrUpdate
 * method post
 */
export interface CreateOrUpdateUsingPOSTRequest {
  
  /** 编码,编辑时为必填 */
  code?: string
  /** 刷题结束时间 */
  endTime?: number
  /** 选择题目code列表 */
  jobs?: PracticeJobCustomDto
  /** 参与状态 0-不限 1-指定用户 */
  joinStatus?: number
  /** 操作人code */
  operatorCode?: string
  /** 组织code */
  organizationCode?: string
  /** 刷题参与用户详情 */
  personDtoList?: PracticePersonDto
  /** 发布状态 0-草稿 1-发布 */
  publishStatus?: number
  /** 试题数量 */
  questionCount?: number
  /** 已选择题目详情 */
  selectQuestionDto?: PracticeSelectQuestionDto
  /** 分享链接 */
  shareUrl?: string
  /** 所属站点id */
  sid?: number
  /** 刷题开始时间 */
  startTime?: number
  /** 刷题状态 0-未开始  1-已结束  2-练习中 */
  status?: number
  /** 刷题标题 */
  title?: string
}

/**
 * requestUrl /question/front/practice/createOrUpdate
 * method post
 */
export interface CreateOrUpdateUsingPOSTResponse {
  
  /** 响应数据 */
  data?: string
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface PracticeDetailDto {
  
  /** 编码,编辑时为必填 */
  code?: string
  /** 刷题结束时间 */
  endTime?: number
  /** 选择题目code列表 */
  jobs?: PracticeJobCustomDto
  /** 参与状态 0-不限 1-指定用户 */
  joinStatus?: number
  /** 操作人code */
  operatorCode?: string
  /** 组织code */
  organizationCode?: string
  /** 刷题参与用户详情 */
  personDtoList?: PracticePersonDto
  /** 发布状态 0-草稿 1-发布 */
  publishStatus?: number
  /** 试题数量 */
  questionCount?: number
  /** 已选择题目详情 */
  selectQuestionDto?: PracticeSelectQuestionDto
  /** 分享链接 */
  shareUrl?: string
  /** 所属站点id */
  sid?: number
  /** 刷题开始时间 */
  startTime?: number
  /** 刷题状态 0-未开始  1-已结束  2-练习中 */
  status?: number
  /** 刷题标题 */
  title?: string
}

/**
 * requestUrl /question/front/practice/detail/{code}
 * method get
 */
export interface DetailUsingGETResponse {
  
  /** 响应数据 */
  data?: PracticeDetailDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface PracticeJobTypeCountResDto {
  
  /** 判断题数 */
  judgeCount?: number
  /** 多选题数 */
  multipleCount?: number
  /** 单选题数 */
  singleCount?: number
  /** 总题数 */
  totalCount?: number
}

/**
 * requestUrl /question/front/practice/job/count
 * method post
 */
export interface JobTypeCountUsingPOSTRequest {
  
  /** 自定义内容 */
  jobs?: PracticeJobCustomDto
  /** 资源方组织code */
  organizationCode?: string
  /** 题材 10-真题 20-模拟题 */
  subject?: number
}

/**
 * requestUrl /question/front/practice/job/count
 * method post
 */
export interface JobTypeCountUsingPOSTResponse {
  
  /** 响应数据 */
  data?: PracticeJobTypeCountResDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspPracticeDetailDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: PracticeDetailDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

/**
 * requestUrl /question/front/practice/page
 * method post
 */
export interface PageUsingPOSTRequest {
  
  /** 操作人code */
  operatorCode?: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 资源方code */
  organizationCode?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 刷题状态 0-未开始 1-已开始 2-已结束 */
  practiceStatus?: number
  /** 发布状态 0-草稿 1-发布 */
  publishStatus?: number
  /** 刷题标题模糊查询 */
  titleLike?: string
}

/**
 * requestUrl /question/front/practice/page
 * method post
 */
export interface PageUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspPracticeDetailDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface PracticePersonDetailResDto {
  
  /** 正确率 */
  accuracyScore?: number
  /** 已练习 */
  completeQuestion?: number
  /** 剩余时间 */
  endTime?: number
  /** 是否含有刷题权限 */
  isPractice?: boolean
  /** 职业工种等级列表 */
  jobList?: any[]
  /** 待练习 */
  needQuestion?: number
  /** 机构名称 */
  organization?: string
  /** 刷题code */
  practiceCode?: string
  /** 状态 0-未开始 2-练习中 1-已结束 */
  status?: number
  /** 刷题标题 */
  title?: string
  /** 错题数 */
  wrongQuestion?: number
}

/**
 * requestUrl /question/front/practice/person_detail/{practiceCode}
 * method post
 */
export interface PersonDetailUsingPOSTRequest {
  
}

/**
 * requestUrl /question/front/practice/person_detail/{practiceCode}
 * method post
 */
export interface PersonDetailUsingPOSTResponse {
  
  /** 响应数据 */
  data?: PracticePersonDetailResDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspPracticePersonPageCellResDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: PracticePersonPageCellResDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface PracticePersonPageCellResDto {
  
  /** 已完成的题数 */
  completeQuestion?: number
  /** 剩余时间 */
  endTime?: number
  /** 职业工种等级列表 */
  jobList?: any[]
  /** 刷题code */
  practiceCode?: string
  /** 状态 0-未开始 2-练习中 1-已结束 */
  status?: number
  /** 刷题标题 */
  title?: string
  /** 总题数 */
  totalQuestion?: number
}

/**
 * requestUrl /question/front/practice/person_page
 * method post
 */
export interface PersonPageUsingPOSTRequest {
  
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
 * requestUrl /question/front/practice/person_page
 * method post
 */
export interface PersonPageUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspPracticePersonPageCellResDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface PracticePersonQuestionDetailResDto {
  
  /** 解析(不为组合题时必填) */
  analysis?: string
  /** 答案 */
  answer?: Record<string | number | symbol, any>
  /** 鉴定点 */
  authPoint?: string
  /** 鉴定点code */
  authPointCode?: string
  /** 题型 10-国家题 20-省题 30-资源题 40-机构题 */
  belongType?: number
  /** 组合题的小题list(类型为组合题时必填) */
  childList?: QuestionDetailDto
  /** 编码,编辑时为必填 */
  code?: string
  /** 自定义字段内容:职业/工种/等级commonJob 鉴定点authenticatePoint; 区分度discrimination 0全部 10差 20较差 30中等 40良好 50优秀;推荐状态recommendStatus:10未推荐,20已推荐 */
  customContent?: Record<string | number | symbol, any>
  /** 区分度 */
  distinction?: string
  /** 难度(不为组合题的小题时必填) 10易、20较易、30中等、40较难、50难 */
  level?: number
  /** 资源方编码(不为小题时必填) */
  merchantCode?: string
  /** 操作人code */
  operatorCode?: string
  /** 选项列表 */
  optionList?: QuestionOptionDto
  /** 资源方编码 */
  organizationCode?: string
  /** 小题对应的组合题大题的code(不是组合题中的小题不用填) */
  parentCode?: string
  /** 引用次数,不填默认为0 */
  referenceCount?: number
  /** 引用状态,不填默认为未引用,未引用10,已引用20 */
  referenceStatus?: number
  /** 技能 10-技能  20-理论 */
  skill?: number
  /**  */
  sourceCode?: string
  /** 状态 0未作答 1正确 2错误 */
  status?: number
  /** 入库时间 */
  storageTime?: number
  /** 题材 10-真题 20-模拟题 */
  subject?: number
  /** 题目/提干 */
  title?: string
  /** 题目类型 10判断题、20单选题、30多选题、40填空题、50简答题、60组合题 70计算题、 80论述题、90案例分析题 */
  type?: number
}

interface QuestionDetailDto {
  
  /** 解析(不为组合题时必填) */
  analysis?: string
  /** 鉴定点 */
  authPoint?: string
  /** 鉴定点code */
  authPointCode?: string
  /** 题型 10-国家题 20-省题 30-资源题 40-机构题 */
  belongType?: number
  /** 组合题的小题list(类型为组合题时必填) */
  childList?: QuestionDetailDto
  /** 编码,编辑时为必填 */
  code?: string
  /** 自定义字段内容:职业/工种/等级commonJob 鉴定点authenticatePoint; 区分度discrimination 0全部 10差 20较差 30中等 40良好 50优秀;推荐状态recommendStatus:10未推荐,20已推荐 */
  customContent?: Record<string | number | symbol, any>
  /** 区分度 */
  distinction?: string
  /** 难度(不为组合题的小题时必填) 10易、20较易、30中等、40较难、50难 */
  level?: number
  /** 资源方编码(不为小题时必填) */
  merchantCode?: string
  /** 操作人code */
  operatorCode?: string
  /** 选项列表 */
  optionList?: QuestionOptionDto
  /** 资源方编码 */
  organizationCode?: string
  /** 小题对应的组合题大题的code(不是组合题中的小题不用填) */
  parentCode?: string
  /** 引用次数,不填默认为0 */
  referenceCount?: number
  /** 引用状态,不填默认为未引用,未引用10,已引用20 */
  referenceStatus?: number
  /** 技能 10-技能  20-理论 */
  skill?: number
  /**  */
  sourceCode?: string
  /** 入库时间 */
  storageTime?: number
  /** 题材 10-真题 20-模拟题 */
  subject?: number
  /** 题目/提干 */
  title?: string
  /** 题目类型 10判断题、20单选题、30多选题、40填空题、50简答题、60组合题 70计算题、 80论述题、90案例分析题 */
  type?: number
}

interface QuestionOptionDto {
  
  /** 答案 */
  answer?: string
  /** code */
  code?: string
  /** 是否答案 */
  isAnswer?: boolean
  /** 题目code */
  questionCode?: string
  /** 排序, 可以传ABC或者123 */
  sort?: string
  /** 标题 */
  title?: string
}

/**
 * requestUrl /question/front/practice/person_question_detail
 * method post
 */
export interface PersonQuestionDetailUsingPOSTRequest {
  
  /** 刷题code */
  practiceCode?: string
  /** 题目code */
  questionCode?: string
}

/**
 * requestUrl /question/front/practice/person_question_detail
 * method post
 */
export interface PersonQuestionDetailUsingPOSTResponse {
  
  /** 响应数据 */
  data?: PracticePersonQuestionDetailResDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface PracticePersonQuestionListResDto {
  
  /** 最后一次访问题目code */
  lastQuestionCode?: string
  /** 题目列表 */
  questionList?: PracticePersonQuestionCellResDto
}

interface PracticePersonQuestionCellResDto {
  
  /** 题目code */
  questionCode?: string
  /** 序号 */
  sort?: number
  /** 状态 0未作答 1正确 2错误 */
  state?: number
}

/**
 * requestUrl /question/front/practice/person_question_list/{practiceCode}
 * method get
 */
export interface PersonQuestionListUsingGETResponse {
  
  /** 响应数据 */
  data?: PracticePersonQuestionListResDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /question/front/practice/person_reset
 * method post
 */
export interface PersonResetUsingPOSTRequest {
  
  /** 刷题code */
  practiceCode?: string
}

/**
 * requestUrl /question/front/practice/person_reset
 * method post
 */
export interface PersonResetUsingPOSTResponse {
  
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
 * requestUrl /question/front/practice/person_submit_answer
 * method post
 */
export interface PersonSubmitAnswerUsingPOSTRequest {
  
  /** 答案 */
  answer?: Record<string | number | symbol, any>
  /** 刷题code */
  practiceCode?: string
  /** 题目code */
  questionCode?: string
}

/**
 * requestUrl /question/front/practice/person_submit_answer
 * method post
 */
export interface PersonSubmitAnswerUsingPOSTResponse {
  
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
 * requestUrl /question/front/practice/person_wrong_question_detail
 * method post
 */
export interface PersonWrongQuestionDetailUsingPOSTRequest {
  
  /** 刷题code */
  practiceCode?: string
  /** 题目code */
  questionCode?: string
}

/**
 * requestUrl /question/front/practice/person_wrong_question_detail
 * method post
 */
export interface PersonWrongQuestionDetailUsingPOSTResponse {
  
  /** 响应数据 */
  data?: PracticePersonQuestionDetailResDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /question/front/practice/person_wrong_question_list/{practiceCode}
 * method get
 */
export interface PersonWrongQuestionListUsingGETResponse {
  
  /** 响应数据 */
  data?: PracticePersonQuestionCellResDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /question/front/practice/preCreate
 * method post
 */
export interface PreCreateUsingPOSTRequest {
  
  /** 刷题结束时间 */
  endTime?: number
  /** 操作人code */
  operatorCode?: string
  /** 资源方编码 */
  organizationCode?: string
  /** 所属站点id */
  sid?: number
  /** 刷题开始时间 */
  startTime?: number
  /** 刷题状态 0-未开始  1-已结束  2-练习中 */
  status?: number
  /** 刷题标题 */
  title?: string
}

/**
 * requestUrl /question/front/practice/preCreate
 * method post
 */
export interface PreCreateUsingPOSTResponse {
  
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
 * requestUrl /question/front/practice/question_detail
 * method post
 */
export interface QuestionDetailUsingPOSTRequest {
  
  /** 刷题code */
  practiceCode?: string
  /** 题目code */
  questionCode?: string
}

/**
 * requestUrl /question/front/practice/question_detail
 * method post
 */
export interface QuestionDetailUsingPOSTResponse {
  
  /** 响应数据 */
  data?: string
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface PracticeShareDetailDto {
  
  /** 刷题内容 */
  content?: string
  /** 站点名称 */
  organizationName?: string
  /** 刷题开始时间 */
  startTime?: number
  /** 刷题标题 */
  title?: string
}

/**
 * requestUrl /question/front/practice/share/detail/{code}
 * method get
 */
export interface ShareDetailUsingGETResponse {
  
  /** 响应数据 */
  data?: PracticeShareDetailDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /question/front/practice/update_publish
 * method post
 */
export interface UpdatePublishUsingPOSTRequest {
  
  /** 练习code */
  practiceCode?: string
  /** 发布状态 0-草稿 1-发布 */
  publishStatus?: number
}

/**
 * requestUrl /question/front/practice/update_publish
 * method post
 */
export interface UpdatePublishUsingPOSTResponse {
  
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
 * requestUrl /question/front/practice/user/batch/delete
 * method post
 */
export interface BatchDeleteUserUsingPOSTRequest {
  
  /** 用户code的List */
  codeList?: any[]
  /** 操作人code */
  operatorCode?: string
  /** 刷题code */
  practiceCode?: string
}

/**
 * requestUrl /question/front/practice/user/batch/delete
 * method post
 */
export interface BatchDeleteUserUsingPOSTResponse {
  
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
 * requestUrl /question/front/practice/user/create
 * method post
 */
export interface CreateUserUsingPOSTRequest {
  
  /** 操作人code */
  operatorCode?: string
  /** 刷题人员证件号 */
  personCertNumber?: string
  /** 人员code */
  personCode?: string
  /** 人员姓名 */
  personName?: string
  /** 刷题人员手机号 */
  personPhone?: string
  /** 人员类型 */
  personType?: string
  /** 刷题code */
  practiceCode?: string
}

/**
 * requestUrl /question/front/practice/user/create
 * method post
 */
export interface CreateUserUsingPOSTResponse {
  
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
 * requestUrl /question/front/practice/user/excel/import
 * method post
 */
export interface ImportExcelUsingPOSTRequest {
  
  /** code */
  code?: string
  /** 资源方编码 */
  merchantCode?: string
  /** 文件名称 */
  name?: string
  /** 操作人code */
  operatorCode?: string
  /** 资源方编码 */
  organizationCode?: string
  /** 刷题code */
  practiceCode?: string
  /** sid */
  sid?: number
  /** 文件url */
  url?: string
}

/**
 * requestUrl /question/front/practice/user/excel/import
 * method post
 */
export interface ImportExcelUsingPOSTResponse {
  
  /** 响应数据 */
  data?: string
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspPracticePersonDetailDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: PracticePersonDetailDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface PracticePersonDetailDto {
  
  /**  */
  code?: string
  /** 刷题人员证件号 */
  personCertNumber?: string
  /** 用户code */
  personCode?: string
  /** 人员姓名 */
  personName?: string
  /** 刷题人员手机号 */
  personPhone?: string
}

/**
 * requestUrl /question/front/practice/user/page
 * method post
 */
export interface UserPageUsingPOSTRequest {
  
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 刷题人员证件号 */
  personCertNumber?: string
  /** 人员姓名 */
  personName?: string
  /** 刷题人员手机号 */
  personPhone?: string
  /** 刷题code */
  practiceCode?: string
}

/**
 * requestUrl /question/front/practice/user/page
 * method post
 */
export interface UserPageUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspPracticePersonDetailDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface AuthenticateCustomDto {
  
  /** 要素细目表code */
  code: string
  /** 第一层鉴定范围code */
  firstRangeCode?: string
  /** 第一层鉴定范围name */
  firstRangeName?: string
  /** 要素细目表name */
  name: string
  /** 鉴定点code */
  pointCode?: string
  /** 鉴定点name */
  pointName?: string
  /** 第二层鉴定范围code */
  secondRangeCode?: string
  /** 第二层鉴定范围name */
  secondRangeName?: string
  /** 第三层鉴定范围code */
  thirdRangeCode?: string
  /** 第三层鉴定范围name */
  thirdRangeName?: string
}

/**
 * requestUrl /question/front/analysis
 * method post
 */
export interface AnalysisQuestionWordUsingPOSTRequest {
  
  /** 解析文本, 每一行之间需要有\n换行符 */
  analysisText?: string
  /** 要素细目表dto */
  authenticatePoint?: AuthenticateCustomDto
  /** 职业dto */
  commonJob: CommonJobCustomDto
  /** 资源方组织code */
  merchantCode: string
}

/**
 * requestUrl /question/front/analysis
 * method post
 */
export interface AnalysisQuestionWordUsingPOSTResponse {
  
  /** 响应数据 */
  data?: string
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface QuestionBatchDeleteDto {
  
  /**  */
  failCount?: number
}

/**
 * requestUrl /question/front/batch/delete
 * method post
 */
export interface BatchDeleteUsingPOST_1Request {
  
  /** 试题code的List */
  codeList?: any[]
}

/**
 * requestUrl /question/front/batch/delete
 * method post
 */
export interface BatchDeleteUsingPOST_1Response {
  
  /** 响应数据 */
  data?: QuestionBatchDeleteDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /question/front/batchCreate
 * method post
 */
export interface BatchCreateUsingPOSTRequest {
  
  /** 批量数据 */
  detailList?: QuestionDetailDto
}

/**
 * requestUrl /question/front/batchCreate
 * method post
 */
export interface BatchCreateUsingPOSTResponse {
  
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
 * requestUrl /question/front/batch_create_return
 * method post
 */
export interface BatchCreateReturnMapUsingPOSTRequest {
  
}

/**
 * requestUrl /question/front/batch_create_return
 * method post
 */
export interface BatchCreateReturnMapUsingPOSTResponse {
  
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
 * requestUrl /question/front/batch_update_reference
 * method post
 */
export interface BatchUpdateReferenceUsingPOSTRequest {
  
  /** 题目/题干code */
  code?: any[]
  /** 引用次数 */
  count?: number
}

/**
 * requestUrl /question/front/batch_update_reference
 * method post
 */
export interface BatchUpdateReferenceUsingPOSTResponse {
  
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
 * requestUrl /question/front/batch_update_status
 * method post
 */
export interface BatchUpdateStatusUsingPOSTRequest {
  
  /** 题目批量更新List */
  codeList?: any[]
  /** 操作人 */
  operatorCode?: string
  /** 推荐状态 10未推荐 20已推荐 */
  recommendStatus?: number
}

/**
 * requestUrl /question/front/batch_update_status
 * method post
 */
export interface BatchUpdateStatusUsingPOSTResponse {
  
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
 * requestUrl /question/front/check_questioncode_point
 * method post
 */
export interface CheckQuestionCodePointUsingPOSTRequest {
  
  /** 要素细目表code */
  authenticateCode?: string
  /** 自定义内容 */
  customContent?: Record<string | number | symbol, any>
  /** 资源方组织code */
  merchantCode?: string
  /** 限制试题引用次数 */
  questionCitedLimit?: number
  /** 题目codes */
  questionCodes?: any[]
  /** 限制题目入库结束时间 */
  receiptEndTime?: number
  /** 限制题目入库开始时间 */
  receiptStartTime?: number
}

/**
 * requestUrl /question/front/check_questioncode_point
 * method post
 */
export interface CheckQuestionCodePointUsingPOSTResponse {
  
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
 * requestUrl /question/front/create
 * method post
 */
export interface CreateUsingPOSTRequest {
  
  /** 解析(不为组合题时必填) */
  analysis?: string
  /** 鉴定点 */
  authPoint?: string
  /** 鉴定点code */
  authPointCode?: string
  /** 题型 10-国家题 20-省题 30-资源题 40-机构题 */
  belongType?: number
  /** 组合题的小题list(类型为组合题时必填) */
  childList?: QuestionDetailDto
  /** 编码,编辑时为必填 */
  code?: string
  /** 自定义字段内容:职业/工种/等级commonJob 鉴定点authenticatePoint; 区分度discrimination 0全部 10差 20较差 30中等 40良好 50优秀;推荐状态recommendStatus:10未推荐,20已推荐 */
  customContent?: Record<string | number | symbol, any>
  /** 区分度 */
  distinction?: string
  /** 难度(不为组合题的小题时必填) 10易、20较易、30中等、40较难、50难 */
  level?: number
  /** 资源方编码(不为小题时必填) */
  merchantCode?: string
  /** 操作人code */
  operatorCode?: string
  /** 选项列表 */
  optionList?: QuestionOptionDto
  /** 资源方编码 */
  organizationCode?: string
  /** 小题对应的组合题大题的code(不是组合题中的小题不用填) */
  parentCode?: string
  /** 引用次数,不填默认为0 */
  referenceCount?: number
  /** 引用状态,不填默认为未引用,未引用10,已引用20 */
  referenceStatus?: number
  /** 技能 10-技能  20-理论 */
  skill?: number
  /**  */
  sourceCode?: string
  /** 入库时间 */
  storageTime?: number
  /** 题材 10-真题 20-模拟题 */
  subject?: number
  /** 题目/提干 */
  title?: string
  /** 题目类型 10判断题、20单选题、30多选题、40填空题、50简答题、60组合题 70计算题、 80论述题、90案例分析题 */
  type?: number
}

/**
 * requestUrl /question/front/create
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
 * requestUrl /question/front/delete/{code}
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

/**
 * requestUrl /question/front/detail/{code}
 * method get
 */
export interface DetailUsingGET_1Response {
  
  /** 响应数据 */
  data?: QuestionDetailDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /question/front/edit
 * method post
 */
export interface EditUsingPOSTRequest {
  
  /** 解析(不为组合题时必填) */
  analysis?: string
  /** 鉴定点 */
  authPoint?: string
  /** 鉴定点code */
  authPointCode?: string
  /** 题型 10-国家题 20-省题 30-资源题 40-机构题 */
  belongType?: number
  /** 组合题的小题list(类型为组合题时必填) */
  childList?: QuestionDetailDto
  /** 编码,编辑时为必填 */
  code?: string
  /** 自定义字段内容:职业/工种/等级commonJob 鉴定点authenticatePoint; 区分度discrimination 0全部 10差 20较差 30中等 40良好 50优秀;推荐状态recommendStatus:10未推荐,20已推荐 */
  customContent?: Record<string | number | symbol, any>
  /** 区分度 */
  distinction?: string
  /** 难度(不为组合题的小题时必填) 10易、20较易、30中等、40较难、50难 */
  level?: number
  /** 资源方编码(不为小题时必填) */
  merchantCode?: string
  /** 操作人code */
  operatorCode?: string
  /** 选项列表 */
  optionList?: QuestionOptionDto
  /** 资源方编码 */
  organizationCode?: string
  /** 小题对应的组合题大题的code(不是组合题中的小题不用填) */
  parentCode?: string
  /** 引用次数,不填默认为0 */
  referenceCount?: number
  /** 引用状态,不填默认为未引用,未引用10,已引用20 */
  referenceStatus?: number
  /** 技能 10-技能  20-理论 */
  skill?: number
  /**  */
  sourceCode?: string
  /** 入库时间 */
  storageTime?: number
  /** 题材 10-真题 20-模拟题 */
  subject?: number
  /** 题目/提干 */
  title?: string
  /** 题目类型 10判断题、20单选题、30多选题、40填空题、50简答题、60组合题 70计算题、 80论述题、90案例分析题 */
  type?: number
}

/**
 * requestUrl /question/front/edit
 * method post
 */
export interface EditUsingPOSTResponse {
  
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
 * requestUrl /question/front/excel/import
 * method post
 */
export interface ImportExcelUsingPOST_1Request {
  
  /** code */
  code?: string
  /** 资源方编码 */
  merchantCode?: string
  /** 文件名称 */
  name?: string
  /** 操作人code */
  operatorCode?: string
  /** 资源方编码 */
  organizationCode?: string
  /** 文件url */
  url?: string
}

/**
 * requestUrl /question/front/excel/import
 * method post
 */
export interface ImportExcelUsingPOST_1Response {
  
  /** 响应数据 */
  data?: string
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface QuestionImportResultDto {
  
  /** 编码 */
  code?: string
  /** 导入失败条数 */
  failCount?: number
  /** 失败原因list */
  failDtoList?: QuestionImportFailDto
  /** 失败文件name */
  failFileName?: string
  /** 失败文件url */
  failFileUrl?: string
  /** 导入状态  0初始化, 5导入中,10导入失败, 20导入成功 */
  importStatus?: number
  /** 导入进度 */
  rate?: number
  /** 导入成功条数 */
  successCount?: number
  /** 导入总条数 */
  totalCount?: number
}

interface QuestionImportFailDto {
  
  /** 编码 */
  code?: string
  /** 错误内容 */
  failContent?: string
  /** 错误原因 */
  failMsg?: string
  /** 文件导入code */
  fileImportCode?: string
  /** 行数 */
  line?: number
  /** 题型 */
  questionType?: number
}

/**
 * requestUrl /question/front/excel/result
 * method post
 */
export interface GetLastImportResultUsingPOSTRequest {
  
  /** 业务类型 */
  businessType?: number
  /** 导入结果code编码, 可以不传，不传则默认拿当前登录人最后一次导入记录 */
  code?: string
  /** 资源方编码 */
  merchantCode?: string
}

/**
 * requestUrl /question/front/excel/result
 * method post
 */
export interface GetLastImportResultUsingPOSTResponse {
  
  /** 响应数据 */
  data?: QuestionImportResultDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /question/front/excel/template
 * method get
 */
export interface DownloadTemplateUsingGETResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface ExamGenerateQuestionResDto {
  
  /** questionCode */
  questionCode?: string
  /** 题型 */
  questionType?: number
}

/**
 * requestUrl /question/front/generate_exam_fromfile/{fromfileCode}
 * method get
 */
export interface GenerateExamFromFileUsingGETResponse {
  
  /** 响应数据 */
  data?: ExamGenerateQuestionResDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface QuestionConfigDto {
  
  /** 需要数量 */
  needNumber?: number
  /** 题型 */
  questionType?: number
}

/**
 * requestUrl /question/front/generate_exam_question
 * method post
 */
export interface GenerateExamQuestionUsingPOSTRequest {
  
  /** 自定义字段 */
  customContent?: string
  /** 资源方编码 */
  merchantCode?: string
  /** paperCode */
  paperCode?: string
  /** 限制试题引用次数 */
  questionCitedLimit?: number
  /** 指定题型题数 */
  questionConfigList?: QuestionConfigDto
  /** 题型结构 */
  questionStructure?: string
  /** 总题数 */
  questionTotal?: number
  /** 勾选题型至少抽取几种 */
  questionTypeLeast?: number
  /** 限制题目入库结束时间 */
  receiptEndTime?: number
  /** 限制题目入库开始时间 */
  receiptStartTime?: number
}

/**
 * requestUrl /question/front/generate_exam_question
 * method post
 */
export interface GenerateExamQuestionUsingPOSTResponse {
  
  /** 响应数据 */
  data?: ExamGenerateQuestionResDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /question/front/latex_to_img
 * method post
 */
export interface GetLatex2ImgUsingPOSTRequest {
  
  /** latex语句 */
  latex?: string
  /** 操作人code */
  operatorCode?: string
}

/**
 * requestUrl /question/front/latex_to_img
 * method post
 */
export interface GetLatex2ImgUsingPOSTResponse {
  
  /** 响应数据 */
  data?: string
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface QuestionBatchDto {
  
  /** 批量数据 */
  detailList?: QuestionDetailDto
}

/**
 * requestUrl /question/front/list
 * method post
 */
export interface ListByCodesUsingPOSTRequest {
  
  /** 试题code的List */
  codeList?: any[]
}

/**
 * requestUrl /question/front/list
 * method post
 */
export interface ListByCodesUsingPOSTResponse {
  
  /** 响应数据 */
  data?: QuestionBatchDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface ExamQuestionInfoResDto {
  
  /** 解析 */
  analysis?: string
  /** 子题目列表 */
  childList?: ExamQuestionInfoResDto
  /** code */
  code?: string
  /** 自定义字段 */
  customContent?: string
  /** 难度 */
  difficulty?: string
  /** latex语句 */
  latexList?: any[]
  /** 题目信息 */
  options?: AnswerOptionsDto
  /** 父code */
  parentCode?: string
  /** 题型 */
  questionType?: number
  /** 标题 */
  title?: string
}

interface AnswerOptionsDto {
  
  /** 答案 */
  answer?: string
  /** 是否正确答案 */
  isAnswer?: number
  /** 题目排序 */
  sort?: string
}

/**
 * requestUrl /question/front/list_exam_question_info
 * method post
 */
export interface ListExamQuestionInfoUsingPOSTRequest {
  
  /** 问题code列表 */
  questionCodes?: any[]
  /**  */
  showLatex?: boolean
}

/**
 * requestUrl /question/front/list_exam_question_info
 * method post
 */
export interface ListExamQuestionInfoUsingPOSTResponse {
  
  /** 响应数据 */
  data?: ExamQuestionInfoResDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspQuestionDetailDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: QuestionDetailDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

/**
 * requestUrl /question/front/page
 * method post
 */
export interface PageUsingPOST_1Request {
  
  /** 要素细目表code */
  authenticateCode?: string
  /** 题型 10-国家题 20-省题 30-资源题 40-机构题 */
  belongType?: number
  /** code批量查询 */
  codeList?: any[]
  /** 区分度 0全部、10差、20较差、30中等、40良好、50优秀 */
  discrimination?: number
  /** not in code */
  filterCodeList?: any[]
  /** 资源方code */
  merchantCode?: string
  /** 操作人code */
  operatorCode?: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 资源方code */
  organizationCode?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 鉴定点code */
  pointCode?: string
  /** 引用次数限制 */
  questionCitedLimit?: number
  /** 题目难易程度 0全部、10易、20较易、30中等、40较难、50难 */
  questionLevel?: number
  /** 题目类型 0全部、10判断题、20单选题、30多选题、40填空题、50简答题、60组合题 */
  questionType?: number
  /** 题目类型多选 0全部、10判断题、20单选题、30多选题、40填空题、50简答题、60组合题 */
  questionTypeList?: any[]
  /** 限制试题引用次数开启状态 */
  quoteNumStatus?: number
  /** 推荐状态 0 全部、10 未推荐、20 已推荐 */
  recommendStatus?: number
  /** 引用状态 0 全部、10 未引用、20 已引用 */
  referStatus?: number
  /** 技能 10-技能  20-理论 */
  skill?: number
  /** 入库结束时间 */
  storageEndTime?: number
  /** 入库开始时间 */
  storageStartTime?: number
  /** 题材 10-真题 20-模拟题 */
  subject?: number
  /** 题目/题干模糊查询 */
  titleLike?: string
  /** 等级 */
  workLevel?: number
  /** 等级 */
  workLevelStr?: string
  /** 职业/工种/等级 模糊查询 */
  workLike?: string
  /** 职业 */
  workName?: number
  /** 职业 */
  workNameStr?: string
  /** 工种 */
  workType?: number
  /** 工种 */
  workTypeStr?: string
}

/**
 * requestUrl /question/front/page
 * method post
 */
export interface PageUsingPOST_1Response {
  
  /** 响应数据 */
  data?: BasePaginationRspQuestionDetailDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface PointQuestionTypeCountResDto {
  
  /** 题目数 */
  count?: number
  /** 题型 */
  questionType?: number
}

/**
 * requestUrl /question/front/point/count
 * method post
 */
export interface PointCountUsingPOSTRequest {
  
  /** 要素细目表code */
  authenticateCode?: string
  /** 自定义内容 */
  customContent?: Record<string | number | symbol, any>
  /** 文件导入code */
  fromFileCode?: string
  /** 资源方组织code */
  merchantCode?: string
  /** 限制试题引用次数 */
  questionCitedLimit?: number
  /** 限制题目入库结束时间 */
  receiptEndTime?: number
  /** 限制题目入库开始时间 */
  receiptStartTime?: number
}

/**
 * requestUrl /question/front/point/count
 * method post
 */
export interface PointCountUsingPOSTResponse {
  
  /** 响应数据 */
  data?: PointQuestionTypeCountResDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /question/front/point/count_from_file
 * method post
 */
export interface PointCountFromFileUsingPOSTRequest {
  
  /** 要素细目表code */
  authenticateCode?: string
  /** 自定义内容 */
  customContent?: Record<string | number | symbol, any>
  /** 文件导入code */
  fromFileCode?: string
  /** 资源方组织code */
  merchantCode?: string
  /** 限制试题引用次数 */
  questionCitedLimit?: number
  /** 限制题目入库结束时间 */
  receiptEndTime?: number
  /** 限制题目入库开始时间 */
  receiptStartTime?: number
}

/**
 * requestUrl /question/front/point/count_from_file
 * method post
 */
export interface PointCountFromFileUsingPOSTResponse {
  
  /** 响应数据 */
  data?: PointQuestionTypeCountResDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface QuestionPointListDto {
  
  /** 试题集合 */
  questionList?: QuestionPointDto
}

interface QuestionPointDto {
  
  /** 要素细目表code */
  authenticateCode?: string
  /** 鉴定点code */
  pointCode?: string
  /** 试题code */
  questionCode?: string
}

/**
 * requestUrl /question/front/point/list
 * method post
 */
export interface PointListUsingPOSTRequest {
  
  /** 要素细目表code */
  authenticateCode?: string
  /** 资源方组织code */
  merchantCode?: string
  /** 鉴定点codeList */
  pointCodeList?: any[]
  /** 题目类型多选 0全部、10判断题、20单选题、30多选题、40填空题、50简答题、60组合题 */
  questionTypeList?: any[]
}

/**
 * requestUrl /question/front/point/list
 * method post
 */
export interface PointListUsingPOSTResponse {
  
  /** 响应数据 */
  data?: QuestionPointListDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /question/front/updateStatus
 * method post
 */
export interface UpdateStatusUsingPOSTRequest {
  
  /** 题目/题干code */
  code?: string
  /** 全量更新引用次数, 如果同时传新增和full，则只触发full */
  fullUpdateReferenceCount?: number
  /** 操作人code */
  operatorCode?: string
  /** 推荐状态 10未推荐 20已推荐 */
  recommendStatus?: number
  /** 新增引用次数 */
  referenceCount?: number
  /** 引用状态 10 未引用 20 已引用 */
  referenceStatus?: number
}

/**
 * requestUrl /question/front/updateStatus
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

interface RolePermissionDto {
  
  /** 是否能修改 */
  changeEnable?: boolean
  /**  */
  children?: RolePermissionDto
  /** 是否拥有权限 */
  has?: boolean
  /** icon */
  icon?: string
  /** 权限编码 */
  key?: number
  /** 模块id */
  moduleId?: number
  /** 上级权限id */
  pid?: number
  /** 路由 */
  route?: string
  /** 权限名称 */
  title?: string
  /** 平台类型名称 */
  type?: number
  /** 平台类型名称 */
  typeName?: string
  /** 菜单对应的url */
  url?: string
  /** 菜单url对应的业务线, 平台0, 考评1, 创培2, 职培3, 院校4 */
  urlType?: number
}

/**
 * requestUrl /question/front/permission
 * method post
 */
export interface RolePermissionUsingPOSTResponse {
  
  /** 响应数据 */
  data?: RolePermissionDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}