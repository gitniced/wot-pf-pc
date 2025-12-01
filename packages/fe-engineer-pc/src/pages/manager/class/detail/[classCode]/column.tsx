import { Space, Tooltip, Typography } from 'antd'
import type { ColumnsType } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import type { IStudent } from '@/pages/manager/user/student/types'
import type { ICourseScheduleRes } from '@/pages/manager/class/schedule/[classCode]/types'
import CoverNameCombine from '@/components/CoverNameCombine'
import HrefLink from '@/components/HrefLink'
import type { IClassStudentRes } from './types'
import { InfoCircleOutlined } from '@ant-design/icons'

/**
 * 获取学生列表表格列配置
 */
export const getStudentColumns = (_classCode: string): ColumnsType<IClassStudentRes> => {
    return [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            width: 120,
        },
        {
            title: '手机号',
            dataIndex: 'mobile',
            key: 'mobile',
            width: 150,
        },
        {
            title: '证件号码',
            dataIndex: 'idCard',
            key: 'idCard',
            width: 200,
        },
        {
            // @ts-ignore
            title: (
                <Space>
                    <Typography>课程进度</Typography>
                    <Tooltip title="学员在本班级所有课程的总进度">
                        <InfoCircleOutlined />
                    </Tooltip>
                </Space>
            ),
            dataIndex: 'courseProgress',
            key: 'courseProgress',
            width: 300,
            render: v => {
                const progress = v || 0

                return (
                    <Space align="center">
                        <div
                            style={{
                                width: 200,
                                height: 8,
                                background: 'rgba(22,120,255,0.15)',
                                borderRadius: 4,
                                overflow: 'hidden',
                            }}
                        >
                            <div
                                style={{
                                    width: `${progress}%`,
                                    height: '100%',
                                    background: '#1890ff',
                                    borderRadius: 4,
                                }}
                            />
                        </div>
                        <span style={{ width: 50, textAlign: 'right' }}>{`${progress}%`}</span>
                    </Space>
                )
            },
        },
        {
            title: '操作',
            key: 'action',
            width: 100,
            fixed: 'right' as const,
            render: (_: any, record: IStudent) => (
                <HrefLink url={`/manager/user/student/${record.code}`}>详情</HrefLink>
            ),
        },
    ]
}

/**
 * 获取课程列表表格列配置
 */
export const getCourseColumns = (): ColumnsType<ICourseScheduleRes> => {
    return [
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
            render: (name: string, record: ICourseScheduleRes) => (
                <HrefLink url={`/assistant/course/${record.courseCode}/preview`} target="_blank">
                    {name || '-'}
                </HrefLink>
            ),
        },
        {
            title: '总课时',
            dataIndex: 'totalHours',
            key: 'totalHours',
            width: 100,
        },
        {
            title: '专业',
            key: 'major',
            width: 200,
            render: (_: any, record: ICourseScheduleRes) => (
                <Space direction="vertical" size={0}>
                    <div>{record.majorName}</div>
                    {record.majorNum && (
                        <div style={{ fontSize: 12, color: '#999' }}>代码：{record.majorNum}</div>
                    )}
                </Space>
            ),
        },
        {
            title: '学期',
            key: 'semester',
            width: 200,
            render: (_: any, record: ICourseScheduleRes) => {
                if (!record.academicYear || !record.academicYearType) return '-'
                const yearType = record.academicYearType === 1 ? '上学期' : '下学期'
                return `${record.academicYear} ${yearType}`
            },
        },
        {
            title: '操作',
            key: 'action',
            width: 100,
            fixed: 'right' as const,
            render: (_: any, record: ICourseScheduleRes) => {
                window.sessionStorage.setItem('performance_class_code', record.classCode)
                return (
                    <HrefLink url={`/manager/class/performance/${record.code}`}>查看成绩</HrefLink>
                )
            },
        },
    ]
}
