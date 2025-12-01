// 主观题

import styles from './index.module.less'
import PaperStore from '@/pages/test-manage/exam/paper/store'
import TestStore from '@/pages/test-manage/store'
import type { AnswerItem, IQuestionProps } from '@/pages/test-manage/exam/paper/interface'
import { observer, useLocalObservable } from 'mobx-react'
import EditorInput from '@/components/EditorInput'
import { FormulaState } from '@/pages/test-manage/constant'
import { useEffect, useRef } from 'react'
import { QUESTION_TYPE_ENUM } from '@/pages/question/[type]/constants'

const Subjective = (props: IQuestionProps) => {
    const { questionCode, questionType, onChange } = props
    const paperStore = useLocalObservable(() => PaperStore)
    const store = useLocalObservable(() => TestStore)

    const { currentQuestion, answerList } = paperStore
    const { formulaState } = store.examData

    const insertKeys = formulaState === FormulaState.DISABLE ? [] : ['custom-math-formula-menu']

    const questionCodeRef = useRef<string>(questionCode!)

    useEffect(() => {
        questionCodeRef.current = questionCode!
    }, [questionCode])

    // 获取当前题目的答案(母题)
    const currentAnswer = answerList.find(
        answer => answer.questionCode === currentQuestion.questionCode,
    )

    const onChangeAnswer = (value: string) => {
        const answer: AnswerItem = {
            questionCode: questionCodeRef.current!,
            questionType: QUESTION_TYPE_ENUM.SHORT,
            answer: value,
        }

        if ([QUESTION_TYPE_ENUM.COMPOSE].includes(questionType!)) {
            onChange?.(answer)
        } else {
            paperStore.changeAnswer(answer)
        }
    }

    const renderEditorValue = () => {
        if ([QUESTION_TYPE_ENUM.COMPOSE].includes(questionType!)) {
            // 子题答案
            const childAnswer = currentAnswer?.childList?.find(
                _ => _?.questionCode === questionCode!,
            )
            return childAnswer?.answer
        } else {
            return currentAnswer?.answer
        }
    }

    return (
        <div className={styles.components_multiple}>
            <div className={styles.answer_editor}>
                {!paperStore.loading && (
                    <EditorInput
                        minHeight={277}
                        insertKeys={insertKeys}
                        initialToolbarKeys={[]}
                        onChange={value => {
                            onChangeAnswer(value)
                        }}
                        value={renderEditorValue()}
                        placeholder="请输入"
                    />
                )}
            </div>
        </div>
    )
}

export default observer(Subjective)
