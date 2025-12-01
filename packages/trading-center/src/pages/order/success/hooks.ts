import { makeAutoObservable } from 'mobx'
import Http from '@/servers/http'
import { getCookie } from '@/storage'
export const API = {
    getMapDetail: '/order/front/detail_buyer',
}

export default class {
    /** 订单详情 */
    public orderDetail: any = {}
    /** 是否加载完数据 */
    public isGetDetail: boolean = false
    constructor() {
        makeAutoObservable(this)
    }

    getMapDetail(code: string, identity: string) {
        Http<any, any>(API.getMapDetail, 'POST', {
            code,
            organizationCode: getCookie('SELECT_ORG_CODE'),
            identity: identity || getCookie('SELECT_IDENTITY_CODE'),
            orgUser: getCookie('SELECT_USER_TYPE') === 'org',
        }).then(res => {
            if (res) {
                this.orderDetail = res
            }
            this.isGetDetail = true
        })
    }
}
