import { makeAutoObservable } from 'mobx'
import type { BackendOrderPageRespDto } from '@/@types/search'
import { message } from 'antd'
import http from '@/servers/http'
import api from './api'

class BatchDownloadBillModalStore {
    public selectedRows: BackendOrderPageRespDto[] = []

    constructor() {
        makeAutoObservable(this)
    }

    addSelectRow = (rows: BackendOrderPageRespDto | BackendOrderPageRespDto[]) => {
        this.selectedRows = this.selectedRows.concat(rows)
    }

    // 清空selectedRows
    resetSelectedRows = () => {
        this.selectedRows = []
    }

    /** 要删除的keys */
    delSelectRow = (rowKey: string) => {
        const delKey = this.selectedRows.findIndex(item => item.code === rowKey)
        this.selectedRows.splice(delKey, 1)
    }

    downloadOrder = () => {
        if (this.selectedRows.length === 0) {
            return message.error('请选择订单')
        }

        const codes = this.selectedRows.map(item => item.code)
       return http(api.batchExportContractOrder, 'post', codes, {
            responseType: 'blob',
        }).then((res: any) => {
            const aDom = document.createElement('a')
            aDom.download = '结算单.pdf'
            const blob = new Blob([res], { type: 'application/pdf;charset=utf-8' })
            const url = window.URL.createObjectURL(blob)
            aDom.target = '_blank'
            aDom.href = url
            aDom.click()
            this.resetSelectedRows()
        })
    }
}

export default new BatchDownloadBillModalStore() 