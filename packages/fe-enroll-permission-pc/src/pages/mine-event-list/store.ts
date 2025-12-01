import http from '@/servers/http'
import api from './api'
import { makeAutoObservable, runInAction } from 'mobx'
import { getLocalStorage } from '@/storage'
// import { cloneDeep } from 'lodash'
// import dayjs from 'dayjs'
import type { CategoryListItem } from './interface'
// 班级培训 => 培训报名
interface SearchProps {
    status?: string | undefined
    name?: string | undefined
    entryCodeInteger?: string | undefined
    pageSize?: number
    pageNo: number
}

class EnrollListStore {
    public activeList = []
    public totalCount = 0
    public count = 0
    public loading = false

    public searchParams: SearchProps = {
        status: undefined,
        name: undefined,
        entryCodeInteger: undefined,
        pageNo: 1,
        pageSize: 10,
    }

    /** 分类列表*/
    public categoryList: CategoryListItem[] = [
        {
            code: '1',
            sid: '',
            siteName: '',
            catalogName: '全部',
            openStatus: 'string',
            createdAt: '',
        },
    ]

    /** 状态列表*/
    public statusList: string[] = ['全部']

    constructor() {
        makeAutoObservable(this)
    }

    updateSearchParam = async (
        params: SearchProps | Record<string, number | string | undefined> = {},
    ) => {
        this.searchParams = {
            ...this.searchParams,
            ...params,
        }
        await this.getActiveList()
    }

    initSearchParam() {
        this.searchParams = {
            status: undefined,
            name: undefined,
            entryCodeInteger: undefined,
            pageNo: 1,
            pageSize: 10,
        }
    }
    /**
     * 搜索报名活动名称
     */
    onSearch(value: string) {
        runInAction(async () => {
            await this.updateSearchParam({ name: value, pageNo: 1 })
        })
    }
    /**
     * 活动列表
     */
    async getActiveList() {
        this.loading = true
        // const platform = getSessionStorage('PLATFORM')
        // const isPortal = platform === 'portal'

        // const portalCode = getPortalCodeFromUrl()

        const res: any = await http(api.getActivityList, 'post', {
            ...this.searchParams,
            sid: getLocalStorage('SID'),
        }).finally(() => {
            this.loading = false
        })

        const data = res.data as unknown as any[]

        runInAction(() => {
            this.count = res.currentPage
            this.totalCount = res.totalCount
            this.searchParams.pageNo = this.searchParams.pageNo + 1
            this.activeList = [...data]
        })
    }
}

export default EnrollListStore
