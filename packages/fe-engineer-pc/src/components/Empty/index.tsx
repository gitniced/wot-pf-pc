import React from 'react'
import styles from './index.module.less'

export default ({
    type = 'page',
    className = '',
    style = {},
    text = '暂无内容',
}: {
    type?: 'page' | 'component'
    className?: string
    style?: React.CSSProperties
    text?: string
}) => {
    return (
        <div
            className={[
                styles.global_empty_body,
                type === 'component' ? styles.global_empty_body : '',
                className,
            ].join(' ')}
            style={style}
        >
            <div />
            <p>{text}</p>
        </div>
    )
}
