export enum STEP_ENUM {
    FIRST_STEP = '0',
    SECOND_STEP = '1',
}

export enum ORDER_STATUS_ENUM {
    ALL = '-1',
    WAIT_PAY = '0',
    PAYED = '1',
    CLOSED = '2',
    PAYED_CONFIRM = '3',
}

export const ORDER_TAB = [
    {
        label: '全部订单',
        key: ORDER_STATUS_ENUM.ALL,
    },
    {
        label: '已完成订单',
        key: ORDER_STATUS_ENUM.PAYED,
    },
    {
        label: '支付待确认订单',
        key: ORDER_STATUS_ENUM.PAYED_CONFIRM,
    },
    {
        label: '未支付订单',
        key: ORDER_STATUS_ENUM.WAIT_PAY,
    },
]

export enum INVOICE_KIND {
    /** 普票 */
    'NORMAL_INVOICE' = 1,
    /** 专票 */
    'VAT_INVOICE' = 2,
}
export enum INVOICE_HEADER {
    /** 企业 */
    'COMPANY' = 1,
    /** 个人 */
    'PERSONAL' = 2,
}

export const INVOICE_HEADER_TYPE_NAME = {
    '1': '企业',
    '2': '个人',
}

export type HEADER_ITEM = {
    address: string //地址
    bankAccount: string //银行账号
    code: string //唯一编码
    idCard: string //身份证号
    name: string //姓名
    openningBank: string //开户行
    phone: string //电话
    taxNum: string //税号
    titleName: string //抬头名称
    type: keyof typeof INVOICE_HEADER_TYPE_NAME //抬头类型，1：企业，2：个人
    userCode: string //用户编码
    active?: boolean //是否选中
}
