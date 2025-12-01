/**
 * 任意Object类型
 */
export type AnyObj = Record<string, any>

/**主应用数据模型 */

export interface MasterStore {
    currentOrganiation: string
    updateCurrentOrganiation: (code: string, name: string) => void
    children_store_clean: (handler: any) => void
}

export enum MERCHANT_LOGIN_TYPE {
    COURSE = 'course', // 课程身份
    QUESTION = 'question', // 题库身份
    SELF_COURSE = 'self_course', // 自由课
    LIVE_BROADCAST = 'live_broadcast', //直播培训
    COMPANY = 'company', // 公司资源方
}

export const sourceTypeMapping: Record<string, number> = {
    course: 1,
    question: 2,
    self_course: 3,
    live_broadcast: 4,
    company: 5,
}

export const sourceTypeStatusTextMap: Record<string, string> = {
    [sourceTypeMapping.course]: '课程资源方',
    [sourceTypeMapping.question]: '题库资源方',
    [sourceTypeMapping.self_course]: '自由课平台方',
    [sourceTypeMapping.live_broadcast]: '直播培训平台方',
    [sourceTypeMapping.company]: '就业资源方',
}

export interface PaperRouterQuery {
    subject?: string
}
