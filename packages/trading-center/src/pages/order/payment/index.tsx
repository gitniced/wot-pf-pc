import React, { useEffect } from 'react'
// @ts-ignore
import { history } from 'umi'
import type { IRoute } from 'umi'
import { Button, Form, Spin } from 'antd'
import { useLocalObservable, observer } from 'mobx-react'
import { UndoOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import Setup from '@/components/Order/Setup'
import BlockBox from '@/components/Order/BlockBox'
import TemplateLayout from '@/components/Order/TemplateLayout'
import PlatMethods from '@/components/Order/PlatMethods'
import LayoutPage from '@/components/Order/LayoutPage'
import OfflinePay from '@/components/Order/OfflinePay'
import Minititle from '@/components/Order/Minititle'
import { filterNum } from '@/utils/numberTransform'
import Hooks from './hooks'
import type { PayType } from './hooks'
import type { FormValuesType } from './interface'
import Footer from '@/components/Order/Footer'
import classNames from 'classnames'
import { subtractingTwoNumbers } from '@/utils/sumTwoNumbers'

function Payment() {
    const { orderId, identity, paymentCode } = history.location.query || {}
    const hooks = useLocalObservable(() => new Hooks())

    const [form] = Form.useForm()

    /**
     *  支付方式 online 线上支付
     * @param type
     */
    const changePayType = (type: PayType) => {
        hooks.setPayType(type)
    }

    const getMoney = () => {
        if (paymentCode) {
            const { payAmount } = hooks.paymentDetail || {}
            return payAmount
        } else {
            /**
             *  status 订单状态，1未支付、6部分支付、2支付待确认、3已支付、4已完成、5已关闭
             */
            const { status = '', payAmount = 0, paidAmount = 0 } = hooks?.orderDesc || {}

            if (status === 6) {
                let res = subtractingTwoNumbers(payAmount, paidAmount)
                return filterNum(res)
            } else {
                return filterNum(payAmount)
            }
        }
    }

    /**
     *  订单信息的生成 json
     * @returns
     */
    const dataJson = () => [
        {
            label: '订单ID：',
            value: hooks.orderDesc.orderNo ?? '',
        },
        {
            label: '收款方：',
            value: hooks.settlementDetail.name ?? '',
        },
        {
            label: '支付总计：',
            value: <span className={styles.total_price}>￥{getMoney()}</span>,
        },
    ]
    /**
     * 获取商品名称进行展示
     * 如果元素只有一个 就直接拿出第一个
     * 有多个的话 第一个的名称加上 总数
     * @param arr
     * @returns
     */
    const getListName = (arr: any[]) => {
        if (!arr.length) return ''
        if (arr.length === 1) return arr[0].goodsName
        else return `${arr[0].goodsName}等${arr.length}件商品`
    }
    useEffect(() => {
        if (paymentCode) {
            hooks.getPaymentDetail(paymentCode as string, identity as string)
            hooks.addEvent(() => {
                history.replace(
                    `/order/success?paymentCode=${paymentCode}&money=${getMoney()}&identity=${identity}&payType=online`,
                )
            })
        } else {
            hooks.initPageData(orderId as string, identity as string)
            hooks.addEvent(() => {
                history.replace(
                    `/order/success?orderId=${orderId}&money=${getMoney()}&identity=${identity}&payType=online`,
                )
            })
        }
        return () => {}
    }, [])
    const refreshQrcode = async () => {
        if (paymentCode) {
            hooks.getPaymentDetail(paymentCode as string, identity as string)
        } else {
            await hooks.setSpining(true)
            await hooks.getQrCode()
            await hooks.setSpining(false)
        }
    }
    return (
        <LayoutPage>
            <div
                className={classNames(styles.payment, {
                    [styles.mb64]: hooks.payType === 'offline',
                })}
                style={{ padding: '24px' }}
            >
                <Setup setup={2} />
                <Form
                    form={form}
                    onFinish={(values: FormValuesType) => {
                        hooks.uploadOffline(values, orderId, getMoney())
                    }}
                >
                    <BlockBox className={styles.play_layout} innerClass={styles.inner_layout}>
                        {paymentCode ? (
                            <div className={styles.wait_pay}>
                                待支付：
                                <span className={styles.total_price}>
                                    ￥{hooks.paymentDetail?.payAmount}元
                                </span>
                            </div>
                        ) : (
                            <>
                                <div className={styles.title}>
                                    {getListName(hooks.orderDesc.goodsOrderList || [])}
                                </div>
                                <TemplateLayout dataJson={dataJson()} col={3} />
                            </>
                        )}
                    </BlockBox>
                    <BlockBox
                        className={classNames(hooks.payType === 'offline' ? styles.play_type : '')}
                    >
                        <Minititle title="支付方式" />
                        <PlatMethods
                            paymentCode={hooks.paymentCode}
                            payType={hooks.payType}
                            hasCompletedOnlineIncoming={hooks.hasCompletedOnlineIncoming}
                            onChange={changePayType}
                            payStatus={hooks?.orderDesc?.payStatus}
                        />
                        <div className={styles.line} />
                        {hooks.payType === 'online' && (
                            <>
                                <div className={styles.qr_code}>
                                    <div className={styles.qr_code_content}>
                                        <Spin spinning={hooks.spining}>
                                            <img
                                                src={
                                                    hooks.qrCodeUrl
                                                        ? hooks.qrCodeUrl
                                                        : hooks.qrCode.qrCodeUrl ?? ''
                                                }
                                                alt=""
                                                className={styles.qr_code_image}
                                            />
                                        </Spin>

                                        <div className={styles.toast_can}>
                                            <span>支付遇到问题可尝试</span>
                                            <Button type="text" onClick={refreshQrcode}>
                                                <UndoOutlined />
                                                <a>刷新二维码</a>
                                            </Button>
                                        </div>
                                    </div>
                                    <div className={styles.tips}>
                                        请使用支付宝（推荐）或微信扫一扫
                                    </div>
                                </div>
                            </>
                        )}

                        {hooks.payType === 'offline' && !hooks.paymentCode && (
                            <OfflinePay settlementDetail={hooks.settlementDetail} />
                        )}
                    </BlockBox>

                    {hooks.payType === 'offline' && (
                        <Footer className={styles.footer} centerWidth="1200px">
                            <Button type="primary" htmlType="submit" loading={hooks.btnLoading}>
                                确认提交
                            </Button>
                        </Footer>
                    )}
                </Form>
            </div>
        </LayoutPage>
    )
}

const Component: IRoute = observer(Payment)
Component.title = '收银台'
export default Component
