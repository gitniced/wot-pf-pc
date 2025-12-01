export interface AuthenticasListItem {
    code: string
    name: string
    status: number // 状态
    publishStatus: number // 引用状态
    pushStatus: number // 推荐状态
    jobName: string // 职业名称
    workName: string // 工种名称
    levelName: string // 等级名字
}

export interface AuthenticasQuery {
    pageSize: number
    pageNo: number
    levelCode: number
    jobCode: number
    workCode: number
    organizationCode: string
    publishStatus: number
    status?: number
    pushStatus: number
    name: string
    belongType: number
    jobName?: string
    jobNameCode?: number
    jobType?: string
    jobTypeCode?: number
    jobLevel?: string
    jobLevelCode?: number
}

export interface RouteQuery {
    jobName: string
    jobNameCode: number
    jobType?: string
    jobTypeCode?: number
    jobLevel?: string
    jobLevelCode?: number
}

export interface CreateAuthenticates {
    name: string
    levelCode: string
    typeCode: string
    belongType: number
    organizationCode: string
}
