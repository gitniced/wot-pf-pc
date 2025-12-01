// 题型标题

import { observer, useLocalObservable } from 'mobx-react'
import styles from './index.module.less'
import type { ITypeTitleProps } from './interface'
import TestStore from '@/pages/test-manage/store'
import PaperStore from '@/pages/test-manage/exam/paper/store'
import { ScoreShowState } from '@/pages/test-manage/constant'
import classNames from 'classnames'

const TypeTitle = () => {
    const store = useLocalObservable(() => TestStore)
    const paperStore = useLocalObservable(() => PaperStore)

    const { examData } = store
    const { questionList, parentIndex, currentQuestionType, prevQuestionType } = paperStore

    const currentTitleData: ITypeTitleProps = questionList[parentIndex]

    const { logicSort, title, totalScore, totalQuestion, unificationScore } = currentTitleData ?? {}

    const computedTitle = () => {
        const noScore = `${logicSort}、${title}`
        // 如果题目分值不可见，统一显示（共 X 题），不显示分数
        if (examData.scoreShowState === ScoreShowState.DISABLE) {
            return noScore
        }
        return `${noScore} (${totalScore}分)`
    }

    const computedQuestionScore = () => {
        const noUnificationScore = `(共${totalQuestion}题`

        // 如果题目分值不可见，统一显示（共 X 题）
        if (examData.scoreShowState === ScoreShowState.DISABLE) {
            return `${noUnificationScore})`
        }

        // 如果题目分值可见，且题目单独设置了分数，显示（ 共 X 题，共 N 分）
        // 如果题目分值可见，但是题目没有单独设置分子，显示（ 共 X 题，每题 M 分，共 N 分 ）
        return unificationScore
            ? `${noUnificationScore}，每题${unificationScore}分)`
            : `${noUnificationScore})`
    }

    return (
        <div className={styles.component_type_title}>
            <div
                className={classNames(styles.type_title_wrapper, {
                    [styles.animation]:
                        prevQuestionType && currentQuestionType !== prevQuestionType,
                })}
            >
                <div className={styles.title}>{computedTitle()}</div>
                <div className={styles.question_score}>{computedQuestionScore()}</div>
            </div>
        </div>
    )
}

export default observer(TypeTitle)
