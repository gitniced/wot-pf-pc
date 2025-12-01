/*
 * @Author:cmm
 * @Date: 2023-01-04 19:29:07
 * @Last Modified by: cmm
 * @Last Modified time: 2023-01-12 22:04:18
 */

import type { StatusMap } from '@/components/Order/PointItem/interface'
import { invoiceStateEnum } from '@/pages/invoice/constants'

/** 合同订单业务类型 */
export const ORDER_BUSINESS_TYPE: Record<string, number> = {
    /** 班级 */
    CLASS: 1,
    /** 计划 */
    PLAN: 2,
}
export const ORDER_BUSINESS_TEXT: Record<string, string> = {
    [ORDER_BUSINESS_TYPE.CLASS]: '班级',
    [ORDER_BUSINESS_TYPE.PLAN]: '计划',
}

/**
 * 订单状态
 */
const ORDER_STATUS_MAP: StatusMap = {
    '1': { name: '未支付', type: 'warning' },
    '2': { name: '支付待确认', type: 'processing' },
    '3': { name: '已支付', type: 'success' },
    '4': { name: '已完成', type: 'success' },
    '5': { name: '已关闭', type: 'default' },
    '6': { name: '部分支付', type: 'default' },
}

/**
 * 退款单状态
 */
const REFUND_STATUS_MAP: StatusMap = {
    '-1': { name: '-', type: undefined },
    '0': { name: '待审核', type: 'warning' },
    '1': { name: '退款中', type: 'processing' },
    '2': { name: '已完成', type: 'success' },
    '3': { name: '申请失败', type: 'error' },
}

/**
 * 开票状态文字提示
 */
const INVOICE_STATUS_MAP: StatusMap = {
    [invoiceStateEnum.EXAMINE]: { name: '待审核', type: 'warning' },
    [invoiceStateEnum.PADDING]: { name: '待开票', type: 'warning' },
    [invoiceStateEnum.DOING]: { name: '开票中', type: 'processing' },
    [invoiceStateEnum.RESOLV]: { name: '已开票', type: 'success' },
    [invoiceStateEnum.REJECT]: { name: '开票失败', type: 'error' },
    [invoiceStateEnum.REDINVOiCING]: { name: '红冲中', type: 'processing' },
    [invoiceStateEnum.REDINVOiCED]: { name: '已红冲', type: 'success' },
}

/**
 * 退款单状态文字提示
 */
const ORDER_REFUND_STATUS_MAP: StatusMap = {
    '-1': { name: '-', type: undefined },
    '0': { name: '无退款', type: 'default' },
    '1': { name: '退款中', type: 'processing' },
    '2': { name: '已退款', type: 'success' },
}

/**
 * 是由有退款单的枚举
 */
export enum isRefund {
    NO = 0,
    YES = 1,
}

/**
 * 二维码支付状态
 */
export enum QrCodeStatus {
    success = 1,
}

/**
 * 订单支付方式
 */
export enum OrderPlayMethods {
    /** 支付宝支付 */
    Play = 0,
    /** 微信支付 */
    Wx = 1,
    /** 线下支付 */
    Down = 2,
}

/**
 * 支付方式文字内容的枚举
 */
export const OrderPlayMethodsTextMap: Record<number, string> = {
    [OrderPlayMethods.Play]: '支付宝支付',
    [OrderPlayMethods.Wx]: '微信支付',
    [OrderPlayMethods.Down]: '线下支付',
}

export const orderUpPlayText: Record<string, string> = {
    [OrderPlayMethods.Play]: '支付宝',
    [OrderPlayMethods.Wx]: '微信',
}

/** 优惠名称列表 */
export const preferentialList = [
    {
        label: '大客户优惠',
        value: '1',
    },
    {
        label: '阶梯优惠',
        value: '2',
    },
    {
        label: '预付优惠',
        value: '3',
    },
    {
        label: '特殊优惠',
        value: '4',
    },
    {
        label: '奖励优惠',
        value: '5',
    },
]
export const getPreferentialNameByType = (type: string | number) => {
    const target = preferentialList.find(item => item.value === type.toString()) || { label: '' }
    return target.label
}
export { ORDER_STATUS_MAP, REFUND_STATUS_MAP, INVOICE_STATUS_MAP, ORDER_REFUND_STATUS_MAP }

/** 开票状态---start */
/** 待审核（用户提交）*/
export const WAIT_VERIFY = 1
/** 待开票（锄禾提交、审核通过）*/
export const WAIT_INVOICE = 2
/** 开票失败（已驳回、第三方) */
export const INVOICE_FAIL = 3
/** 已开票（开票成功、红冲失败）*/
export const INVOICE_SUCCESS = 4
/** 红冲中 */
export const INVOICE_OFFSETING = 5
/** 已红冲 */
export const INVOICE_OFFSETED = 6
/** 开票中 */
export const INVOICING = 20
/** 开票状态---end */

/** 开票状态文本 */
export const INVOICE_STATUS_STRING: Record<string, string> = {
    /** 待审核 */
    [WAIT_VERIFY]: '待审核',
    /** 待开票 */
    [WAIT_INVOICE]: '待开票',
    /** 开票失败 */
    [INVOICE_FAIL]: '开票失败',
    /** 已开票 */
    [INVOICE_SUCCESS]: '已开票',
    /** 红冲中 */
    [INVOICE_OFFSETING]: '红冲中',
    /** 已红冲 */
    [INVOICE_OFFSETED]: '已红冲',
    /** 开票中 */
    [INVOICING]: '开票中',
}

//开票状态
export const INVOICE_STATUS_ENUM = [
    {
        label: INVOICE_STATUS_STRING[WAIT_VERIFY],
        value: WAIT_VERIFY,
    },
    {
        label: INVOICE_STATUS_STRING[WAIT_INVOICE],
        value: WAIT_INVOICE,
    },
    {
        label: INVOICE_STATUS_STRING[INVOICE_FAIL],
        value: INVOICE_FAIL,
    },
    {
        label: INVOICE_STATUS_STRING[INVOICE_SUCCESS],
        value: INVOICE_SUCCESS,
    },
    {
        label: INVOICE_STATUS_STRING[INVOICE_OFFSETING],
        value: INVOICE_OFFSETING,
    },
    {
        label: INVOICE_STATUS_STRING[INVOICE_OFFSETED],
        value: INVOICE_OFFSETED,
    },
    {
        label: INVOICE_STATUS_STRING[INVOICING],
        value: INVOICING,
    },
]
