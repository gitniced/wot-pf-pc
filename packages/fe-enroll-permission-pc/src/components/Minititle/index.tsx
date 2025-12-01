import type { CSSProperties } from 'react'
import React from 'react'
import styles from './index.module.less'
interface titleType {
    /** 用于锚点定位，大多数情况下可以不传 */
    id?: string
    title: string
    footer?: React.ReactNode | string
    titleStyles?: CSSProperties
}

function index({ id, title, footer, titleStyles = {} }: titleType) {
    return (
        <div id={id} className={styles.title} style={titleStyles}>
            <span className={styles.title_content}>
                {title}
                <div className={styles.bottom_line}> </div>
            </span>
            {footer}
        </div>
    )
}

export default index
