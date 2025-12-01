import { makeAutoObservable } from 'mobx'
import type { CommonJobParams } from './interface'
import { getCommonJobListApi } from './api'

import { getLocalStorage } from '@/storage'
import { generateCommonJobList } from '@/pages/question/[type]/utils'

class Store {
    constructor() {
        makeAutoObservable(this)
    }
    public defaultCommonJobParams = {
        pageNo: 1,
        pageSize: 10,
        sid: getLocalStorage('SID'),
        enableStatus: 1,
    }
    // 职业/工种/等级 搜索条件
    public commonJobParams: CommonJobParams = this.defaultCommonJobParams
    // 职业/工种/等级 下拉数据
    public commonJobList = []

    //获取职业/工种/等级下拉列表
    async getCommonJobList(params: Partial<CommonJobParams>) {
        this.commonJobParams = { ...this.commonJobParams, ...params }

        const { pageNo = 1 } = this.commonJobParams

        // @ts-ignore
        const { data, totalCount, pageSize = 10 } = await getCommonJobListApi(this.commonJobParams)

        return {
            data: generateCommonJobList(data) || [],
            nextPage: pageNo + 1,
            isNext: params.name ? true : pageNo * pageSize < totalCount,
        }
    }

    // 搜索额外的职业/工种/等级
    async getExtraCommonJobList(idList: number[]) {
        // @ts-ignore
        const { data } = await getCommonJobListApi({ ...this.defaultCommonJobParams, idList })

        this.commonJobList = generateCommonJobList(data) || []
    }
}

export default new Store()
