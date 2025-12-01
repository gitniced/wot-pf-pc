import { DeleteOutlined, FormOutlined } from '@ant-design/icons'
import { Tag, Space, Typography, Modal, message } from 'antd'
import classNames from 'classnames'
import { QUESTION_LEVEL_TEXT, QUESTION_TYPE_ENUM } from '../constants'
import { RECOMMEND_STATUS, REFERENCE_STATUS } from './constants'
import styles from './index.module.less'
import type { QuestionItem, QuestionListProps } from './interface'
import { useLocalObservable } from 'mobx-react'

import Store from './store'
import type { QuestionRouteType } from '@/hooks/useCommonParams'
import { useParams } from 'umi'

const QuestionList: React.FC<QuestionListProps> = ({
    questionList,
    showDelete = true,
    showEdit = true,
    onDelete,
}) => {
    const store = useLocalObservable(() => Store)

    const { type: routeType } = useParams() as { type: QuestionRouteType }

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

    const isRecommend = (referenceStatus: number) => {
        return referenceStatus === RECOMMEND_STATUS.RECOMMENDED
    }

    const isReferenced = (referencedStatus: number) => {
        return referencedStatus === REFERENCE_STATUS.REFERENCED
    }

    const disabled = ({ recommendStatus, referenceStatus }: QuestionItem) => {
        return (
            recommendStatus === RECOMMEND_STATUS.RECOMMENDED ||
            referenceStatus === REFERENCE_STATUS.REFERENCED
        )
    }

    // 删除试题
    const handleDeleteQuestion = (code: string, index: number) => {
        Modal.confirm({
            centered: true,
            content: '试题删除后无法找回，是否确定删除？',
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
                {/* 手动录入/编辑的时候，第一个重复的试题为当前试题 */}
                {questionList.map((question, index) => (
                    <div className={styles.question_item_wrapper} key={question.code}>
                        <div className={styles.item_header}>
                            <div className={styles.header_left}>
                                <div className={styles.left_item}>
                                    难易程度：{QUESTION_LEVEL_TEXT[question.level]}
                                </div>
                            </div>
                            <div className={styles.header_right}>
                                {showEdit && showDelete && (
                                    <Tag
                                        className={styles.right_item}
                                        color={disabled(question) ? 'success' : 'default'}
                                    >
                                        {!isRecommend(question.recommendStatus!)
                                            ? '未推荐、'
                                            : '已推荐、'}
                                        {!isReferenced(question.referenceStatus!)
                                            ? '未引用'
                                            : '已引用'}
                                    </Tag>
                                )}
                                {showEdit && (
                                    <Space
                                        size={2}
                                        className={classNames(styles.edit, {
                                            [styles.disabled]: disabled(question),
                                        })}
                                        onClick={() => {
                                            if (disabled(question)) return
                                            window.open(
                                                `/exam-center/question/${routeType}/edit?code=${question.code}`,
                                                '_blank',
                                            )
                                        }}
                                    >
                                        <FormOutlined />
                                        <Typography.Text disabled={disabled(question)}>
                                            编辑
                                        </Typography.Text>
                                    </Space>
                                )}
                                {showDelete && (
                                    <Space
                                        size={2}
                                        className={classNames(styles.delete, {
                                            [styles.disabled]: disabled(question),
                                        })}
                                        onClick={() => {
                                            if (disabled(question)) return
                                            handleDeleteQuestion(question.code, index)
                                        }}
                                    >
                                        <DeleteOutlined />
                                        <Typography.Text disabled={disabled(question)}>
                                            删除
                                        </Typography.Text>
                                    </Space>
                                )}
                                {!(showEdit && showDelete) &&
                                    (index === 0 ? (
                                        <Typography.Text type="danger">
                                            当前录入试题
                                        </Typography.Text>
                                    ) : (
                                        <Typography.Link>已有试题</Typography.Link>
                                    ))}
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
