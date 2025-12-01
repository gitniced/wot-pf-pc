interface LoadingOption {
    value: string | number
    label: string
    children?: LoadingOption[]
    isLeaf?: boolean
    loading?: boolean
    id?: number
}

interface PropsType {
    api: string
    placeholder?: string
    onChange?: (a: any) => void
    onBlur?: (a: any) => void
    value?: string[]
    disabled?: boolean
}

export { LoadingOption, PropsType }
