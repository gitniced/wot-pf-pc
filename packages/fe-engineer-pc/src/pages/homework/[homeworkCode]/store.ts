import { makeAutoObservable } from 'mobx'
import api from './api'
import http from '@/servers/http'
import type {
    CourseClassInfoDto,
    HomeworkBaseInfoDto,
    StudentEvaDto,
    TaskAssessmentStudentsResDto,
} from './interface'
import type { TableData } from '@/types'

class store {
    constructor() {
        makeAutoObservable(this)
    }

    /**是否请求成功 */
    public hasRequest: boolean = false

    /**是否请求中 */
    public isRequestPending: boolean = false

    /**班级课程相关信息 */
    public courseClassInfo: CourseClassInfoDto = {}

    /**课后作业基础信息 */
    public homeworkBaseInfo: HomeworkBaseInfoDto = {}

    /**考核项目学生列表 */
    public homeworkStudentList: StudentEvaDto[] = []

    /**已评分数量 */
    public gradedCount: number = 0
    /**待评分数量 */
    public pendingGradeCount: number = 0
    /**待提交数量 */
    public pendingSubmitCount: number = 0

    /**获取班级课程相关信息 */
    getCourseClassInfo = async (scheduleCode: string) => {
        http(api.getCourseClassInfo, 'get', { scheduleCode }).then(data => {
            this.courseClassInfo = data as unknown as CourseClassInfoDto
        })
    }

    /**获取课后作业基础信息 */
    getHomeworkBaseInfo = async (homeworkCode: string) => {
        http(api.getHomeworkBaseInfo, 'get', { homeworkCode }).then(data => {
            this.homeworkBaseInfo = data as unknown as HomeworkBaseInfoDto
        })
    }

    /**获取课后作业学生列表 */
    getHomeworkStudentList = async (params: any) => {
        delete params.pageNo
        delete params.pageSize
        const res = await http(api.getHomeworkStudentList, 'post', params)
        const {
            students = [],
            gradedCount,
            pendingGradeCount,
            pendingSubmitCount,
        } = (res || {}) as unknown as TaskAssessmentStudentsResDto
        this.gradedCount = gradedCount || 0
        this.pendingGradeCount = pendingGradeCount || 0
        this.pendingSubmitCount = pendingSubmitCount || 0
        const finalData = {
            data: students,
            totalCount: students.length,
            currentPage: 1,
            pageSize: 100,
            pages: 1,
        }
        return finalData as unknown as TableData<StudentEvaDto[]>
    }
}

export default store
