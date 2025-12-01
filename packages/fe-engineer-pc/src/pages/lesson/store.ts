import { makeAutoObservable } from 'mobx'
import api from './api'
import http from '@/servers/http'
import type { SemesterCourselDto } from './interface'

class store {
    constructor() {
        makeAutoObservable(this)
    }

    /**是否请求成功 */
    public hasRequest: boolean = false
    /**我的全部学期课程数据 */
    public allSemesterCourse: SemesterCourselDto[] = []

    getAllCourses = () => {
        http(api.getAllCourses, 'get', {})
            .then(data => {
                this.allSemesterCourse = (data || []) as unknown as SemesterCourselDto[]
            })
            .finally(() => {
                this.hasRequest = true
            })
    }
}

export default store
