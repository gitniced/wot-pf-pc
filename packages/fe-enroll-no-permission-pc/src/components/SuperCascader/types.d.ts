import type { InputProps } from 'antd'

export interface SuperCascaderPropsType {
    children?: any
    onInputChange: (value, position) => Promise<{ data: any[] }>
    onScrollEnd: (position) => void
    isUsingScrollEnd: boolean
    scrollThreshold: number
    option: any[]
    value: any[]
    isFirstRequest: boolean
    extraOptions: any[]
    mode: 'select' | 'casecader'
    maxMultipleSelectLength: number
    isOpenFocus: boolean
    colSetting: Partial<{
        onInputChange: (value, position) => Promise<{ data: any[]; isNext: boolean }>
        onScrollEnd: (position) => Promise<{ data: any[] }>
        onEventChange: (
            { input: string, page: number },
            tag: 'input' | 'scroll',
        ) => Promise<{ data: any[]; nextPage: number; isNext: boolean }>
        isUsingScrollEnd: boolean
        isUsingInputChange: boolean
        placeholder: string
        inputProps: InputProps
    }>[]
}
