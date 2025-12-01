interface FormValuesType {
    name: string
    companyCode: string
    creditImage: any
    legalPersonName: string
    manualCertifyFlag: boolean
    certifyCompanyType: number
    certifyDocumentType: number
    attachments: any[]
}
interface StateType {
    code: string
    name: string
}

export { FormValuesType, StateType }
