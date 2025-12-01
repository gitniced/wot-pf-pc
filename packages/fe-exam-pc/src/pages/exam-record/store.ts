import { makeAutoObservable } from 'mobx'
import type { ExamDetail, InvigilationDetailParams } from './interface'
import { getStuList, getExamDetail, getExportRecordApi } from './api'
import { omit } from 'lodash'

class ExamRecordStore {
    constructor() {
        makeAutoObservable(this)
    }

    //考试详情
    public examDetail: Partial<ExamDetail> = {}

    // 导出参数
    public exportParams: InvigilationDetailParams | undefined

    // 获取学生列表
    getStuList = (params?: InvigilationDetailParams) => {
        this.exportParams = params
        return getStuList(params)
    }

    //获取考试详情
    getExamDetail = (examCode: string) => {
        getExamDetail(examCode).then((res: any) => {
            this.examDetail = res || {}
        })
    }

    // 获取导出记录
    getExportRecord = (params?: InvigilationDetailParams) => {
        const pickerParams = omit(params, ['pageNo', 'pageSize'])
        return getExportRecordApi({ ...pickerParams })
    }
}

export default new ExamRecordStore()
