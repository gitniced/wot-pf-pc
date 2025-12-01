
/**
 * 如果遇到bug，您可以钉钉搜索封东其或者给 fengdongqi@hzwotu.com 邮箱发邮件
 * 欢迎大家提 issue 或者 PR。
 * @title 沃土就业服务
 * @description 沃土就业服务是一个 Spring Boot项目
 * @version v1.0
 **/


/**
 * requestUrl /job/candidate/change_join_time
 * method post
 */
export interface ChangeJoinTimeUsingPOSTRequest {
  
  /** 二级版本id */
  bizCode?: string
  /** 入职时间 枚举  根据join_time获取 */
  joinTime: number
  /** 求职者版本key */
  openKey?: string
}

/**
 * requestUrl /job/candidate/change_join_time
 * method post
 */
export interface ChangeJoinTimeUsingPOSTResponse {
  
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface HobbyCertificateDto {
  
  /** 二级版本id */
  bizCode?: string
  /** 资格证书 */
  certificateList?: any[]
  /** 自我描述 */
  description?: string
  /** 兴趣爱好 */
  hobbyList?: any[]
  /** 语言能力 */
  languageSkill?: string
  /** 用户版本key */
  openKey?: string
}

/**
 * requestUrl /job/candidate/get_hobby_certificate
 * method post
 */
export interface GetUserHobbyCertificateUsingPOSTRequest {
  
  /** 二级版本id */
  bizCode?: string
  /** 求职者版本key */
  openKey?: string
}

/**
 * requestUrl /job/candidate/get_hobby_certificate
 * method post
 */
export interface GetUserHobbyCertificateUsingPOSTResponse {
  
  /** 响应数据 */
  data?: HobbyCertificateDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface CandidateDto {
  
  /** 地址 */
  address: string
  /** 年龄 */
  age: number
  /** 头像 */
  avatar: string
  /** 二级版本id */
  bizCode?: string
  /** 城市 */
  city: string
  /** 城市名称 */
  cityName?: string
  /** 求职者编码 */
  code?: string
  /** 自我描述 */
  description: string
  /** 邮箱 */
  email: string
  /** 性别 1男  2女 */
  gender: number
  /** 入职时间 枚举 根据 join_time 获取 */
  joinTime: number
  /** 语言能力 */
  languageSkill: string
  /** 联系电话 */
  mobile: string
  /** 姓名 */
  name: string
  /** 求职者版本号key */
  openKey?: string
  /** 政治面貌 枚举 根据 political 获取 */
  political?: number
  /** 政治面貌名称 */
  politicalName?: string
  /** 省份 */
  province: string
  /** 省份名称 */
  provinceName?: string
  /** 更新时间 */
  updatedAt?: string
  /**  */
  userCode?: string
  /**  工作经验年限 枚举 根据 work_experience获取 */
  workExperience: number
}

/**
 * requestUrl /job/candidate/info
 * method post
 */
export interface InfoUsingPOSTRequest {
  
  /** 二级版本id */
  bizCode?: string
  /** 求职者版本key */
  openKey?: string
}

/**
 * requestUrl /job/candidate/info
 * method post
 */
export interface InfoUsingPOSTResponse {
  
  /** 响应数据 */
  data?: CandidateDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /job/candidate/save
 * method post
 */
export interface SaveUsingPOSTRequest {
  
  /** 地址 */
  address: string
  /** 年龄 */
  age: number
  /** 头像 */
  avatar: string
  /** 二级版本id */
  bizCode?: string
  /** 城市 */
  city: string
  /** 邮箱 */
  email: string
  /** 性别 1男  2女 */
  gender: number
  /** 联系电话 */
  mobile: string
  /** 姓名 */
  name: string
  /** 求职者版本号key */
  openKey?: string
  /** 政治面貌 */
  political?: number
  /** 省份 */
  province: string
  /**  工作经验年限 枚举 根据 work_experience获取 */
  workExperience: number
}

/**
 * requestUrl /job/candidate/save
 * method post
 */
export interface SaveUsingPOSTResponse {
  
  /** 响应数据 */
  data?: CandidateDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /job/candidate/save_hobby_certificate
 * method post
 */
export interface SaveUserHobbyCertificateUsingPOSTRequest {
  
  /** 二级版本id */
  bizCode?: string
  /** 资格证书 */
  certificateList?: any[]
  /** 自我描述 */
  description?: string
  /** 兴趣爱好 */
  hobbyList?: any[]
  /** 语言能力 */
  languageSkill?: string
  /** 用户版本key */
  openKey?: string
}

/**
 * requestUrl /job/candidate/save_hobby_certificate
 * method post
 */
export interface SaveUserHobbyCertificateUsingPOSTResponse {
  
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /job/hobby/save_certificate
 * method post
 */
export interface SaveUserCertificateListUsingPOSTRequest {
  
  /** 二级版本id */
  bizCode?: string
  /** 数据 */
  list?: any[]
  /** 求职者版本key */
  openKey?: string
}

/**
 * requestUrl /job/hobby/save_certificate
 * method post
 */
export interface SaveUserCertificateListUsingPOSTResponse {
  
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /job/hobby/save_hobby
 * method post
 */
export interface SaveUserHobbyListUsingPOSTRequest {
  
  /** 二级版本id */
  bizCode?: string
  /** 数据 */
  list?: any[]
  /** 求职者版本key */
  openKey?: string
}

/**
 * requestUrl /job/hobby/save_hobby
 * method post
 */
export interface SaveUserHobbyListUsingPOSTResponse {
  
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /job/job/deliver
 * method post
 */
export interface DeliverUsingPOSTRequest {
  
  /** 二级版本id */
  bizCode?: string
  /** 职位编码 */
  jobCode: string
  /** 求职者版本key */
  openKey?: string
  /** 附件编码 */
  resumeFileCode: string
}

/**
 * requestUrl /job/job/deliver
 * method post
 */
export interface DeliverUsingPOSTResponse {
  
  /** 响应数据 */
  data?: boolean
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface DeliverHistoryResponseDto {
  
  /** 投递时间 */
  deliverDate?: string
  /** 时间 */
  deliverTimeStr?: string
  /** 投递详情 */
  list?: DeliverHistoryItemDto
}

interface DeliverHistoryItemDto {
  
  /** 日期时间 */
  deliverDate?: string
  /** 时间 */
  deliverTime?: string
  /** 投递uuid */
  deliverUuid?: string
  /** 职位详情 */
  jobDetail?: JobDetailDto
  /** 投递状态 */
  status?: string
}

interface JobDetailDto {
  
  /** 地址 */
  address?: string
  /** 职位亮点 */
  attraction?: any[]
  /** 是否转正（枚举：'面议'、'提供转正'、'不提供转正'） */
  chance?: string
  /** 城市 */
  city?: string
  /** 公司名称 */
  cname?: string
  /** 职位编码 */
  code?: string
  /** 企业状态 */
  companyStatus?: string
  /** 企业uuid */
  cuuid?: string
  /** 每周实习天数 */
  day?: number
  /** 学历要求 */
  degree?: string
  /** 是否投递(0-否1-是) */
  delivered?: string
  /** 招聘对象 */
  hopeYou?: any[]
  /** 职位行业 */
  industry?: string
  /** 职位描述 */
  info?: string
  /** 职位描述是否为html */
  infoIsHtml?: boolean
  /** 是否融资 */
  isOnStock?: boolean
  /** 纬度 */
  lat?: number
  /** 经度 */
  lng?: number
  /** 公司logo */
  logo?: string
  /** 最大薪资 */
  maxsal?: string
  /** 最小薪资 */
  minsal?: string
  /** 实习几个月 */
  month?: number
  /** 职位名称 */
  name?: string
  /** 职位是否失效(0-否1-是) */
  overdue?: string
  /** 职位刷新时间 */
  refresh?: string
  /** 需求简历语言(中文/英文) */
  reslan?: string
  /** 薪资描述 */
  salaryDesc?: string
  /** 公司规模 */
  scale?: string
  /** 技能要求 */
  skills?: any[]
  /** 融资状态 */
  stockStatus?: string
  /** 警告提示 */
  tips?: string
  /** 对应实习僧url */
  url?: string
  /** 职位类型（0-实习1-校招） */
  xiaoZhaoType?: number
}

/**
 * requestUrl /job/job/deliver_history
 * method post
 */
export interface GetSxsDeliverHistoryUsingPOSTRequest {
  
  /** 二级版本id */
  bizCode?: string
  /** 求职者版本key */
  openKey?: string
}

/**
 * requestUrl /job/job/deliver_history
 * method post
 */
export interface GetSxsDeliverHistoryUsingPOSTResponse {
  
  /** 响应数据 */
  data?: DeliverHistoryResponseDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /job/job/detail
 * method post
 */
export interface DetailUsingPOSTRequest {
  
  /** 二级版本id */
  bizCode?: string
  /** 职位编码 */
  code: string
  /** 求职者版本key */
  openKey?: string
}

/**
 * requestUrl /job/job/detail
 * method post
 */
export interface DetailUsingPOSTResponse {
  
  /** 响应数据 */
  data?: JobDetailDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /job/job/get_ai_interview_report/{interviewId}
 * method get
 */
export interface GetAiInterviewReportUsingGETResponse {
  
  /** 响应数据 */
  data?: string
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface BasePaginationRspJobSearchItemDto {
  
  /** 当前页码 */
  currentPage?: number
  /** 数据 */
  data?: JobSearchItemDto
  /** 每页记录数 */
  pageSize?: number
  /** 总页数 */
  pages?: number
  /** 总数 */
  totalCount?: number
}

interface JobSearchItemDto {
  
  /** 职位亮点 */
  attraction?: any[]
  /** 城市 */
  city?: string
  /** 职位编码 */
  code?: string
  /** 公司名称 */
  company?: string
  /** 公司uuid */
  companyUuid?: string
  /**  */
  ctags?: any[]
  /** 日期 */
  date?: string
  /** 日期字符串 */
  dateStr?: string
  /** 每周可以到几天 */
  dayPerWeek?: number
  /** 学历 */
  degree?: string
  /** 是否投递 */
  delivered?: boolean
  /** 招聘对象 */
  hopeYou?: any[]
  /** 行业 */
  industry?: string
  /** 融资状态 */
  ipo?: string
  /** 是否融资 */
  isOnStock?: boolean
  /** 职位名称 */
  job?: string
  /** 公司logo */
  logo?: string
  /** 最大薪资 */
  maxSalary?: number
  /** 最小薪资 */
  minSalary?: number
  /** 实习几个月 */
  monthNum?: number
  /** 薪资描述 */
  salaryDesc?: string
  /** 公司规模 */
  scale?: string
  /** 融资状态 */
  stockStatus?: string
  /** 是否校招（0不是1是） */
  xiaoZhaoType?: number
}

/**
 * requestUrl /job/job/search_job
 * method post
 */
export interface SearchUsingPOSTRequest {
  
  /** 城市名称 */
  city?: string
  /** 学历 多选用|隔开 */
  degree?: string
  /** 关键词 */
  keyword?: string
  /** 升降序规则,ASC或DESC */
  order?: string
  /** 排序字段 */
  orderBy?: string
  /** 页码，从1开始数，默认是1 */
  pageNo?: number
  /** 单页显示数量，默认是10 */
  pageSize?: number
  /** 公司规模 多选用|隔开 */
  scale?: string
  /** 求职意向  1全职  2实习 */
  type?: string
}

/**
 * requestUrl /job/job/search_job
 * method post
 */
export interface SearchUsingPOSTResponse {
  
  /** 响应数据 */
  data?: BasePaginationRspJobSearchItemDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface DemoAiInterviewResDto {
  
  /** ai面试id */
  id?: string
  /** ai面试token */
  token?: string
}

/**
 * requestUrl /job/job/start_ai_interview_demo
 * method get
 */
export interface StartAiInterviewDemoUsingGETResponse {
  
  /** 响应数据 */
  data?: DemoAiInterviewResDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface IMRegisterResultDto {
  
  /** 网易云信账号id */
  accId?: string
  /** 网易云信昵称 */
  name?: string
  /** 网易云信token */
  token?: string
}

/**
 * requestUrl /job/register/register_im/{mobile}
 * method get
 */
export interface RegisterIMUsingGETResponse {
  
  /** 响应数据 */
  data?: IMRegisterResultDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /job/register/send
 * method post
 */
export interface SendMessageUsingPOSTRequest {
  
  /** 发送者网易云信账号id */
  from?: string
  /** 消息 */
  message?: string
  /** 接受者网易云信账号id */
  to?: string
}

/**
 * requestUrl /job/register/send
 * method post
 */
export interface SendMessageUsingPOSTResponse {
  
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /job/resume/cover
 * method post
 */
export interface CoverResumeUsingPOSTRequest {
  
  /** 二级版本id */
  bizCode?: string
  /** 求职者版本key */
  openKey?: string
}

/**
 * requestUrl /job/resume/cover
 * method post
 */
export interface CoverResumeUsingPOSTResponse {
  
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /job/resume/create_resume_file
 * method post
 */
export interface CreateResumeFileUsingPOSTRequest {
  
  /** 二级版本id */
  bizCode?: string
  /** cookie */
  customCookies: Record<string | number | symbol, any>
  /** localstorage 信息 */
  customLocalstorages: Record<string | number | symbol, any>
  /** 用户版本key */
  openKey?: string
  /** 简历url */
  url: string
}

/**
 * requestUrl /job/resume/create_resume_file
 * method post
 */
export interface CreateResumeFileUsingPOSTResponse {
  
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
 * requestUrl /job/resume/delete
 * method post
 */
export interface DeleteResumeFileUsingPOSTRequest {
  
  /** 二级版本id */
  bizCode?: string
  /** 唯一编码 */
  code: string
  /** 用户版本key */
  openKey?: string
}

/**
 * requestUrl /job/resume/delete
 * method post
 */
export interface DeleteResumeFileUsingPOSTResponse {
  
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /job/resume/delete_education
 * method post
 */
export interface DeleteEducationUsingPOSTRequest {
  
  /** 二级版本id */
  bizCode?: string
  /** 唯一编码 */
  code: string
  /** 用户版本key */
  openKey?: string
}

/**
 * requestUrl /job/resume/delete_education
 * method post
 */
export interface DeleteEducationUsingPOSTResponse {
  
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /job/resume/delete_job_expect
 * method post
 */
export interface SaveJobExpectUsingPOSTRequest {
  
  /** 二级版本id */
  bizCode?: string
  /** 期望编码 */
  code: string
  /** 用户版本key */
  openKey?: string
}

/**
 * requestUrl /job/resume/delete_job_expect
 * method post
 */
export interface SaveJobExpectUsingPOSTResponse {
  
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /job/resume/delete_practice_experience
 * method post
 */
export interface DeletePracticeExperienceUsingPOSTRequest {
  
  /** 二级版本id */
  bizCode?: string
  /** 唯一编码 */
  code: string
  /** 用户版本key */
  openKey?: string
}

/**
 * requestUrl /job/resume/delete_practice_experience
 * method post
 */
export interface DeletePracticeExperienceUsingPOSTResponse {
  
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /job/resume/delete_project_experience
 * method post
 */
export interface DeleteProjectExperienceUsingPOSTRequest {
  
  /** 二级版本id */
  bizCode?: string
  /** 唯一编码 */
  code: string
  /** 用户版本key */
  openKey?: string
}

/**
 * requestUrl /job/resume/delete_project_experience
 * method post
 */
export interface DeleteProjectExperienceUsingPOSTResponse {
  
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /job/resume/delete_school_experience
 * method post
 */
export interface DeleteSchoolExperienceUsingPOSTRequest {
  
  /** 二级版本id */
  bizCode?: string
  /** 唯一编码 */
  code: string
  /** 用户版本key */
  openKey?: string
}

/**
 * requestUrl /job/resume/delete_school_experience
 * method post
 */
export interface DeleteSchoolExperienceUsingPOSTResponse {
  
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /job/resume/delete_work_experience
 * method post
 */
export interface DeleteWorkExperienceUsingPOSTRequest {
  
  /** 二级版本id */
  bizCode?: string
  /** 唯一编码 */
  code: string
  /** 用户版本key */
  openKey?: string
}

/**
 * requestUrl /job/resume/delete_work_experience
 * method post
 */
export interface DeleteWorkExperienceUsingPOSTResponse {
  
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface EducationDto {
  
  /** 二级版本id */
  bizCode?: string
  /** 教育经历编码 */
  code?: string
  /** 主修课程描述 */
  courseDesc?: string
  /** 学历 */
  degree: number
  /** 学历名称 */
  degreeName?: string
  /** 学制  1全日制 2非全日制 */
  degreeType?: number
  /** 结束时间 */
  endTime?: string
  /** 院校名称 */
  name: string
  /** 用户版本key */
  openKey?: string
  /** 专业名称 */
  profession: string
  /** 专业编码 */
  professionCode?: string
  /** 专业成绩描述 */
  professionDesc?: string
  /** 校园经历 */
  schoolExperience?: string
  /** 开始时间 */
  startTime: string
}

/**
 * requestUrl /job/resume/get_education
 * method post
 */
export interface GetEducationByCodeUsingPOSTRequest {
  
  /** 二级版本id */
  bizCode?: string
  /** 唯一编码 */
  code: string
  /** 用户版本key */
  openKey?: string
}

/**
 * requestUrl /job/resume/get_education
 * method post
 */
export interface GetEducationByCodeUsingPOSTResponse {
  
  /** 响应数据 */
  data?: EducationDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /job/resume/get_education_list
 * method post
 */
export interface GetUserEducationUsingPOSTRequest {
  
  /** 二级版本id */
  bizCode?: string
  /** 求职者版本key */
  openKey?: string
}

/**
 * requestUrl /job/resume/get_education_list
 * method post
 */
export interface GetUserEducationUsingPOSTResponse {
  
  /** 响应数据 */
  data?: EducationDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface JobExpectDto {
  
  /** 期望职位id */
  capacityId: number
  /** 期望职位名称 */
  capacityName: string
  /** 城市 */
  city: string
  /** 城市名称 */
  cityName?: string
  /** 期望编码 */
  code?: string
  /** 最高薪资 */
  maxSalary: number
  /** 最低薪资 */
  minSalary: number
  /** 用户版本key */
  openKey?: string
  /** 类型 1全职 2兼职 */
  type: number
  /** 更新时间 */
  updatedAt?: string
  /** 工作区域 */
  workArea: number
}

/**
 * requestUrl /job/resume/get_job_expect
 * method post
 */
export interface GetJobExpectByCodeUsingPOSTRequest {
  
  /** 二级版本id */
  bizCode?: string
  /** 唯一编码 */
  code: string
  /** 用户版本key */
  openKey?: string
}

/**
 * requestUrl /job/resume/get_job_expect
 * method post
 */
export interface GetJobExpectByCodeUsingPOSTResponse {
  
  /** 响应数据 */
  data?: JobExpectDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /job/resume/get_job_expect_list
 * method post
 */
export interface GetCandidateExpectUsingPOSTRequest {
  
  /** 二级版本id */
  bizCode?: string
  /** 求职者版本key */
  openKey?: string
}

/**
 * requestUrl /job/resume/get_job_expect_list
 * method post
 */
export interface GetCandidateExpectUsingPOSTResponse {
  
  /** 响应数据 */
  data?: JobExpectDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface NewResumeFileDto {
  
  /** 附件编码 */
  code?: string
  /** 文件名称 */
  fileName?: string
  /** 最近编辑时间 */
  lastTime?: string
}

/**
 * requestUrl /job/resume/get_new_info
 * method post
 */
export interface GetNewResumeFileInfoUsingPOSTRequest {
  
  /** 二级版本id */
  bizCode?: string
  /** 用户版本key */
  openKey?: string
}

/**
 * requestUrl /job/resume/get_new_info
 * method post
 */
export interface GetNewResumeFileInfoUsingPOSTResponse {
  
  /** 响应数据 */
  data?: NewResumeFileDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface PracticeExperienceDto {
  
  /** 二级版本id */
  bizCode?: string
  /** 职位id */
  capacityId?: number
  /** 实习经验编码 */
  code?: string
  /** 实习内容 */
  description?: string
  /** 结束时间 */
  endTime?: string
  /** 职位 */
  job: string
  /** 公司名称 */
  name: string
  /** 用户版本key */
  openKey?: string
  /** 工作业绩 */
  performance?: string
  /** 拥有技能 */
  skill?: string
  /** 开始时间 */
  startTime: string
}

/**
 * requestUrl /job/resume/get_practice_experience
 * method post
 */
export interface GetPracticeExperienceByCodeUsingPOSTRequest {
  
  /** 二级版本id */
  bizCode?: string
  /** 唯一编码 */
  code: string
  /** 用户版本key */
  openKey?: string
}

/**
 * requestUrl /job/resume/get_practice_experience
 * method post
 */
export interface GetPracticeExperienceByCodeUsingPOSTResponse {
  
  /** 响应数据 */
  data?: PracticeExperienceDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface ProjectExperienceDto {
  
  /** 二级版本id */
  bizCode?: string
  /** 项目经验编码 */
  code?: string
  /** 项目描述 */
  description?: string
  /** 结束时间 */
  endTime?: string
  /** 职位 */
  job: string
  /** 公司名称 */
  name: string
  /** 用户版本key */
  openKey?: string
  /** 开始时间 */
  startTime: string
}

/**
 * requestUrl /job/resume/get_project_experience
 * method post
 */
export interface GetProjectExperienceByCodeUsingPOSTRequest {
  
  /** 二级版本id */
  bizCode?: string
  /** 唯一编码 */
  code: string
  /** 用户版本key */
  openKey?: string
}

/**
 * requestUrl /job/resume/get_project_experience
 * method post
 */
export interface GetProjectExperienceByCodeUsingPOSTResponse {
  
  /** 响应数据 */
  data?: ProjectExperienceDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface SchoolExperienceDto {
  
  /** 二级版本id */
  bizCode?: string
  /** 校园经历编码 */
  code?: string
  /** 结束时间 */
  endTime?: string
  /** 职位 */
  job: string
  /** 经历名称 */
  name: string
  /** 用户版本key */
  openKey?: string
  /** 开始时间 */
  startTime: string
}

/**
 * requestUrl /job/resume/get_school_experience
 * method post
 */
export interface GetSchoolExperienceByCodeUsingPOSTRequest {
  
  /** 二级版本id */
  bizCode?: string
  /** 唯一编码 */
  code: string
  /** 用户版本key */
  openKey?: string
}

/**
 * requestUrl /job/resume/get_school_experience
 * method post
 */
export interface GetSchoolExperienceByCodeUsingPOSTResponse {
  
  /** 响应数据 */
  data?: SchoolExperienceDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface WorkExperienceDto {
  
  /** 二级版本id */
  bizCode?: string
  /** 工作经验编码 */
  code?: string
  /** 职责描述 */
  description?: string
  /** 结束时间 */
  endTime?: string
  /** 职位 */
  job: string
  /** 公司名称 */
  name: string
  /** 用户版本key */
  openKey?: string
  /** 开始时间 */
  startTime: string
}

/**
 * requestUrl /job/resume/get_work_experience
 * method post
 */
export interface GetWorkExperienceByCodeUsingPOSTRequest {
  
  /** 二级版本id */
  bizCode?: string
  /** 唯一编码 */
  code: string
  /** 用户版本key */
  openKey?: string
}

/**
 * requestUrl /job/resume/get_work_experience
 * method post
 */
export interface GetWorkExperienceByCodeUsingPOSTResponse {
  
  /** 响应数据 */
  data?: WorkExperienceDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface ResumeFileDto {
  
  /** 候选人编码 */
  candidateCode?: string
  /** 编码 */
  code?: string
  /** 创建时间 */
  createdAt?: string
  /** 文件名 */
  fileName?: string
  /** 文件地址 */
  fileUrl?: string
  /** 更新时间 */
  updatedAt?: string
}

/**
 * requestUrl /job/resume/list
 * method post
 */
export interface GetResumeFileListUsingPOSTRequest {
  
  /** 二级版本id */
  bizCode?: string
  /** 求职者版本key */
  openKey?: string
}

/**
 * requestUrl /job/resume/list
 * method post
 */
export interface GetResumeFileListUsingPOSTResponse {
  
  /** 响应数据 */
  data?: ResumeFileDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /job/resume/practice_experience_list
 * method post
 */
export interface GetPracticeExperienceListUsingPOSTRequest {
  
  /** 二级版本id */
  bizCode?: string
  /** 求职者版本key */
  openKey?: string
}

/**
 * requestUrl /job/resume/practice_experience_list
 * method post
 */
export interface GetPracticeExperienceListUsingPOSTResponse {
  
  /** 响应数据 */
  data?: PracticeExperienceDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /job/resume/project_experience_list
 * method post
 */
export interface GetProjectExperienceListUsingPOSTRequest {
  
  /** 二级版本id */
  bizCode?: string
  /** 求职者版本key */
  openKey?: string
}

/**
 * requestUrl /job/resume/project_experience_list
 * method post
 */
export interface GetProjectExperienceListUsingPOSTResponse {
  
  /** 响应数据 */
  data?: ProjectExperienceDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /job/resume/rename
 * method post
 */
export interface ReNameResumeFileUsingPOSTRequest {
  
  /** 二级版本id */
  bizCode?: string
  /** 编码 */
  code: string
  /** 名称 */
  name: string
  /** 求职者版本key */
  openKey?: string
}

/**
 * requestUrl /job/resume/rename
 * method post
 */
export interface ReNameResumeFileUsingPOSTResponse {
  
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface ResumeDto {
  
  /** 求职者基本信息 */
  candidate?: CandidateDto
  /** 教育经历 */
  educationList?: EducationDto
  /** 兴趣爱好+证书信息 */
  hobbyCertificate?: HobbyCertificateDto
  /** 求职期望 */
  jobExpectList?: JobExpectDto
  /** 实习经验 */
  practiceExperienceList?: PracticeExperienceDto
  /** 项目经验 */
  projectExperienceList?: ProjectExperienceDto
  /** 校园经历 */
  schoolExperienceList?: SchoolExperienceDto
  /** 更新时间 */
  updatedAt?: string
  /** 工作经验 */
  workExperienceList?: WorkExperienceDto
}

/**
 * requestUrl /job/resume/resume_detail
 * method post
 */
export interface GetResumeDetailUsingPOSTRequest {
  
  /** 二级版本id */
  bizCode?: string
  /** 求职者版本key */
  openKey?: string
}

/**
 * requestUrl /job/resume/resume_detail
 * method post
 */
export interface GetResumeDetailUsingPOSTResponse {
  
  /** 响应数据 */
  data?: ResumeDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /job/resume/save_education
 * method post
 */
export interface SaveEducationUsingPOSTRequest {
  
  /** 二级版本id */
  bizCode?: string
  /** 教育经历编码 */
  code?: string
  /** 主修课程描述 */
  courseDesc?: string
  /** 学历 */
  degree: number
  /** 学历名称 */
  degreeName?: string
  /** 学制  1全日制 2非全日制 */
  degreeType?: number
  /** 结束时间 */
  endTime?: string
  /** 院校名称 */
  name: string
  /** 用户版本key */
  openKey?: string
  /** 专业名称 */
  profession: string
  /** 专业编码 */
  professionCode?: string
  /** 专业成绩描述 */
  professionDesc?: string
  /** 校园经历 */
  schoolExperience?: string
  /** 开始时间 */
  startTime: string
}

/**
 * requestUrl /job/resume/save_education
 * method post
 */
export interface SaveEducationUsingPOSTResponse {
  
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /job/resume/save_job_expect
 * method post
 */
export interface SaveJobExpectUsingPOST_1Request {
  
  /** 期望职位id */
  capacityId: number
  /** 期望职位名称 */
  capacityName: string
  /** 城市 */
  city: string
  /** 城市名称 */
  cityName?: string
  /** 期望编码 */
  code?: string
  /** 最高薪资 */
  maxSalary: number
  /** 最低薪资 */
  minSalary: number
  /** 用户版本key */
  openKey?: string
  /** 类型 1全职 2兼职 */
  type: number
  /** 更新时间 */
  updatedAt?: string
  /** 工作区域 */
  workArea: number
}

/**
 * requestUrl /job/resume/save_job_expect
 * method post
 */
export interface SaveJobExpectUsingPOST_1Response {
  
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /job/resume/save_practice_experience
 * method post
 */
export interface SavePracticeExperienceUsingPOSTRequest {
  
  /** 二级版本id */
  bizCode?: string
  /** 职位id */
  capacityId?: number
  /** 实习经验编码 */
  code?: string
  /** 实习内容 */
  description?: string
  /** 结束时间 */
  endTime?: string
  /** 职位 */
  job: string
  /** 公司名称 */
  name: string
  /** 用户版本key */
  openKey?: string
  /** 工作业绩 */
  performance?: string
  /** 拥有技能 */
  skill?: string
  /** 开始时间 */
  startTime: string
}

/**
 * requestUrl /job/resume/save_practice_experience
 * method post
 */
export interface SavePracticeExperienceUsingPOSTResponse {
  
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /job/resume/save_project_experience
 * method post
 */
export interface SaveProjectExperienceUsingPOSTRequest {
  
  /** 二级版本id */
  bizCode?: string
  /** 项目经验编码 */
  code?: string
  /** 项目描述 */
  description?: string
  /** 结束时间 */
  endTime?: string
  /** 职位 */
  job: string
  /** 公司名称 */
  name: string
  /** 用户版本key */
  openKey?: string
  /** 开始时间 */
  startTime: string
}

/**
 * requestUrl /job/resume/save_project_experience
 * method post
 */
export interface SaveProjectExperienceUsingPOSTResponse {
  
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /job/resume/save_school_experience
 * method post
 */
export interface SaveSchoolExperienceUsingPOSTRequest {
  
  /** 二级版本id */
  bizCode?: string
  /** 校园经历编码 */
  code?: string
  /** 结束时间 */
  endTime?: string
  /** 职位 */
  job: string
  /** 经历名称 */
  name: string
  /** 用户版本key */
  openKey?: string
  /** 开始时间 */
  startTime: string
}

/**
 * requestUrl /job/resume/save_school_experience
 * method post
 */
export interface SaveSchoolExperienceUsingPOSTResponse {
  
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /job/resume/save_work_experience
 * method post
 */
export interface SaveWorkExperienceUsingPOSTRequest {
  
  /** 二级版本id */
  bizCode?: string
  /** 工作经验编码 */
  code?: string
  /** 职责描述 */
  description?: string
  /** 结束时间 */
  endTime?: string
  /** 职位 */
  job: string
  /** 公司名称 */
  name: string
  /** 用户版本key */
  openKey?: string
  /** 开始时间 */
  startTime: string
}

/**
 * requestUrl /job/resume/save_work_experience
 * method post
 */
export interface SaveWorkExperienceUsingPOSTResponse {
  
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /job/resume/school_experience_list
 * method post
 */
export interface GetSchoolExperienceListUsingPOSTRequest {
  
  /** 二级版本id */
  bizCode?: string
  /** 求职者版本key */
  openKey?: string
}

/**
 * requestUrl /job/resume/school_experience_list
 * method post
 */
export interface GetSchoolExperienceListUsingPOSTResponse {
  
  /** 响应数据 */
  data?: SchoolExperienceDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /job/resume/send_record
 * method post
 */
export interface SendResumeFileEmailUsingPOSTRequest {
  
  /** 邮箱地址 */
  account: string
  /** 文件名 */
  fileName: string
  /** 文件url */
  url: string
}

/**
 * requestUrl /job/resume/send_record
 * method post
 */
export interface SendResumeFileEmailUsingPOSTResponse {
  
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
 * requestUrl /job/resume/send_resume_email
 * method post
 */
export interface SendResumeFileEmailUsingPOST_1Request {
  
  /** 邮箱地址 */
  account: string
  /** 二级版本id */
  bizCode?: string
  /** cookie */
  customCookies: Record<string | number | symbol, any>
  /** localstorage 信息 */
  customLocalstorages: Record<string | number | symbol, any>
  /** 用户版本key */
  openKey?: string
  /** 简历url */
  url: string
}

/**
 * requestUrl /job/resume/send_resume_email
 * method post
 */
export interface SendResumeFileEmailUsingPOST_1Response {
  
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
 * requestUrl /job/resume/work_experience_list
 * method post
 */
export interface GetWorkExperienceListUsingPOSTRequest {
  
  /** 二级版本id */
  bizCode?: string
  /** 求职者版本key */
  openKey?: string
}

/**
 * requestUrl /job/resume/work_experience_list
 * method post
 */
export interface GetWorkExperienceListUsingPOSTResponse {
  
  /** 响应数据 */
  data?: WorkExperienceDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface ResumeMenuConfigDto {
  
  /** 是否基础模块 */
  base: boolean
  /** 模块key */
  key: string
  /** 开启状态  0关闭 1开启 */
  open: number
  /** 排序 */
  sort: number
  /** 模块名称 */
  title: string
}

/**
 * requestUrl /job/resume_menu/menu_config
 * method post
 */
export interface GetMenuConfigUsingPOSTRequest {
  
  /** 二级版本id */
  bizCode?: string
  /** 求职者版本key */
  openKey?: string
}

/**
 * requestUrl /job/resume_menu/menu_config
 * method post
 */
export interface GetMenuConfigUsingPOSTResponse {
  
  /** 响应数据 */
  data?: ResumeMenuConfigDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /job/resume_menu/save_config
 * method post
 */
export interface SaveMenuConfigUsingPOSTRequest {
  
  /** 二级版本id */
  bizCode?: string
  /** 各配置模块 */
  list: ResumeMenuConfigDto
  /** 求职者版本key */
  openKey?: string
}

/**
 * requestUrl /job/resume_menu/save_config
 * method post
 */
export interface SaveMenuConfigUsingPOSTResponse {
  
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /job/resume_sdk/get_job_expect_list
 * method post
 */
export interface GetCandidateExpectUsingPOST_1Request {
  
  /** 二级版本id */
  bizCode: string
  /** 求职者版本key */
  openKey: string
  /** 用户编码 */
  userCode?: string
}

/**
 * requestUrl /job/resume_sdk/get_job_expect_list
 * method post
 */
export interface GetCandidateExpectUsingPOST_1Response {
  
  /** 响应数据 */
  data?: JobExpectDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /job/resume_sdk/resume_detail
 * method post
 */
export interface GetResumeDetailUsingPOST_1Request {
  
  /** 二级版本id */
  bizCode: string
  /** 求职者版本key */
  openKey: string
  /** 用户编码 */
  userCode?: string
}

/**
 * requestUrl /job/resume_sdk/resume_detail
 * method post
 */
export interface GetResumeDetailUsingPOST_1Response {
  
  /** 响应数据 */
  data?: ResumeDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

/**
 * requestUrl /job/resume_sdk/resume_file_list
 * method post
 */
export interface ResumeFileListUsingPOSTRequest {
  
  /** 二级版本id */
  bizCode: string
  /** 求职者版本key */
  openKey: string
  /** 用户编码 */
  userCode?: string
}

/**
 * requestUrl /job/resume_sdk/resume_file_list
 * method post
 */
export interface ResumeFileListUsingPOSTResponse {
  
  /** 响应数据 */
  data?: ResumeFileDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface ResumeSDKDto {
  
  /** 求职者基本信息 */
  candidate?: CandidateDto
  /** 教育经历 */
  educationList?: EducationDto
  /** 附件名称 */
  fileName?: string
  /** 附件url */
  fileUrl?: string
  /** 兴趣爱好+证书信息 */
  hobbyCertificate?: HobbyCertificateDto
  /** 求职期望 */
  jobExpectList?: JobExpectDto
  /** 实习经验 */
  practiceExperienceList?: PracticeExperienceDto
  /** 项目经验 */
  projectExperienceList?: ProjectExperienceDto
  /** 校园经历 */
  schoolExperienceList?: SchoolExperienceDto
  /** 更新时间 */
  updatedAt?: string
  /** 工作经验 */
  workExperienceList?: WorkExperienceDto
}

/**
 * requestUrl /job/resume_sdk/resume_list
 * method post
 */
export interface GetResumeListUsingPOSTRequest {
  
  /** 二级版本id */
  bizCode: string
  /** 求职者版本key */
  openKey: string
  /** 用户编码 */
  userCode?: string
}

/**
 * requestUrl /job/resume_sdk/resume_list
 * method post
 */
export interface GetResumeListUsingPOSTResponse {
  
  /** 响应数据 */
  data?: ResumeSDKDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}

interface JobExpectSDKDto {
  
  /** 期望职位id */
  capacityId: number
  /** 期望职位名称 */
  capacityName: string
  /** 城市 */
  city: string
  /** 城市名称 */
  cityName?: string
  /** 期望编码 */
  code?: string
  /** 附件名称 */
  fileName?: string
  /** 附件url */
  fileUrl?: string
  /** 最高薪资 */
  maxSalary: number
  /** 最低薪资 */
  minSalary: number
  /** 用户版本key */
  openKey?: string
  /** 类型 1全职 2兼职 */
  type: number
  /** 工作区域 */
  workArea: number
}

/**
 * requestUrl /job/resume_sdk/v2/job_expect_list
 * method post
 */
export interface GetCandidateExpectV2UsingPOSTRequest {
  
  /** 二级版本id */
  bizCode: string
  /** 求职者版本key */
  openKey: string
  /** 用户编码 */
  userCode?: string
}

/**
 * requestUrl /job/resume_sdk/v2/job_expect_list
 * method post
 */
export interface GetCandidateExpectV2UsingPOSTResponse {
  
  /** 响应数据 */
  data?: JobExpectSDKDto
  /** 响应消息 */
  message?: string
  /** 响应消息编码 */
  messageCode?: string
  /** 是否成功 */
  success?: boolean
}