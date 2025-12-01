import http from '@/servers/http'
import api from './api'
import type { StudentStatisticsRespDto } from './types'

export const getStudentCourses = async (studentCode: string) => {
    const res = await http<any, StudentStatisticsRespDto>(
        `${api.getStudentCourses}/${studentCode}`,
        'post',
        {},
    )
    return res
}
