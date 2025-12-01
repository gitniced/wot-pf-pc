import type { AnyObj } from '@/types/index'

export interface ModalProps {
    uniKey: string
    visible: boolean
    styles?: AnyObj
    onConfirm: () => void
    onCancel: () => void
}

export interface IFormData {
    code: string
}
