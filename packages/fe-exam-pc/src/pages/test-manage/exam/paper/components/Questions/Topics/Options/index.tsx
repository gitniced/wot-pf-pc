import Judgment from './Judgment'
import { observer, useLocalObservable } from 'mobx-react'
import Multiple from './Multiple'
import Single from './Single'
import PaperStore from '@/pages/test-manage/exam/paper/store'
import styles from './index.module.less'
import Compose from './Compose'
import Blank from './Blank'
import Subjective from './Subjective'
import { QUESTION_TYPE_ENUM } from '@/pages/question/[type]/constants'

const Options = () => {
    const store = useLocalObservable(() => PaperStore)

    // 当前在做的题目
    const { currentQuestion, questionList, fontSize } = store
    const { questionType, questionCode, options } = currentQuestion

    /** 序号 */
    const renderSort = () => {
        for (let i = 0; i < questionList.length; i++) {
            const parent = questionList[i]
            for (let j = 0; j < parent?.questionList?.length; j++) {
                const child = parent?.questionList[j]
                if (child.questionCode === currentQuestion.questionCode) {
                    return child.questionSort
                }
            }
        }
    }

    const renderQuestion = () => {
        // 单选题
        if (questionType === QUESTION_TYPE_ENUM.SINGLE) {
            return <Single options={options} questionCode={questionCode} />
        }
        // 多选题
        if (questionType === QUESTION_TYPE_ENUM.MULTIPLE) {
            return <Multiple options={options} questionCode={questionCode} />
        }
        // 判断题
        if (questionType === QUESTION_TYPE_ENUM.JUDGEMENT) {
            return <Judgment options={options} questionCode={questionCode} />
        }
        // 填空题
        if (questionType === QUESTION_TYPE_ENUM.BLANK) {
            return <Blank options={options} questionCode={questionCode} />
        }
        // 简答题、论述题、计算题UI一样
        if (
            [
                QUESTION_TYPE_ENUM.SHORT,
                QUESTION_TYPE_ENUM.CALCULATE,
                QUESTION_TYPE_ENUM.DISCOURSE,
            ].includes(questionType!)
        ) {
            return <Subjective questionCode={questionCode} />
        }
        // 组合题、案例分析题UI一样（不过案例分析题只有简答题这一种类型的子题）
        // 需要传入questionType作为题型区分
        if ([QUESTION_TYPE_ENUM.COMPOSE, QUESTION_TYPE_ENUM.ANALYSIS].includes(questionType!)) {
            return <Compose questionType={questionType} />
        }
    }

    return (
        <div
            className={styles.components_options}
            style={{
                fontSize: `${fontSize}px`,
            }}
        >
            <div className={styles.question_sort}>
                {renderSort()}
                <span className={styles.divider}>/</span>
            </div>
            <div className={styles.content_wrapper}>
                <div
                    className={styles.title}
                    dangerouslySetInnerHTML={{ __html: currentQuestion.title! }}
                />
                <div className={styles.content}>{renderQuestion()}</div>
            </div>
        </div>
    )
}

export default observer(Options)
