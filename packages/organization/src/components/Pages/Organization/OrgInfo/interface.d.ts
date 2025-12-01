interface IndustryOption {
    value: string | number
    label: string
    children?: IndustryOption[]
    isLeaf?: boolean
    loading?: boolean
    id?: number
}

interface Scale {
    key: string | number
    name: string
}
interface FormDataType {
    key: React.Key
    siteName: string
    serial: number
    name: string
    userName: number
    staffCount: string
    updatedAt: string[]
    status: boolean
}

interface FormValuesType {
    address?: string[]
    industry?: string[]
    name?: string
    scale?: number
    mobile?: number
    security?: number
}

export { IndustryOption, Scale, FormDataType, FormValuesType }
