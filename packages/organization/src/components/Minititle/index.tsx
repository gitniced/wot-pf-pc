import React from 'react'
import styles from './index.module.less'
import classnames from 'classnames'
interface titleType {
    title: string
    footer?: React.ReactNode | string
    titleStyles?: any
    // size?: 'large' | 'middle' | 'small'
    size?: 'middle' | 'small'
}

function index({ title, footer, size = 'middle', titleStyles = {} }: titleType) {
    return (
        <div className={classnames(styles.title, styles[`${size}_title`])} style={titleStyles}>
            <div className={styles.title_content}>
                {title}
                <div className={styles.bottom_line}> </div>
            </div>
            {footer}
        </div>
    )
}

export default index
