import ClickEditInput from '@/components/ClickEditInput'
import type { TableColumnsType } from 'antd'
import type { ICourseStylistic10StageTeachingSchedule } from '../../types/stylistic10'

/**
 * 将学习路径数据转换为表格显示格式
 */
export const transformTeachingScheduleData = (
    stageTeachingScheduleList: ICourseStylistic10StageTeachingSchedule[],
) => {
    if (!stageTeachingScheduleList || stageTeachingScheduleList.length === 0) return []

    const flattenData: any[] = []

    stageTeachingScheduleList.forEach((stage, stageIndex) => {
        // 如果学习环节没有学习步骤，创建一个空行
        if (!stage.learningStepList || stage.learningStepList.length === 0) {
            flattenData.push({
                stageIndex: stageIndex + 1,
                stageName: stage.name || '',
                stepName: '',
                studentActivityText: '',
                rowSpan: 1,
                originalIndex: flattenData.length,
                stageCode: stage.code,
                stepCode: '',
            })
        } else {
            // 处理每个学习步骤
            stage.learningStepList.forEach((step, stepIndex) => {
                const isFirstStep = stepIndex === 0
                const stepName = `${step.name || ''}`

                flattenData.push({
                    stageIndex: stageIndex + 1,
                    stageName: stage.name || '',
                    stepName: stepName,
                    studentActivityText: (step as any).studentActivityText,
                    rowSpan: isFirstStep ? stage.learningStepList!.length : 0, // 只有第一行设置 rowSpan
                    originalIndex: flattenData.length,
                    stageCode: stage.code,
                    stepCode: step.code,
                })
            })
        }
    })

    return flattenData
}

/**
 * 学习路径表格列配置
 */
export const getTeachingScheduleColumns = (
    active: boolean,
    setActive: (active: boolean) => void,
    onDataChange?: (index: number, field: string, value: any) => void,
): TableColumnsType<any> => [
    {
        title: '序号',
        dataIndex: 'stageIndex',
        key: 'stageIndex',
        width: 80,
        align: 'center',
        onCell: record => ({
            rowSpan: record.rowSpan || 0,
        }),
        render: (_value, record) => <span>{record.stageIndex}</span>,
    },
    {
        title: '学习环节',
        dataIndex: 'stageName',
        key: 'stageName',
        width: 240,
        align: 'center',
        onCell: record => ({
            rowSpan: record.rowSpan || 0,
        }),
        render: (value: string) => <span>{value}</span>,
    },
    {
        title: '学习步骤',
        dataIndex: 'stepName',
        key: 'stepName',
        width: 300,
        align: 'left',
        render: (value: string) => <span>{value}</span>,
    },
    {
        title: '学生活动',
        dataIndex: 'studentActivityText',
        key: 'studentActivityText',
        align: 'left',
        render: (value: string, record) => (
            <ClickEditInput
                defaultValue={value}
                active={active}
                setActive={setActive}
                placeholder="请输入学生活动"
                onChange={val => onDataChange?.(record.originalIndex, 'studentActivityText', val)}
                onChangeBlur={val =>
                    onDataChange?.(record.originalIndex, 'studentActivityText', val)
                }
                disabled={true}
            />
        ),
    },
]

/**
 * 将扁平化的学习路径数据转换回原始数据结构
 */
export const convertFlattenedToOriginalTeachingSchedule = (
    flattenedData: any[],
    originalData: ICourseStylistic10StageTeachingSchedule[],
) => {
    if (!flattenedData || !originalData) return originalData

    const updatedStages = [...originalData]

    flattenedData.forEach(flatItem => {
        if (!flatItem.stageCode || !flatItem.stepCode) return

        const stageIndex = updatedStages.findIndex(stage => stage.code === flatItem.stageCode)
        if (stageIndex === -1) return

        const stage = updatedStages[stageIndex]
        if (!stage.learningStepList) return

        const stepIndex = stage.learningStepList.findIndex(step => step.code === flatItem.stepCode)
        if (stepIndex === -1) return

        // 更新学生活动文本 - 将文本转换为学生活动数组
        if (flatItem.studentActivityText !== undefined) {
            const currentStep = stage.learningStepList[stepIndex]
            ;(currentStep as any).studentActivityText = flatItem.studentActivityText
        }
    })

    return updatedStages
}
