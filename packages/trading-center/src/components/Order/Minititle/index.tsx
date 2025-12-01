import React from 'react'
import styles from './index.module.less'
interface titleType {
    title: string
    footer?: React.ReactNode | string
    titleStyles?: any
}

function index({ title, footer, titleStyles = {} }: titleType) {
    return (
        <div className={styles.title} style={titleStyles}>
            <div className={styles.title_content}>
                {title}
                <div className={styles.bottom_line}> </div>
            </div>
            {footer}
        </div>
    )
}

export default index
