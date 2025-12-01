import type { TaskSignTable } from '../../../interface'

export interface HandleModalProps {
    visible: boolean
    imgData: string
    handleCancel: () => void
    handleOk: (e: TaskSignTable) => void
    dataList: TaskSignTable[]
    signText: string
}
