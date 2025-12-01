// 阅卷任务列表
import styles from './index.module.less'
import { Typography, DatePicker, Select } from 'antd'
import { observer, useLocalObservable } from 'mobx-react'
import TaskStore from '../store'
import type { ColumnProps } from 'antd/lib/table'
import {
    GRADING_TYPE_OPTIONS,
    PROJECT_TYPE_ENUM,
    PROJECT_TYPE_OPTIONS,
} from '@/pages/exam-manage/grading-manage/constants'
import dayjs from 'dayjs'
import useMasterHistory from '@/hooks/userMasterHistory'
import type { ColumnsTypeItem } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import { usePageListConfig } from '@wotu/wotu-components'
import { isEmpty } from 'lodash'
import BusinessTable from '@/components/BusinessTable'
import { useState } from 'react'

const { RangePicker } = DatePicker

interface _ColumnProps extends ColumnProps<any> {
    hidden?: boolean
    taskCode?: string
    examCode?: string
}

const TaskList = () => {
    const store = useLocalObservable(() => TaskStore)

    const masterHistory = useMasterHistory()

    // 去详情
    const handleLinkDetail = (record: _ColumnProps) => {
        const { examCode, taskCode } = record
        masterHistory.push(`/exam-center/grading/record-detail/${taskCode}?examCode=${examCode}`)
    }

    const [columns] = useState([
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
            render: (_: any, { startTime }: any) => dayjs(startTime).format('YYYY-MM-DD HH:mm:ss'),
            renderFormItem: () => {
                return <RangePicker />
            },
        },
        {
            title: '考试结束时间',
            dataIndex: 'endTime',
            width: 200,
            render: endTime => dayjs(endTime).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
            title: '关联项目',
            dataIndex: 'projectTitle',
            ellipsis: true,
            width: 200,
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
                return <Select placeholder="请选择" options={PROJECT_TYPE_OPTIONS} allowClear />
            },
            render: val => {
                const curProjectType = PROJECT_TYPE_OPTIONS.find(item => item.value === val)
                if ([PROJECT_TYPE_ENUM.COMPETITION, PROJECT_TYPE_ENUM.EVALUATION].includes(val)) {
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
            render: projectType => {
                const curGradingType = GRADING_TYPE_OPTIONS.find(item => item.value === projectType)
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
            title: '操作',
            dataIndex: 'options',
            fixed: 'right',
            width: 140,
            render: (_, record) => (
                <Typography.Link onClick={() => handleLinkDetail(record)}>查看详情</Typography.Link>
            ),
        },
    ] as ColumnsTypeItem<any>[])

    const { getPageListConfig } = usePageListConfig()

    const getExtraInitParams = () => {
        const pageParams = getPageListConfig('save_params')
        let { examTime, projectType = '' } = pageParams

        if (examTime) {
            examTime = examTime.map((v: string) => dayjs(v))
        }
        return { projectType, ...pageParams, examTime }
    }

    return (
        <div className={styles.component_task_list}>
            <BusinessTable
                columns={columns}
                extraInitParams={getExtraInitParams()}
                beforeSearchSubmit={(values: any) => {
                    const { examTime = [], examTitle, projectTitle, projectType } = values
                    const params: Partial<any> = { examTitle, projectTitle, projectType }

                    const [startTime, endTime] = !isEmpty(examTime) ? examTime : []
                    params.startTime = startTime ? dayjs(startTime).startOf('day').valueOf() : null
                    params.endTime = endTime ? dayjs(endTime).endOf('day').valueOf() : null
                    return { ...values, ...params }
                }}
                request={(params: any) => store.getTaskList(params)}
            />
        </div>
    )
}

export default observer(TaskList)
