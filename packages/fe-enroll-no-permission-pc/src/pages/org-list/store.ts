import http from '@/servers/http'
import api from './api'
import { makeAutoObservable, runInAction } from 'mobx'
// import { getLocalStorage, getSessionStorage } from '@/storage'
// import { cloneDeep } from 'lodash'
// import dayjs from 'dayjs'
import type { CategoryListItem } from './interface'
import { getPortalCodeFromUrl } from '@wotu/wotu-components'
// 班级培训 => 培训报名
interface SearchProps {
    address?: string | undefined
    activityName?: string | undefined
    status?: string | undefined
    activityFormList?: any
    cityCode?: string
    pageSize?: number
    pageNo: number
}

class EnrollListStore {
    public orgList: any = []
    public totalCount = 0
    public count = 0
    public loading = false

    public courseOpen = false
    public cateOpen = false

    public searchParams: SearchProps = {
        address: undefined,
        activityName: undefined,
        status: undefined,
        pageNo: 1,
        pageSize: 10,
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

    /** 报名项目*/
    public address?: string[]

    /** 状态*/
    public status?: string

    public categoryId?: any

    public formList: any[] = [
        { value: '全部', label: '全部' },
        { value: 0, label: '线上' },
        { value: 1, label: '线下' },
        { value: 2, label: '线上+线下' },
    ]

    public cityCode?: any
    public courseList: any[] = []

    public activityName: string = ''

    public ApplyProjectOptions: any[] = [{ value: '全部', label: '全部' }]

    public siteData: any = {}

    constructor() {
        makeAutoObservable(this)
    }

    updateSiteData = (data: any) => {
        this.siteData = data
    }

    updateSearchParam = async (
        params: SearchProps | Record<string, number | string | undefined> = {},
    ) => {
        this.searchParams = {
            ...this.searchParams,
            ...params,
        }
        await this.getOrgList()
    }

    changeSearch(e: any) {
        this.activityName = e.target.value
    }
    /**
     * 搜索报名活动名称
     */
    onSearch(value: string) {
        runInAction(async () => {
            await this.updateSearchParam({ name: value ? value : undefined, pageNo: 1 })
        })
    }

    /**
     * 活动列表
     */
    async getOrgList() {
        const portalCode = getPortalCodeFromUrl()
        const organizationCode = portalCode

        this.loading = true

        let apiParams = {
            ...this.searchParams,
            sid: this.siteData?.sid,
            organizationCode,
        }

        const res: any = await http(api.getOrgList, 'post', apiParams).finally(() => {
            this.loading = false
        })

        const data = res.data as unknown as any[]

        runInAction(() => {
            this.count = res.currentPage
            this.totalCount = res.totalCount
            this.searchParams.pageNo = this.searchParams.pageNo + 1
            this.orgList = [...data.map(item => ({ ...item }))]
        })
    }

    getCityListByParentCode = (parentCode: number) => {
        return http(api.city, 'GET', { parentCode })
    }

    /**
     * 选中分类
     * @param {string} value
     */
    onSelectCategory = (value: string[]) => {
        // const { province, city, area } = this.siteData?.baseInfo || {}
        // let address = [province, city, area].filter(i => i && i !== '0')
        // address = [...address, ...(value || [])]
        const [p, c, a] = value || []
        runInAction(async () => {
            this.address = value
            await this.updateSearchParam({
                province: p,
                city: c,
                area: a,
                pageNo: 1,
            })
        })
    }
}

export default EnrollListStore
