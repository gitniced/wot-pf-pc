export type DemoProps = Record<string, any>

export type UserInfo = {
    avatar: string
    code: string
    email: string
    gender: number
    idCardNo: string
    isInitPassword: boolean
    isValidateIdCard: boolean
    isValidatePhone: boolean
    lastLoginTs: number
    mobile: string
    name: string
    nickname: string
    username: string
}

export type BindItem = {
    name: string
    icon: string
    unIcon: string
    info: string
    unInfo: string
    status: number
    statusStr: string
    unStatusStr: string
    key: string
}
export type BindListItem = {
    type: string
    children: BindItem[]
}
