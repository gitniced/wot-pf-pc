import type { ModalProps } from 'antd'
import type { UploadFile } from 'antd/es/upload/interface'
import type { IRoute } from 'umi'

export interface GroupEnrollQuery extends IRoute {
    activityCode: string
    record?: string
}

export interface CityItem {
    code: string
    level?: number
    name: string
    parentCode?: string
}

export interface BatchImportProps extends Omit<ModalProps, 'onOk' | 'onCancel'> {
    importFile?: UploadFile
    importApi?: string
    onOk: (importCode: string, file: UploadFile) => void
    onReset: () => void
}

// 导入之前
export interface BeforeProps {
    onChange: (file: UploadFile) => void
    currentFile?: UploadFile
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
}
// 失败记录
export interface FailRecordItem {
    line: number // 行数
    content: string // 内容
    errorMsg: string // 错误原因
}

// 文件上传
export interface FileUpload {
    file: File
    type: number
    isPrivate: boolean
}

// 导入
export interface ImportParams {
    name: string // 联系人姓名
    mobile: string // 联系人手机号
    fileUrl: string // 文件路径
    participatingArea: CityItem[]
    position: string // 职务
    workAddress: string // 工作单位
    gender: number // 性别
    certificateType: number // 证件类型
    idCardNo: string // 证件号码
    activityCode: string // 活动code
    organizationCode: string // 机构code
    applyChannel: number
}

// 导入结果
export interface ResultParams {
    code: string // 导入记录的code
    businessType?: number // 业务类型
    organizationCode: string // 机构Code
}
