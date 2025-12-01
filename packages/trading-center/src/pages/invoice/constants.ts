/**
 * @ File:
 * @ Description:
 * @ Author: cqh
 * @ Create Time: 2022-12-22 15:07:19
 * @ Modified by: cqh
 * @ Modified time: 2023-06-12 21:26:52
 */

/**
 * 开票状态
 */
export enum invoiceStateEnum {
    EXAMINE = 1,
    PADDING = 2,
    REJECT = 3,
    RESOLV = 4,
    REDINVOiCING = 5,
    REDINVOiCED = 6,
    DOING = 20,
}

/**
 * 开票状态文字枚举
 */
export const invoiceState = [
    { name: '已开票', value: invoiceStateEnum.RESOLV },
    { name: '开票中', value: invoiceStateEnum.DOING },
    { name: '待审核', value: invoiceStateEnum.EXAMINE },
    { name: '待开票', value: invoiceStateEnum.PADDING },
    { name: '开票失败', value: invoiceStateEnum.REJECT },
    { name: '红冲中', value: invoiceStateEnum.REDINVOiCING },
    { name: '已红冲', value: invoiceStateEnum.REDINVOiCED },
]

/**
 * 开票状态 枚举
 */
export const invoiceStateMap: Record<string, string> = {
    [invoiceStateEnum.EXAMINE]: '待审核',
    [invoiceStateEnum.PADDING]: '待开票',
    [invoiceStateEnum.RESOLV]: '已开票',
    [invoiceStateEnum.REJECT]: '开票失败',
    [invoiceStateEnum.DOING]: '开票中',
    [invoiceStateEnum.REDINVOiCING]: '红冲中',
    [invoiceStateEnum.REDINVOiCED]: '已红冲',
}

/**
 * 开票类型枚举
 */
export enum invoiceTypeEnum {
    ORDINARY = 1,
    INCREMENT = 2,
}

/**
 * 开票类型文字
 */
export const invoiceType: Record<string, string> = {
    [invoiceTypeEnum.ORDINARY]: '增值税普通发票',
    [invoiceTypeEnum.INCREMENT]: '增值税专用发票',
}

/**
 * 身份 PEOPLE 个人 ENTERPRISE 企业
 */
export enum identityEnum {
    PEOPLE = 2,
    ENTERPRISE = 1,
}

/**
 * 身份类型对应的枚举
 */
export const identityTypeText: Record<string, string> = {
    [identityEnum.PEOPLE]: '个人',
    [identityEnum.ENTERPRISE]: '企业',
}

/**
 * 开票的类型 RED 红票 BLUE 蓝票
 */
export enum invoiceCategoryType {
    RED = 2,
    BLUE = 1,
}

/**
 * 类型对应的文字枚举
 */
export const invoiceCategoryTypeText: Record<string, string> = {
    [invoiceCategoryType.RED]: '红字发票',
    [invoiceCategoryType.BLUE]: '蓝字发票',
}
