import type { TableColumnsType } from 'antd'
import ClickEditInput from '@/components/ClickEditInput'
import { RowRender } from '@/pages/assistant/course/[id]/design/check/const'

export const getAssessmentRequirementsColumns = (
    active: boolean,
    setActive: (active: boolean) => void,
    onDataChange?: (index: number, field: string, value: any) => void,
): TableColumnsType<any> => [
    {
        title: '工作环节',
        dataIndex: 'name',
        align: 'center',
        width: '15%',
    },
    {
        title: '工作要求',
        dataIndex: 'workRequirements',
        align: 'center',
        width: '40%',
        render: (value: string, _record, index) => (
            <ClickEditInput
                defaultValue={value}
                active={active}
                setActive={setActive}
                placeholder="请输入"
                onChange={val => onDataChange?.(index, 'workRequirements', val)}
                onChangeBlur={val => onDataChange?.(index, 'workRequirements', val)}
            />
        ),
    },
    {
        title: '工作内容',
        dataIndex: 'workContent',
        align: 'center',
        width: '40%',
        render: (value: string, _record, index) => (
            <ClickEditInput
                defaultValue={value}
                active={active}
                setActive={setActive}
                placeholder="请输入"
                onChange={val => onDataChange?.(index, 'workContent', val)}
                onChangeBlur={val => onDataChange?.(index, 'workContent', val)}
            />
        ),
    },
]

export const getAssessmentQuestionsColumns = (
    active: boolean,
    setActive: (active: boolean) => void,
    onDataChange?: (index: number, field: string, value: any) => void,
): TableColumnsType<any> => [
    {
        title: '工作环节',
        dataIndex: 'name',
        align: 'center',
        width: '15%',
    },
    {
        title: '题目',
        dataIndex: 'question',
        align: 'center',
        width: '85%',
        render: (value: string, _record, index) => (
            <ClickEditInput
                defaultValue={value}
                active={active}
                setActive={setActive}
                placeholder="请输入"
                onChange={val => onDataChange?.(index, 'question', val)}
                onChangeBlur={val => onDataChange?.(index, 'question', val)}
            />
        ),
    },
]

export const getScoringCriteriaColumns = (
    active: boolean,
    setActive: (active: boolean) => void,
    onDataChange?: (index: number, field: string, value: any) => void,
    rowHeights?: Record<string, number>,
): TableColumnsType<any> => {
    return [
        {
            title: '工作环节',
            dataIndex: 'name',
            width: '15%',
            align: 'center',
            render: (value: string, _record, index) => (
                <ClickEditInput
                    defaultValue={value}
                    active={active}
                    setActive={setActive}
                    placeholder="请输入"
                    onChange={val => onDataChange?.(index, 'name', val)}
                    onChangeBlur={val => onDataChange?.(index, 'name', val)}
                    style={{ padding: '16px' }}
                />
            ),
        },
        {
            title: '考核题目',
            width: '20%',
            align: 'center',
            render: (_, record, index) => {
                return (
                    <RowRender
                        data={record?.finalAssessmentStageQuestionList}
                        recordIndex={index}
                        rowHeights={rowHeights}
                        render={(item: Record<string, any>) => {
                            return (
                                <ClickEditInput
                                    style={{
                                        padding: '16px',
                                    }}
                                    key={index + record?.finalAssessmentStageQuestionList?.length}
                                    defaultValue={item?.question}
                                    active={active}
                                    setActive={setActive}
                                    placeholder="请输入"
                                    onChange={val => {
                                        item.question = val
                                        onDataChange?.(
                                            index,
                                            'finalAssessmentStageQuestionList',
                                            record?.finalAssessmentStageQuestionList,
                                        )
                                    }}
                                    onChangeBlur={val => {
                                        item.question = val
                                        onDataChange?.(
                                            index,
                                            'finalAssessmentStageQuestionList',
                                            record?.finalAssessmentStageQuestionList,
                                        )
                                    }}
                                />
                            )
                        }}
                    />
                )
            },
        },
        {
            title: '参考答案',
            width: '20%',
            align: 'center',
            render: (_, record, index) => {
                return (
                    <RowRender
                        data={record?.finalAssessmentStageQuestionList}
                        recordIndex={index}
                        rowHeights={rowHeights}
                        render={(item: Record<string, any>) => {
                            return (
                                <ClickEditInput
                                    style={{
                                        padding: '16px',
                                    }}
                                    key={index + record?.finalAssessmentStageQuestionList?.length}
                                    defaultValue={item?.answer}
                                    active={active}
                                    setActive={setActive}
                                    placeholder="请输入"
                                    onChange={val => {
                                        item.answer = val
                                        onDataChange?.(
                                            index,
                                            'finalAssessmentStageQuestionList',
                                            record?.finalAssessmentStageQuestionList,
                                        )
                                    }}
                                    onChangeBlur={val => {
                                        item.answer = val
                                        onDataChange?.(
                                            index,
                                            'finalAssessmentStageQuestionList',
                                            record?.finalAssessmentStageQuestionList,
                                        )
                                    }}
                                />
                            )
                        }}
                    />
                )
            },
        },
        {
            title: '评分细则',
            width: '20%',
            align: 'center',
            render: (_, record, index) => {
                return (
                    <RowRender
                        data={record?.finalAssessmentStageQuestionList}
                        recordIndex={index}
                        rowHeights={rowHeights}
                        render={(item: Record<string, any>) => {
                            return (
                                <ClickEditInput
                                    style={{
                                        padding: '16px',
                                    }}
                                    key={index + record?.finalAssessmentStageQuestionList?.length}
                                    defaultValue={item?.scoringRules}
                                    active={active}
                                    setActive={setActive}
                                    placeholder="请输入"
                                    onChange={val => {
                                        item.scoringRules = val
                                        onDataChange?.(
                                            index,
                                            'finalAssessmentStageQuestionList',
                                            record?.finalAssessmentStageQuestionList,
                                        )
                                    }}
                                    onChangeBlur={val => {
                                        item.scoringRules = val
                                        onDataChange?.(
                                            index,
                                            'finalAssessmentStageQuestionList',
                                            record?.finalAssessmentStageQuestionList,
                                        )
                                    }}
                                />
                            )
                        }}
                    />
                )
            },
        },
    ]
}
