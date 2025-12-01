// 填空题
// import classNames from 'classnames'
import styles from './index.module.less'
import PaperStore from '@/pages/test-manage/exam/paper/store'
import type { AnswerItem, IQuestionProps } from '../../../../interface'
import { observer, useLocalObservable } from 'mobx-react'
import { Input } from 'antd'
import { isEmpty } from 'lodash'
import { QUESTION_TYPE_ENUM } from '@/pages/question/[type]/constants'

const getAnswerList = (processedAnswer: AnswerItem, changedAnswer: string, index: number) => {
    const { answer } = processedAnswer ?? {}
    const processedList = !isEmpty(answer) ? (answer as string[]) : []
    processedList[index] = changedAnswer

    return processedList
}

const Blank = (props: IQuestionProps) => {
    const { questionCode, questionType, options, onChange } = props

    const store = useLocalObservable(() => PaperStore)
    const { currentQuestion, answerList } = store

    // 获取当前题目的答案
    const currentAnswer = answerList.find(
        answer => answer.questionCode === currentQuestion.questionCode,
    )

    const onChangeAnswer = (changedAnswer: string, index: number) => {
        // 如果是组合题下面的多选题，那么当前题目的答案就要先找到该题目的目题，找到母题之后，再在母题答案里面找与该题目对应的答案
        if ([QUESTION_TYPE_ENUM.COMPOSE].includes(questionType!)) {
            // 子题答案
            const childAnswer = currentAnswer?.childList?.find(
                _ => _?.questionCode === questionCode!,
            )
            const childList = getAnswerList(childAnswer!, changedAnswer, index)

            const answer: AnswerItem = {
                questionCode: questionCode!,
                questionType: QUESTION_TYPE_ENUM.BLANK,
                answer: childList,
            }

            onChange?.(answer)
        } else {
            const parentList = getAnswerList(currentAnswer!, changedAnswer, index)

            const answer: AnswerItem = {
                questionCode: questionCode!,
                questionType: QUESTION_TYPE_ENUM.BLANK,
                answer: parentList,
            }

            store.changeAnswer(answer)
        }
    }

    const renderInputValue = (index: number) => {
        if ([QUESTION_TYPE_ENUM.COMPOSE].includes(questionType!)) {
            // 子题答案
            const childAnswer = currentAnswer?.childList?.find(
                _ => _?.questionCode === questionCode!,
            )
            const childList = (childAnswer?.answer as string[]) ?? []
            return childList[index]
        } else {
            return (currentAnswer?.answer as string[])?.[index]
        }
    }

    return (
        <div className={styles.components_blank}>
            {options?.map((item, index) => (
                <div className={styles.options_item} key={item.sort}>
                    <div className={styles.name}>{item.sort}</div>
                    <div className={styles.input}>
                        <Input
                            value={renderInputValue(index)}
                            placeholder="请输入"
                            onChange={e => onChangeAnswer(e.target.value, index)}
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default observer(Blank)
