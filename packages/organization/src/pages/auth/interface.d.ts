interface createAuthPropsType {
    idCard: string
    isAdmin: boolean
    mobile: string
    name: string
    roleCode: string
    departmentCode: string
}

interface addAuthQueryType {
    type: string
    idCard?: string
    organizationCode: string
    departmentCode: string
}

interface addAuthQueryType {
    type: string
    idCard?: string
    organizationCode: string
    departmentCode: string
}

interface StateType {
    name: string
    idCard: string
    mobile: string
    roleCode?: string
    departmentCode: string
}

export { createAuthPropsType, addAuthQueryType, StateType }
