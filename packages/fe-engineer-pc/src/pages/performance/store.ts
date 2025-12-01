import { makeAutoObservable } from 'mobx'
import api from './api'
import http from '@/servers/http'
import type { TableData } from '@/types'
import type { ClassPerformancePageDto } from './interface'

class store {
    constructor() {
        makeAutoObservable(this)
    }

    /**是否请求成功 */
    public hasRequest: boolean = false
    /**课堂表现数据 */
    public classPerformance: ClassPerformancePageDto[] = []

    getClassPerformance = async (params: any) => {
        this.hasRequest = false
        const res = await http(api.getClassPerformance, 'post', params)
        this.hasRequest = true
        return res as unknown as TableData<ClassPerformancePageDto[]>
    }
}

export default store
