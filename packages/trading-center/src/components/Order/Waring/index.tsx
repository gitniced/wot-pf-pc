import React from 'react'
import styles from './index.module.less'
import { Alert } from 'antd'

function Waring({ text }: { text: string }) {
    return (
        <div className={styles.waring}>
            <Alert message={text || '-'} type="warning" showIcon closable />
        </div>
    )
}

export default Waring
