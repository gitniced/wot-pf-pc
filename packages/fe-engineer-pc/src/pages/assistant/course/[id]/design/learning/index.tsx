import styles from './index.module.less'
import { useLocation, history } from 'umi'
import {
    COURSE_DESIGN_LEARNING_TASK_TYPE,
    COURSE_DESIGN_STEP,
    COURSE_DESIGN_STEP_LABEL,
    COURSE_DESIGN_STEP_MAP_STYLISTIC,
    COURSE_DESIGN_STYLISTIC,
} from '@/modules/course/const'
import { useState, useMemo, useEffect, useRef } from 'react'
import { Tabs } from 'antd'
import CourseDesignAside from '@/pages/assistant/components/CourseDesignAside'
import CourseDesignTitle from '@/pages/assistant/components/CourseDesignTitle'
import CourseDesignAsideLearning from '@/pages/assistant/components/CourseDesignAsideLearning'
import CourseDesignLearningTask from './components/CourseDesignLearningTask'
import CourseDesignLearningStage from './components/CourseDesignLearningStage'
import CourseDesignLearningActivity from './components/CourseDesignLearningActivity'
import { useCourseStore } from '@/modules/course/context'
import { observer } from 'mobx-react'
import type { IListBaseItem } from '@/modules/course/types/learning'
import { CheckCircleFilled } from '@ant-design/icons'

type StylisticKey =
    (typeof COURSE_DESIGN_STEP_MAP_STYLISTIC)[COURSE_DESIGN_STEP.learning][number]['key']

const CourseDesignLearning: React.FC = observer(() => {
    const { search, pathname } = useLocation()
    let initStylistic = new URLSearchParams(search).get(
        'stylistic',
    ) as unknown as StylisticKey | null
    initStylistic = initStylistic ? Number(initStylistic) : null

    const [activeKey, setActiveKey] = useState<StylisticKey | null>(initStylistic)
    const contentMainRef = useRef<HTMLDivElement>(null)

    // 滚动到顶部的函数
    const scrollToTop = () => {
        if (contentMainRef.current) {
            contentMainRef.current.scrollTo({
                top: 0,
                behavior: 'smooth',
            })
        }
    }
    const stylisticList = useMemo(
        () => COURSE_DESIGN_STEP_MAP_STYLISTIC[COURSE_DESIGN_STEP.learning],
        [],
    )
    const stylistic = useMemo(
        () => (activeKey === null ? null : stylisticList.find(item => item.key === activeKey)),
        [activeKey, stylisticList],
    )

    const courseStore = useCourseStore()

    const activeListItem = useMemo(() => courseStore.activeListItem, [courseStore.activeListItem])

    useEffect(() => {
        if (courseStore.isHydrated) {
            courseStore.loadLearning()
        }
    }, [courseStore.isHydrated])

    useEffect(() => {
        courseStore.setParentSetActiveKey(setActiveKey)
    }, [courseStore, setActiveKey])

    const activeTitle = useMemo(() => {
        if (stylistic === null) {
            return activeListItem?.name ?? COURSE_DESIGN_STEP_LABEL[COURSE_DESIGN_STEP.learning]
        }
        return stylistic?.name ?? '未知命名'
    }, [activeListItem?.name, stylistic?.name, stylistic])

    const taskList = useMemo(() => courseStore.taskList, [courseStore.taskList])

    const showTitleTabs = useMemo(() => {
        return (
            stylistic &&
            [
                COURSE_DESIGN_STYLISTIC.stylistic6,
                COURSE_DESIGN_STYLISTIC.stylistic9,
                COURSE_DESIGN_STYLISTIC.stylistic10,
            ].includes(stylistic?.key as COURSE_DESIGN_STYLISTIC)
        )
    }, [stylistic?.key])

    useEffect(() => {
        if (showTitleTabs && stylistic?.key) {
            courseStore.loadStylisticTaskFinishMap(stylistic.key)
        }
    }, [courseStore, showTitleTabs, stylistic?.key])

    const taskListItems = useMemo(() => {
        return taskList.map((item, index) => {
            const currentStatusMap = stylistic?.key
                ? courseStore.stylisticTaskFinishMap[stylistic.key]
                : {}
            const finishStatus = currentStatusMap?.[item.code]
            return {
                label: (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {finishStatus === 1 ? (
                            <CheckCircleFilled
                                style={{
                                    color: '#52C41A',
                                    fontSize: '14px',
                                    marginRight: '8px',
                                }}
                            />
                        ) : (
                            <svg
                                className="icon"
                                aria-hidden="true"
                                style={{
                                    fontSize: '14px',
                                    marginRight: '8px',
                                    color: 'rgba(0,0,0,25%)',
                                }}
                            >
                                <use xlinkHref={`#weiwancheng`} />
                            </svg>
                        )}
                        <span>{`任务${index + 1}：${item.name}`}</span>
                    </div>
                ),
                key: item.code,
            }
        })
    }, [taskList, courseStore.stylisticTaskFinishMap, stylistic?.key])

    return (
        <div className={styles.course_design_learning}>
            <div className={styles.aside}>
                <CourseDesignAside
                    step={COURSE_DESIGN_STEP.learning}
                    stylisticList={stylisticList}
                    activeKey={activeKey}
                    style={!activeKey ? { paddingRight: 0 } : undefined}
                    onActive={key => {
                        setActiveKey(key)
                        const params = new URLSearchParams(search)
                        if (key === null) {
                            params.delete('stylistic')
                        } else {
                            params.set('stylistic', String(key))
                        }
                        const nextSearch = params.toString()
                        history.replace(nextSearch ? `${pathname}?${nextSearch}` : pathname)
                        scrollToTop()
                    }}
                    rightRender={
                        !activeKey ? <CourseDesignAsideLearning onItemChange={scrollToTop} /> : null
                    }
                />
            </div>

            <div className={styles.content}>
                <CourseDesignTitle
                    canEdit={
                        !stylistic && activeListItem?.type === COURSE_DESIGN_LEARNING_TASK_TYPE.task
                    }
                    onEdit={title => {
                        if (activeListItem?.type !== COURSE_DESIGN_LEARNING_TASK_TYPE.task) return

                        // 保存任务名称修改
                        courseStore.saveTask(activeListItem.code, {
                            name: title,
                        })
                    }}
                    title={activeTitle}
                    style={showTitleTabs ? { paddingBottom: 0 } : undefined}
                    bottomRender={
                        showTitleTabs ? (
                            <Tabs
                                tabBarStyle={{
                                    marginBottom: 0,
                                    borderBottom: 'none',
                                }}
                                items={taskListItems}
                                defaultActiveKey={activeListItem?.code}
                                onChange={e => {
                                    courseStore.setActiveListItem(
                                        taskList.find(item => item.code === e) as IListBaseItem,
                                        COURSE_DESIGN_LEARNING_TASK_TYPE.task,
                                    )
                                    scrollToTop()
                                }}
                            />
                        ) : null
                    }
                />
                <div className={styles.content_main} ref={contentMainRef}>
                    {stylistic ? (
                        <stylistic.component />
                    ) : (
                        <>
                            {activeListItem?.type === COURSE_DESIGN_LEARNING_TASK_TYPE.task && (
                                <CourseDesignLearningTask
                                    activeTitle={activeTitle}
                                    taskCode={activeListItem.code}
                                    key={activeListItem.code}
                                />
                            )}

                            {activeListItem?.type === COURSE_DESIGN_LEARNING_TASK_TYPE.stage && (
                                <CourseDesignLearningStage
                                    activeTitle={activeTitle}
                                    stageCode={activeListItem.code}
                                    key={activeListItem.code}
                                />
                            )}

                            {activeListItem?.type === COURSE_DESIGN_LEARNING_TASK_TYPE.activity && (
                                <CourseDesignLearningActivity
                                    activeTitle={activeTitle}
                                    activityCode={activeListItem.code}
                                    key={activeListItem.code}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
})

export default CourseDesignLearning
