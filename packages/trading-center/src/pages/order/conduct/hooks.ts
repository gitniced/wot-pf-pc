import { makeAutoObservable } from 'mobx'
import Http from '@/servers/http'
import { getCookie } from '@/storage'

const API = {
    getConductURL: '/order/front/detail_buyer',
    submitOrderURL: '/order/front/modify_remark',
}

export default class {
    public headerList = [
        {
            name: '商品',
            key: '1',
        },
        {
            name: '单价',
            key: '2',
        },
        {
            name: '数量',
            key: '3',
        },
        // {
        //     name: '税率',
        //     key: '4',
        // },
        {
            name: '金额',
            key: '5',
        },
    ]
    public orderDetail: any = {}
    public isGetData: boolean = false
    constructor() {
        makeAutoObservable(this)
    }
    /**
     *  计算总金额
     * @param num
     * @param price
     * @returns
     */
    getAllTotalPrice(num: number, price: number): any {
        return ((num * 100 * (price * 100)) / 10000).toFixed(2)
    }

    /**
     * 获取订单信息
     * @param code
     */
    getConductData(code: string, identity: string) {
        Http(API.getConductURL, 'POST', {
            code,
            organizationCode: getCookie('SELECT_ORG_CODE'),
            identity: identity || getCookie('SELECT_IDENTITY_CODE'),
            orgUser: getCookie('SELECT_USER_TYPE') === 'org',
        }).then((res: any) => {
            this.orderDetail = res || {}
            this.isGetData = true
        })
    }

    /**
     *  提交备注
     * @param params
     * @returns
     */
    submitOrder(params: any) {
        return Http(API.submitOrderURL, 'POST', params)
    }
}
