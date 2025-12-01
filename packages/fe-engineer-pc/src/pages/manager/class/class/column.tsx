import { Button, Space, Tag } from 'antd'
import type { ColumnsType } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import MoreSelect from '@/components/MoreSelect'
import type { IClass } from './types'
import { CLASS_STATUS_MAP, TRAIN_LEVEL_MAP, START_POINT_MAP } from './const'
import HrefLink from '@/components/HrefLink'

/**
 * 班级管理表格列配置
 */
export const getClassTableColumns = (
    onEdit: (record: IClass) => void,
    onDelete: (record: IClass) => void,
    formValue?: any,
): ColumnsType<IClass> => [
    {
        search: true,
        title: '班级',
        dataIndex: 'name',
        key: 'name',
        width: 200,
        fixed: 'left',
        fieldProps: {
            placeholder: '请输入',
        },
        render: (name: string, record: IClass) => (
            <HrefLink url={`/manager/class/detail/${record.code}`}>{name}</HrefLink>
        ),
    },
    {
        search: true,
        title: '专业',
        dataIndex: 'majorCode',
        key: 'majorCode',
        width: 180,
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
        render: (_: string, record: IClass) => (
            <div>
                <div>{record.majorName}</div>
                {record.majorNum && (
                    <div style={{ fontSize: '12px', color: '#999' }}>代码：{record.majorNum}</div>
                )}
            </div>
        ),
    },
    {
        search: true,
        title: '培养层级',
        dataIndex: 'trainLevelCode',
        key: 'trainLevelCode',
        width: 120,
        renderFormItem: () => {
            const { majorCode } = formValue || {}
            return (
                <MoreSelect
                    labelKey="label"
                    valueKey="code"
                    requestUrl={'/wil/train_level/list_by_major_code'}
                    requestMethod="post"
                    requestQuery={{
                        majorCode,
                    }}
                    placeholder="请选择"
                    style={{ width: '100%' }}
                    isHasPage={false}
                    disabled={!majorCode}
                    formattingResponseBody={(res: any) => {
                        const data = res?.data || res || []
                        return data.map((item: any) => ({
                            label: TRAIN_LEVEL_MAP[item.level] || `培养层级${item.level}`,
                            value: item.code,
                            ...item,
                        }))
                    }}
                />
            )
        },
        render: (_: string, record: IClass) => (
            <div>
                <div>{TRAIN_LEVEL_MAP[record.trainLevel!] || '-'}</div>
                {record.trainLevelNum && (
                    <div style={{ fontSize: '12px', color: '#999' }}>
                        代码：{record.trainLevelNum}
                    </div>
                )}
            </div>
        ),
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
        title: '起点学制',
        dataIndex: 'startPoint',
        key: 'startPoint',
        width: 120,
        render: (startPoint: number, record: IClass) => {
            const startPointText = START_POINT_MAP[startPoint] || '-'
            const eduLenText = record.eduLen ? `${record.eduLen}年` : ''
            return `${startPointText}${eduLenText ? ` ${eduLenText}` : ''}`
        },
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
        render: (year: number) => (year ? year : '-'),
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
        render: (year: number) => (year ? year : '-'),
    },
    {
        title: '学生数',
        dataIndex: 'studentCount',
        key: 'studentCount',
        width: 80,
        align: 'center',
        render: (count: number) => count || 0,
    },
    {
        title: '课程数',
        dataIndex: 'courseCount',
        key: 'courseCount',
        width: 80,
        align: 'center',
        render: (count: number) => count || 0,
    },
    {
        search: true,
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: 100,
        valueType: 'select',
        fieldProps: {
            placeholder: '请选择',
            options: [
                { label: '未开学', value: 0 },
                { label: '进行中', value: 1 },
                { label: '已毕业', value: 2 },
            ],
        },
        render: (status: number) => {
            const statusInfo = CLASS_STATUS_MAP[status]
            return statusInfo ? <Tag color={statusInfo.color}>{statusInfo.text}</Tag> : '-'
        },
    },
    {
        title: '操作',
        key: 'actions',
        width: 160,
        fixed: 'right',
        render: (_: any, record: IClass) => (
            <Space size="small">
                <HrefLink url={`/manager/class/schedule/${record.code}`}>排课</HrefLink>
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
