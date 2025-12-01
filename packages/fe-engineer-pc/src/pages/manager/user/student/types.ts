import type { ORDER_RULE } from './const'

/**
 * 学生基础信息
 */
export interface IStudentBaseInfo {
    /**
     * 学生编码
     */
    code: string
    /**
     * 姓名
     */
    name: string
    /**
     * 手机号
     */
    mobile: string
    /**
     * 证件类型：1-身份证，2-护照，3-其他
     */
    certificateType: number
    /**
     * 证件号码
     */
    idCard: string
    /**
     * 班级编码
     */
    classCode: string
    /**
     * 状态：0-禁用，1-启用
     */
    status: number
}

/**
 * 学生详细信息
 */
export interface IStudent extends IStudentBaseInfo {
    /**
     * 组织编码
     */
    organizationCode?: string
    /**
     * 用户编码
     */
    userCode?: string
    /**
     * 班级名称
     */
    className?: string
    /**
     * 专业编码
     */
    majorCode?: string
    /**
     * 专业名称
     */
    majorName?: string
    /**
     * 专业代码
     */
    majorNum?: string
    /**
     * 学院编码
     */
    collegeCode?: string
    /**
     * 学院名称
     */
    collegeName?: string
    /**
     * 入学年份
     */
    enrollYear?: number
    /**
     * 毕业年份
     */
    graduateYear?: number
    /**
     * 当前学期
     */
    semester?: number
    /**
     * 当前年度
     */
    academicYear?: number
    /**
     * 当前年度类型：1-上半年 2-下半年
     */
    academicYearType?: number
    /**
     * 培养层级：10-中级技能 20-高级技能层 30-预备技师
     */
    level?: number
    /**
     * 学制起点：10-初中起点 20-高中起点
     */
    startPoint?: number
    /**
     * 学制长度
     */
    eduLen?: number
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
 * 学生分页查询参数
 */
export interface IStudentPageQuery {
    /**
     * 姓名
     */
    name?: string
    /**
     * 手机号
     */
    mobile?: string
    /**
     * 证件号码
     */
    idCard?: string
    /**
     * 班级编码
     */
    classCode?: string
    /**
     * 专业编码
     */
    majorCode?: string
    /**
     * 学院编码
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
 * 保存学生请求参数
 */
export interface ISaveStudentRequest {
    /**
     * 学生编码（更新时必传）
     */
    code?: string
    /**
     * 姓名
     */
    name: string
    /**
     * 手机号
     */
    mobile: string
    /**
     * 证件类型：1-身份证，2-护照，3-其他
     */
    certificateType: number
    /**
     * 证件号码
     */
    idCard: string
    /**
     * 班级编码
     */
    classCode: string
    /**
     * 状态：0-禁用，1-启用
     */
    status?: number
}

/**
 * 更新学生状态请求参数
 */
export interface IUpdateStudentStatusRequest {
    /**
     * 学生编码
     */
    code: string
    /**
     * 状态：0-禁用，1-启用
     */
    status: number
}

/**
 * 学生用户信息
 */
export interface IStudentUser {
    /**
     * 学生编码
     */
    code: string
    /**
     * 用户编码
     */
    userCode: string
    /**
     * 学生姓名
     */
    name: string
    /**
     * 手机号
     */
    mobile: string
    /**
     * 头像
     */
    avatar: string
}

/**
 * 学生导入请求参数
 */
export interface IStudentImportRequest {
    /**
     * 文件名称
     */
    name?: string
    /**
     * 文件url
     */
    url: string
    /**
     * 操作人code
     */
    operatorCode?: string
    /**
     * 机构编码
     */
    organizationCode?: string
    /**
     * 站点id
     */
    sid?: number
}

/**
 * 学生表格项数据
 */
export type IStudentTableItem = Pick<
    IStudent,
    | 'code'
    | 'name'
    | 'mobile'
    | 'idCard'
    | 'className'
    | 'majorName'
    | 'enrollYear'
    | 'graduateYear'
    | 'status'
>
