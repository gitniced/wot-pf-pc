import http from '@/servers/http'
import api from './api'
import { makeAutoObservable, runInAction } from 'mobx'
import { getLocalStorage, getSessionStorage } from '@/storage'
import type { CategoryListItem } from './interface'
import { getPortalCodeFromUrl } from '@wotu/wotu-components'
// 班级培训 => 培训报名
interface SearchProps {
    entryCodeInteger?: string | undefined
    activityName?: string | undefined
    status?: string | undefined
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

    public courseOpen = false
    public cateOpen = false

    public searchParams: SearchProps = {
        entryCodeInteger: undefined,
        activityName: undefined,
        status: undefined,
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

    /** 报名项目*/
    public entryCodeInteger?: string

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

    public selectOrg: any = {}

    constructor() {
        makeAutoObservable(this)
    }

    updateSelectOrg = (value: any) => {
        this.selectOrg = value
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
        await this.getActiveList()
    }

    initSearchParam() {
        this.searchParams = {
            entryCodeInteger: undefined,
            activityName: undefined,
            status: undefined,
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
            await this.updateSearchParam({ name: value ? value : undefined, pageNo: 1 })
        })
    }
    /**
     * 活动列表
     */
    async getActiveList() {
        const platform = getSessionStorage('PLATFORM')
        const isPortal = platform === 'portal'
        const portalCode = getPortalCodeFromUrl()
        const organizationCode = portalCode

        this.loading = true

        let apiParams = {
            ...this.searchParams,
            sid: this.siteData?.sid,
            organizationCode,
        }

        const res: any = await http(
            isPortal ? api.getSaasActivityList : api.getSiteActivityList,
            'post',
            apiParams,
        ).finally(() => {
            this.loading = false
        })

        const data = res.data as unknown as any[]
        const {
            organizationLogo = 'https://static.zpimg.cn/public/fe_user_pc/images/default_org@2x.png',
            organizationName,
        } = this.selectOrg || {}

        runInAction(() => {
            this.count = res.currentPage
            this.totalCount = res.totalCount
            this.searchParams.pageNo = this.searchParams.pageNo + 1
            console.log(data)
            this.activeList = [
                ...data.map(item => ({ organizationLogo, organizationName, ...item })),
            ]
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

    getCityData = async () => {
        let resData: any =
            (await http(api.getListCourseType, 'post', {
                pageNo: 1,
                pageSize: 1000,
                sid: getLocalStorage('SID'),
            })) || []
        this.courseList = [
            {
                id: '全部',
                name: '全部',
            },
        ].concat(resData.data || [])
    }

    /**
     * 选中分类
     * @param {string} value
     */
    onSelectCategory = (value: string) => {
        runInAction(async () => {
            this.entryCodeInteger = value
            await this.updateSearchParam({
                entryCodeInteger: value === '全部' ? undefined : value,
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
            this.status = value
            await this.updateSearchParam({
                status: value === '全部' ? undefined : value,
                pageNo: 1,
            })
        })
    }

    changeCategoryId(value: any[]) {
        if (JSON.stringify(this.categoryId) === JSON.stringify(value)) {
            return
        }
        runInAction(async () => {
            this.categoryId = value
            const [careerId, workId, levelId] = value || []
            await this.updateSearchParam({
                careerId: careerId?.value,
                workId: workId?.value,
                levelId: levelId?.value,
                pageNo: 1,
            })
        })
    }

    async onChangeArea(value: string) {
        let params: any = {
            courseCode: value[0] === '全部' ? undefined : value[0],
        }
        this.cityCode = value
        await this.updateSearchParam({
            ...params,
            pageNo: 1,
        })
    }

    /** 查询站点详情
     *  看站点平台配置  报名设置
     */
    getSiteDetail = async () => {
        const { configList = [] } = this.siteData || {}
        //   reviews_plan 评价计划  training_plan 班级报名  training_class 培训班级
        const applyOptions: any = []

        const addItem = (key: string, label: string, value: number) => {
            const item = configList.find(
                (i: { key: string; value: string }) => i?.key === key && i?.value === '1',
            )
            if (item) {
                if (value === 9) {
                    this.courseOpen = true
                }
                if ([2, 4, 6].includes(value)) {
                    this.cateOpen = true
                }
                applyOptions.push({ label, value })
            }
        }

        addItem('reviews_plan', '评价计划', 2)
        addItem('training_plan', '班级报名', 3)
        addItem('training_class', '培训班级', 4)
        addItem('skills_competition', '技能竞赛', 6)
        addItem('common', '通用', 8)
        addItem('course_apply', '课程报名', 9)
        console.log(applyOptions)
        this.ApplyProjectOptions = [...this.ApplyProjectOptions, ...applyOptions]

        console.log(
            '🍊   this.ApplyProjectOptions:',
            JSON.parse(JSON.stringify(this.ApplyProjectOptions)),
        )
    }
}

export default EnrollListStore
