/* eslint-disable react/no-array-index-key */
import {
    COURSE_DESIGN_STEP,
    COURSE_DESIGN_STEP_LABEL,
    COURSE_DESIGN_STEP_MAP_STYLISTIC,
    COURSE_DESIGN_STYLISTIC,
    COURSE_DESIGN_LEARNING_TASK_TYPE,
} from '@/modules/course/const'
import styles from './index.module.less'
import CourseDesignAside from '@/pages/assistant/components/CourseDesignAside'
import { useEffect, useMemo, useState, useRef } from 'react'
import { useLocation, history } from 'umi'
import CourseDesignTitle from '@/pages/assistant/components/CourseDesignTitle'
import { useCourseStore } from '@/modules/course/context'
import { observer } from 'mobx-react'
import { getRuleColumns } from './const'
import ClickEditTableH2Card from '@/modules/course/components/ClickEditTableH2Card'
import { cloneDeep } from 'lodash'
import LearningOutcomesModal from './components/LearningOutcomesModal'
import EvaluateModal from './components/EvaluateModal'
import { Tabs, Table } from 'antd'
import AssessmentResults from './components/AssessmentResults'
import type { IListBaseItem } from '@/modules/course/types/learning'
import { CheckCircleFilled } from '@ant-design/icons'
import { toJS } from 'mobx'

type StylisticKey =
    (typeof COURSE_DESIGN_STEP_MAP_STYLISTIC)[COURSE_DESIGN_STEP.check][number]['key']

const CourseDesignCheck: React.FC = observer(() => {
    const { search, pathname } = useLocation()
    let initStylistic = new URLSearchParams(search).get(
        'stylistic',
    ) as unknown as StylisticKey | null
    initStylistic = initStylistic ? Number(initStylistic) : null

    const [activeKey, setActiveKey] = useState<StylisticKey | null>(initStylistic)
    const [weightTotalArr, setWeightTotalArr] = useState<number[]>([])
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
        () => COURSE_DESIGN_STEP_MAP_STYLISTIC[COURSE_DESIGN_STEP.check],
        [],
    )
    const stylistic = useMemo(
        () => (activeKey === null ? null : stylisticList.find(item => item.key === activeKey)),
        [activeKey, stylisticList],
    )

    const courseStore = useCourseStore()

    const [learningOutcomesModalOpen, setLearningOutcomesModalOpen] = useState(false)
    const [evaluateModalOpen, setEvaluateModalOpen] = useState(false)
    const [rowObj, setRowObj] = useState<any>(null)

    useEffect(() => {
        courseStore.getCourseTaskList()
        courseStore.loadCheck()
    }, [courseStore])

    useEffect(() => {
        courseStore.setParentSetActiveKey(setActiveKey)
    }, [courseStore, setActiveKey])

    const checkInformation = useMemo(() => {
        return courseStore.checkInformation
    }, [courseStore.checkInformation])

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
            [COURSE_DESIGN_STYLISTIC.stylistic5, COURSE_DESIGN_STYLISTIC.stylistic8].includes(
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
            ? COURSE_DESIGN_STEP_LABEL[COURSE_DESIGN_STEP.check]
            : stylistic?.name ?? '未知命名'

    return (
        <div className={styles.course_design_check}>
            <div className={styles.aside}>
                <CourseDesignAside
                    step={COURSE_DESIGN_STEP.check}
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
                            <div className={styles.no_padding_table}>
                                <AssessmentResults
                                    title="课程考核成绩构成"
                                    dataTitle="考核方案设计"
                                    assessmentResultCompositionList={
                                        checkInformation.assessmentResultCompositionList
                                    }
                                    onChangeBlur={value => {
                                        return courseStore.saveCheckInformation({
                                            assessmentResultCompositionList: value,
                                        })
                                    }}
                                />
                            </div>

                            {checkInformation?.evaluatedRubricList?.map((item, index) => {
                                const aiState = {
                                    taskCode: item?.code,
                                }

                                return (
                                    <div key={item.code} className={styles.no_padding_table}>
                                        <ClickEditTableH2Card
                                            title={`考核细则 / 学习任务${index + 1}：${item?.name}`}
                                            dataTitle={'考核方案设计'}
                                            aiState={aiState}
                                            items={[
                                                {
                                                    name: `考核细则 / 学习任务${index + 1}：${
                                                        item?.name
                                                    }`,
                                                    key: 'evaluatedRubricList',
                                                },
                                            ]}
                                            transformValue={(value, setValue) => {
                                                const list = toJS(value?.evaluatedRubricList)
                                                setValue?.([
                                                    {
                                                        name: `考核细则 / 学习任务${index + 1}：${
                                                            item?.name
                                                        }`,
                                                        key: 'evaluatedRubricList',
                                                        value: list,
                                                    },
                                                ])
                                            }}
                                            getColumns={(
                                                active,
                                                setActive,
                                                onDataChange,
                                                rowHeights,
                                            ) => {
                                                return getRuleColumns(
                                                    active,
                                                    setActive,
                                                    index,
                                                    setRowObj,
                                                    setLearningOutcomesModalOpen,
                                                    setEvaluateModalOpen,
                                                    weightTotalArr[index] || 0,
                                                    item?.code,
                                                    onDataChange,
                                                    rowHeights,
                                                )
                                            }}
                                            defaultValue={
                                                cloneDeep(
                                                    toJS(item?.evaluatedRubricProjectList || []),
                                                ) as any
                                            }
                                            onChangeBlur={(value: any) => {
                                                return courseStore.saveCheckInformation(p => {
                                                    const rule = cloneDeep(p.evaluatedRubricList)
                                                    rule[index].evaluatedRubricProjectList = value
                                                    return {
                                                        evaluatedRubricList: rule,
                                                    }
                                                })
                                            }}
                                            rowKey={record => {
                                                return `row-${record.code}_${record.name}`
                                            }}
                                            key={index}
                                            summary={(pageData: any) => {
                                                let weightTotal = 0

                                                pageData.forEach((pItem: any) => {
                                                    pItem.evaluatedRubricProjectList?.forEach(
                                                        (ele: any) => {
                                                            weightTotal += ele.weight || 0
                                                        },
                                                    )
                                                })

                                                weightTotalArr[index] = weightTotal

                                                setWeightTotalArr(weightTotalArr)

                                                return (
                                                    <Table.Summary fixed>
                                                        <Table.Summary.Row>
                                                            <Table.Summary.Cell
                                                                index={1}
                                                                align="center"
                                                                colSpan={2}
                                                            >
                                                                合计
                                                            </Table.Summary.Cell>
                                                            <Table.Summary.Cell
                                                                index={2}
                                                                align="center"
                                                            >
                                                                {weightTotal}
                                                            </Table.Summary.Cell>
                                                            <Table.Summary.Cell
                                                                index={3}
                                                                align="center"
                                                            >
                                                                -
                                                            </Table.Summary.Cell>
                                                            <Table.Summary.Cell
                                                                index={4}
                                                                align="center"
                                                            >
                                                                -
                                                            </Table.Summary.Cell>
                                                            <Table.Summary.Cell
                                                                index={5}
                                                                align="center"
                                                            >
                                                                -
                                                            </Table.Summary.Cell>
                                                            <Table.Summary.Cell
                                                                index={6}
                                                                align="center"
                                                            >
                                                                -
                                                            </Table.Summary.Cell>
                                                            <Table.Summary.Cell
                                                                index={7}
                                                                align="center"
                                                            >
                                                                -
                                                            </Table.Summary.Cell>
                                                        </Table.Summary.Row>
                                                    </Table.Summary>
                                                )
                                            }}
                                        />
                                    </div>
                                )
                            })}

                            {learningOutcomesModalOpen && (
                                <LearningOutcomesModal
                                    isModalOpen={learningOutcomesModalOpen}
                                    handleCancel={() => {
                                        setLearningOutcomesModalOpen(false)
                                    }}
                                    handleOk={data => {
                                        rowObj.add(data)
                                        setLearningOutcomesModalOpen(false)
                                    }}
                                    taskCode={rowObj?.taskCode}
                                />
                            )}

                            {evaluateModalOpen && (
                                <EvaluateModal
                                    isModalOpen={evaluateModalOpen}
                                    handleCancel={() => {
                                        setEvaluateModalOpen(false)
                                    }}
                                    handleOk={data => {
                                        rowObj.add(data)
                                        setEvaluateModalOpen(false)
                                    }}
                                    data={rowObj?.data}
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
})

export default CourseDesignCheck
