import React from 'react'
import styles from './index.modules.less'

interface TitleBlockProps {
    title: string
}
const Index: React.FC<TitleBlockProps> = ({ title }) => {
    return (
        <div className={styles.title_block}>
            <span className={styles.title}>{title}</span>
        </div>
    )
}

export default Index
