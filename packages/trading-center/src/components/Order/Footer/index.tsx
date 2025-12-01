import React from 'react'
import styles from './index.module.less'

function Footer({ children, centerWidth }: any) {
    return (
        <div className={styles.footer}>
            <div className={styles.center} style={{ width: centerWidth }}>
                {children}
            </div>
        </div>
    )
}

export default Footer
