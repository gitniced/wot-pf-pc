import { makeAutoObservable } from 'mobx'
import type {
    PracticeListItem,
    PracticeListParams,
    CreatePracticeParams,
    PersonItem,
    PersonListParams,
    PracticeQuestionParams,
    ShareDetail,
    MerchantPracticeItem,
    SelectQuestionDto,
} from './interface'
import {
    batchDeletePersonsApi,
    createPracticeApi,
    createPracticePreApi,
    createPersonApi,
    getPracticeDetailApi,
    getPracticeListApi,
    getPersonListApi,
    getPracticeQuestionApi,
    getPracticeShareDetailApi,
    updatePublishStatusApi,
    deletePracticeApi,
} from './api'
import { PRACTICE_SOURCE } from './constants'
import { getLocalStorage } from '@/storage'
import { BELONG_TYPE_ENUM, SUBJECT_TYPE_ENUM } from '../question/[type]/constants'
// @ts-ignore
import { isEmpty } from 'lodash'
import { JOIN_USER_ENUM, QUESTION_SELECT_TYPE } from './edit/constants'
import { getPracticeListByMerchantApi, getSelectQuestionApi } from './edit/api'

class PracticeStore {
    constructor() {
        makeAutoObservable(this)
    }

    public defaultCommonJobParams = { pageNo: 1, pageSize: 10, sid: getLocalStorage('SID') }

    public defaultPersonParams: PersonListParams = {
        pageNo: 1,
        pageSize: 10,
    }

    public loading: boolean = false

    // 刷题详情
    public practiceDetail: Partial<PracticeListItem> = {
        joinStatus: JOIN_USER_ENUM.NOT_LIMIT, // 刷题用户默认不限制
        questionType: QUESTION_SELECT_TYPE.WORK, // 选题类型默认 职业目录
        sourceType: PRACTICE_SOURCE.SELF_BUILT, // 刷题来源默认自建
    }

    // 刷题用户请求参数
    public personParams: PersonListParams = this.defaultPersonParams
    // 刷题用户列表
    public personList: PersonItem[] = []
    // 刷题用户总数
    public personTotalCount: number = 0

    // 分享的刷题详情
    public shareDetail: Partial<ShareDetail> = {}
    // 资源方推送的刷题
    public merchantPracticeList: MerchantPracticeItem[] = []

    // 获取刷题详情
    getPracticeDetail(code: string) {
        return new Promise((resolve, reject) => {
            getPracticeDetailApi(code)
                .then((res: any) => {
                    const { startTime, endTime } = res
                    this.practiceDetail = {
                        ...res,
                        startTime: startTime ? startTime : null,
                        endTime: endTime ? endTime : null,
                    }

                    if (this.practiceDetail.joinStatus === JOIN_USER_ENUM.PART) {
                        this.getPersonList()
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
            belongType: BELONG_TYPE_ENUM.ORGANIZE,
        }

        return getPracticeQuestionApi(params).then((data: any) => {
            const { judgeCount, singleCount, multipleCount, fixedCount, totalCount } = data
            this.updatePractice({
                selectQuestionDto: {
                    ...this.practiceDetail.selectQuestionDto,
                    judgeCount,
                    singleCount,
                    multipleCount,
                    fixedCount,
                    totalCount,
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
        const { title, startTime, endTime, sourceCode, sourceType } = this.practiceDetail
        const params: CreatePracticeParams = {
            title,
            startTime,
            endTime,
            organizationCode,
            sourceCode,
            sourceType,
            sid: getLocalStorage('SID'),
            belongType: BELONG_TYPE_ENUM.ORGANIZE,
        }
        return createPracticePreApi(params).then((code: any) => {
            this.practiceDetail = { ...this.practiceDetail, code }
        })
    }

    // 如果是从资源法创建的练习，需要在选择资源方练习之后，请求刷题的题目详情
    getSelectQuestion = (practiceCode: string) => {
        this.loading = true
        return new Promise(resolve => {
            getSelectQuestionApi(practiceCode)
                .then((res: any) => {
                    const { commonJobCustomDtoList } = res as SelectQuestionDto

                    // 更新自定义字段
                    this.updatePractice({
                        selectQuestionDto: res,
                        questionType: commonJobCustomDtoList?.length
                            ? QUESTION_SELECT_TYPE.WORK
                            : QUESTION_SELECT_TYPE.KNOWLEDGE,
                    })

                    resolve(res)
                })
                .finally(() => (this.loading = false))
        })
    }

    // 创建刷题
    createPractice(_publishStatus?: number, organizationCode?: string) {
        const {
            title,
            startTime,
            endTime,
            code,
            joinStatus,
            selectQuestionDto,
            publishStatus,
            questionType,
        } = this.practiceDetail

        const { commonJobCustomDtoList, knowledgePointInfoList } = selectQuestionDto ?? {}
        const hasQuestionByWork = !isEmpty(commonJobCustomDtoList)
        const hasQuestionByKnowledge = !isEmpty(knowledgePointInfoList)

        const params: CreatePracticeParams = {
            title,
            code,
            joinStatus,
            startTime,
            endTime,
            questionType,
            publishStatus: _publishStatus || publishStatus,
            sid: getLocalStorage('SID'),
            organizationCode,
            belongType: BELONG_TYPE_ENUM.ORGANIZE,
        }

        if (questionType === QUESTION_SELECT_TYPE.WORK && hasQuestionByWork) {
            params.jobs = commonJobCustomDtoList
        }

        if (questionType === QUESTION_SELECT_TYPE.KNOWLEDGE && hasQuestionByKnowledge) {
            params.knowledgePoints = knowledgePointInfoList
        }

        return createPracticeApi(params).then(() => {
            // 获取刷题分享详情
            this.getPracticeShareDetail()
        })
    }

    // 删除刷题
    deletePractice(codeList: string[]) {
        return deletePracticeApi(codeList)
    }

    // 创建刷题用户
    createPerson(params: PersonItem) {
        const { code } = this.practiceDetail
        return createPersonApi({ ...params, practiceCode: code! }).then(() => {
            this.getPersonList()
        })
    }

    // 获取刷题用户列表
    getPersonList(params?: PersonListParams) {
        this.personParams = {
            ...this.personParams,
            ...params,
            practiceCode: this.practiceDetail.code!,
        }

        getPersonListApi(this.personParams).then((res: any) => {
            const { data = [], totalCount } = res

            this.personList = data
            this.personTotalCount = totalCount
        })
    }

    // 删除参与刷题用户
    batchDeletePersons(codeList: string[]) {
        const { code } = this.practiceDetail
        return batchDeletePersonsApi(codeList, code!).then(() => {
            this.getPersonList({
                pageNo: 1,
                pageSize: this.personParams.pageSize,
                practiceCode: code!,
            })
        })
    }

    // 获取分享刷题详情
    getPracticeShareDetail(_code?: string) {
        const { code } = this.practiceDetail

        getPracticeShareDetailApi(_code || code!).then((res: any) => {
            this.shareDetail = res
        })
    }
    // 查询该站点可以获取到的资源方推送刷题
    getPracticeListByMerchant = () => {
        return new Promise(resolve => {
            getPracticeListByMerchantApi().then((res: any) => {
                this.merchantPracticeList = res as MerchantPracticeItem[]
                resolve(res)
            })
        })
    }
}

export default new PracticeStore()
