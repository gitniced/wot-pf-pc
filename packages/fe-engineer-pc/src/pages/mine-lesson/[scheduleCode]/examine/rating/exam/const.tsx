import { InputNumber, Tooltip } from 'antd'
import type { ColumnsType } from '@wotu/wotu-components/dist/esm/SuperTable/interface'

/**
 * 学生评分表格配置（终结性考核）- 根据设计图优化
 */
export const getExamTableColumns = (
    status: number,
    updateEditing: (_data: any) => void,
    onScoreChange: (_data: any) => void,
): ColumnsType<any> => [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width: 200,
        fixed: 'left',
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
        width: 200,
        align: 'center' as const,
        render: (value: number | null, record: any) => {
            const newValue = value || 0
            // 如果是编辑状态，显示输入框
            if (record.isEditing) {
                return (
                    <InputNumber
                        value={newValue}
                        min={0}
                        max={100}
                        precision={0}
                        placeholder="请输入分数"
                        style={{ width: '100%', maxWidth: 120 }}
                        onBlur={e => {
                            const val = e.target.value
                            onScoreChange({ ...record, score: val })
                        }}
                    />
                )
            } else {
                return (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 8,
                        }}
                    >
                        <span style={{ fontSize: 16, fontWeight: 500 }}>{newValue}</span>
                        {String(status) === '0' && (
                            <svg
                                className="icon"
                                aria-hidden="true"
                                onClick={() => updateEditing({ ...record, isEditing: true })}
                            >
                                <use xlinkHref={`#edit`} />
                            </svg>
                        )}
                    </div>
                )
            }
        },
    },
]
