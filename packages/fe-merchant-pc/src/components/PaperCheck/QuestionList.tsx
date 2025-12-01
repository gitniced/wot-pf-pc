import { DeleteOutlined } from '@ant-design/icons'
import { Modal, Space, Typography, message } from 'antd'
import styles from './index.module.less'
import type { QuestionItem, QuestionListProps } from './interface'
import { ellipsisText } from '@wotu/wotu-components'
import { useLocalObservable } from 'mobx-react'
import Store from './store'
import { QUESTION_TYPE_ENUM } from '@/constants'

const QuestionList: React.FC<QuestionListProps> = ({
    questionList,
    showDelete = true,
    onDelete,
}) => {
    const store = useLocalObservable(() => Store)

    const renderAnalysis = (item: QuestionItem) => {
        let rightAnswerList = item.optionList.filter(option => option.isAnswer)
        let newAnswer = rightAnswerList.map(right => String.fromCharCode(65 + Number(right.sort)))

        // 单选/多选
        if (![QUESTION_TYPE_ENUM.SINGLE, QUESTION_TYPE_ENUM.MULTIPLE].includes(item.type)) {
            newAnswer = rightAnswerList.map(right => right.answer)
        }

        return (
            <div className={styles.analysis_wrapper}>
                <div className={styles.answer}>
                    <span className={styles.label}>正确答案</span>
                    <span className={styles.colon}>：</span>
                    <span
                        className={styles.value}
                        dangerouslySetInnerHTML={{ __html: newAnswer.join('、') }}
                    />
                </div>

                <div className={styles.analysis}>
                    <span className={styles.label}>解析</span>
                    <span className={styles.colon}>：</span>
                    <span
                        className={styles.value}
                        dangerouslySetInnerHTML={{ __html: item.analysis! }}
                    />
                </div>
            </div>
        )
    }

    // 单选题
    const renderSingle = (item: QuestionItem) => (
        <div className={styles.question_item}>
            <div className={styles.single_wrapper}>
                {/* 题干 */}
                <div className={styles.title}>
                    <div className={styles.sort}>{item.sort}、</div>
                    <div dangerouslySetInnerHTML={{ __html: item.title! }} />
                </div>
                {/* 选项 */}
                <div className={styles.options}>
                    {item.optionList.map((option, index) => (
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
        </div>
    )

    // 多选题/多选题
    const renderMultiple = (item: QuestionItem) => (
        <div className={styles.question_item}>
            <div className={styles.multiple_wrapper}>
                {/* 题干 */}
                <div className={styles.title}>
                    <div className={styles.sort}>{item.sort}、</div>
                    <div dangerouslySetInnerHTML={{ __html: item.title }} />
                </div>
                {/* 选项 */}
                <div className={styles.options}>
                    {item.optionList.map((option, index) => (
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
        </div>
    )

    // 填空题
    const renderBlank = (item: QuestionItem) => {
        return (
            <div className={styles.question_item}>
                <div className={styles.blank_wrapper}>
                    {/* 题干 */}
                    <div className={styles.title}>
                        <div className={styles.sort}>{item.sort}、</div>
                        <div dangerouslySetInnerHTML={{ __html: item.title }} />
                    </div>
                    {renderAnalysis(item)}
                </div>
            </div>
        )
    }

    // 简答题/计算题/论述题
    const renderSubject = (item: QuestionItem) => {
        return (
            <div className={styles.question_item}>
                <div className={styles.subject_wrapper}>
                    {/* 题干 */}
                    <div className={styles.title}>
                        <div className={styles.sort}>{item.sort}、</div>
                        <div dangerouslySetInnerHTML={{ __html: item.title }} />
                    </div>

                    {/* 答案和解析 */}
                    {renderAnalysis(item)}
                </div>
            </div>
        )
    }

    // 案例分析题/组合题
    const renderCompose = (item: QuestionItem) => {
        return (
            <div className={styles.compose_wrapper}>
                {/* 题干 */}
                <div className={styles.title}>
                    <div className={styles.sort}>{item.sort}、</div>
                    <div dangerouslySetInnerHTML={{ __html: item.title }} />
                </div>
                <div className={styles.children}>
                    {item.childList?.map((child, index) => (
                        <div className={styles.children_item} key={child.code}>
                            <div className={styles.children_sort}>【小题{index + 1}】</div>
                            {child.type === QUESTION_TYPE_ENUM.SINGLE && renderSingle(child)}
                            {[QUESTION_TYPE_ENUM.MULTIPLE, QUESTION_TYPE_ENUM.JUDGEMENT].includes(
                                child.type,
                            ) && renderMultiple(child)}
                            {child.type === QUESTION_TYPE_ENUM.BLANK && renderBlank(child)}
                            {child.type === QUESTION_TYPE_ENUM.SHORT && renderSubject(child)}
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    const renderQuestion = (question: QuestionItem) => {
        if (question.type === QUESTION_TYPE_ENUM.SINGLE) {
            return renderSingle(question)
        }
        if ([QUESTION_TYPE_ENUM.MULTIPLE, QUESTION_TYPE_ENUM.JUDGEMENT].includes(question.type)) {
            return renderMultiple(question)
        }
        if (question.type === QUESTION_TYPE_ENUM.BLANK) {
            return renderBlank(question)
        }

        if (
            [
                QUESTION_TYPE_ENUM.SHORT,
                QUESTION_TYPE_ENUM.CALCULATE,
                QUESTION_TYPE_ENUM.DISCOURSE,
            ].includes(question.type)
        ) {
            return renderSubject(question)
        }

        if ([QUESTION_TYPE_ENUM.ANALYSIS, QUESTION_TYPE_ENUM.COMPOSE].includes(question.type)) {
            return renderCompose(question)
        }
    }

    // 删除试题
    const handleDeleteQuestion = (code: string, index: number) => {
        Modal.confirm({
            centered: true,
            content: '是否确定移除试题？',
            onOk: () => {
                store.deleteQuestion([code]).then(() => {
                    questionList.splice(index, 1)
                    message.success('删除成功')
                    onDelete?.(questionList)
                })
            },
            onCancel: () => {},
        })
    }

    return (
        <div className={styles.component_question_list}>
            <div className={styles.question_list}>
                {questionList.map((question, index) => (
                    <div className={styles.question_item_wrapper} key={question.code}>
                        <div className={styles.item_header}>
                            <div className={styles.header_left}>
                                <div className={styles.left_item}>难易程度：中等</div>
                                {question.distinction && (
                                    <div className={styles.left_item}>区分度：优秀</div>
                                )}
                                {question.authPoint && (
                                    <div className={styles.left_item}>
                                        鉴定点：
                                        {ellipsisText(
                                            '整体，就是完整性和统一性。整体观念，是中整体，就是完整性和统一性。整体观念，是中',
                                            15,
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className={styles.header_right}>
                                {showDelete && (
                                    <Space
                                        size={2}
                                        className={styles.delete}
                                        onClick={() => handleDeleteQuestion(question.code, index)}
                                    >
                                        <DeleteOutlined />
                                        <Typography.Text>删除</Typography.Text>
                                    </Space>
                                )}
                            </div>
                        </div>
                        {renderQuestion(question)}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default QuestionList
