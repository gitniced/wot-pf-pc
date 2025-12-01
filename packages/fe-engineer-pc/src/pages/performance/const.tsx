import { Badge, Button, Select, Tooltip } from 'antd'
import type { ColumnsType } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import type { ClassPerformancePageDto } from './interface'
import { history } from 'umi'
import MoreSelect from '@/components/MoreSelect'
// import MoreSelect from '@/components/MoreSelect'

/**
 * 课堂表现状态枚举
 */
export enum PERFORMANCE_STATUS {
    /** 已评分 */
    COMPLETED = 1,
    /** 未评分 */
    PENDING = 0,
}

/**
 * 筛选项
 */
export const PERFORMANCE_STATUS_OPTIONS = [
    {
        text: '已评分',
        value: PERFORMANCE_STATUS.COMPLETED,
    },
    {
        text: '未评分',
        value: PERFORMANCE_STATUS.PENDING,
    },
]

/**
 * 课堂表现状态配置
 */
export const PERFORMANCE_STATUS_CONFIG = {
    [PERFORMANCE_STATUS.COMPLETED]: {
        text: '已评分',
        color: 'success' as const,
    },
    [PERFORMANCE_STATUS.PENDING]: {
        text: '未评分',
        color: 'default' as const,
    },
}

/**
 * 处理查看详情
 */
const handleViewDetail = (record: ClassPerformancePageDto) => {
    const { scheduleCode, stepCode } = record
    if (scheduleCode && stepCode) {
        history.push(
            `/performance/info?scheduleCode=${scheduleCode}&stepCode=${stepCode}&mode=view`,
        )
    }
}

/**
 * 处理开始评分
 */
const handleStartGrading = (record: ClassPerformancePageDto) => {
    const { scheduleCode, stepCode } = record
    if (scheduleCode && stepCode) {
        history.push(
            `/performance/info?scheduleCode=${scheduleCode}&stepCode=${stepCode}&mode=grade`,
        )
    }
}

/**
 * 课堂表现表格列配置
 */
export const getClassPerformanceColumns = (
    formValue: any,
): ColumnsType<ClassPerformancePageDto> => {
    const { courseCode, taskCode, stageCode } = formValue || {}

    return [
        {
            search: true,
            title: '课程',
            dataIndex: 'courseCode',
            key: 'courseCode',
            hide: true,
            renderFormItem: () => (
                <MoreSelect
                    labelKey="courseName"
                    valueKey={'courseCode'}
                    requestUrl={'/wil/teaching/teacherCourses'}
                    placeholder="请选择"
                    style={{ width: '100%' }}
                    isHasPage={false}
                />
            ),
        },
        {
            search: true,
            title: '班级',
            dataIndex: 'classCode',
            key: 'classCode',
            hide: true,
            renderFormItem: () => (
                <MoreSelect
                    labelKey="className"
                    valueKey="classCode"
                    searchKey="classNameKeyword"
                    requestParams={{
                        courseCode,
                    }}
                    requestUrl={'/wil/teaching/teacherClasses'}
                    requestMethod={'get'}
                    placeholder="请选择"
                    style={{ width: '100%' }}
                    isHasPage={false}
                />
            ),
        },

        {
            search: true,
            title: '任务',
            dataIndex: 'taskCode',
            key: 'taskCode',
            hide: true,
            renderFormItem: () => (
                <MoreSelect
                    labelKey="taskName"
                    valueKey="taskCode"
                    disabled={!courseCode}
                    requestParams={{
                        courseCode,
                    }}
                    requestUrl={'/wil/teaching/teacherTasks'}
                    placeholder="请选择"
                    style={{ width: '100%' }}
                    isHasPage={false}
                />
            ),
        },
        {
            search: true,
            title: '环节',
            dataIndex: 'stageCode',
            key: 'stageCode',
            hide: true,
            renderFormItem: () => (
                <MoreSelect
                    labelKey="stageName"
                    valueKey="stageCode"
                    disabled={!courseCode || !taskCode}
                    requestParams={{
                        courseCode,
                        taskCode,
                    }}
                    requestUrl={'/wil/teaching/teacherStages'}
                    placeholder="请选择"
                    style={{ width: '100%' }}
                    isHasPage={false}
                />
            ),
        },
        {
            search: true,
            title: '步骤',
            dataIndex: 'stepCode',
            key: 'stepCode',
            hide: true,
            renderFormItem: () => (
                <MoreSelect
                    labelKey="stepName"
                    valueKey="stepCode"
                    disabled={!courseCode || !taskCode || !stageCode}
                    requestParams={{
                        courseCode,
                        taskCode,
                        stageCode,
                    }}
                    requestUrl={'/wil/teaching/teacherSteps'}
                    placeholder="请选择"
                    style={{ width: '100%' }}
                    isHasPage={false}
                />
            ),
        },
        {
            title: '课程',
            dataIndex: 'courseName',
            key: 'courseName',
            width: '15%',
            ellipsis: {
                showTitle: false,
            },
            render: (text: string) => (
                <Tooltip placement="topLeft" title={text}>
                    <span style={{ fontWeight: 500 }}>{text || '-'}</span>
                </Tooltip>
            ),
        },
        {
            title: '班级',
            dataIndex: 'className',
            key: 'className',
            width: '15%',
            ellipsis: {
                showTitle: false,
            },
            render: (text: string) => (
                <Tooltip placement="topLeft" title={text}>
                    {text || '-'}
                </Tooltip>
            ),
        },
        {
            title: '学习任务',
            dataIndex: 'taskName',
            key: 'taskName',
            width: '15%',
            ellipsis: {
                showTitle: false,
            },
            render: (text: string) => (
                <Tooltip placement="topLeft" title={text}>
                    {text || '-'}
                </Tooltip>
            ),
        },
        {
            title: '学习环节',
            dataIndex: 'stageName',
            key: 'stageName',
            width: '15%',
            ellipsis: {
                showTitle: false,
            },
            render: (text: string) => (
                <Tooltip placement="topLeft" title={text}>
                    {text || '-'}
                </Tooltip>
            ),
        },
        {
            title: '步骤',
            dataIndex: 'stepName',
            key: 'stepName',
            width: '20%',
            ellipsis: {
                showTitle: false,
            },
            render: (text: string) => (
                <Tooltip placement="topLeft" title={text}>
                    {text || '-'}
                </Tooltip>
            ),
        },
        {
            search: true,
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: '10%',
            align: 'center' as const,
            render: (_: number) => {
                const config =
                    PERFORMANCE_STATUS_CONFIG[_ as PERFORMANCE_STATUS] ||
                    PERFORMANCE_STATUS_CONFIG[PERFORMANCE_STATUS.PENDING]
                return <Badge status={config.color} text={config.text} />
            },
            renderFormItem: () => {
                return (
                    <Select
                        options={PERFORMANCE_STATUS_OPTIONS.map(item => ({
                            key: item.value,
                            label: item.text,
                            value: item.value,
                        }))}
                        placeholder="请选择"
                        style={{ width: '100%' }}
                    />
                )
            },
        },
        {
            title: '操作',
            key: 'action',
            width: '10%',
            align: 'center' as const,
            fixed: 'right',
            render: (_, record: ClassPerformancePageDto) => {
                const isCompleted = record.status === PERFORMANCE_STATUS.COMPLETED
                return (
                    <div className="action-buttons">
                        {!isCompleted ? (
                            <Button
                                type="link"
                                size="small"
                                onClick={() => handleStartGrading(record)}
                            >
                                评分
                            </Button>
                        ) : (
                            <Button
                                type="link"
                                size="small"
                                onClick={() => handleViewDetail(record)}
                            >
                                详情
                            </Button>
                        )}
                    </div>
                )
            },
        },
    ]
}
