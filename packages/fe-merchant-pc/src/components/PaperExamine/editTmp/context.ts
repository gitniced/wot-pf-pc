import React from 'react'
import type { ModalType } from './enums'
import type { QuestionDetailType } from '../list/interface'
import type { ExamineDetailType } from './interface'

// 回调方法上下文
export const ExamineEditCallbackContext = React.createContext<{
    openModal?: (type: ModalType, data: any) => void
    handleSaveScore?: (value: string, item: QuestionDetailType['questionList'][0]) => void
    handleDeleteQuestion?: (item: QuestionDetailType['questionList'][0]) => void
}>({})

// 考试编辑值的上下文
export const ExamineEditValueContext = React.createContext<{
    questionList?: QuestionDetailType[]
    examDetail?: ExamineDetailType
}>({})

// 考试编辑wrapper
export const ExamineTmpWrapperContext = React.createContext<{
    isDetail?: boolean
}>({})
