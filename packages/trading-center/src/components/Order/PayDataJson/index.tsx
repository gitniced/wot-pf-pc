import React from 'react'
// import { filterNum } from '@/utils/numberTransform'
import PointItem from '../PointItem'
import { ORDER_STATUS_MAP, OrderPlayMethodsTextMap } from '@/pages/order/const'
import { formatString } from '../CommodityItem'
import { Image } from 'antd'
import dayjs from 'dayjs'
// import { subtractingTwoNumbers } from '@/utils/sumTwoNumbers'

export default function PayDataJson(orderDetail: any, money: string) {
    let paymentDataJson: any[] = []

    // const getPaymentAmount = () => {
    //     /**
    //      *  status 订单状态，1未支付、6部分支付、2支付待确认、3已支付、4已完成、5已关闭
    //      */
    //     const { status = '', payAmount = 0, paidAmount = 0 } = orderDetail || {}

    //     if (status === 6) {
    //         let res = subtractingTwoNumbers(payAmount, paidAmount)
    //         return filterNum(res)
    //     } else {
    //         return filterNum(payAmount)
    //     }
    // }

    if (orderDetail?.onlinePayment?.code) {
        paymentDataJson = [
            {
                label: '支付方式：',
                value: OrderPlayMethodsTextMap[orderDetail.payType] || '-',
            },
            {
                label: '支付状态：',
                value: (() => {
                    return (
                        <PointItem
                            status={orderDetail.status as unknown as string}
                            statusMap={ORDER_STATUS_MAP}
                        />
                    )
                })(),
            },
            {
                label: '支付金额：',
                value: '￥' + money,
            },
            {
                label: '支付时间：',
                value: orderDetail?.onlinePayment?.tradeTime
                    ? dayjs(+orderDetail?.onlinePayment?.tradeTime).format(formatString)
                    : '-',
            },
            {
                label: '交易流水：',
                value: orderDetail?.onlinePayment?.tradeNo || '-',
            },
            {
                label: '交易账户：',
                value: orderDetail?.onlinePayment?.payAccount || '-',
            },
        ]
    } else if (orderDetail?.offlinePayment?.code) {
        paymentDataJson = [
            {
                label: '支付方式：',
                value: '线下支付-电汇',
            },
            {
                label: '支付时间：',
                value: orderDetail?.offlinePayment?.createdAt
                    ? dayjs(+orderDetail.offlinePayment?.createdAt).format(formatString)
                    : '-',
            },
            {
                label: '支付凭证：',
                value: orderDetail?.offlinePayment?.paymentProof ? (
                    <Image
                        style={{
                            maxWidth: '88px',
                            maxHeight: '88px',
                        }}
                        src={orderDetail?.offlinePayment?.paymentProof}
                    />
                ) : (
                    '-'
                ),
                // type: 'image',
                itemStyle: { alignItems: 'start' },
                valueStyle: {
                    overflow: 'visible',
                    whiteSpace: 'pre-wrap',
                },
            },

            {
                label: '备注信息：',
                value: orderDetail?.offlinePayment?.paymentRemark || '-',
                itemStyle: { alignItems: 'start' },
                valueStyle: {
                    overflow: 'visible',
                    whiteSpace: 'pre-wrap',
                    width: '390px',
                    overflowWrap: 'break-word',
                },
            },
        ]
    }
    return paymentDataJson
}
