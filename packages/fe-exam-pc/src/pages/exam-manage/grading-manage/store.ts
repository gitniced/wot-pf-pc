import { makeAutoObservable } from 'mobx'
import type { GradingListItem, GradingReq } from './interface'
import { getGradingList } from './api'

class MarkManageStore {
    constructor() {
        makeAutoObservable(this)
    }

    // 阅卷任务列表
    public gradingList: GradingListItem[] = []
    public totalCount: number = 0

    async getGradingList(params: GradingReq) {
        const res: any = await getGradingList(params)
        const { data = [], totalCount } = res ?? {}

        return { data, totalCount, success: true }
    }
}

export default new MarkManageStore()
