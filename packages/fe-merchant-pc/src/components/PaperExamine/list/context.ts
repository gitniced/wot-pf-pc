import { SUBJECT_TYPE_ENUM } from '@/constants'
import React from 'react'

export const PaperExamineListContext = React.createContext<{
    subject: number
}>({
    subject: SUBJECT_TYPE_ENUM.REAL,
})
