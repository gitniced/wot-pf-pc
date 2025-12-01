import type { ModalProps } from 'antd'
import type { QuestionListItem } from '../../interface'

export interface ModalData {
    visible: boolean
    data?: QuestionListItem
}
export interface PreviewModalProps extends Omit<ModalProps, 'onCancel'> {
    onCancel: () => void
    previewData: ModalData
}
