import React from 'react'
import type { IQuestion } from '../../types'
import QuesTitle from '../../components/QuesTitleRender'
import QuesOptions from '../../components/QuesOptionsRender'
import QuesAnalyze from '../../components/QuesAnalyzeRender'
import styles from './index.module.less'

interface ObjectiveQuesInterface {
    data: IQuestion
    showType?: boolean
    showAnalysis?: boolean
    answerData?: any
    correct?: any
}

export default function ObjectiveQues({
    data,
    showType,
    answerData,
    showAnalysis,
}: ObjectiveQuesInterface) {
    return (
        <div className={styles.question_wrapper}>
            <QuesTitle {...data} showType={showType} />
            <QuesOptions {...data} answerData={answerData} />
            {showAnalysis && <QuesAnalyze {...data} />}
        </div>
    )
}
