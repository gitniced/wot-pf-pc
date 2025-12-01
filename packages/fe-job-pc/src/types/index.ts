import type { UserStore } from '@/stores/interface'
import type SiteStore from '@/stores/siteStore'

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

type SiteConfigItem = {
    description: string
    key: string
    value: string
}

export enum USER_TYPE {
    USER = 'user', // 个人
    ORG = 'org', // 机构
    MERCHANT = 'merchant', // 资源方
}

export const USER_TYPE_MAP: Record<string, number> = {
    [USER_TYPE.USER]: 1,
    [USER_TYPE.ORG]: 2,
    [USER_TYPE.MERCHANT]: 3,
}

export enum USER_IDENTITY_TYPE {
    STUDENT = 5, // 学员
    TEACHER = 6, // 讲师
    EXAMINATION_STAFF = 7, // 考务人员
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

// 和后端约定的文件上传类型
// 业务类型 1导入组织成员 2用户头像 3合同附件 4客户附件 5站点图片 6组织认证图片 7 二要素认证图片 8商品图片 9组织头像 10推荐位上传 11财务凭证 ,12菜单icon
export type GlobalUploadType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 18

export interface MasterStore {
    currentOrganiation: string
    updateCurrentOrganiation: (code: string, name: string) => void
    children_store_clean: (handler: any) => void
}

declare global {
    interface Window {
        self_store: any
        TMap: any
    }
}
