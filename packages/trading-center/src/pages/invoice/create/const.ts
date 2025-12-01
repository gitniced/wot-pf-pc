import { INVOICE_HEADER, INVOICE_KIND } from './interface'

/**
 * 开票类型列表
 */
export const invoiceKindList = [
    {
        label: '增值税普通发票',
        value: INVOICE_KIND.NORMAL_INVOICE,
    },
    {
        label: '增值税专用发票',
        value: INVOICE_KIND.VAT_INVOICE,
    },
]
/**
 * 抬头类型列表
 */
export const invoiceHeaderTypeList = [
    {
        label: '企业',
        value: INVOICE_HEADER.COMPANY,
    },
    {
        label: '个人',
        value: INVOICE_HEADER.PERSONAL,
    },
]
