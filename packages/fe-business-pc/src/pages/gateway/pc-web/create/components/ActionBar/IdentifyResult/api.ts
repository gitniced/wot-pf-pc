// 获取分类枚举
import Http from '@/servers/http'
import type { PlanListByIdsReq } from './interface'

// 根据planIds获取计划信息
export const getPlanListByIds = (params: PlanListByIdsReq) => {
    return Http('/exam_main/plan/componentPlans', 'POST', params)
}
