import type { ORDER_RULE } from './const'

/**
 * 班级基础信息
 */
export interface IClassBaseInfo {
    /**
     * 班级编码
     */
    code: string
    /**
     * 班级名称
     */
    name: string
    /**
     * 所属专业编码
     */
    majorCode: string
    /**
     * 专业培养层级唯一编码
     */
    trainLevelCode: string
    /**
     * 专业培养层级学制唯一编码
     */
    trainLevelEduCode: string
    /**
     * 入学年份
     */
    enrollYear: number
}

/**
 * 班级详细信息
 */
export interface IClass extends IClassBaseInfo {
    /**
     * 站点ID
     */
    sid?: number
    /**
     * 所属院校编码
     */
    organizationCode?: string
    /**
     * 专业名称
     */
    majorName?: string
    /**
     * 专业代码
     */
    majorNum?: string
    /**
     * 培养层级
     */
    trainLevel?: number
    /**
     * 专业培养层级代码
     */
    trainLevelNum?: string
    /**
     * 学制起点
     */
    startPoint?: number
    /**
     * 学制长度
     */
    eduLen?: number
    /**
     * 毕业年份
     */
    graduateYear?: number
    /**
     * 学生数
     */
    studentCount?: number
    /**
     * 课程数
     */
    courseCount?: number
    /**
     * 状态: 0-未开学, 1-进行中, 2-已毕业
     */
    status?: number
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
 * 班级分页查询参数
 */
export interface IClassPageQuery {
    /**
     * 班级名称
     */
    name?: string
    /**
     * 所属专业编码
     */
    majorCode?: string
    /**
     * 专业培养层级唯一编码
     */
    trainLevelCode?: string
    /**
     * 所属学院编码
     */
    collegeCode?: string
    /**
     * 入学年份
     */
    enrollYear?: number
    /**
     * 毕业年份
     */
    graduateYear?: number
    /**
     * 状态: 0-未开学, 1-进行中, 2-已毕业
     */
    status?: number
    /**
     * 是否包含统计信息
     */
    hasStatistics?: boolean
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
 * 保存班级请求参数
 */
export interface ISaveClassRequest {
    /**
     * 班级编码（更新时必传）
     */
    code?: string
    /**
     * 班级名称
     */
    name: string
    /**
     * 所属专业编码
     */
    majorCode: string
    /**
     * 专业培养层级唯一编码
     */
    trainLevelCode: string
    /**
     * 专业培养层级学制唯一编码
     */
    trainLevelEduCode: string
    /**
     * 入学年份
     */
    enrollYear: number
}

/**
 * 班级表格项数据
 */
export type IClassTableItem = Pick<
    IClass,
    | 'code'
    | 'name'
    | 'majorName'
    | 'majorNum'
    | 'trainLevel'
    | 'trainLevelNum'
    | 'startPoint'
    | 'eduLen'
    | 'enrollYear'
    | 'graduateYear'
    | 'studentCount'
    | 'courseCount'
    | 'status'
>
