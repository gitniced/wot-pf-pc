import type { UploadFile } from 'antd/es/upload/interface'
export interface FormValuesType {
    orderCode?: string
    proof: UploadFile[]
    remark: string
}
