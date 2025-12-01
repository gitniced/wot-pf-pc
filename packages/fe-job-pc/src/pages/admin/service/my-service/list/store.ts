import { makeAutoObservable } from 'mobx'
import {
    getAssistanceListApi,
    getListRecordOrganizationApi,
    getServiceStatusCountApi,
    getStatus,
    getUserRegionApi,
} from './api'
import type { ListRecordOrganizationItem, UserRegion } from './interface'
import { SERVICE_STATE } from '@/pages/admin/company/employment-assistance/list/consts'
import type { Type } from '@/components/SuperAreaCascader/interface'

const formatValue = (value?: string) => {
    return value ? value : undefined
}

class Store {
    constructor() {
        makeAutoObservable(this)
    }
    public loading: boolean = true

    public tabItems: { tab: string; key: number }[] = [
        { tab: `全部`, key: SERVICE_STATE.ALL },
        { tab: '服务中', key: SERVICE_STATE.InService },
        { tab: '已完成', key: SERVICE_STATE.Completed },
    ]

    public statusCountMap: Record<number, number> = {
        [SERVICE_STATE.ALL]: 0,
        [SERVICE_STATE.InService]: 0,
        [SERVICE_STATE.Completed]: 0,
    }

    public userRegin: Partial<UserRegion> = {}
    public defaultServiceUnit: (string | undefined)[] = []
    public listRecordOrganization: { label: string; value: string }[] = []
    public levelToType: Type = 'city'

    getServiceStatusCount = () => {
        getServiceStatusCountApi({
            stateList: [SERVICE_STATE.InService, SERVICE_STATE.Completed],
        }).then(res => {
            const all = Object.values(res).reduce((p, c) => Number(c) + Number(p), 0)
            this.statusCountMap = { ...res, [SERVICE_STATE.ALL]: all } as any
            this.loading = false
        })
    }

    getServiceList = async (params: any) => {
        if (params.serviceStaffUserCode === '全部') {
            delete params.serviceStaffUserCode
        }

        if (params.state === SERVICE_STATE.ALL) {
            delete params.state
            params.stateList = [SERVICE_STATE.InService, SERVICE_STATE.Completed]
        }

        return await getAssistanceListApi(params)
    }

    getUserRegin = () => {
        getUserRegionApi().then(res => {
            this.userRegin = (res as unknown as UserRegion) ?? {}
            const { province, city, area, street, village } = this.userRegin ?? {}

            this.defaultServiceUnit = [
                formatValue(province),
                formatValue(city),
                formatValue(area),
                formatValue(street),
                formatValue(village),
            ]
        })
    }

    getListRecordOrganization = () => {
        getListRecordOrganizationApi().then(res => {
            this.listRecordOrganization = (res as unknown as ListRecordOrganizationItem[])?.map(
                item => ({
                    label: item.name,
                    value: item.organizationCode,
                }),
            )
        })
    }

    // 获取禁用状态
    getStatus = (code: string) => {
        return getStatus(code)
    }
}

export default new Store()
