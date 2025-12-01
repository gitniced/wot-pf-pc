import dayjs from 'dayjs'
import type { ProColumns } from '@ant-design/pro-table'
import type { ProTableSearch } from '@/components/GlobalTable/interface'
import { DatePicker } from '@/components/Picker'
import PointItem from '@/components/Order/PointItem'
import { Input } from 'antd'
import React from 'react'
import { ORDER_STATUS_MAP, ORDER_REFUND_STATUS_MAP } from '@/pages/order/const'
import { getValueFromEvent } from '@/components/RemoveSpaces'

const { RangePicker } = DatePicker

export enum REFUND_STATUS {
    'NO_REFUND' = -1,
    'WAIT_REFUND',
    'REFUNDING',
    'REFUNDED',
    'REFUND_FAIL',
}

export enum REFUND_STATUS_NAME {
    '-' = -1,
    '待审核',
    '退款中',
    '已完成',
    '申请失败',
}

export enum UNPAY_ORDER_STATUS {
    'UNPAY' = 0,
    'UNPAY_DELAY' = 4,
    'UNPAY_OVERTIME' = 5,
}

export enum ORDER_STATUS_NAME {
    '未支付',
    '已完成',
    '已关闭',
    '支付待确认',
    '未支付(延期支付)',
    '未支付(已逾期)',
}

export type TABLE_ITEM = {
    availableAmount: number //可开票金额
    code: string //订单编码
    createdAt: number //下单时间
    orderNo: string //订单ID
    refundStatus: number //退款单状态 0待审核 1退款中 2已完成 3申请失败
    status: number //	订单状态，0未支付、1已支付、2已关闭、3支付待确认、4未支付(延期支付)、5未支付(已逾期)
    payAmount: number //订单金额
    paidAmount: number //已支付金额
}

export const TABLE_COLUMNS: ProColumns<TABLE_ITEM>[] = [
    {
        title: '订单编号',
        dataIndex: 'orderNo',
        key: 'orderNo',
        align: 'center',
        width: '25%',
        formItemProps: {
            getValueFromEvent: getValueFromEvent,
        },
        renderFormItem: () => {
            return <Input placeholder={'请输入'} />
        },
    },
    {
        title: '下单时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        align: 'center',
        width: '15%',
        renderFormItem: () => {
            return <RangePicker placeholder={['请选择', '请选择']} />
        },
        search: {
            transform: (value: any) => {
                if (value) {
                    return {
                        startTime: dayjs(value[0].$d).format('x'),
                        endTime: dayjs(value[1].$d).format('x'),
                    }
                } else {
                    return {}
                }
            },
        },
        render: (_, { createdAt }: TABLE_ITEM) => {
            return <div> {dayjs(createdAt).format('YYYY-MM-DD HH:mm') ?? '-'}</div>
        },
    },
    {
        title: '订单金额',
        dataIndex: 'payAmount',
        key: 'payAmount',
        align: 'center',
        width: '15%',
        search: false,
        render: _ => {
            return <div>￥{_}</div>
        },
    },
    {
        title: '可开票金额',
        dataIndex: 'availableAmount',
        key: 'availableAmount',
        align: 'center',
        width: '15%',
        search: false,
        render: _ => {
            return <div>￥{_}</div>
        },
    },
    {
        title: '订单状态',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        width: '15%',
        search: false,
        render: _ => {
            return <PointItem status={_ as unknown as string} statusMap={ORDER_STATUS_MAP} />
        },
    },
    {
        title: '退款状态',
        dataIndex: 'refundStatus',
        key: 'refundStatus',
        align: 'center',
        width: '15%',
        search: false,
        render: _ => {
            return <PointItem status={_ as unknown as string} statusMap={ORDER_REFUND_STATUS_MAP} />
        },
    },
]

export const SEARCH_CONFIG: ProTableSearch = {
    searchText: '查询',
    resetText: '重置',
    collapseRender: false,
}
