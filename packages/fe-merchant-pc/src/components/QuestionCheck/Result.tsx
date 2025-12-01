// 查询结果

import { ExclamationCircleFilled } from '@ant-design/icons'
import { Empty } from '@wotu/wotu-components'
import { Alert, Space, Typography } from 'antd'
import { POLLING_STATUS } from './constants'
import styles from './index.module.less'
import type { PollingResult, QuestionItem } from './interface'
import QuestionList from './QuestionList'
import { useEffect, useState } from 'react'

const Result: React.FC<PollingResult> = ({ pollingStatus, repeatedList, showDelete, subject }) => {
    const [currentRepeatedList, setCurrentRepeatedList] = useState<QuestionItem[][]>([])

    useEffect(() => {
        setCurrentRepeatedList(repeatedList)
    }, [repeatedList])

    const handleDelete = (questionList: QuestionItem[], index: number) => {
        currentRepeatedList[index] = questionList
        setCurrentRepeatedList(() => [...currentRepeatedList])
    }

    return (
        <div className={styles.component_result}>
            {/* 等待查询状态 */}
            {pollingStatus === POLLING_STATUS.WAITING && (
                <div className={styles.waiting}>
                    <img
                        src="https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe-exam-pc/question_check_waiting.png"
                        alt="question_check_waiting"
                    />

                    <Alert
                        showIcon
                        type="info"
                        message="试题查重小贴士"
                        description={
                            <Space direction="vertical">
                                <Typography>1、请先设置查重范围后再点击【查重】按钮</Typography>
                                <Typography>2、题目/题干内容完全一致则视为重复</Typography>
                                <Typography>
                                    3、试题数量较多时查重时间可能会比较长，请耐心等待
                                </Typography>
                            </Space>
                        }
                    />
                </div>
            )}

            {/* 查询失败 */}
            {pollingStatus === POLLING_STATUS.FAIL && (
                <div className={styles.fail}>
                    <ExclamationCircleFilled style={{ fontSize: '70px', color: '#FF4D4F' }} />
                    <div className={styles.text}>查询失败，请重试</div>
                </div>
            )}

            {/* 查询完成 */}
            {pollingStatus === POLLING_STATUS.SUCCESS &&
                (currentRepeatedList.length ? (
                    <div className={styles.question_group}>
                        {currentRepeatedList.map((item, index) => (
                            <div className={styles.group_item} key={`item_${index}`}>
                                <div className={styles.group_header}>
                                    重复{index + 1}：共
                                    <Typography.Link>&nbsp;{item.length}&nbsp;</Typography.Link>题
                                </div>
                                <div className={styles.question_list_wrapper}>
                                    <QuestionList
                                        subject={subject}
                                        showDelete={showDelete}
                                        questionList={item}
                                        onDelete={questionList => handleDelete(questionList, index)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <Empty type="empty" text="暂无重复试题" size="small" />
                ))}
        </div>
    )
}

export default Result
