import { makeAutoObservable, runInAction } from 'mobx'
import Http from '@/servers/http'
import type { FormValuesType } from './interface'
// @ts-ignore
import { history } from 'umi'
import { message } from 'antd'
import { getCookie } from '@/storage'
import { QrCodeStatus } from '../const'
import type { SettlementObjectFrontDetailDto } from '@/@types/finance'
const API = {
    getOrderDescURL: '/order/front/detail_buyer',
    getQrcodeURL: '/pay/front/qrcode_apply',
    heartBeatingURL: '/pay/front/qrcode_result/',
    paymentHeartBeatingURL: '/pay/front/merge_qrcode_result/',
    payProof: '/pay/front/pay_proof',
    checkSettlementSuccess: '/merchant/front/create/check_create_success',
    getSettlementDetail: '/finance/front/settlement_object/detail',
    /** 合并支付详情 */
    mergePayment: '/pay/front/refresh_merge_order_qrcode_apply',
    /** 线下合并支付 */
    mergeOfflinePay: '/pay/front/merge_pay_proof',
}

export enum timerOut {
    /** 定义一次二维码到期时间的枚举 */
    timeoutSecond = 600,
}
export type PayType = 'online' | 'offline' // online 线上支付（聚合支付） offline 线下支付
export type QrcodeType = {
    /** 过期时间 */
    expiredTime?: number
    /** 生成时间 */
    generatedTime?: number
    /** 商品名称列表 */
    goodsNameList?: any[]
    /** 当前时间 */
    nowTime?: number
    /** 订单编码 */
    orderCode?: string
    /** 订单编号 */
    orderNo?: string
    /** 支付金额 */
    payAmount?: number
    /** 收款方 */
    payeeName?: string
    /** 支付二维码code */
    qrCode?: string
    /** 支付二维码url */
    qrCodeUrl?: string
}
export default class {
    /**订单介绍 */
    public orderDesc: any = {} //
    /** 合并支付详情 */
    public paymentDetail: any = {}
    /**二维码数据 */
    public qrCode: QrcodeType = {}
    /**二维码图片地址 */
    public qrCodeUrl: string = ''
    /** 是否加载数据 */
    public isGetData: boolean = false
    /** 倒计时文案 */
    public downCountText: string = ''
    /** 倒计文案时计时器  */
    public timeTextDown: any = null
    /** 心脏检测计时器 */
    public heartTimer: any = null
    /** 倒计时是否结束 */
    public isEnd: boolean = false
    /** 全局的订单id存储 */
    public orderId: string = ''
    /** 全局的合并支付id存储 */
    public paymentCode: string = ''
    /** 生成订单时候的身份 */
    public identity: string = ''
    /** 小型的订阅发布模式 */
    public eventList: any = []
    /** 查询按钮loading状态 */
    public btnLoading: boolean = false
    /** 加死锁 */
    public proxygetQrcode: boolean = false
    /** 是否完成线上进件了 */
    public hasCompletedOnlineIncoming: boolean = false // 完成线上进件，需要展示线上支付（聚合支付）
    /** 支付方式  */
    public payType: PayType = 'offline'
    /** 结算主体详情 */
    public settlementDetail: SettlementObjectFrontDetailDto = {}
    /** 刷新二维码loading */
    public spining: boolean = false
    /** 合并支付订单列表 */
    public orderCodes: string[] = []
    constructor() {
        makeAutoObservable(this)
    }
    setSpining(spining: boolean) {
        this.spining = spining
    }
    setPayType(type: PayType) {
        this.payType = type
    }

    /**
     * 初始化数据
     * @param orderId
     * @param identity
     */
    async initPageData(orderId: string, identity: string) {
        this.orderId = orderId
        this.identity = identity
        await this.getOrderDetail() // 获取订单详情
        await this.getSettlementDetail()
        const hasCompletedOnlineIncoming = await this.checkSettlementSuccess() // 校验结算主体是否完成线上进件
        if (hasCompletedOnlineIncoming) {
            await this.getQrCode() // 获取二维码信息
        }
    }
    /**
     * 获取合并订单信息
     * @param paymentCode
     * @param identity
     */
    async getPaymentDetail(paymentCode: string, identity: string) {
        this.paymentCode = paymentCode
        this.identity = identity
        const res = await Http(API.mergePayment, 'post', { paymentCode })
        const { qrCodeUrl, settleTargetCode, orderCodes } = (res || {}) as unknown as any
        await this.getSettlementDetail(settleTargetCode)
        this.paymentDetail = res
        this.orderCodes = orderCodes
        if (qrCodeUrl) {
            this.setPayType('online')
            this.qrCodeUrl = qrCodeUrl
            this.hasCompletedOnlineIncoming = true
            this.heartBeating()
        }
    }

    async getSettlementDetail(settleTargetCode?: string) {
        const res = (await Http(API.getSettlementDetail, 'get', {
            code: settleTargetCode ? settleTargetCode : this.orderDesc.settleTargetCode,
        })) as unknown as SettlementObjectFrontDetailDto
        this.settlementDetail = res
    }

    async checkSettlementSuccess() {
        const res = (await Http(API.checkSettlementSuccess, 'get', {
            settleTargetCode: this.orderDesc.settleTargetCode,
        })) as unknown as boolean
        if (res) {
            this.setPayType('online')
        }
        this.hasCompletedOnlineIncoming = res
        return res
    }
    /**
     *  添加事件
     *  这些事件 会在 订单状态成为已支付的时候
     *  进行触发
     * @param fn
     */
    addEvent(fn: any) {
        this.eventList.push(fn)
    }

    /**
     * 获取要支付的信息
     */
    async getOrderDetail() {
        const res = await Http(API.getOrderDescURL, 'POST', {
            code: this.orderId,
            organizationCode: getCookie('SELECT_ORG_CODE'),
            identity: this.identity || getCookie('SELECT_IDENTITY_CODE'),
            orgUser: getCookie('SELECT_USER_TYPE') === 'org',
        })
        runInAction(() => {
            if (res) {
                this.orderDesc = res
            }
            this.isGetData = true
        })
    }
    /**
     *  获取二维码
     * @returns
     */
    async getQrCode() {
        const res = (await Http(API.getQrcodeURL, 'POST', {
            orderCode: this.orderId,
        })) as unknown as QrcodeType
        this.qrCode = res
        // 有线下支付就开启轮训支付结果操作。
        if (this.hasCompletedOnlineIncoming && !this.proxygetQrcode) {
            this.proxygetQrcode = true
            this.heartBeating()
        }
    }

    /**
     *  心脏检测 实时的获取
     *  如果判断 返回状态 为支付成功 广播订阅函数
     *
     */
    heartBeating() {
        if (this.heartTimer) return
        this.heartTimer = setInterval(() => {
            if (this.paymentCode) {
                Http(API.paymentHeartBeatingURL + this.paymentCode, 'GET', {}).then((res: any) => {
                    if (res === QrCodeStatus.success) {
                        this.eventList.forEach((item: any) => item?.(res))
                        clearInterval(this.heartTimer)
                    }
                })
            } else {
                Http(API.heartBeatingURL + this.orderId, 'GET', {}).then((res: any) => {
                    if (res === QrCodeStatus.success) {
                        this.eventList.forEach((item: any) => item?.(res))
                        clearInterval(this.heartTimer)
                    }
                })
            }
        }, 1000)
    }

    /**
     *  上传 线下支付的凭证
     * @param values
     * @param orderCode
     * @returns
     */
    uploadOffline = async (
        values: FormValuesType,
        orderCode: string | string[] | null,
        money: any,
    ) => {
        let proof = values?.proof?.[0]?.response?.url || ''
        this.btnLoading = true
        if (this.paymentCode) {
            await Http<unknown, unknown>(API.mergeOfflinePay, 'post', {
                proof,
                orderCodes: this.orderCodes,
                remark: values?.remark,
            })
        } else {
            if (typeof orderCode !== 'string') return
            await Http<unknown, unknown>(API.payProof, 'post', {
                proof,
                orderCode,
                remark: values?.remark,
            })
        }
        this.btnLoading = false
        message.success('付款凭证上传成功')
        if (this.paymentCode) {
            history.replace(
                `/order/success?paymentCode=${this.paymentCode}&money=${money}&identity=${this.identity}&payType=offline`,
            )
        } else {
            history.replace(
                `/order/success?orderId=${orderCode}&money=${money}&identity=${this.identity}&payType=offline`,
            )
        }
    }
}
