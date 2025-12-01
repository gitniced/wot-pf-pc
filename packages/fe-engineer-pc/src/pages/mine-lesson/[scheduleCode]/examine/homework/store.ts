import { makeAutoObservable } from 'mobx'
import api from './api'
import http from '@/servers/http'
import type { HomeworkScoreTableGroupDto, StuHomeworkScoreInfoDto } from './interface'

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

    /**学生姓名 */
    public studentName: string = ''

    /**学生头像 */
    public studentAvatar: string = ''

    /**学生课后作业 */
    public studentHomework: HomeworkScoreTableGroupDto[] = []

    /**获取学生课后作业 */
    getStudentHomework = async (scheduleCode: string, userCode: string) => {
        http(api.getStudentHomework, 'post', {
            scheduleCode,
            userCode,
        })
            .then(data => {
                const {
                    items = [],
                    studentName = '',
                    studentAvatar = '',
                } = (data || {}) as unknown as StuHomeworkScoreInfoDto
                this.studentName = studentName!
                this.studentAvatar = studentAvatar!
                this.studentHomework = (items || []) as unknown as HomeworkScoreTableGroupDto[]
            })
            .finally(() => {
                this.hasRequest = true
            })
    }
}

export default store
