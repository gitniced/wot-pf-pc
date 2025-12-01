import React from 'react'
import CommodityItem from './../CommodityItem'
import styles from './index.module.less'
function StatusTag({ status }: any) {
    return <div className={styles['status_tag' + status]}>{CommodityItem.statusText[status]}</div>
}

export default StatusTag
