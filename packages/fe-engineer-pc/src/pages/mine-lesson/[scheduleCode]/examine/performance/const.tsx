import { Tooltip } from 'antd'
import type { ClassPerformanceScoreTableItemDto } from './interface'

export const performanceTableColumns = [
    {
        title: '学习环节',
        dataIndex: 'stageName',
        key: 'stageName',
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
        title: '学习步骤',
        dataIndex: 'stepName',
        key: 'stepName',
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
        title: '得分',
        dataIndex: 'score',
        key: 'score',
        render: (value: number | undefined, record: ClassPerformanceScoreTableItemDto) => {
            const { status } = record || {}
            const StrStatus = String(status)
            return StrStatus === '0' ? '-' : value
        },
    },
    {
        title: '评语',
        dataIndex: 'comment',
        key: 'comment',
        render: (value: string) => (value ? value : '-'),
    },
]
