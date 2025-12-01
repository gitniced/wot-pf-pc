import { makeAutoObservable } from 'mobx'
import api from './api'
import http from '@/servers/http'
import type {
    ClassPerformanceBaseInfoDto,
    ClassPerformanceByScheduleResDto,
    StudentPerformanceDto,
} from './interface'
import { cloneDeep } from 'lodash'
import { downloadFileByUrl } from '@/utils/file'
import { message } from 'antd'
import { executeHttpSequentially } from '@/utils/axiosIterator'
import { history } from 'umi'

class store {
    constructor() {
        makeAutoObservable(this)
    }

    /**是否请求成功 */
    public hasRequest: boolean = false

    /**是否请求中 */
    public isRequestPending: boolean = false

    /**我的全部学期课程数据 */
    public classPerformanceInfo: ClassPerformanceBaseInfoDto = {}

    /**学生课堂表现列表 */
    public studentPerformanceList: StudentPerformanceDto[] = []

    /**初始化课堂表现信息 */
    initPerformanceInfo = (scheduleCode: string, stepCode: string, isGrade: boolean) => {
        this.isRequestPending = true
        executeHttpSequentially([
            () => this.getClassPerformanceInfo(scheduleCode, stepCode),
            () => this.getStudentPerformanceList(scheduleCode, stepCode, isGrade),
        ])
            .then(data => {
                this.isRequestPending = false
                const { results } = data || {}
                const [_responseA, _responseB] = results || []
                if (_responseA.success) {
                    this.classPerformanceInfo = (_responseA.result ||
                        {}) as unknown as ClassPerformanceBaseInfoDto
                }
                if (_responseB.success) {
                    const { students } = (_responseB.result ||
                        {}) as unknown as ClassPerformanceByScheduleResDto
                    if (!isGrade) {
                        students.forEach(item => {
                            item.score = undefined
                        })
                    }
                    this.studentPerformanceList = (students ||
                        []) as unknown as StudentPerformanceDto[]
                }
            })
            .catch(() => {
                this.isRequestPending = false
            })
    }

    /**获取课堂表现基础信息 */
    getClassPerformanceInfo = (scheduleCode: string, stepCode: string) => {
        return http(api.getClassPerformanceInfo, 'get', { scheduleCode, stepCode })
    }

    /**获取班级学生列表 */
    getStudentPerformanceList = (scheduleCode: string, stepCode: string, needScore: boolean) => {
        return http(api.getStudentListBySchedule, 'post', { scheduleCode, stepCode, needScore })
    }

    /**获取课堂表现基础信息 */
    downloadTemplate = (classCode: string) => {
        http(api.downloadTemplate, 'get', { classCode }).then(data => {
            if (data) {
                downloadFileByUrl(data as string, '课堂表现评分模版')
            }
        })
    }

    onDataChange = (data: any) => {
        const newStudentPerformanceList = cloneDeep(this.studentPerformanceList)
        this.studentPerformanceList = newStudentPerformanceList.map(item => {
            if (item.studentCode === data.studentCode) {
                return { ...item, ...data }
            } else {
                return item
            }
        })
    }

    /**批量导入课堂表现评分 */
    batchImport = (scheduleCode: string, fileUrl: string, callback: () => void) => {
        const { classCode, courseCode, taskCode, stageCode, stepCode } =
            this.classPerformanceInfo || {}
        http(api.batchImport, 'post', {
            scheduleCode,
            classCode,
            courseCode,
            taskCode,
            stageCode,
            stepCode,
            fileUrl,
        })
            .then(data => {
                if (data) {
                    message.success('批量导入成功')
                }
            })
            .finally(() => {
                callback()
            })
    }

    /**批量提交课堂表现评分 */
    batchSubmit = (callback: () => void) => {
        const { taskCode, stageCode, stepCode, scheduleCode } = this.classPerformanceInfo || {}
        const tempStudentPerformanceList = cloneDeep(this.studentPerformanceList)
        const isNotFinish = tempStudentPerformanceList.some(item => item.score === undefined)
        if (isNotFinish) {
            message.warning('请先完成所有学生的评分')
            callback()
            return
        }
        const items = tempStudentPerformanceList.map(item => {
            return {
                studentUserCode: item.userCode,
                score: item.score,
                comment: item.comment,
            }
        })
        http(api.batchSubmit, 'post', { taskCode, stageCode, stepCode, scheduleCode, items })
            .then(data => {
                if (data) {
                    message.success('批量提交成功')
                    history.replace(`/performance`)
                }
            })
            .finally(() => {
                callback()
            })
    }
}

export default store
