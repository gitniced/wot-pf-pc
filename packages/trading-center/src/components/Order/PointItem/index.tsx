import React from 'react'
import styles from './index.module.less'
import { Badge } from 'antd'
import type { PointItemProps } from './interface'

function PointItem({ status, statusMap }: PointItemProps) {
    return (
        <div className={styles.status_warp}>
            <Badge status={statusMap?.[status]?.type} />
            <div>{statusMap?.[status]?.name}</div>
        </div>
    )
}

export default PointItem
