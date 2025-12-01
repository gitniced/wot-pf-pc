import { DatePicker, Select, Tabs, Tooltip, Typography } from 'antd'
import styles from './index.module.less'
import {
    EXAM_STATE_ENUM,
    EXAM_STATE_OPTIONS,
    GRADING_TYPE_OPTIONS,
    PROJECT_TYPE_ENUM,
    PROJECT_TYPE_OPTIONS,
} from '../constants'
import { useMemo, useState } from 'react'
import type { GradingListItem, GradingReq } from '../interface'
import { observer, useLocalObservable } from 'mobx-react'
import MarkManageStore from '../store'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { InfoCircleOutlined } from '@ant-design/icons'
import useUserStore from '@/hooks/useUserStore'
import type { ColumnsTypeItem } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import BusinessTable from '@/components/BusinessTable'
import { usePageListConfig } from '@wotu/wotu-components'
import { isEmpty } from 'lodash'
// @ts-ignore
import { history } from 'umi'

const ExamList = () => {
    const userStore = useUserStore()

    const store = useLocalObservable(() => MarkManageStore)

    const { getPageListConfig, setPageListConfig } = usePageListConfig()

    const [activeTab, setActiveTab] = useState<number>(
        Number(getPageListConfig('save_listTab', EXAM_STATE_ENUM.NOT_START)),
    )

    const onChangeTab = (activeKey: string) => {
        setPageListConfig(activeKey, 'save_listTab', true)
        setActiveTab(Number(activeKey))
    }

    const handleLinkToSetting = (taskCode: string) => {
        history.push(`/exam-manage/grading-settings/${taskCode}`)
    }

    const handleLinkToRecord = (taskCode: string) => {
        history.push(`/exam-manage/grading-record/${taskCode}`)
    }

    const defaultColumns = useMemo(
        () =>
            [
                {
                    title: '考试名称',
                    dataIndex: 'examTitle',
                    width: 150,
                    ellipsis: true,
                    search: true,
                },
                {
                    title: '考试开始时间',
                    dataIndex: 'startTime',
                    width: 200,
                    ellipsis: true,
                    search: true,
                    formItemProps: {
                        name: 'examTime',
                        tooltipSliceLen: 10,
                        labelCol: { span: 9 },
                        wrapperCol: { span: 15 },
                    },
                    renderFormItem: () => (
                        <DatePicker.RangePicker placeholder={['开始时间', '结束时间']} />
                    ),
                    render: (val: number) => dayjs(val).format('YYYY-MM-DD HH:mm:ss'),
                },
                {
                    title: '考试结束时间',
                    dataIndex: 'endTime',
                    width: 200,
                    ellipsis: true,
                    render: (val: number) => dayjs(val).format('YYYY-MM-DD HH:mm:ss'),
                },
                {
                    title: '关联项目',
                    dataIndex: 'projectTitle',
                    width: 200,
                    search: true,
                    ellipsis: true,
                },
                {
                    title: '项目类型',
                    dataIndex: 'projectType',
                    width: 150,
                    ellipsis: true,
                    search: true,
                    renderFormItem: () => (
                        <Select placeholder="请选择" options={PROJECT_TYPE_OPTIONS} />
                    ),
                    render: val => {
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
                    title: '阅卷老师数',
                    dataIndex: 'markingTeacherCount',
                    width: 150,
                    ellipsis: true,
                },
                {
                    title: '考生数',
                    dataIndex: 'stuCount',
                    width: 120,
                    ellipsis: true,
                },
                {
                    title: '试卷数',
                    dataIndex: 'paperCount',
                    width: 200,
                    ellipsis: true,
                    render: (_, record) => {
                        return `${record.paperCount}套，随机${record.randomPaperNumber}套`
                    },
                },
                {
                    title: '阅卷方式',
                    dataIndex: 'gradingType',
                    width: 120,
                    ellipsis: true,
                    fixed: activeTab === EXAM_STATE_ENUM.NOT_START ? 'right' : undefined,
                    render: projectType => {
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
                    title: (
                        <Tooltip title="若考试结束但已交卷数为0，可能是考试未正常开展">
                            已交卷数 <InfoCircleOutlined />
                        </Tooltip>
                    ) as any,
                    dataIndex: 'submitPaperCount',
                    width: 120,
                    ellipsis: true,
                    fixed: 'right',
                    // 未开始的试卷不显示已交卷数量
                    hide: activeTab === EXAM_STATE_ENUM.NOT_START,
                },
                {
                    title: '合格人数',
                    dataIndex: 'qualifiedCount',
                    width: 120,
                    ellipsis: true,
                    fixed: 'right',
                    // 只有已完成的试卷才显示
                    hide: activeTab !== EXAM_STATE_ENUM.FINISHED,
                },
                {
                    title: (
                        <Tooltip title="包含未交卷人数">
                            不合格人数 <InfoCircleOutlined />
                        </Tooltip>
                    ) as any,
                    dataIndex: 'unQualifiedCount',
                    width: 140,
                    ellipsis: true,
                    fixed: 'right',
                    // 只有已完成的试卷才显示
                    hide: activeTab !== EXAM_STATE_ENUM.FINISHED,
                },
                {
                    title: '操作',
                    dataIndex: 'opereate',
                    width: 150,
                    fixed: 'right',
                    render: (_, record) => {
                        if (activeTab === EXAM_STATE_ENUM.NOT_START) {
                            return (
                                <Typography.Link
                                    onClick={() => handleLinkToSetting(record.taskCode)}
                                >
                                    阅卷设置
                                </Typography.Link>
                            )
                        }

                        return (
                            <Typography.Link onClick={() => handleLinkToRecord(record.taskCode)}>
                                阅卷记录
                            </Typography.Link>
                        )
                    },
                },
            ] as ColumnsTypeItem<GradingListItem>[],
        [activeTab],
    )

    const getExtraInitParams = () => {
        const pageParams = getPageListConfig('save_params')
        const { startTime, endTime } = pageParams

        const examTime: (Dayjs | null)[] = [
            startTime ? dayjs(startTime) : null,
            endTime ? dayjs(endTime) : null,
        ]

        return { examTime }
    }

    const beforeSearchSubmit = (params: any) => {
        const { examTime, ...rest } = params
        const [startTime, endTime] = !isEmpty(examTime) ? examTime : []

        const _params: GradingReq = { ...rest }
        _params.startTime = startTime ? dayjs(startTime).startOf('day').valueOf() : null
        _params.endTime = endTime ? dayjs(endTime).endOf('day').valueOf() : null

        return _params
    }

    return (
        <div className={styles.component_exam_list}>
            <BusinessTable
                params={{
                    organizationCode: userStore?.selectedOrganization,
                    state: activeTab,
                }}
                rowKey="examCode"
                // @ts-ignore
                request={store.getGradingList}
                columns={defaultColumns}
                renderOptionBar={() => (
                    <Tabs activeKey={activeTab.toString()} onChange={onChangeTab}>
                        {EXAM_STATE_OPTIONS.map(item => (
                            <Tabs.TabPane tab={item.label} key={item.value} />
                        ))}
                    </Tabs>
                )}
                beforeSearchSubmit={beforeSearchSubmit}
                extraInitParams={getExtraInitParams()}
                toolBar={false}
            />
        </div>
    )
}

export default observer(ExamList)
