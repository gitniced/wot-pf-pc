/*
 * @ File: 退款单管理
 * @Author: cmm
 * @Date: 2023-01-04 19:29:52
 * @Last Modified by: cmm
 * @Last Modified time: 2023-02-02 16:28:40
 */
import React, { useState, useRef } from 'react'
import { Badge, Space } from 'antd'
import PointItem from '@/components/Order/PointItem'
import { REFUND_STATUS_MAP } from '@/pages/order/const'
import { SuperTable, Empty } from '@wotu/wotu-components'
import type { ColumnsType } from '@wotu/wotu-components/dist/esm/SuperTable/interface.d'
import dayjs from 'dayjs'
import { NavLink, history } from 'umi'
import ApplyRedModal from '@/components/Order/ApplyRedModal'
import { pointStatusMap } from './const'
import type { TABLE_ITEM } from './const'
import { REFUND_ORDER_STATUS } from './const'
import RefundStore from './store'
import { observer, useLocalObservable } from 'mobx-react'
import styles from './index.module.less'
import Minititle from '@/components/Order/Minititle'
import { filterNum, fixedNumber } from '@/utils/numberTransform'

import type { IRoute } from 'umi'

const Page = () => {
    const { goodsId } = history.location.query as { goodsId: string }
    const [modalVisible, setModalVisible] = useState(false)
    const [applyOrderCode, setApplyOrderCode] = useState('')
    const [refundOrderCode, setRefundOrderCode] = useState('')
    const tableRef = useRef({
        reload: () => {},
    })

    let store = useLocalObservable(() => new RefundStore())

    const handleCancel = () => {
        setModalVisible(false)
    }

    const TABLE_COLUMNS: ColumnsType<TABLE_ITEM> = [
        {
            title: '退款单编号',
            dataIndex: 'code',
            key: 'code',
            align: 'center',
            search: true,
            render: (_, { code }) => {
                return <NavLink to={`/refund/detail?code=${code}`}>{code}</NavLink>
            },
        },
        {
            title: '订单编号',
            dataIndex: 'orderNo',
            key: 'orderNo',
            align: 'center',
            search: true,

            render: (_, { orderCode, orderNo }) => {
                return <NavLink to={`/order/detail?orderId=${orderCode}`}>{orderNo}</NavLink>
            },
        },
        {
            title: '退款金额',
            dataIndex: 'refundAmount',
            key: 'refundAmount',
            align: 'center',
            render: _ => {
                return <div>￥{filterNum(_)}</div>
            },
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: 'center',
            render: (_, { createdAt }: TABLE_ITEM) => {
                return (
                    <div> {createdAt ? dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss') : '-'}</div>
                )
            },
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            search: true,
            valueType: 'select',
            valueEnum: {
                [REFUND_ORDER_STATUS.REVIEWED]: {
                    text: '待审核',
                },
                [REFUND_ORDER_STATUS.AFTER_SALE]: {
                    text: '退款中',
                },
                [REFUND_ORDER_STATUS.SUCCESS]: {
                    text: '已完成',
                },
                [REFUND_ORDER_STATUS.FAIL]: {
                    text: '申请失败',
                },
            },
            render: (_, { status }: TABLE_ITEM) => {
                return (
                    <div>
                        <PointItem
                            status={status as unknown as string}
                            statusMap={REFUND_STATUS_MAP}
                        />
                    </div>
                )
            },
        },
        {
            title: '操作',
            dataIndex: 'refundStatus',
            key: 'refundStatus',
            align: 'center',
            render: (_, { code }) => {
                return (
                    <>
                        <NavLink to={`/refund/detail?code=${code}`}>详情</NavLink>

                        {/* {canApplyRedInvoice &&
                            Number(status) === REFUND_ORDER_STATUS.SUCCESS &&
                            Number(invoicingStatus) === INVOICING_STATUS.INVOICED && (
                                <a
                                    style={{ marginLeft: 16 }}
                                    onClick={() => {
                                        setApplyOrderCode(orderCode)
                                        setRefundOrderCode(code)
                                        setModalVisible(true)
                                    }}
                                >
                                    申请红票
                                </a>
                            )} */}
                    </>
                )
            },
        },
    ]

    return (
        <div className={styles.content}>
            <div className={styles.title}>
                <Minititle
                    title={goodsId ? '查看退款' : '我的退款'}
                    titleStyles={{ marginBottom: 0 }}
                />
            </div>
            <SuperTable
                params={{ orderGoodsCode: goodsId }}
                search={goodsId ? false : undefined}
                actionRef={tableRef}
                locale={{
                    emptyText: <Empty />,
                }}
                formProps={{
                    labelCol: { span: 6.5 },
                }}
                columns={TABLE_COLUMNS}
                headerItemRender={() => {
                    return (
                        <div className={styles.order_title}>
                            <div className={styles.goods}>商品</div>
                            <span />
                            <div className={styles.num}>退款数量</div>
                            <span />
                            <div className={styles.price}>退款金额</div>
                            <span />
                            <div className={styles.state}>状态</div>
                        </div>
                    )
                }}
                rowItemRender={(item = {}) => {
                    const { code, status, orderCode, canApplyRedInvoice } = item || {}

                    /**
                     * 表示是否可以开红票
                     * @returns
                     */
                    const isReadInvoice = () => {
                        const everySwitch = [!!canApplyRedInvoice]
                        return everySwitch.every(Boolean)
                    }
                    return (
                        <div className={styles.order_item}>
                            <div className={styles.order_item_title}>
                                <div className={styles.order_item_title_left}>
                                    <span>订单编号：{item.orderNo}</span>
                                    <span>退款编号：{item.code}</span>
                                </div>
                                <div className={styles.order_item_title_right}>
                                    {item.createdAt
                                        ? dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss')
                                        : '-'}
                                </div>
                            </div>
                            <div className={styles.order_item_body}>
                                <div className={styles.order_item_body_goods}>
                                    <div className={styles.order_item_body_goods_item}>
                                        <div className={styles.order_item_body_goods_item_goods}>
                                            <div
                                                className={
                                                    styles.order_item_body_goods_item_goods_image
                                                }
                                            >
                                                <img
                                                    src={item.refundGoodsOrder?.goodsImage}
                                                    alt={item.refundGoodsOrder?.goodsName}
                                                />
                                            </div>
                                            <div
                                                className={
                                                    styles.order_item_body_goods_item_goods_desc
                                                }
                                            >
                                                <div
                                                    className={
                                                        styles.order_item_body_goods_item_goods_name
                                                    }
                                                >
                                                    {item.refundGoodsOrder?.goodsName || '-'}
                                                </div>
                                                <div
                                                    className={
                                                        styles.order_item_body_goods_item_goods_attr
                                                    }
                                                >
                                                    {item.refundGoodsOrder?.goodsAttributes || '-'}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.order_item_body_goods_item_num}>
                                            x{item.refundCount || '-'}
                                        </div>
                                        <div className={styles.order_item_body_goods_item_price}>
                                            ￥{fixedNumber(item.refundAmount) || '-'}
                                        </div>
                                        <div className={styles.order_item_body_goods_item_state}>
                                            <Space direction="vertical">
                                                <Badge
                                                    status={pointStatusMap[status]?.status}
                                                    text={pointStatusMap[status]?.text}
                                                />
                                                <NavLink to={`/refund/detail?code=${code}`}>
                                                    详情
                                                </NavLink>
                                                {isReadInvoice() && (
                                                    <a
                                                        style={{ marginLeft: 16 }}
                                                        onClick={() => {
                                                            setApplyOrderCode(orderCode)
                                                            setRefundOrderCode(code)
                                                            setModalVisible(true)
                                                        }}
                                                    >
                                                        申请红票
                                                    </a>
                                                )}
                                            </Space>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.order_item_footer}>
                                <div>备注信息：</div>
                                <div>{item.refundReason || '-'}</div>
                            </div>
                        </div>
                    )
                }}
                pagination={{
                    //@ts-ignore
                    defaultPageSize: window.page_size,
                }}
                request={async param => {
                    const data = await store.getRefundOrder(param)
                    return {
                        success: true,
                        totalCount: data.totalCount,
                        data: data.data || [],
                    }
                }}
                rowKey="code"
            />

            <ApplyRedModal
                visible={modalVisible}
                handleCancel={handleCancel}
                applyOrderCode={applyOrderCode}
                refundOrderCode={refundOrderCode}
                updateListHandler={() => tableRef.current?.reload?.()}
            />
        </div>
    )
}

const ObserverPage: IRoute = observer(Page)

ObserverPage.title = '退款管理'
export default ObserverPage
