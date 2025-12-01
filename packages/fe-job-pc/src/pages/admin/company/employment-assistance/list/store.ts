import { makeAutoObservable } from 'mobx'
import { SERVICE_STATE } from './consts'
import { getAssistanceListApi, getListRecordUserApi, getServiceStatusCountApi } from './api'
import type { ListRecordUserItem } from './interface'

const _formatValue = (value?: string) => {
    return value ? value : undefined
}

class Store {
    constructor() {
        makeAutoObservable(this)
    }
    public loading: boolean = true

    public tabItems: { tab: string; key: number }[] = [
        { tab: `全部`, key: SERVICE_STATE.ALL },
        { tab: `调研中`, key: SERVICE_STATE.UnderInvestigation },
        { tab: `待诊断`, key: SERVICE_STATE.ToBeDiagnosed },
        { tab: `诊断中`, key: SERVICE_STATE.Diagnosing },
        { tab: `服务中`, key: SERVICE_STATE.InService },
        { tab: `已完成`, key: SERVICE_STATE.Completed },
    ]

    public statusCountMap: Record<number, number> = {
        [SERVICE_STATE.ALL]: 0,
        [SERVICE_STATE.UnderInvestigation]: 0,
        [SERVICE_STATE.ToBeDiagnosed]: 0,
        [SERVICE_STATE.Diagnosing]: 0,
        [SERVICE_STATE.InService]: 0,
        [SERVICE_STATE.Completed]: 0,
    }

    public listRecordUser: { label: string; value: string | null }[] = []

    getServiceStatusCount = (organizationCode: string) => {
        getServiceStatusCountApi({
            organizationCode,
            stateList: [
                SERVICE_STATE.UnderInvestigation,
                SERVICE_STATE.ToBeDiagnosed,
                SERVICE_STATE.Diagnosing,
                SERVICE_STATE.InService,
                SERVICE_STATE.Completed,
            ],
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
            params.stateList = [
                SERVICE_STATE.UnderInvestigation,
                SERVICE_STATE.ToBeDiagnosed,
                SERVICE_STATE.Diagnosing,
                SERVICE_STATE.InService,
                SERVICE_STATE.Completed,
            ]
        }

        return await getAssistanceListApi(params)
    }

    getListRecordUser = (organizationCode: string) => {
        getListRecordUserApi(organizationCode).then(res => {
            this.listRecordUser = [
                { label: '全部', value: null },
                // eslint-disable-next-line no-unsafe-optional-chaining
                ...(res as unknown as ListRecordUserItem[])?.map(item => ({
                    label: item.name,
                    value: item.code,
                })),
            ]
        })
    }
}

export default new Store()
