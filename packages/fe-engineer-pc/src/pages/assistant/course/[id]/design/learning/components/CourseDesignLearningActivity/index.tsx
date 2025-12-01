import React, { useCallback, useEffect, useMemo, useState } from 'react'
import ClickEditInputH2Card from '@/modules/course/components/ClickEditInputH2Card'
import ClickEditItemQuestionH2Card from '@/modules/course/components/ClickEditItemQuestionH2Card'
import ClickEditItemResourceH2Card from '@/modules/course/components/ClickEditItemResourceH2Card'
import ClickEditItemListOutcomeH2Card from '@/modules/course/components/ClickEditItemListOutcomeH2Card'
import ClickEditItemListHomeworkH2Card from '@/modules/course/components/ClickEditItemListHomeworkH2Card'
import { observer } from 'mobx-react'
import { useCourseStore } from '@/modules/course/context'
import styles from './index.module.less'
import ClickEditItemListKnowledgePointH2Card from '@/modules/course/components/ClickEditItemListKnowledgePointH2Card'
import { activityItemsMap } from './const'

interface ICourseDesignLearningActivityProps {
    activeTitle: string
    activityCode: string
}

const CourseDesignLearningActivity: React.FC<ICourseDesignLearningActivityProps> = observer(
    ({ activeTitle, activityCode }) => {
        const [knowledgePointsRefreshKey, setKnowledgePointsRefreshKey] = useState(undefined)
        const [questionsRefreshKey, setQuestionsRefreshKey] = useState(undefined)
        const [learningResourcesRefreshKey, setLearningResourcesRefreshKey] = useState(undefined)
        const [learningOutcomesRefreshKey, setLearningOutcomesRefreshKey] = useState(undefined)
        const [homeworksRefreshKey, setHomeworksRefreshKey] = useState(undefined)

        const courseStore = useCourseStore()

        const activityDetail = useMemo(
            () => courseStore.activityDetailMap[activityCode],
            [courseStore.activityDetailMap, activityCode],
        )
        useEffect(() => {
            if (courseStore.isHydrated && !activityDetail) {
                courseStore.loadActivityDetail(activityCode)
            }
        }, [activityCode, activityDetail, courseStore.isHydrated])

        const handleSaveAndRefresh = useCallback(
            async (value: Parameters<typeof courseStore.saveActivity>[1], forceRefresh = false) => {
                const res = await courseStore.saveActivity(activityCode, value, forceRefresh)

                if (res) {
                    await courseStore.loadActivityDetail(activityCode)
                    const fieldKey = Object.keys(value)[0]
                    const newRefreshKey = String(Date.now() + Math.random())

                    switch (fieldKey) {
                        case 'knowledgePoints':
                            setKnowledgePointsRefreshKey(newRefreshKey)
                            break
                        case 'questions':
                            setQuestionsRefreshKey(newRefreshKey)
                            break
                        case 'learningResources':
                            setLearningResourcesRefreshKey(newRefreshKey)
                            break
                        case 'learningOutcomes':
                            setLearningOutcomesRefreshKey(newRefreshKey)
                            break
                        case 'homeworks':
                            setHomeworksRefreshKey(newRefreshKey)
                            break
                    }
                }

                return res
            },
            [activityCode, courseStore],
        )

        const handleContentChange = useCallback(
            (value: string) => {
                return courseStore.saveActivity(activityCode, {
                    content: value,
                })
            },
            [activityCode, courseStore],
        )

        const handleKnowledgePointsChange = useCallback(
            async (value: any) => {
                return handleSaveAndRefresh({
                    knowledgePoints: value,
                })
            },
            [handleSaveAndRefresh],
        )

        const handleQuestionsChange = useCallback(
            (value: any, forceRefresh = false) => {
                return handleSaveAndRefresh(
                    {
                        questions: value,
                    },
                    forceRefresh,
                )
            },
            [handleSaveAndRefresh],
        )

        const handleLearningResourcesChange = useCallback(
            (value: any) => {
                return handleSaveAndRefresh({
                    learningResources: value,
                })
            },
            [handleSaveAndRefresh],
        )

        const handleLearningOutcomesChange = useCallback(
            (value: any) => {
                return handleSaveAndRefresh({
                    learningOutcomes: value,
                })
            },
            [handleSaveAndRefresh],
        )

        const handleHomeworksChange = useCallback(
            (value: any) => {
                return handleSaveAndRefresh({
                    homeworks: value,
                })
            },
            [handleSaveAndRefresh],
        )

        return (
            <div className={styles.content_main_form}>
                <ClickEditInputH2Card
                    title="学习内容"
                    dataTitle={activeTitle}
                    defaultValue={activityDetail?.content}
                    onChangeBlur={handleContentChange}
                    items={activityItemsMap.content}
                />
                <ClickEditItemListKnowledgePointH2Card
                    title="知识点"
                    dataTitle={activeTitle}
                    defaultValue={activityDetail?.knowledgePoints}
                    refreshKey={knowledgePointsRefreshKey}
                    onChangeBlur={handleKnowledgePointsChange}
                    items={activityItemsMap.knowledgePoints}
                />
                <ClickEditItemQuestionH2Card
                    title="随堂测验"
                    dataTitle={activeTitle}
                    defaultValue={activityDetail?.questions}
                    refreshKey={questionsRefreshKey}
                    onChangeBlur={handleQuestionsChange}
                    items={activityItemsMap.questions}
                    activityCode={activityCode}
                />
                <ClickEditItemResourceH2Card
                    title="学习资源"
                    dataTitle={activeTitle}
                    defaultValue={activityDetail?.learningResources}
                    refreshKey={learningResourcesRefreshKey}
                    onChangeBlur={handleLearningResourcesChange}
                    items={activityItemsMap.learningResources}
                    courseCode={courseStore.courseCode}
                />
                <ClickEditItemListOutcomeH2Card
                    title="学习成果"
                    dataTitle={activeTitle}
                    defaultValue={activityDetail?.learningOutcomes}
                    refreshKey={learningOutcomesRefreshKey}
                    onChangeBlur={handleLearningOutcomesChange}
                    items={activityItemsMap.learningOutcomes}
                    majorCode={courseStore.course.majorCode}
                    uniqueId={activityCode}
                />
                <ClickEditItemListHomeworkH2Card
                    title="课后作业"
                    dataTitle={activeTitle}
                    defaultValue={activityDetail?.homeworks}
                    refreshKey={homeworksRefreshKey}
                    onChangeBlur={handleHomeworksChange}
                    items={activityItemsMap.homeworks}
                    majorCode={courseStore.course.majorCode}
                    uniqueId={activityCode}
                />
            </div>
        )
    },
)

export default React.memo(CourseDesignLearningActivity)
