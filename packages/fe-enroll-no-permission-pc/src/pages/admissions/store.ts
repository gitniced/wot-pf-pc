import http from '@/servers/http'
// import { getSessionStorage } from "@/storage"
import { getCookie, getPortalCodeFromUrl } from '@wotu/wotu-components'
import { makeAutoObservable, runInAction } from 'mobx'
import api from './api'

interface SearchProps {
    entryCodeInteger?: string | undefined
    activityName?: string | undefined
    status?: string | undefined
    activityFormList?: any
    cityCode?: string
    pageSize?: number
    pageNo: number
}

class Store {
    public activeList: any = []
    public totalCount = 0
    public count = 0
    public loading = false

    public searchParams: SearchProps = {
        entryCodeInteger: undefined,
        activityName: undefined,
        status: undefined,
        pageNo: 1,
        pageSize: 9,
    }

    public selectOrg: any = {}
    public siteData: any = {}
    public query: any = {}

    public orgInfo: any = {}

    constructor() {
        makeAutoObservable(this)
    }
    setSiteData(value: any) {
        console.log(value)
        this.siteData = value
    }

    setQuery(value: any) {
        this.query = value
    }
    // 获取机构招生信息
    getOrgInfo() {
        const selectOrgCode = getCookie('SELECT_ORG_CODE')
        http(`${api.getPortalSetting}`, 'get', { orgCode: this.query?.code || selectOrgCode }).then(
            res => {
                this.orgInfo = res
            },
        )
    }
    /**
     * 活动列表
     */
    async getActiveList() {
        // const platform = getSessionStorage('PLATFORM')
        // const isPortal = platform === 'portal'
        const portalCode = getPortalCodeFromUrl()
        const organizationCode = portalCode

        this.loading = true

        let apiParams = {
            ...this.searchParams,
            sid: this.siteData?.sid,
            organizationCode: this.query?.code || organizationCode,
        }

        const res: any = await http(api.getSiteActivityList, 'post', apiParams).finally(() => {
            this.loading = false
        })

        const data = res.data as unknown as any[]
        const {
            organizationLogo = 'https://static.zpimg.cn/public/fe_user_pc/images/default_org@2x.png',
            organizationName,
        } = this.selectOrg

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

    updateSearchParam = async (
        params: SearchProps | Record<string, number | string | undefined> = {},
    ) => {
        this.searchParams = {
            ...this.searchParams,
            ...params,
        }
        await this.getActiveList()
    }
}

export default Store
