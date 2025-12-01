interface FormDataType {
    code: string
    department: any[]
    isAdmin: boolean
    mobile: string
    name: string
    roleName: string
    isDirector: boolean
    userCode: string
    idCard?: string
    roleCode?: string
}

interface createAuthPropsType {
    idCard: string
    isAdmin: boolean
    mobile: string
    name: string
    roleCode: string
}

interface addAuthQueryType {
    type: string
    idCard?: string
    organizationCode: string
    departmentCode: string
}

interface ImportListType {
    code?: string
    createdAt: string
    fileName?: string
    rate: number
    showStatus?: number
    info: string
    status: number
    fileUrl: string
}

export { FormDataType, createAuthPropsType, addAuthQueryType, ImportListType }
