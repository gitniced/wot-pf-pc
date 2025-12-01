import React from 'react'
import { Badge, Button } from 'antd'
import styles from './index.module.less'
import { getGoodsPopover } from '../..'
import dayjs from 'dayjs'
import { history } from 'umi'
import { orderStatusPoint, orderStatusText } from '../const'

function OrderItem({ data }: { data: Record<string, any> }) {
    return (
        <div className={styles.order_item}>
            <div className={styles.order_item_title}>
                <div className={styles.order_item_title_left}>
                    <span>订单编号：{data.orderNo}</span>
                    <span>买家：{data.buyerName}</span>
                </div>
                <div className={styles.order_item_title_right}>
                    {data.createdAt ? dayjs(data.createdAt).format('YYYY-MM-DD HH:mm:ss') : ''}
                </div>
            </div>
            <div className={styles.order_item_body}>
                <div className={styles.order_item_body_goods}>
                    {data.orderGoodsDtos?.map((children: Record<string, any>) => {
                        return (
                            <div className={styles.order_item_body_goods_item} key={children.code}>
                                <div className={styles.order_item_body_goods_item_goods}>
                                    <div className={styles.order_item_body_goods_item_goods_image}>
                                        <img src={children.goodsImage} alt={children.goodsName} />
                                    </div>
                                    <div className={styles.order_item_body_goods_item_goods_desc}>
                                        <div
                                            className={styles.order_item_body_goods_item_goods_name}
                                        >
                                            {getGoodsPopover(children.goodsName || '')}
                                        </div>
                                        {children.goodsAttributes && (
                                            <div
                                                className={
                                                    styles.order_item_body_goods_item_goods_attr
                                                }
                                            >
                                                {children.goodsAttributes}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className={styles.order_item_body_goods_item_price}>
                                    {children.price}
                                </div>
                                <div className={styles.order_item_body_goods_item_num}>
                                    {children.quantity}
                                </div>
                                <div className={styles.order_item_body_goods_item_after}>
                                    {children.hasRefund ? (
                                        <Button
                                            type="link"
                                            onClick={() => {
                                                history.push(
                                                    `/transaction/refund?goodsCode=${children.code}&goodsName=${children.goodsName}&orderNo=${data.orderNo}`,
                                                )
                                            }}
                                        >
                                            售后详情
                                        </Button>
                                    ) : null}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className={styles.order_item_body_status}>
                    <Badge
                        status={orderStatusPoint[data.status] || 'default'}
                        text={orderStatusText[data.status]}
                    />
                    <Button
                        type="link"
                        onClick={() => {
                            history.push(`/transaction/order/detail?code=${data.code}`)
                        }}
                    >
                        详情
                    </Button>
                </div>
                <div className={styles.order_item_body_price}>￥{data.totalAmount}</div>
            </div>
            <div className={styles.order_item_footer}>
                <div>备注信息：</div>
                <div>{data.remark}</div>
            </div>
        </div>
    )
}

export default OrderItem
