import api from './api'
import http from '@/servers/http'

import type {
    ICourseScheduleQuery,
    ICourseScheduleRes,
} from '@/pages/manager/class/schedule/[classCode]/types'
import type { IPagination } from '@/types/http'
import type { IClassStudentRes, IStudentQueryDto } from './types'

/**
 * 获取班级学生列表
 */
export const getClassStudents = (body: IStudentQueryDto) => {
    return http<any, IPagination<IClassStudentRes>>(api.getClassStudentList, 'post', body)
}

/**
 * 获取班级课程列表（已排课的课程）
 */
export const getClassCourses = (body: ICourseScheduleQuery) => {
    return http<any, IPagination<ICourseScheduleRes>>(api.getClassCourseSchedule, 'post', body)
}
