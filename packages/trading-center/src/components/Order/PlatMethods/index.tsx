import React from 'react'
import styles from './index.module.less'
import { Radio, Space, message } from 'antd'
import { observer } from 'mobx-react'
import type { PayType } from '@/pages/order/payment/hooks'
function PlatMethods({
    onChange = (value: PayType) => {
        value
    },
    paymentCode,
    hasCompletedOnlineIncoming,
    payType,

    payStatus,
}: {
    onChange: (value: PayType) => void
    /** 是否为合并支付 */
    paymentCode: string
    /** 是否展示线上支付 */
    hasCompletedOnlineIncoming: boolean
    payType: 'online' | 'offline'
    /**  订单支付状态：1未支付、4待审核、5待上传凭（收款凭证）、6支付成功、7支付关闭  */
    payStatus: 1 | 4 | 5 | 6 | 7
}) {
    const onChangeItem = (e: any) => {
        if (payType === 'online' && payStatus === 5) {
            message.error('有进行中的线下支付，请联系平台工作人员处理')
            return
        }

        onChange?.(e.target.value)
    }

    return (
        <div className={styles.plat_methods}>
            <Radio.Group value={payType} onChange={onChangeItem} defaultValue="offline">
                {hasCompletedOnlineIncoming && (
                    <Radio.Button className={styles.check_list} value="online">
                        <Space>
                            <img
                                src="https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe_user_pc/images/png_xianshang.png"
                                alt="线上支付"
                                className={styles.play_icon}
                            />
                            <span className={styles.pay_text}>线上支付</span>
                        </Space>
                    </Radio.Button>
                )}
                {!paymentCode ? (
                    <Radio.Button className={styles.check_list} value="offline">
                        <Space>
                            <img
                                src="https://static.zpimg.cn/public/fe_user_pc/images/png_zhangshang.png"
                                alt="线下支付"
                                className={styles.play_icon}
                            />
                            <span className={styles.pay_text}>线下支付</span>
                        </Space>
                    </Radio.Button>
                ) : null}
            </Radio.Group>
        </div>
    )
}

export default observer(PlatMethods)
