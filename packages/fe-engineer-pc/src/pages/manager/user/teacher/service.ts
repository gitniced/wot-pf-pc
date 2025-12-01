import api from './api'
import http from '@/servers/http'
import type {
    ITeacherPageQuery,
    ITeacher,
    ISaveTeacherRequest,
    IUpdateTeacherStatusRequest,
    ITeacherImportRequest,
} from './types'
import type { IPagination } from '@/types/http'

/**
 * 获取教师列表
 */
export const getTeacherList = (body: ITeacherPageQuery) => {
    return http<any, IPagination<ITeacher>>(api.getTeacherList, 'post', body)
}

/**
 * 保存教师信息（新增或更新）
 */
export const saveTeacher = (body: ISaveTeacherRequest) => {
    return http<any, boolean>(api.saveTeacher, 'post', body)
}

/**
 * 删除教师
 */
export const deleteTeacher = (code: string) => {
    return http<any, boolean>(
        api.deleteTeacher,
        'post',
        {},
        {
            query: { code },
        },
    )
}

/**
 * 更新教师状态
 */
export const updateTeacherStatus = (params: IUpdateTeacherStatusRequest) => {
    return http<any, boolean>(
        api.updateTeacherStatus,
        'post',
        {},
        {
            query: { code: params.code, status: params.status },
        },
    )
}

/**
 * 检查教师状态和获取教师信息
 */
export const checkAndGetTeacher = (userCode?: string) => {
    return http<any, ITeacher>(
        api.checkAndGetTeacher,
        'post',
        {},
        {
            query: { userCode },
        },
    )
}

/**
 * Excel批量导入教师
 */
export const importTeacherExcel = (importData: ITeacherImportRequest) => {
    return http<ITeacherImportRequest, string>(api.importTeacherExcel, 'post', importData)
}
