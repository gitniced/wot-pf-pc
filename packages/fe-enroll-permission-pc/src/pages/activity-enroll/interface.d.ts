export interface SearchParams {
    applyTimeEnd: number
    applyTimeStart: number
    entityCode: string
    order: string
    orderBy: string
    pageNo: number
    pageSize: number
    userCode: string
    userIdentify: string
    userMobile: string
    userName: string
    applyTime?: string
    merchantCode?: string
}

export interface TableData {
    currentPage: number
    data: Datum[]
    pageSize: number
    pages: number
    totalCount: number
}

export interface Datum {
    applyTime: number
    code: string
    comment: string
    customContent: any
    entityCode: string
    entityName: string
    isIdentifyManual: boolean
    isMobileManual: boolean
    itemCode: string
    itemName: string
    sid: string
    type: number
    userAvatar: string
    userBirth: string
    userCode: string
    userIdentify: string
    userGender: string
    userMobile: string
    userName: string
    project: {
        address: string
        contactMobile: string
        contactName: string
        endTime: number
        name: string
        organizationName: string
        startTime: number
        type: string
    }
    entryName: string
    activityStart: number
    activityEnd: number
    entryCode: string
    organizationName: string
    title: string
    activityName: string
}
export interface RecordStatusCount {
    name: number
    value: number
}
