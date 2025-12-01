import type { TableColumnsType } from 'antd'
import ClickEditInputNumber from '@/components/ClickEditInputNumber'
import ClickEditInput from '@/components/ClickEditInput'
import { RowRender } from '@/pages/assistant/course/[id]/design/check/const'

export const getStudyTaskListColumns = (
    active: boolean,
    setActive: (active: boolean) => void,
    length: number,
    onDataChange?: (index: number, field: string, value: any) => void,
): TableColumnsType<any> => [
    {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        width: '10%',
        align: 'center',
        render: (_value, _record, index) => <span>{index + 1}</span>,
        onCell: (_, index) => ({
            colSpan: (index as number) === length - 1 ? 0 : 1,
        }),
    },
    {
        title: '学习任务',
        dataIndex: 'name',
        key: 'name',
        width: '25%',
        align: 'center',
        onCell: (_, index) => ({
            colSpan: (index as number) === length - 1 ? 2 : 1,
        }),
    },
    {
        title: '基准学时',
        dataIndex: 'basePeriod',
        key: 'basePeriod',
        width: '15%',
        align: 'center',
        render: (value: string, record, index) => {
            return (
                <ClickEditInputNumber
                    defaultValue={Number(value)}
                    active={active}
                    setActive={setActive}
                    placeholder="请输入"
                    onChange={val => onDataChange?.(index, 'basePeriod', val)}
                    onChangeBlur={val => onDataChange?.(index, 'basePeriod', val)}
                />
            )
        },
    },
    {
        title: '预计学时',
        dataIndex: 'estimatePeriod',
        key: 'estimatePeriod',
        width: '25%',
        align: 'center',
        render: (value: string, record, index) => {
            return (
                <ClickEditInputNumber
                    defaultValue={Number(value)}
                    active={active}
                    setActive={setActive}
                    placeholder="请输入"
                    onChange={val => onDataChange?.(index, 'estimatePeriod', val)}
                    onChangeBlur={val => onDataChange?.(index, 'estimatePeriod', val)}
                />
            )
        },
    },
    {
        title: '机动学时',
        dataIndex: 'motorizedPeriod',
        key: 'motorizedPeriod',
        width: '25%',
        align: 'center',
        render: (value: string, record, index) => {
            return (
                <ClickEditInputNumber
                    defaultValue={Number(value)}
                    active={active}
                    setActive={setActive}
                    placeholder="请输入"
                    onChange={val => onDataChange?.(index, 'motorizedPeriod', val)}
                    onChangeBlur={val => onDataChange?.(index, 'motorizedPeriod', val)}
                />
            )
        },
    },
]

export const getAssessmentColumns = (
    active: boolean,
    setActive: (active: boolean) => void,
    onDataChange?: (index: number, field: string, value: any) => void,
): TableColumnsType<any> => [
    {
        title: '周次',
        dataIndex: 'finalityWeekly',
        key: 'finalityWeekly',
        width: '15%',
        align: 'center',
        render: (value: string, _record, index) => (
            <ClickEditInputNumber
                defaultValue={Number(value)}
                active={active}
                setActive={setActive}
                placeholder="请输入"
                onChange={val => onDataChange?.(index, 'finalityWeekly', val)}
                onChangeBlur={val => onDataChange?.(index, 'finalityWeekly', val)}
            />
        ),
    },
    {
        title: '学时',
        dataIndex: 'finalityPeriod',
        key: 'finalityPeriod',
        width: '15%',
        align: 'center',
        render: (value: string, _record, index) => (
            <ClickEditInputNumber
                defaultValue={Number(value)}
                active={active}
                setActive={setActive}
                placeholder="请输入"
                onChange={val => onDataChange?.(index, 'finalityPeriod', val)}
                onChangeBlur={val => onDataChange?.(index, 'finalityPeriod', val)}
            />
        ),
    },
    {
        title: '考核内容及方式',
        dataIndex: 'finalityAssessContent',
        key: 'finalityAssessContent',
        width: '70%',
        align: 'center',
        render: (value: string, _record, index) => (
            <ClickEditInput
                defaultValue={value}
                active={active}
                setActive={setActive}
                placeholder="请输入"
                onChange={val => onDataChange?.(index, 'finalityAssessContent', val)}
                onChangeBlur={val => onDataChange?.(index, 'finalityAssessContent', val)}
            />
        ),
    },
]

export const getTeachingActivityDesignColumns = (
    active: boolean,
    setActive: (active: boolean) => void,
    onDataChange?: (index: number, field: string, value: any) => void,
): TableColumnsType<any> => [
    {
        title: '教学过程',
        dataIndex: 'teachingProcess',
        key: 'teachingProcess',
        width: '10%',
        align: 'center',
        render: (value: string, _record, index) => (
            <ClickEditInput
                defaultValue={value}
                active={active}
                setActive={setActive}
                placeholder="请输入"
                onChange={val => onDataChange?.(index, 'teachingProcess', val)}
                onChangeBlur={val => onDataChange?.(index, 'teachingProcess', val)}
            />
        ),
    },
    {
        title: '学习内容',
        dataIndex: 'learningContent',
        key: 'learningContent',
        width: '10%',
        align: 'center',
        render: (value: string, _record, index) => (
            <ClickEditInput
                defaultValue={value}
                active={active}
                setActive={setActive}
                placeholder="请输入"
                onChange={val => onDataChange?.(index, 'learningContent', val)}
                onChangeBlur={val => onDataChange?.(index, 'learningContent', val)}
            />
        ),
    },
    {
        title: '学生活动',
        dataIndex: 'studentActivity',
        key: 'studentActivity',
        width: '10%',
        align: 'center',
        render: (value: string, _record, index) => (
            <ClickEditInput
                defaultValue={value}
                active={active}
                setActive={setActive}
                placeholder="请输入"
                onChange={val => onDataChange?.(index, 'studentActivity', val)}
                onChangeBlur={val => onDataChange?.(index, 'studentActivity', val)}
            />
        ),
    },
    {
        title: '教师活动',
        dataIndex: 'teacherActivity',
        key: 'teacherActivity',
        width: '10%',
        align: 'center',
        render: (value: string, _record, index) => (
            <ClickEditInput
                defaultValue={value}
                active={active}
                setActive={setActive}
                placeholder="请输入"
                onChange={val => onDataChange?.(index, 'teacherActivity', val)}
                onChangeBlur={val => onDataChange?.(index, 'teacherActivity', val)}
            />
        ),
    },
    {
        title: '教学手段',
        dataIndex: 'teachingMeans',
        key: 'teachingMeans',
        width: '10%',
        align: 'center',
        render: (value: string, _record, index) => (
            <ClickEditInput
                defaultValue={value}
                active={active}
                setActive={setActive}
                placeholder="请输入"
                onChange={val => onDataChange?.(index, 'teachingMeans', val)}
                onChangeBlur={val => onDataChange?.(index, 'teachingMeans', val)}
            />
        ),
    },
    {
        title: '教学方法',
        dataIndex: 'teachingMethods',
        key: 'teachingMethods',
        width: '10%',
        align: 'center',
        render: (value: string, _record, index) => (
            <ClickEditInput
                defaultValue={value}
                active={active}
                setActive={setActive}
                placeholder="请输入"
                onChange={val => onDataChange?.(index, 'teachingMethods', val)}
                onChangeBlur={val => onDataChange?.(index, 'teachingMethods', val)}
            />
        ),
    },
    {
        title: '学习成果',
        dataIndex: 'learningResult',
        key: 'learningResult',
        width: '10%',
        align: 'center',
        render: (value: string, _record, index) => (
            <ClickEditInput
                defaultValue={value}
                active={active}
                setActive={setActive}
                placeholder="请输入"
                onChange={val => onDataChange?.(index, 'learningResult', val)}
                onChangeBlur={val => onDataChange?.(index, 'learningResult', val)}
            />
        ),
    },
]

export const getPlanTableColumns = (
    active: boolean,
    setActive: (active: boolean) => void,
    dataSource: Record<string, any>[],
    planTableIndex: number,
    sIndex: number,
    onDataChange?: (dataSource: any[]) => void,
    rowHeights?: Record<string, number>,
): TableColumnsType<any> => [
    {
        title: '周次',
        dataIndex: 'weekly',
        key: 'weekly',
        width: '5%',
        align: 'center',
        render: (value: string, record) => (
            <ClickEditInputNumber
                style={{ padding: '16px' }}
                defaultValue={Number(record?.weekly || 0)}
                active={active}
                setActive={setActive}
                placeholder="请输入"
                onChange={val => {
                    dataSource[planTableIndex].stageTeachingScheduleList[sIndex].weekly = val
                    onDataChange?.(dataSource || [])
                }}
                onChangeBlur={val => {
                    dataSource[planTableIndex].stageTeachingScheduleList[sIndex].weekly = val
                    onDataChange?.(dataSource || [])
                }}
            />
        ),
    },
    {
        title: '教学单元序号及名称',
        dataIndex: 'name',
        key: 'name',
        width: '10%',
        align: 'center',
        render: (_, record, index) => {
            return (
                <RowRender
                    data={record?.learningStepList}
                    recordIndex={index}
                    rowHeights={rowHeights}
                    render={(item: Record<string, any>, dataIndex: number) => {
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
                                    dataSource[planTableIndex].stageTeachingScheduleList[
                                        sIndex
                                    ].learningStepList[dataIndex].name = val
                                    onDataChange?.(dataSource || [])
                                }}
                                onChangeBlur={val => {
                                    dataSource[planTableIndex].stageTeachingScheduleList[
                                        sIndex
                                    ].learningStepList[dataIndex].name = val
                                    onDataChange?.(dataSource || [])
                                }}
                            />
                        )
                    }}
                />
            )
        },
    },
    {
        title: '学时',
        dataIndex: 'period',
        key: 'period',
        width: '5%',
        align: 'center',
        render: (_, record, index) => {
            return (
                <RowRender
                    data={record?.learningStepList}
                    recordIndex={index}
                    rowHeights={rowHeights}
                    render={(item: Record<string, any>, dataIndex: number) => {
                        return (
                            <ClickEditInputNumber
                                style={{
                                    padding: '16px',
                                }}
                                key={index + record?.learningStepList?.length}
                                defaultValue={Number(item?.period)}
                                active={active}
                                setActive={setActive}
                                placeholder="请输入"
                                onChange={val => {
                                    dataSource[planTableIndex].stageTeachingScheduleList[
                                        sIndex
                                    ].learningStepList[dataIndex].period = val
                                    onDataChange?.(dataSource || [])
                                }}
                                onChangeBlur={val => {
                                    dataSource[planTableIndex].stageTeachingScheduleList[
                                        sIndex
                                    ].learningStepList[dataIndex].period = val
                                    onDataChange?.(dataSource || [])
                                }}
                            />
                        )
                    }}
                />
            )
        },
    },
    {
        title: '学习目标',
        dataIndex: 'learningGoal',
        key: 'learningGoal',
        width: '10%',
        align: 'center',
        render: (_, record, index) => {
            return (
                <RowRender
                    data={record?.learningStepList}
                    recordIndex={index}
                    rowHeights={rowHeights}
                    render={(item: Record<string, any>, dataIndex: number) => {
                        return (
                            <ClickEditInput
                                style={{
                                    padding: '16px',
                                }}
                                key={index + record?.learningStepList?.length}
                                defaultValue={item?.learningGoal}
                                active={active}
                                setActive={setActive}
                                placeholder="请输入"
                                onChange={val => {
                                    dataSource[planTableIndex].stageTeachingScheduleList[
                                        sIndex
                                    ].learningStepList[dataIndex].learningGoal = val
                                    onDataChange?.(dataSource || [])
                                }}
                                onChangeBlur={val => {
                                    dataSource[planTableIndex].stageTeachingScheduleList[
                                        sIndex
                                    ].learningStepList[dataIndex].learningGoal = val
                                    onDataChange?.(dataSource || [])
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
                    render={(item: Record<string, any>, dataIndex: number) => {
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
                                    dataSource[planTableIndex].stageTeachingScheduleList[
                                        sIndex
                                    ].learningStepList[dataIndex].learningContent = val
                                    onDataChange?.(dataSource || [])
                                }}
                                onChangeBlur={val => {
                                    dataSource[planTableIndex].stageTeachingScheduleList[
                                        sIndex
                                    ].learningStepList[dataIndex].learningContent = val
                                    onDataChange?.(dataSource || [])
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
                    render={(item: Record<string, any>, dataIndex: number) => {
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
                                    dataSource[planTableIndex].stageTeachingScheduleList[
                                        sIndex
                                    ].learningStepList[dataIndex].learningResult = val
                                    onDataChange?.(dataSource || [])
                                }}
                                onChangeBlur={val => {
                                    dataSource[planTableIndex].stageTeachingScheduleList[
                                        sIndex
                                    ].learningStepList[dataIndex].learningResult = val
                                    onDataChange?.(dataSource || [])
                                }}
                            />
                        )
                    }}
                />
            )
        },
    },
]
