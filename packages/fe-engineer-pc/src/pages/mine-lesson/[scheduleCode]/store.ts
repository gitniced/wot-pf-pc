import { makeAutoObservable } from 'mobx'
import api from './api'
import http from '@/servers/http'
import type {
    ClassCourseInfolDto,
    CourseStatisticsDto,
    StudentCourseDetailDto,
    EvaluationStatisticsDto,
    CourseScheduleInfoDto,
    ClassProgressInfoDto,
    TeacherAssessmentTodoDto,
    GroupLearningProgressRankItemDto,
    StudentRankingDto,
} from './interface'
import type { StudentTeamInfoDto } from './components/Team/interface'

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

    /**排课信息 */
    public scheduleInfo: Partial<CourseScheduleInfoDto> = {}
    /**课程统计信息 */
    public courseStatistics: Partial<CourseStatisticsDto> = {}
    /**学生课程统计信息 */
    public studentStatistics: Partial<StudentCourseDetailDto> = {}
    /**个人评价任务统计信息 */
    public studentEvaluationStatistics: Partial<EvaluationStatisticsDto> = {}
    /**班级课程信息 */
    public classCourseInfo: Partial<ClassCourseInfolDto> = {}
    /**班级进度信息 */
    public classProgress: Partial<ClassProgressInfoDto> = {}
    /**教师考核待办统计信息 */
    public teacherTodo: Partial<TeacherAssessmentTodoDto> = {}
    /**小组进度信息 */
    public groupProgressRank: Partial<GroupLearningProgressRankItemDto>[] = []
    /**班级课程学生考核成绩排行榜（前3名） */
    public classScoreRanking: Partial<StudentRankingDto>[] = []
    /**我的团队信息 */
    public teamInfo: Partial<StudentTeamInfoDto> = {}
    /**是否是组长 */
    public isTeamLeader: boolean = false
    /**获取班级课程信息 */
    getScheduleInfo = async (scheduleCode: string) => {
        http(api.getScheduleInfo, 'get', {
            scheduleCode,
        })
            .then(data => {
                this.scheduleInfo = (data || []) as unknown as CourseScheduleInfoDto
            })
            .finally(() => {
                this.hasRequest = true
            })
    }

    /**获取班级课程信息 */
    getTeacherTodo = async (scheduleCode: string) => {
        http(api.getTeacherTodo, 'get', {
            scheduleCode,
        })
            .then(data => {
                this.teacherTodo = (data || []) as unknown as TeacherAssessmentTodoDto
            })
            .finally(() => {
                this.hasRequest = true
            })
    }

    /**获取班级课程信息 */
    getClassProgress = async (scheduleCode: string) => {
        http(api.getClassProgress, 'get', {
            scheduleCode,
        })
            .then(data => {
                this.classProgress = (data || []) as unknown as ClassProgressInfoDto
            })
            .finally(() => {
                this.hasRequest = true
            })
    }
    /**获取小组进度信息 */
    getGroupProgressRank = async (scheduleCode: string) => {
        http(api.getGroupProgressRank, 'get', {
            scheduleCode,
        })
            .then(data => {
                this.groupProgressRank = (data ||
                    []) as unknown as GroupLearningProgressRankItemDto[]
            })
            .finally(() => {
                this.hasRequest = true
            })
    }
    /**获取班级课程信息 */
    getClassScoreRanking = async (scheduleCode: string) => {
        http(api.getClassScoreRanking, 'get', {
            scheduleCode,
        })
            .then(data => {
                this.classScoreRanking = (data || []) as unknown as StudentRankingDto[]
            })
            .finally(() => {
                this.hasRequest = true
            })
    }

    /**获取班级课程信息 */
    getClassCourseInfo = async (scheduleCode: string) => {
        http(api.getClassCourseInfo, 'get', {
            scheduleCode,
        })
            .then(data => {
                this.classCourseInfo = (data || []) as unknown as ClassCourseInfolDto
            })
            .finally(() => {
                this.hasRequest = true
            })
    }

    /**获取课程统计信息 */
    getCourseStatistics = async (courseCode: string) => {
        http(api.getCourseStatistics, 'get', {
            courseCode,
        })
            .then(data => {
                this.courseStatistics = (data || []) as unknown as CourseStatisticsDto
            })
            .finally(() => {
                this.hasRequest = true
            })
    }

    /**获取学生课程统计数据 */
    getStudentStatistics = async (scheduleCode: string) => {
        http(api.getStudentStatistics, 'get', {
            scheduleCode,
        })
            .then(data => {
                this.studentStatistics = (data || []) as unknown as StudentCourseDetailDto
            })
            .finally(() => {
                this.hasRequest = true
            })
    }
    /**获取个人评价任务统计 */
    getPersonExamineStatistics = async (scheduleCode: string) => {
        http(api.getPersonExamineStatistics, 'get', {
            scheduleCode,
        })
            .then(data => {
                this.studentEvaluationStatistics = (data ||
                    []) as unknown as EvaluationStatisticsDto
            })
            .finally(() => {
                this.hasRequest = true
            })
    }

    /**更新我的团队信息 */
    updateTeamInfo = (teamInfo: Partial<StudentTeamInfoDto>) => {
        const { role } = teamInfo || {}
        this.teamInfo = teamInfo
        this.isTeamLeader = String(role) === '1'
    }
}

export default store
