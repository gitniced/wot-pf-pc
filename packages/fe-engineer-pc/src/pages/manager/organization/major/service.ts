import api from './api'
import http from '@/servers/http'
import type {
    IMajorPageQuery,
    IMajor,
    ISaveMajorRequest,
    IUpdateMajorStatusRequest,
    IUpdateMajorSortRequest,
    IMajorSimple,
    IMajorSelect,
    ISaveTrainLevelRequest,
    ITrainLevelResponse,
} from './types'
import type { IPagination } from '@/types/http'

/**
 * 获取专业列表
 */
export const getMajorList = (body: IMajorPageQuery) => {
    return http<any, IPagination<IMajor>>(api.getMajorList, 'post', body)
}

/**
 * 保存专业信息（新增或更新）
 */
export const saveMajor = (body: ISaveMajorRequest) => {
    return http<any, { success: boolean }>(api.saveMajor, 'post', body)
}

/**
 * 删除专业
 */
export const deleteMajor = (code: string) => {
    return http<any, { success: boolean }>(
        api.deleteMajor,
        'post',
        {},
        {
            query: { code },
        },
    )
}

/**
 * 更新专业状态
 */
export const updateMajorStatus = (params: IUpdateMajorStatusRequest) => {
    return http<any, { success: boolean }>(
        api.updateMajorStatus,
        'post',
        {},
        {
            query: { code: params.code, status: params.status },
        },
    )
}

/**
 * 更新专业排序
 */
export const updateMajorSort = (params: IUpdateMajorSortRequest) => {
    return http<any, { success: boolean }>(
        api.updateMajorSort,
        'post',
        {},
        {
            query: { code: params.code, sortOrder: params.sortOrder },
        },
    )
}

/**
 * 获取专业简单列表
 */
export const getMajorSimpleList = () => {
    return http<any, IMajorSimple[]>(api.getMajorSimpleList, 'post', {})
}

/**
 * 获取所有专业（选择列表）
 */
export const getAllMajors = () => {
    return http<any, IMajorSelect[]>(api.getMajorSimpleList, 'get', {})
}

/**
 * 保存培养层级信息
 */
export const saveTrainLevel = (body: ISaveTrainLevelRequest) => {
    return http<any, { success: boolean }>(api.saveTrainLevel, 'post', body)
}

/**
 * 删除培养层级
 */
export const deleteTrainLevel = (code: string) => {
    return http<any, { success: boolean }>(
        api.deleteTrainLevel,
        'post',
        {},
        {
            query: { code },
        },
    )
}

/**
 * 根据专业编码获取培养层级列表
 */
export const getTrainLevelsByMajor = (majorCode: string) => {
    return http<any, ITrainLevelResponse[]>(
        api.getTrainLevelsByMajor,
        'post',
        {},
        {
            query: { majorCode },
        },
    )
}
