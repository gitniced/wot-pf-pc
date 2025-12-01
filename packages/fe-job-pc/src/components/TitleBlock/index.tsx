import React from 'react'
import styles from './index.modules.less'

interface TitleBlockProps {
    title: string
    rightContent?: React.ReactNode
    marginBottom?: number
}
const Index: React.FC<TitleBlockProps> = ({ title, rightContent, marginBottom }) => {
    return (
        <div className={styles.title_block} style={{ marginBottom: marginBottom }}>
            <span className={styles.title}>{title}</span>

            {Boolean(rightContent) && <div className={styles.right_content}>{rightContent}</div>}
        </div>
    )
}

export default Index
