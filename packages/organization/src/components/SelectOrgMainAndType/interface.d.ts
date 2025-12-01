export interface ISelectAuthSubjectProps {
    value?: number
    onChange?: (value: number) => void
    disabled?: boolean
    form?: any
}

export interface ISelectCertificateProps {
    value?: number
    onChange?: (value: number) => void
    /**  选择认证主体  */
    subject?: number
    disabled?: boolean
}

export interface ISelectCertItemsType {
    id: number
    list: {
        url: string
        id: number
        title: string
        dec: string
    }[]
}
