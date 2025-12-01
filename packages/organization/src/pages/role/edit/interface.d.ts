interface RoleDataType {
    code: string
    name: string
    description: number
    address: string
}
interface RoleQueryType {
    type: string
    code?: string
    step?: number
}

export { RoleDataType, RoleQueryType }
