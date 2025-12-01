import { makeAutoObservable } from 'mobx'
import Http from '@/servers/http'
import API from './api'
import type { ResumeResult } from './interface'

class ResumeScoreStore {
    public resumeScoreResult: Partial<ResumeResult> = {}
    public loading: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    // 获取简历评分结果
    getResumeScoreResult = () => {
        this.loading = true
        return new Promise(resolve =>
            Http(API.getResumeScoreResult, 'POST', {})
                .then((res: any) => {
                    this.resumeScoreResult = res
                    resolve(res)
                })
                .finally(() => {
                    this.loading = false
                }),
        )
    }
}

export default ResumeScoreStore
