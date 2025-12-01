/**
 * @ File:
 * @ Description:
 * @ Author: cqh
 * @ Create Time: 2022-12-22 16:02:41
 * @ Modified by: cqh
 * @ Modified time: 2023-06-09 11:55:09
 */

import { makeAutoObservable } from 'mobx'
import API from './api'
import Http from '@/servers/http'
import type { paramsType, pagination, paramsAllType } from './typing'

export default class {
    public params: Partial<paramsType> = {}

    public pagination: pagination = {
        pageNo: 1,
        pageSize: +(sessionStorage.getItem('PageSize') || 10),
    }
    public totalCount = 0
    // 搜索高亮
    public highlight: string = ''

    constructor() {
        makeAutoObservable(this)
    }

    // 页码改变
    pageChange(page: number, size?: number) {
        this.pagination.pageNo = page
        this.pagination.pageSize = size || this.pagination.pageSize
        this.pageSizeChangeEffect(size)
        this.getInvoiceData({ ...this.params, ...this.pagination })
    }

    //获取数据
    async getInvoiceData(params: paramsAllType) {
        const res: any = await Http(API.getInvoiceData, 'POST', {
            ...params,
            pageSize: +(sessionStorage.getItem('PageSize') || 10),
        })

        return res
    }

    pageSizeChangeEffect(size?: number) {
        if (size !== this.pagination.pageSize) {
            sessionStorage.setItem('PageSize', String(size))
        }
    }
}
