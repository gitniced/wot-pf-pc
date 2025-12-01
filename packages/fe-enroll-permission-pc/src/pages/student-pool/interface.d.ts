import type { ModalProps } from 'antd'

export interface SignItem {
    code: string
    type: number // 类型 1 签到 2签退
    sid: number
    userCode: string // 用户编码
    taskCode: string // 任务编码
    signImage: string //签到图片
    signRemark: string // 签到备注
    signLocation: string // 用户签到地址
    signTime: string //签到时间
    arrive: number // 是否到达签到范围 0否 1是
    userName: string // 用户姓名
    taskStartTime: string // 任务开始时间
    taskEndTime: string // 任务结束时间
    checkFace: number // 是否开启人脸识别 0否 1是
    distance: number // 打卡范围 0未开启 有值则具体XX米
    siteName: string // 站点名称
    location: string // 任务地点
    ruleStartTime: string // 打卡规则开始时间
    ruleEndTime: string //打卡规则结束时间
    taskName: string // 任务名称
    faceImage: string // 人脸照片 签到时候人脸照片
    ruleCode: string // 规则code
    ruleName: string // 规则名称
    checkType: number // 打卡方式1 手动 2 自动 4 补卡
    ruleType: number // 签到类型 2 集中签到 1 分散签到
    signImageList: string[] // 签到图片集合
    sensitiveMobile: string
    mobile: string
    certificate: string
    certificateType: number
    outwork: number
    LocalDateTime: number
}

export interface SignDetailProps extends ModalProps {
    signDetailData: Partial<SignItem>
}
