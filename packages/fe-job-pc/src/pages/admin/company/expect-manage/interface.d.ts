import type { ModalProps } from 'antd'

export interface CreateJobExpectParams {
    /**
     * 期望职位id
     */
    capacityId: number
    /**
     * 城市
     */
    city: string
    /**
     * iot设备号
     */
    deviceNumber?: string
    /**
     * 期望行业id
     */
    industry: number
    /**
     * 最高薪资
     */
    maxSalary?: number
    /**
     * 最低薪资
     */
    minSalary?: number
    /**
     * 组织code
     */
    organizationCode?: string
    /**
     * 类型 1全职 2兼职  3实习 4校招
     */
    type: number
    /**
     * 用户code
     */
    userCode?: string
}

/**
 * ResponseBasePaginationRspJobExpectDto
 */
export interface Response {
    /**
     * 响应数据
     */
    data?: BasePaginationRspJobExpectDto
    /**
     * 响应消息
     */
    message?: string
    /**
     * 响应消息编码
     */
    messageCode?: string
    /**
     * 是否成功
     */
    success?: boolean
    [property: string]: any
}

/**
 * 响应数据
 *
 * BasePaginationRspJobExpectDto
 */
export interface BasePaginationRspJobExpectDto {
    /**
     * 当前页码.
     * 当前页码
     */
    currentPage?: number
    /**
     * The data.
     * 数据
     */
    data?: JobExpectDto[]
    /**
     * 总页数
     */
    pages?: number
    /**
     * 每页记录数.
     * 每页记录数
     */
    pageSize?: number
    /**
     * 总数.
     * 总数
     */
    totalCount?: number
    [property: string]: any
}

/**
 * 求职期望数据
 *
 * JobExpectDto，求职期望数据
 */
export interface JobExpectDto {
    /**
     * 用户code
     */
    candidateCode?: string
    /**
     * 期望职位id
     */
    capacityId: number
    /**
     * 期望职位名称
     */
    capacityName: string
    /**
     * 城市
     */
    city: string
    /**
     * 城市名称
     */
    cityName?: string
    /**
     * 期望编码
     */
    code?: string
    /**
     * 登记时间
     */
    createdAt?: string
    /**
     * 详细工作区域
     */
    detailedWorkArea?: string
    /**
     * 设备名称
     */
    deviceName?: string
    /**
     * 期望行业id
     */
    industry: number
    /**
     * 期望行业名称
     */
    industryName?: string
    /**
     * 最高薪资
     */
    maxSalary?: number
    /**
     * 最低薪资
     */
    minSalary?: number
    /**
     * 手机号
     */
    mobile?: string
    /**
     * 昵称
     */
    nickName?: string
    /**
     * 用户版本key
     */
    openKey?: string
    /**
     * 其他偏好
     */
    otherPreference?: string
    /**
     * 脱敏手机号
     */
    sensitiveMobile?: string
    /**
     * 来源
     */
    source?: number
    /**
     * 来源名称
     */
    sourceName?: string
    /**
     * 类型 1全职 2兼职  3实习 4校招
     */
    type: number
    /**
     * 更新时间
     */
    updatedAt?: string
    /**
     * 是否填写完整
     */
    wholeState?: number
    /**
     * 工作区域
     */
    workArea?: number
    /**
     * 工作区域名称
     */
    workAreaName?: string
    /**
     * 工作班时 1:做五休二（周末双休）2:做五休二（非周末双休）3:做一休一、两班制（翻班）4:三班制（翻班）5:其他
     */
    workTime?: number
    /**
     * 工作班时描述
     */
    workTimeDes?: string
    [property: string]: any
}
