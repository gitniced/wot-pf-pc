import type { ColumnsType } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import { Button, Tooltip } from 'antd'
import { history } from 'umi'

/**
 * 考核任务状态
 */
export enum TASK_EXAM_STATUS {
    /** 待提交 */
    WAIT_SUBMIT = 0,
    /** 待评分 */
    WAIT_GRADE = 1,
    /** 已评分 */
    GRADED = 2,
}

const handleView = (record: any, scheduleCode: string, activity: string) => {
    if (scheduleCode && activity) {
        history.push(
            `/quiz/${activity}/info?scheduleCode=${scheduleCode}&mode=view&stuCode=${record.stuCode}`,
        )
    }
}

const handleGrade = (record: any, scheduleCode: string, activity: string) => {
    if (scheduleCode && activity) {
        history.push(
            `/quiz/${activity}/info?scheduleCode=${scheduleCode}&mode=grade&stuCode=${record.stuCode}`,
        )
    }
}

/**
 * 班级任务考核表格配置
 */
export const getTaskExamTableColumns = (
    status: string,
    scheduleCode: string,
    homeworkCode: string,
): ColumnsType<any> => [
    {
        search: true,
        title: '姓名',
        dataIndex: 'stuName',
        key: 'stuName',
        width: 200,
        formItemProps: { name: 'name', labelCol: { span: 4 } },
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
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 200,
        fixed: 'right',
        align: 'center' as const,
        render: (_, record: any) => {
            const isCompleted = String(status) === String(TASK_EXAM_STATUS.GRADED)
            const isWaitGrade = String(status) === String(TASK_EXAM_STATUS.WAIT_GRADE)
            return (
                <div className="action-buttons">
                    {isCompleted ? (
                        <Button
                            type="link"
                            size="small"
                            onClick={() => handleView(record, scheduleCode, homeworkCode)}
                        >
                            查看
                        </Button>
                    ) : null}
                    {isWaitGrade ? (
                        <Button
                            type="link"
                            size="small"
                            onClick={() => handleGrade(record, scheduleCode, homeworkCode)}
                        >
                            批改
                        </Button>
                    ) : null}
                </div>
            )
        },
    },
]
