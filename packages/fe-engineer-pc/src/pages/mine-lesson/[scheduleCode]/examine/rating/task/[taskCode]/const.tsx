import { Badge, Button, Select, Tooltip } from 'antd'
import type { ColumnsType } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import type { TaskAssessmentPageDto } from '../../interface'
import { history } from 'umi'

/**
 * 课堂表现状态枚举
 */
export enum PERFORMANCE_STATUS {
    /** 未评分 */
    PENDING = 0,
    /** 部分评分 */
    PARTIAL = 1,
    /** 已评分 */
    COMPLETED = 2,
}

/**
 * 筛选项
 */
export const PERFORMANCE_STATUS_OPTIONS = [
    {
        text: '未评分',
        value: PERFORMANCE_STATUS.PENDING,
    },
    {
        text: '部分评分',
        value: PERFORMANCE_STATUS.PARTIAL,
    },
    {
        text: '全部评分',
        value: PERFORMANCE_STATUS.COMPLETED,
    },
]

/**
 * 课堂表现状态配置
 */
export const PERFORMANCE_STATUS_CONFIG = {
    [PERFORMANCE_STATUS.COMPLETED]: {
        text: '全部评分',
        color: 'success' as const,
    },
    [PERFORMANCE_STATUS.PARTIAL]: {
        text: '部分评分',
        color: 'warning' as const,
    },
    [PERFORMANCE_STATUS.PENDING]: {
        text: '未评分',
        color: 'default' as const,
    },
}

/**
 * 处理点击跳转
 */
const handleToInfo = (record: TaskAssessmentPageDto) => {
    const { scheduleCode, projectCode } = record
    if (scheduleCode && projectCode) {
        history.push(`/projects/${projectCode}?scheduleCode=${scheduleCode}`)
    }
}

/**
 * 课堂表现表格列配置
 */
export const getClassTaskExamColumns = (): ColumnsType<TaskAssessmentPageDto> => {
    return [
        {
            title: '学习任务',
            dataIndex: 'taskName',
            key: 'taskName',
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
            title: '考核项目',
            dataIndex: 'projectName',
            key: 'projectName',
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
            title: '配分（%）',
            dataIndex: 'weight',
            key: 'weight',
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
            title: '待提交',
            dataIndex: 'pendingSubmitCount',
            key: 'pendingSubmitCount',
            width: '10%',
            ellipsis: {
                showTitle: false,
            },
            render: (text: string) => (
                <Tooltip placement="top" title={text}>
                    {text || '-'}
                </Tooltip>
            ),
        },

        {
            title: '待评分',
            dataIndex: 'pendingGradeCount',
            key: 'pendingGradeCount',
            width: '10%',
            ellipsis: {
                showTitle: false,
            },
            render: (text: string) => (
                <Tooltip placement="top" title={text}>
                    {text || '-'}
                </Tooltip>
            ),
        },
        {
            search: true,
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: '20%',
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
            render: (_, record: any) => {
                const isCompleted = record.status === PERFORMANCE_STATUS.COMPLETED
                return (
                    <div className="action-buttons">
                        {!isCompleted ? (
                            <Button type="link" size="small" onClick={() => handleToInfo(record)}>
                                评分
                            </Button>
                        ) : (
                            <Button type="link" size="small" onClick={() => handleToInfo(record)}>
                                查看
                            </Button>
                        )}
                    </div>
                )
            },
        },
    ]
}
