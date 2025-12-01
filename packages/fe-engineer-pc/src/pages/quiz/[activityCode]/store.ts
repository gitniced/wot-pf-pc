import { makeAutoObservable } from 'mobx'
import api from './api'
import http from '@/servers/http'
import type {
    ClassQuestionPageResDto,
    CourseClassInfoDto,
    HomeworkBaseInfoDto,
    StudentEvaDto,
} from './interface'

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

    /**课堂测验基础信息 */
    public homeworkBaseInfo: HomeworkBaseInfoDto = {}

    /**考核项目学生列表 */
    public homeworkStudentList: StudentEvaDto[] = []

    /**已评分数量 */
    public toSubmitCount: number = 0
    /**待评分数量 */
    public toCorrectCount: number = 0
    /**待提交数量 */
    public alreadyCorrectCount: number = 0
    /**题目codes */
    public questionCodes: string[] = []

    /**获取班级课程相关信息 */
    getCourseClassInfo = async (scheduleCode: string) => {
        http(api.getCourseClassInfo, 'get', { scheduleCode }).then(data => {
            this.courseClassInfo = data as unknown as CourseClassInfoDto
        })
    }

    /**获取课堂测验基础信息 */
    getHomeworkBaseInfo = async (params: any) => {
        http(api.getBaseInfo, 'get', params).then(data => {
            this.homeworkBaseInfo = data as unknown as HomeworkBaseInfoDto
        })
    }

    /**获取课堂测验学生列表 */
    getHomeworkStudentList = async (params: any) => {
        delete params.pageNo
        delete params.pageSize
        const res = await http<any, ClassQuestionPageResDto>(
            api.getClassQuestionPage,
            'post',
            params,
        )
        const {
            page = [],
            toSubmitCount,
            toCorrectCount,
            alreadyCorrectCount,
            questionCodes,
        } = res || {}
        this.toSubmitCount = toSubmitCount || 0
        this.toCorrectCount = toCorrectCount || 0
        this.alreadyCorrectCount = alreadyCorrectCount || 0
        this.questionCodes = questionCodes || []
        const finalData = {
            data: page.data,
            totalCount: page.totalCount,
            currentPage: 1,
            pageSize: page.pageSize,
            pages: page.currentPage,
        }
        return finalData
    }
}

export default store
