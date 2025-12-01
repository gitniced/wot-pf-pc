// 评价类型枚举
export interface PlanTypeCategory {
    key: number
    name: string
}
export interface PlanListItem {
    appraise: { name: string } // 评价详情 { 计划名称 }
    appraiseId: number // 评价详情ID
    createTime: number // 创建时间
    id: number // 计划ID
    planName: string // 评价计划名称
    planType: number // 评价类型
    planTypeCategory: PlanTypeCategory
    publicityContent: string //公示内容
    type: string //区分计划公示和认定结果组件类型
}

export interface PlanTypeListItem {
    planIds: number[] // 计划ID集合
    planType?: number // 计划类型
    planTypeCategory: {
        // 评价类型枚举
        key: number
        name: string
    }
}

export interface PlanListByIdsReq {
    codes?: number[] // 计划Id列表
    limit?: number // 数据条数 添加方式为全部的时候，传4
    orgCode: number // 机构code
    type?: 'plan_formula' | 'identification_result' // 平台计划类型
    rule: string // 组件添加方式
}
