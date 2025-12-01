import type { CSSProperties } from 'react'
import React from 'react'
import styles from './index.module.less'

interface FilletTitleProps {
    /** 标题 */
    title: string
    /** 描述 */
    desc?: string
    titleStyles?: CSSProperties
}
const FilletTitle = ({ title, desc, titleStyles }: FilletTitleProps) => {
    return (
        <div className={styles.fillet_title} style={titleStyles}>
            <span className={styles.fillet} />
            <div className={styles.title}>{title}</div>
            {desc && <span className={styles.desc}>{desc}</span>}
        </div>
    )
}

export default FilletTitle
