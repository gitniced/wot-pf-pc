import React from 'react';
import type {CSSProperties} from 'react';
import styles from './index.module.less';

interface FilletTitleProps {
    /** 标题 */
    title: string
    /** 描述 */
    desc?: string
    style?: CSSProperties
}
const FilletTitle = ({
    title,
    desc,
    style
}: FilletTitleProps) => {
    console.log("style", title, style, desc);
    return <div className={styles.fillet_title} style={style}>
        <span className={styles.fillet} />
        <div className={styles.title}>{title}</div>
        {desc && <span className={styles.desc}>{desc}</span>}
    </div>
}

export default FilletTitle;