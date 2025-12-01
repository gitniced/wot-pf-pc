import Http from '@/servers/http'
import type { KnowledgeListParams } from './components/interface'

// 获取知识点列表
export const getKnowledgeList = (params: KnowledgeListParams) => {
    return Http('/question/front/knowledge/list', 'POST', params)
}
