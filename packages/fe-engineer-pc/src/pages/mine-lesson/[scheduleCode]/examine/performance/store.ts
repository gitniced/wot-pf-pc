import { makeAutoObservable } from 'mobx'
import api from './api'
import http from '@/servers/http'
import type { ClassPerformanceScoreTableGroupDto, StuClassPerformanceScoreDto } from './interface'

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

    /**学生课堂表现 */
    public studentPerformance: ClassPerformanceScoreTableGroupDto[] = []

    /**学生姓名 */
    public studentName: string = ''

    /**学生头像 */
    public studentAvatar: string = ''

    /**获取学生课堂表现 */
    getStudentPerformance = async (scheduleCode: string, userCode: string) => {
        http(api.getStudentPerformance, 'post', {
            scheduleCode,
            userCode,
        })
            .then(data => {
                const {
                    items = [],
                    studentName,
                    studentAvatar,
                } = (data || {}) as unknown as StuClassPerformanceScoreDto
                this.studentName = studentName!
                this.studentAvatar = studentAvatar!
                this.studentPerformance = (items ||
                    []) as unknown as ClassPerformanceScoreTableGroupDto[]
            })
            .finally(() => {
                this.hasRequest = true
            })
    }
}

export default store
