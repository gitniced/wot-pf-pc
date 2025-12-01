import type { MessageDataType } from './exam/paper/interface'
export interface CandidateReq {
    examCode: string // 考试code 考评业务传过来
    userCode: string // 用户code
}
export interface CandidateData {
    address: string // 考试地址
    admissionTicketNumber: string // 准考证号
    certType: string // 证件类型
    certnumber: string // 证件号码
    endTime: number // 考试结束时间
    examTitle: string // 考试名称
    name: string // 考生信息
    seatNumber: string // 座位号
    startTime: number // 考试开始时间
    needSign: number // 是否需要签到
    signState: number // 是否已经签到
    answerEndTime: number // 答题结束时间
    distanceAnswerEndTimeSec: number
    confirmInfoState: number // 是否已经确认了考生信息
    confirmPrecautionsState: number // 是否已经确认了考前须知
    generateState: number // 是否已经交卷
    signImg?: string // 签到照片
    systemImg?: string // 系统照片
    forcedWindingState?: number // 收卷状态
    wangGeYuanStudentStatus?: number
    distanceDeliveryTimeSec: number
    projectNo?: string
}

// 整场考试配置信息
export interface ExamData {
    calculatorShowState: number // 是否提供计算器
    scoreShowState: number // 题目分值是否显示
    watermarkState: number // 是否有水印
    title: string // 考试名称
    startTime: number // 考试开始时间
    distanceStartTimeSec: number
    endTime: number // 考试结束时间
    distanceEndTimeSec: number
    signStartTime: number // 签到开始时间
    signEndTime: number // 签到结束时间
    distanceSignStartTimeSec: number
    distanceSignEndTimeSec: number
    precautions: string // 考试须知
    formulaState: number // 是否可以使用数学公式
    deliveryTime: number // 最早交卷时间
    distanceDeliveryTimeSec?: number
    answerTime: number // 答题时长
    objectiveScoreShowState: number // 交卷后是否显示客观成绩分数
    endPrompt?: string // 配置的考试结束语
    endJumpLink?: string // 最后自动退出系统的跳转链接，没有配置则执行退出的登录逻辑
    cutAutoWinding?: number // 切屏自动收卷
    cutAutoWindingNum?: number // 切屏次数
    jobStr?: string // 职业/工种/等级
}

export interface MsgItem {
    messageContent: string
    messageTime: number
    messageType: MessageDataType
}
