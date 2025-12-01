import { makeAutoObservable } from 'mobx'
import api from './api'
import http from '@/servers/http'
import type { TeahcerClassQuestionPageResDto } from './interface'

class store {
    constructor() {
        makeAutoObservable(this)
    }

    /**是否请求成功 */
    public hasRequest: boolean = false
    /**待评分数量 */
    public pendingGradeCount: number = 0

    getClassQuestionPage = async (params: any) => {
        this.hasRequest = false
        const countParams = {
            ...params,
        }
        delete countParams.pageNo
        delete countParams.pageSize
        delete countParams.pendingGrade
        const res = await http<any, TeahcerClassQuestionPageResDto>(
            api.getClassQuestionPage,
            'post',
            params,
        )
        this.pendingGradeCount = res.toCorrect || 0
        this.hasRequest = true
        return res.page
    }
}

export default store
