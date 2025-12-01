import React from 'react'
import styles from './index.module.less'

export default ({ type = 'page' }: { type: 'page' | 'component' }) => {
    return (
        <div
            className={[
                styles.global_empty_body,
                type === 'component' ? styles.global_empty_body : '',
            ].join(' ')}
        >
            <div />
            <p>暂无内容</p>
        </div>
    )
}
