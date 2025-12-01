import ClickEditInput from '@/components/ClickEditInput'
import type { TableColumnsType } from 'antd'
import type { ICourseStylistic2Task } from '../../types/stylistic2'
import ClickEditInputNumber from '@/components/ClickEditInputNumber'

export const stylisticItemMap = {
    1: [
        {
            key: 'typicalWorkDescription',
            name: '一、典型工作任务描述',
        },
    ],
    2: [
        {
            name: '1.工作对象',
            key: 'workObject',
        },
        {
            name: '2.工具、材料、设备与资料',
            key: 'toolsMaterialsEquipment',
        },
        {
            name: '3.工作方法',
            key: 'workMethod',
        },
        {
            name: '4.劳动组织形式',
            key: 'laborOrganization',
        },
        {
            name: '5.工作要求',
            key: 'workRequirements',
        },
    ],
    3: [
        {
            key: 'courseObjectives',
            name: '三、课程目标',
        },
    ],
    4: [
        {
            key: 'learningContent',
            name: '四、学习内容',
        },
    ],
    5: [
        {
            name: '五、学习任务',
            key: 'tasks',
        },
    ],
    6: [
        {
            key: 'teachingImplementationSuggestions',
            name: '六、教学实施建议',
        },
    ],
    7: [
        {
            key: 'teachingAssessmentRequirements',
            name: '七、教学考核要求',
        },
    ],
}

export const getStudyTaskColumns = (
    active: boolean,
    setActive: (active: boolean) => void,
    onDataChange?: (index: number, field: string, value: any) => void,
): TableColumnsType<ICourseStylistic2Task> => [
    {
        title: '序号',
        key: 'index',
        width: '10%',
        align: 'center',
        render: (_value, _record, index) => <span>{index + 1}</span>,
    },
    {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        width: '25%',
        align: 'center',
        render: name => <span>{name}</span>,
    },
    {
        title: '学习任务描述',
        dataIndex: 'description',
        key: 'description',
        width: '50%',
        align: 'center',
        render: (value: string, _record, index) => (
            <ClickEditInput
                defaultValue={value}
                active={active}
                setActive={setActive}
                placeholder="请输入"
                onChange={val => onDataChange?.(index, 'description', val)}
                onChangeBlur={val => onDataChange?.(index, 'description', val)}
            />
        ),
    },
    {
        title: '参考学时',
        dataIndex: 'hours',
        key: 'hours',
        width: '15%',
        align: 'center',
        render: (value: number, _record, index) => (
            <ClickEditInputNumber
                defaultValue={Number(value)}
                active={active}
                setActive={setActive}
                placeholder="请输入"
                onChange={val => onDataChange?.(index, 'hours', val)}
                onChangeBlur={val => onDataChange?.(index, 'hours', val)}
            />
        ),
    },
]
