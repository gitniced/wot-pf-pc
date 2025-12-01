import api from './api'
import http from '@/servers/http'
import type {
    IStudentPageQuery,
    IStudent,
    ISaveStudentRequest,
    IUpdateStudentStatusRequest,
    IStudentUser,
    IStudentImportRequest,
} from './types'
import type { IPagination } from '@/types/http'

/**
 * 获取学生列表
 */
export const getStudentList = (body: IStudentPageQuery) => {
    return http<any, IPagination<IStudent>>(api.getStudentList, 'post', body)
}

/**
 * 保存学生信息（新增或更新）
 */
export const saveStudent = (body: ISaveStudentRequest) => {
    return http<any, boolean>(api.saveStudent, 'post', body)
}

/**
 * 删除学生
 */
export const deleteStudent = (code: string) => {
    return http<any, boolean>(
        api.deleteStudent,
        'post',
        {},
        {
            query: { code },
        },
    )
}

/**
 * 更新学生状态
 */
export const updateStudentStatus = (params: IUpdateStudentStatusRequest) => {
    return http<any, boolean>(
        api.updateStudentStatus,
        'post',
        {},
        {
            query: { code: params.code, status: params.status },
        },
    )
}

/**
 * 根据学生编号获取学生信息
 */
export const getStudentByCode = (studentCode: string) => {
    return http<any, IStudentUser>(
        api.getStudentByCode,
        'get',
        {},
        {
            query: { studentCode },
        },
    )
}

/**
 * 检查学生状态和获取学生信息
 */
export const checkAndGetStudent = (body: any) => {
    return http<any, any>(api.checkAndGetStudent, 'post', body)
}

/**
 * Excel批量导入学生
 */
export const importStudentExcel = (importData: IStudentImportRequest) => {
    return http<any, string>(api.importStudentExcel, 'post', importData)
}
