/**
 * 如果遇到bug，您可以钉钉搜索封东其或者给 fengdongqi@hzwotu.com 邮箱发邮件
 * 欢迎大家提 issue 或者 PR。
 * @title 沃土考试中心服务
 * @description 沃土考试中心服务是一个 Spring Boot项目
 * @version v1.0
 * @date 2023/7/17 09:23:26
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
    /** 是否开启签到 */
    signState: number
    /** 考试开始时间 */
    startTime?: number
    /** 考试名称 */
    title: string
    /** 答题界面显示考生水印 */
    watermarkState?: number
}