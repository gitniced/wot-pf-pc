import { Button, InputNumber } from 'antd'
import type { ColumnsType } from 'antd/lib/table'
import { EXAMINE_COMMENT_TYPE } from '../student/const'
import { history } from 'umi'
import qs from 'qs'
import { CustomMarkdown } from '@/components/AIComp/components/CustomMarkdown'

export const getCommentSelfTableColumns = (id: string, type: EXAMINE_COMMENT_TYPE, query: any) => {
    const columns: ColumnsType<any> = [
        {
            title: '学习任务',
            dataIndex: 'taskName',
            key: 'taskName',
        },
        {
            title: '考核项目',
            dataIndex: 'projectName',
            key: 'projectName',
        },
    ]

    if (type !== EXAMINE_COMMENT_TYPE.selfEvaluationCount) {
        columns.push({
            title: '待评价',
            dataIndex: 'evalCount',
            key: 'evalCount',
        })
    }

    columns.push({
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (_, record) => (
            <Button
                type="link"
                onClick={() => {
                    history.push(
                        `/mine-lesson/${id}/examine/comment?${qs.stringify({
                            ...query,
                            type,
                            projectCode: record.projectCode,
                        })}`,
                    )
                }}
                style={{ padding: 0 }}
            >
                去评价
            </Button>
        ),
    })

    return columns
}

/** 评价标准Columns */
export const getCriteriaTableColumns = (
    evaluationTask: string,
    onChange: (evaluationTask: string, code: string, val: number) => void,
) => [
    {
        title: '评价项目',
        dataIndex: 'evaluatedRubric',
        key: 'evaluatedRubric',
        align: 'center',
        render: (value: string) => {
            return <CustomMarkdown>{value}</CustomMarkdown>
        },
    },
    {
        title: '评价标准',
        dataIndex: 'evaluatorCriteria',
        key: 'evaluatorCriteria',
        width: '40%',
        render: (value: string) => {
            return <CustomMarkdown>{value}</CustomMarkdown>
        },
    },
    {
        title: '配分',
        dataIndex: 'weight',
        key: 'weight',
        align: 'center',
    },
    {
        title: '评分',
        dataIndex: 'score',
        key: 'score',
        render: (value: number | undefined, { code, weight = 0 }: any) => {
            return (
                <InputNumber
                    placeholder="请输入"
                    value={value}
                    max={weight}
                    onChange={val => onChange?.(evaluationTask, code, val || 0)}
                />
            )
        },
        align: 'center',
    },
]
