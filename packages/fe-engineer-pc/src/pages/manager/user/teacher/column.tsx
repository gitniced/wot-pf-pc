import React from 'react'
import { Button, Switch, Space } from 'antd'
import type { ColumnsType } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import type { ITeacher } from './types'
import HrefLink from '@/components/HrefLink'

/**
 * 教师管理表格列配置
 */
export const getTeacherTableColumns = (
    onStatusChange: (checked: boolean, record: ITeacher) => void,
    onDelete: (record: ITeacher) => void,
): ColumnsType<ITeacher> => [
    {
        search: true,
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width: 120,
        fixed: 'left',
        fieldProps: {
            placeholder: '请输入',
        },
        ellipsis: {
            showTitle: false,
        },
    },
    {
        search: true,
        title: '手机号',
        dataIndex: 'mobile',
        key: 'mobile',
        width: 150,
        fieldProps: {
            placeholder: '请输入',
        },
        ellipsis: {
            showTitle: false,
        },
    },
    {
        search: true,
        title: '证件号码',
        dataIndex: 'idCard',
        key: 'idCard',
        width: 200,
        fieldProps: {
            placeholder: '请输入',
        },
        ellipsis: {
            showTitle: false,
        },
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: 80,
        render: (status: number, record: ITeacher) => (
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
        width: 150,
        fixed: 'right',
        render: (_: any, record: ITeacher) => (
            <Space size="small">
                <HrefLink url={`/manager/user/teacher/${record.code}`}>授课情况</HrefLink>
                <Button type="link" size="small" onClick={() => onDelete(record)}>
                    删除
                </Button>
            </Space>
        ),
    },
]
