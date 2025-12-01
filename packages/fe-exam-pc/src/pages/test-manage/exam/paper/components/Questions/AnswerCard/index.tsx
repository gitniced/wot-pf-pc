// 答题卡
import styles from './index.module.less'
import classNames from 'classnames'
import { observer, useLocalObservable } from 'mobx-react'
import { MarkMiniImgUrl } from '@/pages/test-manage/exam/constant'

import PaperStore from '@/pages/test-manage/exam/paper/store'
import type { Item, QuestionItem } from '../../../interface'
import { Col, Row, Space } from 'antd'
import { isEmptyCustomize } from '../Topics/Options/Compose'
import { isEmpty } from 'lodash'
import { QUESTION_TYPE_ENUM } from '@/pages/question/[type]/constants'
import { getCookie } from '@/storage'
import Camera from '@/components/Camera'

const AnswerCard = () => {
    const store = useLocalObservable(() => PaperStore)

    const { answerList, questionList, currentQuestion } = store

    const allQuestions = questionList.reduce((prev, curr) => prev + curr.totalQuestion, 0)

    const filterAnswerList = answerList.filter(item => {
        // 基础题型 只要判断答案非空即可
        if (isEmpty(item.childList)) {
            return !isEmptyCustomize(item.answer)
        }
        // 组合题 + 案例分析题 需要判断所有的子题答案列表非空
        return !!item.childList?.filter(_ => !isEmptyCustomize(_?.answer)).length
    })

    // 已作答
    const computedDone = filterAnswerList.length
    // 部分作答
    const computedPartially = filterAnswerList.filter(item => item.isPartial).length
    // 未作答 = 全部答题 - 已经作答
    const computedNotDone = allQuestions - computedDone
    // 标记 判断有isMarked的标记即可，这里不用filterAnswerList是因为存在先不做题，只是标记的情况
    const computedMarked = answerList.filter(item => item.isMarked).length

    // 是否已完成答题
    const isDone = (item: QuestionItem, question: Item) => {
        const currentAnswer = answerList.find(_ => _?.questionCode === question.questionCode)
        // 如果不是组合题或者案例分析题，判断当前题目答案是否能在答案列表中找到即可
        if (
            ![QUESTION_TYPE_ENUM.COMPOSE, QUESTION_TYPE_ENUM.ANALYSIS].includes(item.questionType)
        ) {
            return !isEmptyCustomize(currentAnswer?.answer)
        } else {
            // 组合题是否答题完成 没有isPartial标记且childList答案列表不为空
            const { childList = [] } = currentAnswer ?? {}
            return (
                !currentAnswer?.isPartial &&
                !!childList?.filter(_ => !isEmptyCustomize(_?.answer)).length
            )
        }
    }

    const isPartial = (question: Item) => {
        // 判断当前的题目(母题)是否有isPartial标记
        return answerList.find(answer => answer.questionCode === question.questionCode)?.isPartial
    }

    const isMarked = (question: Item) => {
        // 判断当前的题目(母题)是否有isMarked标记
        return answerList.find(answer => answer.questionCode === question.questionCode)?.isMarked
    }

    const isSelected = (question: Item) => {
        return Boolean(question.questionCode === currentQuestion?.questionCode)
    }
    // 定位题目
    const onChangeQuestion = (question: Item, parentIndex: number, childIndex: number) => {
        store.onChangeQuestion(question, parentIndex, childIndex)
    }

    return (
        <div className={styles.component_answer_card}>
            <div className={styles.title}>答题卡</div>
            <div className={styles.mark_container}>
                <Row>
                    <Col span={12}>
                        <div className={styles.mark_item}>
                            <div className={styles.label}>
                                <span className={`${styles.icon} ${styles.icon_done}`} />
                                已做
                            </div>
                            <div className={styles.value}>
                                <span className={styles.high_light}>{computedDone}</span>/
                                {allQuestions}
                            </div>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className={styles.mark_item}>
                            <div className={styles.label}>
                                <span className={`${styles.icon} ${styles.icon_not_done}`} />
                                未做
                            </div>
                            <div className={styles.value}>
                                <span className={styles.high_light}>{computedNotDone}</span>/
                                {allQuestions}
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <div className={styles.mark_item}>
                            <div className={styles.label}>
                                <span className={`${styles.icon} ${styles.icon_is_partial}`} />
                                部分作答
                            </div>
                            <div className={styles.value}>{computedPartially}</div>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className={`${styles.mark_item} ${styles.marked}`}>
                            <div className={styles.label}>
                                <img
                                    src={MarkMiniImgUrl}
                                    className={`${styles.icon} ${styles.icon_marked}`}
                                />
                                标记
                            </div>
                            <div className={styles.value}>{computedMarked}</div>
                        </div>
                    </Col>
                </Row>
            </div>

            <div className={styles.question_list}>
                {/* 题型列表 */}
                {questionList.map((item, parentIndex) => (
                    <div className={styles.question_item} key={item.questionType}>
                        <div className={styles.q_title}>
                            {item.logicSort}、{item.title}
                        </div>
                        <Space className={styles.question_list_inner} size={19}>
                            {/* 题型里面的题目列表 */}
                            {item.questionList?.map((question, childIndex) => (
                                <div
                                    className={classNames(styles.question_sort, {
                                        [styles.isDone]: isDone(item, question),
                                        [styles.isPartial]: isPartial(question),
                                        [styles.isSelected]: isSelected(question),
                                    })}
                                    key={question.questionCode}
                                    onClick={() =>
                                        onChangeQuestion(question, parentIndex, childIndex)
                                    }
                                >
                                    {isMarked(question) && (
                                        <img src={MarkMiniImgUrl} className={styles.marked_icon} />
                                    )}
                                    <div className={styles.sort_text}>{question.questionSort}</div>
                                </div>
                            ))}
                        </Space>
                    </div>
                ))}
            </div>
            {/* 摄像头展示位置 TODO ew */}
            {getCookie('ALIAS') === 'ew' && <div className={styles.camera_section}>
                <Camera
                    height={170}
                    width={300}
                    autoStart={true}
                    allowClose={false}
                    onStatusChange={(isActive) => {
                        console.log('摄像头状态:', isActive ? '已启动' : '已关闭')
                    }}
                />
            </div>}
        </div>
    )
}

export default observer(AnswerCard)
