import ClickEditMultiInputH2Card from '../../components/ClickEditMultiInputH2Card'
import ClickEditInputH3Card from '../../components/ClickEditInputH3Card'
import ClickEditMultiInputH3Card from '../../components/ClickEditMultiInputH3Card'
import ClickEditTableH3Card from '../../components/ClickEditTableH3Card'
import {
    getLearningTaskAnalysisColumns,
    getSchoolTransformationColumns,
    stylisticItemMap,
} from './const'
import styles from './index.module.less'
import ClickEditTableH2Card from '../../components/ClickEditTableH2Card'
import { useCourseStore } from '../../context'
import { observer } from 'mobx-react'
import { useCallback, useEffect, useMemo } from 'react'
import { COURSE_DESIGN_STYLISTIC, COURSE_DESIGN_STYLISTIC_MAP } from '../../const'

const Stylistic1: React.FC = observer(() => {
    const courseStore = useCourseStore()

    useEffect(() => {
        courseStore.loadStylistic1()
    }, [courseStore])

    const stylistic1 = useMemo(() => {
        return courseStore.stylistic1
    }, [courseStore.stylistic1])

    const handleCoursePositionChange = useCallback(
        (value: Record<string, string | undefined>) => {
            return courseStore.saveStylistic1(value)
        },
        [courseStore],
    )

    const handleTaskAnalysisChange = useCallback(
        (updatedTasks: any) => {
            return courseStore.saveStylistic1({
                taskAnalysis: updatedTasks,
            })
        },
        [courseStore],
    )

    const handleCourseObjectivesChange = useCallback(
        (value: string) => {
            return courseStore.saveStylistic1({
                courseObjectivesAndContentAnalysis: value,
            })
        },
        [courseStore],
    )

    const handleTeachingImplementationChange = useCallback(
        (value: string) => {
            return courseStore.saveStylistic1({
                teachingImplementationAndAssessmentAnalysis: value,
            })
        },
        [courseStore],
    )

    const handleTeachingConditionChange = useCallback(
        (value: Record<string, string | undefined>) => {
            return courseStore.saveStylistic1(value)
        },
        [courseStore],
    )

    const handleConversionSuggestionsChange = useCallback(
        (updatedSuggestions: any) => {
            return courseStore.saveStylistic1({
                conversionSuggestions: updatedSuggestions,
            })
        },
        [courseStore],
    )

    const getTaskRowKey = useCallback(
        (record: any) => `task-${record.serialnumber || record.countryTaskName || 'unknown'}`,
        [],
    )

    const getSuggestionRowKey = useCallback(
        (record: any) => `suggestion-${record.serialnumber || record.conversionName || 'unknown'}`,
        [],
    )

    const handTaskAnalysisTransformValue = useCallback((value: any, setValue: any, prev: any) => {
        const currentList = JSON.parse(JSON.stringify(value?.taskAnalysis || []))
        const prevList = prev?.[0]?.value || []

        currentList.forEach((item: any, index: number) => {
            const prevItem = prevList[index]
            if (prevItem) {
                item.schoolTaskName = prevItem.schoolTaskName
                item.schoolTaskHours = prevItem.schoolTaskHours
                item.schoolTaskDescription = prevItem.schoolTaskDescription
            }
        })

        setValue?.([
            {
                ...stylisticItemMap[2],
                value: currentList,
            },
        ])
    }, [])

    return (
        <div className={styles.stylistic}>
            <div className={styles.stylistic_h2}>
                <div className={styles.stylistic_item_title}>一、工学一体化课程标准</div>
                <div className={styles.stylistic_item_content}>
                    <ClickEditMultiInputH3Card
                        title="1.课程定位分析"
                        dataTitle="一、工学一体化课程标准"
                        items={stylisticItemMap[1]}
                        defaultValue={{
                            courseSource: stylistic1.courseSource,
                            sequentialCourses: stylistic1.sequentialCourses,
                            relatedCourses: stylistic1.relatedCourses,
                            workScope: stylistic1.workScope,
                            learningValue: stylistic1.learningValue,
                        }}
                        onChangeBlur={handleCoursePositionChange}
                    />
                    <ClickEditTableH3Card
                        title="2.参考性学习任务分析"
                        description="分析参考性学习任务名称、任务描述、学时、学习任务特征之间关系等，明确实施条件及学习任务转化思路。"
                        dataTitle="一、工学一体化课程标准"
                        items={stylisticItemMap[2]}
                        getColumns={getLearningTaskAnalysisColumns}
                        defaultValue={stylistic1.taskAnalysis}
                        onChangeBlur={handleTaskAnalysisChange}
                        rowKey={getTaskRowKey}
                        transformValue={handTaskAnalysisTransformValue}
                    />
                    <ClickEditInputH3Card
                        title="3.课程目标与学习内容分析"
                        description="分析课程目标与学习内容，明确对学生的能力要求及学习的理论知识、实践知识、职业素养、实施条件、考核要点等。"
                        dataTitle="一、工学一体化课程标准"
                        items={stylisticItemMap[3]}
                        defaultValue={stylistic1.courseObjectivesAndContentAnalysis}
                        onChangeBlur={handleCourseObjectivesChange}
                    />
                    <ClickEditInputH3Card
                        title="4.教学实施建议及考核要求分析"
                        description="分析教学实施建议及考核要求，明确师资要求、场地配置、工具材料及教学资料，明确考核方式及过程性、终结性考核要求。"
                        dataTitle="一、工学一体化课程标准"
                        items={stylisticItemMap[4]}
                        defaultValue={stylistic1.teachingImplementationAndAssessmentAnalysis}
                        onChangeBlur={handleTeachingImplementationChange}
                    />
                </div>
            </div>

            <ClickEditMultiInputH2Card
                title="二、教学条件分析"
                className={styles.stylistic_h2}
                dataTitle={COURSE_DESIGN_STYLISTIC_MAP[COURSE_DESIGN_STYLISTIC.stylistic1].name}
                items={stylisticItemMap[5]}
                defaultValue={{
                    regionalIndustryCharacteristicsAnalysis:
                        stylistic1.regionalIndustryCharacteristicsAnalysis,
                    schoolCharacteristicsAnalysis: stylistic1.schoolCharacteristicsAnalysis,
                    studentBasisAnalysis: stylistic1.studentBasisAnalysis,
                    schoolSoftwareHardwareAnalysis: stylistic1.schoolSoftwareHardwareAnalysis,
                }}
                onChangeBlur={handleTeachingConditionChange}
            />

            <ClickEditTableH2Card
                title="三、工学一体化课程标准校本转化建议"
                className={styles.stylistic_h2}
                dataTitle={COURSE_DESIGN_STYLISTIC_MAP[COURSE_DESIGN_STYLISTIC.stylistic1].name}
                items={stylisticItemMap[6]}
                getColumns={getSchoolTransformationColumns}
                defaultValue={stylistic1.conversionSuggestions}
                onChangeBlur={handleConversionSuggestionsChange}
                rowKey={getSuggestionRowKey}
            />
        </div>
    )
})

export default Stylistic1
