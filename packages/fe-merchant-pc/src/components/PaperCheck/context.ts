import { SUBJECT_TYPE_ENUM } from '@/constants'
import React from 'react'

export const PaperExamineCheckContext = React.createContext<{
    subject: number
}>({
    subject: SUBJECT_TYPE_ENUM.REAL,
})
