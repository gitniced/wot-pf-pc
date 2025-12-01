import { makeAutoObservable, runInAction } from 'mobx'
import http from '@/servers/http'
import api from './api'
import type { OrderGoodInfoType, FormValueType } from './interface'
import { message } from 'antd'
import { history } from 'umi'
// import Decimal from 'decimal.js'
import { getCookie } from '@/storage'
class ApplyStore {
    constructor() {
        makeAutoObservable(this)
    }
    public orderGoodsInfo: OrderGoodInfoType = {}
    /** 数据是否加载完成 */
    public isLoad = false
    /** 根据数量计算出来的金额 */
    public computeGoodsAmount = 0
    /** 查询按钮loading状态 */
    public btnLoading: boolean = false
    /** 商品code */
    public goodsCode: string = ''
    getOrderGoodsDetail = async (code: string) => {
        const res = await http(api.getOrderGoodsDetail, 'get', { code })
        runInAction(() => {
            this.isLoad = true
            this.orderGoodsInfo = res as unknown as OrderGoodInfoType
        })
    }
    /**
     * 计算商品 单价*退款数量
     * @param quantity 整数 数量 个数
     */
    toComputeGoodsAmount(quantity: number) {
        let money = 0
        if (this.orderGoodsInfo.remainRefundQuantity === quantity) {
            // 如果是一次性退完, 直接取后端的可退款金额
            money = this.orderGoodsInfo.remainRefundAmount!
        } else {
            // 正常就是用实付单价 * 数量 = 金额
            let temp = Number(this.orderGoodsInfo.preferentialPrice) * quantity
            // 优惠显示问题，如果输入的数量算出来的退款总额大于可退款金额，应该显示可退款金额
            money = Math.min(temp, Number(this.orderGoodsInfo.remainRefundAmount))
        }
        this.computeGoodsAmount = isNaN(money) ? 0 : Number(money).toFixed(2)
        console.log('computeGoodsAmount: ', this.computeGoodsAmount)
    }

    /**
     *  申请退款
     * @param orderCode
     * @param goodsCode
     * @param values
     */
    applyRefundOder = (orderCode: string, goodsId: string, values: FormValueType) => {
        this.btnLoading = true
        http<any, any>(api.applyRefundOder, 'post', {
            organizationCode: getCookie('SELECT_ORG_CODE'),
            identity: getCookie('SELECT_IDENTITY_CODE'),
            orgUser: getCookie('SELECT_USER_TYPE') === 'org',
            // 商品订单唯一编码
            orderGoodsCode: goodsId,
            // 商品code
            goodsCode: this.orderGoodsInfo.goodsCode,
            // 订单code
            orderCode,
            // 退款金额
            refundAmount: this.computeGoodsAmount,
            ...values,
        })
            .then(() => {
                message.success('退款申请提交成功')
                history.replace('/refund')
            })
            .finally(() => {
                this.btnLoading = false
            })
    }
}

export default ApplyStore
