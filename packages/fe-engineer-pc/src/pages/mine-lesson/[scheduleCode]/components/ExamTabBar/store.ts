import { makeAutoObservable } from 'mobx'
import http from '@/servers/http'
import api from './api'
import type { CourseEvaluationDto } from './interface'

class store {
    constructor() {
        makeAutoObservable(this)
        if (!store.instance) {
            store.instance = this
        }
        return store.instance
    }

    /**第一个考核项 */
    public firstEvaluationUrl: string = ''
    /**课程考核构成 */
    public courseEvaluations: CourseEvaluationDto[] = []

    /**获取任务列表 */
    getCourseEvaluations = async (scheduleCode: string) => {
        const courseEvaluations = (await http(api.getCourseEvaluations, 'get', {
            scheduleCode,
        })) as unknown as CourseEvaluationDto[]
        const finalCourseEvaluations = courseEvaluations.filter(item => item.weight !== 0)
        this.courseEvaluations = finalCourseEvaluations
        this.getFirstEvaluation(scheduleCode)
    }

    /**获取第一个考核项 */
    getFirstEvaluation = (scheduleCode: string) => {
        const firstEvaluation = this.courseEvaluations?.[0] || {}
        const { type, taskCode } = firstEvaluation || {}
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
        this.firstEvaluationUrl = finallyUrl
    }
}

export default store
