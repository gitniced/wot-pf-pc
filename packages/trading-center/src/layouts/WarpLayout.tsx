import React from 'react'
import Header from '@/components/Header'
import TransactionMenu from '@/components/TransactionMenu'
import { Layout } from 'antd'
import styles from './index.module.less'

function WarpLayout(props: any) {
    return (
        <Layout className={styles.page}>
            <Header title="transaction" />
            <div className={styles.layout}>
                <TransactionMenu {...props} />
                <div className={styles.content}>
                    <div className={styles.children}>{props.children}</div>
                </div>
            </div>
        </Layout>
    )
}

export default WarpLayout
