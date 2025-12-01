import { makeAutoObservable } from 'mobx'
import {
    AssistanceFromQuestionDto,
    DimensionHierarchyItem,
    EmploymentAssistanceRecordDetailDto,
    JudgmentResultItem,
    MeasureItem,
    QuestionAndAnswerDto,
    SurveyScoreItem,
} from './interface'
import { MEASURE_TYPE } from './consts'
import http from '@/servers/http'
import api from './api'

class Store {
    // 援助详情
    public assistanceInfo: EmploymentAssistanceRecordDetailDto = {}
    // 求职者调查
    public surveyQuestionList: AssistanceFromQuestionDto[] = []
    // 研判提问
    public judgmentQuestionList: AssistanceFromQuestionDto[] = []
    // 答案对象
    public answerObj: Record<string, string> = {}

    public surveyScoreList: SurveyScoreItem[] = []

    public judgmentResults: JudgmentResultItem[] = []

    public dimensionHierarchy: DimensionHierarchyItem[] = []

    public measureList: MeasureItem[] = []

    public moreMeasureList: MeasureItem[] = []

    public optionRecord: any[] = []


    public sysMeasureList: any = []

    // 获取系统措施
    getListSystemMeasure = () => {
        http(`${api.listSystemMeasure}`, 'GET', {}).then((res: any) => {
            const measureList = res?.map((item: any) => {
                return {
                    title: item,
                    type: MEASURE_TYPE.MORE,
                    enableState: 0,
                }
            })
            this.moreMeasureList = measureList
            this.sysMeasureList = measureList
        })
    }

    constructor() {
        makeAutoObservable(this)
        this.getListSystemMeasure()
    }


    editMeasureList = () => { }

    deleteMeasure = () => { }

    // 获取求职者信息
    getAssistanceDetail = async (code: string) => {
        return http(api.getAssistanceDetail, 'GET', { recordCode: code }).then((res: EmploymentAssistanceRecordDetailDto) => {
            const { diagnosticResult } = res
            this.assistanceInfo = res
            const {
                abilityDiagnosticResult,
                abilityDiagnosticResultLevel,
                abilityScore,
                conditionsDiagnosticResult,
                conditionsDiagnosticResultLevel,
                conditionsScore,
                mentalityDiagnosticResult,
                mentalityDiagnosticResultLevel,
                mentalityScore
            } = diagnosticResult || {}

            this.surveyScoreList = [
                { value: mentalityScore },
                { value: conditionsScore },
                { value: abilityScore },
            ]
            this.judgmentResults = [
                { value: mentalityDiagnosticResult },
                { value: conditionsDiagnosticResult },
                { value: abilityDiagnosticResult },
            ]
            this.dimensionHierarchy = [
                { value: mentalityDiagnosticResultLevel },
                { value: conditionsDiagnosticResultLevel },
                { value: abilityDiagnosticResultLevel },
            ]
        })
    }

    resetAnswer = () => {
        this.answerObj = {}
    }

    // 获取求职者问卷数据
    getAssistanceJobQuestionData = async (code: string) => {
        return http(api.getAssistanceJobQuestionData, 'GET', { recordCode: code }).then((res: QuestionAndAnswerDto) => {
            const { question, answer } = res
            this.surveyQuestionList = question!
            answer?.forEach(item => {
                this.answerObj[`${item.questionCode}`] = item.sequence!
            })
        })
    }
    // 获取服务研判数据
    getAassistanceServerQuestionData = async (code: string) => {
        return http(api.getAassistanceServerQuestionData, 'GET', { recordCode: code }).then((res: QuestionAndAnswerDto) => {
            const { question, answer } = res
            this.judgmentQuestionList = question!
            answer?.forEach(item => {
                this.answerObj[`${item.questionCode}`] = item.sequence!
            })
        })
    }
    // 填写答案
    setAnswerObj = (questionCode: string, sequence: string) => {
        this.answerObj[`${questionCode}`] = sequence!
    }

    // 填写问卷
    submitAnswer = (data: any) => {
        return http(api.submitAnswer, 'POST', data)
    }

    // 获取诊断结果
    getListLog = (data: any) => {
        return http(api.getListLog, 'GET', data).then((res: any) => {
            this.optionRecord = res
        })
    }
    // 保存
    submitMeasure = (data: any) => {
        const newData = {
            ...data,
            measureList: data?.measureList?.map(item => {
                if (item?.code?.startsWith('faker_')) {
                    return { ...item, code: undefined}
                }
                return item
            })
        }
        return http(api.submitMeasure, 'POST', newData)
    }
}

export default new Store()
