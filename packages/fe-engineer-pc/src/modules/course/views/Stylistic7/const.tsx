import type { TableColumnsType } from 'antd'

import ClickEditInput from '@/components/ClickEditInput'
import ClickEditInputNumber from '@/components/ClickEditInputNumber'
import { RowRender } from '@/pages/assistant/course/[id]/design/check/const'
import type { IICourseStylistic7Analyze } from '@/modules/course/types/stylistic7'

export const getAnalyzeColumns = (
    active: boolean,
    setActive: (active: boolean) => void,
    onDataChange?: (index: number, field: string, value: any) => void,
): TableColumnsType<IICourseStylistic7Analyze> => [
    {
        title: '细分模块',
        dataIndex: 'refinementModules',
        key: 'refinementModules',
        width: '10%',
        align: 'center',
        render: (_value, _record) => <span>{_record?.refinementModules}</span>,
    },
    {
        title: '1. 学生基础',
        dataIndex: 'studentBase',
        key: 'studentBase',
        width: '25%',
        align: 'center',
        render: (value: string, _record, index) => (
            <ClickEditInput
                defaultValue={value}
                active={active}
                setActive={setActive}
                placeholder="请输入"
                onChange={val => onDataChange?.(index, 'studentBase', val)}
                onChangeBlur={val => onDataChange?.(index, 'studentBase', val)}
            />
        ),
    },
    {
        title: '2. 学生不足',
        dataIndex: 'studentInsufficient',
        key: 'studentInsufficient',
        width: '25%',
        align: 'center',
        render: (value: string, _record, index) => (
            <ClickEditInput
                defaultValue={value}
                active={active}
                setActive={setActive}
                placeholder="请输入"
                onChange={val => onDataChange?.(index, 'studentInsufficient', val)}
                onChangeBlur={val => onDataChange?.(index, 'studentInsufficient', val)}
            />
        ),
    },
    {
        title: '3. 改进方法',
        dataIndex: 'improvementMethod',
        key: 'improvementMethod',
        width: '25%',
        align: 'center',
        render: (value: string, _record, index) => (
            <ClickEditInput
                defaultValue={value}
                active={active}
                setActive={setActive}
                placeholder="请输入"
                onChange={val => onDataChange?.(index, 'improvementMethod', val)}
                onChangeBlur={val => onDataChange?.(index, 'improvementMethod', val)}
            />
        ),
    },
]

export const getTeachingActivityPlanningTableColumns = (
    active: boolean,
    setActive: (active: boolean) => void,
    onDataChange?: (index: number, field: string, value: any) => void,
    rowHeights?: Record<string, number>,
): TableColumnsType<any> => [
    {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        width: '5%',
        align: 'center',
        fixed: 'left',
        render: (_value, _record, _index) => <span>{_index + 1}</span>,
    },
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
                disabled={true}
            />
        ),
    },
    {
        title: '学时',
        dataIndex: 'period',
        key: 'period',
        width: '5%',
        align: 'center',
        render: (value: string, _record, index) => (
            <ClickEditInputNumber
                defaultValue={Number(value)}
                active={active}
                setActive={setActive}
                placeholder="请输入"
                onChange={val => onDataChange?.(index, 'period', val)}
                onChangeBlur={val => onDataChange?.(index, 'period', val)}
                style={{ padding: '16px' }}
                disabled={true}
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
                disabled={true}
            />
        ),
    },
    {
        title: '学习步骤',
        dataIndex: 'learningStepList',
        key: 'learningStepList',
        width: '10%',
        align: 'center',
        render: (_, record, index) => {
            return (
                <RowRender
                    data={record?.learningStepList}
                    recordIndex={index}
                    rowHeights={rowHeights}
                    render={(item: Record<string, any>) => {
                        return (
                            <ClickEditInput
                                style={{
                                    padding: '16px',
                                }}
                                key={index + record?.learningStepList?.length}
                                defaultValue={item?.name}
                                active={active}
                                setActive={setActive}
                                placeholder="请输入"
                                onChange={val => {
                                    item.name = val
                                    onDataChange?.(
                                        index,
                                        'learningStepList',
                                        record?.learningStepList,
                                    )
                                }}
                                onChangeBlur={val => {
                                    item.name = val
                                    onDataChange?.(
                                        index,
                                        'learningStepList',
                                        record?.learningStepList,
                                    )
                                }}
                                disabled={true}
                            />
                        )
                    }}
                />
            )
        },
    },
    {
        title: '学习内容',
        dataIndex: 'learningContent',
        key: 'learningContent',
        width: '10%',
        align: 'center',
        render: (_, record, index) => {
            return (
                <RowRender
                    data={record?.learningStepList}
                    recordIndex={index}
                    rowHeights={rowHeights}
                    render={(item: Record<string, any>) => {
                        return (
                            <ClickEditInput
                                style={{
                                    padding: '16px',
                                }}
                                key={index + record?.learningStepList?.length}
                                defaultValue={item?.learningContent}
                                active={active}
                                setActive={setActive}
                                placeholder="请输入"
                                onChange={val => {
                                    item.learningContent = val
                                    onDataChange?.(
                                        index,
                                        'learningStepList',
                                        record?.learningStepList,
                                    )
                                }}
                                onChangeBlur={val => {
                                    item.learningContent = val
                                    onDataChange?.(
                                        index,
                                        'learningStepList',
                                        record?.learningStepList,
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
        title: '学生活动',
        dataIndex: 'studentActivity',
        key: 'studentActivity',
        width: '10%',
        align: 'center',
        render: (_, record, index) => {
            return (
                <RowRender
                    data={record?.learningStepList}
                    recordIndex={index}
                    rowHeights={rowHeights}
                    render={(item: Record<string, any>) => {
                        return (
                            <ClickEditInput
                                style={{
                                    padding: '16px',
                                }}
                                key={index + record?.learningStepList?.length}
                                defaultValue={item?.studentActivity}
                                active={active}
                                setActive={setActive}
                                placeholder="请输入"
                                onChange={val => {
                                    item.studentActivity = val
                                    onDataChange?.(
                                        index,
                                        'learningStepList',
                                        record?.learningStepList,
                                    )
                                }}
                                onChangeBlur={val => {
                                    item.studentActivity = val
                                    onDataChange?.(
                                        index,
                                        'learningStepList',
                                        record?.learningStepList,
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
        title: '教师活动',
        dataIndex: 'teacherActivity',
        key: 'teacherActivity',
        width: '10%',
        align: 'center',
        render: (_, record, index) => {
            return (
                <RowRender
                    data={record?.learningStepList}
                    recordIndex={index}
                    rowHeights={rowHeights}
                    render={(item: Record<string, any>) => {
                        return (
                            <ClickEditInput
                                style={{
                                    padding: '16px',
                                }}
                                key={index + record?.learningStepList?.length}
                                defaultValue={item?.teacherActivity}
                                active={active}
                                setActive={setActive}
                                placeholder="请输入"
                                onChange={val => {
                                    item.teacherActivity = val
                                    onDataChange?.(
                                        index,
                                        'learningStepList',
                                        record?.learningStepList,
                                    )
                                }}
                                onChangeBlur={val => {
                                    item.teacherActivity = val
                                    onDataChange?.(
                                        index,
                                        'learningStepList',
                                        record?.learningStepList,
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
        title: '学习成果',
        dataIndex: 'learningResult',
        key: 'learningResult',
        width: '10%',
        align: 'center',
        render: (_, record, index) => {
            return (
                <RowRender
                    data={record?.learningStepList}
                    recordIndex={index}
                    rowHeights={rowHeights}
                    render={(item: Record<string, any>) => {
                        return (
                            <ClickEditInput
                                style={{
                                    padding: '16px',
                                }}
                                key={index + record?.learningStepList?.length}
                                defaultValue={item?.learningResult}
                                active={active}
                                setActive={setActive}
                                placeholder="请输入"
                                onChange={val => {
                                    item.learningResult = val
                                    onDataChange?.(
                                        index,
                                        'learningStepList',
                                        record?.learningStepList,
                                    )
                                }}
                                onChangeBlur={val => {
                                    item.learningResult = val
                                    onDataChange?.(
                                        index,
                                        'learningStepList',
                                        record?.learningStepList,
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
        title: '学习资源',
        dataIndex: 'learningResource',
        key: 'learningResource',
        width: '10%',
        align: 'center',
        render: (_, record, index) => {
            return (
                <RowRender
                    data={record?.learningStepList}
                    recordIndex={index}
                    rowHeights={rowHeights}
                    render={(item: Record<string, any>) => {
                        return (
                            <ClickEditInput
                                style={{
                                    padding: '16px',
                                }}
                                key={index + record?.learningStepList?.length}
                                defaultValue={item?.learningResource}
                                active={active}
                                setActive={setActive}
                                placeholder="请输入"
                                onChange={val => {
                                    item.learningResource = val
                                    onDataChange?.(
                                        index,
                                        'learningStepList',
                                        record?.learningStepList,
                                    )
                                }}
                                onChangeBlur={val => {
                                    item.learningResource = val
                                    onDataChange?.(
                                        index,
                                        'learningStepList',
                                        record?.learningStepList,
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
