export interface SearchParams {
    commonJob: string
    composition: string
    title: string
    usedState: string
}

export interface TableItem {
    canEditState: number
    code: string
    composition: string
    createBy: string
    createdAt: number
    customContent: {
        commonJob: {
            jobName: string
            jobType: string
            jobLevel: string
        }
    }
    title: string
    usedState: number
}

export interface TableData {
    currentPage: number
    data: TableItem[]
    pageSize: number
    pages: number
    totalCount: number
}

export interface UserDataType {
    lastOrganizationCode?: string
    code?: string
}
