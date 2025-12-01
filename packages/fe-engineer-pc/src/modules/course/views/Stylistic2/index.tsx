import ClickEditInputH2Card from '../../components/ClickEditInputH2Card'
import ClickEditMultiInputH2Card from '../../components/ClickEditMultiInputH2Card'
import ClickEditTableH2Card from '../../components/ClickEditTableH2Card'
import styles from './index.module.less'
import { getStudyTaskColumns, stylisticItemMap } from './const'
import { useCourseStore } from '../../context'
import { observer } from 'mobx-react'
import { useCallback, useEffect, useMemo } from 'react'
import { COURSE_DESIGN_STYLISTIC, COURSE_DESIGN_STYLISTIC_MAP } from '../../const'

const Stylistic2: React.FC = observer(() => {
    const courseStore = useCourseStore()

    useEffect(() => {
        courseStore.loadStylistic2()
    }, [courseStore])

    const stylistic2 = useMemo(() => {
        return courseStore.stylistic2
    }, [courseStore.stylistic2])

    const handleTypicalWorkDescriptionChange = useCallback(
        (value: string) => {
            return courseStore.saveStylistic2({
                typicalWorkDescription: value,
            })
        },
        [courseStore],
    )

    const handleWorkContentAnalysisChange = useCallback(
        (value: Record<string, string | undefined>) => {
            return courseStore.saveStylistic2(value)
        },
        [courseStore],
    )

    const handleCourseObjectivesChange = useCallback(
        (value: string) => {
            return courseStore.saveStylistic2({
                courseObjectives: value,
            })
        },
        [courseStore],
    )

    const handleLearningContentChange = useCallback(
        (value: string) => {
            return courseStore.saveStylistic2({
                learningContent: value,
            })
        },
        [courseStore],
    )

    const handleTasksChange = useCallback(
        (updatedTasks: any) => {
            return courseStore.saveStylistic2({
                tasks: updatedTasks,
            })
        },
        [courseStore],
    )

    const handleTeachingImplementationSuggestionsChange = useCallback(
        (value: string) => {
            return courseStore.saveStylistic2({
                teachingImplementationSuggestions: value,
            })
        },
        [courseStore],
    )

    const handleTeachingAssessmentRequirementsChange = useCallback(
        (value: string) => {
            return courseStore.saveStylistic2({
                teachingAssessmentRequirements: value,
            })
        },
        [courseStore],
    )

    const getTaskRowKey = useCallback((record: any) => `task-${record.name || 'unknown'}`, [])

    return (
        <div className={styles.stylistic}>
            <ClickEditInputH2Card
                title="一、典型工作任务描述"
                className={styles.stylistic_h2}
                dataTitle={COURSE_DESIGN_STYLISTIC_MAP[COURSE_DESIGN_STYLISTIC.stylistic2].name}
                defaultValue={stylistic2.typicalWorkDescription}
                onChangeBlur={handleTypicalWorkDescriptionChange}
                items={stylisticItemMap[1]}
            />
            <ClickEditMultiInputH2Card
                title="二、工作内容分析"
                className={styles.stylistic_h2}
                dataTitle={COURSE_DESIGN_STYLISTIC_MAP[COURSE_DESIGN_STYLISTIC.stylistic2].name}
                items={stylisticItemMap[2]}
                defaultValue={{
                    workObject: stylistic2.workObject,
                    toolsMaterialsEquipment: stylistic2.toolsMaterialsEquipment,
                    workMethod: stylistic2.workMethod,
                    laborOrganization: stylistic2.laborOrganization,
                    workRequirements: stylistic2.workRequirements,
                }}
                onChangeBlur={handleWorkContentAnalysisChange}
            />
            <ClickEditInputH2Card
                title="三、课程目标"
                className={styles.stylistic_h2}
                dataTitle={COURSE_DESIGN_STYLISTIC_MAP[COURSE_DESIGN_STYLISTIC.stylistic2].name}
                defaultValue={stylistic2.courseObjectives}
                onChangeBlur={handleCourseObjectivesChange}
                items={stylisticItemMap[3]}
            />
            <ClickEditInputH2Card
                title="四、学习内容"
                className={styles.stylistic_h2}
                dataTitle={COURSE_DESIGN_STYLISTIC_MAP[COURSE_DESIGN_STYLISTIC.stylistic2].name}
                defaultValue={stylistic2.learningContent}
                onChangeBlur={handleLearningContentChange}
                items={stylisticItemMap[4]}
            />
            <ClickEditTableH2Card
                title="五、学习任务"
                className={styles.stylistic_h2}
                dataTitle={COURSE_DESIGN_STYLISTIC_MAP[COURSE_DESIGN_STYLISTIC.stylistic2].name}
                items={stylisticItemMap[5]}
                getColumns={getStudyTaskColumns}
                defaultValue={stylistic2.tasks}
                onChangeBlur={handleTasksChange}
                rowKey={getTaskRowKey}
            />
            <ClickEditInputH2Card
                title="六、教学实施建议"
                className={styles.stylistic_h2}
                dataTitle={COURSE_DESIGN_STYLISTIC_MAP[COURSE_DESIGN_STYLISTIC.stylistic2].name}
                defaultValue={stylistic2.teachingImplementationSuggestions}
                onChangeBlur={handleTeachingImplementationSuggestionsChange}
                items={stylisticItemMap[6]}
            />
            <ClickEditInputH2Card
                title="七、教学考核要求"
                className={styles.stylistic_h2}
                dataTitle={COURSE_DESIGN_STYLISTIC_MAP[COURSE_DESIGN_STYLISTIC.stylistic2].name}
                defaultValue={stylistic2.teachingAssessmentRequirements}
                onChangeBlur={handleTeachingAssessmentRequirementsChange}
                items={stylisticItemMap[7]}
            />
        </div>
    )
})

export default Stylistic2
