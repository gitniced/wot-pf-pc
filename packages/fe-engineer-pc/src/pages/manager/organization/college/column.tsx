import React from 'react'
import { Button, Switch, InputNumber, Space } from 'antd'
import type { ColumnsType } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import type { ICollege } from './types'

/**
 * 学院管理表格列配置
 */
export const getCollegeTableColumns = (
    onStatusChange: (checked: boolean, record: ICollege) => void,
    onSortChange: (value: number, record: ICollege) => void,
    onEdit: (record: ICollege) => void,
    onDelete: (record: ICollege) => void,
): ColumnsType<ICollege> => [
    {
        title: '学院',
        dataIndex: 'name',
        key: 'name',
        search: true,
        width: 200,
        formItemProps: {
            label: '学院名称',
        },
        ellipsis: {
            showTitle: false,
        },
    },
    {
        title: '排序',
        dataIndex: 'sortOrder',
        key: 'sortOrder',
        width: 150,
        render: (value: number, record: ICollege) => (
            <InputNumber
                value={value}
                min={0}
                style={{ width: 80 }}
                onBlur={e => {
                    const newValue = parseInt(e.target.value) || 0
                    if (newValue !== value) {
                        onSortChange(newValue, record)
                    }
                }}
            />
        ),
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: 100,
        render: (status: number, record: ICollege) => (
            <Switch
                checked={status === 1}
                checkedChildren="开"
                unCheckedChildren="关"
                onChange={checked => onStatusChange(checked, record)}
            />
        ),
    },
    {
        title: '操作',
        key: 'actions',
        width: 120,
        render: (_: any, record: ICollege) => (
            <Space size="small">
                <Button type="link" size="small" onClick={() => onEdit(record)}>
                    编辑
                </Button>
                <Button type="link" size="small" onClick={() => onDelete(record)}>
                    删除
                </Button>
            </Space>
        ),
    },
]
