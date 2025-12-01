import { makeAutoObservable } from "mobx"
import type { RecordDetail } from "./interface"
import { getRecordDetail } from "./api"


class RecordDetailStore {
    constructor() {
        makeAutoObservable(this)
    }

    public recordDetail: Partial<RecordDetail> = {}
    // 数据是否正在加载中
    public loading: boolean = false
    // 错误信息
    public errMsg: string = ''

    getRecordDetail(stuExamCode: string) {
        this.loading = true
        getRecordDetail(stuExamCode).then((res: any) => {
            this.recordDetail = res
        }).catch((message: string) => {
            this.errMsg = message
        }).finally(() => {
            this.loading = false
        })
    }
}

export default new RecordDetailStore()