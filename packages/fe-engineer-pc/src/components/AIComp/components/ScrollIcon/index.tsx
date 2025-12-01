import React from 'react'
import styles from './index.module.less'

export default function ScrollIcon({ onClick }: { onClick?: () => void }) {
    return (
        <div className={styles.scroll_icon} onClick={onClick}>
            <svg className="icon" aria-hidden="true">
                <use xlinkHref={`#doubledown`} />
            </svg>
        </div>
    )
}
