import type { ColumnsType } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import { Tooltip, InputNumber, Input } from 'antd'

/**
 * 学生评分表格配置（课堂表现）- 根据设计图优化
 */
export const getPerformanceScoreTableColumns = (
    isEdit: boolean,
    onDataChange: (_data: any) => void,
): ColumnsType<any> => [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width: 100,
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
        title: '得分',
        dataIndex: 'score',
        key: 'score',
        width: 100,
        align: 'left' as const,
        render: (value: number | null, record: any) => {
            // 如果是编辑状态，显示输入框
            if (isEdit) {
                return (
                    <InputNumber
                        value={value || undefined}
                        min={0}
                        max={100}
                        precision={0}
                        placeholder="请输入分数"
                        style={{ width: '100%', maxWidth: 120 }}
                        onChange={val => onDataChange({ ...record, score: val })}
                    />
                )
            } else {
                return value || 0
            }
        },
    },
    {
        title: '评语',
        dataIndex: 'comment',
        key: 'comment',
        width: 200,
        align: 'center' as const,
        render: (value: number | null, record: any) => {
            const newValue = value || ''
            // 如果是编辑状态，显示输入框
            if (isEdit) {
                return (
                    <Input
                        value={newValue}
                        maxLength={100}
                        placeholder="请输入评语"
                        style={{ width: '100%' }}
                        onChange={e => {
                            const val = e.target.value
                            onDataChange({ ...record, comment: val })
                        }}
                    />
                )
            } else {
                return newValue ? newValue : '-'
            }
        },
    },
]
