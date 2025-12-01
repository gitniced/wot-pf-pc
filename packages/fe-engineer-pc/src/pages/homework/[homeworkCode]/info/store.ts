import { makeAutoObservable } from 'mobx'
import api from './api'
import http from '@/servers/http'
import type {
    CourseClassInfoDto,
    HomeworkBaseInfoDto,
    StudentEvaDto,
    StudentHomeworkDto,
    TaskAssessmentStudentsResDto,
} from './interface'
import { message } from 'antd'
import { history } from 'umi'
import qs from 'qs'
import { cloneDeep } from 'lodash'

class store {
    constructor() {
        makeAutoObservable(this)
    }

    /**是否请求成功 */
    public hasRequest: boolean = false

    /**是否请求中 */
    public isRequestPending: boolean = false
    /**是否提交中 */
    public isSubmitPending: boolean = false

    /**班级课程相关信息 */
    public courseClassInfo: CourseClassInfoDto = {}

    /**课后作业基础信息 */
    public homeworkBaseInfo: HomeworkBaseInfoDto = {}

    /**考核项目学生列表 */
    public homeworkStudentList: StudentEvaDto[] = []

    /**当前学生的课后作业 */
    public studentHomework: StudentHomeworkDto = {}

    /**当前学生的课后作业 */
    public currentProjectOutcomes: StudentHomeworkDto = {}

    /**当前学生评价 */
    public currentStudentHomework: StudentEvaDto = {}

    /**获取考核项目编号下面的学习成果 */
    getStudentHomework = async (evaluationTask: string) => {
        if (!evaluationTask) return
        http(api.getStudentHomework, 'get', { contentCode: evaluationTask }).then((data = []) => {
            console.log('获取当前学生的课后作业', data)
            this.studentHomework = data as unknown as StudentHomeworkDto
        })
    }

    /**获取课后作业基础信息 */
    getHomeworkBaseInfo = async (homeworkCode: string) => {
        http(api.getHomeworkBaseInfo, 'get', { homeworkCode }).then(data => {
            this.homeworkBaseInfo = data as unknown as HomeworkBaseInfoDto
        })
    }

    /**获取班级课程相关信息 */
    getCourseClassInfo = async (scheduleCode: string) => {
        http(api.getCourseClassInfo, 'get', { scheduleCode }).then(data => {
            this.courseClassInfo = data as unknown as CourseClassInfoDto
        })
    }

    /**获取班级课程相关信息 */
    getHomeworkStudentList = async (params: any) => {
        http(api.getHomeworkStudentList, 'post', { ...params }).then(data => {
            let { students = [] } = (data || {}) as unknown as TaskAssessmentStudentsResDto
            this.homeworkStudentList = (students || []) as unknown as StudentEvaDto[]
        })
    }

    /**获取当前学生评价 */
    getCurrentStudentHomework = async (evaluationTask: string) => {
        if (evaluationTask) {
            const student = this.homeworkStudentList.find(
                item => item.evaluationTask === evaluationTask,
            )
            this.currentStudentHomework = student || {}
        } else {
            this.currentStudentHomework = this.homeworkStudentList?.[0] || {}
        }
    }

    /**提交评分 */
    onFormFinish = async (
        values: any,
        scheduleCode: string,
        evaluationTask: string,
        homeworkCode: string,
    ) => {
        this.isSubmitPending = true
        http(api.submitHomeworkGrade, 'post', { ...values, homeworkContentCode: evaluationTask })
            .then(data => {
                if (data) {
                    let currentIndex = 0
                    const newTaskExamProjectStudentList = cloneDeep(this.homeworkStudentList)
                    this.homeworkStudentList = newTaskExamProjectStudentList.map((item, index) => {
                        if (item.evaluationTask === evaluationTask) {
                            currentIndex = index
                            return { ...item, ...values, status: true }
                        }
                        return item
                    })
                    const prevWaitEvaluationList = newTaskExamProjectStudentList.filter(
                        (i, index) => index < currentIndex,
                    )
                    const nextWaitEvaluationList = newTaskExamProjectStudentList.filter(
                        (i, index) => index > currentIndex,
                    )
                    const prevEvaluation = prevWaitEvaluationList.find(item => !item.status)
                    const nextEvaluation = nextWaitEvaluationList.find(item => !item.status)
                    if (nextEvaluation) {
                        history.replace(
                            `/homework/${homeworkCode}/info?${qs.stringify({
                                ...qs.parse(location.search, { ignoreQueryPrefix: true }),
                                evaluationTask: nextEvaluation.evaluationTask,
                            })}`,
                        )
                    } else if (prevEvaluation) {
                        history.replace(
                            `/homework/${homeworkCode}/info?${qs.stringify({
                                ...qs.parse(location.search, { ignoreQueryPrefix: true }),
                                evaluationTask: prevEvaluation.evaluationTask,
                            })}`,
                        )
                    } else {
                        this.currentStudentHomework = {
                            ...this.currentStudentHomework,
                            ...values,
                            status: true,
                        }
                        history.replace(`/homework/${homeworkCode}?scheduleCode=${scheduleCode}`)
                        message.success('批改已完成')
                    }
                }
            })
            .finally(() => {
                this.isSubmitPending = false
            })
    }
}

export default store
