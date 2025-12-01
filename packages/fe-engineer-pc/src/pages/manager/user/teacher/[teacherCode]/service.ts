import api from './api'
import http from '@/servers/http'
import type { ITeacherScheduleQuery, ITeacherSchedule } from './types'
import type { IPagination } from '@/types/http'

/**
 * 获取教师授课情况列表
 */
export const getTeacherScheduleList = (body: ITeacherScheduleQuery) => {
    return http<any, IPagination<ITeacherSchedule>>(api.getTeacherSchedule, 'post', body)
}
