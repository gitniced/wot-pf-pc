import React, { useEffect, useState } from 'react'
import { Tabs, Form, Input, Button, List, Row, Alert, Checkbox } from 'antd'
import { DatePicker } from '@/components/Picker'
import { useLocalObservable, observer } from 'mobx-react'
import { Empty } from '@wotu/wotu-components'
import Hooks from './hooks'
import styles from './index.module.less'
import CommodityItem from '@/components/Order/CommodityItem'
import Minititle from '@/components/Order/Minititle'
import { STATUSENUM } from './interface.d'
import { getValueFromEvent } from '@/components/RemoveSpaces'
import type { IRoute } from 'umi'
import { useLocation } from 'umi'
import OrderModal from './components/OrderModal'
import { subtractingTwoNumbers, sumTwoNumbers } from '@/utils/sumTwoNumbers'
import { filterNum } from '@/utils/numberTransform'

const { RangePicker } = DatePicker
function Order() {
    const hooks = useLocalObservable(() => new Hooks())
    const [tabEffect, setTabEffect] = useState<string>(STATUSENUM.ALL_STATUS)
    const [showAlterKey] = useState<string[]>([
        STATUSENUM.ALL_STATUS,
        STATUSENUM.UNPAID_STATUS,
        STATUSENUM.PART_STATUS,
    ])
    const { query } = useLocation()
    const { tab = '0', queryDelayed = false } = query
    const [visible, setVisible] = useState(false)
    const mergeVisible = ['1', '6'].includes(tabEffect)
    const checkKey = (key: string, checkKeyBool: boolean = queryDelayed) => {
        setTabEffect(key)
        hooks.setCheckTabOver(checkKeyBool || false)
        hooks.setCheckTab(key)
        // if (showAlterKey.includes(key) || queryDelayed) {
        //     hooks.getOverNum()
        // }
    }

    useEffect(() => {
        if (tab || queryDelayed) {
            checkKey(tab, queryDelayed)
        } else {
            hooks.getInitData()
        }
        hooks.getOrderStatusNum()
    }, [])

    useEffect(() => {
        hooks.clearItem()
    }, [tabEffect])

    const [form] = Form.useForm()
    const checkKeyOver = (flag: boolean) => {
        hooks.setCheckTabOver(flag)
        hooks.getOrderList()
    }

    /**
     * 搜索
     * @param params
     * @returns
     */
    const toSearch = (params: any) => hooks.searchOrder(params)
    const TabsList = () => [
        {
            tab: <span className={styles.tabs_item}>全部</span>,
            key: STATUSENUM.ALL_STATUS,
            content: '',
        },
        {
            tab: (
                <span className={styles.tabs_item}>
                    未支付
                    <span className={styles.toast1}>
                        （{hooks.statusMap[STATUSENUM.UNPAID_STATUS]}）
                    </span>
                </span>
            ),
            key: STATUSENUM.UNPAID_STATUS,
            content: '',
        },
        {
            tab: (
                <span className={styles.tabs_item}>
                    部分支付
                    <span className={styles.toast1}>
                        （{hooks.statusMap[STATUSENUM.PART_STATUS]}）
                    </span>
                </span>
            ),
            key: STATUSENUM.PART_STATUS,
            content: '',
            isShow: hooks.statusMap[STATUSENUM.PART_STATUS] === 0 ? true : false,
        },
        {
            tab: (
                <span className={styles.tabs_item}>
                    支付待确认
                    {/* <span className={styles.toast3}>
                        （ {hooks.statusMap[STATUSENUM.CONFIRM_STATUS]}）
                    </span> */}
                </span>
            ),
            key: STATUSENUM.CONFIRM_STATUS,
            content: '',
        },
        {
            tab: (
                <span className={styles.tabs_item}>
                    已支付
                    {/*  <span className={styles.toast4}>
                        （{hooks.statusMap[STATUSENUM.SUCCESS_STATUS]}）
                    </span> */}
                </span>
            ),
            key: STATUSENUM.SUCCESS_STATUS,
            content: '',
        },
        {
            tab: (
                <span className={styles.tabs_item}>
                    已完成
                    {/* <span>（{hooks.closeNum}）</span> */}
                </span>
            ),
            key: STATUSENUM.DONE_STATUS,
            content: '',
        },
        {
            tab: (
                <span className={styles.tabs_item}>
                    已关闭
                    {/* <span>（{hooks.statusMap[STATUSENUM.CLOSE_STATUS]}）</span> */}
                </span>
            ),
            key: STATUSENUM.CLOSE_STATUS,
            content: '',
        },
    ]

    const open = () => {
        setVisible(true)
    }

    const closeFn = () => {
        setVisible(false)
    }

    /** 计算订单金额 */
    const getMoney = () => {
        const amountList = hooks.checkedList.map(item => {
            // status 订单状态，1未支付、6部分支付、2支付待确认、3已支付、4已完成、5已关闭
            const { status = '', payAmount = 0, paidAmount = 0 } = item || {}
            if (status === 6) {
                let res = subtractingTwoNumbers(payAmount, paidAmount)
                return filterNum(res)
            } else {
                return filterNum(payAmount)
            }
        })
        //@ts-ignore
        const sum = amountList.reduce((pre, cur) => sumTwoNumbers(pre, cur), 0)
        return sum
    }

    return (
        <>
            <div className={[styles.order, mergeVisible ? styles.has_bottom : ''].join(' ')}>
                <Minititle title="我的订单" />
                <Tabs
                    defaultActiveKey={STATUSENUM.ALL_STATUS}
                    activeKey={tabEffect}
                    onChange={checkKey}
                >
                    {TabsList().map(item => {
                        if (item.isShow) return null
                        return (
                            <Tabs.TabPane tab={item.tab} key={item.key}>
                                {item.content}
                            </Tabs.TabPane>
                        )
                    })}
                </Tabs>

                <Form layout="inline" form={form}>
                    <Form.Item
                        label="订单ID："
                        name="orderNo"
                        className={styles.mb_item}
                        getValueFromEvent={getValueFromEvent}
                    >
                        <Input placeholder="请输入" style={{ width: '246px' }} />
                    </Form.Item>
                    <Form.Item
                        label="商品名称："
                        name="goodsName"
                        labelCol={{ push: 0 }}
                        wrapperCol={{ push: 0 }}
                        className={styles.mb_item}
                    >
                        <Input placeholder="请输入" style={{ width: '246px' }} />
                    </Form.Item>
                    <Form.Item label="支付时间范围：" name="time" className={styles.mb_item}>
                        <RangePicker
                            placeholder={['开始时间', '结束时间']}
                            style={{ width: '246px' }}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Row className={[styles.search_button, styles.mb_item].join(' ')}>
                            <Button
                                className={styles.reset}
                                onClick={async () => {
                                    await form.resetFields()
                                    await hooks.onReset()
                                    hooks.setCheckTabOver(false)
                                    toSearch({
                                        orderNo: undefined,
                                        goodsCode: undefined,
                                        time: undefined,
                                        pageNo: 1,
                                    })
                                }}
                            >
                                重置
                            </Button>
                            <Button
                                type="primary"
                                className={styles.search}
                                loading={hooks.btnLoading}
                                onClick={() => toSearch(form.getFieldsValue(true))}
                            >
                                查询
                            </Button>
                        </Row>
                    </Form.Item>
                </Form>
                <Button style={{ marginBottom: 20 }} onClick={open} type="primary">
                    下载结算单
                </Button>
                {showAlterKey.includes(tabEffect) && hooks.overdueNum > 0 ? (
                    <Alert
                        className={styles.alter}
                        message={`您当前有${hooks.overdueNum}个订单已逾期`}
                        type="warning"
                        showIcon
                        action={
                            <Checkbox
                                checked={hooks.checked}
                                onChange={({ target: { checked } }) => {
                                    checkKeyOver(!!checked)
                                }}
                            >
                                只看逾期订单
                            </Checkbox>
                        }
                    />
                ) : null}

                <List
                    itemLayout="horizontal"
                    dataSource={hooks.orderList}
                    locale={{
                        emptyText: <Empty />,
                    }}
                    header={CommodityItem.getTableHearder({ modify: true, allPrice: true })}
                    pagination={{
                        current: hooks.params.pageNo,
                        total: hooks.totalCount,
                        pageSize: hooks.params.pageSize,
                        showQuickJumper: true,
                        showSizeChanger: true,
                        onChange: (page, size) => hooks.pageChange(page, size as number),
                    }}
                    renderItem={item => {
                        return (
                            <List.Item>
                                <CommodityItem
                                    modify={true}
                                    data={item}
                                    allPrice
                                    tabStatus={tabEffect}
                                    checkItem={hooks.checkItem}
                                    goodsList={item.orderGoodsList}
                                    cancelCallback={(code: string) => {
                                        hooks.closeOrder(code)
                                    }}
                                    playCallback={(path, code) => {
                                        hooks.palyOrder(path, code)
                                    }}
                                />
                            </List.Item>
                        )
                    }}
                />
                {visible && <OrderModal store={hooks} onCancel={closeFn} onOk={closeFn} />}
            </div>
            {mergeVisible && (
                <div className={styles.order_bottom}>
                    <Checkbox
                        checked={!hooks.orderList.some(i => i.active === false)}
                        onChange={hooks.checkAll}
                    >
                        全选
                    </Checkbox>
                    <div className={styles.order_bottom_right}>
                        <div className={styles.order_checked}>
                            已选择<span>{hooks.checkedList.length}</span>个订单，合计
                            <span>{getMoney()}</span>元
                        </div>
                        <Button
                            type={'primary'}
                            loading={hooks.payBool}
                            onClick={hooks.mergePayment}
                        >
                            合并支付
                        </Button>
                    </div>
                </div>
            )}
        </>
    )
}

const ObserverOrder: IRoute = observer(Order)

ObserverOrder.title = '我的订单'

export default ObserverOrder
