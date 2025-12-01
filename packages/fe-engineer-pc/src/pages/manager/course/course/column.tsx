import { Tag, Space, Button, Tooltip, Select } from 'antd'
import type { ColumnsType } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import MoreSelect from '@/components/MoreSelect'
import type { ICourse } from './types'
import { TRAIN_LEVEL_MAP, COURSE_STATUS_MAP } from './const'
import CoverNameCombine from '@/components/CoverNameCombine'
import React from 'react'
import HrefLink from '@/components/HrefLink'

/**
 * 标签查询组件
 * 选择优质和模板标签，实际查询时会转换为qualityStatus和templateStatus参数
 */
interface TagMultiSelectProps {
    value?: string
    onChange?: (value: string) => void
}

const TagMultiSelect: React.FC<TagMultiSelectProps> = ({ value, onChange }) => {
    return (
        <Select
            placeholder="请选择"
            style={{ width: '100%' }}
            allowClear
            value={value}
            onChange={onChange}
        >
            <Select.Option value="quality">优质</Select.Option>
            <Select.Option value="template">模板</Select.Option>
        </Select>
    )
}

/**
 * 获取课程表格列定义
 */
export const getCourseTableColumns = (
    onTemplateStatusChange: (checked: boolean, record: ICourse) => void,
    onQualityStatusChange: (checked: boolean, record: ICourse) => void,
): ColumnsType<ICourse> => [
    {
        title: '封面',
        dataIndex: 'coverUrl',
        key: 'coverUrl',
        width: 92,
        render: (coverUrl: string, record: ICourse) => (
            <CoverNameCombine coverUrl={coverUrl} name={record.name} width={60} />
        ),
    },
    {
        search: true,
        title: '课程名称',
        dataIndex: 'name',
        key: 'name',
        width: 200,
        fixed: 'left',
        fieldProps: {
            placeholder: '请输入',
        },
        formItemProps: {
            label: '课程',
        },
        ellipsis: {
            showTitle: false,
        },
        render: (name: string, record: ICourse) => (
            <Tooltip placement="topLeft" title={name}>
                <HrefLink url={`/assistant/course/${record.code}/preview`} target="_blank">
                    {name || '-'}
                </HrefLink>
            </Tooltip>
        ),
    },
    {
        title: '学时',
        dataIndex: 'totalHours',
        key: 'totalHours',
        width: 80,
        render: (totalHours: number) => totalHours || 0,
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
        render: (_: string, record: ICourse) => (
            <div>
                <div>{record.majorName}</div>
                <div style={{ fontSize: '12px', color: '#999' }}>代码：{record.majorNum}</div>
            </div>
        ),
    },
    {
        title: '培养层级',
        dataIndex: 'trainLevel',
        key: 'trainLevel',
        width: 150,
        render: (trainLevel: number, record: ICourse) => (
            <div>
                <div>{TRAIN_LEVEL_MAP[trainLevel] || '-'}</div>
                {record.trainLevelNum && (
                    <div style={{ fontSize: '12px', color: '#999' }}>
                        代码：{record.trainLevelNum}
                    </div>
                )}
            </div>
        ),
    },
    {
        title: '创建日期',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: 120,
        render: (createdAt: string) => {
            if (!createdAt) return '-'
            return new Date(createdAt).toLocaleDateString()
        },
    },
    {
        title: '创建者',
        dataIndex: 'createdByName',
        key: 'createdByName',
        width: 100,
    },
    {
        title: '参与者',
        dataIndex: 'courseTeacherList',
        key: 'courseTeacherList',
        width: 150,
        render: (courseTeacherList: ICourse['courseTeacherList']) => {
            if (!courseTeacherList || courseTeacherList.length === 0) {
                return '-'
            }

            const displayTeachers = courseTeacherList.slice(0, 3)
            const remainingCount = courseTeacherList.length - 3

            return (
                <div>
                    {displayTeachers.map((teacher, index) => (
                        <span key={teacher.code}>
                            {teacher.name}
                            {index < displayTeachers.length - 1 && '，'}
                        </span>
                    ))}
                    {remainingCount > 0 && (
                        <Tooltip
                            title={courseTeacherList
                                .slice(3)
                                .map(t => t.name)
                                .join('，')}
                        >
                            <span style={{ color: '#1890ff', cursor: 'pointer' }}>
                                ，...{remainingCount}人
                            </span>
                        </Tooltip>
                    )}
                </div>
            )
        },
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: 100,
        render: (status: number) => {
            const statusConfig = COURSE_STATUS_MAP[status]
            if (!statusConfig) return '-'

            return <Tag color={statusConfig.color}>{statusConfig.text}</Tag>
        },
    },
    {
        search: true,
        title: '标签',
        dataIndex: 'tags',
        key: 'tags',
        width: 120,
        renderFormItem: () => <TagMultiSelect />,
        render: (_, record: ICourse) => (
            <Space size={2}>
                {record.qualityStatus === 1 && (
                    <Tag color="orange" style={{ fontSize: '12px' }}>
                        优质
                    </Tag>
                )}
                {record.templateStatus === 1 && (
                    <Tag color="purple" style={{ fontSize: '12px' }}>
                        模板
                    </Tag>
                )}
            </Space>
        ),
    },
    {
        title: '学习人数',
        dataIndex: 'stuCount',
        key: 'stuCount',
        width: 100,
        render: (stuCount: number) => stuCount || 0,
    },
    {
        title: '操作',
        key: 'actions',
        width: 200,
        fixed: 'right',
        render: (_, record: ICourse) => (
            <Space size="small" wrap>
                <Button
                    type="link"
                    size="small"
                    onClick={() => onTemplateStatusChange(record.templateStatus === 0, record)}
                >
                    {record.templateStatus === 1 ? '取消模板' : '设为模板'}
                </Button>
                <Button
                    type="link"
                    size="small"
                    onClick={() => onQualityStatusChange(record.qualityStatus === 0, record)}
                >
                    {record.qualityStatus === 1 ? '取消优质' : '设为优质'}
                </Button>
            </Space>
        ),
    },
]
