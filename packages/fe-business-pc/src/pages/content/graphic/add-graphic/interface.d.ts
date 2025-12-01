export interface Objtype {
    code: string
    organizationCode: string
    categoryCodeList?: string[]
    categoryNameList?: string[]
    title: string
    cover: any
    content: string
    status?: number
    publishTime?: number
    sort: number
}
export interface ItemType {
    categoryCode: string
    code: string
    content: string
    cover: string
    organizationCode: string
    status: number
    title: string
    createdAt: number
}

export interface ResetData {
    code: string
    title: string
    imageTextCategoryList: any[]
    imageTextCategoryNameList: any[]
    cover: string
    content: string
    publishTime: number
    isTabBar: number
}

export interface EditType {
    categoryCode: number[]
    code: string
    content: string
    cover: any[]
    organizationCode: string
    title: string
    categoryCodeList: []
}
