import { makeAutoObservable, runInAction } from 'mobx'
import http from '@/servers/http'
import { STATUSENUM } from './interface.d'
import { getCookie } from '@/storage'
// import { history } from 'umi'
import { message } from 'antd'
import API from './api'

export default class {
    public orderList: any[] = []
    constructor() {
        makeAutoObservable(this)
    }

    /**
     * 获取列表数据
     * @param params
     */
    getOrderList(invoiceCode: string) {
        http(`${API.getInvoiceDetailV2}${invoiceCode}`, 'GET', { code: invoiceCode }).then(
            (res: any) => {
                console.log(res)
                if (res) {
                    runInAction(() => {
                        const { orderList } = res || {}
                        this.orderList = orderList
                    })
                }
            },
        )
    }

    /** 测试当前订单是否处于未支付状态 */
    testOrderIsUnPlay(code: string) {
        return http(API.getOrderDetail, 'POST', {
            code,
            organizationCode: getCookie('SELECT_ORG_CODE'),
            identity: getCookie('SELECT_IDENTITY_CODE'),
            orgUser: getCookie('SELECT_USER_TYPE') === 'org',
        }).then((res: any) => {
            return (
                String(res.status) === STATUSENUM.UNPAID_STATUS ||
                String(res.status) === STATUSENUM.PART_STATUS
            )
        })
    }

    /** 去支付 */
    palyOrder(path: string, code: string) {
        this.testOrderIsUnPlay(code).then(res => {
            if (res) {
                window.open(path)
            } else {
                message.info('支付处理中，请勿操作')
            }
        })
    }
}
