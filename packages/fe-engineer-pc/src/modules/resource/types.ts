import type { RESOURCE_FORMAT, RESOURCE_TYPE } from './const'

/**
 * 资源库分页查询
 */
export interface IGetResourceListBody {
    /**
     * 格式
     */
    format?: RESOURCE_FORMAT
    /**
     * 专业code
     */
    majorCode: string
    /**
     * 资源名字搜索
     */
    name?: string
    /**
     * 升降序规则,ASC或DESC
     */
    order?: string
    /**
     * 排序字段
     */
    orderBy?: string
    /**
     * 机构code
     */
    // organizationCode: string
    /**
     * 页码，从1开始数，默认是1
     */
    pageNo?: number
    /**
     * 单页显示数量，默认是10
     */
    pageSize?: number
    /**
     * 类型
     */
    type?: RESOURCE_TYPE
}

/**
 * 资源
 */
export interface IResource {
    /**
     * code
     */
    code: string
    /**
     * 关联课程
     */
    courseCount: number
    /**
     * 格式
     */
    format: RESOURCE_FORMAT
    /**
     * 资源名字搜索
     */
    name: string
    /**
     * 类型
     */
    type: RESOURCE_TYPE
    /**
     * 是否可编辑
     */
    canEdit: 1 | 0
}

/**
 * 资源详情
 */
export interface IResourceDetail {
    /**
     * code
     */
    code: string
    /**
     * 内容
     */
    content?: string
    /**
     * 格式
     */
    format: RESOURCE_FORMAT
    /**
     * 资源名字
     */
    name: string
    /**
     * 类型
     */
    type: RESOURCE_TYPE
    /**
     * 专业code
     */
    majorCode: string
}

/**
 * 创建资源
 */
export interface ICreateResourceBody {
    /**
     * wps code
     */
    wpsCode?: string
    /**
     * 内容 url或指定的json格式
     */
    content?: string
    /**
     * 格式
     */
    format: RESOURCE_FORMAT
    /**
     * 专业code
     */
    majorCode: string
    /**
     * 资源名字
     */
    name: string
    /**
     * 类型
     */
    type: RESOURCE_TYPE
}

/**
 * 更新资源
 */
export interface IUpdateResourceBody {
    /**
     * 资源code
     */
    code: string
    /**
     * 内容 url或指定的json格式
     */
    content?: string
    /**
     * 格式
     */
    format: RESOURCE_FORMAT
    /**
     * 专业code
     */
    majorCode: string
    /**
     * 资源名字
     */
    name: string
    /**
     * 身份
     */
    identity?: number
    /**
     * 类型
     */
    type: RESOURCE_TYPE
}

/**
 * 重命名资源
 */
export interface IRenameResourceBody {
    /**
     * 资源code
     */
    code: string
    /**
     * 资源名字
     */
    name: string
}

export interface IStatResourceCountByMajorBody {
    organizationCode: string
}

export interface IStatResourceCountByMajor {
    /**
     * 公共资源统计
     */
    commonCount?: number
    /**
     * 专业code
     */
    majorCode?: string
    /**
     * 专业名
     */
    majorName?: string
    /**
     * 个人资源统计
     */
    personalCount?: number
}
