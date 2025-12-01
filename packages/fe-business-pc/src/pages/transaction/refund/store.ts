import http from '@/servers/http'
import { makeAutoObservable } from 'mobx'
import api from './api'
import { getCookie } from '@/storage'

export default class {
    constructor() {
        makeAutoObservable(this)
    }

    /**
     * 获取售后订单信息
     * @param param
     */
    getRefundList(param: Record<string, any>) {
        return http(api.getRefundData, 'POST', {
            ...param,
            merchantOrgCode: getCookie('SELECT_ORG_CODE'),
            identity: getCookie('SELECT_IDENTITY_CODE'),
        })
    }

    /**
     * 导出退款单
     * @param param
     */
    async exportRefundFile(param: Record<string, any>) {
        const res = await http(api.getImportTask, 'post', {
            param: JSON.stringify({
                ...param,
                merchantOrgCode: getCookie('SELECT_ORG_CODE'),
                identity: getCookie('SELECT_IDENTITY_CODE'),
            }),
            organizationCode: getCookie('SELECT_ORG_CODE'),
            type: 6,
            fileName: '售后单导出.xlsx',
        })
        return res
        // await http(`${api.exportRefundFile}?taskCode=${res}`, 'POST', {
        //     ...param,
        //     merchantOrgCode: getCookie('SELECT_ORG_CODE'),
        //     identity: getCookie('SELECT_IDENTITY_CODE'),
        // })
    }
}
