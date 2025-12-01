import Http from '@/servers/http'
import type { PlanListReq, PlanTypeListReq } from './interface'

// 获取计划分类枚举
export const getPlanTypeCategory = () => {
    return Http('/exam_main/category/getPlanTypeCategory', 'GET', {})
}

//获取计划列表
export const getPlanListApi = (params: PlanListReq) => {
    return Http('/exam_main/plan/componentPlanList', 'POST', params)
}

// 获取评价计划分类列表
export const getPlanTypeListApi = (params: PlanTypeListReq) => {
    return Http('/exam_main/plan/componentPlanTypePlan', 'POST', params)
}
