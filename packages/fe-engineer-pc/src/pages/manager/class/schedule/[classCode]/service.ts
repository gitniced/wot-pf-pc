import api from './api'
import http from '@/servers/http'
import type {
    ICourseScheduleQuery,
    ICourseScheduleRes,
    ISemesterInfo,
    ICourseScheduleDto,
    ITeacherScheduleQuery,
    ITeacherScheduleRes,
} from './types'
import type { IPagination } from '@/types/http'

/**
 * 查询课程列表（排课管理用）
 */
export const getCourseSchedulePage = (params: ICourseScheduleQuery) => {
    return http<any, IPagination<ICourseScheduleRes>>(api.getCourseSchedulePage, 'post', params)
}

/**
 * 获取学期列表
 */
export const getSemesters = (enrollYear: number, eduLen: number) => {
    return http<any, ISemesterInfo[]>(
        api.getSemesters,
        'get',
        {},
        {
            query: { enrollYear, eduLen },
        },
    )
}

/**
 * 批量添加或修改排课
 */
export const batchSaveCourseSchedule = (scheduleList: ICourseScheduleDto[]) => {
    return http<any, { success: boolean }>(api.batchSaveCourseSchedule, 'post', scheduleList)
}

/**
 * 分页查询讲师授课情况
 */
export const getTeacherSchedule = (params: ITeacherScheduleQuery) => {
    return http<any, IPagination<ITeacherScheduleRes>>(api.getTeacherSchedule, 'post', params)
}
