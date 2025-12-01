export type EditType = {
    name: string | undefined
    rate?: string | undefined
    children?: EditType[]
    point?: EditType[]
    important?: string | undefined
    code?: string | undefined
}

export type CurRecordType = {
    id: string
}

export type RouteQuery = {
    plat_qualify_id: number
    plat_qualify_type: number
    recordId: string
    name: string
    jobName: string
    jobType: string
    jobLevel: string
    jobLevelCode: number
}

export interface PointItem {
    code: string
    name: string
    codeMark: string
    important: string
}

export interface ChildrenItem {
    code: string
    pCode: string
    name: string
    rate: number
    level: number
    codeMark: string
    point: PointItem[]
    children: ChildrenItem[]
}
export interface RangeItem {
    code: string
    pCode: string
    name: string
    rate: number
    level: number
    codeMark: string
    point: PointItem[]
    children: ChildrenItem[]
}
export interface AuthenticateDetail {
    code: string
    name: string
    range: RangeItem[]
    workName: string
    jobName: string
    levelName: string
    pointCount: number
    xcount: number
    xrate: number
    ycount: number
    yrate: number
    zcount: number
    zrate: number
}
