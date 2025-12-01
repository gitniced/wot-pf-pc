import type { ColumnsType } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import { Button, Tooltip } from 'antd'
import { history } from 'umi'

/**
 * 考核任务状态
 */
export enum TASK_EXAM_STATUS {
    /** 待提交 */
    WAIT_SUBMIT = 2,
    /** 待评分 */
    WAIT_GRADE = 0,
    /** 已评分 */
    GRADED = 1,
}

const handleView = (record: any, scheduleCode: string, projectCode: string) => {
    const { evaluationTask } = record
    if (scheduleCode && projectCode) {
        history.push(
            `/projects/${projectCode}/info?scheduleCode=${scheduleCode}&evaluationTask=${evaluationTask}&mode=view`,
        )
    }
}

const handleGrade = (record: any, scheduleCode: string, projectCode: string) => {
    const { evaluationTask } = record
    if (scheduleCode && projectCode) {
        history.push(
            `/projects/${projectCode}/info?scheduleCode=${scheduleCode}&evaluationTask=${evaluationTask}&mode=grade`,
        )
    }
}

/**
 * 班级任务考核表格配置
 */
export const getTaskExamTableColumns = (
    status: string,
    scheduleCode: string,
    projectCode: string,
): ColumnsType<any> => [
    {
        search: true,
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width: 200,
        formItemProps: { name: 'studentName', labelCol: { span: 4 } },
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
        title: '得分',
        dataIndex: 'score',
        key: 'score',
        width: 200,
        align: 'left' as const,
        render: (value: number | null) => {
            const newValue = value || undefined
            return newValue ? newValue : '-'
        },
    },
    {
        title: '评语',
        dataIndex: 'comment',
        key: 'comment',
        width: 200,
        align: 'center' as const,
        render: (value: number | null) => {
            const newValue = value || ''
            // 如果是编辑状态，显示输入框
            return newValue ? newValue : '-'
        },
    },
    {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 200,
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
                            onClick={() => handleView(record, scheduleCode, projectCode)}
                        >
                            查看
                        </Button>
                    ) : null}
                    {isWaitGrade ? (
                        <Button
                            type="link"
                            size="small"
                            onClick={() => handleGrade(record, scheduleCode, projectCode)}
                        >
                            评分
                        </Button>
                    ) : null}
                </div>
            )
        },
    },
]
