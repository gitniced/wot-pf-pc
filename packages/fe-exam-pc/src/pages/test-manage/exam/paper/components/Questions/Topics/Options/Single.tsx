// 单选题
import classNames from 'classnames'
import styles from './index.module.less'
import { observer } from 'mobx-react'
import PaperStore from '@/pages/test-manage/exam/paper/store'
import type {
    AnswerItem,
    IQuestionProps,
    OptionItem,
} from '@/pages/test-manage/exam/paper/interface'
import { useLocalObservable } from 'mobx-react'
import { QUESTION_TYPE_ENUM } from '@/pages/question/[type]/constants'

const Single = (props: IQuestionProps) => {
    const { questionType, options, questionCode, onChange } = props
    const store = useLocalObservable(() => PaperStore)

    // currentQuestion 当前正在做的题目 answerList 当前维护的答案列表
    const { currentQuestion, answerList } = store

    // 获取当前目题目的答案
    const currentAnswer = answerList.find(
        answer => answer.questionCode === currentQuestion.questionCode,
    )

    const onSelectAnswer = (item: OptionItem) => {
        const answer: AnswerItem = {
            questionCode: questionCode!,
            questionType: QUESTION_TYPE_ENUM.SINGLE,
            answer: item.sort,
        }

        if ([QUESTION_TYPE_ENUM.COMPOSE].includes(questionType!)) {
            onChange?.(answer)
        } else {
            store.changeAnswer(answer)
        }
    }

    const isSelected = (item: any) => {
        // 如果是基础题型，只需要判断当前的sort与答案选择的sort是否一样
        if (![QUESTION_TYPE_ENUM.COMPOSE].includes(questionType!)) {
            return currentAnswer?.answer === item.sort
        } else {
            // 复杂题型则需要先拿到子题的答案，然后再进行sort对比

            const childAnswer = currentAnswer?.childList?.find(
                _ => _?.questionCode === questionCode,
            )

            return childAnswer?.answer === item.sort
        }
    }

    return (
        <div className={styles.components_single}>
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
                        {String.fromCharCode(index + 65)}
                    </div>
                    <div className={styles.name} dangerouslySetInnerHTML={{ __html: item.title }} />
                </div>
            ))}
        </div>
    )
}

export default observer(Single)
