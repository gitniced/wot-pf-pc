import { ReactNode } from 'react'

interface AreaOption {
    value: string | number
    label: string
    children?: AreaOption[]
    isLeaf?: boolean
    loading?: boolean
    id?: number
}

interface PropsType {
    // 精确到市级(city)或者区级别(area)
    type: 'city' | 'area'
    onChange?: (a: any) => void
    onBlur?: (a: any) => void
    value?: string[]
    defaultValue?: string[]
    disabled?: boolean
    backAll?: boolean
    nationwideState?: number
    displayRender?: (label: string[]) => ReactNode
}

export { AreaOption, PropsType }
