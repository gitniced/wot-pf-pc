import {
    COURSE_DESIGN_LEARNING_TASK_TYPE,
    COURSE_DESIGN_STEP,
    COURSE_DESIGN_STEP_LABEL,
    COURSE_DESIGN_STEP_MAP_STYLISTIC,
    COURSE_DESIGN_STYLISTIC,
} from '@/modules/course/const'
import styles from './index.module.less'
import CourseDesignAside from '@/pages/assistant/components/CourseDesignAside'
import { useEffect, useMemo, useState, useRef } from 'react'
import ClickEditTableH2Card from '@/modules/course/components/ClickEditTableH2Card'
import { useLocation, history } from 'umi'
import CourseDesignTitle from '@/pages/assistant/components/CourseDesignTitle'
import { useCourseStore } from '@/modules/course/context'
import { observer } from 'mobx-react'
import { getTeachingActivityDesignColumns } from '@/modules/course/views/Stylistic11/const'
import { cloneDeep } from 'lodash'
import { Tabs } from 'antd'
import StudyTaskList from './components/StudyTaskList'
import type { IListBaseItem } from '@/modules/course/types/learning'
import { CheckCircleFilled } from '@ant-design/icons'
import { toJS } from 'mobx'

type StylisticKey =
    (typeof COURSE_DESIGN_STEP_MAP_STYLISTIC)[COURSE_DESIGN_STEP.teaching][number]['key']

const CourseDesignTeaching: React.FC = observer(() => {
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
        () => COURSE_DESIGN_STEP_MAP_STYLISTIC[COURSE_DESIGN_STEP.teaching],
        [],
    )
    const stylistic = useMemo(
        () => (activeKey === null ? null : stylisticList.find(item => item.key === activeKey)),
        [activeKey, stylisticList],
    )

    const courseStore = useCourseStore()

    useEffect(() => {
        courseStore.loadTeaching()
        courseStore.getCourseTaskList()
    }, [courseStore])

    useEffect(() => {
        courseStore.setParentSetActiveKey(setActiveKey)
    }, [courseStore, setActiveKey])

    const teachingPlanInformation = courseStore.teachingPlanInformation

    const activeListItem = useMemo(() => courseStore.activeListItem, [courseStore.activeListItem])

    const taskList = useMemo(() => courseStore.taskList, [courseStore.taskList])

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

    const showTitleTabs = useMemo(() => {
        return (
            stylistic &&
            [COURSE_DESIGN_STYLISTIC.stylistic7, COURSE_DESIGN_STYLISTIC.stylistic12].includes(
                stylistic?.key as COURSE_DESIGN_STYLISTIC,
            )
        )
    }, [stylistic?.key])

    useEffect(() => {
        if (showTitleTabs && stylistic?.key) {
            courseStore.loadStylisticTaskFinishMap(stylistic.key)
        }
    }, [courseStore, showTitleTabs, stylistic?.key])

    const title =
        stylistic === null
            ? COURSE_DESIGN_STEP_LABEL[COURSE_DESIGN_STEP.teaching]
            : stylistic?.name ?? '未知命名'

    return (
        <div className={styles.course_design_teaching}>
            <div className={styles.aside}>
                <CourseDesignAside
                    step={COURSE_DESIGN_STEP.teaching}
                    stylisticList={stylisticList}
                    activeKey={activeKey}
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
                />
            </div>

            <div className={styles.content}>
                <CourseDesignTitle
                    title={title}
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
                        <stylistic.component key={activeListItem?.code} />
                    ) : (
                        <div className={styles.content_main_form}>
                            <StudyTaskList
                                title="学习任务列表"
                                taskList={teachingPlanInformation.taskList}
                                finalityTask={teachingPlanInformation.finalityTask}
                                onChangeBlur={value => {
                                    return courseStore.saveTeachingPlanInformation(value)
                                }}
                            />

                            {teachingPlanInformation?.taskActivityDesignList?.map((item, index) => (
                                <ClickEditTableH2Card
                                    key={item?.name}
                                    title={`教学活动设计 > 任务${index + 1}：${item?.name}`}
                                    className={styles.stylistic_h2}
                                    dataTitle={'教学方案设计'}
                                    items={[
                                        {
                                            name: `教学活动设计 > 任务${index + 1}：${item?.name}`,
                                            key: 'taskActivityDesignList',
                                        },
                                    ]}
                                    transformValue={(value, setValue) => {
                                        const list = toJS(
                                            value?.taskActivityDesignList?.[0]?.activityDesignList,
                                        )
                                        setValue?.([
                                            {
                                                name: `教学活动设计 > 任务${index + 1}：${
                                                    item?.name
                                                }`,
                                                key: 'activityDesignList',
                                                value: list,
                                            },
                                        ])
                                    }}
                                    getColumns={getTeachingActivityDesignColumns}
                                    defaultValue={item?.activityDesignList || []}
                                    onChangeBlur={value => {
                                        const newData = cloneDeep(
                                            teachingPlanInformation?.taskActivityDesignList,
                                        )
                                        newData[index].activityDesignList = value

                                        return courseStore.saveTeachingPlanInformation({
                                            taskActivityDesignList: newData,
                                        })
                                    }}
                                    canAdd
                                    addText="添加教学过程"
                                    addItem={() => {
                                        return {
                                            teachingProcess: '',
                                            learningContent: '',
                                            studentActivity: '',
                                            teacherActivity: '',
                                            teachingMeans: '',
                                            teachingMethods: '',
                                            learningResult: '',
                                        }
                                    }}
                                >
                                    {/* <div
                                        style={{ marginTop: '12px' }}
                                        onClick={() => {
                                            const newData = cloneDeep(
                                                teachingPlanInformation?.taskActivityDesignList,
                                            )
                                            newData[index].activityDesignList.push({
                                                teachingProcess: '',
                                                learningContent: '',
                                                studentActivity: '',
                                                teacherActivity: '',
                                                teachingMeans: '',
                                                teachingMethods: '',
                                                learningResult: '',
                                            })
                                            return courseStore.saveTeachingPlanInformation({
                                                taskActivityDesignList: newData,
                                            })
                                        }}
                                    >
                                        <Button>添加教学过程</Button>
                                    </div> */}
                                </ClickEditTableH2Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
})

export default CourseDesignTeaching
