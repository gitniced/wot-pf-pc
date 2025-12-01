import React from 'react'
import styles from '../../index.module.less'
import type { TopicProps } from '../../interface'

const Topic = (props: TopicProps) => {
    const { examDetail, questionItem } = props || {}
    const { scoreType } = examDetail || {}
    const { logicSort, title, minSort, maxSort, unificationScore, totalScore, totalQuestion } =
        questionItem || {}

    return (
        <div style={{ pageBreakInside: 'avoid' }}>
            <p className={styles.mg_0}>
                <span className={styles.song_5_b}>
                    {logicSort}、{title}（第{minSort}题~第{maxSort}题，
                    {scoreType !== 'single' &&
                        `每题
                    ${
                        scoreType === 'questiontype'
                            ? (totalScore / totalQuestion).toFixed(1)
                            : unificationScore
                    }分，`}
                    共{totalScore}
                    分）
                </span>
            </p>
        </div>
    )
}
export default Topic
