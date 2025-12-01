import type UserStore from '@/stores/userStore'
import type SiteStore from '@/stores/siteStore'
import type { IRoute } from 'umi'
import {
    LOGIN_TYPE,
    MERCHANT_LOGIN_TYPE,
    ORG_IDENTITY_MAPPING,
} from '@wotu/wotu-components/dist/esm/Types'

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

/**站点基础信息 */
type SiteBaseInfo = {
    adminDomain: string
    alias: string
    area: number
    city: number
    contactDept: string
    contactMobile: string
    contactName: string
    contactPost: string
    expireTime: number
    name: string
    padDomain: string
    pcDomain: string
    province: number
    shortName: string
    status: number
    wapDomain: string
    merchantUserDomain?: string
}

type SiteConfigItem = {
    description: string
    key: string
    value: string
}
export interface groupListItem {
    description: string
    id: number
    sid: number
    name: string
    type: number
}
/**
 * 站点信息siteData类型
 */
export interface SiteData {
    baseInfo?: SiteBaseInfo
    configList?: SiteConfigItem[]
    sid?: number
    groupList?: groupListItem[]
}
export interface SiteType {
    data: SiteData
    time: number
}

/**
 * 站点信息siteData类型
 */
export interface PageProps extends IRoute {
    userStore?: UserStore
    siteStore?: SiteStore
}

// 通用登录页 动态路由 登录类别 枚举
export enum CURRENT_LOGIN_URL_TYPE_ENUM {
    // 通用登录 默认个人类型与机构类型
    // DEFAULT = 'default',
    // 资源方登录 指定用户类型
    // MERCHANT = 'merchant',
    // 机构登录 指定身份为企业
    // COMPANY = 'company',
    // 机构登录 指定身份为院校
    SCHOOL = 'school',
}

// 工作台按钮文案
export const WORKBENCH_BTN_TEXT = {
    [LOGIN_TYPE.USER_LOGIN]: '个人中心',
    [LOGIN_TYPE.ORG_LOGIN]: '机构工作台',
    [LOGIN_TYPE.SELLER_LOGIN]: '资源方工作台',
}

export const ORG_IDENTITY_TEXT_MAP: Record<string, string> = {
    [ORG_IDENTITY_MAPPING.org]: '机构',
    org: '机构',
    [ORG_IDENTITY_MAPPING.school]: '院校',
    school: '院校',
}

export const CURRENT_LOGIN_URL_TYPE_MAPPING: Record<string, string> = {
    // 通用登录 默认个人类型与机构类型
    // DEFAULT = 'default',
    // 资源方登录 指定用户类型
    // SELLER = 'seller',
    // 机构登录 指定身份为企业
    // [CURRENT_LOGIN_URL_TYPE_ENUM.COMPANY]: '企业'
    [MERCHANT_LOGIN_TYPE.COMPANY]: '企业',

    // 机构登录 指定身份为院校
    [CURRENT_LOGIN_URL_TYPE_ENUM.SCHOOL]: '院校',
}

// 区分题库和课程资源方,除了question都是课程
export const SOURCE_MERCHANT_DOMAIN: Record<string, string> = {
    [MERCHANT_LOGIN_TYPE.QUESTION]: 'merchantMidDomain',
    [MERCHANT_LOGIN_TYPE.COURSE]: 'courseMerchantDomain',
    [MERCHANT_LOGIN_TYPE.SELF_COURSE]: 'courseMerchantDomain',
    [MERCHANT_LOGIN_TYPE.LIVE_BROADCAST]: 'courseMerchantDomain',
    //TODO  企业资源方工作台地址暂时借用课程资源方的
    [MERCHANT_LOGIN_TYPE.COMPANY]: 'courseMerchantDomain',
}

// 和后端约定的文件上传类型
// 业务类型 1导入机构成员 2用户头像 3合同附件 4客户附件 5站点图片 6机构认证图片 7 二要素认证图片 8商品图片 9机构头像 10推荐位上传 11财务凭证 ,12菜单icon
export type GlobalUploadType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export const FORM_ITEM_LAYOUT = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
}

export const MODAL_FORM_ITEM_LAYOUT = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
}

export const MLH_TEACHER = 'mlh'
export const JOB_TEACHER = 'job'

export const PERSON_TEACHER_IDENTITY_MAP = {
    [MLH_TEACHER]: 11,
    [JOB_TEACHER]: 12,
}
export const PERSON_TEACHER_IDENTITY_MAP_STRING = {
    11: MLH_TEACHER,
    12: JOB_TEACHER,
}
