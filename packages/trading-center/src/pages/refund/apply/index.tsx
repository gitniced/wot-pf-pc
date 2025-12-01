/*
 * @ File: 退款单申请
 * @Author: cmm
 * @Date: 2023-01-04 19:30:15
 * @Last Modified by: cmm
 * @Last Modified time: 2023-02-02 16:37:43
 */
import React, { useEffect } from 'react'
import styles from './index.module.less'
import { Alert, Form, InputNumber, Input, Button } from 'antd'
import LayoutPage from '@/components/Order/LayoutPage'
import BlockBox from '@/components/Order/BlockBox'
import Minititle from '@/components/Order/Minititle'
import Footer from '@/components/Order/Footer'
import GoodsRefundCard from '@/components/Order/GoodsRefundCard'
import { history } from 'umi'
import type { IRoute } from 'umi'
import ApplyStore from './store'
import { observer, useLocalObservable } from 'mobx-react'
import classNames from 'classnames'
import type { FormValueType } from './interface'
import InvoiceHeader from '@/components/Order/InvoiceHeader'
import { fixedNumber } from '@/utils/numberTransform'

const { TextArea } = Input

const Page = () => {
    /**
     * orderId 订单code
     * goodsId 商品订单唯一编码（不是商品编码）
     */
    const { orderId, goodsId } = history.location.query || {}
    const [form] = Form.useForm()
    let store = useLocalObservable(() => new ApplyStore())
    const { orderGoodsInfo } = store
    const { remainRefundQuantity, preferentialPrice } = orderGoodsInfo
    useEffect(() => {
        store.getOrderGoodsDetail(goodsId as string)
    }, [])
    const goBack = () => {
        history.goBack()
    }

    const onFinish = (values: FormValueType) => {
        store.applyRefundOder(orderId as string, goodsId as string, values)
    }
    if (!store.isLoad) return <></>
    return (
        <LayoutPage>
            <InvoiceHeader noUser={true} />
            <div className={styles.content}>
                <BlockBox>
                    <Minititle title="申请退款" />
                    <div className={styles.title}>退款商品</div>
                    <GoodsRefundCard goodsDetail={orderGoodsInfo} />

                    <div className={classNames(styles.title, styles.sale_title)}>退款信息</div>
                    <Alert
                        message="退款的申请退款，将依据订单原付款路径退回，提交申请后，请耐心等待审核结果，审核通过后将于1-3个工作日完成退款流程！"
                        type="warning"
                        showIcon
                        closable
                    />
                    <Form
                        autoComplete="off"
                        form={form}
                        labelCol={{ span: 7 }}
                        wrapperCol={{ span: 17 }}
                        className={styles.form}
                        validateTrigger="onBlur"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="退款数量"
                            name="refundCount"
                            extra={`最多退款数量${remainRefundQuantity}`}
                            required
                            rules={[
                                {
                                    required: true,
                                    // message: '请输入退款数量',
                                    validator(rule, value) {
                                        if (!value) {
                                            return Promise.reject('请输入退款数量')
                                        }
                                        if (value < 1 || value > remainRefundQuantity!) {
                                            return Promise.reject(
                                                `退款数量不能大于${remainRefundQuantity}`,
                                            )
                                        }
                                        // 如果实付单价是0的话，必须全部退款
                                        if (
                                            Number(preferentialPrice) === 0 &&
                                            remainRefundQuantity !== value
                                        ) {
                                            return Promise.reject('必须全部退款')
                                        }
                                        return Promise.resolve()
                                    },
                                },
                            ]}
                        >
                            <InputNumber
                                className={styles.input}
                                placeholder="请输入退款数量"
                                // min={1}
                                precision={0}
                                // max={store.goodsDetail.remainRefundQuantity}
                                onChange={(value: number | null) => {
                                    store.toComputeGoodsAmount(value!)
                                }}
                            />
                        </Form.Item>

                        <Form.Item label="退款金额">
                            <div>￥{fixedNumber(store.computeGoodsAmount)}</div>
                        </Form.Item>
                        <Form.Item
                            name="refundReason"
                            label="退款原因"
                            rules={[{ required: true, message: '请输入退款原因' }]}
                        >
                            <TextArea
                                rows={3}
                                showCount
                                placeholder="请输入退款原因"
                                maxLength={30}
                                autoSize={{ minRows: 3, maxRows: 6 }}
                            />
                        </Form.Item>
                        <Footer className={styles.footer} centerWidth="1200px">
                            <div className={styles.go_back} onClick={goBack}>
                                <svg
                                    className={styles.svg_icon}
                                    width="200"
                                    height="200"
                                    aria-hidden="true"
                                >
                                    <use xlinkHref="#icon_back">{/*  */}</use>
                                </svg>
                                返回
                            </div>
                            <Button type="primary" htmlType="submit" loading={store.btnLoading}>
                                提交
                            </Button>
                        </Footer>
                    </Form>
                </BlockBox>
            </div>
        </LayoutPage>
    )
}

const Component: IRoute = observer(Page)

Component.title = '申请退款'
export default Component
