import React from 'react'
import type { ColumnsType } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import MoreSelect from '@/components/MoreSelect'
import type { ITeacherSchedule } from './types'
import { TRAIN_LEVEL_MAP, START_POINT_MAP, ACADEMIC_YEAR_TYPE_MAP } from './const'
import HrefLink from '@/components/HrefLink'

/**
 * 授课情况表格列配置
 */
export const getTeacherScheduleColumns = (): ColumnsType<ITeacherSchedule> => [
    {
        search: true,
        title: '课程',
        dataIndex: 'courseCode',
        key: 'courseCode',
        width: 200,
        fixed: 'left',
        fieldProps: {
            placeholder: '请输入',
        },
        render: (_: string, record) => (
            <HrefLink url={`/assistant/course/${record.courseCode}/preview`} target="_blank">
                {record.courseName || '-'}
            </HrefLink>
        ),
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
        render: (_: string, record) => (
            <HrefLink url={`/manager/class/detail/${record.classCode}`}>
                {record.className || '-'}
            </HrefLink>
        ),
    },
    {
        search: true,
        title: '专业',
        dataIndex: 'majorCode',
        key: 'majorCode',
        width: 160,
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
        render: (_: string, record) => (
            <div>
                <div>{record.majorName}</div>
                {record.majorNum && (
                    <div style={{ fontSize: '12px', color: '#999' }}>代码：{record.majorNum}</div>
                )}
            </div>
        ),
    },
    {
        title: '培养层级',
        dataIndex: 'trainLevel',
        key: 'trainLevel',
        width: 120,
        render: (_: string, record) => (
            <div>
                <div>{TRAIN_LEVEL_MAP[record.trainLevel] || '-'}</div>
                {record.trainLevelNum && (
                    <div style={{ fontSize: '12px', color: '#999' }}>
                        代码：{record.trainLevelNum}
                    </div>
                )}
            </div>
        ),
    },
    {
        title: '起点学制',
        dataIndex: 'startPoint',
        key: 'startPoint',
        width: 120,
        render: (startPoint: number, record: ITeacherSchedule) => {
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
        title: '学生数',
        dataIndex: 'studentNum',
        key: 'studentNum',
        width: 80,
        align: 'center',
        render: (count: number) => count || 0,
    },
    {
        title: '学期',
        dataIndex: 'semester',
        key: 'semester',
        width: 160,
        render: (_: any, record) => {
            if (!record.semester || !record.academicYear) return '-'
            const yearType = ACADEMIC_YEAR_TYPE_MAP[record.academicYearType] || ''
            return `第${record.semester}学期 (${record.academicYear}${yearType})`
        },
    },
]
