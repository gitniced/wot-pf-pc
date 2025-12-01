import http from '@/servers/http'
import api from './api'
import { makeAutoObservable, runInAction } from 'mobx'
import { getLocalStorage } from '@/storage'
// import { cloneDeep } from 'lodash'
// import dayjs from 'dayjs'
import type { CategoryListItem } from './interface'
import { findSiteData } from '@wotu/wotu-components'
// 班级培训 => 培训报名
interface SearchProps {
    catalogCode?: string | undefined
    activityName?: string | undefined
    activityStatus?: string | undefined
    activityFormList?: any
    cityCode?: string
    pageSize?: number
    pageNo: number
}

class EnrollListStore {
    public activeList: any = []
    public totalCount = 0
    public count = 0
    public loading = false

    public searchParams: SearchProps = {
        catalogCode: undefined,
        activityName: undefined,
        activityStatus: undefined,
        pageNo: 1,
        pageSize: 9,
    }

    /** 分类列表*/
    public categoryList: CategoryListItem[] = [
        {
            code: '全部',
            sid: '',
            siteName: '',
            catalogName: '全部',
            openStatus: 'string',
            createdAt: '',
        },
    ]

    /** 状态列表*/
    public statusList: any[] = [
        { key: '全部', name: '全部' },
        { key: '1', name: '未开始' },
        { key: '2', name: '进行中' },
        { key: '3', name: '已结束' },
    ]

    /** 分类*/
    public catalogCode?: string

    /** 状态*/
    public activityStatus?: string

    public activityFormList?: any

    public formList: any[] = [
        { value: '全部', label: '全部' },
        { value: 0, label: '线上' },
        { value: 1, label: '线下' },
        { value: 2, label: '线上+线下' },
    ]

    public cityCode?: any
    public cityList: any[] = []

    public activityName: string = ''

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
            catalogCode: undefined,
            activityName: undefined,
            activityStatus: undefined,
            pageNo: 1,
            pageSize: 9,
        }
    }

    changeSearch(e: any) {
        this.activityName = e.target.value
    }
    /**
     * 搜索报名活动名称
     */
    onSearch(value: string) {
        runInAction(async () => {
            await this.updateSearchParam({ activityName: value ? value : undefined, pageNo: 1 })
        })
    }
    /**
     * 活动列表
     */
    async getActiveList() {
        this.loading = true

        let apiParams = {
            ...this.searchParams,
            sid: getLocalStorage('SID'),
        }

        const res: any = await http(api.getActivityList, 'post', apiParams).finally(() => {
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

    getFilterOption = async () => {
        let resData: any =
            (await http(api.getCategoryList, 'post', { sid: getLocalStorage('SID') })) || []
        this.categoryList = [
            {
                code: '全部',
                sid: '',
                siteName: '',
                catalogName: '全部',
                openStatus: 'string',
                createdAt: '',
            },
        ].concat(resData)
    }

    getCityData = async (siteData: any) => {
        const province = findSiteData(siteData, 'province', { findKey: 'baseInfo' })
        let resData: any = (await http(api.city, 'get', { parentCode: province })) || []
        this.cityList = [
            {
                code: '全部',
                name: '全部',
            },
        ].concat(resData)
    }

    /**
     * 选中分类
     * @param {string} value
     */
    onSelectCategory = (value: string) => {
        runInAction(async () => {
            this.catalogCode = value
            await this.updateSearchParam({
                catalogCode: value === '全部' ? undefined : value,
                pageNo: 1,
            })
        })
    }

    /**
     * 选中状态
     * @param {string} value
     */
    onSelectStatus(value: string) {
        runInAction(async () => {
            this.activityStatus = value
            await this.updateSearchParam({
                activityStatus: value === '全部' ? undefined : value,
                pageNo: 1,
            })
        })
    }

    changeActivityFormList(value: number[] | string[]) {
        runInAction(async () => {
            this.activityFormList = value
            await this.updateSearchParam({
                activityFormList: value[0] === '全部' ? undefined : value,
                pageNo: 1,
            })
        })
    }

    onChangeArea(value: string) {
        let params: any = {
            cityCode: value[0] === '全部' ? undefined : value[0],
        }
        runInAction(async () => {
            if (value[0] === '全部') {
                this.formList = [
                    { value: '全部', label: '全部' },
                    { value: 0, label: '线上' },
                    { value: 1, label: '线下' },
                    { value: 2, label: '线上+线下' },
                ]
            } else {
                this.formList = [
                    { value: '全部', label: '全部' },
                    { value: 1, label: '线下' },
                    { value: 2, label: '线上+线下' },
                ]
                if (this.activityFormList === 0) {
                    params.activityFormList = undefined
                }
                this.activityFormList = this.activityFormList === 0 ? '全部' : this.activityFormList
            }
            this.cityCode = value
            await this.updateSearchParam({
                ...params,
                pageNo: 1,
            })
        })
    }
}

export default EnrollListStore
