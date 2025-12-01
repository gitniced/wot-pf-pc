import type { TableColumnsType } from 'antd'
import ClickEditInput from '@/components/ClickEditInput'
import { cloneDeep } from 'lodash'

export const getAssessmentPointsColumns = (
    active: boolean,
    setActive: (active: boolean) => void,
    stageList: any,
    onDataChange?: (index: number, field: string, value: any) => void,
): TableColumnsType<any> => {
    const arr = stageList?.[0]?.tasks?.map((item: any, i: number) => ({
        title: item?.name,
        dataIndex: 'content',
        align: 'center' as const,
        width: '20%',
        render: (value: string, record: any, index: number) => (
            <ClickEditInput
                defaultValue={record?.tasks?.[i]?.content}
                active={active}
                setActive={setActive}
                placeholder="请输入"
                onChange={val => {
                    const newTasks = cloneDeep(stageList?.[index].tasks)
                    newTasks[i].content = val
                    onDataChange?.(index, 'tasks', newTasks)
                }}
                onChangeBlur={val => {
                    const newTasks = cloneDeep(stageList?.[index].tasks)
                    newTasks[i].content = val
                    onDataChange?.(index, 'tasks', newTasks)
                }}
            />
        ),
    }))

    return [
        {
            title: '工作环节',
            dataIndex: 'name',
            key: 'name',
            width: '10%',
            align: 'center',
        },
        {
            title: '课程目标',
            dataIndex: 'courseObjectives',
            key: 'courseObjectives',
            width: '15%',
            align: 'center',
            render: (value: string, _record, index) => (
                <ClickEditInput
                    defaultValue={value}
                    active={active}
                    setActive={setActive}
                    placeholder="请输入"
                    onChange={val => onDataChange?.(index, 'courseObjectives', val)}
                    onChangeBlur={val => onDataChange?.(index, 'courseObjectives', val)}
                />
            ),
        },
        {
            title: '过程性考核要点',
            dataIndex: 'tasks',
            key: 'tasks',
            align: 'center',
            children: arr,
        },
        {
            title: '终结性考核要点',
            dataIndex: 'finalityEssentials',
            key: 'finalityEssentials',
            width: '15%',
            align: 'center',
            render: (value: string, _record, index) => (
                <ClickEditInput
                    defaultValue={value}
                    active={active}
                    setActive={setActive}
                    placeholder="请输入"
                    onChange={val => onDataChange?.(index, 'finalityEssentials', val)}
                    onChangeBlur={val => onDataChange?.(index, 'finalityEssentials', val)}
                />
            ),
        },
    ]
}

export const getAssessmentInstructionsColumns = (
    active: boolean,
    setActive: (active: boolean) => void,
    onDataChange?: (index: number, field: string, value: any) => void,
): TableColumnsType<any> => [
    {
        title: '序号',
        dataIndex: '序号',
        key: 'index',
        width: '10%',
        align: 'center',
        render: (_value, _recordn, index) => <span>{index + 1}</span>,
    },
    {
        title: '培养维度',
        dataIndex: 'name',
        key: 'name',
        width: '25%',
        align: 'center',
        render: (value: string, _record, index) => (
            <ClickEditInput
                defaultValue={value}
                active={active}
                setActive={setActive}
                placeholder="请输入"
                onChange={val => onDataChange?.(index, 'name', val)}
                onChangeBlur={val => onDataChange?.(index, 'name', val)}
            />
        ),
    },
    {
        title: '培养目标',
        dataIndex: 'objectives',
        key: 'objectives',
        width: '25%',
        align: 'center',
        render: (value: string, _record, index) => (
            <ClickEditInput
                defaultValue={value}
                active={active}
                setActive={setActive}
                placeholder="请输入"
                onChange={val => onDataChange?.(index, 'objectives', val)}
                onChangeBlur={val => onDataChange?.(index, 'objectives', val)}
            />
        ),
    },

    {
        title: '观察要点',
        dataIndex: 'observationPoints',
        key: 'observationPoints',
        width: '25%',
        align: 'center',
        render: (value: string, _record, index) => (
            <ClickEditInput
                defaultValue={value}
                active={active}
                setActive={setActive}
                placeholder="请输入"
                onChange={val => onDataChange?.(index, 'observationPoints', val)}
                onChangeBlur={val => onDataChange?.(index, 'observationPoints', val)}
            />
        ),
    },
]
