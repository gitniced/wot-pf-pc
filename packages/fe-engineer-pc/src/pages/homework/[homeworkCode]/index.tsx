import styles from './index.module.less'
import { inject, observer, useLocalObservable } from 'mobx-react'
import Store from './store'
import { useEffect, useMemo, useRef, useState } from 'react'
import CustomTitle from '@/components/CustomTitle'
import { useLocation, useParams } from 'umi'
import type { TabsProps } from 'antd'
import { Col, Row, Tabs, Tooltip } from 'antd'
import { getTaskExamTableColumns } from './const'
import BusinessTable from '@/components/BusinessTable'
import { useSaasTitle } from '@wotu/wotu-components'

const Index: React.FC = () => {
    useSaasTitle(`班级课后作业`)
    const { homeworkCode } = useParams<{ homeworkCode: string }>()
    const { query } = useLocation<{
        query: { scheduleCode: string }
    }>()
    const { scheduleCode } = query || {}
    const store = useLocalObservable(() => new Store())
    const actionRef = useRef({
        reload: () => {},
    })

    const [currentKey, setCurrentKey] = useState('1')
    const {
        getCourseClassInfo,
        getHomeworkBaseInfo,
        getHomeworkStudentList,
        gradedCount,
        pendingGradeCount,
        pendingSubmitCount,
        homeworkBaseInfo = {},
        courseClassInfo = {},
    } = store
    const { courseName, className } = courseClassInfo || {}
    const { taskName, stageName, stepName, activityName, homeworkName } = homeworkBaseInfo || {}
    const homeworkTableColumns = useMemo(
        () => getTaskExamTableColumns(currentKey, scheduleCode, homeworkCode),
        [currentKey, scheduleCode, homeworkCode],
    )

    useEffect(() => {
        getCourseClassInfo(scheduleCode)
    }, [scheduleCode])

    useEffect(() => {
        getHomeworkBaseInfo(homeworkCode)
    }, [homeworkCode])

    const tabsItems = useMemo<TabsProps['items']>(
        () => [
            {
                key: '0',
                label: (
                    <div className={styles.badge_container}>{`待提交${
                        pendingSubmitCount ? `(${pendingSubmitCount})` : ``
                    }`}</div>
                ),
            },
            {
                key: '1',
                label: (
                    <div className={styles.badge_container}>{`待评分${
                        pendingGradeCount ? `(${pendingGradeCount})` : ``
                    }`}</div>
                ),
            },
            {
                key: '2',
                label: (
                    <div className={styles.badge_container}>{`已评分${
                        gradedCount ? `(${gradedCount})` : ``
                    }`}</div>
                ),
            },
        ],
        [pendingSubmitCount, pendingGradeCount, gradedCount],
    )

    return (
        <div className={styles.page}>
            <CustomTitle title={`班级课后作业`} marginBottom={32} />
            <div className={styles.content}>
                <div className={styles.performance_info}>
                    <Row style={{ marginBottom: 24 }}>
                        <Col span={8}>
                            <div className={styles.performance_info_item}>
                                <span>课程：</span>
                                <Tooltip title={courseName} placement="topLeft">
                                    <span>{courseName}</span>
                                </Tooltip>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className={styles.performance_info_item}>
                                <span>班级：</span>
                                <Tooltip title={className} placement="topLeft">
                                    <span>{className}</span>
                                </Tooltip>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className={styles.performance_info_item}>
                                <span>学习任务：</span>
                                <Tooltip title={taskName} placement="topLeft">
                                    <span>{taskName}</span>
                                </Tooltip>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: 24 }}>
                        <Col span={8}>
                            <div className={styles.performance_info_item}>
                                <span>学习环节：</span>
                                <Tooltip title={stageName} placement="topLeft">
                                    <span>{stageName}</span>
                                </Tooltip>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className={styles.performance_info_item}>
                                <span>步骤：</span>
                                <Tooltip title={stepName} placement="topLeft">
                                    <span>{stepName}</span>
                                </Tooltip>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className={styles.performance_info_item}>
                                <span>活动：</span>
                                <Tooltip title={activityName} placement="topLeft">
                                    <span>{activityName}</span>
                                </Tooltip>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <div className={styles.performance_info_item}>
                                <span>课后作业：</span>
                                <Tooltip title={homeworkName} placement="topLeft">
                                    <span>{homeworkName}</span>
                                </Tooltip>
                            </div>
                        </Col>
                    </Row>
                </div>

                <div className={styles.content}>
                    <BusinessTable
                        actionRef={actionRef}
                        toolBar={false}
                        columns={homeworkTableColumns}
                        request={getHomeworkStudentList as any}
                        params={{
                            scheduleCode,
                            homeworkCode,
                            status: currentKey,
                        }}
                        rowKey="userCode"
                        pagination={false}
                        renderOptionBar={() => {
                            return (
                                <Tabs
                                    activeKey={currentKey}
                                    items={tabsItems}
                                    onChange={e => {
                                        setCurrentKey(e)
                                    }}
                                />
                            )
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default inject('userStore')(observer(Index))
