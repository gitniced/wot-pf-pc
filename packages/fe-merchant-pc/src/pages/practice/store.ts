import { makeAutoObservable } from 'mobx'
import type {
    PracticeListItem,
    PracticeListParams,
    CreatePracticeParams,
    PracticeQuestionParams,
} from './interface'
import {
    createPracticeApi,
    createPracticePreApi,
    getPracticeListApi,
    getPracticeQuestionApi,
    updatePublishStatusApi,
    deletePracticeApi,
    getPracticeDetailApi,
} from './api'
import { getLocalStorage } from '@/storage'
import { isEmpty } from 'lodash'
import { BELONG_TYPE_ENUM, SUBJECT_TYPE_ENUM } from '@/constants'
import { QUESTION_SELECT_TYPE } from './edit/constants'

class PracticeStore {
    constructor() {
        makeAutoObservable(this)
    }

    public defaultCommonJobParams = { pageNo: 1, pageSize: 10, sid: getLocalStorage('SID') }

    public loading: boolean = false

    public practiceDetail: Partial<PracticeListItem> = {
        questionType: QUESTION_SELECT_TYPE.WORK,
    }

    // 获取刷题详情
    getPracticeDetail(code: string) {
        return new Promise((resolve, reject) => {
            getPracticeDetailApi(code)
                .then((res: any) => {
                    const { startTime, endTime } = res
                    this.practiceDetail = {
                        ...this.practiceDetail,
                        ...res,
                        startTime: startTime ? startTime : null,
                        endTime: endTime ? endTime : null,
                    }
                    resolve(this.practiceDetail)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    // 获取刷题列表
    getPracticeList = async (params: PracticeListParams) => {
        this.loading = true
        const res: any = await getPracticeListApi(params!)
        const { data = [], totalCount } = res
        this.loading = false

        return { data, totalCount, success: true }
    }

    // 更新发布状态
    updatePublishStatus(publishStatus: number, code: string) {
        return updatePublishStatusApi(publishStatus, code!)
    }

    // 根据自定义字段请求题目数量
    getPracticeQuestion(organizationCode?: string) {
        const { selectQuestionDto, questionType } = this.practiceDetail
        if (questionType === QUESTION_SELECT_TYPE.WORK) {
            delete selectQuestionDto?.knowledgePointInfoList
        }
        if (questionType === QUESTION_SELECT_TYPE.KNOWLEDGE) {
            delete selectQuestionDto?.commonJobCustomDtoList
        }

        const params: PracticeQuestionParams = {
            organizationCode,
            jobs: selectQuestionDto?.commonJobCustomDtoList ?? [],
            knowledgePointInfos: selectQuestionDto?.knowledgePointInfoList ?? [],
            subject: SUBJECT_TYPE_ENUM.SIMULATION,
            belongType: BELONG_TYPE_ENUM.MERCHANT,
            sid: getLocalStorage('SID'),
        }

        return getPracticeQuestionApi(params).then((data: any) => {
            const { judgeCount, singleCount, multipleCount, totalCount, fixedCount } = data
            this.updatePractice({
                selectQuestionDto: {
                    ...this.practiceDetail.selectQuestionDto,
                    judgeCount,
                    singleCount,
                    multipleCount,
                    totalCount,
                    fixedCount,
                },
            })
        })
    }

    // 修改刷题设置
    updatePractice(params: Partial<PracticeListItem>) {
        this.practiceDetail = { ...this.practiceDetail, ...params }
    }

    // 创建刷题前置
    createPracticePre(organizationCode?: string) {
        const { title } = this.practiceDetail
        const params: CreatePracticeParams = {
            title,
            organizationCode,
            sid: getLocalStorage('SID'),
            belongType: BELONG_TYPE_ENUM.MERCHANT,
        }
        return createPracticePreApi(params).then((code: any) => {
            this.practiceDetail = { ...this.practiceDetail, code }
        })
    }

    // 创建刷题
    createPractice(_publishStatus?: number, organizationCode?: string) {
        const { title, code, selectQuestionDto, publishStatus, questionType } = this.practiceDetail

        const { commonJobCustomDtoList, knowledgePointInfoList } = selectQuestionDto ?? {}

        const hasQuestionByWork = !isEmpty(commonJobCustomDtoList)
        const hasQuestionByKnowledge = !isEmpty(knowledgePointInfoList)

        const params: CreatePracticeParams = {
            title,
            code,
            questionType,
            organizationCode,
            publishStatus: _publishStatus || publishStatus,
            sid: getLocalStorage('SID'),
            belongType: BELONG_TYPE_ENUM.MERCHANT,
        }

        if (questionType === QUESTION_SELECT_TYPE.WORK && hasQuestionByWork) {
            params.jobs = commonJobCustomDtoList
        }

        if (questionType === QUESTION_SELECT_TYPE.KNOWLEDGE && hasQuestionByKnowledge) {
            params.knowledgePoints = knowledgePointInfoList
        }

        return createPracticeApi(params)
    }

    // 删除刷题
    deletePractice(codeList: string[]) {
        return deletePracticeApi(codeList)
    }
}

export default new PracticeStore()
