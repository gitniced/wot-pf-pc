import { Badge, Button, Select, Tooltip } from 'antd'
import type { ColumnsType } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import { history } from 'umi'
import MoreSelect from '@/components/MoreSelect'
import type { ClassQuestionPageResDtoItem } from './interface'

/**
 * 课堂测验状态枚举
 */
export enum TEST_STATUS {
    /** 未批改 */
    PENDING = 4,
    /** 部分批改 */
    PARTIAL = 3,
    /** 全部批改 */
    COMPLETED = 2,
    /** 无需批改 */
    NOT_NEED_GRADE = 1,
}

/**
 * 筛选项
 */
export const TEST_STATUS_OPTIONS = [
    {
        text: '未批改',
        value: TEST_STATUS.PENDING,
    },
    {
        text: '无需批改',
        value: TEST_STATUS.NOT_NEED_GRADE,
    },
    {
        text: '部分批改',
        value: TEST_STATUS.PARTIAL,
    },
    {
        text: '全部批改',
        value: TEST_STATUS.COMPLETED,
    },
]

/**
 * 课堂测验批改状态配置
 */
export const TEST_STATUS_CONFIG = {
    [TEST_STATUS.COMPLETED]: {
        text: '全部批改',
        color: 'success' as const,
    },
    [TEST_STATUS.PARTIAL]: {
        text: '部分批改',
        color: 'warning' as const,
    },
    [TEST_STATUS.PENDING]: {
        text: '待批改',
        color: 'default' as const,
    },
    [TEST_STATUS.NOT_NEED_GRADE]: {
        text: '无需批改',
        color: 'success' as const,
    },
}

/**
 * 处理点击跳转
 */
const handleToInfo = (record: ClassQuestionPageResDtoItem) => {
    const { scheduleCode, activityCode } = record
    if (scheduleCode && activityCode) {
        history.push(`/quiz/${activityCode}?scheduleCode=${scheduleCode}`)
    }
}

/**
 * 课堂表现表格列配置
 */
export const getClassQuizColumns = (formValue: any): ColumnsType<ClassQuestionPageResDtoItem> => {
    const { courseCode, taskCode, stageCode, stepCode } = formValue || {}
    return [
        {
            search: true,
            title: '课程',
            dataIndex: 'courseCode',
            key: 'courseCode',
            hide: true,
            renderFormItem: () => (
                <MoreSelect
                    labelKey="courseName"
                    valueKey={'courseCode'}
                    requestUrl={'/wil/teaching/teacherCourses'}
                    placeholder="请选择"
                    style={{ width: '100%', maxWidth: '260px' }}
                    isHasPage={false}
                />
            ),
        },
        {
            search: true,
            title: '班级',
            dataIndex: 'classCode',
            key: 'classCode',
            hide: true,
            renderFormItem: () => (
                <MoreSelect
                    labelKey="className"
                    valueKey="classCode"
                    searchKey="classNameKeyword"
                    requestParams={{
                        courseCode,
                    }}
                    requestUrl={'/wil/teaching/teacherClasses'}
                    requestMethod={'get'}
                    placeholder="请选择"
                    style={{ width: '100%', maxWidth: '260px' }}
                    isHasPage={false}
                />
            ),
        },
        {
            search: true,
            title: '任务',
            dataIndex: 'taskCode',
            key: 'taskCode',
            hide: true,
            renderFormItem: () => (
                <MoreSelect
                    labelKey="taskName"
                    valueKey="taskCode"
                    disabled={!courseCode}
                    requestParams={{
                        courseCode,
                    }}
                    requestUrl={'/wil/teaching/teacherTasks'}
                    placeholder="请选择"
                    style={{ width: '100%', maxWidth: '260px' }}
                    isHasPage={false}
                />
            ),
        },
        {
            search: true,
            title: '环节',
            dataIndex: 'stageCode',
            key: 'stageCode',
            hide: true,
            renderFormItem: () => (
                <MoreSelect
                    labelKey="stageName"
                    valueKey="stageCode"
                    disabled={!courseCode || !taskCode}
                    requestParams={{
                        courseCode,
                        taskCode,
                    }}
                    requestUrl={'/wil/teaching/teacherStages'}
                    placeholder="请选择"
                    style={{ width: '100%', maxWidth: '260px' }}
                    isHasPage={false}
                />
            ),
        },
        {
            search: true,
            title: '步骤',
            dataIndex: 'stepCode',
            key: 'stepCode',
            hide: true,
            renderFormItem: () => (
                <MoreSelect
                    labelKey="stepName"
                    valueKey="stepCode"
                    disabled={!courseCode || !taskCode || !stageCode}
                    requestParams={{
                        courseCode,
                        taskCode,
                        stageCode,
                    }}
                    requestUrl={'/wil/teaching/teacherSteps'}
                    placeholder="请选择"
                    style={{ width: '100%', maxWidth: '260px' }}
                    isHasPage={false}
                />
            ),
        },
        {
            search: true,
            title: '活动',
            dataIndex: 'activityCode',
            key: 'activityCode',
            hide: true,
            renderFormItem: () => (
                <MoreSelect
                    labelKey="name"
                    valueKey="code"
                    disabled={!stepCode}
                    requestParams={{
                        stepCode,
                    }}
                    requestUrl={'/wil/teaching/teacherActivities'}
                    requestMethod={'get'}
                    placeholder="请选择"
                    style={{ width: '100%', maxWidth: '260px' }}
                    isHasPage={false}
                />
            ),
        },
        {
            title: '课程',
            dataIndex: 'courseName',
            key: 'courseName',
            width: 150,
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
            title: '班级',
            dataIndex: 'className',
            key: 'className',
            width: 150,
            ellipsis: {
                showTitle: false,
            },
            render: (text: string) => (
                <Tooltip placement="topLeft" title={text}>
                    {text || '-'}
                </Tooltip>
            ),
        },
        {
            title: '学习任务',
            dataIndex: 'taskName',
            key: 'taskName',
            width: 150,
            ellipsis: {
                showTitle: false,
            },
            render: (text: string) => (
                <Tooltip placement="topLeft" title={text}>
                    {text || '-'}
                </Tooltip>
            ),
        },
        {
            title: '学习环节',
            dataIndex: 'stageName',
            key: 'stageName',
            width: 150,
            ellipsis: {
                showTitle: false,
            },
            render: (text: string) => (
                <Tooltip placement="topLeft" title={text}>
                    {text || '-'}
                </Tooltip>
            ),
        },
        {
            title: '步骤',
            dataIndex: 'stepName',
            key: 'stepName',
            width: 200,
            ellipsis: {
                showTitle: false,
            },
            render: (text: string) => (
                <Tooltip placement="topLeft" title={text}>
                    {text || '-'}
                </Tooltip>
            ),
        },

        {
            title: '活动',
            dataIndex: 'activityName',
            key: 'activityName',
            width: 200,
            ellipsis: {
                showTitle: false,
            },
            render: (text: string) => (
                <Tooltip placement="topLeft" title={text}>
                    {text || '-'}
                </Tooltip>
            ),
        },
        {
            title: '待提交',
            dataIndex: 'toSubmit',
            key: 'toSubmit',
            width: 100,
            ellipsis: {
                showTitle: false,
            },
            render: (text: string) => (
                <Tooltip placement="topLeft" title={text}>
                    {text || '-'}
                </Tooltip>
            ),
        },

        {
            title: '待批改',
            dataIndex: 'toCorrect',
            key: 'toCorrect',
            width: 100,
            ellipsis: {
                showTitle: false,
            },
            render: (text: string) => (
                <Tooltip placement="topLeft" title={text}>
                    {text || '-'}
                </Tooltip>
            ),
        },
        {
            search: true,
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 150,
            align: 'center' as const,
            render: (_: number) => {
                const config =
                    TEST_STATUS_CONFIG[_ as TEST_STATUS] || TEST_STATUS_CONFIG[TEST_STATUS.PENDING]
                return <Badge status={config.color} text={config.text} />
            },
            renderFormItem: () => {
                return (
                    <Select
                        options={TEST_STATUS_OPTIONS.map(item => ({
                            key: item.value,
                            label: item.text,
                            value: item.value,
                        }))}
                        placeholder="请选择"
                        style={{ width: '100%' }}
                    />
                )
            },
        },
        {
            title: '操作',
            key: 'action',
            width: 100,
            align: 'center' as const,
            fixed: 'right',
            render: (_, record: any) => {
                const shouldCorrect = record.toCorrect !== 0
                return (
                    <div className="action-buttons">
                        {shouldCorrect ? (
                            <Button type="link" size="small" onClick={() => handleToInfo(record)}>
                                批改
                            </Button>
                        ) : (
                            <Button type="link" size="small" onClick={() => handleToInfo(record)}>
                                查看
                            </Button>
                        )}
                    </div>
                )
            },
        },
    ]
}
