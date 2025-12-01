import React from 'react'
import styles from './index.module.less'
import type { IQuestion } from '../../types'
import { QUESTION_TYPE } from '../../const'

export default function QuesAnalyze({
    analysis,
    options,
    type,
    correct,
}: IQuestion & { correct?: any }) {
    const objectiveList = [20, 30]
    return (
        <div className={styles.ques_analyze}>
            {correct?.teacherName && (
                <div className={styles.teacher_mark}>
                    {correct?.teacherName}：
                    <span>
                        {correct?.score}分{correct?.comment ? `,${correct?.comment}` : ''}
                    </span>
                </div>
            )}
            <div className={styles.ques_analyze_wrapper}>
                <div className={styles.flex_item}>
                    <span className={styles.label}>正确答案：</span>
                    <span
                        className={styles.value}
                        dangerouslySetInnerHTML={{
                            __html:
                                options
                                    ?.filter(
                                        (item: any) =>
                                            item.isAnswer ||
                                            [
                                                QUESTION_TYPE.calculation,
                                                QUESTION_TYPE.essay,
                                                QUESTION_TYPE.discussion,
                                                QUESTION_TYPE.fill,
                                            ].includes(type),
                                    )
                                    .map(item =>
                                        objectiveList.includes(type) ? item.sort : item.answer,
                                    )
                                    .join('、') || '无',
                        }}
                    />
                </div>
                <div className={styles.flex_item}>
                    <span className={styles.label}>
                        <span>解</span>
                        <span>析：</span>
                    </span>
                    <span
                        className={styles.value}
                        dangerouslySetInnerHTML={{ __html: analysis || '无' }}
                    />
                </div>
            </div>
        </div>
    )
}
