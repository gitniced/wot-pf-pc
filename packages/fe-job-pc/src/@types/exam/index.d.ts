
/**
 * 如果遇到bug，您可以钉钉搜索封东其或者给 fengdongqi@hzwotu.com 邮箱发邮件
 * 欢迎大家提 issue 或者 PR。
 * @title 沃土考试中心服务
 * @description 沃土考试中心服务是一个 Spring Boot项目
 * @version v1.0
 **/


/**
 * requestUrl /exam/front/exam/confirm_info
 * method post
 */
export interface ConfirmInfoUsingPOSTRequest {
  
  /** 考场code */
  examCode: string
  /** 用户code */
  userCode: string
}

/**
 * requestUrl /exam/front/exam/confirm_info
 * method post
 */
export interface ConfirmInfoUsingPOSTResponse {
  
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
 * requestUrl /exam/front/exam/confirm_precautions
 * method post
 */
export interface ConfirmPrecautionsUsingPOSTRequest {
  
  /** 考场code */
  examCode: string
  /** 用户code */
  userCode: string
}

/**
 * requestUrl /exam/front/exam/confirm_precautions
 * method post
 */
export interface ConfirmPrecautionsUsingPOSTResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface ExamPersonReqDto {
  
  /**  */
  admissionTicketNumber?: string
  /**  */
  personCertNumber?: string
  /**  */
  personCertType?: string
  /**  */
  personCode?: string
  /**  */
  personName?: string
  /**  */
  personType?: string
  /**  */
  seatNumber?: number
}

/**
 * requestUrl /exam/front/exam/create
 * method post
 */
export interface CreateUsingPOSTRequest {
  
  /** 考试地点 */
  address?: string
  /** 开场后(分钟)入场 */
  admissionAfter?: number
  /** 开场前(分钟)入场 */
  admissionBefore?: number
  /** 答题时长(分钟) */
  answerTime?: number
  /** 计算器辅助计算 */
  calculatorShowState?: number
  /** code */
  code?: string
  /** 考生确认信息 */
  confirmInfoState?: number
  /** 考前须知手动确认 */
  confirmPrecautionsState?: number
  /** 最早交卷时间(时间戳) */
  deliveryTime?: number
  /** 最早交卷时间(分钟) */
  earliestDeliveryTime?: number
  /** 跳转链接 */
  endJumpLink?: string
  /** 结束语 */
  endPrompt?: string
  /** 考试结束时间 */
  endTime?: number
  /** 输入公式作答 */
  formulaState?: number
  /** 登陆设备 */
  loginDevice?: string
  /** 登陆方式 */
  loginType: string
  /** 考试界面logo及名称 */
  logoNameType?: string
  /** 是否开启签到 */
  needSign: number
  /** 交卷后显示客观题成绩 */
  objectiveScoreShowState?: number
  /** 所属机构 */
  organizationCode?: string
  /** 试卷codeList */
  paperList?: any[]
  /** 随机试卷数 */
  personList?: ExamPersonReqDto
  /** 考前需知 */
  precautions?: string
  /** 项目code */
  projectCode?: string
  /** 项目名称 */
  projectTitle?: string
  /** 项目类型 */
  projectType?: string
  /** 随机试卷数 */
  randomTestPaperNumber?: number
  /** 题目分值可见 */
  scoreShowState?: number
  /** 是否脱敏 */
  sensitiveState?: number
  /** 所属站点 */
  sid: number
  /** 签到任务code */
  signCode?: string
  /** 签到时限-开考后 分钟 */
  signEndMins?: number
  /** 签到结束时间 */
  signEndTime?: number
  /** 引导文案 */
  signGuide?: string
  /** 签到时限-开考前 分钟 */
  signStartMins?: number
  /** 签到开始时间 */
  signStartTime?: number
  /** 考试开始时间 */
  startTime?: number
  /** 考试名称 */
  title: string
  /** 操作用户code */
  userCode?: string
  /** 答题界面显示考生水印 */
  watermarkState?: number
}

/**
 * requestUrl /exam/front/exam/create
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
 * requestUrl /exam/front/exam/delete
 * method post
 */
export interface DeleteUsingPOSTRequest {
  
  /** 考试code */
  examCode?: string
  /** 用户code */
  userCode?: string
}

/**
 * requestUrl /exam/front/exam/delete
 * method post
 */
export interface DeleteUsingPOSTResponse {
  
  /** 响应数据 */
  data?: string
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface ExamDetailDto {
  
  /** 答题时长(分钟) */
  answerTime?: number
  /** 计算器辅助计算 */
  calculatorShowState?: number
  /** code */
  code?: string
  /** 考生确认信息 */
  confirmInfoState?: number
  /** 考前须知手动确认 */
  confirmPrecautionsState?: number
  /** 最早交卷时间(时间戳) */
  deliveryTime?: number
  /** 最早交卷时间(分钟) */
  earliestDeliveryTime?: number
  /** 跳转链接 */
  endJumpLink?: string
  /** 结束语 */
  endPrompt?: string
  /** 考试结束时间 */
  endTime?: number
  /** 输入公式作答 */
  formulaState?: number
  /** 登陆方式 */
  loginType: string
  /** 考试界面logo及名称 */
  logoNameType?: string
  /** 是否开启签到 */
  needSign: number
  /** 交卷后显示客观题成绩 */
  objectiveScoreShowState?: number
  /** 考前需知 */
  precautions?: string
  /** 题目分值可见 */
  scoreShowState?: number
  /** 签到结束时间 */
  signEndTime?: number
  /** 引导文案 */
  signGuide?: string
  /** 签到开始时间 */
  signStartTime?: number
  /** 考试开始时间 */
  startTime?: number
  /** 考试名称 */
  title: string
  /** 答题界面显示考生水印 */
  watermarkState?: number
}

/**
 * requestUrl /exam/front/exam/detail/{code}
 * method get
 */
export interface DetailUsingGETResponse {
  
  /** 响应数据 */
  data?: ExamDetailDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface ExamLoginResDto {
  
  /** accessToken */
  accessToken?: string
  /** appKey */
  appKey?: string
  /** refreshToken */
  refreshToken?: string
  /** userCode */
  userCode?: string
}

/**
 * requestUrl /exam/front/exam/exam_login
 * method post
 */
export interface ExamLoginUsingPOSTRequest {
  
  /** 账号 */
  account: string
  /** 登录设备,WEB代表PC网页、APPLET代表小程序 */
  appKey: string
  /** certnumber */
  certnumber?: string
  /** 业务code */
  dataCode?: string
  /** password */
  password?: string
  /** 站点id */
  sid: number
}

/**
 * requestUrl /exam/front/exam/exam_login
 * method post
 */
export interface ExamLoginUsingPOSTResponse {
  
  /** 响应数据 */
  data?: ExamLoginResDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface ExamLoginInfoDetailDto {
  
  /** code */
  code?: string
  /** 考试结束时间 */
  endTime?: number
  /** 登陆方式 */
  loginType?: string
  /** logo地址 */
  logoUrl?: string
  /** 座位号 */
  seatNumber?: number
  /** 站点id */
  sid?: number
  /** 站点名称 */
  sidName?: string
  /** 考试开始时间 */
  startTime?: number
  /** 考试名称 */
  title?: string
}

/**
 * requestUrl /exam/front/exam/exam_login_detail/{code}
 * method get
 */
export interface ExamLoginDetailUsingGETResponse {
  
  /** 响应数据 */
  data?: ExamLoginInfoDetailDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface ExamScoreResDto {
  
  /** 考生结束答题时间 */
  endTime?: number
  /** 是否生成完毕 */
  generateState?: boolean
  /** 分数结果 */
  score?: number
  /** 考生开始答题时间 */
  startTime?: number
}

/**
 * requestUrl /exam/front/exam/get_score/{code}
 * method get
 */
export interface GetScoreUsingGETResponse {
  
  /** 响应数据 */
  data?: ExamScoreResDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface ExamQuestionResDto {
  
  /** 答案列表 */
  answerList?: ExamSubmitAnswerCellDto
  /** 试卷code */
  paperCode?: string
  /** 试题列表 */
  questionList?: ExamQuestionListResDto
}

interface ExamSubmitAnswerCellDto {
  
  /** 答案 */
  answer?: Record<string | number | symbol, any>
  /** 子题目列表 */
  childList?: ExamSubmitAnswerCellDto
  /** 是否标记 */
  isMarked?: boolean
  /** 题目code */
  questionCode?: string
  /** 所得分数 */
  score?: number
  /** 状态 10正确 20错误 30阅卷中 40部分正确 50未作答 */
  state?: number
}

interface ExamQuestionListResDto {
  
  /** 逻辑题号 */
  logicSort?: string
  /** 题目列表 */
  questionList?: ExamQuestionSimpleResDto
  /** 题型 */
  questionType?: number
  /** 大题标题 */
  title?: string
  /** 总题数 */
  totalQuestion?: number
  /** 总分数 */
  totalScore?: number
  /** 每题分数 0为单独设置 */
  unificationScore?: number
}

interface ExamQuestionSimpleResDto {
  
  /** 题目code */
  questionCode?: string
  /** 分数 */
  questionScore?: number
  /** 题号 */
  questionSort?: number
  /** 题目类型 */
  questionType?: number
}

/**
 * requestUrl /exam/front/exam/list_question/{code}
 * method get
 */
export interface ListQuestionUsingGETResponse {
  
  /** 响应数据 */
  data?: ExamQuestionResDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface ExamPersonDetailDto {
  
  /** 考试地址 */
  address?: string
  /** 准考证号 */
  admissionTicketNumber?: string
  /** 答题结束时间 */
  answerEndTime?: number
  /** 证件类型 */
  certType?: string
  /** 证件号码 */
  certnumber?: string
  /** 是否确认过学员信息 */
  confirmInfoState?: number
  /** 是否确认过考前须知 */
  confirmPrecautionsState?: number
  /** 考试结束时间 */
  endTime?: number
  /** 考试名称 */
  examTitle?: string
  /** 是否结束考试 */
  generateState?: number
  /** 考生信息 */
  name?: string
  /** 考试是否开启签到 */
  needSign?: number
  /** 座位号 */
  seatNumber?: Record<string | number | symbol, any>
  /** 考生是否签到过 */
  signState?: number
  /** 考试开始时间 */
  startTime?: number
  /** userCode */
  userCode?: string
}

/**
 * requestUrl /exam/front/exam/person_detail
 * method post
 */
export interface PersonDetailUsingPOSTRequest {
  
  /** 考试code */
  examCode?: string
  /** 试卷code */
  paperCode?: string
  /** 用户code */
  personCode?: string
}

/**
 * requestUrl /exam/front/exam/person_detail
 * method post
 */
export interface PersonDetailUsingPOSTResponse {
  
  /** 响应数据 */
  data?: ExamPersonDetailDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /exam/front/exam/submit_answer
 * method post
 */
export interface SubmitAnswerUsingPOSTRequest {
  
  /** 回答列表 */
  answerList?: ExamSubmitAnswerCellDto
  /** 考试code */
  examCode?: string
  /** 试卷code */
  paperCode?: string
  /** 用户code */
  personCode?: string
}

/**
 * requestUrl /exam/front/exam/submit_answer
 * method post
 */
export interface SubmitAnswerUsingPOSTResponse {
  
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
 * requestUrl /exam/front/exam/submit_exam
 * method post
 */
export interface SubmitExamUsingPOSTRequest {
  
  /** 考试code */
  examCode?: string
  /** 试卷code */
  paperCode?: string
  /** 用户code */
  personCode?: string
}

/**
 * requestUrl /exam/front/exam/submit_exam
 * method post
 */
export interface SubmitExamUsingPOSTResponse {
  
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
 * requestUrl /exam/front/exam/update_publish
 * method post
 */
export interface UpdatePublishUsingPOSTRequest {
  
  /** 考试code */
  examCode?: string
  /** 用户code */
  userCode?: string
}

/**
 * requestUrl /exam/front/exam/update_publish
 * method post
 */
export interface UpdatePublishUsingPOSTResponse {
  
  /** 响应数据 */
  data?: string
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface GradingTaskDetailDto {
  
  /** 结束时间 */
  endTime?: number
  /** 考试code */
  examCode: string
  /** 考试名称 */
  examTitle?: string
  /** 阅卷方式 */
  gradingType: string
  /** 试卷数 */
  paperCount?: number
  /** 关联项目名称 */
  projectTitle?: string
  /** 项目类型 */
  projectType?: string
  /** 涉及主观题类型 */
  questionTypes?: any[]
  /** 试卷随机数 */
  randomPaperNumber?: number
  /** 开始时间 */
  startTime?: number
  /** 考生数 */
  stuCount?: number
  /** 阅卷任务code */
  taskCode: string
  /** 阅卷老师 */
  teacherDetails: TeacherDetail
}

interface TeacherDetail {
  
  /** 姓名 */
  name?: string
  /** 手机号 */
  phone?: string
  /** 选中题目code列表 */
  questionCodes?: any[]
  /** 选中题目类型列表 */
  questionTypes?: any[]
  /** 是否选中 */
  selectState?: number
  /** 阅卷老师code */
  userCode: string
}

/**
 * requestUrl /exam/front/grading/detail/{taskCode}
 * method get
 */
export interface DetailUsingGET_1Response {
  
  /** 响应数据 */
  data?: GradingTaskDetailDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 阅卷试卷主观题设置展示 {
  
  /** 试卷大题列表 */
  paperQuestionList?: PageQuestionDetailResDto
  /** 试卷名字 */
  paperTitle?: string
}

interface PageQuestionDetailResDto {
  
  /** 逻辑题号 */
  logicSort?: string
  /** 小题最大序号 */
  maxSort?: string
  /** 小题最小序号 */
  minSort?: string
  /** 需要题目数量 */
  needNumber?: number
  /** 题目列表 */
  questionList?: PageQuestionCellResDto
  /** 题型 */
  questionType?: number
  /** 大题标题 */
  title?: string
  /** 总题数 */
  totalQuestion?: number
  /** 总分数 */
  totalScore?: number
  /** 每题分数 0为单独设置 */
  unificationScore?: number
}

interface PageQuestionCellResDto {
  
  /** 解析 */
  analysis?: string
  /** 子题目列表 */
  childList?: PageQuestionCellResDto
  /** 正确状态 */
  correctState?: number
  /** 自定义业务字段 */
  customContent?: Record<string | number | symbol, any>
  /** 难易程度 */
  difficulty?: string
  /** latex语句 */
  latexList?: any[]
  /** 逻辑题号 */
  logicSort?: number
  /** 阅卷人 */
  makringTeacher?: string
  /** 选项列表 */
  options?: AnswerOptionsDto
  /** 题目code */
  questionCode?: string
  /** 题目类型 */
  questionType?: number
  /** 真实排序 */
  realSort?: number
  /** 分数 */
  score?: number
  /** 题目内容 */
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
 * requestUrl /exam/front/grading/list_grading_question/{taskCode}
 * method get
 */
export interface ListGradingQuestionUsingGETResponse {
  
  /** 响应数据 */
  data?: 阅卷试卷主观题设置展示
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface GradingQuestionResDto {
  
  /** 答案列表 */
  answerList?: ExamSubmitAnswerCellDto
  /** 考试名称 */
  examTitle?: string
  /** 阅卷方式 */
  gradingType?: string
  /** 试卷code */
  paperCode?: string
  /** 试卷名称 */
  paperTitle?: string
  /** 试题列表 */
  questionList?: PageQuestionDetailResDto
  /** 考生姓名 */
  stuName?: string
}

/**
 * requestUrl /exam/front/grading/list_question/{stuExamCode}
 * method get
 */
export interface ListQuestionUsingGET_1Response {
  
  /** 响应数据 */
  data?: GradingQuestionResDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspGradingTaskPageResDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: GradingTaskPageResDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface GradingTaskPageResDto {
  
  /** 结束时间 */
  endTime?: number
  /** 考试code */
  examCode: string
  /** 考试名称 */
  examTitle?: string
  /** 阅卷方式 */
  gradingType: string
  /** 阅卷老师数 */
  markingTeacherCount?: number
  /** 试卷数 */
  paperCount?: number
  /** 关联项目名称 */
  projectTitle?: string
  /** 项目类型 */
  projectType?: string
  /** 合格数 */
  qualifiedCount?: number
  /** 试卷随机数 */
  randomPaperNumber?: number
  /** 开始时间 */
  startTime?: number
  /** 考生数 */
  stuCount?: number
  /** 已交卷数 */
  submitPaperCount?: number
  /** 阅卷任务code */
  taskCode: string
  /** 不合格数量 */
  unQualifiedCount?: number
}

/**
 * requestUrl /exam/front/grading/page
 * method post
 */
export interface PageGradingUsingPOSTRequest {
  
  /** 考试结束时间 */
  endTime?: number
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 所属机构 */
  organizationCode: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 关联项目名称 */
  projectTitle?: string
  /** 项目类型 */
  projectType?: string
  /** 考试开始时间 */
  startTime?: number
  /** 阅卷状态 */
  state: number
  /** 考试名称 */
  title?: string
}

/**
 * requestUrl /exam/front/grading/page
 * method post
 */
export interface PageGradingUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspGradingTaskPageResDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspGradingTaskRecordPageResDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: GradingTaskRecordPageResDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface GradingTaskRecordPageResDto {
  
  /** 证件号码 */
  certNumber?: string
  /** 满分 */
  fullScore?: number
  /** 客观题得分 */
  objectiveScore?: number
  /** 试卷code */
  paperCode?: string
  /** 试卷名称 */
  paperTitle?: string
  /** 合格分 */
  qualifiedScore?: number
  /** 考生code */
  stuCode?: string
  /** 考试学生code */
  stuExamCode?: string
  /** 考生姓名 */
  stuName?: string
  /** 主观题得分 */
  subjectiveScore?: number
  /** 考卷序号 */
  submitSort?: number
  /** 交卷时间 */
  submitTime?: number
  /** 阅卷人 */
  teacherName?: string
  /** 最终成绩 */
  totalScore?: number
}

/**
 * requestUrl /exam/front/grading/paper_page
 * method post
 */
export interface PaperPageUsingPOSTRequest {
  
  /** 证件号码 */
  certNumber?: string
  /** 考试code */
  examCode?: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 所属机构 */
  organizationCode: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 阅卷状态 */
  state?: number
  /** 考生姓名 */
  stuName?: string
  /** 阅卷任务code */
  taskCode: string
  /** 阅卷人 */
  teacherName?: string
}

/**
 * requestUrl /exam/front/grading/paper_page
 * method post
 */
export interface PaperPageUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspGradingTaskRecordPageResDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface 批改题目 {
  
  /** 子题目列表 */
  childList?: 批改题目
  /** 题目code */
  questionCode?: string
  /** 分数 */
  score?: number
}

/**
 * requestUrl /exam/front/grading/teacher_correction
 * method post
 */
export interface TeacherCorrectionUsingPOSTRequest {
  
  /** 考试code */
  examCode?: string
  /** 题目列表 */
  scoreList?: 批改题目
  /** 考生code */
  stuCode?: string
  /** 考试任务code */
  taskCode?: string
}

/**
 * requestUrl /exam/front/grading/teacher_correction
 * method post
 */
export interface TeacherCorrectionUsingPOSTResponse {
  
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
 * requestUrl /exam/front/grading/teacher_submit
 * method post
 */
export interface TeacherSubmitUsingPOSTRequest {
  
  /** 考试code */
  examCode?: string
  /** 所属机构 */
  organizationCode: string
}

/**
 * requestUrl /exam/front/grading/teacher_submit
 * method post
 */
export interface TeacherSubmitUsingPOSTResponse {
  
  /** 响应数据 */
  data?: string
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspTeacherGradingTaskScorePageResDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: TeacherGradingTaskScorePageResDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface TeacherGradingTaskScorePageResDto {
  
  /** 考生code */
  examCode?: string
  /** 试卷名称 */
  paperTitle?: string
  /** 考生code */
  stuCode?: string
  /** 主观题已阅得分 */
  subjectiveScore?: number
  /** 考卷序号 */
  submitSort?: number
  /** 交卷时间 */
  submitTime?: number
  /** 阅卷人 */
  teacherName?: string
  /** 教师交卷时间 */
  teacherSubmitTime?: number
}

/**
 * requestUrl /exam/front/grading/teacher_submit_page
 * method post
 */
export interface TeacherSubmitPageUsingPOSTRequest {
  
  /** 考试code */
  examCode?: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 所属机构 */
  organizationCode: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
}

/**
 * requestUrl /exam/front/grading/teacher_submit_page
 * method post
 */
export interface TeacherSubmitPageUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspTeacherGradingTaskScorePageResDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface TeacherGradingTaskDetailResDto {
  
  /** 答案列表 */
  answerList?: ExamSubmitAnswerCellDto
  /** 考试名称 */
  examtitle?: string
  /** 阅卷方式 */
  gradingType?: string
  /** 是否完成 无可阅考卷 */
  isFinish?: boolean
  /** 待阅题数 */
  noReadCount?: number
  /** 试卷名称 */
  paperTitle?: string
  /** 试题列表 */
  questionList?: PageQuestionDetailResDto
  /** 已阅题数 */
  readCount?: number
  /** 考生姓名 */
  stuName?: string
  /** 主观题已阅得分 */
  subjectiveScore?: number
  /** 考卷序号 */
  submitSort?: number
}

/**
 * requestUrl /exam/front/grading/teacher_task_detail
 * method post
 */
export interface TeacherTaskDetailUsingPOSTRequest {
  
  /** 所属机构 */
  organizationCode: string
  /** 考生code,不是修改的时候不用传 */
  stuCode?: string
  /** 考试任务code */
  taskCode?: string
}

/**
 * requestUrl /exam/front/grading/teacher_task_detail
 * method post
 */
export interface TeacherTaskDetailUsingPOSTResponse {
  
  /** 响应数据 */
  data?: TeacherGradingTaskDetailResDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface TeacherGradingTaskPageResDto {
  
  /** 考试结束时间 */
  endTime?: number
  /** 考试code */
  examCode?: string
  /** 考试名称 */
  examTitle?: string
  /** 阅卷方式 */
  gradingType?: string
  /** 待阅 */
  noReadCount?: number
  /** 关联项目名称 */
  projectTitle?: string
  /** 项目类型 */
  projectType?: string
  /** 已阅 */
  readCount?: number
  /** 考试开始时间 */
  startTime?: number
  /** 考试任务code */
  taskCode?: string
}

/**
 * requestUrl /exam/front/grading/teacher_task_page
 * method post
 */
export interface TeacherTaskPageUsingPOSTRequest {
  
  /** 考试结束时间 */
  endTime?: number
  /** 考试名称 */
  examTitle?: string
  /** 所属机构 */
  organizationCode: string
  /** 关联项目名称 */
  projectTitle?: string
  /** 项目类型 */
  projectType?: string
  /** 考试开始时间 */
  startTime?: number
  /** 阅卷状态 */
  state: number
}

/**
 * requestUrl /exam/front/grading/teacher_task_page
 * method post
 */
export interface TeacherTaskPageUsingPOSTResponse {
  
  /** 响应数据 */
  data?: TeacherGradingTaskPageResDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /exam/front/grading/update/{taskCode}
 * method post
 */
export interface UpdateUsingPOSTRequest {
  
  /** 结束时间 */
  endTime?: number
  /** 考试code */
  examCode: string
  /** 考试名称 */
  examTitle?: string
  /** 阅卷方式 */
  gradingType: string
  /** 试卷数 */
  paperCount?: number
  /** 关联项目名称 */
  projectTitle?: string
  /** 项目类型 */
  projectType?: string
  /** 涉及主观题类型 */
  questionTypes?: any[]
  /** 试卷随机数 */
  randomPaperNumber?: number
  /** 开始时间 */
  startTime?: number
  /** 考生数 */
  stuCount?: number
  /** 阅卷任务code */
  taskCode: string
  /** 阅卷老师 */
  teacherDetails: TeacherDetail
}

/**
 * requestUrl /exam/front/grading/update/{taskCode}
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
 * requestUrl /exam/front/add_question
 * method post
 */
export interface AddQuestionUsingPOSTRequest {
  
}

/**
 * requestUrl /exam/front/add_question
 * method post
 */
export interface AddQuestionUsingPOSTResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface QuestionScoreDto {
  
  /** 题型 */
  quesetionType?: number
  /** 分值 */
  score?: string
}

/**
 * requestUrl /exam/front/batch_set_question_score
 * method post
 */
export interface BatchSetQuestionScoreUsingPOSTRequest {
  
  /** paperCode */
  paperCode?: string
  /** questionScoreConfig */
  questionScoreConfig?: QuestionScoreDto
}

/**
 * requestUrl /exam/front/batch_set_question_score
 * method post
 */
export interface BatchSetQuestionScoreUsingPOSTResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface QuestionConfigDto {
  
  /** 需要数量 */
  needNumber?: string
  /** 题型 */
  questionType?: number
  /** 分数 */
  score?: string
}

/**
 * requestUrl /exam/front/create
 * method post
 */
export interface CreateUsingPOST_1Request {
  
  /** 高级设置展示字段 */
  advancedConfig?: string
  /** 要素细目表code */
  authenticateCode?: string
  /** 要素细目表名字 */
  authenticateTitle?: string
  /** 是否题目选项乱序 */
  chaosOptionsState?: number
  /** 是否试卷题目乱序 */
  chaosOrderState?: number
  /** code */
  code?: string
  /** 组卷方式 */
  composition?: string
  /** 自定义字段 */
  customContent?: Record<string | number | symbol, any>
  /** 套题组卷文件code */
  fromFileCode?: string
  /** 套题组卷文件名 */
  fromFileTitle?: string
  /** 是否整卷序号连续 */
  numContinuousState?: number
  /** 组织code */
  organizationCode?: string
  /** 注意事项 */
  precautions?: string
  /** 合格线 */
  qualifiedProp: string
  /** 限制试题引用次数 */
  questionCitedLimit?: string
  /** 指定题型题数 */
  questionConfigList?: QuestionConfigDto
  /** 题型结构 */
  questionStructure?: string
  /** 总题数 */
  questionTotal?: number
  /** 勾选题型至少抽取几种 */
  questionTypeLeast?: number
  /** 限制试题引用次数开启状态 */
  quoteNumStatus?: number
  /** 随机抽取的试题数 */
  randomQuestionNum?: number
  /** 是否随机生成试卷 */
  randomQuestionState?: number
  /** 限制题目入库结束时间 */
  receiptEndTime?: number
  /** 限制题目入库开始时间 */
  receiptStartTime?: number
  /** 已设置的总题数 */
  savedQuestionTotal?: number
  /** 总分 */
  scoreTotal?: string
  /** 分值设置 */
  scoreType?: string
  /** 站点 */
  sid?: number
  /** 建议作答时间 */
  suggestedTime: string
  /** 标签 */
  tags?: string
  /** 组卷模版code */
  templateCode?: string
  /** 组卷模版名称 */
  templateTitle?: string
  /** 模版类型 */
  templateType?: string
  /** 模版名称 */
  title?: string
  /** 是否是真题 */
  trueState?: number
  /** 单题统一分值 */
  unificationScore?: string
  /** 用户code */
  userCode?: string
}

/**
 * requestUrl /exam/front/create
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
 * requestUrl /exam/front/delete
 * method post
 */
export interface DeleteUsingPOST_1Request {
  
  /** paperCode */
  paperCode?: string
}

/**
 * requestUrl /exam/front/delete
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
 * requestUrl /exam/front/delete_question
 * method post
 */
export interface DeleteQuestionUsingPOSTRequest {
  
}

/**
 * requestUrl /exam/front/delete_question
 * method post
 */
export interface DeleteQuestionUsingPOSTResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface PageDetailBaseDtoRes {
  
  /** 高级设置展示字段 */
  advancedConfig?: string
  /** 要素细目表code */
  authenticateCode?: string
  /** 要素细目表名字 */
  authenticateTitle?: string
  /** 是否题目选项乱序 */
  chaosOptionsState?: number
  /** 是否试卷题目乱序 */
  chaosOrderState?: number
  /**  */
  checkAuth?: boolean
  /**  */
  checkQuestionList?: boolean
  /**  */
  checkQuestionNum?: boolean
  /**  */
  checkQuestionTypeNeedNumber?: boolean
  /**  */
  checkQuestionTypeScore?: boolean
  /**  */
  checkQuestionTypeSocre?: boolean
  /**  */
  checkQuoteNumStatus?: boolean
  /**  */
  checkRandomQuestionNum?: boolean
  /**  */
  checkRules?: boolean
  /**  */
  checkTime?: boolean
  /** code */
  code?: string
  /** 组卷方式 */
  composition?: string
  /** 自定义字段 */
  customContent?: Record<string | number | symbol, any>
  /** 套题组卷文件code */
  fromFileCode?: string
  /** 套题组卷文件名 */
  fromFileTitle?: string
  /**  */
  haveUnificationScore?: boolean
  /** 是否整卷序号连续 */
  numContinuousState?: number
  /** 组织code */
  organizationCode?: string
  /** 注意事项 */
  precautions?: string
  /** 合格线 */
  qualifiedProp: string
  /** 限制试题引用次数 */
  questionCitedLimit?: string
  /** 指定题型题数 */
  questionConfigList?: QuestionConfigDto
  /** 题型结构 */
  questionStructure?: string
  /** 总题数 */
  questionTotal?: number
  /** 勾选题型至少抽取几种 */
  questionTypeLeast?: number
  /** 限制试题引用次数开启状态 */
  quoteNumStatus?: number
  /** 随机抽取的试题数 */
  randomQuestionNum?: number
  /** 是否随机生成试卷 */
  randomQuestionState?: number
  /** 限制题目入库结束时间 */
  receiptEndTime?: number
  /** 限制题目入库开始时间 */
  receiptStartTime?: number
  /** 已设置的总题数 */
  savedQuestionTotal?: number
  /** 总分 */
  scoreTotal?: string
  /** 分值设置 */
  scoreType?: string
  /** 站点 */
  sid?: number
  /** 建议作答时间 */
  suggestedTime: string
  /** 标签 */
  tags?: string
  /** 组卷模版code */
  templateCode?: string
  /** 组卷模版名称 */
  templateTitle?: string
  /** 模版类型 */
  templateType?: string
  /** 模版名称 */
  title?: string
  /** 是否是真题 */
  trueState?: number
  /** 单题统一分值 */
  unificationScore?: string
  /** 用户code */
  userCode?: string
}

/**
 * requestUrl /exam/front/detail/{code}
 * method get
 */
export interface DetailUsingGET_2Response {
  
  /** 响应数据 */
  data?: PageDetailBaseDtoRes
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface ExamQuestionDetailResDto {
  
  /** 子题目列表 */
  childList?: ExamQuestionDetailResDto
  /** 选项列表 */
  options?: ExamAnswerOptionsDto
  /** 题目code */
  questionCode?: string
  /** 题目type */
  questionType?: number
  /** 分数 */
  score?: number
  /** 题目内容 */
  title?: string
}

interface ExamAnswerOptionsDto {
  
  /** 题目排序 */
  sort?: string
  /** 答案 */
  title?: string
}

/**
 * requestUrl /exam/front/detail_question
 * method post
 */
export interface DetailQuestionUsingPOSTRequest {
  
  /** 考试code */
  examCode: string
  /** 试卷code */
  paperCode: string
  /** 题目code */
  questionCode: string
}

/**
 * requestUrl /exam/front/detail_question
 * method post
 */
export interface DetailQuestionUsingPOSTResponse {
  
  /** 响应数据 */
  data?: ExamQuestionDetailResDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface PageAuthResDto {
  
  /** 鉴定范围分布详情 */
  detailList?: PageAuthDetailResDto
  /** 各个重要度分配百分比 */
  statistics?: PageAuthImportGravityResDto
}

interface PageAuthDetailResDto {
  
  /** 实际比重 */
  actualGravity?: string
  /** 鉴定点 */
  pointList?: PageAuthPointResDto
  /** 鉴定范围 */
  range?: string
  /** 鉴定范围code */
  rangeCode?: string
  /** 要求比重 */
  requiredGravity?: string
}

interface PageAuthPointResDto {
  
  /** 难易程度 */
  difficulty?: string
  /** 区分度 */
  distinction?: string
  /** 重要程度 */
  important?: string
  /** 鉴定点code */
  point?: string
  /** 鉴定点code */
  pointCode?: string
  /** 试题数量 */
  questionTotal?: number
  /** 题型 */
  questionType?: string
}

interface PageAuthImportGravityResDto {
  
  /** X重要度分布百分比 */
  importantX?: string
  /** Y重要度分布百分比 */
  importantY?: string
  /** Z重要度分布百分比 */
  importantZ?: string
}

/**
 * requestUrl /exam/front/get_auth_detail/{code}
 * method get
 */
export interface GetAuthDetailUsingGETResponse {
  
  /** 响应数据 */
  data?: PageAuthResDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /exam/front/get_generate/{code}
 * method post
 */
export interface GetGenerateStateUsingPOSTResponse {
  
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
 * requestUrl /exam/front/get_question_detail/{code}
 * method get
 */
export interface GetQuestionDetailUsingGETResponse {
  
  /** 响应数据 */
  data?: PageQuestionDetailResDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /exam/front/get_question_export_detail/{code}
 * method get
 */
export interface GetQuestionExportDetailUsingGETResponse {
  
  /** 响应数据 */
  data?: PageQuestionDetailResDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /exam/front/get_subjective_question_detail/{code}
 * method get
 */
export interface GetSubjectiveQuestionExportDetailUsingGETResponse {
  
  /** 响应数据 */
  data?: PageQuestionDetailResDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspPagePageResDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: PagePageResDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface PagePageResDto {
  
  /** code */
  code?: string
  /** 组卷方式 */
  composition?: string
  /** 试卷来源 */
  createBy?: string
  /** 创建时间 */
  createdAt?: string
  /** 自定义查询 */
  customContent?: Record<string | number | symbol, any>
  /**  */
  fullOrderBy?: string
  /** 生成状态 */
  generateState?: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 发布状态 */
  publishState?: string
  /** 引用次数 */
  referenceNum?: number
  /** 引用状态 */
  referenceState?: string
  /** 名称查询 */
  title?: string
}

/**
 * requestUrl /exam/front/page
 * method post
 */
export interface PageUsingPOSTRequest {
  
  /** 组卷方式 */
  composition?: any[]
  /** 自定义查询 */
  customContent?: Record<string | number | symbol, any>
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 组织code */
  organizationCode?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 发布状态 */
  publishState?: any[]
  /** 引用状态 */
  referenceState?: any[]
  /** 站点 */
  sid?: number
  /** 标签 */
  tags?: string
  /** 名称查询 */
  title?: string
  /** 是否是真题 */
  trueState?: number
  /** 用户code */
  userCode?: string
}

/**
 * requestUrl /exam/front/page
 * method post
 */
export interface PageUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspPagePageResDto
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

interface QuestionDetailDto {
  
  /** 解析(不为组合题时必填) */
  analysis?: string
  /** 鉴定点 */
  authPoint?: string
  /** 鉴定点code */
  authPointCode?: string
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
  /** 小题对应的组合题大题的code(不是组合题中的小题不用填) */
  parentCode?: string
  /** 引用次数,不填默认为0 */
  referenceCount?: number
  /** 引用状态,不填默认为未引用,未引用10,已引用20 */
  referenceStatus?: number
  /** 入库时间 */
  storageTime?: number
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
 * requestUrl /exam/front/page_exam_question/{code}
 * method post
 */
export interface PageExamQuestionUsingPOSTRequest {
  
  /** 要素细目表code */
  authenticateCode?: string
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
  /** 入库结束时间 */
  storageEndTime?: number
  /** 入库开始时间 */
  storageStartTime?: number
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
 * requestUrl /exam/front/page_exam_question/{code}
 * method post
 */
export interface PageExamQuestionUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspQuestionDetailDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /exam/front/page_question/{code}
 * method post
 */
export interface PageQuestionUsingPOSTRequest {
  
  /** 要素细目表code */
  authenticateCode?: string
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
  /** 入库结束时间 */
  storageEndTime?: number
  /** 入库开始时间 */
  storageStartTime?: number
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
 * requestUrl /exam/front/page_question/{code}
 * method post
 */
export interface PageQuestionUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspQuestionDetailDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /exam/front/set_question_score
 * method post
 */
export interface SetQuestionScoreUsingPOSTRequest {
  
  /** paperCode */
  paperCode?: string
  /** questionCode */
  questionCode?: string
  /** questionType */
  questionType?: number
  /** score */
  score?: string
  /** 用户code */
  userCode?: string
}

/**
 * requestUrl /exam/front/set_question_score
 * method post
 */
export interface SetQuestionScoreUsingPOSTResponse {
  
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
 * requestUrl /exam/front/update
 * method post
 */
export interface UpdateUsingPOST_1Request {
  
  /** 高级设置展示字段 */
  advancedConfig?: string
  /** 要素细目表code */
  authenticateCode?: string
  /** 要素细目表名字 */
  authenticateTitle?: string
  /** 是否题目选项乱序 */
  chaosOptionsState?: number
  /** 是否试卷题目乱序 */
  chaosOrderState?: number
  /** code */
  code?: string
  /** 组卷方式 */
  composition?: string
  /** 自定义字段 */
  customContent?: Record<string | number | symbol, any>
  /** 套题组卷文件code */
  fromFileCode?: string
  /** 套题组卷文件名 */
  fromFileTitle?: string
  /** 是否整卷序号连续 */
  numContinuousState?: number
  /** 组织code */
  organizationCode?: string
  /** 注意事项 */
  precautions?: string
  /** 合格线 */
  qualifiedProp: string
  /** 限制试题引用次数 */
  questionCitedLimit?: string
  /** 指定题型题数 */
  questionConfigList?: QuestionConfigDto
  /** 题型结构 */
  questionStructure?: string
  /** 总题数 */
  questionTotal?: number
  /** 勾选题型至少抽取几种 */
  questionTypeLeast?: number
  /** 限制试题引用次数开启状态 */
  quoteNumStatus?: number
  /** 随机抽取的试题数 */
  randomQuestionNum?: number
  /** 是否随机生成试卷 */
  randomQuestionState?: number
  /** 限制题目入库结束时间 */
  receiptEndTime?: number
  /** 限制题目入库开始时间 */
  receiptStartTime?: number
  /** 已设置的总题数 */
  savedQuestionTotal?: number
  /** 总分 */
  scoreTotal?: string
  /** 分值设置 */
  scoreType?: string
  /** 站点 */
  sid?: number
  /** 建议作答时间 */
  suggestedTime: string
  /** 标签 */
  tags?: string
  /** 组卷模版code */
  templateCode?: string
  /** 组卷模版名称 */
  templateTitle?: string
  /** 模版类型 */
  templateType?: string
  /** 模版名称 */
  title?: string
  /** 是否是真题 */
  trueState?: number
  /** 单题统一分值 */
  unificationScore?: string
  /** 用户code */
  userCode?: string
}

/**
 * requestUrl /exam/front/update
 * method post
 */
export interface UpdateUsingPOST_1Response {
  
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
 * requestUrl /exam/front/update_generate
 * method post
 */
export interface UpdateGenerateUsingPOSTRequest {
  
  /** paperCode */
  paperCode?: string
  /** state */
  state?: number
}

/**
 * requestUrl /exam/front/update_generate
 * method post
 */
export interface UpdateGenerateUsingPOSTResponse {
  
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
 * requestUrl /exam/front/update_precautions
 * method post
 */
export interface UpdatePrecautionsUsingPOSTRequest {
  
  /** paperCode */
  paperCode?: string
  /** 注意事项 */
  precautions?: string
}

/**
 * requestUrl /exam/front/update_precautions
 * method post
 */
export interface UpdatePrecautionsUsingPOSTResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface PagePublishResDto {
  
  /** 发布失败原因 */
  failReasons?: PagePublishReasonResDto
  /**  */
  success?: boolean
}

interface PagePublishReasonResDto {
  
  /** 发布失败原因 */
  reason?: string
}

/**
 * requestUrl /exam/front/update_publish
 * method post
 */
export interface UpdatePublishUsingPOST_1Request {
  
  /** paperCode */
  paperCode?: string
  /** state */
  state?: number
}

/**
 * requestUrl /exam/front/update_publish
 * method post
 */
export interface UpdatePublishUsingPOST_1Response {
  
  /** 响应数据 */
  data?: PagePublishResDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /exam/front/update_reference
 * method post
 */
export interface UpdateReferenceUsingPOSTRequest {
  
  /** paperCode */
  paperCode?: string
  /** state */
  state?: number
}

/**
 * requestUrl /exam/front/update_reference
 * method post
 */
export interface UpdateReferenceUsingPOSTResponse {
  
  /** 响应数据 */
  data?: string
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface TemplateCopyCellDto {
  
  /** 拷贝标题 */
  copyTitle?: string
  /** 自定义字段 */
  customContent?: Record<string | number | symbol, any>
}

interface TemplateCopyResDto {
  
  /** 是否成功 */
  success?: boolean
  /** 返回内容 */
  text?: string
}

/**
 * requestUrl /exam/front/template/copy
 * method post
 */
export interface CopyUsingPOSTRequest {
  
  /** copyList */
  copyList?: TemplateCopyCellDto
  /** paperCode */
  paperCode?: string
  /** 用户code */
  userCode?: string
}

/**
 * requestUrl /exam/front/template/copy
 * method post
 */
export interface CopyUsingPOSTResponse {
  
  /** 响应数据 */
  data?: TemplateCopyResDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /exam/front/template/create
 * method post
 */
export interface CreateUsingPOST_2Request {
  
  /** 高级设置展示字段 */
  advancedConfig?: string
  /** 要素细目表code */
  authenticateCode?: string
  /** 要素细目表名字 */
  authenticateTitle?: string
  /** 是否允许编辑 */
  canEditState?: number
  /** 是否题目选项乱序 */
  chaosOptionsState?: number
  /** 是否试卷题目乱序 */
  chaosOrderState?: number
  /** code */
  code?: string
  /** 组卷方式 */
  composition?: string
  /** 自定义字段 */
  customContent?: Record<string | number | symbol, any>
  /** 套题组卷文件code */
  fromFileCode?: string
  /** 套题组卷文件名 */
  fromFileTitle?: string
  /** 是否整卷序号连续 */
  numContinuousState?: number
  /** 组织code */
  organizationCode?: string
  /** 注意事项 */
  precautions?: string
  /** 合格线 */
  qualifiedProp: string
  /** 限制试题引用次数 */
  questionCitedLimit?: string
  /** 指定题型题数 */
  questionConfigList?: QuestionConfigDto
  /** 题型结构 */
  questionStructure?: string
  /** 总题数 */
  questionTotal?: number
  /** 勾选题型至少抽取几种 */
  questionTypeLeast?: number
  /** 限制试题引用次数开启状态 */
  quoteNumStatus?: number
  /** 随机抽取的试题数 */
  randomQuestionNum?: number
  /** 是否随机生成试卷 */
  randomQuestionState?: number
  /** 限制题目入库结束时间 */
  receiptEndTime?: number
  /** 限制题目入库开始时间 */
  receiptStartTime?: number
  /** 已设置的总题数 */
  savedQuestionTotal?: number
  /** 总分 */
  scoreTotal?: string
  /** 分值设置 */
  scoreType?: string
  /** 站点 */
  sid?: number
  /** 建议作答时间 */
  suggestedTime: string
  /** 标签 */
  tags?: string
  /** 组卷模版code */
  templateCode?: string
  /** 组卷模版名称 */
  templateTitle?: string
  /** 模版类型 */
  templateType?: string
  /** 模版名称 */
  title?: string
  /** 是否是真题 */
  trueState?: number
  /** 单题统一分值 */
  unificationScore?: string
  /** 用户code */
  userCode?: string
}

/**
 * requestUrl /exam/front/template/create
 * method post
 */
export interface CreateUsingPOST_2Response {
  
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
 * requestUrl /exam/front/template/delete
 * method post
 */
export interface DeleteUsingPOST_2Request {
  
  /** paperCode */
  paperCode?: string
}

/**
 * requestUrl /exam/front/template/delete
 * method post
 */
export interface DeleteUsingPOST_2Response {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface TemplateDetailDtoRes {
  
  /** 高级设置展示字段 */
  advancedConfig?: string
  /** 要素细目表code */
  authenticateCode?: string
  /** 要素细目表名字 */
  authenticateTitle?: string
  /** 是否允许编辑 */
  canEditState?: number
  /** 是否题目选项乱序 */
  chaosOptionsState?: number
  /** 是否试卷题目乱序 */
  chaosOrderState?: number
  /**  */
  checkAuth?: boolean
  /**  */
  checkQuestionList?: boolean
  /**  */
  checkQuestionNum?: boolean
  /**  */
  checkQuestionTypeNeedNumber?: boolean
  /**  */
  checkQuestionTypeScore?: boolean
  /**  */
  checkQuestionTypeSocre?: boolean
  /**  */
  checkQuoteNumStatus?: boolean
  /**  */
  checkRandomQuestionNum?: boolean
  /**  */
  checkRules?: boolean
  /**  */
  checkTime?: boolean
  /** code */
  code?: string
  /** 组卷方式 */
  composition?: string
  /** 自定义字段 */
  customContent?: Record<string | number | symbol, any>
  /** 套题组卷文件code */
  fromFileCode?: string
  /** 套题组卷文件名 */
  fromFileTitle?: string
  /**  */
  haveUnificationScore?: boolean
  /** 是否整卷序号连续 */
  numContinuousState?: number
  /** 组织code */
  organizationCode?: string
  /** 注意事项 */
  precautions?: string
  /** 合格线 */
  qualifiedProp: string
  /** 限制试题引用次数 */
  questionCitedLimit?: string
  /** 指定题型题数 */
  questionConfigList?: QuestionConfigDto
  /** 题型结构 */
  questionStructure?: string
  /** 总题数 */
  questionTotal?: number
  /** 勾选题型至少抽取几种 */
  questionTypeLeast?: number
  /** 限制试题引用次数开启状态 */
  quoteNumStatus?: number
  /** 随机抽取的试题数 */
  randomQuestionNum?: number
  /** 是否随机生成试卷 */
  randomQuestionState?: number
  /** 限制题目入库结束时间 */
  receiptEndTime?: number
  /** 限制题目入库开始时间 */
  receiptStartTime?: number
  /** 已设置的总题数 */
  savedQuestionTotal?: number
  /** 总分 */
  scoreTotal?: string
  /** 分值设置 */
  scoreType?: string
  /** 站点 */
  sid?: number
  /** 建议作答时间 */
  suggestedTime: string
  /** 标签 */
  tags?: string
  /** 组卷模版code */
  templateCode?: string
  /** 组卷模版名称 */
  templateTitle?: string
  /** 模版类型 */
  templateType?: string
  /** 模版名称 */
  title?: string
  /** 是否是真题 */
  trueState?: number
  /** 单题统一分值 */
  unificationScore?: string
  /** 用户code */
  userCode?: string
}

/**
 * requestUrl /exam/front/template/detail/{code}
 * method get
 */
export interface DetailUsingGET_3Response {
  
  /** 响应数据 */
  data?: TemplateDetailDtoRes
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspTemplatePageResDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: TemplatePageResDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface TemplatePageResDto {
  
  /** 是否可编辑 */
  canEditState?: number
  /** code */
  code?: string
  /** 组卷方式 */
  composition?: string
  /** 创建人 */
  createBy?: string
  /** 创建时间 */
  createdAt?: number
  /** 自定义查询 */
  customContent?: Record<string | number | symbol, any>
  /** 名称查询 */
  title?: string
  /** 状态 */
  usedState?: number
}

/**
 * requestUrl /exam/front/template/page
 * method post
 */
export interface PageUsingPOST_1Request {
  
  /** 组卷方式 */
  composition?: any[]
  /** 自定义查询 */
  customContent?: Record<string | number | symbol, any>
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 组织code */
  organizationCode?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 标签 */
  tags?: string
  /** 模版查询用站点 */
  templateSid?: number
  /** 名称查询 */
  title?: string
  /** 是否是真题 */
  trueState?: number
  /** 状态 */
  usedState?: any[]
  /** 用户code */
  userCode?: string
}

/**
 * requestUrl /exam/front/template/page
 * method post
 */
export interface PageUsingPOST_1Response {
  
  /** 响应数据 */
  data?: BasePaginationRspTemplatePageResDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /exam/front/template/update
 * method post
 */
export interface UpdateUsingPOST_2Request {
  
  /** 高级设置展示字段 */
  advancedConfig?: string
  /** 要素细目表code */
  authenticateCode?: string
  /** 要素细目表名字 */
  authenticateTitle?: string
  /** 是否允许编辑 */
  canEditState?: number
  /** 是否题目选项乱序 */
  chaosOptionsState?: number
  /** 是否试卷题目乱序 */
  chaosOrderState?: number
  /** code */
  code?: string
  /** 组卷方式 */
  composition?: string
  /** 自定义字段 */
  customContent?: Record<string | number | symbol, any>
  /** 套题组卷文件code */
  fromFileCode?: string
  /** 套题组卷文件名 */
  fromFileTitle?: string
  /** 是否整卷序号连续 */
  numContinuousState?: number
  /** 组织code */
  organizationCode?: string
  /** 注意事项 */
  precautions?: string
  /** 合格线 */
  qualifiedProp: string
  /** 限制试题引用次数 */
  questionCitedLimit?: string
  /** 指定题型题数 */
  questionConfigList?: QuestionConfigDto
  /** 题型结构 */
  questionStructure?: string
  /** 总题数 */
  questionTotal?: number
  /** 勾选题型至少抽取几种 */
  questionTypeLeast?: number
  /** 限制试题引用次数开启状态 */
  quoteNumStatus?: number
  /** 随机抽取的试题数 */
  randomQuestionNum?: number
  /** 是否随机生成试卷 */
  randomQuestionState?: number
  /** 限制题目入库结束时间 */
  receiptEndTime?: number
  /** 限制题目入库开始时间 */
  receiptStartTime?: number
  /** 已设置的总题数 */
  savedQuestionTotal?: number
  /** 总分 */
  scoreTotal?: string
  /** 分值设置 */
  scoreType?: string
  /** 站点 */
  sid?: number
  /** 建议作答时间 */
  suggestedTime: string
  /** 标签 */
  tags?: string
  /** 组卷模版code */
  templateCode?: string
  /** 组卷模版名称 */
  templateTitle?: string
  /** 模版类型 */
  templateType?: string
  /** 模版名称 */
  title?: string
  /** 是否是真题 */
  trueState?: number
  /** 单题统一分值 */
  unificationScore?: string
  /** 用户code */
  userCode?: string
}

/**
 * requestUrl /exam/front/template/update
 * method post
 */
export interface UpdateUsingPOST_2Response {
  
  /** 响应数据 */
  data?: string
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}