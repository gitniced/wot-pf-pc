import type { ModalProps } from 'antd'

export interface IScientificCalculator extends Omit<ModalProps, 'onCancel'> {
    onCancel: () => void
}
