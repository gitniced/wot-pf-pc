// 导入状态
export enum IMPORT_STATUS_ENUM {
    NONE = 0, // 初始化
    BEFORE = 1, // 导入前
    LOADING = 5, // 导入中
    RESOLVED = 20, // 导入成功
    REJECTED = 10, // 导入失败
}

export enum IMPORT_TYPE_ENUM {
    QUESTION_EXCEL = 1, // 试题excel导入
    QUESTION_WORD, // 试题word导入
    PRACTICE_USER, // 刷题用户
}


// 上传文件类型限制
export const ACCEPTED_XSLX_ACCEPT = "application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
export const ACCEPTED_IMAGE_TYPES = "image/jpeg,image/png,image/gif,image/bmp";
export const ACCEPTED_ZIP_TYPES = "application/zip,application/x-zip-compressed,application/x-zip";


// 上传大小限制
export const MAX_SIZE = 5 * 1024 * 1024


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
    BEFORE = -1,
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
