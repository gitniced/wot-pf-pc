import type { EVENT_KIND, SOURCE_TYPE } from '@/types'
import type { Moment } from 'moment'

export interface FieldConfig {
    closeType: number // 是否可关闭
    editType: number // 是否可调整
    openType: number // 是否默认开启
    requiredType: number // 是否必填
    fieldType: number // 字段（分类）类型
    fieldTypeDesc: number // 字段（分类）描述
    id: number // 字段ID
    name: string // 字段名称
    alias: string //别名
}

export interface IRouteQuery {
    careerCode?: string
    organizationCode?: string
    activityCode?: string
    applyChannel: string
    type: string
    record?: string
}

export interface ActivityData {
    name: string // 活动名称
    organizationName: string // 机构名称
    activityStart: number // 活动开始时间
    activityEnd: number // 活动结束时间
    applyStartTime: number // 报名开始时间
    applyEndTime: number // 报名结束时间
    appliedNum: number // 已报名人数
    quota: number // 最大报名人数
    price: number // 报名费用
    payEndTime: number //缴费截止时间
    address?: string
    type: EVENT_KIND
    sourceType: SOURCE_TYPE
    contract: string
}

// 分类
export interface CategoryItem {
    careerId: string
    categoryId: string
    categoryName: string
    code: string
    levelRelationId: string
    workId: string
}

export interface CommonEnumItem {
    name: string
    key: string
    id: string
}

export interface SubmitFormParams {
    type: number
    activityCode: string // 活动code
    organizationCode: string // 机构code
    applyChannel: number
    categoryDtoList: CategoryItem[]
    fieldDtoList: FieldConfig[]
}

export interface CollegeTypeItem {
    collegeType: string
    id: number
    sid: number
    sidName: string
}

export interface CityItem {
    code: string
    level?: number
    name: string
    parentCode?: string
}

type FormValue = number | string | Moment | CityItem[]
