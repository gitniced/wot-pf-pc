import React, { useCallback, useEffect, useMemo, useState } from 'react'
import ClickEditInputH2Card from '@/modules/course/components/ClickEditInputH2Card'
import ClickEditInputNumberH2Card from '@/modules/course/components/ClickEditInputNumberH2Card'
import ClickEditItemPathH2Card from '@/modules/course/components/ClickEditItemPathH2Card'
import { observer } from 'mobx-react'
import { useCourseStore } from '@/modules/course/context'
import styles from './index.module.less'
import { stageItemsMap } from './const'

interface ICourseDesignLearningStageProps {
    activeTitle: string
    stageCode: string
}

const CourseDesignLearningStage: React.FC<ICourseDesignLearningStageProps> = observer(
    ({ activeTitle, stageCode }) => {
        const [stepKey, setStepKey] = useState(Date.now() + Math.random())
        const courseStore = useCourseStore()

        const stageDetail = useMemo(
            () => courseStore.stageDetailMap[stageCode],
            [courseStore.stageDetailMap, stageCode],
        )

        useEffect(() => {
            if (courseStore.isHydrated && !stageDetail) {
                courseStore.loadStageDetail(stageCode)
            }
        }, [stageCode, stageDetail, courseStore.isHydrated])

        const handleLearningGoalChange = useCallback(
            (value: string) => {
                return courseStore.saveStage(stageCode, {
                    learningGoal: value,
                })
            },
            [courseStore, stageCode],
        )

        const handlePeriodChange = useCallback(
            (value: number) => {
                return courseStore.saveStage(stageCode, {
                    period: value,
                })
            },
            [courseStore, stageCode],
        )

        const handleLearningStepsChange = useCallback(
            async (value: any) => {
                let globalSort = 1
                const sortedValue =
                    value?.map((step: any) => ({
                        ...step,
                        learningActivities:
                            step.learningActivities?.map((activity: any) => ({
                                ...activity,
                                sort: globalSort++,
                            })) || [],
                    })) || []

                const res = await courseStore.saveStage(stageCode, {
                    learningSteps: sortedValue,
                })

                if (res) {
                    courseStore.loadStageActivities(stageCode)
                    courseStore.loadStageDetail(stageCode).then(() => {
                        setStepKey(Date.now() + Math.random())
                    })
                }

                return res
            },
            [courseStore, stageCode],
        )

        return (
            <div className={styles.content_main_form}>
                <ClickEditInputH2Card
                    title="学习目标"
                    dataTitle={activeTitle}
                    defaultValue={stageDetail?.learningGoal}
                    onChangeBlur={handleLearningGoalChange}
                    items={stageItemsMap.learningGoal}
                />
                <ClickEditInputNumberH2Card
                    title="学时"
                    dataTitle={activeTitle}
                    defaultValue={stageDetail?.period || 0}
                    onChangeBlur={handlePeriodChange}
                    items={stageItemsMap.period}
                />
                <ClickEditItemPathH2Card
                    key={stepKey}
                    title="学习路径"
                    dataTitle={activeTitle}
                    defaultValue={stageDetail?.learningSteps}
                    onChangeBlur={handleLearningStepsChange}
                    items={stageItemsMap.learningSteps}
                />
            </div>
        )
    },
)

export default CourseDesignLearningStage
