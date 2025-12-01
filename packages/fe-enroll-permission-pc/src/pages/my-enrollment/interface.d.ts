export interface SearchParams {
    pageNo: number
    pageSize: number
    status: string
    queryScope?: number
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
    mobile: number
    adress: string
    project: {
        address: string
        contactMobile: string
        contactName: string
        endTime: number
        name: string
        organizationName: string
        startTime: number
        type: string
        organizationLogo: string
    }
    organizationLogo: string
    organizationName: string
}
/**  门户信息  */
export interface IGatewayDetail {
    code: string
    type: number
    organizationCode: string
    organizationName: string
    organizationLogo: string
    naviLogo: string
    themeColor: string
    intro: string
    linkUrl: string
}
