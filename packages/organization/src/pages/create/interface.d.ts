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
    address?: string
    addressList?: [string, string, string]
    industry?: [string, string]
    name?: string | number
    scale?: string | number
    mobile?: string | number
    security?: string | number
    province?: string | number
    city?: string | number
    area?: string | number
    industryId?: string | number
    logo: string
}

export { IndustryOption, Scale, FormDataType, FormValuesType }
