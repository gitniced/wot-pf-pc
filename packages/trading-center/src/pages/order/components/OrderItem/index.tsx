import React from 'react'
import styles from './index.module.less'
// import dayjs from 'dayjs'
import { Button, Modal, Space } from 'antd'
import {
    INVOICE_OFFSETING,
    INVOICE_SUCCESS,
    INVOICING,
    isRefund,
    WAIT_INVOICE,
    WAIT_VERIFY,
} from '../../const'
import { history } from 'umi'
import { STATUSENUM } from '../../interface.d'

function OrderItem({ data }: { data: Record<string, any> }) {
    const goodsOrderList = data.goodsOrderList

    const assertIsRefund = (
        goodsStatus: React.Key,
        orderStatus: React.Key,
        remainRefundQuantity: number,
    ) => {
        return (
            remainRefundQuantity !== 0 &&
            String(orderStatus) === STATUSENUM.SUCCESS_STATUS &&
            goodsStatus === isRefund.NO
        )
    }
    return (
        <div className={styles.order_item}>
            {/* <div className={styles.order_item_title}>
                <div className={styles.order_item_title_left}>
                    <span>订单编号：{data.orderNo}</span>
                    <span>退款编号：{data.code}</span>
                </div>
                <div className={styles.order_item_title_right}>
                    {data.createdAt ? dayjs(data.createdAt).format('YYYY-MM-DD HH:mm:ss') : null}
                </div>
            </div> */}
            <div className={styles.order_item_body}>
                <div className={styles.order_item_body_goods}>
                    {goodsOrderList?.map(item => {
                        return (
                            <div className={styles.order_item_body_goods_item} key={item.code}>
                                <div>
                                    <div className={styles.order_item_body_goods_item_goods_image}>
                                        <img src={item.goodsImage} alt={item.goodsName} />
                                    </div>
                                    <div className={styles.order_item_body_goods_item_goods_desc}>
                                        <div
                                            className={styles.order_item_body_goods_item_goods_name}
                                        >
                                            {item.goodsName}
                                        </div>
                                        {item.goodsAttributes && (
                                            <div
                                                className={
                                                    styles.order_item_body_goods_item_goods_attr
                                                }
                                            >
                                                {item.goodsAttributes}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div>￥{item.price}</div>
                                <div>x{item.quantity}</div>
                                <div>￥{Number(item.price * item.quantity).toFixed(2)}</div>
                                <div>
                                    <Space direction="vertical">
                                        {item.hasRefunded && (
                                            <Button
                                                type="link"
                                                href={`/refund?goodsId=${item.code}`}
                                                onClick={e => {
                                                    e.preventDefault()
                                                    history.push(`/refund?goodsId=${item.code}`)
                                                }}
                                            >
                                                查看退款
                                            </Button>
                                        )}
                                        {assertIsRefund(
                                            item.refundStatus,
                                            data.status,
                                            item.remainRefundQuantity,
                                        ) && (
                                            <Button
                                                type="link"
                                                href={
                                                    ![
                                                        WAIT_VERIFY,
                                                        WAIT_INVOICE,
                                                        INVOICING,
                                                        INVOICE_SUCCESS,
                                                        INVOICE_OFFSETING,
                                                    ].includes(data.invoicingStatus)
                                                        ? `/refund/apply?goodsId=${item.code}&orderId=${data.code}`
                                                        : undefined
                                                }
                                                onClick={e => {
                                                    e.preventDefault()
                                                    if (
                                                        ![
                                                            WAIT_VERIFY,
                                                            WAIT_INVOICE,
                                                            INVOICING,
                                                            INVOICE_SUCCESS,
                                                            INVOICE_OFFSETING,
                                                        ].includes(data.invoicingStatus)
                                                    ) {
                                                        history.push(
                                                            `/refund/apply?goodsId=${item.code}&orderId=${data.code}`,
                                                        )
                                                    } else {
                                                        Modal.warning({
                                                            centered: true,
                                                            title: false,
                                                            content: `当前订单申请开票中，请联系工作人员驳回开票申请，或等待开票完成再申请售后。`,
                                                            okText: '我知道了',
                                                        })
                                                    }
                                                }}
                                            >
                                                申请退款
                                            </Button>
                                        )}
                                    </Space>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            {/* <div className={styles.order_item_footer}>
                <div>备注：</div>
                <div>{data.remark}</div>
            </div> */}
        </div>
    )
}

export default OrderItem
