import { makeAutoObservable } from 'mobx'
import api from './api'
import http from '@/servers/http'
import type {
    CourseClassInfoDto,
    HomeworkBaseInfoDto,
    StudentEvaDto,
    TeachStudentQuestionDto,
} from './interface'
import { message } from 'antd'
import { history } from 'umi'
import qs from 'qs'
import { cloneDeep } from 'lodash'
import type { ClassQuestionPageResDto } from '../interface'

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
    public studentHomework: TeachStudentQuestionDto = {} as TeachStudentQuestionDto

    /**当前学生 */
    public currentStudent: StudentEvaDto = {}

    /**获取考核项目编号下面的学习成果 */
    getStudentHomework = async (params: any) => {
        http(api.getStudentHomework, 'get', params).then((data = []) => {
            this.studentHomework = data as unknown as TeachStudentQuestionDto
        })
    }

    /**获取课后作业基础信息 */
    getHomeworkBaseInfo = async (params: any) => {
        http(api.getHomeworkBaseInfo, 'get', params).then(data => {
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
        http(api.getHomeworkStudentList, 'post', {
            ...params,
            pageNo: 1,
            pageSize: 9999,
            status: params.mode === 'grade' ? 1 : 2,
        }).then(data => {
            let { page = [] } = (data || {}) as unknown as ClassQuestionPageResDto
            this.homeworkStudentList = (page?.data || []) as unknown as StudentEvaDto[]
        })
    }

    /**获取当前学生评价 */
    setCurrentStudent = async (stuCode: string) => {
        const student = this.homeworkStudentList.find(item => item.stuCode === stuCode)

        this.currentStudent = student || {}
    }

    /**提交评分 */
    onFormFinish = async (
        values: any,
        stuCode: string,
        activityCode: string,
        scheduleCode: string,
    ) => {
        this.isSubmitPending = true
        console.log('评价提交数据', {
            homeworkContentCode: stuCode,
            ...values,
        })

        function filterQuestionFields(question: any) {
            const { type, code, score, subQuestions, remark } = question
            let filtered: any = { type, questionCode: code, comment: remark, score }

            if (Array.isArray(subQuestions)) {
                filtered.subCorrect = subQuestions.map(filterQuestionFields)
            }
            return filtered
        }

        // 处理所有题目
        if (Array.isArray(values.grade)) {
            values.correctList = values.grade.map(filterQuestionFields)
        }

        http(api.submitHomeworkGrade, 'post', {
            correctList: values.correctList,
            activityCode,
            stuCode,
        })
            .then(data => {
                if (data) {
                    let currentIndex = 0
                    const newTaskExamProjectStudentList = cloneDeep(this.homeworkStudentList)
                    this.homeworkStudentList = newTaskExamProjectStudentList.map((item, index) => {
                        if (item.stuCode === stuCode) {
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
                    const prevEvaluation = prevWaitEvaluationList[0]
                    const nextEvaluation = nextWaitEvaluationList[0]
                    if (nextEvaluation) {
                        history.replace(
                            `/quiz/${activityCode}/info?${qs.stringify({
                                ...qs.parse(location.search, { ignoreQueryPrefix: true }),
                                stuCode: nextEvaluation.stuCode,
                            })}`,
                        )
                    } else if (prevEvaluation) {
                        history.replace(
                            `/quiz/${activityCode}/info?${qs.stringify({
                                ...qs.parse(location.search, { ignoreQueryPrefix: true }),
                                stuCode: prevEvaluation.stuCode,
                            })}`,
                        )
                    } else {
                        this.currentStudent = {
                            ...this.currentStudent,
                            ...values,
                            status: true,
                        }
                        message.success('批改已完成')
                        history.replace(`/quiz/${activityCode}?scheduleCode=${scheduleCode}`)
                    }
                }
            })
            .finally(() => {
                this.isSubmitPending = false
            })
    }
}

export default store
