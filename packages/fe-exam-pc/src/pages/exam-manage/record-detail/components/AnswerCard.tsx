// 答题卡

import { Col, Collapse, Row, Space } from 'antd'
import styles from './index.module.less'
import { ANSWER_STATE_ENUM, ANSWER_STATE_OPTIONS } from '../constants'
import { DownOutlined } from '@ant-design/icons'
import { observer, useLocalObservable } from 'mobx-react'
import RecordDetailStore from '../store'
import type { Item, QuestionItem } from '../interface'
import classNames from 'classnames'

const AnswerCard = () => {
    const store = useLocalObservable(() => RecordDetailStore)
    const { recordDetail } = store
    const { questionList = [], answerList = [] } = recordDetail ?? {}

    const renderHeader = (item: QuestionItem) => {
        return `${item.logicSort}、${item.title}(${item.totalQuestion})`
    }

    const hasClassName = (item: Item, answerState: number) => {
        return (
            answerList.find(answer => answer.questionCode === item.questionCode)?.state ===
            answerState
        )
    }

    /** 滚动到相应的题号 */
    const scrollToView = (id: string) => {
        document
            .getElementById(`component_topic_list`)
            ?.scrollTo(0, (document.getElementById(`question_${id}`)?.offsetTop || 0) - 130)
    }

    return (
        <div className={styles.component_answer_card}>
            <div className={styles.title}>答题卡</div>

            <div className={styles.state_list}>
                <Row gutter={[0, 16]}>
                    {ANSWER_STATE_OPTIONS.map(item => (
                        <Col key={item.value} span={item.span}>
                            <div className={styles.state_item}>
                                <span className={`${styles.block} ${styles[item.className]}`} />
                                <span className={styles.text}>{item.label}</span>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>

            <div className={styles.topic_list}>
                {questionList.map(item => (
                    <div className={styles.topic_item} key={item.questionType}>
                        <Collapse
                            bordered={false}
                            defaultActiveKey={1}
                            expandIcon={({ isActive }) => (
                                <DownOutlined rotate={!isActive ? -90 : 0} />
                            )}
                            expandIconPosition="end"
                        >
                            <Collapse.Panel header={renderHeader(item)} key={1}>
                                <div className={styles.question_list}>
                                    <Space size={12} wrap>
                                        {item.questionList.map(_item => (
                                            <div
                                                className={classNames(styles.sort, {
                                                    [styles.right]: hasClassName(
                                                        _item,
                                                        ANSWER_STATE_ENUM.RIGHT,
                                                    ),
                                                    [styles.wrong]: hasClassName(
                                                        _item,
                                                        ANSWER_STATE_ENUM.WRONG,
                                                    ),
                                                    [styles.grading]: hasClassName(
                                                        _item,
                                                        ANSWER_STATE_ENUM.GRADING,
                                                    ),
                                                    [styles.partial]: hasClassName(
                                                        _item,
                                                        ANSWER_STATE_ENUM.PARTIAL,
                                                    ),
                                                    // [styles.empty]: hasClassName(_item, ANSWER_STATE_ENUM.EMPTY)
                                                })}
                                                key={_item.questionCode}
                                                onClick={() => scrollToView(_item.questionCode)}
                                            >
                                                {_item.logicSort}
                                            </div>
                                        ))}
                                    </Space>
                                </div>
                            </Collapse.Panel>
                        </Collapse>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default observer(AnswerCard)
