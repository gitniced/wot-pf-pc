import type { ModalProps } from 'antd'

interface CategoryItem {
    code: string // 分类Code
    name: string // 分类名称
    planCount: number // 计划数量
}

export interface CategoryTypeItem {
    key: number
    name: string
}

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

export interface PlanCardProps {
    data: PlanListItem
    allowDelete?: boolean // 是否允许删除
    onDelete?: () => void
}

export interface SelectCategoryProps {
    value?: PlanTypeCategory // 分类
    onChange?: (selectedCategory: PlanTypeListItem) => void
}

export interface CategoryModalProps extends Omit<ModalProps, 'onCancel' | 'onOk'> {
    selectedCategory?: PlanTypeCategory
    onOk: (selectedCategory: PlanTypeListItem) => void
    onCancel: () => void
}

export interface PlanListModalProps extends Omit<ModalProps, 'onCancel' | 'onOk'> {
    type?: 'checkbox' | 'radio'
    selectedPlans?: PlanListItem[]
    onOk: (planList: PlanListItem[]) => void // 所选择的评价计划codes
    onCancel: () => void
}

// 评价计划请求参数
export interface PlanListReq {
    currentPage: number // 页码
    orgCode: number // 机构code
    pageSize: number // 分页大小
    planName?: string // 计划名称
    planType?: number // 分类
    type?: 'plan_formula' | 'identification_result' // 平台计划类型
}

export interface PlanTypeListReq {
    currentPage: number // 页码
    orgCode: number // 机构code
    pageSize: number // 分页大小
    type?: 'plan_formula' | 'identification_result' // 平台计划类型
}
