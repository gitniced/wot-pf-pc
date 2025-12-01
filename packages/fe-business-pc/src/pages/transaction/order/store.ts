import http from '@/servers/http'
import { makeAutoObservable } from 'mobx'
import api from './api'
import { getCookie } from '@/storage'

export default class {
    public list: any[] = []
    constructor() {
        makeAutoObservable(this)
    }
    setList(list: any[]) {
        this.list = list
    }
    /**
     * 获取订单信息
     * @param param
     */
    getOrderData(param: Record<string, any>) {
        return http(api.getOrderData, 'POST', {
            ...param,
            merchantOrgCode: getCookie('SELECT_ORG_CODE'),
            identity: getCookie('SELECT_IDENTITY_CODE'),
        })
    }

    /**
     * 导出订单文件数据
     */
    exportOrderFile(params: Record<string, any>) {
        return http(api.getImportTask, 'post', {
            param: JSON.stringify({
                ...params,
                merchantOrgCode: getCookie('SELECT_ORG_CODE'),
                identity: getCookie('SELECT_IDENTITY_CODE'),
            }),
            organizationCode: getCookie('SELECT_ORG_CODE'),
            type: 4,
            fileName: '订单报表导出.xlsx',
        }).then(() => {
            // return http(`${api.exportOrderData}?taskCode=${res}`, 'POST', {
            //     ...params,
            //     merchantOrgCode: getCookie('SELECT_ORG_CODE'),
            //     identity: getCookie('SELECT_IDENTITY_CODE'),
            // })
        })
    }

    /**
     * 导出 商品文件数据
     */
    exportGoodsFile(params: Record<string, any>) {
        return http(api.getImportTask, 'post', {
            param: JSON.stringify({
                ...params,
                merchantOrgCode: getCookie('SELECT_ORG_CODE'),
                identity: getCookie('SELECT_IDENTITY_CODE'),
            }),
            organizationCode: getCookie('SELECT_ORG_CODE'),
            type: 5,
            fileName: '商品报表导出.xlsx',
        }).then(() => {
            // return http(`${api.exportGoodsData}?taskCode=${res}`, 'POST', {
            //     ...params,
            //     merchantOrgCode: getCookie('SELECT_ORG_CODE'),
            //     identity: getCookie('SELECT_IDENTITY_CODE'),
            // })
        })
    }
}
