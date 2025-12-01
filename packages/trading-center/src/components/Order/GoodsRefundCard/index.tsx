import React from 'react'
import styles from './index.module.less'
import { filterNum } from '@/utils/numberTransform'
import { observer } from 'mobx-react'
import { Tooltip } from 'antd'
import type { OrderGoodInfoType } from '@/pages/refund/apply/interface'

const GoodsRefundCard = observer(
    ({ goodsDetail }: { goodsDetail: OrderGoodInfoType; goodsAmount?: number }) => {
        return (
            <div className={styles.card}>
                <div className={styles.image_warp}>
                    <img src={goodsDetail?.goodsImage} alt="" className={styles.image} />
                </div>
                <div className={styles.describe}>
                    <div className={styles.name}>{goodsDetail?.goodsName || '-'}</div>
                    <Tooltip
                        title={
                            <div className={styles.hover_text}>{goodsDetail?.goodsAttributes}</div>
                        }
                    >
                        <div className={styles.cycle}>{goodsDetail?.goodsAttributes}</div>
                    </Tooltip>
                </div>
                <div className={styles.item_data}>
                    <div>
                        <div className={styles.item_data_title}>实付单价</div>
                        <div>￥{filterNum(goodsDetail?.preferentialPrice ?? 0)}</div>
                    </div>
                    <div>
                        <div className={styles.item_data_title}>数量</div>
                        <div>x{goodsDetail?.quantity ?? ''}</div>
                    </div>
                    <div>
                        <div className={styles.item_data_title}>实付款</div>
                        <div style={{ color: 'var(--primary-color)' }}>
                            {/* ￥{fixedNumber(goodsAmount)} */}¥{goodsDetail.remainRefundAmount}
                        </div>
                    </div>
                </div>
            </div>
        )
    },
)

export default GoodsRefundCard
