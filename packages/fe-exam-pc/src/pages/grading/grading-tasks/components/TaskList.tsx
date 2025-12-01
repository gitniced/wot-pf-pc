// 阅卷任务列表
import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './index.module.less'
import { Tabs, Typography, DatePicker, Select, Modal, Button, Space } from 'antd'
import { GRADING_TASK_ENUM, GRADING_TASK_OPTIONS } from '../constants'
import { observer, useLocalObservable } from 'mobx-react'
import TaskStore from '../store'
import {
    GRADING_TYPE_OPTIONS,
    PROJECT_TYPE_ENUM,
    PROJECT_TYPE_OPTIONS,
} from '@/pages/exam-manage/grading-manage/constants'
import dayjs from 'dayjs'
import { history } from 'umi'
import type { RouteQuery, TaskListReq } from '../interface'
import useMasterHistory from '@/hooks/userMasterHistory'
import BusinessTable from '@/components/BusinessTable'
import type { TaskListItem } from '../interface'
import { usePageListConfig } from '@wotu/wotu-components'
import { isEmpty } from 'lodash'
import type { ColumnsTypeItem } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import { getCookie } from '@/storage'

const { RangePicker } = DatePicker

const TaskList = () => {
    const masterHistory = useMasterHistory()
    const { getPageListConfig, setPageListConfig } = usePageListConfig()
    const actionRef = useRef<any>()
    const [activeTab, setActiveTab] = useState<number>(GRADING_TASK_ENUM.WAITING)
    const store = useLocalObservable(() => TaskStore)
    const [open, setOpen] = useState(false)

    const { toBeGradedList = [], toBeSubmitList = [] } = store
    const routeQuery = history.location.query

    useEffect(() => {
        const { save_listTab = '10' } = routeQuery as unknown as RouteQuery
        setPageListConfig(Number(save_listTab), 'save_listTab', true)
        setActiveTab(Number(save_listTab))
    }, [])

    const handleCancel = () => {
        setOpen(false)
    }

    const columns = useMemo(
        () =>
            [
                {
                    title: '考试名称',
                    dataIndex: 'examTitle',
                    width: 200,
                    ellipsis: true,
                    search: true,
                },
                {
                    title: '考试开始时间',
                    dataIndex: 'examTime',
                    width: 200,
                    search: true,
                    formItemProps: {
                        label: '考试时间',
                    },
                    render: (_: any, { startTime }: any) =>
                        dayjs(startTime).format('YYYY-MM-DD HH:mm:ss'),
                    renderFormItem: () => {
                        return <RangePicker />
                    },
                },
                {
                    title: '考试结束时间',
                    dataIndex: 'endTime',
                    width: 200,
                    render: (endTime: any) => dayjs(endTime).format('YYYY-MM-DD HH:mm:ss'),
                },
                {
                    title: '关联项目',
                    dataIndex: 'projectTitle',
                    width: 200,
                    ellipsis: true,
                    search: true,
                },
                {
                    title: '项目类型',
                    dataIndex: 'projectType',
                    width: 120,
                    search: true,
                    formItemProps: {
                        initialValue: '',
                    },
                    renderFormItem: () => {
                        return (
                            <Select
                                placeholder="请选择"
                                options={PROJECT_TYPE_OPTIONS}
                                allowClear
                            />
                        )
                    },
                    render: (val: any) => {
                        const curProjectType = PROJECT_TYPE_OPTIONS.find(item => item.value === val)
                        if (
                            [PROJECT_TYPE_ENUM.COMPETITION, PROJECT_TYPE_ENUM.EVALUATION].includes(
                                val,
                            )
                        ) {
                            return (
                                <span
                                    className={styles.project_type}
                                    style={{
                                        color: curProjectType?.color,
                                        borderColor: curProjectType?.color,
                                        backgroundColor: curProjectType?.bgColor,
                                    }}
                                >
                                    {curProjectType?.label}
                                </span>
                            )
                        }
                    },
                },
                {
                    title: '阅卷方式',
                    dataIndex: 'gradingType',
                    width: 120,
                    render: (projectType: any) => {
                        const curGradingType = GRADING_TYPE_OPTIONS.find(
                            item => item.value === projectType,
                        )
                        return (
                            <span
                                className={styles.project_type}
                                style={{
                                    color: curGradingType?.color,
                                    borderColor: curGradingType?.color,
                                    backgroundColor: curGradingType?.bgColor,
                                }}
                            >
                                {curGradingType?.label}
                            </span>
                        )
                    },
                },
                {
                    title: '待确认数',
                    dataIndex: 'readCount',
                    width: 120,
                    hide: activeTab === GRADING_TASK_ENUM.WAITING,
                },
                {
                    title: '操作',
                    dataIndex: 'options',
                    fixed: 'right',
                    // TODO ew 
                    width: getCookie('ALIAS') === 'ew' ? 250 : 140,
                    render: (_: any, record: any) => {
                        if (activeTab === GRADING_TASK_ENUM.WAITING) {
                            return (<Space>
                                <Typography.Link onClick={() => handleLinkDetail(record.taskCode)}>
                                    阅卷
                                </Typography.Link>
                                {/* TODO ew */}
                                {getCookie('ALIAS') === 'ew' && <>
                                    <Typography.Link>
                                        标记异常卷
                                    </Typography.Link>
                                    <Typography.Link onClick={() => setOpen(true)}>
                                        考评员签字
                                    </Typography.Link>
                                </>}
                            </Space>)
                        }
                        return (<Space>
                            <Typography.Link
                                onClick={() => {
                                    handleSubmit(record.taskCode, record.examCode)
                                }}
                            >
                                提交
                            </Typography.Link>
                            {/* TODO ew */}
                            {getCookie('ALIAS') === 'ew' && <>
                                <Typography.Link>
                                    标记异常卷
                                </Typography.Link>
                                <Typography.Link onClick={() => setOpen(true)}>
                                    考评员签字
                                </Typography.Link>
                            </>}
                        </Space>
                        )
                    },
                },
            ] as ColumnsTypeItem<TaskListItem>[],
        [activeTab],
    )

    const onChangeTab = (activeKey: string) => {
        setActiveTab(Number(activeKey))
        setPageListConfig(activeKey, 'save_listTab', true)
    }

    // 去阅卷页面
    const handleLinkDetail = (taskCode: string) => {
        window.open(`/exam-center/grading/grading-detail/${taskCode}`, '_blank')
    }

    // 去提交成绩
    const handleSubmit = (taskCode: string, examCode: string) => {
        masterHistory.push(`/exam-center/grading/grading-submit/${taskCode}?examCode=${examCode}`)
    }

    const getExtraInitParams = () => {
        const pageParams = getPageListConfig('save_params')
        let { examTime } = pageParams

        if (examTime) {
            examTime = examTime.map((v: string) => dayjs(v))
        }
        return { ...pageParams, examTime }
    }

    return (
        <div className={styles.component_task_list}>
            <BusinessTable
                actionRef={actionRef}
                params={{ activeTab }}
                request={(params: any) => store.getTaskList(params, activeTab)}
                columns={columns}
                renderOptionBar={{
                    top: () =>
                        (
                            <Tabs activeKey={activeTab.toString()} onChange={onChangeTab}>
                                {GRADING_TASK_OPTIONS.map(item => {
                                    const count =
                                        item.value === GRADING_TASK_ENUM.WAITING
                                            ? toBeGradedList.length
                                            : toBeSubmitList.length

                                    return (
                                        <Tabs.TabPane
                                            tab={`${item.label}（${count}）`}
                                            key={item.value}
                                        />
                                    )
                                })}
                            </Tabs>
                        ) as JSX.Element,
                }}
                extraInitParams={getExtraInitParams()}
                beforeSearchSubmit={(values: any) => {
                    const { examTime = [], examTitle, projectTitle, projectType } = values
                    const params: Partial<TaskListReq> = { examTitle, projectTitle, projectType }

                    const [startTime, endTime] = !isEmpty(examTime) ? examTime : []
                    params.startTime = startTime ? dayjs(startTime).startOf('day').valueOf() : null
                    params.endTime = endTime ? dayjs(endTime).endOf('day').valueOf() : null

                    return { ...values, ...params }
                }}
            />

            <Modal
                open={open}
                title="考评员签字"
                onCancel={handleCancel}
                footer={<Button onClick={handleCancel}>取消</Button>}
                width={448}
            >
                <Space
                    direction="vertical"
                    align='center'
                    className={styles.wrapper}
                >
                    <img src="https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe-exam-pc/blank_qrcode_0730a005.png" />
                    <div className={styles.text}>请使用移动设备扫码签字</div>
                </Space>
            </Modal>
        </div>
    )
}

export default observer(TaskList)
