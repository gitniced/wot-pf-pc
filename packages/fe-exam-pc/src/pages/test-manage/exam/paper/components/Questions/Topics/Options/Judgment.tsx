// 判断题
import classNames from 'classnames'
import styles from './index.module.less'
import PaperStore from '@/pages/test-manage/exam/paper/store'
import type {
    AnswerItem,
    IQuestionProps,
    OptionItem,
} from '@/pages/test-manage/exam/paper/interface'
import { observer, useLocalObservable } from 'mobx-react'
import {
    CheckCircleFilled,
    CheckCircleOutlined,
    CloseCircleFilled,
    CloseCircleOutlined,
} from '@ant-design/icons'
import { QUESTION_TYPE_ENUM } from '@/pages/question/[type]/constants'

const Judgment = (props: IQuestionProps) => {
    const { questionCode, questionType, options, onChange } = props
    const store = useLocalObservable(() => PaperStore)

    const { currentQuestion, answerList } = store

    // 获取当前题目的答案
    const currentAnswer = answerList.find(
        answer => answer.questionCode === currentQuestion.questionCode,
    )

    const onSelectAnswer = (item: OptionItem) => {
        const answer: AnswerItem = {
            questionCode: questionCode!,
            questionType: QUESTION_TYPE_ENUM.JUDGEMENT,
            answer: item.sort,
        }

        if ([QUESTION_TYPE_ENUM.COMPOSE].includes(questionType!)) {
            onChange?.(answer)
        } else {
            store.changeAnswer(answer)
        }
    }

    const isSelected = (item: OptionItem) => {
        if (![QUESTION_TYPE_ENUM.COMPOSE].includes(questionType!)) {
            return currentAnswer?.answer === item.sort
        } else {
            // 子题答案
            const childAnswer = currentAnswer?.childList?.find(
                _ => _?.questionCode === questionCode,
            )
            return childAnswer?.answer === item.sort
        }
    }

    const renderIcon = (item: OptionItem, index: number) => {
        let nowAnswer = currentAnswer

        if ([QUESTION_TYPE_ENUM.COMPOSE].includes(questionType!)) {
            nowAnswer = currentAnswer?.childList?.find(_ => _?.questionCode === questionCode)
        }

        const isCurrent = nowAnswer?.answer === item.sort

        if (index === 0) {
            return isCurrent ? <CheckCircleFilled /> : <CheckCircleOutlined />
        } else {
            return isCurrent ? <CloseCircleFilled /> : <CloseCircleOutlined />
        }
    }

    return (
        <div className={styles.components_judgment}>
            {options?.map((item, index) => (
                <div
                    className={styles.options_item}
                    key={item.sort}
                    onClick={() => onSelectAnswer(item)}
                >
                    <div
                        className={classNames(styles.sort, {
                            [styles.selected]: isSelected(item),
                        })}
                    >
                        {renderIcon(item, index)}
                    </div>
                    <div className={styles.name}>{item.title}</div>
                </div>
            ))}
        </div>
    )
}

export default observer(Judgment)
