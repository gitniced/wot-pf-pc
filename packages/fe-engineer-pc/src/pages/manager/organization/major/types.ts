import type { ORDER_RULE } from './const'

// 从本地 const 文件导入枚举
export { MAJOR_STATUS, ORDER_RULE } from './const'

/**
 * 专业基础信息
 */
export interface IMajorBaseInfo {
    /**
     * 专业编码
     */
    code: string
    /**
     * 专业名称
     */
    name: string
    /**
     * 专业代码
     */
    majorNum: string
    /**
     * 所属学院编码
     */
    collegeCode: string
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
 * 专业详细信息
 */
export interface IMajor extends IMajorBaseInfo {
    /**
     * 专业序号ID
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
    /**
     * 是否存在培养层级
     */
    existTrainLevel?: boolean
}

/**
 * 专业分页查询参数
 */
export interface IMajorPageQuery {
    /**
     * 专业名称（支持模糊查询）
     */
    name?: string
    /**
     * 专业代码
     */
    majorNum?: string
    /**
     * 所属学院编码
     */
    collegeCode?: string
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
 * 保存专业请求参数
 */
export interface ISaveMajorRequest {
    /**
     * 专业序号ID（更新时必传）
     */
    sid?: number
    /**
     * 专业编码（更新时必传）
     */
    code?: string
    /**
     * 专业名称
     */
    name: string
    /**
     * 专业代码
     */
    majorNum: string
    /**
     * 所属学院编码
     */
    collegeCode: string
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
 * 更新专业状态请求参数
 */
export interface IUpdateMajorStatusRequest {
    /**
     * 专业编码
     */
    code: string
    /**
     * 状态：0-禁用，1-启用
     */
    status: number
}

/**
 * 更新专业排序请求参数
 */
export interface IUpdateMajorSortRequest {
    /**
     * 专业编码
     */
    code: string
    /**
     * 排序值
     */
    sortOrder: number
}

/**
 * 专业简单信息
 */
export interface IMajorSimple {
    /**
     * 专业编码
     */
    code: string
    /**
     * 专业名称
     */
    name: string
    /**
     * 专业代码
     */
    majorNum: string
}

/**
 * 专业选择信息
 */
export interface IMajorSelect {
    /**
     * 专业编码
     */
    code: string
    /**
     * 专业名称
     */
    name: string
}

/**
 * 专业表格项数据
 */
export type IMajorTableItem = Pick<
    IMajor,
    'code' | 'name' | 'majorNum' | 'collegeCode' | 'sortOrder' | 'status'
>

// 培养层级和学制起点枚举也从 const 文件导入
export { TRAIN_LEVEL, START_POINT } from './const'

/**
 * 培养层级学制信息
 */
export interface ITrainLevelEdu {
    /**
     * 专业培养层级学制唯一编码（更新时使用）
     */
    code?: string
    /**
     * 学制起点：10-初中起点，20-高中起点
     */
    startPoint: number
    /**
     * 学制长度（年）
     */
    eduLen: number
}

/**
 * 培养层级信息
 */
export interface ITrainLevel {
    /**
     * 专业培养层级唯一编码
     */
    code?: string
    /**
     * 所属学院编码
     */
    collegeCode: string
    /**
     * 所属专业编码
     */
    majorCode: string
    /**
     * 培养层级：10-中级技能，20-高级技能，30-预备技师
     */
    level: number
    /**
     * 专业培养层级代码
     */
    levelNum?: string
    /**
     * 学制列表
     */
    eduList: ITrainLevelEdu[]
}

/**
 * 保存培养层级请求参数
 */
export interface ISaveTrainLevelRequest extends ITrainLevel {
    /**
     * 培养层级编码（编辑时需要）
     */
    code?: string
}

/**
 * 培养层级响应数据
 */
export interface ITrainLevelResponse {
    /**
     * 专业培养层级唯一编码
     */
    code: string
    /**
     * 序号ID
     */
    sid: number
    /**
     * 组织编码
     */
    organizationCode: string
    /**
     * 所属专业编码
     */
    majorCode: string
    /**
     * 培养层级
     */
    level: number
    /**
     * 专业培养层级代码
     */
    levelNum: string
    /**
     * 学制列表
     */
    eduList: {
        /**
         * 学制编码
         */
        code: string
        /**
         * 学制起点
         */
        startPoint: number
        /**
         * 学制长度
         */
        eduLen: number
    }[]
}
