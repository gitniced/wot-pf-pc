interface TableDataType {
    key: string
    name: string
    age: number
    address: string
    tags: string[]
}
interface PermissionTreeType {
    title: string
    type?: number
    platformName?: string
    key: number
    route?: string
    has?: boolean
    pid?: number
    moduleId?: number
    children?: PermissionTreeType[]
    checkChild?: number[]
    changeEnable?: boolean
}

interface RolePermissionProps {
    roleCode?: string
    organizationCode: string
    checkChange: any
}

export { TableDataType, PermissionTreeType, RolePermissionProps }
