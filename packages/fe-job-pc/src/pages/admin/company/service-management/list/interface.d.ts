export interface ListItem {
    code: string
    sid: number
    userCode: string
    name: string
    mobile: string
    idCardNo: string
    sourceType: number
    organizationCode: string
    regionCode: string
    serviceUnit: string
    serviceNum: number
    status: number
    photo: string
    deleted: number
    certificateType: number
}

export interface CreateServiceStaffParams {
    name: string
    mobile: string
    idCardNo: string
    photo: string
    organizationCode: string
}

export interface EditServiceStaffParams {
    code?: string
    photo: string
    organizationCode: string
}
