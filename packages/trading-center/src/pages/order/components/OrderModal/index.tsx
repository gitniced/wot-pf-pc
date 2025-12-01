import { Tabs, Modal, Button, Alert } from 'antd'
import { observer, useLocalObservable } from 'mobx-react'
import AllOrderTable from './AllOrderTable'
import SelectedOrderTable from './SelectedOrderTable'
import styles from './index.module.less'
import { subtractingTwoNumbers, sumTwoNumbers } from '@/utils/sumTwoNumbers'
import Store from './store'

interface OrderStepProps {
    type: 'DOWNLOAD_BILL'
    onOk: () => void
    onCancel: () => void
}

const OrderStep = (props: OrderStepProps) => {
    const store = useLocalObservable(() => Store)
    const { onOk, onCancel } = props

    const items = [
        {
            label: '全部',
            key: '1',
            children: <AllOrderTable type="DOWNLOAD_BILL" store={store} />,
        },
        {
            label: `已选（${store.selectedRows.length}）`,
            key: '2',
            children: (
                <SelectedOrderTable
                    type="DOWNLOAD_BILL"
                    store={store}
                    selectedRows={store.selectedRows}
                />
            ),
        },
    ]

    const calculateAmount = () => {
        // @ts-ignore
        return store.selectedRows.reduce((pre, cur) => {
            return sumTwoNumbers(pre, subtractingTwoNumbers(cur?.payAmount, cur?.paidAmount))
        }, 0)
    }

    const handleClick = () => {
        store.downloadOrder()?.then(() => {
            onOk()
        })
    }

    const handleCancel = () => {
        store.resetSelectedRows()
        onCancel()
    }
    return (
        <Modal
            open={true}
            title="下载结算单"
            width={1100}
            onOk={onOk}
            footer={
                <div className={styles.footer}>
                    <span className={styles.tips}>
                        已选<a> {store.selectedRows?.length} </a>个订单，总计订单金额¥
                        {calculateAmount()}
                    </span>
                    <Button onClick={handleCancel}>取消</Button>
                    <Button type="primary" onClick={handleClick}>
                        下载结算单
                    </Button>
                </div>
            }
            onCancel={handleCancel}
            className={styles.batch_download_bill_modal}
        >
            <Alert
                className={styles.alter}
                message="选定订单后点击【下载结算单】按钮，会按照所选订单合并生成1张结算单（PS：只有相同合同的订单可合并生成结算单）"
                type="warning"
                showIcon
            />
            <Tabs items={items} destroyInactiveTabPane={true} />
        </Modal>
    )
}

export default observer(OrderStep)
