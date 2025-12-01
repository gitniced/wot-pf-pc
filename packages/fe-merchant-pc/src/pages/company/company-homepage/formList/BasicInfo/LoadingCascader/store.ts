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

        let res: any = (await http(this.api, 'get', { parentCode: code })) || []

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

    initDafaultValue = async (value: string[]) => {
        if (!value?.length) return
        if (Array.isArray(value)) {
            let data = [...this.loadingList]
            let secondData: LoadingOption[]
            if (value[1]) {
                const parentCode = data.find(item => item.value === value[0])?.id
                secondData = (await this.getLoadingList(parentCode!)) as LoadingOption[]
            }
            this.isInit = false

            data = data.map(areaItem => {
                if (areaItem?.value === value[0]) {
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
