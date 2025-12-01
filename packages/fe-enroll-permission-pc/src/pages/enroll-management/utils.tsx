import styles from './index.modules.less'
import { Badge, Modal } from 'antd'
import { REGISTRATION_STATUS, REGISTRATION_STATUS_TEXT, STATUSENUM } from './const'
import dayjs from 'dayjs'
import { ExclamationCircleOutlined } from '@ant-design/icons'

export function renderEnroll() {
    return (rowData: any) => {
        if (rowData.status?.toString() === STATUSENUM.UNPAID_FEES) {
            return (
                <>
                    <div className={styles.status}>
                        <Badge status={REGISTRATION_STATUS[rowData.status] || 'default'} />{' '}
                        {REGISTRATION_STATUS_TEXT[rowData.status]}
                    </div>
                    <div className={styles.pay}>
                        <span>截止日期：</span>
                        <span>
                            {rowData?.payEndTime
                                ? dayjs(rowData?.payEndTime).format('YYYY-MM-DD HH:mm:ss ')
                                : '-'}
                        </span>
                    </div>
                </>
            )
        } else {
            return (
                <span className={styles.status}>
                    <Badge status={REGISTRATION_STATUS[rowData.status] || 'default'} />{' '}
                    {REGISTRATION_STATUS_TEXT[rowData.status]}
                </span>
            )
        }
    }
}

/**
 * 时间跨度的弹窗
 */
export const emptyTime = () => {
    Modal.info({
        title: '提示',
        icon: <ExclamationCircleOutlined style={{ color: '#FAAD14' }} />,
        content: '可支持查询的最长时间跨度为365天，请进行日期筛选后再导出。',
    })
}
export const emptyList = () => {
    Modal.info({
        title: '提示',
        icon: <ExclamationCircleOutlined style={{ color: '#FAAD14' }} />,
        content: '暂无可导出数据',
    })
}
