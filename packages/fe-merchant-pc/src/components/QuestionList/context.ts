import React from 'react'
import { SUBJECT_TYPE_ENUM } from '@/constants'

// 题库列表Context
export const QuestionListWrapperContext = React.createContext<{
    subject?: number // 10 真题 20 模拟题
}>({
    subject: SUBJECT_TYPE_ENUM.REAL,
})
