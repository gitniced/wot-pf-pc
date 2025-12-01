import type { ORDER_RULE } from './const'

// 从本地 const 文件导入枚举
export { TEACHER_STATUS, CERTIFICATE_TYPE, ORDER_RULE } from './const'

/**
 * 教师基础信息
 */
export interface ITeacherBaseInfo {
    /**
     * 教师编码
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
     * 状态：0-禁用，1-启用
     */
    status: number
}

/**
 * 教师详细信息
 */
export interface ITeacher extends ITeacherBaseInfo {
    /**
     * 机构编码
     */
    organizationCode?: string
    /**
     * 用户编码
     */
    userCode?: string
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
 * 教师分页查询参数
 */
export interface ITeacherPageQuery {
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
     * 站点ID
     */
    sid?: number
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
 * 保存教师请求参数
 */
export interface ISaveTeacherRequest {
    /**
     * 教师编码（更新时必传）
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
     * 状态：0-禁用，1-启用
     */
    status?: number
}

/**
 * 更新教师状态请求参数
 */
export interface IUpdateTeacherStatusRequest {
    /**
     * 教师编码
     */
    code: string
    /**
     * 状态：0-禁用，1-启用
     */
    status: number
}

/**
 * 教师导入请求参数
 */
export interface ITeacherImportRequest {
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
 * 教师表格项数据
 */
export type ITeacherTableItem = Pick<
    ITeacher,
    'code' | 'name' | 'mobile' | 'idCard' | 'certificateType' | 'status'
>
