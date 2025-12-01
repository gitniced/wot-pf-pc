import React from 'react'
import styles from './index.module.less'

function BlockBox({ style, children, className, innerClass, footer }: any) {
    return (
        <div className={[styles.box_warp, className].join(' ')} style={{ ...style }}>
            <div className={[styles.block_box, innerClass].join(' ')}>{children}</div>
            {footer}
        </div>
    )
}

export default BlockBox
