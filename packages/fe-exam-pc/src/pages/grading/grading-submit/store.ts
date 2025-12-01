import { makeAutoObservable } from 'mobx'
import type { SubmitListReq, submitReq } from './interface'
import { getSubmitList, submitGrading } from './api'

class GradingSubmitStore {
    constructor() {
        makeAutoObservable(this)
    }

    public totalCount: number = 0

    getSubmitList = async (params: SubmitListReq) => {
        const res: any = await getSubmitList(params)
        const { data = [], totalCount = 0, success = true } = res
        this.totalCount = totalCount
        return { data, totalCount, success }
    }

    submitGrading(params: submitReq) {
        return new Promise((resolve, reject) => {
            submitGrading(params).then(res => {
                res && resolve(res)
                !res && reject()
            })
        })
    }
}

export default new GradingSubmitStore()
