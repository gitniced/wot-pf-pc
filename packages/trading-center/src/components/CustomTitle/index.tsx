import styles from './index.module.less'
import classNames from 'classnames'
import React from 'react'
import type { ReactElement } from 'react'

const CustomTitle = ({
    title,
    moreHandler,
    marginBottom = 0,
    type = 'normal',
    description,
}: {
    title: string | ReactElement
    moreHandler?: () => void
    marginBottom?: number
    description?: string
    type?: 'small' | 'normal'
}) => {
    return (
        <div className={styles.content} style={{ marginBottom }}>
            <div className={classNames(type === 'normal' ? styles.left : styles.small_left)}>
                <div className={styles.sign} />
                <div className={styles.title}>{title}</div>
                {description ? <div className={styles.desc}>{description}</div> : null}
            </div>

            {moreHandler ? (
                <div className={styles.right} onClick={moreHandler}>
                    查看更多
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref={`#icon_shouqi`} />
                    </svg>
                </div>
            ) : null}
        </div>
    )
}
export default CustomTitle
