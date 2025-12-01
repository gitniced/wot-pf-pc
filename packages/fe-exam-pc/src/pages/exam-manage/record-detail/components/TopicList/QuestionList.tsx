// 题目列表

import type { AnswerItem, Item, OptionItem } from '../../interface'
import styles from './index.module.less'
import classNames from 'classnames'
import { isArray } from 'lodash'
import { QUESTION_TYPE_ENUM } from '@/pages/question/[type]/constants'
import { Space, Tooltip } from 'antd'
import { EllipsisOutlined } from '@ant-design/icons'
import { useLayoutEffect, useRef, useState } from 'react'
import AnswerOrbitModal from '../AnswerOrbitModal'
import { getCookie } from '@/storage'
import { isDemo } from '@/utils/customeFields'
import CommitModal from '../CommitModal'

const QuestionList = ({
    questionList,
    answerList,
    parentSort
}: {
    questionList: Item[]
    answerList: AnswerItem[]
    parentSort: any
}) => {
    const childRefs = useRef<HTMLDivElement[] | null[]>([])
    const scoreRef = useRef<HTMLDivElement>(null)
    const scoreWrapperRef = useRef<HTMLDivElement>(null)
    const [quesCode, setQuesCode] = useState<number>()

    const [scoreWrapPl, setScoreWraoPl] = useState<number>(0)

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

    const handleView = (index: number) => {
        setQuesCode(parentSort + index)
    }

    const renderAnalysis = (item: Item) => {
        const tempOptions = item.options
            .sort((a, b) => Number(a.sort) - Number(b.sort))
            .map((option, index) => ({
                ...option,
                sort: index,
            }))
        const rightAnswerList = tempOptions.filter(option => option.isAnswer)

        let newAnswer = rightAnswerList.map(item => String.fromCharCode(65 + item.sort))

        // 非单选/多选
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

    const isRight = (option: OptionItem, item: Item) => {
        const currentAnswer = getStudentAnswer(item)?.answer

        const stuAnswer = isArray(currentAnswer) ? currentAnswer : [currentAnswer]

        return stuAnswer.includes(option.sort) && Boolean(option.isAnswer)
    }

    const isWrong = (option: OptionItem, item: Item) => {
        const currentAnswer = getStudentAnswer(item)?.answer
        const stuAnswer = isArray(currentAnswer) ? currentAnswer : [currentAnswer]

        return stuAnswer.includes(option.sort) && Boolean(!option.isAnswer)
    }

    // 单选题
    const renderSingle = (item: Item) => (
        <div className={styles.single_wrapper}>
            {/* 题干 */}
            <div className={styles.title} id={`question_${item.questionCode}`}>
                <div className={styles.sort}>{item.logicSort}、</div>
                <div dangerouslySetInnerHTML={{ __html: item.title }} />
            </div>
            {/* 选项 */}
            <div className={styles.options}>
                {item.options
                    .sort((a, b) => Number(a.sort) - Number(b.sort))
                    .map((option, index) => (
                        <div className={styles.option_item} key={option.sort}>
                            <div
                                className={classNames(styles.sort, {
                                    [styles.right]: isRight(option, item),
                                    [styles.wrong]: isWrong(option, item),
                                })}
                            >
                                {String.fromCharCode(65 + index)}
                            </div>
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
    )
    // 多选题/多选题
    const renderMultiple = (item: Item) => (
        <div className={styles.multiple_wrapper}>
            {/* 题干 */}
            <div className={styles.title} id={`question_${item.questionCode}`}>
                <div className={styles.sort}>{item.logicSort}、</div>
                <div dangerouslySetInnerHTML={{ __html: item.title }} />
            </div>
            {/* 选项 */}
            <div className={styles.options}>
                {item.options
                    .sort((a, b) => Number(a.sort) - Number(b.sort))
                    .map((option, index) => (
                        <div className={styles.option_item} key={option.sort}>
                            <div
                                className={classNames(styles.sort, {
                                    [styles.right]: isRight(option, item),
                                    [styles.wrong]: isWrong(option, item),
                                })}
                            >
                                {String.fromCharCode(65 + index)}
                            </div>
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
    )
    // 填空题
    const renderBlank = (item: Item) => {
        const currentAnswer = getStudentAnswer(item)?.answer as string[]

        let title = item.title
        const pattern = /__/i
        for (let i = 0; i < currentAnswer?.length; i++) {
            currentAnswer[i] = currentAnswer[i] || '()'
            title = title.replace(pattern, currentAnswer[i])
        }

        return (
            <div className={styles.blank_wrapper}>
                {/* 题目 */}
                <div className={styles.title} id={`question_${item.questionCode}`}>
                    <div className={styles.sort}>{item.logicSort}、</div>
                    <div dangerouslySetInnerHTML={{ __html: title }} />
                </div>
                {renderAnalysis(item)}
            </div>
        )
    }

    // 简答题/计算题/论述题
    const renderSubject = (item: Item) => {
        const currentAnswer = getStudentAnswer(item)?.answer as string

        return (
            <div className={styles.subject_wrapper}>
                {/* 题干 */}
                <div className={styles.title} id={`question_${item.questionCode}`}>
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
        )
    }

    useLayoutEffect(() => {
        const scoreWdith = scoreRef.current?.clientWidth ?? 0
        const scoreWrapWidth = scoreWrapperRef.current?.clientWidth ?? 0

        setScoreWraoPl((scoreWrapWidth - scoreWdith) / 2)
    }, [])
    // 案例分析题/组合题
    const renderCompose = (item: Item) => {
        return (
            <div className={styles.compose_wrapper}>
                {/* 题干 */}
                <div
                    className={`${styles.title} ${styles.compose_title}`}
                    id={`question_${item.questionCode}`}
                >
                    <Space size={0} align="start">
                        <div className={styles.sort}>{item.logicSort}、</div>
                        <div dangerouslySetInnerHTML={{ __html: item.title }} />
                    </Space>
                    <div
                        className={styles.score_wrapper}
                        ref={scoreWrapperRef}
                        style={{
                            paddingLeft: `${scoreWrapPl}px`,
                        }}
                    >
                        <div className={styles.score} ref={scoreRef}>
                            得分：{getStudentAnswer(item)?.score}
                        </div>
                        <div className={styles.unit_score}>分值：{item.score}</div>
                    </div>
                </div>
                <div className={styles.children}>
                    {item.childList?.map((child, index) => {
                        return (
                            <div
                                className={styles.children_item}
                                key={child.questionCode}
                                id={`children_item_${index}`}
                                // @ts-ignore
                                ref={node => childRefs.current.push(node)}
                            >
                                <div className={styles.children_sort}>【小题{index + 1}】</div>
                                {child.questionType === QUESTION_TYPE_ENUM.SINGLE &&
                                    renderSingle(child)}
                                {[
                                    QUESTION_TYPE_ENUM.MULTIPLE,
                                    QUESTION_TYPE_ENUM.JUDGEMENT,
                                ].includes(child.questionType) && renderMultiple(child)}
                                {child.questionType === QUESTION_TYPE_ENUM.BLANK &&
                                    renderBlank(child)}
                                {child.questionType === QUESTION_TYPE_ENUM.SHORT &&
                                    renderSubject(child)}
                                {renderScore(child)}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    // 是否显示阅卷人
    const isShowMarkers = (item: Item) => {
        // 同时满足主观题、非组合题案例分析题且有阅卷老师
        return (
            !item.objectiveState &&
            ![QUESTION_TYPE_ENUM.ANALYSIS, QUESTION_TYPE_ENUM.COMPOSE].includes(
                item.questionType,
            ) &&
            item.makringTeacher.length
        )
    }
    // 分值
    const renderScore = (item: Item) => {
        const score = getStudentAnswer(item)?.score
        // 是否是客观题

        const renderMarkers = (markerItem: Item) => {
            return (
                <div className={styles.markers}>
                    <div className={styles.label}>阅卷人</div>
                    <>
                        <div className={styles.multiple}>
                            {markerItem.makringTeacher.slice(0, 4).map(teacher => (
                                <Tooltip
                                    key={`${teacher.name}:${teacher.score}`}
                                    title={`${teacher.name}:${teacher.score}`}
                                >
                                    <div className={styles.row}>
                                        <span className={styles.teacher_name}>{teacher.name}:</span>
                                        <span className={styles.teacher_score}>
                                            {teacher.score}
                                        </span>
                                    </div>
                                </Tooltip>
                            ))}
                        </div>
                        {markerItem.makringTeacher.length > 4 && (
                            <Tooltip
                                title={
                                    <div className={styles.tooltip_multiple}>
                                        {item.makringTeacher.slice(4).map(teacher => (
                                            <Tooltip
                                                key={`${teacher.name}:${teacher.score}`}
                                                title={`${teacher.name}:${teacher.score}`}
                                            >
                                                <div className={styles.row}>
                                                    <span className={styles.teacher_name}>
                                                        {teacher.name}:
                                                    </span>
                                                    <span className={styles.teacher_score}>
                                                        {teacher.score}
                                                    </span>
                                                </div>
                                            </Tooltip>
                                        ))}
                                    </div>
                                }
                                overlayClassName={styles.tooltip_wrapper}
                                placement="bottom"
                                color="#fff"
                            >
                                <EllipsisOutlined />
                            </Tooltip>
                        )}
                    </>
                </div>
            )
        }

        return (
            <div
                className={styles.score_wrapper}
                ref={scoreWrapperRef}
                style={{
                    paddingLeft: `${scoreWrapPl}px`,
                }}
            >
                <div className={styles.score} ref={scoreRef}>
                    得分：{score}
                </div>
                <div className={styles.unit_score}>分值：{item.score}</div>

                {isShowMarkers(item) ? renderMarkers(item) : null}
                {isDemo && <a className={styles.orbit} onClick={() => handleView(item.logicSort - 1)}>查看答题轨迹</a>}
                {/* TODO ew */}
                {getCookie('ALIAS') === 'ew' && <CommitModal />}
            </div>
        )
    }

    const renderQuestion = (item: Item) => {
        return (
            <div className={styles.question_item} key={item.questionCode}>
                {item.questionType === QUESTION_TYPE_ENUM.SINGLE && renderSingle(item)}
                {[QUESTION_TYPE_ENUM.MULTIPLE, QUESTION_TYPE_ENUM.JUDGEMENT].includes(
                    item.questionType,
                ) && renderMultiple(item)}
                {item.questionType === QUESTION_TYPE_ENUM.BLANK && renderBlank(item)}
                {[
                    QUESTION_TYPE_ENUM.SHORT,
                    QUESTION_TYPE_ENUM.DISCOURSE,
                    QUESTION_TYPE_ENUM.CALCULATE,
                ].includes(item.questionType) && renderSubject(item)}
                {[QUESTION_TYPE_ENUM.ANALYSIS, QUESTION_TYPE_ENUM.COMPOSE].includes(
                    item.questionType,
                ) && renderCompose(item)}
                {![QUESTION_TYPE_ENUM.ANALYSIS, QUESTION_TYPE_ENUM.COMPOSE].includes(
                    item.questionType,
                ) && renderScore(item)}
            </div>
        )
    }

    return (
        <div className={styles.component_question_list}>
            {questionList.map((item) => renderQuestion(item))}
            <AnswerOrbitModal
                code={quesCode}
                open={typeof quesCode === 'number'}
                onCancel={() => setQuesCode(undefined)}
            />
        </div>
    )
}

export default QuestionList
