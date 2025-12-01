import type { ORDER_RULE } from './const'

// 从本地 const 文件导入枚举
export { COURSE_STATUS, ORDER_RULE } from './const'

/**
 * 课程教师信息
 */
export interface ICourseTeacher {
    /**
     * 教师编码
     */
    code: string
    /**
     * 教师姓名
     */
    name: string
}

/**
 * 课程基础信息
 */
export interface ICourse {
    /**
     * 课程编号
     */
    code: string
    /**
     * 课程名称
     */
    name: string
    /**
     * 课程封面地址
     */
    coverUrl?: string
    /**
     * 学时
     */
    totalHours: number
    /**
     * 专业编码
     */
    majorCode: string
    /**
     * 专业名称
     */
    majorName: string
    /**
     * 专业代码
     */
    majorNum: string
    /**
     * 培养层级编码
     */
    levelCode: string
    /**
     * 培养层级：10-中级技能 20-高级技能层 30-预备技师
     */
    trainLevel: number
    /**
     * 培养层级代码
     */
    trainLevelNum: string
    /**
     * 创建时间
     */
    createdAt: string
    /**
     * 创建人code
     */
    createdBy: string
    /**
     * 创建人
     */
    createdByName: string
    /**
     * 课程讲师参与者列表
     */
    courseTeacherList: ICourseTeacher[]
    /**
     * 课程状态 1设计中 2使用中
     */
    status: number
    /**
     * 优质 1开启
     */
    qualityStatus: number
    /**
     * 模板 1开启
     */
    templateStatus: number
    /**
     * 学生数量
     */
    stuCount: number
}

/**
 * 课程分页查询参数
 */
export interface ICoursePageQuery {
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
     * 升降序规则
     */
    order?: ORDER_RULE
    /**
     * 课程名称搜索
     */
    name?: string
    /**
     * 专业代码
     */
    majorCode?: string
    /**
     * 开启优质查询 1开启 0不开启
     */
    qualityStatus?: number
    /**
     * 开启模板查询 1开启 0不开启
     */
    templateStatus?: number
    /**
     * 课程状态 0全部 1设计中 2使用中
     */
    status?: number
    /**
     * 标签查询字段，前端表单使用 'quality' 或 'template'
     * 实际查询时会转换为qualityStatus和templateStatus
     */
    tags?: string
}

/**
 * 更新课程模板状态请求参数
 */
export interface IUpdateCourseTemplateStatusRequest {
    /**
     * 课程编码
     */
    code: string
    /**
     * 状态：0-禁用，1-启用
     */
    templateStatus: number
}

/**
 * 更新课程优质状态请求参数
 */
export interface IUpdateCourseQualityStatusRequest {
    /**
     * 课程编码
     */
    code: string
    /**
     * 状态：0-禁用，1-启用
     */
    qualityStatus: number
}

/**
 * 课程数量统计响应
 */
export interface ICourseNumResponse {
    /**
     * 全部课程数量
     */
    courseNum: number
    /**
     * 设计中课程数量
     */
    designCourseNum: number
    /**
     * 使用中课程数量
     */
    useCourseNum: number
}

/**
 * 课程表格项数据
 */
export type ICourseTableItem = ICourse
