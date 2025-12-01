import type UserStore from '@/stores/userStore'
import type SiteStore from '@/stores/siteStore'
import type { IRoute } from 'umi'

/**
 *总store类型
 */
export interface Stores {
    userStore: UserStore
    siteStore: SiteStore
}

/**
 * 任意Object类型
 */
export type AnyObj = Record<string, any>

/**
 * 站点信息siteData类型
 */
export interface SiteData {
    admin_domain: string
    alias: string
    config: any
    id: string
    sid: number
    name: string
    pc_domain: string
    province: string
    seller_domain: string
    sp_appid: string
    sp_image: string
    status: string
    wap_domain: string
    configList?: SiteConfigItem[]
    baseInfo: Record<string, string>
}

export type SiteType = {
    data: SiteData
    time: number
}
/**
 * 站点信息config配置项
 */
type SiteConfigItem = {
    description: string
    key: string
    value: string
}

/**
 * 用户类型
 */
export enum USER_TYPE {
    USER = 'user', // 个人
    ORG = 'org', // 机构
    MERCHANT = 'merchant', // 资源方
}

/**
 * 用户类型
 */
export const USER_TYPE_MAP: Record<string, number> = {
    [USER_TYPE.USER]: 1,
    [USER_TYPE.ORG]: 2,
    [USER_TYPE.MERCHANT]: 3,
}

/**
 * 和后端约定的文件上传类型
 * 业务类型 1导入组织成员 2用户头像 3合同附件 4客户附件 5站点图片 6组织认证图片 7 二要素认证图片 8商品图片 9组织头像 10推荐位上传 11财务凭证 ,12菜单icon
 */
export type GlobalUploadType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 18

/**
 * 站点信息siteData类型
 */
export interface PageProps extends IRoute {
    userStore?: UserStore
    siteStore?: SiteStore
}

/**学期Dto */
export type semesterObjType = {
    /**学期编号 */
    semesterCode: string
    /**学期名称 */
    semesterName: string
    /**开始日期 */
    startDate: string
    /**结束日期 */
    endDate: string
    /**是否当前学期 */
    isActive: boolean
    /**课程数量 */
    courseCount: string
    /**课时数量 */
    studyHoursCount: string
}
/**
 * 表格数据类型 - 支持泛型动态设置数据类型
 * @template T 表格行数据的类型
 * @example
 * // 使用示例：
 * interface UserInfo {
 *   id: string
 *   name: string
 *   email: string
 * }
 * type UserTableData = TableData<UserInfo>
 */
export interface TableData<T = any> {
    currentPage: number
    data: T[]
    pageSize: number
    pages: number
    totalCount: number
}

/**
 * 白色系统封面图片列表
 */
export const WHITE_SYSTEM_IMAGE_LIST = [
    'https://static.zpimg.cn/public/fe-engineer-pc/images/small1.png',
    'https://static.zpimg.cn/public/fe-engineer-pc/images/large1.png',
]

/**
 * 黑色系统封面图片列表
 */
export const BLACK_SYSTEM_IMAGE_LIST = [
    'https://static.zpimg.cn/public/fe-engineer-pc/images/small2.png',
    'https://static.zpimg.cn/public/fe-engineer-pc/images/large2.png',
    'https://static.zpimg.cn/public/fe-engineer-pc/images/small3.png',
    'https://static.zpimg.cn/public/fe-engineer-pc/images/large3.png',
    'https://static.zpimg.cn/public/fe-engineer-pc/images/small4.png',
    'https://static.zpimg.cn/public/fe-engineer-pc/images/large4.png',
]
