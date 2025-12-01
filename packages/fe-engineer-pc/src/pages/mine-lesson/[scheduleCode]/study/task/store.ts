import { makeAutoObservable } from 'mobx'
import api from './api'
import http from '@/servers/http'
import type { LearningStageDto, LearningTaskDto, ComponentType } from './interface'

import { STAGE, STEP, TASK } from './const'

class store {
    constructor() {
        makeAutoObservable(this)
    }
    /**是否请求成功 */
    public hasRequest: boolean = false

    /**当前课程id */
    public courseCode: string = ''

    /**任务页面组件类型 */
    public componentType: ComponentType = 'task'

    /**学习任务详情 */
    public taskDetail: LearningTaskDto = {}
    /**学习环节详情 */
    public stageDetail: LearningTaskDto = {}
    /**学习步骤详情 */
    public stepDetail: LearningTaskDto = {}

    /**更新课程code */
    updateCourseCode = (courseCode: string) => {
        this.courseCode = courseCode
    }

    /**获取任务详情 */
    getTaskDetail = async (taskCode: string) => {
        this.componentType = TASK
        http(api.getTaskDetail, 'post', {
            taskCode,
        })
            .then(data => {
                this.taskDetail = data as unknown as LearningTaskDto
            })
            .finally(() => {
                this.hasRequest = true
                // this.taskDetail =
            })
    }

    /**获取环节详情 */
    getStageDetail = async (stageCode: string) => {
        this.componentType = STAGE
        http(api.getStageDetail, 'post', {
            stageCode,
        })
            .then(data => {
                this.stageDetail = data as unknown as LearningStageDto
            })
            .finally(() => {
                this.hasRequest = true
            })
    }

    /**获取环节详情 */
    getStepDetail = async (stepCode: string) => {
        this.componentType = STEP
        http(api.getStepDetail, 'post', {
            stepCode,
        })
            .then(data => {
                this.stepDetail = data as unknown as LearningStageDto
            })
            .finally(() => {
                this.hasRequest = true
            })
    }
}

export default store
