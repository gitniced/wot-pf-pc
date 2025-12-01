import type React from 'react'

import type { ModalProps } from 'antd'
import type { UploadFile } from 'antd/es/upload/interface'

export interface BatchImportProps extends Omit<ModalProps, 'onOk' | 'onCancel'> {
    importApi: string
    onOk: (isSuccess: boolean, response: any, query: any) => void
    onCancel: () => void
    businessType?: number // 业务code 1试题-excel 2试题word 3刷题用户
    importFileType?: 'excel' | 'word'
    importTemplate?: string // 导入模版
    description?: React.ReactNode // 导入说明
    practiceCode?: string // 导入用户关联的刷题Code
    authenticateCode?: string // 要素细目表code
    showContinue?: boolean // 是否允许继续导入
    title?: string // 标题
    templateType?: string
    skill?: number
    subject?: number
    commonJob?: { label: string; value: number }[]
}

// 导入之前
export interface BeforeProps {
    onChange: (file: UploadFile) => void
    importTemplate?: string // 导入模版
    description?: React.ReactNode // 导入说明
    subject?: number
    practiceCode?: string
    importFileType?: 'excel' | 'word'
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
    importFileType?: 'excel' | 'word'
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
    organizationCode: string // 机构Code
}
