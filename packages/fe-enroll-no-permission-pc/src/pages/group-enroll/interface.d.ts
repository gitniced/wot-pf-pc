import type { SOURCE_TYPE } from '@/types'
import type { Moment } from 'moment'
import type { IRoute } from 'umi'

export interface FileUpload {
    file: File
    type: number
    isPrivate: boolean
}

export interface GroupEnrollQuery extends IRoute {
    activityCode: string
    record?: string
}

/**导入用户 */
export interface ImportUser {
    code: string
    name: string
    status: number
}

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
    customField: boolean // 是否自定义字段
    customContent: any[] // 自定义字段内容
    options: string[] // 自定义字段选项
    extra: string // 自定义字段额外信息
}

export interface IRouteQuery {
    careerCode?: string
    organizationCode?: string
    activityCode?: string
    applyChannel: string
    type: string
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
    type: any
    sourceType: SOURCE_TYPE
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

/**
 * UpdateApplyBatchImportRecordReqDto
 */
export interface updateImportRecordRequest {
    /**
     * 编码
     */
    code: null | string
    /**
     * 报名信息 含批量导入过程中前后端处理用的字段
     */
    fieldJson: Record<string, any>
    [property: string]: any
}

export interface ExportUserItem {
    name: string
    code: string
    isError: boolean
}

/**
 * 响应数据
 *
 * ApplyBatchImportRecordResDto
 */
export interface ApplyBatchImportRecordResDto {
    /**
     * 编码
     */
    code?: null | string
    /**
     * 报名信息 含批量导入过程中前后端处理用的字段
     */
    fieldJson?: string
    /**
     * 导入code
     */
    importCode?: null | string
    /**
     * 组织编码
     */
    organizationCode?: null | string
    /**
     * 临时状态 0有错误待修改 1无错误可提交 2已提交
     */
    status?: number | null
    /**
     * 报名方姓名
     */
    userName?: null | string
    [property: string]: any
}
