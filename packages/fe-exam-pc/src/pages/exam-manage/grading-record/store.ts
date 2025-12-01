// 阅卷记录Store

import { makeAutoObservable } from 'mobx'
import type { RecordListReq } from './interface'
import { getGradingRecordList } from './api'
class RecordStore {
    constructor() {
        makeAutoObservable(this)
    }

    async getRecordList(params: RecordListReq) {
        const res: any = await getGradingRecordList(params)
        const { totalCount = 0, data = [] } = res

        return { data, totalCount, success: true }
    }
}

export default new RecordStore()
