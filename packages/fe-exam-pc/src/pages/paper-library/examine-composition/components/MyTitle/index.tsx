import React from 'react'
import styles from './index.module.less'

const MyTitle = (props: { title: string }) => {
    const { title } = props || {}
    return (
        <div className={styles.title_block}>
            <span className={styles.title}>{title}</span>
        </div>
    )
}

export default MyTitle
