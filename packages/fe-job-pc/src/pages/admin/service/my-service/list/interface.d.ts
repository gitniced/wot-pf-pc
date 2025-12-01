export interface StaffItem {
    code: string
    name: string
    userCode: string
}

export interface AssistanceItem {
    code: string
    candidateName: string
    candidateCode: string
    userInfoCode: string
    mobile: string
    idCard: string
    certificateType: number
    organizationCode: string
    serviceUnit: string
    regionCode: string
    serviceStaffs: StaffItem[]
    objectCategoryType: number
    jobState: number
    serviceNum: number
    startTime: number
    endTime: number
    state: number
}

export interface UserRegion {
    sid: number
    level: number
    province: string
    provinceName: string
    city: string
    cityName: string
    area: string
    areaName: string
    street: string
    streetName: string
    village: string
    villageName: string
}

export interface ListRecordOrganizationItem {
    organizationCode: string
    name: string
}
