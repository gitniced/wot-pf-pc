import { makeAutoObservable } from 'mobx'
import api from './api'
import http from '@/servers/http'
import type { TaskAssessmentScoreTableGroupDto } from './interface'

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

    /**学生任务考核 */
    public studentTaskAssessment: TaskAssessmentScoreTableGroupDto = {}

    /**获取学生任务考核 */
    getStudentTaskAssessment = async (scheduleCode: string, taskCode: string, userCode: string) => {
        http(api.getStudentTaskAssessment, 'post', {
            scheduleCode,
            taskCode,
            userCode,
        })
            .then(data => {
                this.studentTaskAssessment = (data ||
                    {}) as unknown as TaskAssessmentScoreTableGroupDto
            })
            .finally(() => {
                this.hasRequest = true
            })
    }
}

export default store
