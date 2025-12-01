import React, { useEffect } from 'react'
import { List } from 'antd'
import { useLocalObservable, observer } from 'mobx-react'
import { Empty } from '@wotu/wotu-components'
import Hooks from './hooks'
import styles from './index.module.less'
import CommodityItem from './components/CommodityItem'
import Minititle from '@/components/Order/Minititle'
import type { IRoute } from 'umi'
import { useLocation } from 'umi'

function Order() {
    const hooks = useLocalObservable(() => new Hooks())
    const { query } = useLocation()

    useEffect(() => {
        hooks.getOrderList(query.invoiceCode)
    }, [query.invoiceCode])

    return (
        <>
            <div className={[styles.order].join(' ')}>
                <Minititle title="关联订单" />

                <List
                    itemLayout="horizontal"
                    dataSource={hooks.orderList}
                    locale={{
                        emptyText: <Empty />,
                    }}
                    header={CommodityItem.getTableHearder({ modify: true, allPrice: true })}
                    pagination={false}
                    renderItem={item => {
                        return (
                            <List.Item>
                                <CommodityItem
                                    modify={true}
                                    data={item}
                                    allPrice
                                    goodsList={item.orderGoodsList}
                                    playCallback={(path, code) => {
                                        hooks.palyOrder(path, code)
                                    }}
                                />
                            </List.Item>
                        )
                    }}
                />
            </div>
        </>
    )
}

const ObserverOrder: IRoute = observer(Order)

ObserverOrder.title = '关联订单'

export default ObserverOrder
