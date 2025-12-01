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
// 业务类型 1导入机构成员 2用户头像 3合同附件 4客户附件 5站点图片 6机构认证图片 7 二要素认证图片 8商品图片 9机构头像 10推荐位上传 11财务凭证 ,12菜单icon
export type GlobalUploadType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 18

/**业务线类型 */
export enum BUSINESS_KIND {
    /**考评 */
    PLATFORM = 'platform',
    /**考评 */
    EXAM = 'exam',
    /**职培 */
    CAREER = 'career',
    /**院校 */
    SCHOOL = 'school',
    /**创培 */
    TRAIN = 'train',
}

/**报名项目主类型值 */
export const ENROLL_TYPE = {
    /**机构 */
    ORGANIZATION: 1,
    /**活动 */
    ACTIVITY: 2,
    /**职业 */
    CAREER: 3,
}

/**活动类型 */
export enum EVENT_KIND {
    /**机构 */
    ORGANIZATION = 'organization',
    /**评价计划 */
    REVIEWS_PLAN = 'reviews-plan',
    /**培训计划 */
    TRAINING_PLAN = 'training-plan',
    /**班级 */
    TRAINING_CLASS = 'training-class',
    /**职业 */
    CAREER = 'career',
    // 技能竞赛
    COMPETITION = 'skills-competition',
    // 站点活动
    EVENTS = 'events',
    /**  通用  */
    COMMON = 'common',
    /**  课程报名  */
    COURSE_APPLY = 'course-apply',
}

/**报名项目类型值 */
export const EVENT_KIND_VALUE = {
    /**机构 */
    [EVENT_KIND.ORGANIZATION]: 1,
    /**评价计划 */
    [EVENT_KIND.REVIEWS_PLAN]: 2,
    /**培训计划 */
    [EVENT_KIND.TRAINING_PLAN]: 3,
    /**培训班级 */
    [EVENT_KIND.TRAINING_CLASS]: 4,
    /**职业 */
    [EVENT_KIND.CAREER]: 5,
    // 技能竞赛
    [EVENT_KIND.COMPETITION]: 6,
    // 站点活动
    [EVENT_KIND.EVENTS]: 7,
    /**  通用  */
    [EVENT_KIND.COMMON]: 8,
    /**  通用  */
    [EVENT_KIND.COURSE_APPLY]: 9,
}

/**创建来源
 * 1:锄禾,2:监管端, 3:机构
 */
export enum SOURCE_TYPE {
    BLANK = 0,
    CHUHE = 1,
    JIANGUAN = 2,
    ORG = 3,
}

export enum TYPE_ENUM {
    ORG = 1, // 机构   为机构的时候没有时间
    EVALUATE = 2, // 评价计划
    TRAIN = 3, //培训计划
    TRAINING_CLASS = 4, //培训班级
    CAREER = 5, // 职业
    SKILLS_COMPETITION = 6, // 技能竞赛
    COMMON = 8, //通用 8
    EVENTS = 7, //活动 7
    COURSE_APPLY = 9, //课程报名 9
}
