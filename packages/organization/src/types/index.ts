import type UserStore from '@/stores/userStore'
import type SiteStore from '@/stores/siteStore'
import type { History, IRoute } from 'umi'
import {
    LOGIN_TYPE,
    ORG_CERTIFY_STATUS_TYPE,
    USER_LOGIN_TYPE,
} from '@wotu/wotu-components/dist/esm/Types'

/**
 *总store类型
 */
export interface Stores {
    userStore: UserStore
    siteStore: SiteStore
}

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

export enum GROUP_TYPE_ENUM {
    MERCHANT = 3, // 资源方类型
    ORGANIZATION = 2, // 机构类型
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

export const CURRENT_LOGIN_URL_TYPE_MAPPING: Record<string, string> = {
    // 通用登录 默认个人类型与机构类型
    // DEFAULT = 'default',
    // 资源方登录 指定用户类型
    // MERCHANT = 'merchant',
    // 机构登录 指定身份为企业
    // [CURRENT_LOGIN_URL_TYPE_ENUM.COMPANY]: '企业登录',
    // 机构登录 指定身份为院校
    [CURRENT_LOGIN_URL_TYPE_ENUM.SCHOOL]: '院校登录',
}

export const LoginTypeMapping: Record<string, number> = {
    [LOGIN_TYPE.USER_LOGIN]: USER_LOGIN_TYPE.USER_LOGIN,
    [LOGIN_TYPE.ORG_LOGIN]: USER_LOGIN_TYPE.ORG_LOGIN,
    [LOGIN_TYPE.SELLER_LOGIN]: USER_LOGIN_TYPE.SELLER_LOGIN,
}

export const FORM_ITEM_LAYOUT = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
}

export const MODAL_FORM_ITEM_LAYOUT = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
}

// 和后端约定的文件上传类型
// 业务类型 1导入机构成员 2用户头像 3合同附件 4客户附件 5站点图片 6机构认证图片 7 二要素认证图片 8商品图片 9机构头像 10推荐位上传 11财务凭证 ,12菜单icon
export type GlobalUploadType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

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
    baseInfo?: SiteBaseInfo
    configList?: SiteConfigItem[]
    sid?: number
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
    [ORG_CERTIFY_STATUS_TYPE.WAIT_APPROVE]: {
        text: '查看',
        img: BASE_IMG_URL + '/png_biangengshenhe@2x.png',
        url: '/prove',
    },
}

export enum MICRO_APP_TYPE {
    WORK_BENCH = 'workbench',
}

export const ITEM_LAYOUT = {
    labelCol: { span: 3 },
    wrapperCol: { span: 16 },
}
