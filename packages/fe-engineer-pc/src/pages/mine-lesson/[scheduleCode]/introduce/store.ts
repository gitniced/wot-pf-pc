import { makeAutoObservable } from 'mobx'
import api from './api'
import http from '@/servers/http'
import type { CourseIntroductionDto } from './interface'
import { INTRODUCE_MENU } from './const'
import { cloneDeep } from 'lodash'

class store {
    constructor() {
        makeAutoObservable(this)
    }
    /**是否请求成功 */
    public hasRequest: boolean = false
    /**是否请求成功 */
    // public hasRequest: boolean = false

    /**当前锚点 */
    public currentStep: string = ''
    /**当前锚点名称 */
    public currentStepName: string = ''
    /**左侧锚点列表 */
    public stepList: any = []
    /**课程介绍详情 */
    public introduction: CourseIntroductionDto = {}

    updateCurrentStep = (stepItem: any) => {
        const { key, label } = stepItem
        this.currentStep = key
        this.currentStepName = label
    }

    getIntroduction = async (courseCode: string) => {
        http(api.getIntroduction, 'get', { courseCode })
            .then(data => {
                this.hasRequest = true
                this.introduction = data as unknown as CourseIntroductionDto
                let stepList = cloneDeep(INTRODUCE_MENU)
                stepList = stepList.filter(i => this.introduction[i.key])
                if (stepList.length === 0) {
                    stepList = cloneDeep(INTRODUCE_MENU)
                }
                this.stepList = stepList
                this.currentStep = this.stepList[0].key
                this.currentStepName = this.stepList[0].label
            })
            .finally(() => {
                this.hasRequest = false
            })
    }
}

export default store
