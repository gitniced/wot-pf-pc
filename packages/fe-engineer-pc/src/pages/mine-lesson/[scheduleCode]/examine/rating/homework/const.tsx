import { Badge, Button, Tooltip } from 'antd'
import type { ColumnsType } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import type { HomeworkPageItemDto } from '../interface'
import { history } from 'umi'

/**
 * 课后作业状态枚举
 */
export enum HOMEWORK_STATUS {
    /** 未批改 */
    PENDING = 0,
    /** 部分批改 */
    PARTIAL = 1,
    /** 全部批改 */
    COMPLETED = 2,
}

/**
 * 筛选项
 */
export const HOMEWORK_STATUS_OPTIONS = [
    {
        text: '未批改',
        value: HOMEWORK_STATUS.PENDING,
    },
    {
        text: '部分批改',
        value: HOMEWORK_STATUS.PARTIAL,
    },
    {
        text: '全部批改',
        value: HOMEWORK_STATUS.COMPLETED,
    },
]

/**
 * 课后作业批改状态配置
 */
export const HOMEWORK_STATUS_CONFIG = {
    [HOMEWORK_STATUS.COMPLETED]: {
        text: '全部批改',
        color: 'success' as const,
    },
    [HOMEWORK_STATUS.PARTIAL]: {
        text: '部分批改',
        color: 'warning' as const,
    },
    [HOMEWORK_STATUS.PENDING]: {
        text: '未批改',
        color: 'default' as const,
    },
}

/**
 * 处理点击跳转
 */
const handleHomeworkToInfo = (record: HomeworkPageItemDto) => {
    const { scheduleCode, homeworkCode } = record
    if (scheduleCode && homeworkCode) {
        history.push(`/homework/${homeworkCode}?scheduleCode=${scheduleCode}`)
    }
}

/**
 * 班级课后作业表格列配置
 */
export const getClassHomeworkColumns = (): ColumnsType<HomeworkPageItemDto> => {
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
                <Tooltip
                    placement="topLeft"
                    title={text}
                    getPopupContainer={e => e.parentElement.parentElement}
                >
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
                <Tooltip
                    placement="topLeft"
                    title={text}
                    getPopupContainer={e => e.parentElement.parentElement}
                >
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
                <Tooltip
                    placement="topLeft"
                    title={text}
                    getPopupContainer={e => e.parentElement.parentElement}
                >
                    {text || '-'}
                </Tooltip>
            ),
        },

        {
            title: '课后作业',
            dataIndex: 'homeworkName',
            key: 'homeworkName',
            width: '20%',
            ellipsis: {
                showTitle: false,
            },
            render: (text: string) => (
                <Tooltip
                    placement="topLeft"
                    title={text}
                    getPopupContainer={e => e.parentElement.parentElement}
                >
                    {text || '-'}
                </Tooltip>
            ),
        },
        {
            title: (
                <Tooltip
                    placement="topLeft"
                    title={'待提交'}
                    getPopupContainer={e => e.parentElement.parentElement}
                >
                    待提交
                </Tooltip>
            ),
            dataIndex: 'pendingSubmitCount',
            key: 'pendingSubmitCount',
            width: '15%',
            ellipsis: {
                showTitle: false,
            },
            render: (text: string) => (
                <Tooltip
                    placement="top"
                    title={text}
                    getPopupContainer={e => e.parentElement.parentElement}
                >
                    {text || '-'}
                </Tooltip>
            ),
        },

        {
            title: (
                <Tooltip
                    placement="topLeft"
                    title={'待批改'}
                    getPopupContainer={e => e.parentElement.parentElement}
                >
                    待批改
                </Tooltip>
            ),
            dataIndex: 'pendingGradeCount',
            key: 'pendingGradeCount',
            width: '15%',
            ellipsis: {
                showTitle: false,
            },
            render: (text: string) => (
                <Tooltip
                    placement="top"
                    title={text}
                    getPopupContainer={e => e.parentElement.parentElement}
                >
                    {text || '-'}
                </Tooltip>
            ),
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: '20%',
            align: 'center' as const,
            render: (_: number) => {
                const config =
                    HOMEWORK_STATUS_CONFIG[_ as HOMEWORK_STATUS] ||
                    HOMEWORK_STATUS_CONFIG[HOMEWORK_STATUS.PENDING]
                return <Badge status={config.color} text={config.text} />
            },
        },
        {
            title: '操作',
            key: 'action',
            width: '10%',
            align: 'center' as const,
            fixed: 'right',
            render: (_, record: any) => {
                const isCompleted = record.status === HOMEWORK_STATUS.COMPLETED
                return (
                    <div className="action-buttons">
                        {!isCompleted ? (
                            <Button
                                type="link"
                                size="small"
                                onClick={() => handleHomeworkToInfo(record)}
                            >
                                批改
                            </Button>
                        ) : (
                            <Button
                                type="link"
                                size="small"
                                onClick={() => handleHomeworkToInfo(record)}
                            >
                                查看
                            </Button>
                        )}
                    </div>
                )
            },
        },
    ]
}
