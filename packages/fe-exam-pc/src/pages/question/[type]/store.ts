import { makeAutoObservable } from 'mobx'
import type {
    CommonJobParams,
    QuestionListItem,
    QuestionListParams,
    CreateQuestionParams,
    KnowledgeOption,
    KnowledgeParams,
    CommonPointParams,
} from './interface'
import {
    createQuestionApi,
    createVersionApi,
    deleteQuestionApi,
    editQuestionApi,
    getCommonJobListApi,
    getKnowledgeListApi,
    getQuestionDetailApi,
    getQuestionListApi,
    getRepeatedQuestionListByTitleApi,
} from './api'
import { generateCommonJobList, generateKnowledgeList } from './utils'
import { getLocalStorage } from '@/storage'
import type { RepeatTaskParams } from './check/interface'
import { omit } from 'lodash'

class QuestionStore {
    constructor() {
        makeAutoObservable(this)
    }

    public defaultCommonJobParams = {
        pageNo: 1,
        pageSize: 10,
        sid: getLocalStorage('SID'),
        enableStatus: 1,
    }

    public loading: boolean = false

    // 职业/工种/等级 搜索条件
    public commonJobParams: CommonJobParams = this.defaultCommonJobParams
    // 职业/工种/等级 下拉数据
    public commonJobList = []

    // 理论知识题库考评点 搜索条件
    public commonPointParams: CommonPointParams = { pageNo: 1, pageSize: 10 }
    // 理论知识题库考评点  下拉数据
    public commonPointList = []

    // 试题分类列表
    public knowledgeList: KnowledgeOption[] = []

    // 试题详情
    public questionDetail: Partial<QuestionListItem> = {}

    //获取职业/工种/等级下拉列表
    async getCommonJobList(params: Partial<CommonJobParams>) {
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

    // 搜索额外的职业/工种/等级
    async getExtraCommonJobList(idList: number[]) {
        // @ts-ignore
        const { data } = await getCommonJobListApi({ ...this.defaultCommonJobParams, idList })

        this.commonJobList = generateCommonJobList(data) || []
    }

    // 获取试题分类下拉列表
    getKnowledgeList = (params: KnowledgeParams) => {
        return getKnowledgeListApi(params).then((res: any) => {
            this.knowledgeList = generateKnowledgeList(res) || []
        })
    }

    // 获取试题列表
    async getQuestionList(params: QuestionListParams) {
        params.workLevel = params.workLevelCode
        params.workName = params.workNameCode
        params.workType = params.workTypeCode

        const _params = omit(params, ['workNameCode', 'workLevelCode', 'workTypeCode', 'point'])
        const res: any = await getQuestionListApi(_params)
        const { data = [], totalCount } = res
        return { data, totalCount, success: true }
    }

    // 新建试题
    createQuestion(params: CreateQuestionParams) {
        return createQuestionApi(params)
    }

    // 新建版本
    createVersion(params: CreateQuestionParams) {
        return createVersionApi(params)
    }

    

    // 编辑试题
    editQuestion(params: CreateQuestionParams) {
        return editQuestionApi(params)
    }

    // 删除试题
    deleteQuestion(codeList: string[]) {
        return deleteQuestionApi(codeList)
    }

    // 获取题目详情
    getQuestionDetail(code: string) {
        this.loading = true
        return new Promise(resolve => {
            getQuestionDetailApi(code)
                .then((res: any) => {
                    this.questionDetail = res
                    resolve(res)
                })
                .finally(() => {
                    this.loading = false
                })
        })
    }

    // 查询查重结果
    getRepeatedQuestionListByTitle(params: RepeatTaskParams) {
        return getRepeatedQuestionListByTitleApi(params)
    }
}

export default new QuestionStore()
