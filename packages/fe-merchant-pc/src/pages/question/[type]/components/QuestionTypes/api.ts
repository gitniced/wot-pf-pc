import type { KnowledgeParams } from "./interface"
import http from '@/servers/http'

// 获取试题分类下拉列表
export const getKnowledgeListApi = (params: KnowledgeParams) => {
    return http('/question/front/knowledge/list', 'POST', params)
}