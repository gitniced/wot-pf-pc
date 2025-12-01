// 单选题
import classNames from 'classnames'
import styles from './index.module.less'
import PaperStore from '@/pages/test-manage/exam/paper/store'
import type {
    AnswerItem,
    IQuestionProps,
    OptionItem,
} from '@/pages/test-manage/exam/paper/interface'
import { observer, useLocalObservable } from 'mobx-react'
import { isEmpty } from 'lodash'
import { QUESTION_TYPE_ENUM } from '@/pages/question/[type]/constants'

const getAnswerList = (processedAnswer: AnswerItem, item: OptionItem) => {
    const { answer } = processedAnswer ?? {}
    const processedList = !isEmpty(answer) ? (answer as string[]) : []

    const findIndex = processedList.indexOf(item.sort)
    if (findIndex > -1) {
        processedList.splice(findIndex, 1)
    } else {
        processedList.push(item.sort)
    }
    return processedList
}

const Multiple = (props: IQuestionProps) => {
    const { questionType = QUESTION_TYPE_ENUM.MULTIPLE, onChange, questionCode, options } = props
    const store = useLocalObservable(() => PaperStore)

    // currentQuestion 当前正在做的题目 answerList 当前维护的答案列表
    const { currentQuestion, answerList } = store
    // 获取当前题目的答案
    const currentAnswer = answerList.find(
        answer => answer.questionCode === currentQuestion.questionCode,
    )

    const onSelectAnswer = (item: OptionItem) => {
        // 如果是组合题下面的多选题，那么组合题的答案在childList列表中
        if ([QUESTION_TYPE_ENUM.COMPOSE].includes(questionType!)) {
            // 子题答案
            const childAnswer = currentAnswer?.childList?.find(
                _ => _?.questionCode === questionCode,
            )
            const childList = getAnswerList(childAnswer!, item)
            const answer: AnswerItem = {
                questionCode: questionCode!,
                questionType: QUESTION_TYPE_ENUM.MULTIPLE,
                answer: childList,
            }

            onChange?.(answer)
        } else {
            const parentList = getAnswerList(currentAnswer!, item)
            const answer: AnswerItem = {
                questionCode: questionCode!,
                questionType: QUESTION_TYPE_ENUM.MULTIPLE,
                answer: parentList,
            }

            store.changeAnswer(answer)
        }
    }

    const isSelected = (item: OptionItem) => {
        if (![QUESTION_TYPE_ENUM.COMPOSE].includes(questionType!)) {
            return (currentAnswer?.answer as string[])?.includes(item.sort)
        } else {
            const childAnswer = currentAnswer?.childList?.find(
                _ => _?.questionCode === questionCode,
            )
            return childAnswer?.answer?.includes(item.sort)
        }
    }

    return (
        <div className={styles.components_multiple}>
            {options?.map((item, index) => (
                <div
                    className={styles.options_item}
                    key={item.sort}
                    onClick={() => onSelectAnswer(item)}
                >
                    <div
                        className={classNames(styles.sort, {
                            [styles.selected]: isSelected(item),
                            [styles.multiple]: true,
                        })}
                    >
                        {String.fromCharCode(index + 65)}
                    </div>
                    <div className={styles.name}>{item.title}</div>
                </div>
            ))}
        </div>
    )
}

export default observer(Multiple)
