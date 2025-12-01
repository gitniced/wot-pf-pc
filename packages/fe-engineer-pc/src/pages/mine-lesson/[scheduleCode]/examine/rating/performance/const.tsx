import { Badge, Button, Tooltip } from 'antd'
import type { ColumnsType } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import type { ClassPerformancePageDto } from '../interface'
import { history } from 'umi'

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
export const getClassPerformanceColumns = (): ColumnsType<ClassPerformancePageDto> => {
    return [
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
