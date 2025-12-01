import React from 'react'
import styles from './index.module.less'

function PortalLayout({ style, children, className, innerClass }: any) {
    return (
        <div className={[styles.box_warp, className].join(' ')} style={{ ...style }}>
            <div className={styles.box_bgc}>
                <div className={styles.box_bgc_primary} />
            </div>
            <div className={[styles.block_box, innerClass].join(' ')}>{children}</div>
        </div>
    )
}

export default PortalLayout
