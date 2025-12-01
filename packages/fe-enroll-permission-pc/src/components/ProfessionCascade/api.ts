import http from '@/servers/http'

import type { CommonJobParams } from './interface'

// 获取职业工种等级下拉数据
export const getCommonJobListApi = (params: CommonJobParams) => {
    return http('/admin/site_profession/base_page_list', 'POST', params)
}
