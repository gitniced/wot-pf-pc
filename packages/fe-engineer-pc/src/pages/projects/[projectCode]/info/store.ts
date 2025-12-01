import { makeAutoObservable } from 'mobx'
import api from './api'
import http from '@/servers/http'
import type {
    AssessmentProjectBaseInfoDto,
    AssessmentProjectCriteriaDto,
    CourseClassInfoDto,
    EvaluationCriteriaItemDto,
    ProjectLearningOutcomeDto,
    ProjectScoreDetailsDto,
    StudentEvaDto,
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

    /**考核项目编号基础信息 */
    public taskExamProjectInfo: AssessmentProjectBaseInfoDto = {}

    /**考核项目学生列表 */
    public taskExamProjectStudentList: StudentEvaDto[] = []

    /**考核项目评价细则 */
    public criteriaList: EvaluationCriteriaItemDto[] = []

    /**考核项目编号下面的学习成果 */
    public projectOutcomes: ProjectLearningOutcomeDto[] = []

    /**当前学习成果 */
    public currentProjectOutcomes: ProjectLearningOutcomeDto = {}

    /**当前学生评价 */
    public currentStudentEvaluation: any = {}

    /**获取考核项目编号下面的学习成果 */
    getProjectOutcomes = async (scheduleCode: string, userCode: string, projectCode: string) => {
        if (!userCode || !projectCode) return
        http(api.getProjectOutcomes, 'post', { scheduleCode, userCode, projectCode }).then(
            (data = []) => {
                this.projectOutcomes = data as unknown as ProjectLearningOutcomeDto[]
                this.currentProjectOutcomes =
                    data?.[0] || ({} as unknown as ProjectLearningOutcomeDto)
            },
        )
    }
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
        http(api.getTaskExamProjectStudentList, 'post', { ...params }).then(data => {
            let { students = [] } = (data || {}) as unknown as TaskAssessmentStudentsResDto
            this.taskExamProjectStudentList = (students || []) as unknown as StudentEvaDto[]
        })
    }

    /**获取考核项目评价细则 */
    getCriteria = async (projectCode: string) => {
        http(api.getCriteria, 'get', { projectCode }).then(data => {
            const { criteriaList = [] } = (data || {}) as unknown as AssessmentProjectCriteriaDto
            this.criteriaList = (criteriaList || []) as unknown as EvaluationCriteriaItemDto[]
        })
    }

    /**获取当前学生评价 */
    getCurrentStudentEvaluation = async (userCode: string, projectCode: string) => {
        console.log('获取当前学生评价', userCode)
        const student = this.taskExamProjectStudentList.find(item => item.userCode === userCode)
        http(api.getEvaluationScoreDetails, 'get', {
            evaluatedCode: student?.userCode,
            projectCode,
            type: 4,
        }).then(data => {
            console.log('获取当前学生评价', data)
            const { comment, criterionScores = [] } = (data ||
                {}) as unknown as ProjectScoreDetailsDto
            const newCriterionScores = criterionScores?.map(item => {
                const temp = this.criteriaList.find(
                    tempItem => item.criterionCode === tempItem.code,
                )
                if (temp) {
                    return {
                        ...temp,
                        ...item,
                    }
                } else {
                    return {
                        ...item,
                    }
                }
            })
            // const currentStudent = this.taskExamProjectStudentList.find(
            //     item => item.userCode === userCode,
            // )
            // console.log('newCriterionScores', {
            //     ...currentStudent,
            //     criterionScores: newCriterionScores,
            //     comment,
            // })
            this.currentStudentEvaluation = { criterionScores: newCriterionScores, comment }
        })
    }

    /**提交评分 */
    onFormFinish = async (values: any, evaluationTask: string, projectCode: string) => {
        this.isSubmitPending = true
        const evaluationDetails = this.criteriaList.map(item => {
            return {
                criterionCode: item.code,
                score: values[item.code || ''] || 0,
                weight: item.weight,
            }
        })
        console.log('评价提交数据')
        console.log({
            evaluationTask,
            evaluationDetails,
            comment: values.comment,
        })

        http(api.submitEvaluation, 'post', {
            evaluationTask,
            evaluationDetails,
            comment: values.comment || '',
        })
            .then(data => {
                if (data) {
                    let currentIndex = 0
                    const newTaskExamProjectStudentList = cloneDeep(this.taskExamProjectStudentList)
                    this.taskExamProjectStudentList = newTaskExamProjectStudentList.map(
                        (item, index) => {
                            if (item.evaluationTask === evaluationTask) {
                                currentIndex = index
                                return { ...item, status: true }
                            }
                            return item
                        },
                    )
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
                            `/projects/${projectCode}/info?${qs.stringify({
                                ...qs.parse(location.search, { ignoreQueryPrefix: true }),
                                evaluationTask: nextEvaluation.evaluationTask,
                            })}`,
                        )
                    } else if (prevEvaluation) {
                        history.replace(
                            `/projects/${projectCode}/info?${qs.stringify({
                                ...qs.parse(location.search, { ignoreQueryPrefix: true }),
                                evaluationTask: prevEvaluation.evaluationTask,
                            })}`,
                        )
                    } else {
                        message.success('评价已完成')
                    }
                }
            })
            .finally(() => {
                this.isSubmitPending = false
            })
    }
}

export default store
