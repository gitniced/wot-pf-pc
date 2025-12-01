import api from './api'
import http from '@/servers/http'
import type {
    ICollegePageQuery,
    ICollege,
    ISaveCollegeRequest,
    IUpdateCollegeStatusRequest,
    IUpdateCollegeSortRequest,
    ICollegeSimple,
} from './types'
import type { IPagination } from '@/types/http'

/**
 * 获取学院列表
 */
export const getCollegeList = (body: ICollegePageQuery) => {
    return http<any, IPagination<ICollege>>(api.getCollegeList, 'post', body)
}

/**
 * 保存学院信息（新增或更新）
 */
export const saveCollege = (body: ISaveCollegeRequest) => {
    return http<any, { success: boolean }>(api.saveCollege, 'post', body)
}

/**
 * 删除学院
 */
export const deleteCollege = (code: string) => {
    return http<any, { success: boolean }>(
        api.deleteCollege,
        'post',
        {},
        {
            query: { code },
        },
    )
}

/**
 * 更新学院状态
 */
export const updateCollegeStatus = (params: IUpdateCollegeStatusRequest) => {
    return http<any, { success: boolean }>(
        api.updateCollegeStatus,
        'post',
        {},
        {
            query: { code: params.code, status: params.status },
        },
    )
}

/**
 * 更新学院排序
 */
export const updateCollegeSort = (params: IUpdateCollegeSortRequest) => {
    return http<any, { success: boolean }>(
        api.updateCollegeSort,
        'post',
        {},
        {
            query: { code: params.code, sortOrder: params.sortOrder },
        },
    )
}

/**
 * 获取学院编码列表
 */
export const getCollegeCodeList = () => {
    return http<any, ICollegeSimple[]>(api.getCollegeCodeList, 'post', {})
}
