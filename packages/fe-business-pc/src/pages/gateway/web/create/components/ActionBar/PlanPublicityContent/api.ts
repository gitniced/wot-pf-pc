import http from '@/servers/http'
import type { GetPlanDataParams } from './interface'

// 获取计划数据（搜索）
export const getPlanDataList = (params: GetPlanDataParams) => {
    return http('/exam_main/plan/componentPlanList', 'POST', params)
}

// 获取计划数据分类（搜索）
export const getPlayTypeListData = (params: GetPlanDataParams) => {
    return http('/exam_main/plan/componentPlanTypePlan', 'POST', params)
}

// 获取计划数据分类(枚举)
export const getPlanTypeCategoryList = () => {
    return http('/exam_main/category/getPlanTypeCategory', 'GET', {})
}
