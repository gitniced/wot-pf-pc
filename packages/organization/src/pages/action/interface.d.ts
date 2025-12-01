interface FormDataType {
    code: string
    department: any[]
    isAdmin: boolean
    mobile: string
    name: string
    roleName: string
    isDirector: boolean
    userCode: string
    idCard?: string
}

interface createAuthPropsType {
    idCard: string
    isAdmin: boolean
    mobile: string
    name: string
    roleCode: string
}

interface addAuthQueryType {
    type: string
    idCard?: string
    organizationCode: string
    departmentCode: string
}

interface ImportListType {
    code?: string
    createdAt: string
    fileName?: string
    rate: number
    showStatus?: number
    info: string
    status: number
    fileUrl: string
    errorFileUrl: string
    typeName?: string
}

export interface ResultDomProps {
    status: ACTION_STATUS_TYPE
    totalCount?: number
    failCount?: number
    showStatus?: SHOW_STATUS_TYPE
}
export interface DetailModalProps {
    visible: boolean
    closeDialog: () => void
    code: string
    result: ResultDomProps
    errorFileUrl?: string
    past?: boolean
}

export enum ACTION_STATUS_TYPE {
    // 未进行
    WAITING = 0,
    // 进行中
    PENDING = 1,
    // 已完成 已完成有两种状态，status为2或者3
    COMPLETE = 2,
    // 格式错误 状态为3
    FORMATERROR = 3,
}

export enum SHOW_STATUS_TYPE {
    // 存在错误
    ERROR = 0,
    // 成功
    SUCCESS = 1,
}

export { FormDataType, createAuthPropsType, addAuthQueryType, ImportListType }
