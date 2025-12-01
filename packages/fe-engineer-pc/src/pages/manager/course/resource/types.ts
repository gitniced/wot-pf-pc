// 从本地 const 文件导入资源相关枚举
export { RESOURCE_TYPE, RESOURCE_FORMAT, RESOURCE_VISIBILITY } from './const'

/**
 * 资源基础信息 - 根据API文档定义
 */
export interface IResource {
    /**
     * 资源编码
     */
    code: string
    /**
     * 资源名称
     */
    name: string
    /**
     * 资源格式
     */
    format: string
    /**
     * 资源类型 (1公共 2个人)
     */
    type: number
    /**
     * 关联课程数量
     */
    courseCount: number
    /**
     * 专业编码
     */
    majorCode: string
    /**
     * 专业名称
     */
    majorName: string
    /**
     * 创建时间
     */
    createdAt: string
    /**
     * 创建人
     */
    createdBy: string
    /**
     * 创建人名称
     */
    createdByName: string
    /**
     * 更新时间
     */
    updatedAt: string
    /**
     * 更新人
     */
    updatedBy: string
    /**
     * 更新人名称
     */
    updatedByName: string
}

/**
 * 资源分页查询参数 - 根据API文档定义
 */
export interface IResourcePageQuery {
    /**
     * 页码，从1开始数，默认是1
     */
    pageNo?: number
    /**
     * 单页显示数量，默认是10
     */
    pageSize?: number
    /**
     * 排序字段
     */
    orderBy?: string
    /**
     * 升降序规则,ASC或DESC
     */
    order?: string
    /**
     * 专业编码
     */
    majorCode?: string
    /**
     * 资源名称搜索
     */
    name?: string
    /**
     * 资源类型 (1公共 2个人)
     */
    type?: number
    /**
     * 资源格式
     */
    format?: string
}

/**
 * 资源表格项数据
 */
export type IResourceTableItem = IResource
