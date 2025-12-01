import type { RESOURCE_FORMAT } from '../resource/const'
import api from './api'
import http from '@/servers/http'

export const createWebFileCode = (
    data: { format: RESOURCE_FORMAT; organizationCode: string },
    userCode?: string,
) => {
    return http<any, string>(api.createWebFileCode, 'post', data, {
        query: {
            userCode,
        },
    })
}
