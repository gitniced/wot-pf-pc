import React, { useCallback, useEffect, useMemo, useState } from 'react'
import ClickEditInputH2Card from '@/modules/course/components/ClickEditInputH2Card'
import styles from './index.module.less'
import { useCourseStore } from '@/modules/course/context'
import { observer } from 'mobx-react'
import ClickEditItemListH2Card from '@/modules/course/components/ClickEditItemListH2Card'
import { Modal } from 'antd'
import { taskItemsMap } from './const'

interface ICourseDesignLearningTaskProps {
    activeTitle: string
    taskCode: string
}

const CourseDesignLearningTask: React.FC<ICourseDesignLearningTaskProps> = observer(
    ({ activeTitle, taskCode }) => {
        const [stageKey, setStageKey] = useState(Date.now() + Math.random())
        const courseStore = useCourseStore()

        const taskDetail = useMemo(
            () => courseStore.taskDetailMap[taskCode],
            [courseStore.taskDetailMap, taskCode],
        )

        useEffect(() => {
            if (courseStore.isHydrated && !taskDetail) {
                courseStore.loadTaskDetail(taskCode)
            }
        }, [taskCode, taskDetail, courseStore.isHydrated])

        const handleDeleteConfirm = async (): Promise<boolean> => {
            return new Promise(resolve => {
                Modal.confirm({
                    content:
                        '删除学习环节将一并删除学习环节下的学习步骤、学习活动信息，删除后无法找回。是否确定删除？',
                    okText: '确定',
                    cancelText: '取消',
                    onOk: () => {
                        resolve(true)
                    },
                    onCancel: () => {
                        resolve(false)
                    },
                })
            })
        }

        const handleScenarioChange = useCallback(
            async (value: string) => {
                return courseStore.saveTask(taskCode, {
                    scenario: value,
                })
            },
            [taskCode, courseStore],
        )

        const handleMaterialsChange = useCallback(
            (value: string) => {
                return courseStore.saveTask(taskCode, {
                    materials: value,
                })
            },
            [taskCode, courseStore],
        )

        const handleRequirementsChange = useCallback(
            (value: string) => {
                return courseStore.saveTask(taskCode, {
                    requirements: value,
                })
            },
            [taskCode, courseStore],
        )

        const handleLearningStagesChange = useCallback(
            async (value: any) => {
                const res = await courseStore.saveTask(taskCode, {
                    learningStages: value,
                })

                if (res) {
                    courseStore.loadTaskStages(taskCode)
                    courseStore.loadTaskDetail(taskCode).then(() => {
                        setStageKey(Date.now() + Math.random())
                    })
                }

                return res
            },
            [taskCode, courseStore],
        )

        return (
            <div className={styles.content_main_form}>
                <ClickEditInputH2Card
                    title="任务情景"
                    dataTitle={activeTitle}
                    defaultValue={taskDetail?.scenario}
                    onChangeBlur={handleScenarioChange}
                    items={taskItemsMap.scenario}
                />
                <ClickEditInputH2Card
                    title="任务资料"
                    dataTitle={activeTitle}
                    defaultValue={taskDetail?.materials}
                    onChangeBlur={handleMaterialsChange}
                    items={taskItemsMap.materials}
                />
                <ClickEditInputH2Card
                    title="任务要求"
                    dataTitle={activeTitle}
                    defaultValue={taskDetail?.requirements}
                    onChangeBlur={handleRequirementsChange}
                    items={taskItemsMap.requirements}
                />
                <ClickEditItemListH2Card
                    key={stageKey}
                    hideAI
                    title="学习环节"
                    dataTitle={activeTitle}
                    defaultValue={taskDetail?.learningStages}
                    onDeleteConfirm={handleDeleteConfirm}
                    onChangeBlur={handleLearningStagesChange}
                    items={taskItemsMap.learningStages}
                />
            </div>
        )
    },
)

export default CourseDesignLearningTask
