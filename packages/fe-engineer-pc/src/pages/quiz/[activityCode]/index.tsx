import styles from './index.module.less'
import { inject, observer, useLocalObservable } from 'mobx-react'
import Store from './store'
import { useEffect, useMemo, useRef, useState } from 'react'
import CustomTitle from '@/components/CustomTitle'
import { useLocation, useParams } from 'umi'
import type { TabsProps } from 'antd'
import { Tooltip } from 'antd'
import { Col, Row, Tabs } from 'antd'
import { getTaskExamTableColumns } from './const'
import BusinessTable from '@/components/BusinessTable'
import { useSaasTitle } from '@wotu/wotu-components'
import { InfoCircleOutlined } from '@ant-design/icons'

const Index: React.FC = () => {
    const { activityCode } = useParams<{ activityCode: string }>()
    const { query } = useLocation<{
        query: { scheduleCode: string }
    }>()
    const { scheduleCode } = query || {}
    const store = useLocalObservable(() => new Store())
    const actionRef = useRef({
        reload: () => {},
    })

    const [currentKey, setCurrentKey] = useState('0')
    const {
        getCourseClassInfo,
        getHomeworkBaseInfo,
        getHomeworkStudentList,
        toSubmitCount,
        toCorrectCount,
        alreadyCorrectCount,
        homeworkBaseInfo = {},
        courseClassInfo = {},
        questionCodes = [],
    } = store
    const { courseName, className } = courseClassInfo || {}
    const { taskName, stageName, stepName, activityName } = homeworkBaseInfo || {}
    const homeworkTableColumns = useMemo(() => {
        const deafultList = getTaskExamTableColumns(currentKey, scheduleCode, activityCode)
        return [
            deafultList[0],
            ...questionCodes.map((item, index) => ({
                dataIndex: `resultMap.${item}`,
                render: (_: string, record: any) => {
                    return (
                        <>
                            {record?.scoreMap?.[item] || '-'}&nbsp;&nbsp;
                            {record?.commentMap?.[item] ? (
                                <Tooltip title={record?.commentMap?.[item]}>
                                    <InfoCircleOutlined />
                                </Tooltip>
                            ) : null}
                        </>
                    )
                },
                title: `测验${index + 1}`,
                ellipsis: true,
                width: 200,
            })),
            deafultList[1],
        ]
    }, [currentKey, scheduleCode, activityCode, questionCodes])

    useEffect(() => {
        getCourseClassInfo(scheduleCode)
    }, [scheduleCode])

    useEffect(() => {
        getHomeworkBaseInfo({ activityCode, scheduleCode })
    }, [activityCode])

    useSaasTitle(`班级课堂测验`)

    const tabsItems = useMemo<TabsProps['items']>(
        () => [
            {
                key: '0',
                label: (
                    <div className={styles.badge_container}>{`待提交${
                        toSubmitCount ? `(${toSubmitCount})` : ``
                    }`}</div>
                ),
            },
            {
                key: '1',
                label: (
                    <div className={styles.badge_container}>{`待批改${
                        toCorrectCount ? `(${toCorrectCount})` : ``
                    }`}</div>
                ),
                hide: !homeworkBaseInfo?.needCorrect,
            },
            {
                key: '2',
                label: (
                    <div className={styles.badge_container}>{`${
                        homeworkBaseInfo?.needCorrect ? '已批改' : '已提交'
                    }${alreadyCorrectCount ? `(${alreadyCorrectCount})` : ``}`}</div>
                ),
            },
        ],
        [toSubmitCount, toCorrectCount, alreadyCorrectCount, homeworkBaseInfo],
    )

    return (
        <div className={styles.page}>
            <CustomTitle title={`班级课堂测验`} marginBottom={32} />
            <div className={styles.content}>
                <div className={styles.performance_info}>
                    <Row style={{ marginBottom: 24 }}>
                        <Col span={8}>
                            <div className={styles.performance_info_item}>
                                <span>课程：</span>
                                <span>{courseName}</span>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className={styles.performance_info_item}>
                                <span>班级：</span>
                                <span>{className}</span>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className={styles.performance_info_item}>
                                <span>学习任务：</span>
                                <span>{taskName}</span>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: 24 }}>
                        <Col span={8}>
                            <div className={styles.performance_info_item}>
                                <span>学习环节：</span>
                                <span>{stageName}</span>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className={styles.performance_info_item}>
                                <span>步骤：</span>
                                <span>{stepName}</span>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className={styles.performance_info_item}>
                                <span>活动：</span>
                                <span>{activityName}</span>
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
                            activityCode,
                            status: currentKey,
                        }}
                        rowKey="userCode"
                        pagination={false}
                        renderOptionBar={() => {
                            return (
                                <Tabs
                                    activeKey={currentKey}
                                    items={tabsItems?.filter((item: any) => !item?.hide)}
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
