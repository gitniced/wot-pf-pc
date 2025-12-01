import api from './api'
import http from '@/servers/http'
import type { IResourcePageQuery, IResource } from './types'
import type { IPagination } from '@/types/http'

/**
 * 获取资源列表
 */
export const getResourceList = (body: IResourcePageQuery) => {
    return http<any, IPagination<IResource>>(api.getResourceList, 'post', body)
}

/**
 * 获取资源详情
 */
export const getResourceDetail = (code: string) => {
    return http<any, { data: IResource }>(
        api.getResourceDetail,
        'post',
        {},
        {
            query: { code },
        },
    )
}
