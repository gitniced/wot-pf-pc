import { makeAutoObservable } from 'mobx'
import http from '@/servers/http'
import api from './api'
import { cloneDeep } from 'lodash'
import type {
    ActivitySubmissionDto,
    ActivitySubmittedStudentsResDto,
    OutcomeItemDto,
} from './interface'

class store {
    constructor() {
        makeAutoObservable(this)
    }
    /**是否请求成功 */
    public hasRequest: boolean = false
    /**当前学生 */
    public currentStudent = {}
    /**学生列表 */
    public studentList: ActivitySubmissionDto[] = []
    /**待提交数量 */
    public pendingCount = 0
    /**已提交数量 */
    public submittedCount = 0
    /**学习成果 */
    public studyGain: OutcomeItemDto = {}

    updateCurrentStudent = (student: ActivitySubmissionDto) => {
        const tempStudentList = cloneDeep(this.studentList)
        tempStudentList.map(item => {
            if (item.submitterCode === student.submitterCode) {
                item.active = true
            } else {
                item.active = false
            }
        })
        this.studentList = tempStudentList
    }

    getSubmitteds = (scheduleCode: string, activityCode: string) => {
        http(`${api.getSubmitteds}`, 'post', { scheduleCode, activityCode })
            .then(data => {
                const {
                    submitteds = [],
                    pendingCount = 0,
                    submittedCount = 0,
                } = data as unknown as ActivitySubmittedStudentsResDto
                submitteds?.[0] && (submitteds[0].active = true)
                this.studentList = submitteds
                this.pendingCount = pendingCount
                this.submittedCount = submittedCount
            })
            .finally(() => {
                this.hasRequest = true
            })
    }

    getSubmitterOutcome = (outcomeCode: string, submitterCode: string) => {
        http(`${api.getSubmitterOutcome}`, 'post', { outcomeCode, submitterCode })
            .then(data => {
                this.studyGain = data as unknown as OutcomeItemDto
            })
            .finally(() => {
                this.hasRequest = true
            })
    }
}

export default store
