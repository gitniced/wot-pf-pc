// 从本地 const 文件导入枚举
export { COLLEGE_STATUS, ORDER_RULE } from './const'

/**
 * 学院基础信息
 */
export interface ICollegeBaseInfo {
    /**
     * 学院编码
     */
    code: string
    /**
     * 学院名称
     */
    name: string
    /**
     * 排序值
     */
    sortOrder: number
    /**
     * 状态：0-禁用，1-启用
     */
    status: number
}

/**
 * 学院详细信息
 */
export interface ICollege extends ICollegeBaseInfo {
    /**
     * 学院序号ID
     */
    sid?: number
    /**
     * 组织编码
     */
    organizationCode?: string
    /**
     * 创建时间
     */
    createTime?: string
    /**
     * 更新时间
     */
    updateTime?: string
}

/**
 * 学院分页查询参数
 */
export interface ICollegePageQuery {
    /**
     * 学院名称（支持模糊查询）
     */
    name?: string
    /**
     * 状态筛选：0-禁用，1-启用
     */
    status?: number
    /**
     * 排序字段
     */
    orderBy?: string
    /**
     * 升降序规则
     */
    order?: ORDER_RULE
    /**
     * 页码，从1开始数，默认是1
     */
    pageNo?: number
    /**
     * 单页显示数量，默认是10
     */
    pageSize?: number
}

/**
 * 保存学院请求参数
 */
export interface ISaveCollegeRequest {
    /**
     * 学院序号ID（更新时必传）
     */
    sid?: number
    /**
     * 学院编码（更新时必传）
     */
    code?: string
    /**
     * 学院名称
     */
    name: string
    /**
     * 排序值
     */
    sortOrder?: number
    /**
     * 状态：0-禁用，1-启用
     */
    status?: number
}

/**
 * 更新学院状态请求参数
 */
export interface IUpdateCollegeStatusRequest {
    /**
     * 学院编码
     */
    code: string
    /**
     * 状态：0-禁用，1-启用
     */
    status: number
}

/**
 * 更新学院排序请求参数
 */
export interface IUpdateCollegeSortRequest {
    /**
     * 学院编码
     */
    code: string
    /**
     * 排序值
     */
    sortOrder: number
}

/**
 * 学院简单信息
 */
export interface ICollegeSimple {
    /**
     * 学院编码
     */
    code: string
    /**
     * 学院名称
     */
    name: string
}

/**
 * 学院表格项数据
 */
export type ICollegeTableItem = Pick<ICollege, 'code' | 'name' | 'sortOrder' | 'status'>
