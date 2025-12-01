import http from '@/servers/http'
import { makeAutoObservable, runInAction } from 'mobx'
import type { LoadingOption } from './interface'

export default class LoadingStore {
    constructor() {
        makeAutoObservable(this)
    }

    loadingList: LoadingOption[] = []
    api: string = ''
    isInit: boolean = true

    setApi = (api: string) => {
        this.api = api
    }

    getLoad = async (selectedOptions: LoadingOption[]) => {
        const targetOption = selectedOptions?.[selectedOptions?.length - 1]

        let code = String(targetOption?.id) || ''
        if (!code) return

        targetOption.loading = true

        let res = (await http(this.api, 'get', { parentCode: code })) || []

        targetOption.loading = false
        targetOption.children = []

        res?.map((item: any) => {
            targetOption?.children?.push({
                value: item?.id,
                label: item?.name,
                id: item?.id,
                isLeaf: true,
            })
        })

        targetOption.loading = false
        this.loadingList = [...this.loadingList]
    }

    // 获取列表
    getLoadingList = async (parentCode: string | number) => {
        let res: any = (await http(this.api, 'get', { parentCode })) || []
        let result: LoadingOption[] = []
        runInAction(() => {
            res.map((item: any) => {
                result?.push?.({
                    value: item?.id,
                    label: item?.name,
                    isLeaf: false,
                    id: item?.code,
                })
            })
        })

        if (parentCode === '0') {
            this.loadingList = result
        } else {
            return result
        }
    }

    initDafaultValue = async (value: { code: string }[]) => {
        if (!value?.length) return
        if (Array.isArray(value)) {
            const { code: firstCode } = value[0] || {}
            const { code: secondCode } = value[1] || {}
            let secondData: LoadingOption[]
            if (secondCode) {
                secondData = (await this.getLoadingList(firstCode)) as LoadingOption[]
            }
            this.isInit = false
            let data = [...this.loadingList]

            data = data.map(areaItem => {
                if (String(areaItem?.id) === String(firstCode)) {
                    areaItem.children = secondData?.map(v => ({ ...v, isLeaf: true }))
                }
                return areaItem
            })

            runInAction(() => {
                this.loadingList = [...data]
            })
        }
    }
}
