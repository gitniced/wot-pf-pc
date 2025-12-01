import http from '@/servers/http'
import api from './api'
import type { IMajor } from './types'

export const getMajorList = (organizationCode?: string) => {
    return http<unknown, IMajor[]>(api.getMajorList, 'post', {}, { query: { organizationCode } })
}
