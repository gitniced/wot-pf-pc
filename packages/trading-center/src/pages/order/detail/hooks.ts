import { makeAutoObservable } from 'mobx'
import Http from '@/servers/http'
import { API as INDEX_API } from './../hooks'
import { getCookie } from '@/storage'
import { STATUSENUM } from '../interface.d'
import type { OrderInfoType } from './interface.d'
export const API = {
    getOrderDetail: '/order/front/detail_buyer',
}

export default class {
    /** 订单详情 */
    public orderDetail: OrderInfoType = {}
    /** 是否有拿到订单的详情信息 */
    public isGetDetail: boolean = false
    /** 是否展示退款相关按钮（订单已经完成）*/
    public isServe: boolean = false
    /** 是否展示退款申请（订单支付后不超过15天）*/
    public isRefund: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    /**
     * 获取订单详情
     * @param orderid
     */
    getOrderDetail(code: string) {
        Http<any, any>(API.getOrderDetail, 'POST', {
            code,
            organizationCode: getCookie('SELECT_ORG_CODE'),
            identity: getCookie('SELECT_IDENTITY_CODE'),
            orgUser: getCookie('SELECT_USER_TYPE') === 'org',
        }).then(res => {
            if (res) {
                this.orderDetail = res
                /**
                 * 判断支付时间是否超过了 15天
                 */
                let past: boolean = this.isPast(this.orderDetail?.payTime)
                /**
                 * 如果是 已完成的状态下的话 就设置展示退款相关的按钮
                 */
                if (String(this.orderDetail?.status) === STATUSENUM.SUCCESS_STATUS) {
                    this.isServe = true
                    past && (this.isRefund = true)
                }
            }
            this.isGetDetail = true
        })
    }

    /**
     * 关闭订单
     * @param code
     * @returns
     */
    closeOrder(code: string) {
        return Http(INDEX_API.closeOrderURL, 'POST', { code })
    }

    /**
     * 判断传入的时间 和今天是否相差超过15天
     * @param createdAt 时间戳
     * @returns
     */
    isPast = (createdAt: string | number) => {
        if (typeof createdAt === 'string' || typeof createdAt === 'number') {
            let stepDay = 24 * 3600 * 1000 * 15
            let steps = new Date().getTime() - Number(createdAt)

            let result = steps <= stepDay
            return result
        } else {
            return true
        }
    }
}
