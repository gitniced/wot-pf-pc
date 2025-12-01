import { Table } from 'antd'
import styles from './index.module.less'
import { getExamineScoreColumns, examineCommentTypeOptions, EXAMINE_COMMENT_TYPE } from './const'
import { history, useLocation, useParams } from 'umi'
import { useEffect, useMemo } from 'react'
import { observer, useLocalObservable } from 'mobx-react'
import Store from './store'
import qs from 'qs'

const Index: React.FC = observer(() => {
    const { scheduleCode } = useParams<{ scheduleCode: string }>()
    const { query } = useLocation()
    const store = useLocalObservable(() => new Store())
    const {
        getStudentScoreTable,
        getPersonExamineStatistics,
        getTeamInfo,
        isLeader,
        personExamineStatistics,
        finalScore,
        tableData,
        performanceItemNum,
        homeworkItemNum,
        taskItemNum,
    } = store
    const examineScoreColumns = useMemo(
        () =>
            getExamineScoreColumns(scheduleCode, performanceItemNum, homeworkItemNum, taskItemNum),
        [scheduleCode, performanceItemNum, homeworkItemNum, taskItemNum],
    )

    useEffect(() => {
        getPersonExamineStatistics(scheduleCode)
        getStudentScoreTable(scheduleCode)
        getTeamInfo(scheduleCode)
    }, [scheduleCode])

    const newExamineCommentTypeOptions = useMemo(() => {
        const tempExamineCommentTypeOptions = examineCommentTypeOptions.map(i => {
            i.value = personExamineStatistics[i.key] || 0
            return i
        })
        if (isLeader) {
            return tempExamineCommentTypeOptions
        } else {
            return tempExamineCommentTypeOptions.filter(
                i => i.key !== EXAMINE_COMMENT_TYPE.interGroupPeerCount,
            )
        }
    }, [personExamineStatistics, isLeader])

    return (
        <div className={styles.examine}>
            <div className={styles.examine_task}>
                <div className={styles.task_title}>我的任务</div>
                <div className={styles.task_content}>
                    {newExamineCommentTypeOptions.map(item => (
                        <div
                            className={styles.task_content_item}
                            key={item.key}
                            onClick={() => {
                                history.push(
                                    `/mine-lesson/${scheduleCode}/examine/comment?${qs.stringify({
                                        ...query,
                                        type: item.key,
                                    })}`,
                                )
                            }}
                        >
                            <span className={styles.item_label}>{item.label}</span>
                            <span>
                                <span className={styles.strong}>{item.value}</span>
                                <span>项</span>
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.examine_score}>
                <div className={styles.score_title}>我的成绩</div>
                <Table
                    className={styles.score_table}
                    columns={examineScoreColumns as any}
                    dataSource={tableData}
                    pagination={false}
                    bordered
                    rowKey="code"
                    summary={pageData => {
                        let totalWeight = 0
                        pageData.forEach(({ weight }) => {
                            totalWeight += weight
                        })
                        if (pageData.length > 0) {
                            return (
                                <Table.Summary.Row>
                                    <Table.Summary.Cell index={0} align="center">
                                        合计
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={1} align="center">
                                        -
                                    </Table.Summary.Cell>

                                    <Table.Summary.Cell index={2} align="center">
                                        -
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={3} align="center">
                                        {totalWeight}
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={4} align="center">
                                        {String(finalScore?.status) === '0'
                                            ? '未出分'
                                            : finalScore?.score}
                                    </Table.Summary.Cell>
                                </Table.Summary.Row>
                            )
                        } else {
                            return null
                        }
                    }}
                />
            </div>
        </div>
    )
})

export default Index
