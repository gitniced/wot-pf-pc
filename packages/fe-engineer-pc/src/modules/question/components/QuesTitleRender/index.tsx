import React from 'react'
import styles from './index.module.less'
import { QUESTION_TYPE_LABEL } from '../../const'
import type { QUESTION_TYPE } from '../../const'

export default function QuesTitle({
    title,
    sort,
    type,
    showType,
}: {
    title: string
    sort?: number
    type: QUESTION_TYPE
    showType?: boolean
}) {
    return (
        <div className={styles.ques_title}>
            {sort ? <span>{sort}、</span> : null}
            {showType ? <span className={styles.tag}>{QUESTION_TYPE_LABEL[type]}</span> : null}
            <div className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />
        </div>
    )
}
