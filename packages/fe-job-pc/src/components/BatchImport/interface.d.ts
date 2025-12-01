import type React from 'react'

import type { ModalProps } from 'antd'
import type { UploadFile } from 'antd/es/upload/interface'

export interface BatchImportProps extends Omit<ModalProps, 'onOk' | 'onCancel'> {
    importApi: string
    importParams?: any
    onOk: (isSuccess: boolean, response: any, query: any) => void
    onCancel: () => void
    importFileType?: 'excel' | 'word' | 'image'
    importTemplate?: string // 导入模版
    description?: React.ReactNode // 导入说明
    showContinue?: boolean // 是否允许继续导入
    title?: string // 标题
    templateType?: string
    skill?: number
    subject?: number
    belongType?: number
    commonJob?: { label: string; value: number }[]
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
    importFileType?: 'excel' | 'word' | 'image'
    accept?: 'img' | 'zip' | 'xslx'
    uploadTips?: string
    uploadParams?: Record<string, any>
    failApi?: string
    showOperateRecord?: boolean // 是否显示操作记录
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
    importFileType?: 'excel' | 'word' | 'image'
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
    name?: string // 文件名称
    url: string // 文件路径
    organizationCode?: string // 机构Code
    practiceCode?: string // 导入用户关联的刷题code
    belongType?: number
    skill?: number
    subject?: number
    authenticateCode?: string // 要素细目表code
    templateType?: string
    commonJob?: {
        jobNameCode: number
        jobName: string
        jobType: string
        jobTypeCode: number
        jobLevel: string
        jobLevelCode: number
    }
}

// 导入结果
export interface ResultParams {
    code: string // 导入记录的code
    businessType?: number // 业务类型
    organizationCode?: string // 机构Code
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
    result?: ResultDomProps
    errorFileUrl?: string
    past?: boolean
    failApi?: string
    type?: string
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

export interface ImportListType {
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
