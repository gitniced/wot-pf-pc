import http from '@/servers/http'
import api from './api'
import type { ClassScoreTableDto } from './types'
import type { IClass } from '../../class/types'

export const getClassScoreTable = (params: { scheduleCode: string }) => {
    return http<any, ClassScoreTableDto>(api.getClassScoreTable, 'get', {}, { query: params })
}

/**
 * 查询班级详情（根据排课编号）
 */
export const getClassDetailByScheduleCode = (scheduleCode: string) => {
    return http<any, IClass>(
        api.getClassDetail,
        'post',
        {},
        {
            query: { scheduleCode },
        },
    )
}
