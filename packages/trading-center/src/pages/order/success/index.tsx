import React from 'react'
import { observer } from 'mobx-react'
import { history } from 'umi'
import type { IRoute } from 'umi'
import styles from './index.module.less'
import { Button, Result } from 'antd'
import Setup from '@/components/Order/Setup'
import LayoutPage from '@/components/Order/LayoutPage'
import { ClockCircleFilled } from '@ant-design/icons'

function Success() {
    const { money = '', payType } = history.location.query || {}
    /**
     * 是否线上支付
     */
    const isOnlinePlay = payType === 'online'
    /**
     * 是否线下支付
     */
    const isOfflinePlay = payType === 'offline'

    return (
        <LayoutPage>
            <div className={styles.success} style={{ padding: '24px' }}>
                <Setup setup={3} />

                {isOnlinePlay ? (
                    <div className={styles.success_content}>
                        <Result
                            status="success"
                            title={<div className={styles.status_info}>支付成功</div>}
                            subTitle={
                                <div className={styles.price_info}>
                                    您已成功付款<span>¥{money}</span>
                                </div>
                            }
                            extra={[
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        history.replace('/order')
                                    }}
                                >
                                    完成
                                </Button>,
                            ]}
                        />
                    </div>
                ) : null}

                {isOfflinePlay ? (
                    <div className={styles.success_content}>
                        <Result
                            icon={<ClockCircleFilled style={{ color: '#FAAD14' }} />}
                            title={<div className={styles.status_info}>支付待确认</div>}
                            subTitle={
                                <div className={styles.price_info}>
                                    您已成功提交<span>¥{money}</span>
                                    线下支付凭证，预计1-3个工作日确认
                                </div>
                            }
                            extra={[
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        history.replace('/order')
                                    }}
                                >
                                    完成
                                </Button>,
                            ]}
                        />
                    </div>
                ) : null}
            </div>
        </LayoutPage>
    )
}

const Component: IRoute = observer(Success)

Component.title = '支付完成'

export default Component
