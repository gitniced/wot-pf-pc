import { Tabs } from 'antd'
import AllOrderTable from './AllOrderTable'
import SelectedOrderTable from './SelectedOrderTable'
import { observer } from 'mobx-react'
import { useRef } from 'react'
import styles from './index.module.less'

interface OrderStepProps {
    store: any
    type?: 'OFFLINE_PAYMENT' | 'ADD_DISCOUNT'
}

const OrderStep = (props: OrderStepProps) => {
    const { store, type } = props

    const tableRef = useRef(null)

    const items = [
        {
            label: '全部',
            key: '1',
            children: (
                <AllOrderTable
                    ref={tableRef}
                    type={type}
                    store={store}
                />
            ),
        },
        {
            label: `已选（${store.selectedRows.length}）`,
            key: '2',
            children: (
                <SelectedOrderTable
                    store={store}
                    selectedRows={store.selectedRows}
                />
            ),
        },
    ]

    return (
        <div>
            <div className={styles.title_content}>
                <div className={styles.title}>关联订单</div>
                <div className={styles.tab_list} />
            </div>
            <Tabs items={items} destroyInactiveTabPane={true} />
        </div>
    )
}

export default observer(OrderStep)
