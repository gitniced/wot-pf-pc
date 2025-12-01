export interface StaffItem {
    canJump: number
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
    remark: string
}

export interface ListRecordUserItem {
    code: string
    name: string
}
