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
}

export type paramsAllType = Partial<paramsType> & pagination

export interface EditType {
    categoryCode: number[]
    code: string
    content: string
    cover: any[]
    organizationCode: string
    title: string
    categoryCodeList: []
    imageTextCategoryNameList: []
    imageTextCategoryList: []
    attachment: unknown[]
    attachmentJson: unknown[]
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
