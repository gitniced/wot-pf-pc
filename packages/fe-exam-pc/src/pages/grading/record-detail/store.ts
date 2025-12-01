import { makeAutoObservable } from 'mobx'
import type { RecordListReq } from './interface'
import { getRecordDetail } from './api'

class RecordDetailStore {
    constructor() {
        makeAutoObservable(this)
    }

    getRecordDetailList = async (params: RecordListReq) => {
        return getRecordDetail(params)
    }
}

export default new RecordDetailStore()
