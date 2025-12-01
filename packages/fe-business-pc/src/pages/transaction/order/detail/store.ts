import { makeAutoObservable } from 'mobx'
import http from '@/servers/http'
import { getCookie } from '@/storage'

const api = {
    getOrderDetail: '/order/front/detail_merchant',
}

export default class {
    public orderDetail: Record<string, any> = {}
    constructor() {
        makeAutoObservable(this)
    }

    /**
     *  获取订单详情
     * @param code
     */
    getOrderDetail(code: string) {
        http(api.getOrderDetail, 'post', {
            code,
            merchantOrgCode: getCookie('SELECT_ORG_CODE'),
            identity: getCookie('SELECT_IDENTITY_CODE'),
        }).then(res => {
            this.orderDetail = res || {}
        })
    }
}
