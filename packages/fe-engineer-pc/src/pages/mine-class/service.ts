import api from './api'
import http from '@/servers/http'
import type { ClassInfoByTeacherDto, TeacherCourseGroupDto, TeacherSemesterDto } from './types'
import type { IPagination } from '@/types/http'

export const getTeacherCourseList = (query: {
    teacherCode: string
    academicYear: number
    academicYearType: number
}) => {
    return http<any, TeacherCourseGroupDto[]>(api.getTeacherCourseList, 'get', null, {
        query: query,
    })
}

export const getTeacherClassList = (body: {
    /**
     * 年度
     */
    academicYear: number
    /**
     * 年度类型：1-上学期 2-下学期
     */
    academicYearType: number
    /**
     * 班级名称（支持模糊查询）
     */
    className?: string
    /**
     * 课程编码
     */
    courseCode: string
    /**
     * 升降序规则,ASC或DESC
     */
    order?: string
    /**
     * 排序字段
     */
    orderBy?: string
    /**
     * 页码，从1开始数，默认是1
     */
    pageNo?: number
    /**
     * 单页显示数量，默认是10
     */
    pageSize?: number
    /**
     * 教师编码
     */
    teacherCode: string
}) => {
    return http<any, IPagination<ClassInfoByTeacherDto>>(api.getTeacherClassList, 'post', body)
}

export const getTeacherSemesterList = (query: { teacherCode: string }) => {
    return http<any, TeacherSemesterDto[]>(api.getTeacherSemesterList, 'get', null, {
        query: query,
    })
}
