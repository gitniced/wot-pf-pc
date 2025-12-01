import { makeAutoObservable } from 'mobx'
import { cloneDeep } from 'lodash'
import http from '@/servers/http'
import api from './api'
import type {
    BasePaginationRspHomeworkPageItemDto,
    BasePaginationRspTaskAssessmentPageDto,
    ClassPerformancePageDto,
    CourseClassInfoDto,
    CourseEvaluationDto,
    FinalAssessmentByScheduleResDto,
    StudentEvaDto,
} from './interface'
import type { TableData } from '@/types'
import { message } from 'antd'
import { downloadFileByUrl } from '@/utils/file'
import { history } from 'umi'

class store {
    constructor() {
        makeAutoObservable(this)
        if (!store.instance) {
            store.instance = this
        }
        return store.instance
    }
    /**是否请求成功 */
    public hasRequest: boolean = false

    /**班级课程相关信息 */
    public courseClassInfo: CourseClassInfoDto = {}

    /**课程考核构成 */
    public courseEvaluations: CourseEvaluationDto[] = []

    /**终结性考核状态 */
    public finalAssessmentStatus: number = 0
    /**终结性考核列表 */
    public finalAssessmentList: StudentEvaDto[] = []

    /**获取班级课程相关信息 */
    getCourseClassInfo = async (scheduleCode: string) => {
        http(api.getCourseClassInfo, 'get', { scheduleCode }).then(data => {
            this.courseClassInfo = data as unknown as CourseClassInfoDto
        })
    }
    /**获取任务列表 */
    getCourseEvaluations = async (scheduleCode: string) => {
        const courseEvaluations = (await http(api.getCourseEvaluations, 'get', {
            scheduleCode,
        })) as unknown as CourseEvaluationDto[]
        const finalCourseEvaluations = courseEvaluations.filter(item => item.weight !== 0)
        this.courseEvaluations = finalCourseEvaluations
        this.gotoFirstEvaluation(scheduleCode)
    }

    /**跳转到第一个考核项 */
    gotoFirstEvaluation = (scheduleCode: string) => {
        const firstEvaluation = this.courseEvaluations?.[0]
        const { type, taskCode } = firstEvaluation || {}
        const noJumpUrl = [
            `/engineer-center/mine-lesson/${scheduleCode}/examine/rating/performance`,
            `/engineer-center/mine-lesson/${scheduleCode}/examine/rating/homework`,
            `/engineer-center/mine-lesson/${scheduleCode}/examine/rating/task/${taskCode}`,
            `/engineer-center/mine-lesson/${scheduleCode}/examine/rating/exam`,
            `/engineer-center/mine-lesson/${scheduleCode}/examine/rating`,
        ]
        if (noJumpUrl.includes(location.pathname)) {
            return
        }
        let finallyUrl = ''
        switch (type) {
            case 1:
                finallyUrl = `/mine-lesson/${scheduleCode}/examine/rating/performance`
                break
            case 2:
                finallyUrl = `/mine-lesson/${scheduleCode}/examine/rating/homework`
                break
            case 3:
                finallyUrl = `/mine-lesson/${scheduleCode}/examine/rating/task/${taskCode}`
                break
            case 4:
                finallyUrl = `/mine-lesson/${scheduleCode}/examine/rating/exam`
                break
            default:
                finallyUrl = `/mine-lesson/${scheduleCode}/examine/rating`
        }
        history.push(finallyUrl)
    }

    /**获取课后作业列表 */
    getHomeworkList = async (params: any) => {
        this.hasRequest = false
        const res = await http(api.getHomeworkList, 'post', params)
        this.hasRequest = true
        return res as unknown as TableData<BasePaginationRspHomeworkPageItemDto[]>
    }

    /**获取课堂表现数据 */
    getClassPerformanceList = async (params: any) => {
        this.hasRequest = false
        const res = await http(api.getClassPerformanceList, 'post', params)
        this.hasRequest = true
        return res as unknown as TableData<ClassPerformancePageDto[]>
    }

    /**获取个人评价任务统计 */
    getTaskExamList = async (params: any) => {
        this.hasRequest = false
        const res = await http(api.getTaskExamList, 'post', params)
        this.hasRequest = true
        return res as unknown as TableData<BasePaginationRspTaskAssessmentPageDto[]>
    }

    /**更新单人终结性考核评分编辑状态 */
    updateEditing = async (data: StudentEvaDto, bool: boolean = true) => {
        const { evaluationTask } = data || {}
        const newFinalAssessmentList = cloneDeep(this.finalAssessmentList)
        this.finalAssessmentList = newFinalAssessmentList.map(item => {
            if (item.evaluationTask === evaluationTask) {
                return { ...data, isEditing: bool }
            }
            return item
        })
    }

    /**更新单人终结性考核评分 */
    updateScoreSingle = async (data: StudentEvaDto) => {
        const { evaluationTask, score } = data || {}
        this.updateEditing(data, false)
        http(api.updateScoreSingle, 'post', {
            code: evaluationTask,
            score,
        }).then(res => {
            if (res) {
                message.success('评分更新成功')
                const newFinalAssessmentList = cloneDeep(this.finalAssessmentList)
                this.finalAssessmentList = newFinalAssessmentList.map(item => {
                    if (item.evaluationTask === evaluationTask) {
                        return { ...item, score }
                    }
                    return item
                })
            }
        })
    }

    /**下载模板 */
    downloadTemplateFinalAssessment = async (scheduleCode: string) => {
        http(api.downloadTemplateFinalAssessment, 'get', { scheduleCode }).then(res => {
            if (res) {
                downloadFileByUrl(res as string, '终结性考核评分模版')
            }
        })
    }
    /**批量导入学生终结性考核评分 */
    batchImportFinalAssessment = async (
        {
            scheduleCode,
            fileUrl,
        }: {
            scheduleCode: string
            fileUrl: string
        },
        callback: () => void,
    ) => {
        http(api.batchImportFinalAssessment, 'post', { scheduleCode, fileUrl })
            .then(res => {
                if (res) {
                    this.getFinalAssessment(scheduleCode)
                    message.success('批量导入成功')
                }
            })
            .finally(() => {
                callback()
            })
    }

    /**提交班级终结性考核 */
    submitFinalAssessment = async (scheduleCode: string) => {
        http(api.submitFinalAssessment, 'post', { scheduleCode }).then(res => {
            if (res) {
                message.success('提交成功')
                this.getFinalAssessment(scheduleCode)
            }
        })
    }

    /**获取班级终结性考核 */
    getFinalAssessment = async (scheduleCode: string) => {
        this.hasRequest = false
        const res = await http(api.getFinalAssessment, 'post', { scheduleCode })
        const { status, finalAssessmentList = [] } = (res ||
            {}) as unknown as FinalAssessmentByScheduleResDto
        finalAssessmentList.map(item => {
            if (String(status) === '0') {
                item.isEditing = false
            }
            return item
        })
        this.finalAssessmentStatus = status as number
        this.finalAssessmentList = finalAssessmentList as StudentEvaDto[]
        this.hasRequest = true
    }
}

export default store
