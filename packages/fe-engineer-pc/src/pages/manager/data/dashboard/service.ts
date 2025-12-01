import http from '@/servers/http'
import api from './api'
import type { StatisticsDashboard } from './types'

export const getDashboardData = async () => {
    const res = await http<any, StatisticsDashboard>(api.getStatisticsDashboard, 'post', {})
    return res
}
