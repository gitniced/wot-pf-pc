import React from 'react'
import styles from './index.module.less'

const DesItem = ({ label, value }: { label: string; value: any }) => {
    return (
        <div className={styles.des_item}>
            <div className={styles.des_item_label}>{label}</div>
            <div className={styles.des_item_value}>{value}</div>
        </div>
    )
}

export default DesItem
