import { Button } from 'antd'
import styles from './index.module.less'
import { CheckCircleFilled, PlusOutlined, UpOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import { useState, useCallback, useEffect, useMemo } from 'react'
import { observer } from 'mobx-react'
import SortableList from '@/components/SortableList'
import React from 'react'
import { COURSE_DESIGN_LEARNING_TASK_TYPE } from '@/modules/course/const'
import type { IListBaseItem } from '@/modules/course/types/learning'
import type { SortableItemData } from '@/components/SortableList'
import { useCourseStore } from '@/modules/course/context'

// 扩展 IListBaseItem 使其兼容 SortableItemData
interface SortableTask extends IListBaseItem, SortableItemData {
    id: string
}

interface ICourseDesignAsideLearningProps {
    onItemChange?: () => void
}

const CourseDesignAsideLearning: React.FC<ICourseDesignAsideLearningProps> = observer(
    ({ onItemChange }) => {
        const courseStore = useCourseStore()

        const taskList = useMemo(() => courseStore.taskList, [courseStore.taskList])
        const activeListItem = useMemo(
            () => courseStore.activeListItem,
            [courseStore.activeListItem],
        )

        const activeTaskCode = useMemo(
            () => courseStore.activeTaskCode,
            [courseStore.activeTaskCode],
        )

        // 维护展开状态 - 默认只展开每一层的第一个项目
        const [collapsedTasks, setCollapsedTasks] = useState<Set<string>>(new Set())
        const [collapsedStages, setCollapsedStages] = useState<Set<string>>(new Set())

        // 初始化状态标记
        const [isTasksInitialized, setIsTasksInitialized] = useState(false)
        const [isStagesInitialized, setIsStagesInitialized] = useState(false)

        // 新增任务的 loading 状态
        const [addTaskLoading, setAddTaskLoading] = useState(false)

        // 强制展开任务的方法
        const forceExpandTask = useCallback(async () => {
            console.log('强制展开任务，当前任务列表长度:', taskList.length)

            if (taskList.length === 0) {
                console.log('任务列表为空，无法展开')
                return
            }

            const firstTask = taskList[0]
            console.log('开始展开第一个任务:', firstTask.name)

            try {
                // 确保第一个任务的阶段数据已加载
                await courseStore.loadTaskStages(firstTask.code)
                console.log('已加载第一个任务的阶段数据')

                // 直接设置展开状态：只展开第一个任务，其他任务收起
                const newCollapsedTasks = new Set<string>()
                taskList.forEach((task, index) => {
                    if (index > 0) {
                        newCollapsedTasks.add(task.code)
                    }
                })
                setCollapsedTasks(newCollapsedTasks)

                // 设置第一个任务下的阶段展开状态
                const stages = courseStore.stageMap[firstTask.code] || []
                const newCollapsedStages = new Set<string>()
                if (stages.length > 0) {
                    // 只展开第一个阶段，其他收起
                    stages.forEach((stage, index) => {
                        if (index > 0) {
                            newCollapsedStages.add(stage.code)
                        }
                    })

                    // 预加载第一个阶段的活动数据
                    const firstStage = stages[0]
                    if (firstStage && !courseStore.activityMap[firstStage.code]) {
                        try {
                            await courseStore.loadStageActivities(firstStage.code)
                            console.log('已加载第一个阶段的活动数据')
                        } catch (error) {
                            console.log('加载第一个阶段活动数据失败:', error)
                        }
                    }
                }
                setCollapsedStages(newCollapsedStages)

                // 标记为已初始化
                setIsTasksInitialized(true)
                setIsStagesInitialized(true)

                console.log('强制展开任务完成')
            } catch (error) {
                console.log('强制展开任务失败:', error)
                // 如果加载失败，至少重置状态让正常初始化逻辑接管
                setIsTasksInitialized(false)
                setIsStagesInitialized(false)
                setCollapsedTasks(new Set())
                setCollapsedStages(new Set())
            }
        }, [taskList, courseStore])

        // 将展开方法挂载到 store
        useEffect(() => {
            courseStore.setExpandTaskMethod(forceExpandTask)
        }, [courseStore, forceExpandTask])

        // 监听任务列表变化，处理新增任务的展开状态
        const [lastTaskListLength, setLastTaskListLength] = useState(0)

        useEffect(() => {
            // 如果任务数量增加，说明有新任务被添加
            if (taskList.length > lastTaskListLength && isTasksInitialized) {
                setCollapsedTasks(prev => {
                    const newSet = new Set(prev)
                    // 找到新增的任务并设为收起状态（除了第一个任务）
                    taskList.forEach((task, index) => {
                        if (task.code && index > 0 && !prev.has(task.code)) {
                            newSet.add(task.code)
                            console.log('新增任务设为收起状态:', task.name)
                        }
                    })
                    return newSet
                })
            }

            setLastTaskListLength(taskList.length)
        }, [taskList, lastTaskListLength, isTasksInitialized])

        // 优化的查找映射表，避免重复循环查找
        const { stageToTaskMap, activityToStageMap, stageById, activityById } = useMemo(() => {
            const stageToTask: Record<string, string> = {}
            const activityToStage: Record<string, { stageCode: string; taskCode: string }> = {}
            const stageMap: Record<string, IListBaseItem> = {}
            const activityMap: Record<string, IListBaseItem> = {}

            if (courseStore.stageMap) {
                for (const [taskCode, stages] of Object.entries(courseStore.stageMap)) {
                    if (Array.isArray(stages)) {
                        stages.forEach(stage => {
                            stageToTask[stage.code] = taskCode
                            stageMap[stage.code] = stage
                        })
                    }
                }
            }

            if (courseStore.activityMap) {
                for (const [stageCode, activities] of Object.entries(courseStore.activityMap)) {
                    if (Array.isArray(activities)) {
                        const taskCode = stageToTask[stageCode]
                        if (taskCode) {
                            activities.forEach(activity => {
                                activityToStage[activity.code] = { stageCode, taskCode }
                                activityMap[activity.code] = activity
                            })
                        }
                    }
                }
            }

            return {
                stageToTaskMap: stageToTask,
                activityToStageMap: activityToStage,
                stageById: stageMap,
                activityById: activityMap,
            }
        }, [courseStore.stageMap, courseStore.activityMap])

        // 初始化展开状态：考虑 activeListItem 的值
        useEffect(() => {
            if (
                taskList.length > 0 &&
                courseStore.stageMap &&
                Object.keys(courseStore.stageMap).length > 0 &&
                !isTasksInitialized &&
                !isStagesInitialized &&
                Object.keys(stageToTaskMap).length > 0
            ) {
                const taskCollapsed = new Set<string>()
                const stageCollapsed = new Set<string>()

                // 如果有 activeListItem，找到需要展开的层级
                let targetTaskCode: string | undefined
                let targetStageCode: string | undefined

                if (activeListItem) {
                    const { type, code } = activeListItem

                    if (type === COURSE_DESIGN_LEARNING_TASK_TYPE.task) {
                        targetTaskCode = code
                    } else if (type === COURSE_DESIGN_LEARNING_TASK_TYPE.stage) {
                        const parentInfo = stageToTaskMap[code]
                        if (parentInfo) {
                            targetTaskCode = parentInfo
                            targetStageCode = code
                        }
                    } else if (type === COURSE_DESIGN_LEARNING_TASK_TYPE.activity) {
                        const parentInfo = activityToStageMap[code]
                        if (parentInfo) {
                            targetTaskCode = parentInfo.taskCode
                            targetStageCode = parentInfo.stageCode
                        }
                    }
                }

                // 初始化任务折叠状态
                taskList.forEach((task, index) => {
                    if (targetTaskCode) {
                        // 如果有目标任务，展开目标任务，其他收起
                        if (task.code !== targetTaskCode) {
                            taskCollapsed.add(task.code)
                        }
                    } else {
                        // 如果没有目标任务，只展开第一个任务
                        if (index > 0) {
                            taskCollapsed.add(task.code)
                        }
                    }
                })

                // 初始化阶段折叠状态
                Object.values(courseStore.stageMap).forEach(stages => {
                    if (Array.isArray(stages)) {
                        stages.forEach((stage, index) => {
                            if (targetStageCode) {
                                // 如果有目标阶段，在对应任务下展开目标阶段，其他收起
                                const stageTaskCode = stageToTaskMap[stage.code]
                                if (stageTaskCode === targetTaskCode) {
                                    // 同一任务下：只展开目标阶段
                                    if (stage.code !== targetStageCode) {
                                        stageCollapsed.add(stage.code)
                                    }
                                } else {
                                    // 其他任务下：展开第一个阶段
                                    if (index > 0) {
                                        stageCollapsed.add(stage.code)
                                    }
                                }
                            } else {
                                // 如果没有目标阶段，每个任务只展开第一个阶段
                                if (index > 0) {
                                    stageCollapsed.add(stage.code)
                                }
                            }
                        })
                    }
                })

                setCollapsedTasks(taskCollapsed)
                setCollapsedStages(stageCollapsed)
                setIsTasksInitialized(true)
                setIsStagesInitialized(true)

                // 预加载展开的第一个阶段的活动数据
                const loadFirstStageActivities = async () => {
                    // 找到第一个展开的任务
                    const firstExpandedTask = taskList.find(task => !taskCollapsed.has(task.code))
                    if (firstExpandedTask) {
                        const stages = courseStore.stageMap[firstExpandedTask.code]
                        if (stages && stages.length > 0) {
                            // 找到第一个展开的阶段
                            const firstExpandedStage = stages.find(
                                stage => !stageCollapsed.has(stage.code),
                            )
                            if (
                                firstExpandedStage &&
                                !courseStore.activityMap[firstExpandedStage.code]
                            ) {
                                try {
                                    await courseStore.loadStageActivities(firstExpandedStage.code)
                                } catch (error) {
                                    console.log('预加载第一个阶段活动数据失败:', error)
                                }
                            }
                        }
                    }
                }

                // 异步执行，不阻塞初始化
                loadFirstStageActivities()
            }
        }, [
            taskList,
            courseStore.stageMap,
            courseStore.activityMap,
            courseStore.loadStageActivities,
            isTasksInitialized,
            isStagesInitialized,
            activeListItem,
            stageToTaskMap,
            activityToStageMap,
        ])

        // 当 activeListItem 变化时，确保相关的父级都展开
        useEffect(() => {
            if (!activeListItem || !courseStore.stageMap || !courseStore.activityMap) return

            const { type, code } = activeListItem

            if (type === COURSE_DESIGN_LEARNING_TASK_TYPE.activity) {
                // 如果选中的是活动，需要展开对应的任务和阶段
                const parentInfo = activityToStageMap[code]

                if (parentInfo) {
                    const { stageCode, taskCode } = parentInfo
                    setCollapsedTasks(prev => {
                        const newSet = new Set(prev)
                        newSet.delete(taskCode) // 展开父任务
                        return newSet
                    })
                    setCollapsedStages(prev => {
                        const newSet = new Set(prev)
                        newSet.delete(stageCode) // 展开父阶段
                        return newSet
                    })
                }
            } else if (type === COURSE_DESIGN_LEARNING_TASK_TYPE.stage) {
                // 如果选中的是阶段，需要展开对应的任务
                const parentTaskCode = stageToTaskMap[code]

                if (parentTaskCode) {
                    setCollapsedTasks(prev => {
                        const newSet = new Set(prev)
                        newSet.delete(parentTaskCode) // 展开父任务
                        return newSet
                    })
                }
            }
            // 如果选中的是任务，不需要额外处理，因为任务本身就是顶级
        }, [activeListItem, activityToStageMap, stageToTaskMap])

        // 转换数据为可排序格式
        const sortableTasks = useMemo<SortableTask[]>(
            () =>
                taskList.map(task => ({
                    ...task,
                    id: task.code, // 使用 code 作为 id
                })),
            [taskList],
        )

        const handleReorder = useCallback(
            async (newTasks: SortableTask[]) => {
                try {
                    await courseStore.updateTasksOrder(newTasks)
                } catch (error) {
                    console.log(error)
                }
            },
            [courseStore],
        )

        // 切换任务折叠状态（手风琴效果）
        const handleToggleCollapse = useCallback(
            async (taskCode: string) => {
                const isCurrentlyExpanded = !collapsedTasks.has(taskCode)

                // 如果要展开任务且该任务的阶段还没有加载，先加载阶段数据
                if (isCurrentlyExpanded) {
                    // 当前是展开的，要收起，不需要加载数据
                } else {
                    // 当前是收起的，要展开，检查是否需要加载阶段数据
                    if (!courseStore.stageMap[taskCode]) {
                        await courseStore.loadTaskStages(taskCode)
                    }
                }

                setCollapsedTasks(() => {
                    const newSet = new Set<string>()

                    // 手风琴效果：切换当前点击的任务状态，其他都收起
                    taskList.forEach(task => {
                        if (task.code === taskCode) {
                            // 切换当前任务：如果展开就收起，如果收起就展开
                            if (isCurrentlyExpanded) {
                                newSet.add(task.code) // 收起
                            }
                            // 如果当前是收起的，不加入set，即展开
                        } else {
                            // 其他任务都收起
                            newSet.add(task.code)
                        }
                    })
                    return newSet
                })

                // 如果是展开任务的操作，设置该任务下的阶段展开状态
                if (!isCurrentlyExpanded) {
                    // 展开任务时，确保只有第一个阶段是展开的
                    const stages = courseStore.stageMap[taskCode] || []
                    if (stages.length > 0) {
                        setCollapsedStages(prev => {
                            const newSet = new Set(prev)
                            // 将该任务下的所有阶段设为收起状态
                            stages.forEach((stage: IListBaseItem) => {
                                newSet.add(stage.code)
                            })
                            // 展开第一个阶段
                            newSet.delete(stages[0].code)
                            return newSet
                        })

                        // 预加载第一个阶段的活动数据
                        const firstStage = stages[0]
                        if (firstStage && !courseStore.activityMap[firstStage.code]) {
                            courseStore.loadStageActivities(firstStage.code).catch(error => {
                                console.log('加载第一个阶段活动数据失败:', error)
                            })
                        }
                    }
                }
            },
            [
                taskList,
                collapsedTasks,
                courseStore.stageMap,
                courseStore.loadTaskStages,
                courseStore.activityMap,
                courseStore.loadStageActivities,
            ],
        )

        // 切换阶段折叠状态（同一任务下的手风琴效果）
        const handleToggleStageCollapse = useCallback(
            async (stageCode: string) => {
                if (!courseStore.stageMap) return

                const isCurrentlyExpanded = !collapsedStages.has(stageCode)

                // 如果要展开阶段且该阶段的活动还没有加载，先加载活动数据
                if (isCurrentlyExpanded) {
                    // 当前是展开的，要收起，不需要加载数据
                } else {
                    // 当前是收起的，要展开，检查是否需要加载活动数据
                    if (!courseStore.activityMap[stageCode]) {
                        await courseStore.loadStageActivities(stageCode)
                    }
                }

                setCollapsedStages(prev => {
                    const newSet = new Set(prev)

                    // 使用优化的映射表快速找到当前阶段所属的任务
                    const parentTaskCode = stageToTaskMap[stageCode]

                    if (parentTaskCode) {
                        const taskStages = courseStore.stageMap[parentTaskCode] || []

                        // 手风琴效果：在同一任务下，切换当前点击的阶段状态，其他都收起
                        taskStages.forEach(stage => {
                            if (stage.code === stageCode) {
                                // 切换当前阶段：如果展开就收起，如果收起就展开
                                if (isCurrentlyExpanded) {
                                    newSet.add(stage.code) // 收起
                                } else {
                                    newSet.delete(stage.code) // 展开
                                }
                            } else {
                                // 同一任务下的其他阶段都收起
                                newSet.add(stage.code)
                            }
                        })
                    }

                    return newSet
                })
            },
            [
                courseStore.stageMap,
                courseStore.activityMap,
                courseStore.loadStageActivities,
                stageToTaskMap,
                collapsedStages,
            ],
        )

        // 判断任务是否展开
        const isTaskExpanded = useCallback(
            (taskCode: string) => {
                return !collapsedTasks.has(taskCode)
            },
            [collapsedTasks],
        )

        // 判断阶段是否展开
        const isStageExpanded = useCallback(
            (stageCode: string) => {
                return !collapsedStages.has(stageCode)
            },
            [collapsedStages],
        )

        // 处理任务点击
        const handleTaskClick = useCallback(
            async (taskCode: string) => {
                const isExpanded = isTaskExpanded(taskCode)
                const task = taskList.find(t => t.code === taskCode)

                if (task) {
                    await courseStore.setActiveListItem(task, COURSE_DESIGN_LEARNING_TASK_TYPE.task)
                    onItemChange?.()
                    // setActiveListItem 内部已经会调用 loadTaskStages，无需重复调用
                }

                // 如果当前任务处于展开状态，只选中不改变展开状态
                if (isExpanded) {
                    return
                }

                // 如果是收起状态，则展开
                await handleToggleCollapse(taskCode)
            },
            [taskList, courseStore, handleToggleCollapse, isTaskExpanded, onItemChange],
        )

        // 处理阶段点击
        const handleStageClick = useCallback(
            async (stageCode: string) => {
                const isExpanded = isStageExpanded(stageCode)

                // 使用优化的映射表快速查找阶段信息
                const stage = stageById[stageCode]

                if (stage) {
                    // 选中该阶段
                    await courseStore.setActiveListItem(
                        stage,
                        COURSE_DESIGN_LEARNING_TASK_TYPE.stage,
                    )
                    onItemChange?.()
                    // setActiveListItem 内部已经会调用 loadStageActivities，无需重复调用
                }

                // 如果当前阶段处于展开状态，只选中不改变展开状态
                if (isExpanded) {
                    return
                }

                // 如果是收起状态，则展开
                await handleToggleStageCollapse(stageCode)
            },
            [courseStore, handleToggleStageCollapse, isStageExpanded, stageById, onItemChange],
        )

        // 处理活动点击
        const handleActivityClick = useCallback(
            (activityCode: string) => {
                // 如果当前已经是选中的活动，则不做任何处理
                const isCurrentlyActive =
                    activeListItem?.type === COURSE_DESIGN_LEARNING_TASK_TYPE.activity &&
                    activeListItem.code === activityCode
                if (isCurrentlyActive) {
                    return
                }

                // 使用优化的映射表快速查找活动信息
                const activity = activityById[activityCode]

                if (activity) {
                    courseStore.setActiveListItem(
                        activity,
                        COURSE_DESIGN_LEARNING_TASK_TYPE.activity,
                    )
                    onItemChange?.()
                }
            },
            [courseStore, activeListItem, activityById, onItemChange],
        )

        const isCompleted = useCallback((item: IListBaseItem) => {
            return item.finishStatus === 1
        }, [])

        const handleAddTask = useCallback(async () => {
            setAddTaskLoading(true)
            try {
                const maxSort = taskList.reduce((max, task) => Math.max(max, task.sort), 0)

                const newTask = {
                    name: `任务 ${taskList.length + 1}`,
                    sort: maxSort + 1,
                    learningStages: [],
                }
                await courseStore.addTask(newTask)
            } catch (error) {
                console.error('添加任务失败:', error)
            } finally {
                setAddTaskLoading(false)
            }
        }, [taskList.length, courseStore])

        // 仅处理任务展开/收起（跳过选中状态限制）
        const handleTaskToggleOnly = useCallback(
            (taskCode: string, e: React.MouseEvent) => {
                e.stopPropagation()
                handleToggleCollapse(taskCode)
            },
            [handleToggleCollapse],
        )

        // 仅处理阶段展开/收起（跳过选中状态限制）
        const handleStageToggleOnly = useCallback(
            (stageCode: string, e: React.MouseEvent) => {
                e.stopPropagation()
                handleToggleStageCollapse(stageCode)
            },
            [handleToggleStageCollapse],
        )

        // 渲染活动
        const renderActivity = useCallback(
            (activity: IListBaseItem) => {
                const isActive =
                    activeListItem?.type === COURSE_DESIGN_LEARNING_TASK_TYPE.activity &&
                    activeListItem.code === activity.code
                const completed = isCompleted(activity)
                return (
                    <div key={activity.code} className={styles.menu_item_third}>
                        <div
                            className={classNames(styles.third_header, {
                                [styles.active]: isActive,
                            })}
                            onClick={() => handleActivityClick(activity.code)}
                        >
                            <div className={styles.third_left}>
                                {completed ? (
                                    <CheckCircleFilled
                                        className={styles.third_status}
                                        style={{
                                            color: '#52C41A',
                                            fontSize: '1em',
                                        }}
                                    />
                                ) : (
                                    <svg
                                        className={classNames('icon', styles.third_status)}
                                        aria-hidden="true"
                                    >
                                        <use xlinkHref={`#weiwancheng`} />
                                    </svg>
                                )}
                                <div className={styles.third_text}>{activity.name}</div>
                            </div>
                        </div>
                    </div>
                )
            },
            [activeListItem, handleActivityClick, isCompleted],
        )

        // 渲染阶段
        const renderStage = useCallback(
            (stage: IListBaseItem) => {
                const isActive =
                    activeListItem?.type === COURSE_DESIGN_LEARNING_TASK_TYPE.stage &&
                    activeListItem.code === stage.code
                const isExpanded = isStageExpanded(stage.code)
                const completed = isCompleted(stage)
                // 获取该阶段的活动列表
                const stageActivities = courseStore.activityMap[stage.code] || []

                const showUpIcon = !!(stage.childrenNum && stage.childrenNum > 0)

                return (
                    <div key={stage.code} className={styles.menu_item_sub}>
                        <div
                            className={classNames(styles.sub_header, { [styles.active]: isActive })}
                            onClick={() => handleStageClick(stage.code)}
                        >
                            <div className={styles.sub_left}>
                                {completed ? (
                                    <CheckCircleFilled
                                        className={styles.sub_status}
                                        style={{
                                            color: '#52C41A',
                                            fontSize: '1em',
                                        }}
                                    />
                                ) : (
                                    <svg
                                        className={classNames('icon', styles.sub_status)}
                                        aria-hidden="true"
                                    >
                                        <use xlinkHref={`#weiwancheng`} />
                                    </svg>
                                )}
                                <div className={styles.sub_text}>{stage.name}</div>
                            </div>
                            <div className={styles.sub_right}>
                                <UpOutlined
                                    style={{
                                        color: 'rgba(0,0,0,0.45)',
                                        fontSize: 16,
                                        transform: isExpanded ? 'rotate(0deg)' : 'rotate(180deg)',
                                        transition: 'transform 0.2s ease',
                                        cursor: 'pointer',
                                        opacity: showUpIcon ? 1 : 0,
                                        pointerEvents: showUpIcon ? 'auto' : 'none',
                                    }}
                                    onClick={e => handleStageToggleOnly(stage.code, e)}
                                />
                            </div>
                        </div>
                        {stageActivities.length > 0 && (
                            <div
                                className={styles.sub_content}
                                style={{ display: isExpanded ? 'flex' : 'none' }}
                            >
                                {stageActivities.map(activity => renderActivity(activity))}
                            </div>
                        )}
                    </div>
                )
            },
            [
                activeListItem,
                handleStageClick,
                isStageExpanded,
                courseStore.activityMap,
                renderActivity,
                isCompleted,
                handleStageToggleOnly,
            ],
        )

        const renderTaskItem = useCallback(
            (task: SortableTask, dragHandleProps: any) => {
                const isActive =
                    activeListItem?.type === COURSE_DESIGN_LEARNING_TASK_TYPE.task &&
                    activeListItem.code === task.code
                const isExpanded = isTaskExpanded(task.code)
                const completed = isCompleted(task)
                // 获取该任务的阶段列表
                const taskStages = courseStore.stageMap[task.code] || []

                const isActiveTask = activeTaskCode === task.code

                const showUpIcon = !!(task.childrenNum && task.childrenNum > 0)

                return (
                    <div className={styles.menu_item}>
                        <div
                            className={classNames(styles.menu_item_header, {
                                [styles.active]: isActive,
                                [styles.active_task]: isActiveTask,
                            })}
                            onClick={() => handleTaskClick(task.code)}
                        >
                            <div className={styles.menu_item_left}>
                                <div
                                    {...dragHandleProps}
                                    className={styles.menu_item_sort_wrapper}
                                    onClick={e => e.stopPropagation()}
                                >
                                    <svg
                                        className={classNames('icon', styles.menu_item_sort)}
                                        aria-hidden="true"
                                    >
                                        <use xlinkHref={`#tuodong`} />
                                    </svg>
                                </div>

                                {completed ? (
                                    <CheckCircleFilled
                                        className={styles.menu_item_status}
                                        style={{
                                            color: '#52C41A',
                                            fontSize: '1em',
                                        }}
                                    />
                                ) : (
                                    <svg
                                        className={classNames('icon', styles.menu_item_status)}
                                        aria-hidden="true"
                                    >
                                        <use xlinkHref={`#weiwancheng`} />
                                    </svg>
                                )}
                                <div className={styles.menu_item_text}>{task.name}</div>
                            </div>
                            <div className={styles.menu_item_right}>
                                <UpOutlined
                                    style={{
                                        color: 'rgba(0,0,0,0.45)',
                                        fontSize: 16,
                                        transform: isExpanded ? 'rotate(0deg)' : 'rotate(180deg)',
                                        transition: 'transform 0.2s ease',
                                        cursor: 'pointer',
                                        opacity: showUpIcon ? 1 : 0,
                                        pointerEvents: showUpIcon ? 'auto' : 'none',
                                    }}
                                    onClick={e => handleTaskToggleOnly(task.code, e)}
                                />
                            </div>
                        </div>
                        <div
                            className={styles.menu_item_content}
                            style={{ display: isExpanded ? 'flex' : 'none' }}
                        >
                            {taskStages.map(stage => renderStage(stage))}
                        </div>
                    </div>
                )
            },
            [
                activeListItem,
                handleTaskClick,
                isTaskExpanded,
                courseStore.stageMap,
                renderStage,
                isCompleted,
                handleTaskToggleOnly,
                activeTaskCode,
            ],
        )

        return (
            <div className={styles.course_design_aside_learning}>
                <div className={styles.menu_header}>
                    <div className={styles.menu_header_title}>学习任务({taskList.length})</div>
                    <Button
                        type="link"
                        size="small"
                        onClick={handleAddTask}
                        loading={addTaskLoading}
                        icon={<PlusOutlined />}
                    >
                        新建
                    </Button>
                </div>

                <div className={styles.menu_list}>
                    <SortableList
                        items={sortableTasks}
                        onReorder={handleReorder}
                        renderItem={renderTaskItem}
                        className={styles.sortable_list}
                        itemClassName={styles.sortable_item}
                    />
                </div>
            </div>
        )
    },
)

export default CourseDesignAsideLearning
