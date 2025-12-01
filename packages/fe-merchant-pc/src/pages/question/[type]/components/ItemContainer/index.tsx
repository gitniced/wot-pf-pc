// 手动录题通用label样式
import React from 'react'
import styles from './index.modules.less'

interface ItemContainerProps {
    title: string
    children: React.ReactNode
    isDashed?: boolean
}

const Index: React.FC<ItemContainerProps> = ({ title, children, isDashed = true }) => {
    return (
        <div className={styles.item_container}>
            <div className={styles.title}>{title}</div>
            <div
                className={styles.content}
                style={{ borderBottom: `1px dashed ${isDashed ? '#E9E9E9' : 'transparent'}` }}
            >
                {children}
            </div>
        </div>
    )
}
export default Index
