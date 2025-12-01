/**
 * @ File:
 * @ Description:
 * @ Author: cqh
 * @ Create Time: 2022-12-22 16:38:15
 * @ Modified by: rong-log
 * @ Modified time: 2022-12-22 18:08:04
 */

export interface InvoiceType {
    code: string
    name: string
    makeType: number
    invoiceNo: string
    invoiceTitle: string
    amount: string
    invoiceType: number
    status: number
    highlightInvoiceNo: string
}

export interface paramsType {
    invoiceNo?: string
    status: number
}

export interface pagination {
    pageNo: number
    pageSize: number
}

export type paramsAllType = Partial<paramsType> & pagination
