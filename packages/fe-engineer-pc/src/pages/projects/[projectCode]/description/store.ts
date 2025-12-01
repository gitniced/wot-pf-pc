import { makeAutoObservable } from 'mobx'
import api from './api'
import http from '@/servers/http'
import type { AssessmentProjectDesDto } from './interface'

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

    /** 考核项目说明（包含评分细则表格） */
    public description: AssessmentProjectDesDto = {}

    /**  获取考核项目说明（包含评分细则表格）  */
    getDescription = async (projectCode: string) => {
        http(api.getDescription, 'get', {
            projectCode,
        })
            .then(data => {
                this.description = data as unknown as AssessmentProjectDesDto
            })
            .finally(() => {
                this.hasRequest = true
            })
    }
}

export default store
