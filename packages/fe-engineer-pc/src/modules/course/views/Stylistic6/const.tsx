import ClickEditInput from '@/components/ClickEditInput'
import type { TableColumnsType } from 'antd'
import type { ICourseStylistic6WorkAndLearningAnalysisItem } from '../../types/stylistic6'

export const stylisticItemMap = {
    1: [
        {
            name: '一、基本信息',
            key: 'basicInfoDto',
        },
    ],
    2: [
        {
            name: '二、学习任务代表性特征分析（选填）',
            key: 'representativeFeatures',
        },
    ],
    3: [
        {
            name: '1.任务情景',
            key: 'scenario',
        },
        {
            name: '2.任务资料',
            key: 'materials',
        },
        {
            name: '3.任务要求',
            key: 'requirements',
        },
    ],
    4: [
        {
            name: '四、工作学习内容分析',
            key: 'workAndLearningAnalysisItems',
        },
    ],
}

export const getWorkAnalysisColumns = (
    active: boolean,
    setActive: (active: boolean) => void,
    onDataChange?: (index: number, field: string, value: any) => void,
): TableColumnsType<ICourseStylistic6WorkAndLearningAnalysisItem> => {
    return [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            width: 50,
            align: 'center',
            render: (_value, _record, index) => <span>{index + 1}</span>,
            onCell: (_, index) => {
                if (index === 0) {
                    return { rowSpan: 1 }
                }
                return {}
            },
        },
        {
            title: '工作内容分析',
            align: 'center',
            children: [
                {
                    title: '工作步骤',
                    dataIndex: 'name',
                    align: 'center',
                    width: 90,
                    render: (value: string, _record, index) => (
                        <ClickEditInput
                            defaultValue={value}
                            active={active}
                            setActive={setActive}
                            placeholder="请输入"
                            onChange={val => onDataChange?.(index, 'name', val)}
                            onChangeBlur={val => onDataChange?.(index, 'name', val)}
                            disabled={true}
                        />
                    ),
                },
                {
                    title: '具体工作内容',
                    dataIndex: 'workContent',
                    align: 'center',
                    width: 90,
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
                {
                    title: '工具材料设备',
                    dataIndex: 'tools',
                    align: 'center',
                    width: 90,
                    render: (value: string, _record, index) => (
                        <ClickEditInput
                            defaultValue={value}
                            active={active}
                            setActive={setActive}
                            placeholder="请输入"
                            onChange={val => onDataChange?.(index, 'tools', val)}
                            onChangeBlur={val => onDataChange?.(index, 'tools', val)}
                        />
                    ),
                },
                {
                    title: '劳动组织关系',
                    dataIndex: 'laborOrganization',
                    align: 'center',
                    width: 90,
                    render: (value: string, _record, index) => (
                        <ClickEditInput
                            defaultValue={value}
                            active={active}
                            setActive={setActive}
                            placeholder="请输入"
                            onChange={val => onDataChange?.(index, 'laborOrganization', val)}
                            onChangeBlur={val => onDataChange?.(index, 'laborOrganization', val)}
                        />
                    ),
                },
                {
                    title: '工作方法',
                    dataIndex: 'workMethod',
                    align: 'center',
                    width: 90,
                    render: (value: string, _record, index) => (
                        <ClickEditInput
                            defaultValue={value}
                            active={active}
                            setActive={setActive}
                            placeholder="请输入"
                            onChange={val => onDataChange?.(index, 'workMethod', val)}
                            onChangeBlur={val => onDataChange?.(index, 'workMethod', val)}
                        />
                    ),
                },
                {
                    title: '工作成果',
                    dataIndex: 'workOutcome',
                    align: 'center',
                    width: 90,
                    render: (value: string, _record, index) => (
                        <ClickEditInput
                            defaultValue={value}
                            active={active}
                            setActive={setActive}
                            placeholder="请输入"
                            onChange={val => onDataChange?.(index, 'workOutcome', val)}
                            onChangeBlur={val => onDataChange?.(index, 'workOutcome', val)}
                        />
                    ),
                },
                {
                    title: '工作要求',
                    dataIndex: 'workRequirement',
                    align: 'center',
                    width: 90,
                    render: (value: string, _record, index) => (
                        <ClickEditInput
                            defaultValue={value}
                            active={active}
                            setActive={setActive}
                            placeholder="请输入"
                            onChange={val => onDataChange?.(index, 'workRequirement', val)}
                            onChangeBlur={val => onDataChange?.(index, 'workRequirement', val)}
                        />
                    ),
                },
            ],
        },
        {
            title: '学习内容分析',
            align: 'center',
            children: [
                {
                    title: '实践知识',
                    dataIndex: 'practicalKnowledge',
                    align: 'center',
                    width: 90,
                    render: (value: string, _record, index) => (
                        <ClickEditInput
                            defaultValue={value}
                            active={active}
                            setActive={setActive}
                            placeholder="请输入"
                            onChange={val => onDataChange?.(index, 'practicalKnowledge', val)}
                            onChangeBlur={val => onDataChange?.(index, 'practicalKnowledge', val)}
                            disabled={true}
                        />
                    ),
                },
                {
                    title: '理论知识',
                    dataIndex: 'theoreticalKnowledge',
                    align: 'center',
                    width: 90,
                    render: (value: string, _record, index) => (
                        <ClickEditInput
                            defaultValue={value}
                            active={active}
                            setActive={setActive}
                            placeholder="请输入"
                            onChange={val => onDataChange?.(index, 'theoreticalKnowledge', val)}
                            onChangeBlur={val => onDataChange?.(index, 'theoreticalKnowledge', val)}
                            disabled={true}
                        />
                    ),
                },
                {
                    title: '职业素养',
                    dataIndex: 'professionalism',
                    align: 'center',
                    width: 90,
                    render: (value: string, _record, index) => (
                        <ClickEditInput
                            defaultValue={value}
                            active={active}
                            setActive={setActive}
                            placeholder="请输入"
                            onChange={val => onDataChange?.(index, 'professionalism', val)}
                            onChangeBlur={val => onDataChange?.(index, 'professionalism', val)}
                            disabled={true}
                        />
                    ),
                },
            ],
        },
    ]
}
