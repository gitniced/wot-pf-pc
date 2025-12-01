interface FormDataType {
    serial: string | number
    code: string
    createdAt: string
    mobile: string
    userName: string
    reason: string
    key: string
    status: number
}

interface FormPropsType {
    name?: string | number
    mobile?: string
}

export { FormDataType, FormPropsType }
