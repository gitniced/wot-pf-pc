export interface ListItemProps {
    categoryCodeList: string[]
    categoryList: string[]
    categoryNameList: string[]
    code: string
    content: string
    cover: string
    organizationCode: string
    organizationName: string
    publishTime: number
    sid: number
    siteName: string
    sort: number
    status: number
    title: string
}

export interface CategoryListItem {
    code: string
    sid: string
    siteName: string
    organizationCode: string
    organizationName: string
    name: string
    createdAt: string
    sort: string
}
