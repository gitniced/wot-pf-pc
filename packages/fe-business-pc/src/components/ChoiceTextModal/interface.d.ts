export interface ItemType {
    abstractText: string
    categoryCode: string
    code: string
    content: string
    cover: string
    organizationCode: string
    status: number
    title: string
    createdAt: number
}
export interface pagination {
    pageNo: number
    pageSize: number
}
export interface paramsType {
    categoryCodes: string
    title: string
    status: number
}

export type paramsAllType = Partial<paramsType> & pagination

export interface EditType {
    categoryCode: number[]
    code: string
    content: string
    cover: any[]
    organizationCode: string
    title: string
}

export interface InfoType {
    imageUrl: string
    portalUrl: string
}
