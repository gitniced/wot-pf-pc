import http from '@/servers/http'
import api from './api'
import { makeAutoObservable, runInAction } from 'mobx'
import { getLocalStorage } from '@/storage'
// import { cloneDeep } from 'lodash'
// import dayjs from 'dayjs'
import type { CategoryListItem } from './interface'
// 班级培训 => 培训报名
interface SearchProps {
    categoryCodes?: string[] | undefined
    activityName?: string | undefined
    activityStatus?: string | undefined
    title?: string | undefined
    pageSize?: number
    pageNo: number
}

class PictureListStore {
    public searchStr: string = ''
    public activeList = []
    public totalCount = 0
    public count = 0
    public loading = false

    public searchParams: SearchProps = {
        categoryCodes: undefined,
        activityName: undefined,
        activityStatus: undefined,
        title: undefined,
        pageNo: 1,
        pageSize: 10,
    }

    /** 分类列表*/
    public categoryList: CategoryListItem[] = [
        {
            code: '全部',
            sid: '',
            siteName: '',
            organizationCode: '',
            organizationName: '',
            name: '全部',
            createdAt: '',
            sort: '',
        },
    ]

    /** 分类*/
    public catalogCode: string = '全部'

    constructor() {
        makeAutoObservable(this)
    }

    updateSearchParam = async (
        params: SearchProps | Record<string, number | string | undefined> = {},
    ) => {
        if (params?.categoryCodes?.length > 0) {
            this.catalogCode = params?.categoryCodes?.[0] || ''
        }
        this.searchStr = params?.title || ''
        this.searchParams = {
            ...this.searchParams,
            ...params,
        }
        await this.getActiveList()
    }

    initSearchParam = () => {
        this.searchParams = {
            categoryCodes: undefined,
            activityName: undefined,
            activityStatus: undefined,
            pageNo: 1,
            pageSize: 10,
        }
    }
    /**
     * 搜索文本更新
     */
    onChange = (e: any) => {
        this.searchStr = e?.target?.value || ''
    }
    /**
     * 搜索报名活动名称
     */
    onSearch = (value: string) => {
        runInAction(async () => {
            await this.updateSearchParam({ title: value ? value : undefined, pageNo: 1 })
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

        const res: any = await http(api.getImageTextList, 'post', apiParams).finally(() => {
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
            (await http(api.getCategoryList, 'post', {
                sid: getLocalStorage('SID'),
                pageNo: 1,
                pageSize: 100,
            })) || []
        const { data: cateList = [] } = resData || {}
        this.categoryList = [
            {
                code: '全部',
                sid: '',
                siteName: '',
                organizationCode: '',
                organizationName: '',
                name: '全部',
                createdAt: '',
                sort: '',
            },
        ].concat(cateList)
    }

    /**
     * 选中分类
     * @param {string} value
     */
    onSelectCategory = (value: string) => {
        runInAction(async () => {
            this.catalogCode = value
            await this.updateSearchParam({
                categoryCodes: value === '全部' ? undefined : [value],
                pageNo: 1,
            })
        })
    }

    /**
     * 选中状态
     * @param {string} value
     */
    onSelectStatus = (value: string) => {
        runInAction(async () => {
            this.activityStatus = value
            await this.updateSearchParam({
                activityStatus: value === '全部' ? undefined : value,
                pageNo: 1,
            })
        })
    }
}

export default PictureListStore
