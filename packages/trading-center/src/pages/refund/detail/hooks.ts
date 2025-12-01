import { makeAutoObservable } from 'mobx'

import http from '@/servers/http'
import type { REFUND_INFO } from './interface'
import { REFUND_ORDER_STATUS } from '../const'
export default class {
    public refundInfo: Partial<REFUND_INFO> = {}
    public currentStep: 0 | 1 | 2 | 3 = 0

    constructor() {
        makeAutoObservable(this)
    }

    /**
     *  获取退款单的详情
     * @param code
     */
    getRefundDetail = (code: string) => {
        http<{ code: string }, { status: number; errorReason: string }>(
            `/order/front/refund_order/detail`,
            'GET',
            { code },
        ).then(res => {
            let { status, errorReason } = res || {}
            this.getStep(status, errorReason)
            this.refundInfo = res as unknown as REFUND_INFO
        })
    }

    /**
     *  根据状态兑换 step
     *
     * @param status
     */
    getStep = (status: number, errorReason: string) => {
        let _status = status
        /* 
            如果是 失败状态的话 就去看是 审核失败还是 退款失败
            如果是退款失败的话 接口会返回 errorReason
         */
        if (Number(status) === REFUND_ORDER_STATUS.FAIL) {
            // 失败
            if (errorReason) {
                // 退款失败
                this.currentStep = 2
                return
            } else {
                // 审核失败
                this.currentStep = 1
                return
            }
        }
        // 如果不是失败状态，当前状态跟接口返回的状态又一个数值误差
        this.currentStep = (Number(_status) + 1) as 0 | 1 | 2 | 3
    }
}
