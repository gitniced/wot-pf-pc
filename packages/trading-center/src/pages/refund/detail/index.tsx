/**
 * @ File: 退款单详情
 * @ Description:
 * @ Author: feeling
 * @ Create Time: 2022-12-29 16:36:05
 * @ Modified by: cqh
 * @ Modified time: 2023-07-12 03:04:14
 */

import { Steps, Image } from 'antd'
import { useLocalObservable, observer } from 'mobx-react'
import BlockBox from '@/components/Order/BlockBox'
import Minititle from '@/components/Order/Minititle'
import styles from './index.module.less'
import Hooks from './hooks'
import TemplateLayout from '@/components/Order/TemplateLayout'
import { useEffect } from 'react'
import type { REFUND_INFO } from './interface'
import type { IRouteProps, IRoute } from 'umi'
import { REFUND_STATUS } from './static'
import dayjs from 'dayjs'
import { OrderPlayMethods, OrderPlayMethodsTextMap, orderUpPlayText } from '@/pages/order/const'

const { Step } = Steps

function RefundDetail(props: IRouteProps) {
    const hooks = useLocalObservable(() => new Hooks())
    const detail = hooks.refundInfo
    useEffect(() => {
        const {
            location: {
                query: { code },
            },
        } = props || {}
        if (code) {
            hooks.getRefundDetail(code)
        }
    }, [])

    /** 状态 */
    const status = hooks?.refundInfo?.status
    /** 支付方式 */
    const playType = hooks.refundInfo.payType

    /**
     *  订单信息的内容
     * @param param0
     * @returns
     */
    const getOrderJson = ({ orderNo, payTime, goodsOrder = {} }: any) => {
        return [
            {
                label: '订单编号：',
                value: orderNo || '-',
            },
            {
                label: '支付时间：',
                value: payTime ? dayjs(payTime).format('YYYY-MM-DD HH:mm:ss') : '-',
            },
            {
                label: '支付方式：',
                value: OrderPlayMethodsTextMap[playType!] || '-',
            },
            {
                label: '实付单价：',
                value: `¥${goodsOrder.preferentialPrice}`,
            },
            {
                label: '商品实付款：',
                value: `¥${goodsOrder.preferentialPrice * goodsOrder.quantity}`,
            },
        ]
    }

    /**
     *  退款单内容
     * @param param0
     * @returns
     */
    const getRefundJson = ({
        code,
        refundAmount,
        refundCount,
        refundReason,
    }: Partial<REFUND_INFO>) => [
        {
            label: '退款单编号：',
            value: code || '-',
        },
        {
            label: '退款数量：',
            value: refundCount ?? '-',
        },
        {
            label: '退款金额：',
            value: refundAmount ? `¥${refundAmount}` : '-',
        },
        {
            label: '原因：',
            value: <div className={styles.reason_content}>{refundReason || '-'}</div>,
        },
    ]

    /**
     *  判断是否是拒绝的状态
     * @returns
     */
    const isOrderReject = () => status?.toString() === REFUND_STATUS.REFUND_REJECT.toString()

    /**
     *  判断是审核被拒绝
     * @returns
     */
    const isPaddingReject = () => isOrderReject() && !hooks?.refundInfo?.errorReason

    /**
     *  判断是退款被拒绝
     * @returns
     */
    const isAfterReject = () => isOrderReject() && !!hooks?.refundInfo?.errorReason
    /**
     * 获取驳回的内容
     * @returns
     */
    const getReason = () => hooks?.refundInfo?.rejectReason

    /**
     *  审核中的状态 视图展示枚举
     */
    const paddingView: Record<
        string,
        () => { title: string; desc?: JSX.Element; status?: 'process' | 'error' }
    > = {
        0: () => ({
            title: '待审核',
        }),
        1: () => ({
            title: '待审核',
        }),
        2: () => ({
            title: '退款审核通过',
            desc: (
                <div>
                    预计1-3个工作日完成退款
                    <div />
                    {hooks?.refundInfo?.auditTime
                        ? dayjs(hooks.refundInfo.auditTime).format('YYYY-MM-DD HH:mm:ss')
                        : '-'}
                </div>
            ),
        }),
        3: () => {
            if (isPaddingReject()) {
                return {
                    title: '退款审核失败',
                    status: 'error',
                    desc: (
                        <div>
                            {getReason()}
                            <div />
                            {hooks?.refundInfo?.auditTime
                                ? dayjs(hooks.refundInfo.auditTime).format('YYYY-MM-DD HH:mm:ss')
                                : '-'}
                        </div>
                    ),
                }
            } else {
                return {
                    title: '退款审核通过',
                    desc: (
                        <div>
                            预计1-3个工作日完成退款
                            {/* <br /> */}
                            <div />
                            {hooks?.refundInfo?.auditTime
                                ? dayjs(hooks.refundInfo.auditTime).format('YYYY-MM-DD HH:mm:ss')
                                : '-'}
                        </div>
                    ),
                }
            }
        },
    }

    /**
     * 获取退款成功内容
     * @returns
     */
    const getSuccessReason = () => {
        if (playType === OrderPlayMethods.Down) {
            return <Image src={hooks.refundInfo.proofUrl} style={{ width: '104px' }} />
        } else {
            return (
                <div>
                    已退回账户{orderUpPlayText[playType!]}账户({hooks.refundInfo.account})
                </div>
            )
        }
    }

    const success: Record<
        string,
        { title: string; desc?: JSX.Element; status?: 'process' | 'error' }
    > = {
        2: {
            title: '退款完成',
            desc: (
                <div style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
                    {getSuccessReason()}
                    <div />
                    {hooks?.refundInfo?.updatedAt
                        ? dayjs(hooks.refundInfo.updatedAt).format('YYYY-MM-DD HH:mm:ss')
                        : '-'}
                </div>
            ),
        },
    }

    const afterView: Record<
        string,
        () => { title?: string; desc?: JSX.Element; status?: 'process' | 'error' }
    > = {
        // @ts-ignore
        3: () => {
            if (isAfterReject()) {
                return {
                    title: '退款失败',
                    status: 'error',
                    desc: (
                        <div>
                            {hooks?.refundInfo?.errorReason}
                            <div />
                            {hooks?.refundInfo?.updatedAt
                                ? dayjs(hooks.refundInfo.updatedAt).format('YYYY-MM-DD HH:mm:ss')
                                : '-'}
                        </div>
                    ),
                }
            } else {
                return {
                    status: '',
                    title: '退款中',
                }
            }
        },
    }
    return (
        <BlockBox>
            <div className={styles.refund}>
                <Minititle title="退款单详情" />
                <div className={styles.refund_body}>
                    <div className={styles.step}>
                        <Steps
                            current={hooks.currentStep}
                            progressDot
                            direction="vertical"
                            style={{
                                height: '100%',
                            }}
                        >
                            <Step
                                title="提交申请"
                                description={
                                    detail.createdAt
                                        ? dayjs(detail.createdAt).format('YYYY-MM-DD HH:mm:ss')
                                        : ''
                                }
                            />
                            <Step
                                title={paddingView[status!]?.()?.title}
                                status={paddingView[status!]?.()?.status}
                                description={paddingView[status!]?.()?.desc}
                            />
                            <Step
                                title={afterView[status!]?.()?.title || '退款中'}
                                status={afterView[status!]?.()?.status}
                                description={afterView[status!]?.()?.desc}
                            />

                            <Step
                                title="退款完成"
                                description={success[status ?? REFUND_STATUS.WAIT_REFUND]?.desc}
                            />
                        </Steps>
                    </div>
                    <div className={styles.split_line} />
                    <div className={styles.content}>
                        <div className={styles.detail_content}>
                            <Minititle title="退款商品" />
                            <div className={styles.order_item_body_goods_item_goods}>
                                <div className={styles.order_item_body_goods_item_goods_image}>
                                    <img
                                        src={detail?.goodsOrder?.goodsImage}
                                        alt={detail?.goodsOrder?.goodsName}
                                    />
                                </div>
                                <div className={styles.order_item_body_goods_item_goods_desc}>
                                    <div className={styles.order_item_body_goods_item_goods_name}>
                                        {detail?.goodsOrder?.goodsName}
                                    </div>
                                    <div className={styles.order_item_body_goods_item_goods_attr}>
                                        {detail?.goodsOrder?.goodsAttributes}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.space} />
                            <TemplateLayout
                                dataJson={getOrderJson(hooks.refundInfo)}
                                lineMarginTop={16}
                                col={2}
                            />
                        </div>
                        <div className={styles.space} />
                        <div className={styles.line} />
                        <div className={styles.detail_content}>
                            <div className={styles.space} style={{ height: '24px' }} />
                            <Minititle title="退款详情" />
                            <TemplateLayout
                                dataJson={getRefundJson(hooks.refundInfo)}
                                lineMarginTop={16}
                                col={1}
                                itemStyle={{
                                    alignItems: 'flex-start',
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </BlockBox>
    )
}

const Components: IRoute = observer(RefundDetail)

Components.title = '退款单详情'
export default Components
