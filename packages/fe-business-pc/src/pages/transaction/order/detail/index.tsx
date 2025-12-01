import { useEffect } from 'react'
import { useLocalObservable, observer } from 'mobx-react'
import Store from './store'
import { SuperTable } from '@wotu/wotu-components'
import BlockBox from '@/components/BlockBox'
import TemplateLayout from '@/components/TemplateLayout'
import styles from './index.module.less'
import { Button } from 'antd'
import { getGoodsPopover } from '..'
import { history } from 'umi'
import dayjs from 'dayjs'
import { playStatusText } from '../components/const'

function LineHeader({ title }: { title: string }) {
    return (
        <div className={styles.line_header}>
            <div>{title}</div>
            <div />
        </div>
    )
}

function OrderDetail() {
    const store = useLocalObservable(() => new Store())
    const { code } = history.location.query as { code: string }
    useEffect(() => {
        code && store.getOrderDetail(code)
        document.title = '订单管理'
    }, [code])
    const orderInfo = (orderDetail: Record<string, any>) => [
        {
            label: '订单编号：',
            value: orderDetail.orderNo || '-',
        },
        {
            label: '创建时间：',
            value: orderDetail.createdAt
                ? dayjs(orderDetail.createdAt).format('YYYY-MM-DD HH:mm:ss')
                : '-',
        },
        {
            label: '支付时间：',
            value: orderDetail.payTime
                ? dayjs(orderDetail.payTime).format('YYYY-MM-DD HH:mm:ss')
                : '-',
        },
        {
            label: '支付方式：',
            value: playStatusText[orderDetail.payType] || '-',
        },
        {
            label: '订单备注：',
            value: orderDetail.remark || '-',
        },
    ]
    const merchantInfo = (orderDetail: Record<string, any>) => {
        if (orderDetail.buyerType === 1) {
            // 个人
            return [
                {
                    label: '买家昵称：',
                    value: orderDetail.userName,
                },
                {
                    label: '手机号：',
                    value: orderDetail.mobile,
                },
            ]
        } else {
            return [
                {
                    label: '机构名：',
                    value: orderDetail.organizationName || '-',
                },
                {
                    label: '创建人昵称：',
                    value: orderDetail.userName || '-',
                },
                {
                    label: '手机号：',
                    value: orderDetail.mobile || '-',
                },
            ]
        }
    }
    /**
     *  两数相乘
     * @param left
     * @param right
     */
    const multiplication = (left: number, right: number) => {
        if (!left && typeof left !== 'number') return
        if (!right && typeof right !== 'number') return
        return Number(left * right).toFixed(2)
    }

    return (
        <BlockBox>
            <div className={styles.mini_header}>
                <div />
                <div>订单管理</div>
            </div>
            <LineHeader title="订单信息" />
            <TemplateLayout
                dataJson={orderInfo(store.orderDetail)}
                height={100}
                warpStyle={{
                    marginBottom: '35px',
                }}
            />
            <LineHeader title="买家信息" />
            <TemplateLayout
                dataJson={merchantInfo(store.orderDetail)}
                height={50}
                warpStyle={{
                    marginBottom: '24px',
                }}
            />
            <LineHeader title="商品明细" />
            <div className={styles.space} />
            <SuperTable
                search={false}
                dataSource={store.orderDetail.goodsOrderList || []}
                pagination={false}
                headerItemRender={() => {
                    return (
                        <div className={styles.order_title}>
                            <div className={styles.goods}>商品</div>
                            <span />
                            <div className={styles.price}>单价</div>
                            <span />
                            <div className={styles.num}>数量</div>
                            <span />
                            <div className={styles.state}>小计</div>
                            <span />
                            <div className={styles.after}>售后</div>
                        </div>
                    )
                }}
                rowItemRender={(r: any = {}) => {
                    return (
                        <div className={styles.order_item_body_goods_item}>
                            <div className={styles.order_item_body_goods_item_goods}>
                                <div className={styles.order_item_body_goods_item_goods_image}>
                                    <img src={r.goodsImage} alt={r.goodsName} />
                                </div>
                                <div className={styles.order_item_body_goods_item_goods_desc}>
                                    <div className={styles.order_item_body_goods_item_goods_name}>
                                        {getGoodsPopover(r.goodsName)}
                                    </div>
                                    {r.goodsAttributes && (
                                        <div
                                            className={styles.order_item_body_goods_item_goods_attr}
                                        >
                                            {r.goodsAttributes}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className={styles.order_item_body_goods_item_price}>{r.price}</div>
                            <div className={styles.order_item_body_goods_item_num}>
                                {r.quantity}
                            </div>
                            <div className={styles.order_item_body_goods_item_total}>
                                {multiplication(r.price, r.quantity)}
                            </div>
                            <div className={styles.order_item_body_goods_item_after}>
                                {r.hasRefunded ? (
                                    <Button
                                        type="link"
                                        href={`/transaction/refund?goodsCode=${r.code}`}
                                        onClick={e => {
                                            e.preventDefault()
                                            history.push(`/transaction/refund?goodsCode=${r.code}`)
                                        }}
                                    >
                                        售后详情
                                    </Button>
                                ) : null}
                            </div>
                        </div>
                    )
                }}
            />
            <div className={styles.all_total}>
                实收款：<span>￥{store.orderDetail?.totalAmount || '-'}</span>
            </div>
        </BlockBox>
    )
}
export default observer(OrderDetail)
