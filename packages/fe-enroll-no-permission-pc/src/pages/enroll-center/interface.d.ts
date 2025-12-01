export interface SubmitData {
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
    sid: number
    type: any
    userAvatar: string
    userBirth: string
    userCode: string
    userGender: string
    userIdentify: string
    userMobile: string
    userName: string
    applyChannel: string
    remark: string
}

export interface UserinfoData {
    avatar: string
    code: string
    email: string
    gender: number
    idCardNo: string
    isInitPassword: boolean
    isValidateIdCard: boolean
    isValidatePhone: boolean
    lastLoginTs: number
    lastOrganizationCode: string
    mobile: string
    name: string
    nickname: string
    sid: number
    username: string
}

export interface ItemInfoData {
    activityEnd: string
    activityStart: string
    appliedNum: number
    applyEndTime: number
    applyStartTime: number
    attachment1: string
    attachment2: string
    attachment3: string
    attachment4: string
    attachment5: string
    categoryCode: string
    categoryName: string
    code: string
    contract: string
    cover: string
    detail: string
    entryCode: string
    goodsCode: string
    intro: string
    name: string
    openAudit: number
    openPay: number
    organizationCode: string
    organizationName: string
    payEndTime: number
    price: number
    publishStatus: number
    quota: number
    remainQuota: number
    sid: number
    status: number
    type: number
    address: string
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
