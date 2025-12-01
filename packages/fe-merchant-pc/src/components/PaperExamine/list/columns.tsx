import type { ColumnsType } from 'antd/lib/table'
import type { TableDataType } from './interface'
import { compositionMap, referenceStateMap } from './enums'
import { Badge } from 'antd'
import dayjs from 'dayjs'

export default () => {
    const columns: ColumnsType<TableDataType> = [
        {
            title: '试卷名称',
            dataIndex: 'title',
            ellipsis: true,
            width: 130,
            render: t => t || '-',
        },
        {
            title: '组卷方式',
            dataIndex: 'composition',
            ellipsis: true,
            width: 110,
            render: t => compositionMap[t] || '-',
        },
        {
            title: '试卷来源',
            dataIndex: 'createBy',
            ellipsis: true,
            width: 100,
            render: t => t || '-',
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            ellipsis: true,
            width: 140,
            render: t => (t ? dayjs(t).format('YYYY-MM-DD HH:mm') : '-'),
        },
        {
            title: '引用状态',
            dataIndex: 'referenceState',
            ellipsis: true,
            width: 100,
            render: t => (
                <>
                    <Badge status={t === '0' ? 'default' : 'success'} />
                    {(referenceStateMap as any)[t]}
                </>
            ),
        },
        {
            title: '引用次数',
            dataIndex: 'referenceNum',
            ellipsis: true,
            width: 100,
        },
    ]
    return columns
}
