import type UserStore from '@/stores/userStore'
import type SiteStore from '@/stores/siteStore'
import type { History, IRoute } from 'umi'

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
}

type SiteConfigItem = {
    description: string
    key: string
    value: string
}

/**
 * 站点信息siteData类型
 */
export interface SiteData {
    baseInfo?: SiteBaseInfo
    configList?: SiteConfigItem[]
    sid?: 0
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

/**权限模型 */
export interface PermissionItem {
    changeEnable: boolean
    children: PermissionItem[]
    has: boolean
    icon: string
    key: number
    moduleId: number
    pid: number
    route: string
    title: string
    type: number
    typeName: string
}

/**主应用数据模型 */
export interface MasterProps {
    currentOrganiation: string
    updateCurrentOrganiation: (code: string, name: string) => void
    children_store_clean: (handler: any) => void
    masterStore: { userStore?: UserStore; siteStore?: SiteStore }
    masterHistory: History
}

export enum MERCHANT_LOGIN_TYPE {
    COURSE = 'course', // 课程身份
    QUESTION = 'question', // 题库身份
    SELF_COURSE = 'self_course', // 自由课
    LIVE_BROADCAST = 'live_broadcast', //直播培训
}

export const sourceTypeMapping: Record<string, number> = {
    course: 1,
    question: 2,
    self_course: 3,
    live_broadcast: 4,
}

export const sourceTypeStatusTextMap: Record<string, string> = {
    [sourceTypeMapping.course]: '课程资源方',
    [sourceTypeMapping.question]: '题库资源方',
    [sourceTypeMapping.self_course]: '自由课平台方',
    [sourceTypeMapping.live_broadcast]: '直播培训平台方',
}
// 机构认证状态
export enum ORG_CERTIFY_STATUS_TYPE {
    // 未认证
    UNVERIFIED = 0,
    // 已认证
    VERIFIED = 1,
    // 审核中
    APPROVE = 2,
}
// 机构审核状态
export enum ORG_APPROVE_STATUS_TYPE {
    // none
    NONE = 0,
    // 已通过
    PASS = 1,
    // 未通过
    UN_PASS = 2,
}
const BASE_IMG_URL = 'https://static.zpimg.cn/public/fe_user_pc/images'
export const certifyStatusObj = {
    [ORG_CERTIFY_STATUS_TYPE.UNVERIFIED]: {
        text: '去认证',
        img: BASE_IMG_URL + '/png_weirenzheng@2x.png',
        url: '/prove',
    },
    [ORG_CERTIFY_STATUS_TYPE.VERIFIED]: {
        text: '已认证',
        img: BASE_IMG_URL + '/png_yirenzheng@2x.png',
        url: '',
    },
    [ORG_CERTIFY_STATUS_TYPE.APPROVE]: {
        text: '查看',
        img: BASE_IMG_URL + '/png_shenhezhong@2x.png',
        url: '/prove',
    },
}

export const ITEM_LAYOUT = {
    labelCol: { span: 7 },
    wrapperCol: { span: 17 },
}
