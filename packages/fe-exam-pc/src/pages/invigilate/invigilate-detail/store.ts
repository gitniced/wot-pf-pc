import { makeAutoObservable } from 'mobx'
import type {
    StuItem,
    ExamDetail,
    TipsParams,
    DelayParams,
    RemarkParams,
    EnumButton,
    WindingParams,
    SendForcedSms,
    AddLoginTimesParams,
} from './interface'
import {
    getStuList,
    getExamDetail,
    sendDelay,
    sendRemark,
    sendTips,
    sendForcedSmsApi,
    forcedWindingApi,
    addLoginTimes,
} from './api'
import { BUTTON_ENUM, BUTTON_TEXT } from './constants'
import { message } from 'antd'

class InvigilateStore {
    constructor() {
        makeAutoObservable(this)
    }

    //考试详情
    public examDetail: Partial<ExamDetail> = {}

    //控制弹窗显示
    public modalVisible = false

    //弹窗标题
    public modalTitle: EnumButton = 'TIPS'
    public modalTitleText = ''

    //是否全选
    public isAll = false

    //选择的学生code
    public selectStuCode: string[] = []

    // 随机key
    public randomKey: string | undefined

    // 获取学生列表
    _getStuList = (params?: any) => {
        return getStuList(params)
    }

    //获取考试详情
    _getExamDetail = (examCode: string) => {
        getExamDetail(examCode).then((res: any) => {
            this.examDetail = res || {}
        })
    }

    //显示操作提示弹框
    showModal = (type: EnumButton, record: Partial<StuItem>) => {
        this.modalVisible = true
        this.modalTitle = type
        this.selectStuCode = record.stuCode ? [record.stuCode] : []
        this.modalTitleText = BUTTON_TEXT[this.modalTitle]
    }

    //关闭弹窗
    closeModal = () => {
        this.modalVisible = false
        this.modalTitle = BUTTON_ENUM.TIPS
        this.selectStuCode = []
        this.modalTitleText = ''
        this.isAll = false
    }

    _sendDelay = (params: DelayParams) => {
        return sendDelay(params).then(() => {
            message.success('延时成功')
            this.closeModal()
        })
    }

    _sendRemark = (params: RemarkParams) => {
        return sendRemark(params).then(() => {
            message.success('设置标记成功')
            this.closeModal()
        })
    }

    _sendTips = (params: TipsParams) => {
        return sendTips(params).then(() => {
            message.success('提醒成功')
            this.closeModal()
        })
    }

    // 自动收卷
    sendAutoWinding = (params: WindingParams) => {
        return forcedWindingApi(params).then(() => {
            message.success('自动收卷成功')
            this.closeModal()
        })
    }

    // 强制收卷发送验证码
    sendForcedSms = (params: SendForcedSms) => {
        return sendForcedSmsApi(params)
    }

    getRandomKey = () => {
        this.randomKey = new Date().getTime() + Math.random().toString(36).slice(-8)
    }

    addLoginTimes = (params: AddLoginTimesParams) => {
        return addLoginTimes(params).then(() => {
            message.success('操作成功')
            this.closeModal()
        })
    }
}

export default new InvigilateStore()
