import React from 'react'
import styles from './index.module.less'
import { getGoodsPopover } from '../..'
import dayjs from 'dayjs'
import { REFUND_STATUS, refundText } from '../const'
import { Badge } from 'antd'

function OrderItem({ data }: { data: Record<string, any> }) {
    const pointStatus: Record<string, any> = {
        [REFUND_STATUS.examine]: 'warning',
        [REFUND_STATUS.padding]: 'processing',

        [REFUND_STATUS.success]: 'success',
        [REFUND_STATUS.reject]: 'error',
    }
    return (
        <div className={styles.order_item}>
            <div className={styles.order_item_title}>
                <div className={styles.order_item_title_left}>
                    <span>订单编号：{data.orderNo}</span>
                    <span>售后编号：{data.code}</span>
                </div>
                <div className={styles.order_item_title_right}>
                    {data.createdAt ? dayjs(data.createdAt).format('YYYY-MM-DD HH:mm:ss') : null}
                </div>
            </div>
            <div className={styles.order_item_body}>
                <div className={styles.order_item_body_goods}>
                    <div className={styles.order_item_body_goods_item}>
                        <div className={styles.order_item_body_goods_item_goods}>
                            <div className={styles.order_item_body_goods_item_goods_image}>
                                <img src={data.refundGoodsOrder?.goodsImage} alt="" />
                            </div>
                            <div className={styles.order_item_body_goods_item_goods_desc}>
                                <div className={styles.order_item_body_goods_item_goods_name}>
                                    {getGoodsPopover(data.refundGoodsOrder?.goodsName || '')}
                                </div>
                                {data.refundGoodsOrder?.goodsAttributes && (
                                    <div className={styles.order_item_body_goods_item_goods_attr}>
                                        {data.refundGoodsOrder?.goodsAttributes}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={styles.order_item_body_goods_item_num}>
                            {data.refundCount}
                        </div>
                        <div className={styles.order_item_body_goods_item_price}>
                            {data.refundAmount}
                        </div>
                        <div className={styles.order_item_body_goods_item_state}>
                            <Badge
                                status={pointStatus[data.status]}
                                text={refundText[Number(data.status)]}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.order_item_footer}>
                <div>原因：</div>
                <div>{data.refundReason}</div>
            </div>
        </div>
    )
}

export default OrderItem
