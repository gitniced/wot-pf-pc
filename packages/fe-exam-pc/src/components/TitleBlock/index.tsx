import React from 'react'
import styles from './index.modules.less'

interface TitleBlockProps {
    title: string
    rightContent?: React.ReactNode
    marginTop?: number
    marginBottom?: number
    size?: 'small' | 'middle' | 'large'
}
const Index: React.FC<TitleBlockProps> = ({
    title,
    rightContent,
    marginTop,
    marginBottom,
    size = 'large',
}) => {
    return (
        <div
            className={[styles.title_block, styles[`title_block_${size}`]].join(' ')}
            style={{ marginBottom, marginTop }}
        >
            <span className={styles.title}>{title}</span>

            {Boolean(rightContent) && <div className={styles.right_content}>{rightContent}</div>}
        </div>
    )
}

export default Index
