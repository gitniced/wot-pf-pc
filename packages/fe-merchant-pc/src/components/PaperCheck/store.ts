import { makeAutoObservable } from 'mobx'
import type { RepeatedPaperDetail, RepeatedPaperDetailParams } from './interface'
import { getPaperTitleApi, getRepeatedPapaerDetailApi } from './api'
import { deleteQuestionApi } from '@/components/QuestionCheck/api'
import { CommonParams } from '@/hooks/useCommonParams'

class QuestionCheckStore {
    constructor() {
        makeAutoObservable(this)
    }

    public repeatedPaperDetail: Partial<RepeatedPaperDetail> = {}
    public paperTitle: string | undefined

    // 获取试卷Title
    getPaperTitle = (code: string) => {
        getPaperTitleApi(code).then((res: any) => {
            this.paperTitle = res.title
        })
    }

    // 查询重复试卷详情
    getRepeatedPapaerDetail = (params: RepeatedPaperDetailParams) => {
        return new Promise(resolve => {
            getRepeatedPapaerDetailApi(params).then(res => {
                this.repeatedPaperDetail = res as unknown as RepeatedPaperDetail
                resolve((res as unknown as RepeatedPaperDetail).totalGroup)
            })
        })
    }

    // 删除试题
    deleteQuestion(codeList: string[]) {
        return deleteQuestionApi(codeList)
    }
}

export default new QuestionCheckStore()
