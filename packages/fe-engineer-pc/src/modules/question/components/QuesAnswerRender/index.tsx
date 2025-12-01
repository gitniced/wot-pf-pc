import React from 'react'
import styles from './index.module.less'

export default function QuesAnswerRender({ answer }: { answer: string }) {
    return (
        <div className={styles.answer_wrapper}>
            <span className={styles.label}>回答内容：</span>
            <span className={styles.html} dangerouslySetInnerHTML={{ __html: answer || '' }} />
        </div>
    )
}
