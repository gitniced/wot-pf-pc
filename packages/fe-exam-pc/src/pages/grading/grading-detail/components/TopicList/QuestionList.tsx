// 题目列表
import { InfoCircleOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import { InputNumber, Space, Tooltip, message } from 'antd'
import type { AnswerItem, Item } from '../../interface'
import { observer, useLocalObservable } from 'mobx-react'
import GradingDetailStore from '../../store'
import { QUESTION_TYPE_ENUM } from '@/pages/question/[type]/constants'

const QuestionList = ({
    questionList,
    answerList,
}: {
    questionList: Item[]
    answerList: AnswerItem[]
}) => {
    const store = useLocalObservable(() => GradingDetailStore)
    const { scoreList } = store

    // 获取学生的答案
    const getStudentAnswer = (item: Item) => {
        for (let i = 0; i < answerList.length; i++) {
            if (answerList[i].childList && answerList[i].childList?.length) {
                const childList = answerList[i].childList ?? []
                for (let k = 0; k < childList?.length; k++) {
                    if (childList[k].questionCode === item.questionCode) {
                        return childList[k]
                    }
                }
            }

            if (answerList[i].questionCode === item.questionCode) {
                return answerList[i]
            }
        }
    }

    const renderAnalysis = (item: Item) => {
        let rightAnswerList = item.options.filter(option => option.isAnswer)
        let newAnswer = rightAnswerList.map(right => String.fromCharCode(65 + Number(right.sort)))

        // 单选/多选
        if (![QUESTION_TYPE_ENUM.SINGLE, QUESTION_TYPE_ENUM.MULTIPLE].includes(item.questionType)) {
            newAnswer = rightAnswerList.map(right => right.answer)
        }

        return (
            <div className={styles.analysis_wrapper}>
                <div className={styles.answer}>
                    <span className={styles.label}>正确答案：</span>
                    <span
                        className={styles.value}
                        dangerouslySetInnerHTML={{ __html: newAnswer.join('、') }}
                    />
                </div>

                <div className={styles.analysis}>
                    <span className={styles.label}>答案解析：</span>
                    <span
                        className={styles.value}
                        dangerouslySetInnerHTML={{ __html: item.analysis }}
                    />
                </div>
            </div>
        )
    }

    // 修改得分
    const handleChangeScore = (
        questionCode: string, // 小题的questionCode
        // 组合题或者案例分析题的时候 会有parentQuestionCode
        parentQuestionCode?: string,
        value?: number, // 分值
    ) => {
        store.changeScore(questionCode, parentQuestionCode, value)
    }
    // 校验得分
    const handleValidateScore = (
        questionCode: string, // 小题的questionCode
        maxScore: number, // 最大分值
        // 组合题或者案例分析题的时候 会有parentQuestionCode
        parentQuestionCode?: string,
        value?: string, // 分值
    ) => {
        const unit = parentQuestionCode ? 100 : 10

        let _value = Number(String(Number(value) * unit).split('.')[0])
        // 是否需要清空输入框
        let needClear = false

        if (!parentQuestionCode) {
            // 小数点后只能是0或者5
            if (_value % 5 !== 0) {
                needClear = true
                message.error('得分保留1位小数，小数点后只能是0或5')
            }
        }

        _value = _value / unit
        _value = _value >= maxScore ? maxScore : _value

        store.changeScore(questionCode, parentQuestionCode, !needClear ? _value : undefined)
    }

    // 得分
    const renderScore = (item: Item, parent?: Item) => {
        let curScore = scoreList.find(score => score.questionCode === item.questionCode)?.score

        if (parent) {
            const childList = scoreList.find(
                score => score.questionCode === parent.questionCode,
            )?.childList

            curScore = childList?.find(child => child.questionCode === item.questionCode)?.score
        }

        return (
            <div className={styles.score_wrapper}>
                <Tooltip
                    title={
                        parent
                            ? '案例分析题、组合题小题得分保留2位小数'
                            : '得分保留1位小数，小数点后只能是0或5'
                    }
                >
                    <Space className={styles.score} size={4}>
                        得分 <InfoCircleOutlined />
                    </Space>
                </Tooltip>

                <InputNumber
                    placeholder="请输入"
                    min={0}
                    max={item.score}
                    value={curScore}
                    onChange={value =>
                        handleChangeScore(item.questionCode, parent?.questionCode, value as number)
                    }
                    onBlur={event =>
                        handleValidateScore(
                            item.questionCode,
                            item.score,
                            parent?.questionCode,
                            event.target.value,
                        )
                    }
                />
                <div className={styles.unit_score}>分值：{item.score.toFixed(parent ? 2 : 1)}</div>
            </div>
        )
    }

    // 单选题
    const renderSingle = (item: Item, parent?: Item) => (
        <div className={styles.question_item}>
            <div className={styles.single_wrapper}>
                {/* 题干 */}
                <div className={styles.title}>
                    <div className={styles.sort}>{item.logicSort}、</div>
                    <div dangerouslySetInnerHTML={{ __html: item.title }} />
                </div>
                {/* 选项 */}
                <div className={styles.options}>
                    {item.options.map((option, index) => (
                        <div className={styles.option_item} key={option.sort}>
                            <div className={styles.sort}>{String.fromCharCode(65 + index)}</div>
                            <div
                                className={styles.name}
                                dangerouslySetInnerHTML={{ __html: option.answer }}
                            />
                            {option.answer}
                        </div>
                    ))}
                </div>
                {/* 答案和解析 */}
                {renderAnalysis(item)}
            </div>
            {/* 得分 */}
            {renderScore(item, parent)}
        </div>
    )
    // 多选题/多选题
    const renderMultiple = (item: Item, parent?: Item) => (
        <div className={styles.question_item}>
            <div className={styles.multiple_wrapper}>
                {/* 题干 */}
                <div className={styles.title}>
                    <div className={styles.sort}>{item.logicSort}、</div>
                    <div dangerouslySetInnerHTML={{ __html: item.title }} />
                </div>
                {/* 选项 */}
                <div className={styles.options}>
                    {item.options.map((option, index) => (
                        <div className={styles.option_item} key={option.sort}>
                            <div className={styles.sort}>{String.fromCharCode(65 + index)}</div>
                            <div
                                className={styles.name}
                                dangerouslySetInnerHTML={{ __html: option.answer }}
                            />
                        </div>
                    ))}
                </div>
                {/* 答案和解析 */}
                {renderAnalysis(item)}
            </div>
            {/* 得分 */}
            {renderScore(item, parent)}
        </div>
    )
    // 填空题
    const renderBlank = (item: Item, parent?: Item) => {
        const currentAnswer = getStudentAnswer(item)?.answer as string[]

        let title = item.title
        const pattern = /__/i
        for (let i = 0; i < currentAnswer?.length; i++) {
            currentAnswer[i] = currentAnswer[i] || '()'
            title = title.replace(pattern, currentAnswer[i])
        }

        return (
            <div className={styles.question_item}>
                <div className={styles.blank_wrapper}>
                    {/* 题目 */}
                    <div className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />
                    {renderAnalysis(item)}
                </div>
                {/* 得分 */}
                {renderScore(item, parent)}
            </div>
        )
    }

    // 简答题/计算题/论述题
    const renderSubject = (item: Item, parent?: Item) => {
        const currentAnswer = getStudentAnswer(item)?.answer as string

        return (
            <div className={styles.question_item}>
                <div className={styles.subject_wrapper}>
                    {/* 题干 */}
                    <div className={styles.title}>
                        <div className={styles.sort}>{item.logicSort}、</div>
                        <div dangerouslySetInnerHTML={{ __html: item.title }} />
                    </div>
                    <div className={styles.student_answer}>
                        <span className={styles.label}>考生答案：</span>
                        <span
                            className={styles.value}
                            dangerouslySetInnerHTML={{ __html: currentAnswer }}
                        />
                    </div>

                    {/* 答案和解析 */}
                    {renderAnalysis(item)}
                </div>
                {/* 得分 */}
                {renderScore(item, parent)}
            </div>
        )
    }

    // 案例分析题/组合题
    const renderCompose = (item: Item) => {
        return (
            <div className={styles.compose_wrapper}>
                {/* 题干 */}
                <div className={styles.title}>
                    <div className={styles.sort}>{item.logicSort}、</div>
                    <div dangerouslySetInnerHTML={{ __html: item.title }} />
                </div>
                <div className={styles.children}>
                    {item.childList?.map((child, index) => (
                        <div className={styles.children_item} key={child.questionCode}>
                            <div className={styles.children_sort}>【小题{index + 1}】</div>
                            {child.questionType === QUESTION_TYPE_ENUM.SINGLE &&
                                renderSingle(child, item)}
                            {[QUESTION_TYPE_ENUM.MULTIPLE, QUESTION_TYPE_ENUM.JUDGEMENT].includes(
                                child.questionType,
                            ) && renderMultiple(child, item)}
                            {child.questionType === QUESTION_TYPE_ENUM.BLANK &&
                                renderBlank(child, item)}
                            {child.questionType === QUESTION_TYPE_ENUM.SHORT &&
                                renderSubject(child, item)}
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    const renderQuestion = (question: Item) => {
        if (question.questionType === QUESTION_TYPE_ENUM.SINGLE) {
            return renderSingle(question)
        }
        if (
            [QUESTION_TYPE_ENUM.MULTIPLE, QUESTION_TYPE_ENUM.JUDGEMENT].includes(
                question.questionType,
            )
        ) {
            return renderMultiple(question)
        }
        if (question.questionType === QUESTION_TYPE_ENUM.BLANK) {
            return renderBlank(question)
        }

        if (
            [
                QUESTION_TYPE_ENUM.SHORT,
                QUESTION_TYPE_ENUM.CALCULATE,
                QUESTION_TYPE_ENUM.DISCOURSE,
            ].includes(question.questionType)
        ) {
            return renderSubject(question)
        }

        if (
            [QUESTION_TYPE_ENUM.ANALYSIS, QUESTION_TYPE_ENUM.COMPOSE].includes(
                question.questionType,
            )
        ) {
            return renderCompose(question)
        }
    }

    return (
        <div className={styles.component_question_list}>
            {questionList.map(item => (
                <div className={styles.question_item_wrapper} key={item.questionCode}>
                    {renderQuestion(item)}
                </div>
            ))}
        </div>
    )
}

export default observer(QuestionList)
