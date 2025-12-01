import ClickEditInput from '@/components/ClickEditInput'
import ClickEditInputNumber from '@/components/ClickEditInputNumber'
import type { TableColumnsType } from 'antd'
import { Table } from 'antd'
import type {
    ICourseStylistic9StageMastermind,
    ICourseStylistic9StageTeachingSchedule,
    ICourseStylistic9StudyTaskAssessmentPlanGradeCompose,
} from '../../types/stylistic9'

/**
 * 将学习路径数据转换为表格显示格式
 */
export const transformLearningPathData = (
    stageTeachingScheduleList: ICourseStylistic9StageTeachingSchedule[],
) => {
    if (!stageTeachingScheduleList || stageTeachingScheduleList.length === 0) return []

    const flattenData: any[] = []

    stageTeachingScheduleList.forEach((stage, stageIndex) => {
        // 如果学习环节没有学习步骤，创建一个空行
        if (
            !stage.stageLearningStepActivityList ||
            stage.stageLearningStepActivityList.length === 0
        ) {
            flattenData.push({
                stageIndex: stageIndex + 1,
                stageName: stage.name || '',
                stepName: '',
                studentActivity: '',
                rowSpan: 1,
                originalIndex: flattenData.length,
                stageCode: stage.code,
                stepCode: '',
            })
        } else {
            // 处理每个学习步骤
            stage.stageLearningStepActivityList.forEach((step, stepIndex) => {
                const isFirstStep = stepIndex === 0
                const stepName = `${step.name || ''}`

                flattenData.push({
                    stageIndex: stageIndex + 1,
                    stageName: stage.name || '',
                    stepName: stepName,
                    studentActivity: step.studentActivity || '',
                    rowSpan: isFirstStep ? stage.stageLearningStepActivityList!.length : 0, // 只有第一行设置 rowSpan
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
 * 二、学习环节
 */
export const getLearningStageColumns = (
    active: boolean,
    setActive: (active: boolean) => void,
    onDataChange?: (index: number, field: string, value: any) => void,
): TableColumnsType<ICourseStylistic9StageMastermind> => [
    {
        title: '序号',
        dataIndex: 'serialnumber',
        key: 'serialnumber',
        width: 80,
        align: 'center',
        render: (_value, _record, index) => <span>{index + 1}</span>,
    },
    {
        title: '学习环节',
        dataIndex: 'name',
        key: 'name',
        width: 240,
        align: 'center',
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
        title: '学时',
        dataIndex: 'period',
        key: 'period',
        width: 120,
        align: 'center',
        render: (value: number, _record, index) => (
            <ClickEditInputNumber
                defaultValue={Number(value)}
                active={active}
                setActive={setActive}
                placeholder="请输入"
                onChange={val => onDataChange?.(index, 'period', val)}
                onChangeBlur={val => onDataChange?.(index, 'period', val)}
                disabled={true}
            />
        ),
    },
    {
        title: '学习目标',
        dataIndex: 'learningGoal',
        key: 'learningGoal',
        align: 'center',
        render: (value: string, _record, index) => (
            <ClickEditInput
                defaultValue={value}
                active={active}
                setActive={setActive}
                placeholder="请输入"
                onChange={val => onDataChange?.(index, 'learningGoal', val)}
                onChangeBlur={val => onDataChange?.(index, 'learningGoal', val)}
                disabled={true}
            />
        ),
    },
]

/**
 * 三、学习路径
 */
export const getLearningPathColumns = (
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
        dataIndex: 'studentActivity',
        key: 'studentActivity',
        align: 'left',
        render: (value: string, record) => (
            <ClickEditInput
                defaultValue={value}
                active={active}
                setActive={setActive}
                placeholder="请输入学生活动"
                onChange={val => onDataChange?.(record.originalIndex, 'studentActivity', val)}
                onChangeBlur={val => onDataChange?.(record.originalIndex, 'studentActivity', val)}
                disabled={true}
            />
        ),
    },
]

/**
 * 五、学习任务考核成绩
 */
export const getAssessmentGradeColumns = (
    active: boolean,
    setActive: (active: boolean) => void,
    onDataChange?: (index: number, field: string, value: any) => void,
): TableColumnsType<ICourseStylistic9StudyTaskAssessmentPlanGradeCompose> => [
    {
        title: '考核项目',
        dataIndex: 'name',
        key: 'name',
        width: 240,
        align: 'center',
        render: (value: string, _record, index) => (
            <ClickEditInput
                defaultValue={value}
                active={active}
                setActive={setActive}
                placeholder="请输入考核项目"
                onChange={val => onDataChange?.(index, 'name', val)}
                onChangeBlur={val => onDataChange?.(index, 'name', val)}
            />
        ),
    },
    {
        title: '配分 (%)',
        dataIndex: 'weight',
        key: 'weight',
        width: 120,
        align: 'center',
        render: (value: number, _record, index) => (
            <ClickEditInputNumber
                defaultValue={Number(value) || 0}
                active={active}
                setActive={setActive}
                placeholder="请输入配分"
                onChange={val => onDataChange?.(index, 'weight', val)}
                onChangeBlur={val => onDataChange?.(index, 'weight', val)}
            />
        ),
    },
    {
        title: '考试方式及权重',
        children: [
            {
                title: '自评',
                dataIndex: 'selfWeight',
                key: 'selfWeight',
                width: 100,
                align: 'center',
                render: (value: number, _record, index) => (
                    <ClickEditInputNumber
                        defaultValue={Number(value) || 0}
                        active={active}
                        setActive={setActive}
                        placeholder="0"
                        onChange={val => onDataChange?.(index, 'selfWeight', val)}
                        onChangeBlur={val => onDataChange?.(index, 'selfWeight', val)}
                    />
                ),
            },
            {
                title: '互评',
                dataIndex: 'peerWeight',
                key: 'peerWeight',
                width: 100,
                align: 'center',
                render: (value: number, _record, index) => (
                    <ClickEditInputNumber
                        defaultValue={Number(value) || 0}
                        active={active}
                        setActive={setActive}
                        placeholder="0"
                        onChange={val => onDataChange?.(index, 'peerWeight', val)}
                        onChangeBlur={val => onDataChange?.(index, 'peerWeight', val)}
                    />
                ),
            },
            {
                title: '师评',
                dataIndex: 'teacherWeight',
                key: 'teacherWeight',
                width: 100,
                align: 'center',
                render: (value: number, _record, index) => (
                    <ClickEditInputNumber
                        defaultValue={Number(value) || 0}
                        active={active}
                        setActive={setActive}
                        placeholder="0"
                        onChange={val => onDataChange?.(index, 'teacherWeight', val)}
                        onChangeBlur={val => onDataChange?.(index, 'teacherWeight', val)}
                    />
                ),
            },
        ],
    },
    {
        title: '得分',
        dataIndex: 'score',
        key: 'score',
        width: 100,
        align: 'center',
        render: (value: string) => <span>{value || '/'}</span>,
    },
]

/**
 * 将扁平化的学习路径数据转换回原始数据结构
 */
export const convertFlattenedToOriginalLearningPath = (
    flattenedData: any[],
    originalData: ICourseStylistic9StageTeachingSchedule[],
) => {
    if (!flattenedData || !originalData) return originalData

    const updatedStages = [...originalData]

    flattenedData.forEach(flatItem => {
        if (!flatItem.stageCode || !flatItem.stepCode) return

        const stageIndex = updatedStages.findIndex(stage => stage.code === flatItem.stageCode)
        if (stageIndex === -1) return

        const stage = updatedStages[stageIndex]
        if (!stage.stageLearningStepActivityList) return

        const stepIndex = stage.stageLearningStepActivityList.findIndex(
            step => step.code === flatItem.stepCode,
        )
        if (stepIndex === -1) return

        // 更新学生活动
        if (flatItem.studentActivity !== undefined) {
            stage.stageLearningStepActivityList[stepIndex].studentActivity =
                flatItem.studentActivity
        }
    })

    return updatedStages
}

/**
 * 计算考核成绩表格的合计行
 */
export const getAssessmentGradeSummary = (
    dataSource: ICourseStylistic9StudyTaskAssessmentPlanGradeCompose[],
) => {
    if (!dataSource || dataSource.length === 0) return null

    const totalWeight = dataSource.reduce((sum, item) => sum + (item.weight || 0), 0)

    return (
        <Table.Summary.Row>
            <Table.Summary.Cell index={0} align="center">
                <strong>合计</strong>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={1} align="center">
                <strong>{totalWeight}</strong>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={2} align="center">
                <strong>/</strong>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={3} align="center">
                <strong>/</strong>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={4} align="center">
                <strong>/</strong>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={5} align="center">
                <strong>/</strong>
            </Table.Summary.Cell>
        </Table.Summary.Row>
    )
}
