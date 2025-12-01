import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import { debounce } from 'lodash'
import { Button, Select, Spin } from 'antd'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { getDecodeInfo } from '@wotu/wotu-components'
import { observer } from 'mobx-react'
import type { ColumnsType } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import type { ICourseScheduleRes, ISemesterInfo } from './types'
import { TRAIN_LEVEL_MAP } from '../../class/const'
import CoverNameCombine from '@/components/CoverNameCombine'
import type Store from './store'

/**
 * 可选课程表格列配置
 */
export const getCourseTableColumns = (
    onSelectCourse: (record: ICourseScheduleRes) => void,
): ColumnsType<ICourseScheduleRes> => [
    {
        title: '封面',
        dataIndex: 'coverUrl',
        key: 'coverUrl',
        width: 92,
        render: (coverUrl: string, record: ICourseScheduleRes) => (
            <CoverNameCombine coverUrl={coverUrl} name={record.name} width={60} />
        ),
    },
    {
        title: '课程名称',
        dataIndex: 'name',
        key: 'name',
        width: 200,
    },
    {
        title: '学时',
        dataIndex: 'totalHours',
        key: 'totalHours',
        width: 80,
        align: 'center',
    },
    {
        title: '专业',
        key: 'major',
        width: 150,
        render: (_: any, record: ICourseScheduleRes) => (
            <div>
                <div>{record.majorName}</div>
                <div style={{ fontSize: '12px', color: '#999' }}>代码：{record.majorNum}</div>
            </div>
        ),
    },
    {
        title: '培养层级',
        key: 'trainLevel',
        width: 120,
        render: (_: any, record: ICourseScheduleRes) => (
            <div>
                <div>{TRAIN_LEVEL_MAP[record.trainLevel] || '-'}</div>
                <div style={{ fontSize: '12px', color: '#999' }}>代码：{record.trainLevelNum}</div>
            </div>
        ),
    },
    {
        title: '操作',
        key: 'actions',
        width: 100,
        render: (_: any, record: ICourseScheduleRes) => (
            <Button type="link" onClick={() => onSelectCourse(record)}>
                选择
            </Button>
        ),
    },
]

/**
 * 教师选择组件（带脱敏显示）
 */
const TeacherSelectWithDesensitization: React.FC<{
    record: ICourseScheduleRes
    onUpdateCourse: (courseCode: string, field: string, value: any) => void
    store: InstanceType<typeof Store>
}> = observer(({ record, onUpdateCourse, store }) => {
    const [isDesensitized, setIsDesensitized] = useState(true)

    const toggleDesensitization = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsDesensitized(v => !v)
    }

    const debouncedSearchTeachers = useRef(
        debounce((value: string) => {
            store.searchTeachers(value)
        }, 500),
    ).current

    const handleTeacherSearch = useCallback(
        (value: string) => {
            debouncedSearchTeachers(value)
        },
        [debouncedSearchTeachers],
    )

    const handleTeacherChange = useCallback(
        (value: any, option: any) => {
            console.log('handleTeacherChange', value, option)
            onUpdateCourse(record.courseCode, 'teacherUserCode', value)

            const selectedTeacher = store.teacherOptions.find(teacher => teacher.userCode === value)
            if (selectedTeacher) {
                onUpdateCourse(record.courseCode, 'teacherCode', selectedTeacher.code)
            }
        },
        [onUpdateCourse, record.courseCode, store],
    )

    const formattedTeacherOptions = useMemo(() => {
        return store.teacherOptions.map(teacher => {
            const displayName =
                isDesensitized && teacher.name
                    ? getDecodeInfo(teacher.name, '1')
                    : getDecodeInfo(teacher.name)
            const displayMobile =
                isDesensitized && teacher.mobile
                    ? getDecodeInfo(teacher.mobile, '2')
                    : getDecodeInfo(teacher.mobile)

            return {
                ...teacher,
                label: `${displayName}（${displayMobile}）`,
                value: teacher.userCode,
            }
        })
    }, [store.teacherOptions, isDesensitized])

    // 组件卸载时取消防抖函数
    useEffect(() => {
        return () => {
            debouncedSearchTeachers.cancel()
        }
    }, [debouncedSearchTeachers])

    return (
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Select
                showSearch
                placeholder="请输入关键字搜索"
                style={{ flex: 1 }}
                value={record.teacherUserCode || undefined}
                onChange={handleTeacherChange}
                onSearch={handleTeacherSearch}
                options={formattedTeacherOptions}
                loading={store.teacherSearchLoading}
                filterOption={false}
                notFoundContent={store.teacherSearchLoading ? <Spin size="small" /> : '暂无数据'}
                allowClear
            />
            {record.teacherUserCode && (
                <div
                    style={{
                        marginLeft: 4,
                        cursor: 'pointer',
                        color: '#1890ff',
                        fontSize: 14,
                    }}
                    onClick={toggleDesensitization}
                    title={isDesensitized ? '点击查看完整信息' : '点击隐藏信息'}
                >
                    {isDesensitized ? <EyeInvisibleFilled /> : <EyeFilled />}
                </div>
            )}
        </div>
    )
})

/**
 * 课程排课表格列配置
 */
export const getSelectedCourseTableColumns = (
    onUpdateCourse: (courseCode: string, field: string, value: any) => void,
    semesterOptions: ISemesterInfo[],
    onDeleteCourse: (courseCode: string) => void,
    storeInstance: InstanceType<typeof Store>,
): ColumnsType<ICourseScheduleRes> => [
    {
        title: '封面',
        dataIndex: 'coverUrl',
        key: 'coverUrl',
        width: 92,
        render: (coverUrl: string, record: ICourseScheduleRes) => (
            <CoverNameCombine coverUrl={coverUrl} name={record.name} width={60} />
        ),
    },
    {
        title: '课程名称',
        dataIndex: 'name',
        key: 'name',
        width: 180,
    },
    {
        title: '学时',
        dataIndex: 'totalHours',
        key: 'totalHours',
        width: 80,
        align: 'center',
    },
    {
        title: '专业',
        key: 'major',
        width: 150,
        render: (_: any, record: ICourseScheduleRes) => (
            <div>
                <div>{record.majorName}</div>
                <div style={{ fontSize: '12px', color: '#999' }}>代码：{record.majorNum}</div>
            </div>
        ),
    },
    {
        title: '培养层级',
        key: 'trainLevel',
        width: 120,
        render: (_: any, record: ICourseScheduleRes) => (
            <div>
                <div>{TRAIN_LEVEL_MAP[record.trainLevel] || '-'}</div>
                <div style={{ fontSize: '12px', color: '#999' }}>代码：{record.trainLevelNum}</div>
            </div>
        ),
    },
    {
        title: '授课教师',
        key: 'teacher',
        width: 240,
        render: (_: any, record: ICourseScheduleRes) => (
            <TeacherSelectWithDesensitization
                record={record}
                onUpdateCourse={onUpdateCourse}
                store={storeInstance}
            />
        ),
    },
    {
        title: '学期',
        key: 'semester',
        width: 220,
        render: (_: any, record: ICourseScheduleRes) => (
            <Select
                placeholder="请选择"
                style={{ width: '100%' }}
                value={
                    record.semester
                        ? `${record.semester}-${record.academicYear}-${record.academicYearType}`
                        : undefined
                }
                onChange={value => {
                    if (value) {
                        const [semester, academicYear, academicYearType] = value.split('-')
                        onUpdateCourse(record.courseCode, 'semester', parseInt(semester))
                        onUpdateCourse(record.courseCode, 'academicYear', parseInt(academicYear))
                        onUpdateCourse(
                            record.courseCode,
                            'academicYearType',
                            parseInt(academicYearType),
                        )
                    }
                }}
            >
                {semesterOptions.map(semester => (
                    <Select.Option
                        key={`${semester.semester}-${semester.academicYear}-${semester.academicYearType}`}
                        value={`${semester.semester}-${semester.academicYear}-${semester.academicYearType}`}
                    >
                        第{semester.semester}学期 ({semester.academicYear}
                        {semester.academicYearType === 1 ? '上' : '下'})
                    </Select.Option>
                ))}
            </Select>
        ),
    },
    {
        title: '操作',
        key: 'actions',
        width: 100,
        align: 'center',
        fixed: 'right',
        render: (_: any, record: ICourseScheduleRes) => (
            <Button type="link" onClick={() => onDeleteCourse(record.courseCode)}>
                删除
            </Button>
        ),
    },
]
