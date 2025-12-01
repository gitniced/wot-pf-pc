import { makeAutoObservable, toJS } from 'mobx'
import type { GradingDetail, GradingDetailReq, ScoreItem } from './interface'
import { correctiveGrades, getGradingDetail } from './api'
import { message } from 'antd'
import { history } from 'umi'
import { delLocalStorage } from '@/storage'

class GradingDetailStore {
    constructor() {
        makeAutoObservable(this)
    }
    public loading: boolean = false
    public params: Partial<GradingDetailReq> = {}
    public scoreList: ScoreItem[] = []
    public gradingDetail: Partial<GradingDetail> = {}

    // 待阅题数
    public allQuestions: number = 0
    // 已阅题数
    public readQuestions: number = 0

    // 主观题已阅得分
    public subjectiveScore: number = 0

    // 子题数量
    public childCountList: Record<string, number> = {}

    getGradingDetail(params: GradingDetailReq) {
        this.loading = true
        this.params = { ...params, sensitiveState: 1 }

        getGradingDetail(params)
            .then((res: any) => {
                this.gradingDetail = res

                const { questionList = [], answerList = [] } = this.gradingDetail

                // 计算总题目
                this.allQuestions = 0 // 重置
                questionList.forEach(item => {
                    item.questionList.map(question => {
                        // 统计有子题的情况
                        if (question.childList?.length) {
                            this.childCountList[question.questionCode] =
                                question.childList?.length || 0
                        }
                        this.allQuestions += 1
                    })
                })

                if (params.stuCode) {
                    this.scoreList = answerList.map(answer => ({
                        score: answer.score,
                        questionCode: answer.questionCode,
                        childList: answer.childList?.map(c => ({
                            score: c.score,
                            questionCode: c.questionCode,
                            childList: [],
                        })),
                    }))
                    this.calculatorReadQuestions()
                }
            })
            .finally(() => {
                this.loading = false
            })
    }

    // 批改成绩
    changeScore(
        questionCode: string, // 小题的questionCode
        // 组合题或者案例分析题的时候 会有parentQuestionCode
        parentQuestionCode?: string,
        value?: number | string, // 分值
    ) {
        const scoreItem: ScoreItem = { questionCode, score: value }

        // 组合题和案例分析题会存在parentQuestionCode
        if (parentQuestionCode) {
            const findIndex = this.scoreList.findIndex(
                item => item.questionCode === parentQuestionCode,
            )

            if (findIndex > -1) {
                const childList = this.scoreList[findIndex].childList ?? []
                const childIndex = childList?.findIndex(c => c.questionCode === questionCode) ?? -1

                if (childIndex! > -1) {
                    childList[childIndex].score = value
                } else {
                    childList.push(scoreItem)
                }
                this.scoreList[findIndex].childList = childList
            } else {
                this.scoreList.push({
                    questionCode: parentQuestionCode,
                    childList: [scoreItem],
                })
            }
        } else {
            const findIndex = this.scoreList.findIndex(item => item.questionCode === questionCode)

            if (findIndex > -1) {
                this.scoreList[findIndex].score = value
            } else {
                this.scoreList.push(scoreItem)
            }
        }

        this.calculatorReadQuestions()
    }

    // 计算已阅题数和已阅得分
    calculatorReadQuestions() {
        this.readQuestions = 0
        this.subjectiveScore = 0

        const isEmptyScore = (score?: string | number) => {
            if (!score && score !== 0) return true
            if (score === '') return true
            return false
        }

        this.scoreList.forEach(item => {
            // 统计有子题的情况
            if (item.childList?.length) {
                if (
                    item.childList?.filter(c => !isEmptyScore(c.score))?.length ===
                    this.childCountList[item.questionCode]
                ) {
                    this.readQuestions += 1
                }
                this.subjectiveScore =
                    this.subjectiveScore +
                    item.childList.reduce((prev, curr) => {
                        return prev + Number(curr.score ?? 0)
                    }, 0)
            } else {
                this.readQuestions += !isEmptyScore(item.score) ? 1 : 0
                this.subjectiveScore += Number(item.score ?? 0)
            }
        })
    }

    async validateScore() {
        return new Promise((resolve, reject) => {
            this.scoreList.forEach(item => {
                if (!item.childList || !item.childList.length) {
                    if ((Number(item.score!) * 10) % 5 !== 0) {
                        reject('得分保留1位小数，小数点后只能是0或5')
                    }
                }

                resolve(true)
            })
        })
    }

    // 保存批改成绩 needLoadNext 是否需要加载下一个 修改成绩的时候不需要
    async saveGrades(needLoadNext: boolean) {
        const { taskCode } = this.params
        // 校验分数合法性
        await this.validateScore()
            .then(() => {
                this.loading = true
                correctiveGrades({
                    stuExamCode: this.gradingDetail.stuExamCode!,
                    scoreList: this.scoreList,
                })
                    .then(() => {
                        message.success('阅卷成功')
                        if (!needLoadNext) {
                            // 跳回待提交成绩
                            window.open(
                                '/exam-center/grading/grading-tasks?save_listTab=20',
                                '_self',
                            )
                            return
                        }
                        // 批下一个
                        this.scoreList = []
                        // 清空已阅题数
                        this.readQuestions = 0
                        // 清空主观题已阅得分
                        this.subjectiveScore = 0
                        this.getGradingDetail({ taskCode: taskCode! })
                        document.querySelector('#component_topic_list')?.scrollTo(0, 0)
                    })
                    .finally(() => {
                        this.loading = false
                    })
            })
            .catch(error => {
                message.error(error)
            })
    }
}

export default new GradingDetailStore()
