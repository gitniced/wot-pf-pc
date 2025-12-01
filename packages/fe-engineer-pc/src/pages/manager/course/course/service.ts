import api from './api'
import http from '@/servers/http'
import type {
    ICoursePageQuery,
    ICourse,
    IUpdateCourseTemplateStatusRequest,
    IUpdateCourseQualityStatusRequest,
    ICourseNumResponse,
} from './types'
import type { IPagination } from '@/types/http'

/**
 * 获取课程列表
 */
export const getCourseList = (body: ICoursePageQuery) => {
    return http<any, IPagination<ICourse>>(api.getCourseList, 'post', body)
}

/**
 * 更新课程模板状态
 */
export const updateCourseTemplateStatus = (params: IUpdateCourseTemplateStatusRequest) => {
    return http<any, { success: boolean }>(
        api.updateCourseTemplateStatus,
        'post',
        {},
        {
            query: { code: params.code, templateStatus: params.templateStatus },
        },
    )
}

/**
 * 更新课程优质状态
 */
export const updateCourseQualityStatus = (params: IUpdateCourseQualityStatusRequest) => {
    return http<any, { success: boolean }>(
        api.updateCourseQualityStatus,
        'post',
        {},
        {
            query: { code: params.code, qualityStatus: params.qualityStatus },
        },
    )
}

/**
 * 获取课程数量统计
 */
export const getCourseNum = () => {
    return http<any, ICourseNumResponse>(api.getCourseNum, 'post', {})
}
