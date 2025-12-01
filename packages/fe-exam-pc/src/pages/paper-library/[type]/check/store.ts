import { makeAutoObservable } from 'mobx'
import type { RepeatedPaperDetail, RepeatedPaperDetailParams, DeleteParams } from './interface'
import { deleteQuestionApi, getPaperTitleApi, getRepeatedPapaerDetailApi } from './api'

class QuestionCheckStore {
    constructor() {
        makeAutoObservable(this)
    }

    public repeatedPaperDetail: Partial<RepeatedPaperDetail> = {}
    public paperTitle: string | undefined

    // 获取试卷Title
    getPaperTitle = (code: string, commonParams: any) => {
        getPaperTitleApi(code, commonParams).then((res: any) => {
            this.paperTitle = res.title
        })
    }

    // 查询重复试卷详情
    getRepeatedPapaerDetail = (params: RepeatedPaperDetailParams, commonParams: any) => {
        return new Promise(resolve => {
            getRepeatedPapaerDetailApi({ ...params, ...commonParams }).then(res => {
                this.repeatedPaperDetail = res as unknown as RepeatedPaperDetail
                resolve((res as unknown as RepeatedPaperDetail).totalGroup)
            })
        })
    }

    // 删除试题
    deleteQuestion(params: DeleteParams[]) {
        return deleteQuestionApi(params)
    }
}

export default new QuestionCheckStore()
