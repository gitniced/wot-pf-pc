import type { TableColumnsType } from 'antd'
import ClickEditInput from '@/components/ClickEditInput'
import ClickEditInputNumber from '@/components/ClickEditInputNumber'
import { RowRender } from '@/pages/assistant/course/[id]/design/check/const'
import type { IListBaseItem } from '../../types/learning'

export const getDescriptionAssessmentItemsTableColumns = (
    active: boolean,
    setActive: (active: boolean) => void,
    onDataChange?: (index: number, field: string, value: any) => void,
    rowHeights?: Record<string, number>,
): TableColumnsType<any> => [
    {
        title: '学习环节',
        dataIndex: 'name',
        key: 'name',
        width: '10%',
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
        title: '学习目标',
        dataIndex: 'learningGoal',
        key: 'learningGoal',
        width: '10%',
        align: 'center',
        render: (value: string, _record, index) => (
            <ClickEditInput
                defaultValue={value}
                active={active}
                setActive={setActive}
                placeholder="请输入"
                onChange={val => onDataChange?.(index, 'learningGoal', val)}
                onChangeBlur={val => onDataChange?.(index, 'learningGoal', val)}
                style={{ padding: '16px' }}
            />
        ),
    },
    {
        title: '考核要点/能力素养观察维度',
        dataIndex: 'assessmentPoints',
        key: 'assessmentPoints',
        width: '10%',
        align: 'center',
        render: (value: string, _record, index) => (
            <ClickEditInput
                defaultValue={value}
                active={active}
                setActive={setActive}
                placeholder="请输入"
                onChange={val => onDataChange?.(index, 'assessmentPoints', val)}
                onChangeBlur={val => onDataChange?.(index, 'assessmentPoints', val)}
                style={{ padding: '16px' }}
            />
        ),
    },
    {
        title: '考核项目',
        dataIndex: 'assessmentProject',
        key: 'assessmentProject',
        width: '10%',
        align: 'center',
        render: (_, record, index) => {
            return (
                <RowRender
                    data={record?.studyTaskAssmentPlanProjectList}
                    recordIndex={index}
                    rowHeights={rowHeights}
                    render={(item: Record<string, any>) => {
                        return (
                            <ClickEditInput
                                style={{
                                    padding: '16px',
                                }}
                                key={index + record?.studyTaskAssmentPlanProjectList?.length}
                                defaultValue={item?.assessmentProject}
                                active={active}
                                setActive={setActive}
                                placeholder="请输入"
                                onChange={val => {
                                    item.assessmentProject = val
                                    onDataChange?.(
                                        index,
                                        'studyTaskAssmentPlanProjectList',
                                        record?.studyTaskAssmentPlanProjectList,
                                    )
                                }}
                                onChangeBlur={val => {
                                    item.assessmentProject = val
                                    onDataChange?.(
                                        index,
                                        'studyTaskAssmentPlanProjectList',
                                        record?.studyTaskAssmentPlanProjectList,
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
        title: '项目说明',
        dataIndex: 'assessmentProjectDesc',
        key: 'assessmentProjectDesc',
        width: '10%',
        align: 'center',
        render: (_, record, index) => {
            return (
                <RowRender
                    data={record?.studyTaskAssmentPlanProjectList}
                    recordIndex={index}
                    rowHeights={rowHeights}
                    render={(item: Record<string, any>) => {
                        return (
                            <ClickEditInput
                                style={{
                                    padding: '16px',
                                }}
                                key={index + record?.studyTaskAssmentPlanProjectList?.length}
                                defaultValue={item?.assessmentProjectDesc}
                                active={active}
                                setActive={setActive}
                                placeholder="请输入"
                                onChange={val => {
                                    item.assessmentProjectDesc = val
                                    onDataChange?.(
                                        index,
                                        'studyTaskAssmentPlanProjectList',
                                        record?.studyTaskAssmentPlanProjectList,
                                    )
                                }}
                                onChangeBlur={val => {
                                    item.assessmentProjectDesc = val
                                    onDataChange?.(
                                        index,
                                        'studyTaskAssmentPlanProjectList',
                                        record?.studyTaskAssmentPlanProjectList,
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
        title: '配分(%)',
        dataIndex: 'weight',
        key: 'weight',
        width: '5%',
        align: 'center',
        render: (_, record, index) => {
            return (
                <RowRender
                    data={record?.studyTaskAssmentPlanProjectList}
                    recordIndex={index}
                    rowHeights={rowHeights}
                    render={(item: Record<string, any>) => {
                        return (
                            <ClickEditInputNumber
                                style={{
                                    padding: '16px',
                                }}
                                key={index + record?.studyTaskAssmentPlanProjectList?.length}
                                defaultValue={Number(item.weight)}
                                active={active}
                                setActive={setActive}
                                placeholder="请输入"
                                onChange={val => {
                                    item.weight = val
                                    onDataChange?.(
                                        index,
                                        'studyTaskAssmentPlanProjectList',
                                        record?.studyTaskAssmentPlanProjectList,
                                    )
                                }}
                                onChangeBlur={val => {
                                    item.weight = val
                                    onDataChange?.(
                                        index,
                                        'studyTaskAssmentPlanProjectList',
                                        record?.studyTaskAssmentPlanProjectList,
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

export const getAssessmentScoreCompositionTableColumns = (
    activeListItem: IListBaseItem,
    active: boolean,
    setActive: (active: boolean) => void,
    onDataChange?: (index: number, field: string, value: any) => void,
): TableColumnsType<any> => [
    {
        title: '学习任务名称',
        width: '20%',
        align: 'center',
        children: [
            {
                title: '考核项目',
                dataIndex: 'name',
                align: 'center',
            },
        ],
    },
    {
        title: activeListItem?.name,
        width: '80%',
        align: 'center',
        children: [
            {
                title: '配分（%）',
                dataIndex: 'weight',
                align: 'center',
                render: (value: string, record, index) =>
                    record?.name === '合计' ? (
                        value
                    ) : (
                        <ClickEditInputNumber
                            defaultValue={Number(value)}
                            active={active}
                            setActive={setActive}
                            onChange={val => onDataChange?.(index, 'weight', val)}
                            onChangeBlur={val => onDataChange?.(index, 'weight', val)}
                            style={{ padding: '16px' }}
                        />
                    ),
            },
            {
                title: '考试方式及权重',
                dataIndex: '',
                align: 'center',
                children: [
                    {
                        title: '自评',
                        dataIndex: 'selfWeight',
                        align: 'center',
                        render: (value: string, record, index) =>
                            record?.name === '合计' ? (
                                '/'
                            ) : (
                                <ClickEditInputNumber
                                    defaultValue={Number(value)}
                                    active={active}
                                    setActive={setActive}
                                    onChange={val => onDataChange?.(index, 'selfWeight', val)}
                                    onChangeBlur={val => onDataChange?.(index, 'selfWeight', val)}
                                    style={{ padding: '16px' }}
                                />
                            ),
                    },
                    {
                        title: '互评',
                        dataIndex: 'peerWeight',
                        align: 'center',
                        render: (value: string, record, index) =>
                            record?.name === '合计' ? (
                                '/'
                            ) : (
                                <ClickEditInputNumber
                                    defaultValue={Number(value)}
                                    active={active}
                                    setActive={setActive}
                                    onChange={val => onDataChange?.(index, 'peerWeight', val)}
                                    onChangeBlur={val => onDataChange?.(index, 'peerWeight', val)}
                                    style={{ padding: '16px' }}
                                />
                            ),
                    },
                    {
                        title: '师评',
                        dataIndex: 'teacherWeight',
                        align: 'center',
                        render: (value: string, record, index) =>
                            record?.name === '合计' ? (
                                '/'
                            ) : (
                                <ClickEditInputNumber
                                    defaultValue={Number(value)}
                                    active={active}
                                    setActive={setActive}
                                    onChange={val => onDataChange?.(index, 'teacherWeight', val)}
                                    onChangeBlur={val =>
                                        onDataChange?.(index, 'teacherWeight', val)
                                    }
                                    style={{ padding: '16px' }}
                                />
                            ),
                    },
                ],
            },
            {
                title: '得分',
                dataIndex: '得分',
                align: 'center',
                render: () => {
                    return <div>/</div>
                },
            },
        ],
    },
]
