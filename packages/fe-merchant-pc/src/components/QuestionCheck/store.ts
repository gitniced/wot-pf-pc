import { getLocalStorage } from '@/storage'
import { makeAutoObservable } from 'mobx'
import {
    createRepeatTaskApi,
    deleteQuestionApi,
    getCommonJobListApi,
    getKnowledgeListApi,
    getRepeatedQuestionListApi,
} from './api'
import { generateCommonJobList, generateKnowledgeList } from './utils'
import type {
    CommonJobParams,
    CustomContent,
    KnowledgeParams,
    RepeatedResultParams,
    RepeatTaskParams,
} from './interface'
import { QUESTION_TYPE_ENUM } from '@/constants'
import type { KnowledgeOption } from '../../pages/question/[type]/components/QuestionTypes/interface'

class QuestionCheckStore {
    constructor() {
        makeAutoObservable(this)
    }

    public defaultCommonJobParams = {
        pageNo: 1,
        pageSize: 10,
        sid: getLocalStorage('SID'),
    }

    // 试题分类列表
    public knowledgeList: KnowledgeOption[] = []

    // 职业/工种/等级 搜索条件
    public commonJobParams: CommonJobParams = this.defaultCommonJobParams
    // 职业/工种/等级 下拉数据
    public commonJobList = []

    public repeatTaskParams: RepeatTaskParams = {
        type: 'all', // 按照标题重复模式查询
        questionType: QUESTION_TYPE_ENUM.SINGLE, // 默认单选题
    }

    //获取职业/工种/等级下拉列表
    getCommonJobList = async (params: Partial<CommonJobParams>) => {
        this.commonJobParams = { ...this.commonJobParams, ...params }

        const { pageNo = 1 } = this.commonJobParams

        // @ts-ignore
        const { data, totalCount, pageSize = 10 } = await getCommonJobListApi(this.commonJobParams)

        return {
            data: generateCommonJobList(data) || [],
            nextPage: pageNo + 1,
            isNext: params.name ? true : pageNo * pageSize < totalCount,
        }
    }

    // 获取试题分类下拉列表
    getKnowledgeList = (params: KnowledgeParams) => {
        return getKnowledgeListApi(params).then((res: any) => {
            this.knowledgeList = generateKnowledgeList(res) || []
        })
    }

    // 修改查询条件
    changeRepeatedQuestionsParams = (params: {
        customContent?: CustomContent
        questionType?: number
    }) => {
        this.repeatTaskParams = { ...this.repeatTaskParams, ...params }
    }

    // 创建查询任务
    createRepeatTask = (params: RepeatTaskParams) => {
        return createRepeatTaskApi({
            ...this.repeatTaskParams,
            ...params,
        })
    }

    // 查询重复题目
    getRepeatedQuestionList = (params: RepeatedResultParams) => {
        return getRepeatedQuestionListApi(params)
    }

    // 删除试题
    deleteQuestion(codeList: string[]) {
        return deleteQuestionApi(codeList)
    }

    resetRepeatTaskParams() {
        this.repeatTaskParams = {
            type: 'all', // 按照标题重复模式查询
            questionType: QUESTION_TYPE_ENUM.SINGLE, // 默认单选题
        }
    }
}

export default new QuestionCheckStore()
