import { makeAutoObservable } from 'mobx'
import { initSearchParams } from './const'
import http from '@/servers/http'
import API from './api'
import type { SearchParams, TableItem, UserDataType } from './interface'
import type { PaginationProps } from 'antd/lib/pagination/Pagination'
import type { CommonParams } from '@/hooks/useCommonParams'

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

    getTableList = async (searchParams: any) => {
        const { composition = '', usedState = '' } = searchParams ?? {}
        const [career = {}, work, level] = searchParams?.commonJob ?? []
        const { hasWorkType } = career

        const commonJob: any = {
            jobName: career?.label,
            jobNameCode: career?.value,
        }

        if (hasWorkType) {
            commonJob.jobType = work?.label
            commonJob.jobTypeCode = work?.value
            commonJob.jobLevel = level?.label
            commonJob.jobLevelCode = level?.value
        } else {
            commonJob.jobLevel = work?.label
            commonJob.jobLevelCode = work?.value
        }

        const params: any = {
            ...searchParams,
            composition: composition.split(','),
            usedState: usedState.split(','),
            customContent: {
                commonJob,
            },
            workNameCode: work?.value,
        }

        delete params.commonJob
        return (await http(API.templateList, 'post', params)) as any
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
    }

    delTableItem = async (code: string) => {
        await http(API.deleteTemplate, 'post', { paperCode: code })
    }
}

export default new ComposeStore()
