import React from 'react'
import styles from './index.module.less'
import type { PreviewItem } from '../../../../components/utils/interface'
import classnames from 'classnames'

function Title(props: { data: PreviewItem }) {
    const { data } = props || {}
    return (
        <div className={styles.title}>
            <div className={styles.title_content}>{data?.label}</div>
            {data?.hasLink ? (
                <svg className={classnames('icon', styles.icon)} aria-hidden="true">
                    <use xlinkHref={`#icon_shouqi`} />
                </svg>
            ) : null}
        </div>
    )
}

export default Title
