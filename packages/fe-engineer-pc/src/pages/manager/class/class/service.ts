import api from './api'
import http from '@/servers/http'
import type { IClassPageQuery, IClass, ISaveClassRequest } from './types'
import type { IPagination } from '@/types/http'

/**
 * 获取班级列表
 */
export const getClassList = (body: IClassPageQuery) => {
    return http<any, IPagination<IClass>>(api.getClassList, 'post', body)
}

/**
 * 保存班级信息（新增或更新）
 */
export const saveClass = (body: ISaveClassRequest) => {
    return http<any, { success: boolean }>(api.saveClass, 'post', body)
}

/**
 * 删除班级
 */
export const deleteClass = (code: string) => {
    return http<any, { success: boolean }>(
        api.deleteClass,
        'post',
        {},
        {
            query: { code },
        },
    )
}

/**
 * 查询班级详情
 */
export const getClassDetail = (code: string) => {
    return http<any, IClass>(
        api.getClassDetail,
        'post',
        {},
        {
            query: { code },
        },
    )
}
