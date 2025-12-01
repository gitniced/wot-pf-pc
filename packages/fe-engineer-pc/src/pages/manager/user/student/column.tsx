import { Button, Switch, Space } from 'antd'
import type { ColumnsType } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import MoreSelect from '@/components/MoreSelect'
import type { IStudent } from './types'
import HrefLink from '@/components/HrefLink'
import DesensitizationItem from '@/components/DesensitizationItem'

export const getStudentTableColumns = (
    onStatusChange: (checked: boolean, record: IStudent) => void,
    onDelete: (record: IStudent) => void,
    visibilityState: Map<string, boolean>,
    onToggleVisibility: (rowKey: string, visible: boolean) => void,
): ColumnsType<IStudent> => [
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
        render: (_: string, record: IStudent) => {
            return (
                <DesensitizationItem
                    encryptValue={record.name}
                    desensitizationType="1"
                    isVisible={visibilityState.get(record.code)}
                    onToggleVisible={visible => onToggleVisibility(record.code, visible)}
                    render={text => (
                        <HrefLink url={`/manager/user/student/${record.code}`}>{text}</HrefLink>
                    )}
                />
            )
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
        render: (_: string, record: IStudent) => {
            return (
                <DesensitizationItem
                    encryptValue={record.mobile}
                    desensitizationType="2"
                    isVisible={visibilityState.get(record.code)}
                    onToggleVisible={visible => onToggleVisibility(record.code, visible)}
                    showEye={false}
                />
            )
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
        render: (_: string, record: IStudent) => {
            return (
                <DesensitizationItem
                    encryptValue={record.idCard}
                    desensitizationType="3"
                    isVisible={visibilityState.get(record.code)}
                    onToggleVisible={visible => onToggleVisibility(record.code, visible)}
                    showEye={false}
                />
            )
        },
    },
    {
        search: true,
        title: '班级',
        dataIndex: 'classCode',
        key: 'classCode',
        width: 180,
        renderFormItem: () => (
            <MoreSelect
                labelKey="name"
                valueKey="code"
                requestUrl={'/wil/class/page'}
                requestMethod="post"
                placeholder="请输入关键字搜索"
                style={{ width: '100%' }}
            />
        ),
        render: (_: string, record: IStudent) => {
            return record.className || '-'
        },
    },
    {
        search: true,
        title: '专业',
        dataIndex: 'majorCode',
        key: 'majorCode',
        width: 150,
        renderFormItem: () => (
            <MoreSelect
                labelKey="name"
                valueKey="code"
                searchKey="name"
                searchKeyBy="query"
                requestUrl={'/wil/major/list'}
                requestMethod="post"
                placeholder="请输入关键字搜索"
                style={{ width: '100%' }}
                isHasPage={false}
            />
        ),
        render: (_: string, record: IStudent) => {
            return (
                <div>
                    <div>{record.majorName}</div>
                    {record.majorNum && (
                        <div style={{ fontSize: '12px', color: '#999' }}>
                            代码：{record.majorNum}
                        </div>
                    )}
                </div>
            )
        },
    },
    {
        search: true,
        title: '学院',
        dataIndex: 'collegeCode',
        key: 'collegeCode',
        hide: true,
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
    },
    {
        search: true,
        title: '入学年份',
        dataIndex: 'enrollYear',
        key: 'enrollYear',
        width: 100,
        valueType: 'date',
        fieldProps: {
            picker: 'year',
            placeholder: '请选择',
            style: { width: '100%' },
        },
        render: (year: number) => year || '-',
    },
    {
        search: true,
        title: '毕业年份',
        dataIndex: 'graduateYear',
        key: 'graduateYear',
        width: 100,
        valueType: 'date',
        fieldProps: {
            picker: 'year',
            placeholder: '请选择',
            style: { width: '100%' },
        },
        render: (year: number) => year || '-',
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: 80,
        render: (status: number, record: IStudent) => (
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
        fixed: 'right',
        render: (_: any, record: IStudent) => (
            <Space size="small">
                <Button type="link" size="small" onClick={() => onDelete(record)}>
                    删除
                </Button>
            </Space>
        ),
    },
]
