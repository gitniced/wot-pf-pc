// 阅卷设置

import { makeAutoObservable, runInAction, toJS } from 'mobx'
import type { GradingDetail, PaperItem, TeacherItem } from './interface'
import { getGradingDetail, getQuestionList, saveGradingSetting } from './api'

class MarkSettingScore {
    constructor() {
        makeAutoObservable(this)
    }

    public gradingDetail: Partial<GradingDetail> = {}

    public gradingPaperList: PaperItem[] = []

    // 全部的题目
    public allQuestions: number = 0
    // 已经分配的题目
    public distributeQuestions: number = 0

    public loading: boolean = false

    // 客观题题目
    getGradingQuestion(taskCode: string) {
        runInAction(() => {
            getQuestionList(taskCode).then((res: any) => {
                this.gradingPaperList = res ?? []
                // 计算总题目
                const allQuestions = this.gradingPaperList.reduce((prev, curr) => {
                    return (
                        prev +
                        curr.paperQuestionList.reduce((p, c) => {
                            return p + c.totalQuestion
                        }, 0)
                    )
                }, 0)

                this.allQuestions = allQuestions
            })
        })
    }

    // 计算已经分配的题目
    calculatorDistributeQuestions() {
        // 计算已经分配的题目
        const { teacherDetails = [] } = this.gradingDetail
        const distributeQuestions = teacherDetails.reduce((prev: any[], curr) => {
            return [...prev, ...curr.questionCodes]
        }, [])

        this.distributeQuestions = [...new Set(distributeQuestions)].length
    }

    getGradingDetail(taskCode: string) {
        this.loading = true
        runInAction(() => {
            getGradingDetail(taskCode)
                .then((res: any) => {
                    let { teacherDetails = [] } = res
                    teacherDetails = teacherDetails.map((item: TeacherItem) => {
                        // 处理阅卷老师的题目分配
                        return {
                            ...item,
                            isHideMsg: true, // 默认隐藏阅卷老师的手机号和姓名
                            isHideBtn: true, // 默认隐藏脱敏按钮
                        }
                    })
                    this.gradingDetail = { ...res, teacherDetails }
                })
                .finally(() => {
                    this.loading = false
                })
        })
    }

    // 修改阅卷老师配置
    changeGradingDetail(teacherDetails: TeacherItem[]) {
        this.gradingDetail = { ...this.gradingDetail, teacherDetails }
    }

    resetGradingDetail() {
        const { teacherDetails = [] } = this.gradingDetail
        this.gradingDetail = {
            ...this.gradingDetail,
            teacherDetails: teacherDetails.map(item => ({
                ...item,
                selectState: 1,
                questionCodes: [],
                questionTypes: [],
            })),
        }
        this.calculatorDistributeQuestions()
    }

    // 保存阅卷配置
    saveGradingSetting(taskCode: string, { currentType, multipleState }: any) {
        this.gradingDetail = { ...this.gradingDetail, gradingType: currentType, multipleState }
        return saveGradingSetting(this.gradingDetail, taskCode)
    }
}

export default new MarkSettingScore()
