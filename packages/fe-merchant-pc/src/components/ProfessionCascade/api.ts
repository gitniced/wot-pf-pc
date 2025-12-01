import http from '@/servers/http'

import type { JobParams } from './interface'

// 获取职业工种等级下拉数据
export const getCommonJobListApi = (params: JobParams) => {
    return http('/question/front/job/page', 'POST', params)
}

export const authenticatePage = '/question/front/authenticate/page'