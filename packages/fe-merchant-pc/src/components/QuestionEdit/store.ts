import { makeAutoObservable } from 'mobx'
import type { DEFAULT_QUESTION_ITEM_TYPE } from './const'
import { getDefaultQuestionItem } from './const'
import http from '@/servers/http'
import api from './api'

import { getCookie } from '@/storage'

import { transFromSelfData, transFromFieldsValue } from './transFromValue'
import { QUESTION_TYPE_ENUM } from '@/constants'
import type { RepeatTaskParams } from '../QuestionCheck/interface'
import { getRepeatedQuestionListByTitleApi } from '../QuestionCheck/api'

let instance: DetailStore

class DetailStore {
    constructor() {
        makeAutoObservable(this)
    }
    // 题型
    workLevel: QUESTION_TYPE_ENUM = QUESTION_TYPE_ENUM.SINGLE

    // 题目数据
    question: DEFAULT_QUESTION_ITEM_TYPE = {}

    //资源方编码
    merchantCode: string = getCookie('USER_CODE')

    // 收集表单的数据
    questionList: any

    public lastOrganizationCode: string | undefined
    updateLastOrganizationCode = (e: string) => {
        this.lastOrganizationCode = e
    }

    clearStore() {
        this.question = {}
    }

    // 切换题型
    setWorkLevel = (type: QUESTION_TYPE_ENUM) => {
        this.workLevel = type
        this.question = getDefaultQuestionItem(type)
    }

    // 获取题目内容
    getValues(code: string) {
        return http(`${api.getQuestion}${code}`, 'GET', {}).then(res => {
            this.question = transFromSelfData(res)
            return transFromFieldsValue(res)
        })
    }

    // 录入题目
    toEnterQuestion(params: Record<string, unknown>) {
        return http(api.createQuestion, 'post', {
            ...params,
            merchantCode: this.lastOrganizationCode,
        })
    }

    // 修改题目
    toEditQuestion(params: Record<string, unknown>) {
        return http(api.editeQuetion, 'post', {
            ...params,
            merchantCode: this.lastOrganizationCode,
        })
    }
    // 更新数据
    updateQuestion = (value: DEFAULT_QUESTION_ITEM_TYPE) => {
        this.question = value
    }

    // 获取当前的实例的数据
    get nowquestion() {
        return this.question
    }

    // 如果是组合题目的话 找到对应的数据
    getSelfChildren(code: string) {
        return this.question.childList?.find(i => i.code === code)
    }

    // 查询查重结果
    getRepeatedQuestionListByTitle(params: RepeatTaskParams) {
        return getRepeatedQuestionListByTitleApi(params)
    }
}

// 获取单一的实例
export const getDetailStore = () => {
    if (instance) {
        return instance
    } else {
        instance = new DetailStore()
        return instance
    }
}

export default DetailStore
