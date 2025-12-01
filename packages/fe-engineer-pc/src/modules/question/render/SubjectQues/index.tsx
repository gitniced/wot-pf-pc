import React from 'react'
import type { IQuestion } from '../../types'
import QuesTitle from '../../components/QuesTitleRender'
import QuesAnalyze from '../../components/QuesAnalyzeRender'
import styles from './index.module.less'
import QuesAnswerRender from '../../components/QuesAnswerRender'

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
    correct,
}: ObjectiveQuesInterface) {
    return (
        <div className={styles.question_wrapper}>
            <QuesTitle {...data} showType={showType} />
            {answerData && <QuesAnswerRender answer={answerData} />}
            {showAnalysis && <QuesAnalyze {...data} correct={correct} />}
        </div>
    )
}
