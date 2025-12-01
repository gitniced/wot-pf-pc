import styles from './index.module.less'
import { inject, observer, useLocalObservable } from 'mobx-react'
import Store from './store'
import { useEffect, useMemo, useRef, useState } from 'react'
import CustomTitle from '@/components/CustomTitle'
import { Link, useLocation, useParams } from 'umi'
import type { TabsProps } from 'antd'
import { Col, Row, Tabs, Tooltip } from 'antd'
import { getTaskExamTableColumns } from './const'
import BusinessTable from '@/components/BusinessTable'
import { useSaasTitle } from '@wotu/wotu-components'

const Index: React.FC = () => {
    useSaasTitle(`班级任务考核`)
    const { projectCode } = useParams<{ projectCode: string }>()
    const { query } = useLocation<{
        query: { scheduleCode: string }
    }>()
    const { scheduleCode } = query || {}
    const store = useLocalObservable(() => new Store())
    const actionRef = useRef({
        reload: () => {},
    })

    const [currentKey, setCurrentKey] = useState('2')
    const {
        getTaskExamProjectStudentList,
        getTaskExamProjectInfo,
        getCourseClassInfo,
        taskExamProjectInfo = {},
        courseClassInfo = {},
        gradedCount = 0,
        pendingGradeCount = 0,
        pendingSubmitCount = 0,
    } = store
    const { taskName, projectName } = taskExamProjectInfo || {}
    const { courseName, className } = courseClassInfo || {}
    const taskExamTableColumns = useMemo(
        () => getTaskExamTableColumns(currentKey, scheduleCode, projectCode),
        [currentKey, scheduleCode, projectCode],
    )

    useEffect(() => {
        getCourseClassInfo(scheduleCode)
    }, [scheduleCode])

    useEffect(() => {
        getTaskExamProjectInfo(projectCode)
    }, [projectCode])

    const tabsItems = useMemo<TabsProps['items']>(
        () => [
            {
                key: '2',
                label: (
                    <div className={styles.badge_container}>
                        <div className={styles.badge_text}>{`待提交${
                            pendingSubmitCount ? `(${pendingSubmitCount})` : ``
                        }`}</div>
                    </div>
                ),
            },
            {
                key: '0',
                label: (
                    <div className={styles.badge_container}>
                        <div className={styles.badge_text}>{`待评分${
                            pendingGradeCount ? `(${pendingGradeCount})` : ``
                        }`}</div>
                    </div>
                ),
            },
            {
                key: '1',
                label: (
                    <div className={styles.badge_container}>
                        <div className={styles.badge_text}>{`已评分${
                            gradedCount ? `(${gradedCount})` : ``
                        }`}</div>
                    </div>
                ),
            },
        ],
        [pendingSubmitCount, pendingGradeCount, gradedCount],
    )

    return (
        <div className={styles.page}>
            <CustomTitle title={`班级任务考核`} marginBottom={32} />
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

                    <Row>
                        <Col span={8}>
                            <div className={styles.performance_info_item}>
                                <span>考核项目：</span>
                                <span>
                                    {projectName}
                                    <Link
                                        to={`/projects/${projectCode}/description?projectCode=${projectCode}`}
                                    >
                                        考核项目说明
                                    </Link>
                                </span>
                            </div>
                        </Col>
                    </Row>
                </div>

                <div className={styles.content}>
                    <BusinessTable
                        actionRef={actionRef}
                        toolBar={false}
                        columns={taskExamTableColumns}
                        request={getTaskExamProjectStudentList as any}
                        params={{
                            scheduleCode,
                            projectCode,
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
