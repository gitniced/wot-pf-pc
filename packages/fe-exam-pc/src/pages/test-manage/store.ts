// 整场考试的配置数据

import { makeAutoObservable, runInAction } from 'mobx'
import type { CandidateData, CandidateReq, ExamData, MsgItem } from './interface'
import {
    confirmCandidateInformation,
    confirmPrecautions,
    getCandidateInformation,
    getExamData,
    getMsgList,
} from './api'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import {
    ConfirmInfoState,
    ConfirmPrecautionsState,
    GenerateState,
    NeedSign,
    SignState,
} from './constant'
import { history } from 'umi'
import { getLocalStorage, setLocalStorage } from '@/storage'

dayjs.extend(duration)

class TestStore {
    constructor() {
        makeAutoObservable(this)
    }

    // 是否已经请求过数据
    hasLoaded: boolean = false
    loading: boolean = false

    // 登录学员是否有报名考试
    hasEnroll: boolean = false

    // 整场开始配置信息
    examData: Partial<ExamData> = {}
    // 考生信息
    candidateData: Partial<CandidateData> = {}
    //消息列表
    msgList: MsgItem[] = []

    // 切屏次数
    cutCount: number = 0

    get searchParams() {
        const params = history.location.query

        if (Object.keys(params!).length) {
            setLocalStorage('TEST_SEARCH_PARAMS', params)
            return params
        }

        const localSearchParams = getLocalStorage('TEST_SEARCH_PARAMS') ?? {}

        return localSearchParams
    }

    // 获取考试配置信息
    getExamData() {
        return runInAction(() => {
            getExamData(this.searchParams?.examCode).then((res: any) => {
                this.examData = res
            })
        })
    }

    // 获取考生考试信息
    getCandidateData() {
        this.loading = true

        const { examCode, userCode } = this.searchParams
        const params: CandidateReq = {
            examCode,
            userCode,
        }

        runInAction(() => {
            getCandidateInformation(params)
                .then((res: any) => {
                    this.candidateData = res ?? {}
                    this.hasEnroll = true

                    const {
                        generateState,
                        confirmPrecautionsState,
                        confirmInfoState,
                        needSign,
                        signState,
                    } = res ?? {}

                    // 已经交卷了 跳转到交卷结果页面
                    if (generateState === GenerateState.YES) {
                        history.push('/test-manage/exam/result')
                        return
                    }

                    // 已经确认过考前须知了，跳转到答题页面
                    if (confirmPrecautionsState === ConfirmPrecautionsState.YES) {
                        history.push('/test-manage/exam/paper')
                        return
                    }

                    // // 已经确认过考生信息了
                    if (confirmInfoState === ConfirmInfoState.YES) {
                        // 如果不需要签到或者已经签到了，跳转到考试-考前须知页面
                        if (
                            needSign === NeedSign.NO ||
                            (needSign === NeedSign.YES && signState === SignState.YES)
                        ) {
                            history.push('/test-manage/exam/briefing')
                        } else {
                            history.push('/test-manage/sign-in')
                        }
                        return
                    }
                    // 没有确认过考生信息，跳转到考生信息确认页面
                    history.push('/test-manage/candidate')
                    // history.push('/test-manage/exam/paper')
                })
                .catch(() => {
                    this.hasEnroll = false
                    history.push('/test-manage/candidate')
                })
                .finally(() => {
                    this.loading = false
                    this.hasLoaded = true
                })
        })
    }

    // 确认考生信息
    confirmCandidateInformation() {
        const { examCode, userCode } = this.searchParams
        const params: CandidateReq = {
            examCode,
            userCode,
        }

        confirmCandidateInformation(params).then(() => {
            // 确认之后再次获取考生信息，判断是否已经签到了
            this.getCandidateData()
        })
    }

    // 确认考前须知
    confirmPrecautions() {
        const { examCode, userCode } = this.searchParams
        const params: CandidateReq = {
            examCode,
            userCode,
        }

        confirmPrecautions(params).then(() => {
            // 确认之后再次获取考生信息
            this.getCandidateData()
        })
    }

    //获取消息列表
    getMsgList = () => {
        const { examCode } = this.searchParams
        getMsgList(examCode).then((data: any) => {
            // 获取消息列表
            this.msgList = data?.messageList || []
        })
    }

    // 修改切屏次数
    changeCutCount = (count: number) => {
        this.cutCount = count
    }
}

export default new TestStore()
