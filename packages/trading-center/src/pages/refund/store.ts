import { makeAutoObservable } from 'mobx'
import type { TABLE_ITEM, FormDataType } from './const'
import http from '@/servers/http'
import api from './api'
import { getCookie } from '@/storage'

class RefundStore {
    constructor() {
        makeAutoObservable(this)
    }
    // 操作分页列表
    refundList: TABLE_ITEM[] = []
    public btnLoading: boolean = false //查询按钮loading状态

    // 页码
    pageNo: number = 1
    // 单页显示数量
    pageParma = {
        pageNo: 1,
        pageSize: 10,
        pages: 1,
        totalCount: 0,
    }

    filterParam: FormDataType = {}

    pageHandelr = (pageNo: number, pageSize: number) => {
        this.pageParma = {
            ...this.pageParma,
            pageNo,
            pageSize,
        }

        console.log(this.pageParma)

        // this.getRefundOrder()
    }

    setFilterParam = (values: FormDataType) => {
        this.filterParam = { ...this.filterParam, ...values }
        this.pageHandelr(1, this.pageParma.pageSize)
    }

    /**
     *  获取退款单的列表
     * @param param
     * @returns
     */
    getRefundOrder = async (param: Record<string, any>) => {
        this.btnLoading = true
        const res: any = await http(
            api.refundOrder,
            'POST',
            {
                ...param,
                organizationCode: getCookie('SELECT_ORG_CODE'),
                identity: getCookie('SELECT_IDENTITY_CODE'),
                orgUser: getCookie('SELECT_USER_TYPE') === 'org',
            },
            { repeatFilter: false },
        ).finally(() => {
            this.btnLoading = false
        })
        window?.update_page_size?.(res.pageSize)

        return res
    }
}

export default RefundStore
