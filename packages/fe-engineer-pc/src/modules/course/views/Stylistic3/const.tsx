import type { ICourseStylistic3LearningTaskDesign } from '../../types/stylistic3'
import ClickEditInput from '@/components/ClickEditInput'
import ClickEditInputNumber from '@/components/ClickEditInputNumber'

export const getLearningTaskDesignColumns = (
    tasks: ICourseStylistic3LearningTaskDesign[] = [],
    active: boolean,
    setActive: (active: boolean) => void,
    onDataChange?: (index: number, field: string, value: any) => void,
) => {
    const baseColumns = [
        {
            title: '任务名称',
            dataIndex: 'rowName',
            align: 'center' as const,
            width: 150,
            fixed: 'left' as const,
        },
    ]

    const dynamicColumns = tasks.map((task, taskIndex) => ({
        title: `学习任务${taskIndex + 1}.${task.name || '未命名任务'}`,
        dataIndex: `task_${taskIndex}`,
        align: 'center' as const,
        width: 200,
        render: (value: any, record: any, rowIndex: number) => {
            if (record.key === 'period') {
                return (
                    <ClickEditInputNumber
                        defaultValue={Number(value)}
                        active={active}
                        setActive={setActive}
                        placeholder="请输入学时"
                        onChange={val => onDataChange?.(rowIndex, `task_${taskIndex}`, val)}
                        onChangeBlur={val => {
                            onDataChange?.(rowIndex, `task_${taskIndex}`, val)
                        }}
                        disabled={true}
                    />
                )
            } else {
                return (
                    <ClickEditInput
                        defaultValue={value}
                        active={active}
                        setActive={setActive}
                        placeholder="请输入"
                        onChange={val => onDataChange?.(rowIndex, `task_${taskIndex}`, val)}
                        onChangeBlur={val => {
                            onDataChange?.(rowIndex, `task_${taskIndex}`, val)
                        }}
                    />
                )
            }
        },
    }))

    return [...baseColumns, ...dynamicColumns]
}

export const getTableRowData = (tasks: ICourseStylistic3LearningTaskDesign[] = []) => {
    const rowNames = [
        { key: 'scenario', label: '学习任务描述' },
        { key: 'period', label: '基准学时' },
        { key: 'objectives', label: '学习任务目标' },
        { key: 'content', label: '学习任务内容' },
        { key: 'teachSuggestion', label: '教学实施建议' },
        { key: 'teachRequirements', label: '教学考核要求' },
    ]

    return rowNames.map(row => {
        const rowData: any = {
            key: row.key,
            rowName: row.label,
        }

        tasks.forEach((task, index) => {
            const fieldValue = task[row.key as keyof ICourseStylistic3LearningTaskDesign]
            if (row.key === 'period') {
                rowData[`task_${index}`] = fieldValue ?? 0
            } else {
                rowData[`task_${index}`] = fieldValue ?? ''
            }
        })

        return rowData
    })
}
