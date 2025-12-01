// 题目操作区（上一题、下一题、标记）

import { observer, useLocalObservable } from 'mobx-react'
import styles from './index.module.less'
import { MarkImgUrl, MarkMiniImgUrl } from '@/pages/test-manage/exam/constant'

import PaperStore from '@/pages/test-manage/exam/paper/store'
import type { AnswerItem } from '../../../../interface'
import { QUESTION_TYPE_ENUM } from '@/pages/question/[type]/constants'

const Operate = () => {
    const store = useLocalObservable(() => PaperStore)

    const { currentQuestion, answerList, questionList, parentIndex, childIndex } = store

    const currentAnswer = answerList.find(
        (answer: AnswerItem) => answer.questionCode === currentQuestion.questionCode,
    )

    const onMarkAnswer = () => {
        // 只需要考虑基础题的情况，复杂题型的标记逻辑在小题里面不在这里
        const params = {
            questionCode: currentQuestion.questionCode!,
            questionType: currentQuestion.questionType!,
            isMarked: !currentAnswer ? true : !currentAnswer.isMarked,
        }

        store.changeAnswer(params)
    }

    const showMark = () => {
        return ![QUESTION_TYPE_ENUM.COMPOSE, QUESTION_TYPE_ENUM.ANALYSIS].includes(
            currentQuestion.questionType!,
        )
    }

    const isShowPrevBtn = () => {
        // 如果当前题目是第一题，不显示上一题按钮
        const isFirstQuestion = parentIndex === 0 && childIndex === 0

        return !isFirstQuestion
    }

    const isShowNextBtn = () => {
        // 如果当前题目是第一题，不显示上一题按钮
        const question = questionList[parentIndex]
        const isLastQuestion =
            parentIndex === questionList.length - 1 && childIndex === question.totalQuestion - 1

        return !isLastQuestion
    }

    const onPrev = () => {
        // 上一题
        store.onPrev()
    }

    const onNext = () => {
        // 下一题/保存
        if (isShowNextBtn()) {
            store.onNext()
            return
        }

        store.onSaveAnswer()
    }

    const isMarked = () => {
        return currentAnswer?.isMarked
    }

    return (
        <div className={styles.component_operate}>
            {isShowPrevBtn() && (
                <div className={`${styles.btn} ${styles.btn_prev}`} onClick={onPrev}>
                    上一题
                </div>
            )}

            {
                //  当前题型为组合题或者案例分析的时候不需要显示标记
                showMark() && (
                    <div
                        className={`${styles.btn} ${currentAnswer?.isMarked && styles.btn_mark}`}
                        onClick={onMarkAnswer}
                    >
                        <img src={isMarked() ? MarkMiniImgUrl : MarkImgUrl} />
                        {isMarked() ? '取消标记' : '标记'}
                    </div>
                )
            }

            <div className={`${styles.btn} ${styles.btn_prev}`} onClick={onNext}>
                {isShowNextBtn() ? '下一题' : '保存'}
            </div>
        </div>
    )
}

export default observer(Operate)
