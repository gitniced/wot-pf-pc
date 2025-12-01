import { makeAutoObservable } from 'mobx'
import { initSearchParams } from './const'
import http from '@/servers/http'
import API from './api'
import type { SearchParams, TableData, TableItem, UserDataType } from './interface'
import type { PaginationProps } from 'antd/lib/pagination/Pagination'
import type { CommonParams } from '@/hooks/useCommonParams'
import { getCookie } from '@/storage'

class ComposeStore {
    public searchParams = initSearchParams as any
    public paginationObj = {
        current: 1,
        pageSize: 10,
        total: 0,
    }
    public tableData = [] as TableItem[]
    public userData = {} as UserDataType

    constructor() {
        makeAutoObservable(this)
    }
    /**
     * 设置搜索条件
     * @param values SearchParams
     */
    setSearchParams = (values: SearchParams | CommonParams) => {
        this.searchParams = {
            ...this.searchParams,
            ...values,
        }
    }
    /**
     * 设置分页信息
     * @param values PaginationProps
     */
    setPaginationObj = (values: PaginationProps) => {
        this.paginationObj = {
            ...this.paginationObj,
            ...values,
        }
    }
    /**
     * 设置用户信息
     * @param values
     */
    setUserData = (values: UserDataType) => {
        this.userData = {
            ...this.userData,
            ...values,
        }
    }

    getTableList = async () => {
        const { composition = '', usedState = '' } = this.searchParams ?? {}
        const [career, work, level] = this.searchParams?.commonJob ?? []
        const commonJob = {
            jobName: career?.label,
            jobNameCode: career?.value,
            jobType: work?.label,
            jobTypeCode: work?.value,
            jobLevel: level?.label,
            jobLevelCode: level?.value,
        }
        const params = {
            ...this.searchParams,
            composition: composition.split(','),
            usedState: usedState.split(','),
            customContent: {
                commonJob,
            },
            organizationCode: getCookie('SELECT_ORG_CODE'),
            userCode: this.userData.code,
            pageNo: this.paginationObj.current,
            pageSize: this.paginationObj.pageSize,
        }
        delete params.commonJob
        const res = (await http(API.templateList, 'post', params)) as unknown as TableData
        this.paginationObj = {
            current: res.currentPage,
            pageSize: res.pageSize,
            total: res.totalCount,
        }
        if (res.pages && res.currentPage > res.pages) {
            this.setPaginationObj({ current: this.paginationObj.current - 1 })
            this.getTableList()
        }
        this.tableData = res.data
    }
    /**
     * 表格发生改变
     * @param page 当前页
     * @param pageSize 页面大小
     */
    tableChange = (page: number, pageSize: number) => {
        this.paginationObj = {
            ...this.paginationObj,
            current: page,
            pageSize,
        }
        this.getTableList()
    }

    delTableItem = async (code: string) => {
        await http(API.deleteTemplate, 'post', { paperCode: code })
    }
}

export default new ComposeStore()
