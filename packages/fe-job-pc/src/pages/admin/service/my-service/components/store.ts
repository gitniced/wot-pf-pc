import { makeAutoObservable } from 'mobx'
import {
    DimensionHierarchyItem,
    JudgmentResultItem,
    MeasureItem,
    RecordItem,
    SurveyScoreItem,
} from './interface'
import { MEASURE_TYPE } from './consts'
import http from '@/servers/http'
import api from './api'
import { EmploymentAssistanceRecordDetailDto, AssistanceFromQuestionDto, QuestionAndAnswerDto } from '../../hierarchical-diagnosis/diagnosis/interface'
import { downloadUrlFile } from '@/utils/downloadUrlFile'
import dayjs from 'dayjs'

class Store {
    constructor() {
        makeAutoObservable(this)
        this.getListSystemMeasure()
    }
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

    public serviceRecordList: RecordItem[] = []

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


    // 获取求职者信息
    getAssistanceDetail = async (code: string) => {
        return http(api.getAssistanceDetail, 'GET', { recordCode: code }).then((res: EmploymentAssistanceRecordDetailDto) => {
            const { diagnosticResult, measureList, serviceList } = res
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
            this.measureList = measureList || []
            this.serviceRecordList = serviceList || []

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

    // 创建
    createMeasure = (data: any, code: string) => {
        return http(api.createMeasure, 'POST', data).then((res: any) => {
            this.optionRecord = res
            this.getAssistanceDetail(code)
        })
    }

    // 编辑
    updateMeasure = (data: any, code: string) => {
        return http(api.updateMeasure, 'POST', data).then((res: any) => {
            this.optionRecord = res
            this.getAssistanceDetail(code)
        })
    }

    // 禁用
    enableMeasure = (data: any, code: string) => {
        return http(api.enableMeasure, 'POST', data).then((res: any) => {
            this.optionRecord = res
            this.getAssistanceDetail(code)
        })
    }

    // 删除
    deleteMeasure = (data: any) => {
        return http(api.deleteMeasure, 'POST', data).then((res: any) => {
            this.optionRecord = res
        })
    }


    // 获取诊断结果
    getListLog = (data: any) => {
        return http(api.getListLog, 'GET', data).then((res: any) => {
            this.optionRecord = res
        })
    }


    // 创建
    createServer = (data: any, code: string) => {
        return http(api.createServer, 'POST', data).then((res: any) => {
            this.optionRecord = res
            this.getAssistanceDetail(code)
        })
    }

    // 编辑
    updateServer = (data: any, code: string) => {
        return http(api.updateServer, 'POST', data).then((res: any) => {
            this.optionRecord = res
            this.getAssistanceDetail(code)
        })
    }

    // 删除服务
    deleteServer = (data: any, code: string) => {
        return http(api.deleteServer, 'POST', data).then((res: any) => {
            this.optionRecord = res
            this.getAssistanceDetail(code)
        })
    }

    // 结束服务
    finishRecord = (data: any, code: string) => {
        return http(api.finishRecord, 'POST', data).then((res: any) => {
            this.optionRecord = res
            this.getAssistanceDetail(code)
        })
    }

    // 导出
    exportWord = (data: any) => {
        return http(api.exportWord, 'GET', data).then((res: any) => {
            downloadUrlFile(res, `分级分类援助服务过程记录表-${this.assistanceInfo?.name}-${dayjs().format('YYYYMMDDhhmmss')}`)
        })
    }

}

export default new Store()
