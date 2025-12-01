import http from '@/servers/http'
import { makeAutoObservable, runInAction } from 'mobx'
import type { AreaOption } from './interface'
import api from './api'

export default class AreaStore {
    areaList: AreaOption[] = []
    constructor() {
        makeAutoObservable(this)
    }
    type: 'city' | 'area' = 'city'
    // count: number = 0
    isInit: boolean = true

    setType = (type: 'city' | 'area') => {
        this.type = type
    }
    getLoad = async (selectedOptions: AreaOption[]) => {
        const targetOption = selectedOptions[selectedOptions.length - 1]

        let code = String(targetOption.value)
        targetOption.loading = true

        let res = await http(api.area, 'get', { parentCode: code })

        let isLeaf = false

        // 精确到市级
        if (this.type === 'city' && selectedOptions.length >= 1) {
            isLeaf = true
        }
        // 精确到区级
        else if (this.type === 'area' && selectedOptions.length >= 2) {
            isLeaf = true
        } else {
            isLeaf = false
        }

        targetOption.loading = false
        targetOption.children = []

        res?.map((item: any) => {
            targetOption?.children?.push({
                value: item.code,
                label: item.name,
                id: item.id,
                isLeaf,
            })
        })

        targetOption.loading = false
        this.areaList = [...this.areaList]
    }

    // 获取城市列表
    getAreaList = async (parentCode: string | number) => {
        let res: any = await http(api.area, 'get', { parentCode })
        // this.count=0
        let result: AreaOption[] = []
        res.map((item: any) => {
            result.push({
                value: item.code,
                label: item.name,
                isLeaf: false,
            })
        })

        if (parentCode === '0') {
            return runInAction(() => {
                this.areaList = result
            })
        } else {
            return result
        }
    }

    // 获取城市列表
    getAreaLeaf = async (parentCode: string | number) => {
        let res: any = await http(api.area, 'get', { parentCode })
        // this.count=0
        let result: AreaOption[] = []
        res.map((item: any) => {
            result.push({
                value: item.code,
                label: item.name,
                isLeaf: true,
            })
        })

        if (parentCode === '0') {
            return runInAction(() => {
                this.areaList = result
            })
        } else {
            return result
        }
    }

    initDafaultValue = async (value: string[]) => {
        if (Array.isArray(value)) {
            const [provinceCode, cityCode, areaCode] = value
            let cityData: AreaOption[], areaData: AreaOption[]
            if (cityCode) {
                cityData = (await this.getAreaList(provinceCode)) as AreaOption[]
                if (areaCode) {
                    areaData = (await this.getAreaLeaf(cityCode)) as AreaOption[]
                    cityData = cityData.map(cityItem => {
                        if (cityItem.value === String(cityCode)) {
                            cityItem.children = areaData
                        }
                        return cityItem
                    })
                }
            }
            this.isInit = false
            let data = [...this.areaList]
            data = data.map(areaItem => {
                if (areaItem.value === String(provinceCode)) {
                    areaItem.children = cityData?.map(v => ({ ...v, isLeaf: false }))
                }
                return areaItem
            })
            runInAction(() => {
                this.areaList = data
            })
        }
    }
}
