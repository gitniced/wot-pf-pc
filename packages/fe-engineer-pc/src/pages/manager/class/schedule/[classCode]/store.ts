import { makeAutoObservable, runInAction } from 'mobx'
import { message } from 'antd'
import { getClassDetail } from '../../class/service'
import { getCourseSchedulePage, getSemesters, batchSaveCourseSchedule } from './service'
import { getCourseList } from '@/pages/manager/course/course/service'
import http from '@/servers/http'
import type { ICourseScheduleRes, ISemesterInfo, ICourseScheduleDto } from './types'
import type { IClass } from '../../class/types'

export interface ITeacherOption {
    code: string
    userCode: string
    name: string
    mobile?: string
    label: string
    value: string
}

class Store {
    // 基本状态
    classInfo: IClass | null = null
    loading = false
    tableLoading = false
    saveLoading = false

    // 课程相关
    courseList: ICourseScheduleRes[] = []
    courseOptions: any[] = []
    courseSearchLoading = false
    selectValue: string | null = null

    // 学期相关
    semesterOptions: ISemesterInfo[] = []

    // 教师相关
    teacherOptions: ITeacherOption[] = []
    teacherSearchLoading = false

    constructor() {
        makeAutoObservable(this)
    }

    /**
     * 初始化班级信息和学期信息
     */
    async init(classCode: string) {
        if (!classCode) return

        try {
            runInAction(() => {
                this.loading = true
            })

            const classDetail = await getClassDetail(classCode)

            runInAction(() => {
                this.classInfo = classDetail
            })

            this.searchTeachers()

            if (classDetail?.enrollYear && classDetail?.eduLen) {
                const semesters = await getSemesters(classDetail.enrollYear, classDetail.eduLen)
                runInAction(() => {
                    this.semesterOptions = semesters || []
                })
            }
        } finally {
            runInAction(() => {
                this.loading = false
            })
        }
    }

    /**
     * 获取课程列表
     */
    async fetchCourseList(classCode: string) {
        if (!classCode || !this.classInfo) return

        try {
            runInAction(() => {
                this.tableLoading = true
            })

            const res = await getCourseSchedulePage({
                classCode: classCode,
                majorCode: this.classInfo.majorCode,
                level: this.classInfo.trainLevel,
                status: 2,
                pageNo: 1,
                pageSize: 1000,
            })

            runInAction(() => {
                this.courseList = res.data || []
            })
        } finally {
            runInAction(() => {
                this.tableLoading = false
            })
        }
    }

    /**
     * 更新课程信息
     */
    updateCourse(courseCode: string, field: string, value: any) {
        runInAction(() => {
            this.courseList = this.courseList.map(item =>
                item.courseCode === courseCode ? { ...item, [field]: value } : item,
            )
        })
    }

    /**
     * 添加课程
     */
    addCourse(classCode: string, courseData: any) {
        const exists = this.courseList.some(course => course.courseCode === courseData.courseCode)
        if (exists) {
            message.warning('该课程已在列表中')
            return
        }

        const newCourse: ICourseScheduleRes = {
            courseCode: courseData.courseCode,
            name: courseData.name,
            coverUrl: courseData.coverUrl,
            totalHours: courseData.totalHours,
            majorName: courseData.majorName,
            majorNum: courseData.majorNum,
            majorCode: courseData.majorCode,
            trainLevel: courseData.trainLevel,
            trainLevelNum: courseData.trainLevelNum,
            trainLevelCode: courseData.trainLevelCode,
            code: '',
            classCode: classCode,
            teacherUserCode: undefined,
            teacherCode: undefined,
            semester: undefined,
            academicYear: undefined,
            academicYearType: undefined,
        }

        runInAction(() => {
            this.courseList = [...this.courseList, newCourse]
        })

        // 添加课程后重新获取课程选项（排除已选课程）
        this.fetchCourseOptions()
    }

    /**
     * 删除课程
     */
    deleteCourse(courseCode: string) {
        runInAction(() => {
            this.courseList = this.courseList.filter(item => item.courseCode !== courseCode)
        })

        // 删除课程后重新获取课程选项（更新可选列表）
        this.fetchCourseOptions()
    }

    /**
     * 获取可选课程列表
     */
    async fetchCourseOptions(searchValue?: string) {
        if (!this.classInfo) return

        try {
            runInAction(() => {
                this.courseSearchLoading = true
            })

            const res: any = await getCourseList({
                name: searchValue || '',
                status: 2,
                pageNo: 1,
                pageSize: 20,
            })

            const selectedCourseCodes = this.courseList.map(course => course.courseCode)

            const filteredData =
                res.data?.filter((item: any) => !selectedCourseCodes.includes(item.code)) || []

            const formattedOptions = filteredData.map((item: any) => ({
                ...item,
                label: item.name,
                value: item.code,
                courseCode: item.code,
            }))

            runInAction(() => {
                this.courseOptions = formattedOptions
            })
        } catch (error) {
            console.error('搜索课程失败:', error)
            runInAction(() => {
                this.courseOptions = []
            })
        } finally {
            runInAction(() => {
                this.courseSearchLoading = false
            })
        }
    }

    /**
     * 搜索教师
     */
    async searchTeachers(searchValue?: string) {
        try {
            runInAction(() => {
                this.teacherSearchLoading = true
            })

            const response = await http<any, any>('/wil/teacher/page', 'post', {
                pageNo: 1,
                pageSize: 20,
                name: searchValue || '',
            })

            const teachers =
                response.data?.map((item: any) => ({
                    code: item.code,
                    userCode: item.userCode,
                    name: item.name,
                    mobile: item.mobile,
                })) || []

            runInAction(() => {
                this.teacherOptions = teachers
            })
        } catch (error) {
            console.error('搜索教师失败:', error)
            runInAction(() => {
                this.teacherOptions = []
            })
        } finally {
            runInAction(() => {
                this.teacherSearchLoading = false
            })
        }
    }

    /**
     * 保存排课信息
     */
    async saveCourseSchedule(classCode: string) {
        const invalidCourses = this.courseList.filter(
            course =>
                !course.teacherUserCode ||
                !course.teacherCode ||
                !course.semester ||
                !course.academicYear ||
                !course.academicYearType,
        )

        if (invalidCourses.length > 0) {
            message.error('请完善所有课程的授课教师和学期信息')
            return false
        }

        try {
            runInAction(() => {
                this.saveLoading = true
            })

            const scheduleList: ICourseScheduleDto[] = this.courseList.map(course => ({
                code: course.code,
                classCode: classCode,
                courseCode: course.courseCode,
                teacherUserCode: course.teacherUserCode!,
                teacherCode: course.teacherCode!,
                semester: course.semester!,
                academicYear: course.academicYear!,
                academicYearType: course.academicYearType!,
            }))

            await batchSaveCourseSchedule(scheduleList)
            message.success('保存成功')
            return true
        } finally {
            runInAction(() => {
                this.saveLoading = false
            })
        }
    }

    /**
     * 重置选择状态
     */
    resetSelectValue() {
        runInAction(() => {
            this.selectValue = null
        })
    }

    /**
     * 清理数据
     */
    reset() {
        runInAction(() => {
            this.classInfo = null
            this.loading = false
            this.tableLoading = false
            this.saveLoading = false
            this.courseList = []
            this.courseOptions = []
            this.courseSearchLoading = false
            this.selectValue = null
            this.semesterOptions = []
            this.teacherOptions = []
            this.teacherSearchLoading = false
        })
    }
}

export default Store
