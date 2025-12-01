import http from '@/servers/http'
import api from './api'
import { makeAutoObservable, runInAction } from 'mobx'
import type { ApplyActivitySiteListRespDto } from '@/@types/apply'
import { getSessionStorage } from '@/storage'
import { getPortalCodeFromUrl } from '@/utils/getPortalCodeFromUrl'
// 需要判断是否勾选了【考务】 exam => 评价报名
// 班级培训 => 培训报名

class EnrollListStore {
    public loading: boolean = false
    public activeList: ApplyActivitySiteListRespDto[] = []
    public orgList: any[] = []
    public selectOrg: any = {}

    constructor() {
        makeAutoObservable(this)
    }

    updateSelectOrg(value: any) {
        this.selectOrg = value
    }

    async getActiveList(sid: string) {
        this.loading = true
        const platform = getSessionStorage('PLATFORM')
        const isPortal = platform === 'portal'

        const portalCode = getPortalCodeFromUrl()

        const organizationCode = portalCode

        const apiUrl = isPortal ? api.getSaasActivityList : api.getSiteActivityList

        let apiParams = isPortal
            ? {
                  organizationCode,
                  pageNo: 1,
                  pageSize: 6,
                  sid,
              }
            : {
                  pageNo: 1,
                  pageSize: 6,
                  sid,
              }

        const res: any = await http(apiUrl, 'post', apiParams).finally(() => {
            this.loading = false
        })

        const {
            organizationLogo = 'https://static.zpimg.cn/public/fe_user_pc/images/default_org@2x.png',
            organizationName,
        } = this.selectOrg || {}
        const data = res.data as unknown as ApplyActivitySiteListRespDto[]

        runInAction(() => {
            this.activeList = [
                ...data.map(item => ({ organizationLogo, organizationName, ...item })),
            ]
        })
    }

    // 获取精选机构
    getSelectedPortalOrg = (sid: string) => {
        http(api.selected_portal_org, 'post', { limitCount: 10, sid }).then((data: any) => {
            this.orgList = data
        })
    }
}

export default EnrollListStore
