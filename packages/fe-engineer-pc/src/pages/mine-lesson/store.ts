import { makeAutoObservable } from 'mobx'
import api from './api'
import http from '@/servers/http'
import type { CourseStatisticsByClassDto, SemesterCourseDetailDto } from './interface'

class store {
    constructor() {
        makeAutoObservable(this)
    }
    /**是否请求学生统计数据成功 */
    public hasRequestStudentStatistics: boolean = false
    /**是否请求学期课程数据成功 */
    public hasRequestSemesterCourses: boolean = false

    /**当前学期课程数据 */
    public studentStatistics: CourseStatisticsByClassDto = {}
    /**当前学期课程数据 */
    public semesterCourses: SemesterCourseDetailDto[] = []

    getStudentStatisticsByClass = async (semester: string, classCode: string) => {
        http(api.getStudentStatisticsByClass, 'post', {
            classCode,
            semester,
        })
            .then(data => {
                this.studentStatistics = (data || []) as unknown as CourseStatisticsByClassDto
            })
            .finally(() => {
                this.hasRequestStudentStatistics = true
            })
    }

    getSemesterCourses = async (semester: string, classCode: string) => {
        http(api.getSemesterStuCourses, 'post', {
            classCode,
            semester,
        })
            .then(data => {
                this.semesterCourses = (data || []) as unknown as SemesterCourseDetailDto[]
            })
            .finally(() => {
                this.hasRequestSemesterCourses = true
            })
    }
}

export default store
