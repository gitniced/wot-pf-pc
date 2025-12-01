import React from 'react'
import styles from './index.module.less'

export default function Cover({
    cover,
    color,
    text,
    width,
}: {
    cover?: string
    color?: string
    text?: string
    width?: number
}) {
    return (
        <div style={{ width: width || '100%' }}>
            <div
                className={styles.cover_wrapper}
                style={{ backgroundImage: `url(${cover})`, color }}
            >
                <div className={styles.title}>{text}</div>
            </div>
        </div>
    )
}
