import { makeAutoObservable } from 'mobx'
import api from './api'
import http from '@/servers/http'
import type { EvaluationStatisticsDto } from './interface'

class store {
    constructor() {
        makeAutoObservable(this)
        if (!store.instance) {
            store.instance = this
        }
        return store.instance
    }
    /**是否请求成功 */
    public hasRequest: boolean = false

    /**课程统计信息 */
    public personExamineStatistics: Partial<EvaluationStatisticsDto> = {}

    /**获取个人评价任务统计 */
    getPersonExamineStatistics = async (scheduleCode: string) => {
        http(api.getPersonExamineStatistics, 'get', {
            scheduleCode,
        })
            .then(data => {
                this.personExamineStatistics = (data || []) as unknown as EvaluationStatisticsDto
            })
            .finally(() => {
                this.hasRequest = true
            })
    }
}

export default store
