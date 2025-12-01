export interface AuthenticateParams {
    order: string
    orderBy: string
    pageNo: number
    pageSize: number
}

export interface AuthenticateData {
    currentPage: number
    data: Datum[]
    pageSize: number
    pages: number
    totalCount: number
}

export interface Datum {
    code: string
    firstRangeList: FirstRangeList[]
    name: string
}

export interface FirstRangeList {
    code: string
    level: number
    name: string
    nextRangeList: FirstRangeListNextRangeList[]
    pcode: string
    pointDto: PointDto[]
    rate: number
}

export interface FirstRangeListNextRangeList {
    code: string
    level: number
    name: string
    nextRangeList: FirstRangeListNextRangeList[]
    pcode: string
    pointDto: PointDto[]
    rate: number
}

export interface PointDto {
    code: string
    name: string
}

export interface JobParams {
    sid?: number
    pageNo: number
    pageSize?: number
    idList?: number[] // 职业编码
    name?: string // 职业名称
    workName?: string // 职业名称(旧接口)
    workCode?: number // 职业ID(旧接口)
}

export interface JobData {
    currentPage: number
    data: Datum[]
    pageSize: number
    pages: number
    totalCount: number
}
