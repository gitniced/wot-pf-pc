import { makeAutoObservable } from 'mobx'
import api from './api'
import http from '@/servers/http'
import type {
    CourseClassInfoDto,
    AssessmentProjectBaseInfoDto,
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

    /**考核项目编号基础信息 */
    public taskExamProjectInfo: AssessmentProjectBaseInfoDto = {}

    /**考核项目学生列表 */
    public taskExamProjectStudentList: StudentEvaDto[] = []

    /**已评分数量 */
    public gradedCount: number = 0
    /**待评分数量 */
    public pendingGradeCount: number = 0
    /**待提交数量 */
    public pendingSubmitCount: number = 0

    /**获取考核项目编号基础信息 */
    getTaskExamProjectInfo = async (projectCode: string) => {
        http(api.getTaskExamProjectInfo, 'get', { projectCode }).then(data => {
            this.taskExamProjectInfo = data as unknown as AssessmentProjectBaseInfoDto
        })
    }

    /**获取班级课程相关信息 */
    getCourseClassInfo = async (scheduleCode: string) => {
        http(api.getCourseClassInfo, 'get', { scheduleCode }).then(data => {
            this.courseClassInfo = data as unknown as CourseClassInfoDto
        })
    }

    /**获取班级课程相关信息 */
    getTaskExamProjectStudentList = async (params: any) => {
        delete params.pageNo
        delete params.pageSize
        const res = await http(api.getTaskExamProjectStudentList, 'post', params)
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
