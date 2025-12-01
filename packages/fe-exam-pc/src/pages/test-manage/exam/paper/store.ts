import { makeAutoObservable, runInAction, toJS } from 'mobx'
import type {
    AnswerItem,
    CurrentQuestion,
    IQuestionDetailParams,
    ISaveAnswerParams,
    ISubmitAnswerParams,
    Item,
    QuestionItem,
    ScoreResult,
} from './interface'
import { getCurrentQuestion, getQuestionAndAnswerList, saveAnswer, submitAnswer } from './api'
import { getScoreApi } from '../../api'
import dayjs from 'dayjs'
import { getLocalStorage, setLocalStorage } from '@/storage'

class PaperStore {
    constructor() {
        makeAutoObservable(this)
    }

    paperCode?: string

    loading: boolean = false
    // 字体大小
    fontSize: number = 24

    // 当前题型对应的Index
    parentIndex: number = 0

    // 当前题目对应的Index
    childIndex: number = 0

    // 当前在做的题目
    currentQuestion: Partial<CurrentQuestion> = {}

    // 答题卡
    questionList: QuestionItem[] = []

    // 答案
    answerList: AnswerItem[] = []

    // 分数结果
    scoreResult: Partial<ScoreResult> = {}

    // 当前题型
    currentQuestionType: number | undefined
    // 上一个题型
    prevQuestionType: number | undefined

    get examCode() {
        const localSearchParams = getLocalStorage('TEST_SEARCH_PARAMS')
        return localSearchParams.examCode
    }

    // 获取当前试题
    getCurrentQuestion(code: string) {
        this.loading = true
        const params: IQuestionDetailParams = {
            questionCode: code,
            examCode: this.examCode,
            paperCode: this.paperCode!,
        }
        runInAction(() => {
            getCurrentQuestion(params)
                .then((res: any) => {
                    this.currentQuestion = res
                })
                .finally(() => {
                    this.loading = false
                })
        })
    }

    // 获取答题卡配置
    getQuestionList() {
        this.loading = true
        runInAction(() => {
            getQuestionAndAnswerList(this.examCode)
                .then((res: any) => {
                    // @ts-ignore
                    const {
                        answerList: defaultAnswerList,
                        questionList: defaultQuestion,
                        paperCode,
                    } = res ?? {}
                    this.answerList = defaultAnswerList
                    this.questionList = defaultQuestion
                    this.paperCode = paperCode

                    const currentQuestionCode =
                        defaultQuestion[this.parentIndex].questionList[this.childIndex].questionCode

                    this.getCurrentQuestion(currentQuestionCode)
                    this.currentQuestionType =
                        defaultQuestion[this.parentIndex].questionList[this.childIndex].questionType
                })
                .finally(() => {
                    this.loading = false
                })
        })
    }

    // 修改答案(答案，题目类型)
    changeAnswer = (item: AnswerItem) => {
        // 答案已存在answerList中，覆盖，否则新增
        runInAction(() => {
            const findIndex = this.answerList.findIndex(
                answer => answer.questionCode === item.questionCode,
            )
            if (findIndex > -1) {
                this.answerList[findIndex] = {
                    ...this.answerList[findIndex],
                    ...item,
                }
            } else {
                this.answerList.push(item)
            }
        })
    }

    // 保存答案
    onSaveAnswer = () => {
        const currentAnserList = this.answerList.filter(
            answer => answer.questionCode === this.currentQuestion.questionCode,
        )

        const params: ISaveAnswerParams = {
            examCode: this.examCode,
            paperCode: this.paperCode!,
            answerList: currentAnserList,
            questionCode: this.currentQuestion.questionCode
        }
        return saveAnswer(params)
    }

    // 交卷
    submitExam(forceSubmit?: number) {
        // 交卷之前先保存答案
        return this.onSaveAnswer().then(() => {
            const params: ISubmitAnswerParams = {
                examCode: this.examCode,
                paperCode: this.paperCode!,
                forceSubmit,
            }

            setLocalStorage('CUT_COUNT', 0)
            return submitAnswer(params)
        })
    }

    // 获取客观题分数
    getScore() {
        // 交卷之后计算分数
        getScoreApi(this.examCode).then((result: any) => {
            const { score, startTime, endTime, generateState, specialJump } = result
            const time1 = dayjs(startTime)
            const time2 = dayjs(endTime)
            const answeredTime = time2.diff(time1, 'minute')

            this.scoreResult = {
                score,
                generateState,
                answeredTime,
                specialJump,
            }
        })
    }
    // 上一题
    onPrev = () => {
        // 保存当前已答题的答案
        this.onSaveAnswer()
        const currentChildIndex = this.childIndex - 1

        // 判断是否需要切换题型
        if (currentChildIndex < 0) {
            this.parentIndex = this.parentIndex - 1
            this.childIndex = this.questionList[this.parentIndex].totalQuestion - 1
        } else {
            this.childIndex = this.childIndex - 1
        }

        const questionList = this.questionList[this.parentIndex]?.questionList
        const currentQuestionCode = questionList[this.childIndex]?.questionCode

        this.prevQuestionType = this.currentQuestionType
        this.currentQuestionType = questionList[this.childIndex]?.questionType

        this.getCurrentQuestion(currentQuestionCode)
    }

    // 下一题
    onNext = () => {
        // 保存当前已答题的答案
        this.onSaveAnswer()
        const { totalQuestion } = this.questionList[this.parentIndex]
        // 判断是否需要切换题型
        const currentChildIndex = this.childIndex + 1

        // 需要切换题型
        if (currentChildIndex >= totalQuestion) {
            this.parentIndex = this.parentIndex + 1
            this.childIndex = 0
        } else {
            this.childIndex = this.childIndex + 1
        }

        const questionList = this.questionList[this.parentIndex]?.questionList
        const currentQuestionCode = questionList[this.childIndex]?.questionCode

        this.prevQuestionType = this.currentQuestionType
        this.currentQuestionType = questionList[this.childIndex]?.questionType

        this.getCurrentQuestion(currentQuestionCode)
    }

    // 切换题目
    onChangeQuestion = (question: Item, parentIndex: number, childIndex: number) => {
        // 保存当前已答题的答案
        this.onSaveAnswer()

        this.parentIndex = parentIndex
        this.childIndex = childIndex
        this.prevQuestionType = this.currentQuestionType
        this.currentQuestionType = question.questionType

        this.getCurrentQuestion(question.questionCode)
    }

    // 修改字体大小
    changeFontSize = (size: number) => {
        runInAction(() => {
            this.fontSize = size
        })
    }
}

export default new PaperStore()
