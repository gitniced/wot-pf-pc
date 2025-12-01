import { makeAutoObservable } from 'mobx'
import http from '@/servers/http'
import api from './api'
import { message } from 'antd'
import { getCookie } from '@/storage'
// import { history } from 'umi'

export interface FormValuesType {
    backTrackingNo: string
    invoiceMark: string
    invoiceNumber: string
    invoiceType: number
}

class ApplyStore {
    constructor() {
        makeAutoObservable(this)
    }
    public btnLoading: boolean = false //查询按钮loading状态
    invoiceType = 0

    // 申请开红色发票
    applyRed = async (refundOrderCode: string, values: FormValuesType, callback: () => void) => {
        return new Promise((resolve, reject) => {
            if (values?.backTrackingNo) {
                values.backTrackingNo = values.backTrackingNo?.replaceAll(' ', '')
            }
            this.btnLoading = true
            http(
                api.applyRed,
                'POST',
                {
                    refundOrderCode,
                    ...values,
                    organizationCode: getCookie('SELECT_ORG_CODE'),
                    identity: getCookie('SELECT_IDENTITY_CODE'),
                    orgUser: getCookie('SELECT_USER_TYPE') === 'org',
                },
                {},
            )
                .then(res => {
                    resolve(res)
                    message.success('红票申请成功')
                    // history.push('/invoice')
                    callback?.()
                    this.btnLoading = false
                })
                .catch(err => {
                    reject(err)
                    this.btnLoading = false
                })
        })
    }
    getBlurApply = async (orderCode: string | number) => {
        let res: unknown = await http(
            api.getBlurApply,
            'get',
            { orderCode },
            { repeatFilter: false },
        )
        this.invoiceType = res?.invoiceType || 0
    }
}

export default ApplyStore
