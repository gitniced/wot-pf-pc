/**
 * @ Author: congrong
 * @ Create Time: 2022-12-22 11:10:13
 * @ Modified by: cmm
 * @ Modified time: 2023-02-01 19:14:06
 */

interface PayAbleListType {
    address?: string
    bankAccount?: string
    code?: string
    idCard?: string
    name?: string
    openningBank?: string
    phone?: string
    taxNum?: string
    titleName?: string
    type?: number
    userCode?: string
}

interface PayAbleObjType {
    pageNo: number
    pageSize: number
    companiesPageTotal: number
    personPageTotal: number
}

interface modalObjType {
    isModalOpen: boolean
    ModalTitle: string
    switchOne: number
}

export { PayAbleListType, PayAbleObjType, modalObjType }

export interface dataType {
    address?: string
    bankAccount?: string
    openningBank?: string
    phone?: string
    taxNum?: string
    titleName?: string
    type?: number
    code?: string
    idCard?: string
    name?: string
}
