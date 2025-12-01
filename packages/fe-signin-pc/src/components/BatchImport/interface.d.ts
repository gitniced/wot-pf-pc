import type React from 'react'

import type { ModalProps } from 'antd'
import type { UploadFile } from 'antd/es/upload/interface'

export interface BatchImportProps extends Omit<ModalProps, 'onOk' | 'onCancel'> {
    importApi: string
    failApi?: string
    onOk: (isSuccess: boolean, response: any, query: any) => void
    onCancel: () => void
    businessType?: number // 业务code 1试题-excel 2试题word 3刷题用户
    importTemplate?: string // 导入模版
    description?: React.ReactNode // 导入说明
    practiceCode?: string // 导入用户关联的刷题Code
    authenticateCode?: string // 要素细目表code
    showContinue?: boolean // 是否允许继续导入
    title?: string // 标题
    templateType?: string
    skill?: number
    subject?: number
    accept?: 'img' | 'zip' | 'xslx'
    uploadTips?: string
    uploadParams?: Record<string, any>
}

// 导入之前
export interface BeforeProps {
    onChange: (file: UploadFile) => void
    importTemplate?: string // 导入模版
    description?: React.ReactNode // 导入说明
    subject?: number
    practiceCode?: string
    accept?: 'img' | 'zip' | 'xslx'
    uploadTips?: string
    uploadParams?: Record<string, any>
}
// 导入中
export interface LoadingProps {
    progress: string // 上传进度
    file: UploadFile
}

// 导入成功
export interface ResolvedProps {
    totalCount: number // 导入成功的数据条数
}
// 导入失败
export interface RejectedProps {
    totalCount: number
    failCount: number
    errorList: FailRecordItem[]
    errorFileUrl: string
    failApi?: string
    importCode?: srting
}
// 失败记录
export interface FailRecordItem {
    line: number // 行数
    content: string // 内容
    reason: string // 错误原因
}

// 文件上传
export interface FileUpload {
    file: File
    type: number
    isPrivate: boolean
}

// 导入
export interface ImportParams {
    fileName?: string // 文件名称
    fileUrl: string // 文件路径
    organizationCode?: string
}

// 导入结果
export interface ResultParams {
    code: string // 导入记录的code
}

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
    failApi?: string
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
