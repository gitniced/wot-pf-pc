import React from 'react'
import { Button, Switch, InputNumber, Space } from 'antd'
import type { ColumnsType } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import MoreSelect from '@/components/MoreSelect'
import type { IMajor } from './types'
import type { ICollegeSimple } from '../college/types'

/**
 * 专业管理表格列配置
 */
export const getMajorTableColumns = (
    onStatusChange: (checked: boolean, record: IMajor) => void,
    onSortChange: (value: number, record: IMajor) => void,
    onEdit: (record: IMajor) => void,
    onDelete: (record: IMajor) => void,
    onAddTrainLevel: (record: IMajor) => void,
    collegeOptions: ICollegeSimple[],
): ColumnsType<IMajor> => [
    {
        search: true,
        title: '专业名称',
        dataIndex: 'name',
        key: 'name',
        width: 180,
        fieldProps: {
            placeholder: '请输入',
        },
        render: (name: string, record: IMajor) => (
            <div>
                <div style={{ marginBottom: 4 }}>{name}</div>
                <div style={{ fontSize: '12px', color: '#999' }}>代码：{record.majorNum}</div>
            </div>
        ),
    },
    {
        search: true,
        title: '专业代码',
        dataIndex: 'majorNum',
        key: 'majorNum',
        hide: true,
        fieldProps: {
            placeholder: '请输入',
        },
    },
    {
        search: true,
        title: '学院',
        dataIndex: 'collegeCode',
        key: 'collegeCode',
        width: 150,
        renderFormItem: () => (
            <MoreSelect
                labelKey="name"
                valueKey="code"
                searchKey="name"
                searchKeyBy="query"
                requestUrl={'/wil/college/list_code_name'}
                requestMethod="post"
                placeholder="请输入关键字搜索"
                style={{ width: '100%' }}
                isHasPage={false}
            />
        ),
        render: (collegeCode: string) => {
            return collegeOptions.find(college => college.code === collegeCode)?.name || '-'
        },
    },
    {
        title: '排序',
        dataIndex: 'sortOrder',
        key: 'sortOrder',
        width: 150,
        render: (value: number, record: IMajor) => (
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
        render: (status: number, record: IMajor) => (
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
        width: 200,
        render: (_: any, record: IMajor) => (
            <Space size="small" wrap>
                <Button type="link" size="small" onClick={() => onAddTrainLevel(record)}>
                    添加培养层级
                </Button>
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
