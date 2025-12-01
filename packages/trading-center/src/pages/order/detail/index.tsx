import React, { useEffect } from 'react'
import dayjs from 'dayjs'
import { Button, Space, Tabs } from 'antd'
import { history } from 'umi'
import { useLocalObservable, observer } from 'mobx-react'
import { isEmpty } from 'lodash'
import Hooks from './hooks'
import styles from './index.module.less'
import BlockBox from '@/components/Order/BlockBox'
import TemplateLayout from '@/components/Order/TemplateLayout'
import CommodityItem from '@/components/Order/CommodityItem'
import AllPrice from '@/components/Order/AllPrice'
import Footer from '@/components/Order/Footer'
import Minititle from '@/components/Order/Minititle'
import StatusTag from '@/components/Order/StatusTag'
// import PayDataJson from '@/components/Order/PayDataJson'
import { assertValueTrue, isToPlay } from '../utils'
import OrderItem from './../components/OrderItem'
import BusinessInfo from './components/BusinessInfo'
import { SuperTable } from '@wotu/wotu-components'
import { STATUSENUM } from '../interface.d'
// import { ORDER_BUSINESS_TEXT } from '../const'

let _status: string = ''

function Detail() {
    const { orderId } = history.location.query || {}
    const hooks = useLocalObservable(() => new Hooks())
    console.log('🍊 hooks.orderDetail:', JSON.parse(JSON.stringify(hooks.orderDetail)))
    /**
     *  基础内容的json 生成
     * @returns
     */
    const baseDataJson = () => [
        {
            label: '订单编号：',
            value: hooks.orderDetail?.orderNo ?? '-',
        },
        {
            label: '创建时间：',
            value: hooks.orderDetail?.createdAt
                ? dayjs(hooks.orderDetail?.createdAt).format('YYYY-MM-DD HH:mm:ss')
                : '-',
        },
        {
            label: '备注：',
            value: hooks.orderDetail?.remark || '-',
        },
        {
            label: '已支付金额：',
            value: hooks.orderDetail?.paidAmount ? `￥${hooks.orderDetail?.paidAmount}` : '-',
        },
    ]

    /**
     *  页面回退
     * @returns
     */
    // const goBack = () => history.goBack()

    /**
     *  根据不通的状态展示 对应的订单 操作按钮
     * @param status
     * @param isContractOrder
     * @returns
     */
    const getStatusButton = (status: number) => {
        return (
            <>
                {/* <div className={styles.go_back} onClick={goBack}>
                    <svg className={styles.svg_icon} width="200" height="200" aria-hidden="true">
                        <use xlinkHref="#icon_back"> </use>
                    </svg>
                    返回
                </div> */}

                {/*  判断是否可以去支付  */}
                {isToPlay(status) ? (
                    <Button
                        type="primary"
                        className={styles.play}
                        onClick={() => window.open(CommodityItem.toPayment(hooks.orderDetail.code))}
                    >
                        支付
                    </Button>
                ) : null}
            </>
        )
    }

    /**
     *  代理 jsx 函数 如果flag 为假值 就直接返回空
     *  防止订单数据没有加载成功 操作订单详情
     * @param flag
     * @param fn
     * @param args
     * @returns
     */
    const proxyReactNode = (flag: boolean, fn: any, ...args: any) => {
        if (!flag) return <></>
        return fn(...args)
    }
    useEffect(() => {
        hooks.getOrderDetail(orderId as string)
    }, [])

    /** 取出 status */
    _status = hooks.orderDetail.status

    /**
     * 是有过支付支付信息 根据是否有 线上或者是线下 的支付信息code来
     */
    const isShowPlayInfo = assertValueTrue(
        hooks.orderDetail?.payment?.onlinePaymentDto?.code ||
            hooks.orderDetail?.payment?.offlinePaymentDto?.code,
    )

    /**
     * 获取对应的订单状态的 金额提示文案的枚举
     * @param orderStatus
     * @param isPlay
     * @returns
     */
    const getTotalAmount = (orderStatus: React.Key, isPlay: boolean) => {
        switch (String(orderStatus)) {
            case STATUSENUM.UNPAID_STATUS:
                return '待支付'
            case STATUSENUM.CONFIRM_STATUS:
                return '订单金额'
            case STATUSENUM.CLOSE_STATUS:
                return isPlay ? '订单金额' : '应付款'
            default:
                return '订单金额'
        }
    }

    const associatedClasses = () => {
        // !isEmpty(hooks.orderDetail?.contract) &&
        // hooks.orderDetail?.reservedInfoList?.length > 0  {
        //                 label: `关联班级`,
        //                 key: '2',
        //                 children: <BusinessInfo orderDetail={hooks.orderDetail} />,
        //             }
        // {!isEmpty(hooks.orderDetail?.contract) &&
        //     hooks.orderDetail?.reservedInfoList?.length > 0 ? (
        //         <>
        //             <Minititle
        //                 title={`关联${
        //                     ORDER_BUSINESS_TEXT[hooks.orderDetail?.contractOrderType!] || ''
        //                 }`}
        //             />
        //             <BusinessInfo orderDetail={hooks.orderDetail} />
        //             {/* <TemplateLayout dataJson={baseDataJson()} height="80px" col={3} />
        //             <div className={styles.space} /> */}
        //         </>
        //     ) : null}

        if (
            !isEmpty(hooks.orderDetail?.contract) &&
            hooks.orderDetail?.reservedInfoList?.length > 0
        ) {
            return {
                label: `关联班级`,
                key: '2',
                children: <BusinessInfo orderDetail={hooks.orderDetail} />,
            }
        }
    }

    const getContractInformation = () => {
        return [
            {
                label: '甲方名称：',
                value: hooks.orderDetail?.contract?.partyA || '-',
            },
            {
                label: '乙方名称：',
                value: hooks.orderDetail?.contract?.partyB || '-',
            },
            {
                label: '合作协议编号：',
                value: hooks.orderDetail?.contract?.contractNo || '-',
            },
            {
                label: '结算日期：',
                value: hooks.orderDetail?.expectPayTime
                    ? dayjs(hooks.orderDetail?.expectPayTime).format('YYYY-MM-DD')
                    : '-',
            },
        ]
    }

    return (
        <div className={styles.order_detail}>
            <BlockBox style={{ margin: '0 0 24px 0' }}>
                <StatusTag status={_status} />
                {hooks.orderDetail.contract ? (
                    <>
                        <Minititle title="订单信息" />
                        <TemplateLayout dataJson={baseDataJson()} height="80px" col={3} />
                        <div className={styles.space} />
                    </>
                ) : null}
                <div className={styles.order_info}>
                    <Minititle title="商品信息" />
                    <SuperTable
                        search={false}
                        dataSource={hooks.isGetDetail ? [hooks.orderDetail] : []}
                        headerItemRender={() => {
                            return (
                                <div className={styles.order_title}>
                                    <div>商品</div>
                                    <span />
                                    <div>单价</div>
                                    <span />
                                    <div>数量</div>
                                    <span />
                                    <div>小计</div>
                                    <span />
                                    <div>操作</div>
                                </div>
                            )
                        }}
                        rowItemRender={r => {
                            return <OrderItem data={r || {}} />
                        }}
                    />

                    <AllPrice
                        preferentialType={hooks.orderDetail.preferentialType}
                        preferential={hooks.orderDetail.preferential}
                        total={hooks.orderDetail.payAmount!}
                        text={getTotalAmount(hooks.orderDetail.status!, isShowPlayInfo)}
                    />
                    <div className={styles.space} />
                </div>
                <Tabs
                    defaultActiveKey="1"
                    // onChange={onChange}
                    items={[
                        {
                            label: `合同信息`,
                            key: '1',
                            children: (
                                <TemplateLayout
                                    dataJson={getContractInformation()}
                                    height="80px"
                                    col={3}
                                />
                            ),
                        },
                        associatedClasses()!,
                    ]}
                />

                {/* {isShowPlayInfo ? (
                    <>
                        <Minititle title="支付信息" />
                        <TemplateLayout
                            dataJson={PayDataJson(hooks.orderDetail)}
                            height="80px"
                            col={3}
                        />
                    </>
                ) : null} */}

                {isToPlay(_status) ? (
                    <Footer>
                        <Space>{proxyReactNode(hooks.isGetDetail, getStatusButton, _status)}</Space>
                    </Footer>
                ) : null}
            </BlockBox>
        </div>
    )
}
const Components = observer(Detail)
//@ts-ignore
Components.title = '订单详情'
export default Components
