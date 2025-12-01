import type { ModalProps } from 'antd'
import type { QuestionItem } from '../QuestionCheck/interface'

export interface RepeatModalData extends ModalProps {
    subject: number
    callback?: () => void
    questionList: QuestionItem[]
}
