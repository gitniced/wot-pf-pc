import { makeAutoObservable } from 'mobx'
import api from './api'
import http from '@/servers/http'
import type { TableData } from '@/types'
import type { BasePaginationRspTaskAssessmentPageDto } from './interface'

class store {
    constructor() {
        makeAutoObservable(this)
    }

    /**是否请求成功 */
    public hasRequest: boolean = false
    /**待评分数量 */
    public pendingGradeCount: number = 0
    /**课堂表现数据 */
    // public taskExamList: ClassPerformancePageDto[] = []

    getClassTaskExamList = async (params: any) => {
        this.hasRequest = false
        const countParams = {
            ...params,
        }
        delete countParams.pageNo
        delete countParams.pageSize
        delete countParams.pendingGrade
        const resCount = await http(api.getTaskExamPendingGradeCount, 'post', countParams)
        this.pendingGradeCount = (resCount || 0) as unknown as number
        const res = await http(api.getTaskExamList, 'post', params)
        this.hasRequest = true
        return res as unknown as TableData<BasePaginationRspTaskAssessmentPageDto[]>
    }
}

export default store
