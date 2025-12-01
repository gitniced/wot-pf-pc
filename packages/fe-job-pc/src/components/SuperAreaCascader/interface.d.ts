import { UserRegion } from '@/pages/admin/service/hierarchical-diagnosis/list/interface'

interface AreaOption {
    value: string | number
    label: string
    children?: AreaOption[]
    isLeaf?: boolean
    loading?: boolean
    id?: number
    level?: number
    disabled?: boolean
}

export type Type = 'city' | 'area' | 'street' | 'village'

interface PropsType {
    // 精确到市级(city)或者区级别(area)
    type: Type
    onChange?: (a: any) => void
    onBlur?: (a: any) => void
    value?: string[]
    defaultValue?: (string | undefined)[]
    disabled?: boolean
    backAll?: boolean
    key?: string
    userRegion?: Partial<UserRegion>
    allowValue?: (string | undefined)[]
    changeOnSelect?: boolean
}

export { AreaOption, PropsType }
