import type { ModalProps } from 'antd'
import type { CreateOptionItem, OptionItem, QuestionListItem } from '../interface'
import type { QuestionItem } from '../check/interface'

export interface EditQuestionItem extends QuestionListItem {
    commonJob?: number[]
}
export interface BasicQuestionProps {
    questionItem: EditQuestionItem
    onChange: (field: string, value: any) => void
}

export interface ComposeQuestionProps {
    questionItem: EditQuestionItem
    onChange: (field: string, value: any) => void
}
export interface OptionFormValues {
    optionList?: CreateOptionItem[] // 选项
}

interface TitleProps {
    title?: string
    value?: string
    onChange: (title: string) => void
}

export interface OptionsProps {
    questionType: number // 题目类型 单选 ｜ 多选
    optionList?: OptionItem[] // 选项
    onChange: (optionList: OptionItem[]) => void
}

export interface AnalysisProps {
    value?: string
    onChange: (analysis?: string) => void
}

// 答案放在选项的第一个（后端是这么设计的）
export interface AnswerProps {
    showLabel?: boolean
    optionList?: OptionItem[] // 选项
    onChange: (optionList: OptionItem[]) => void
}

export interface OptionInnerProps {
    optionList: OptionItem[]
    onChange: (optionList: OptionItem[]) => void
}

export interface RepeatModalData extends ModalProps {
    callback?: () => void
    questionList: QuestionItem[]
}
