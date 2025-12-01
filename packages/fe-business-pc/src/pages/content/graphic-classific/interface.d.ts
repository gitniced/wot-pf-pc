export interface graphicType {
    code: string
    createdAt: string | number
    name: string
    organizationCode: string
}

export interface nameObjType {
    name: string
    organizationCode?: string
}

export interface IProps {
    visible: boolean
    onCancel: () => void
    onSubmit: (data: graphicType, callback: () => void) => void
    records: graphicType | undefined
}
