import type React from 'react'

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
    departmentCode?: string
    enable?: number
    isValidateIdCard?: boolean
}

interface PropsType {
    dataSource: any[]
    pagination: any
    ownerCode: string
    userData: any
    orgUserCode: string
    departmentCode: React.Key
    delAuth: (a: string) => void
    changeOwner: (a: any) => void
}

export { FormDataType, PropsType }
