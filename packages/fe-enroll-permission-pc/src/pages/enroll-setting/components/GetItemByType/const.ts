import type React from 'react'

export enum ITEM_TYPE_ENUM {
    DATEPICKER = 'DATEPICKER',
    TIMEPICKER = 'TIMEPICKER',
    INPUT = 'INPUT',
    SELECT = 'SELECT',
    CATEGORY = 'CATEGORY',
    TEXTAREA = 'TEXTAREA',
    UPLOAD = 'UPLOAD',
    RADIO = 'RADIO',
    EDITOR = 'EDITOR',
}

export interface GetItemTypeOptions extends Record<string, any> {
    placeholder?: string
    suffix?: React.ReactNode
    disabled?: boolean
    disabledTime?: boolean
    disabledDate?: boolean
    limitDate?: number
    maxLength?: number
    options?: any
    autoSize?: { minRows: number; maxRows: number }
    showCount?: boolean
    editorText?: string
    setEditorText?: (content: string) => void
}
