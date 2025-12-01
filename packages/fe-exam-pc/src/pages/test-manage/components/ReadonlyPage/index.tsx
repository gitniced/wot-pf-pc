// 只读页面

import React from 'react'
import styles from './index.module.less'
import type { IRoute } from 'umi'

const ReadonlyPage: React.FC<IRoute> = props => {
    return <div className={styles.readonly_page}>{props.children}</div>
}

export default ReadonlyPage
