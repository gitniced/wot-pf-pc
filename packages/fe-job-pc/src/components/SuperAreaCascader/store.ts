import http from '@/servers/http'
import { makeAutoObservable, runInAction } from 'mobx'
import type { AreaOption, Type } from './interface'
import api from './api'
import { UserRegion } from '@/pages/admin/service/hierarchical-diagnosis/list/interface'

export default class AreaStore {
    constructor() {
        makeAutoObservable(this)
    }

    public areaList: AreaOption[] = []
    // 市 ｜ 区 ｜ 街道 ｜ 社区
    public type: Type = 'city'
    public isInit: boolean = true
    public userRegionMap: Record<number, string | undefined> = {}

    setType = (type: Type) => {
        this.type = type
    }

    setUserRegionMap = (userRegion?: Partial<UserRegion>) => {
        const { province, city, area, street, village } = userRegion ?? {}
        const userRegionMap: Record<number, string | undefined> = {
            1: province,
            2: city,
            3: area,
            4: street,
            5: village,
        }
        this.userRegionMap = userRegionMap
    }

    getLoad = async (selectedOptions: AreaOption[]) => {
        let targetOption = selectedOptions[selectedOptions.length - 1]
        const code = String(targetOption.value)

        const res = (await http(
            api.area,
            'get',
            { parentCode: code },
            { repeatFilter: false },
        )) as unknown as AreaOption[]

        targetOption.loading = true

        let isLeaf = false

        // 精确到市级
        if (this.type === 'city' && selectedOptions.length >= 1) {
            isLeaf = true
        } else if (this.type === 'area' && selectedOptions.length >= 2) {
            // 精确到区级
            isLeaf = true
        } else if (this.type === 'street' && selectedOptions.length >= 3) {
            // 精确到街道
            isLeaf = true
        } else if (this.type === 'village' && selectedOptions.length >= 4) {
            // 精确到社区
            isLeaf = true
        } else {
            isLeaf = false
        }

        targetOption.loading = false
        targetOption.children = []

        res?.map((item: any) => {
            if (item.code === this.userRegionMap[item.level] || !this.userRegionMap[item.level]) {
                targetOption?.children?.push({
                    id: item.id,
                    level: item.level,
                    value: item.code,
                    label: item.name,
                    isLeaf: item.level === 0 || isLeaf,
                })
            }
        })

        targetOption.loading = false
        this.areaList = [...this.areaList]
    }

    /**
     * 获取城市列表
     *
     * @param {(string | number)} parentCode 父级code
     * @param {*} isLeaf 是否是叶子 默认false 代表有下一级
     * @memberof AreaStore
     */
    getAreaList = async (parentCode: string | number, isLeaf?: boolean, allValue?: string | number) => {
        const res: any = await http(api.area, 'get', { parentCode }, { repeatFilter: false })
        const result: AreaOption[] = []
        res.map((item: any) => {
            result.push({
                value: item.code,
                label: item.name,
                level: item.level,
                isLeaf: isLeaf,
                disabled: !!(allValue)
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

    initDefaultValue = async (value?: (string | undefined)[], allowValue?: (string | undefined)[]) => {
        if (Array.isArray(value)) {
            const [provinceCode, cityCode, areaCode, streetCode] = value
            const [aProvinceCode, aCityCode, aAreaCode, aStreetCode] = allowValue || []
            let cityData: AreaOption[],
                areaData: AreaOption[],
                streetData: AreaOption[],
                villageData: AreaOption[]
            // 根据type区分二级（市）的数据是否为叶子

            if (provinceCode) {
                cityData = (await this.getAreaList(provinceCode, undefined, aCityCode)) as AreaOption[]
                if (cityCode) {
                    areaData = (await this.getAreaList(cityCode, undefined, aAreaCode)) as AreaOption[]

                    if (areaCode) {
                        streetData = (await this.getAreaList(areaCode, undefined, aStreetCode)) as AreaOption[]

                        if (streetCode) {
                            villageData = (await this.getAreaList(streetCode)) as AreaOption[]

                            streetData = streetData.map(streetItem => {
                                if (streetItem.value === String(streetCode)) {
                                    streetItem.children = villageData
                                }
                                return streetItem
                            })
                        }

                        areaData = areaData.map(areaItem => {
                            if (areaItem.value === String(areaCode)) {
                                areaItem.children = streetData
                            }
                            return areaItem
                        })
                    }

                    cityData = cityData.map(cityItem => {
                        if (cityItem.value === String(cityCode)) {
                            cityItem.children = areaData
                        }
                        return cityItem
                    })
                }
            }

            this.isInit = false
            const data = [...this.areaList]
                .map(areaItem => {
                    if (areaItem.value === String(provinceCode)) {
                        areaItem.children = cityData
                    }
                    if (aProvinceCode) {
                        areaItem.disabled = true
                    }
                    return areaItem
                })
                .filter(
                    item =>
                        item.value === this.userRegionMap[item.level!] ||
                        !this.userRegionMap[item.level!],
                )

            runInAction(() => {
                this.areaList = data
            })
        }
    }
}
