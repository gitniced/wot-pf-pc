import { makeAutoObservable, runInAction } from 'mobx'
import API from './api'
import Http from '@/servers/http'

export default class {
    public detail: any = {}
    public orderDetail: any = { invoiceDetailRespDto: {} }
    public redDetail = {}
    constructor() {
        makeAutoObservable(this)
    }

    getDetailValue(code: string, makeType: number) {
        console.log(makeType, 'makeType')
        if (code) {
            Http(
                // `${Number(makeType) === 2 ? API.getRedDetail : API.getInvoiceDetail}${code}`,
                `${API.getInvoiceDetailV2}${code}`,
                'GET',
                { code },
            ).then((res: any) => {
                console.log(res)
                if (res) {
                    runInAction(() => {
                        this.detail = res
                        // this.getOrderValue(res.orderNoList?.[0])
                        // if (res.makeType === 2) {
                        //     this.getRedInvoiceDetail(code)
                        // }
                    })
                }
            })
        }
    }
}
