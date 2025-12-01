import styles from './index.module.less'
import React from 'react'

function index({ children }: { children: React.ReactNode }) {
    return <div className={styles.layout}>{children}</div>
}

export default index
