import { useEffect, useMemo } from 'react'
import { useCourseStore } from '../../context'
import { observer } from 'mobx-react'
import styles from './index.module.less'
import ClickEditMultiInputH2Card from '../../components/ClickEditMultiInputH2Card'
import {
    COURSE_DESIGN_STYLISTIC_MAP,
    COURSE_DESIGN_STYLISTIC,
    COURSE_DESIGN_LEARNING_TASK_TYPE,
} from '../../const'
import ClickEditTableH2Card from '../../components/ClickEditTableH2Card'
import {
    getLearningStageColumns,
    getLearningPathColumns,
    transformLearningPathData,
    convertFlattenedToOriginalLearningPath,
    getAssessmentGradeColumns,
    getAssessmentGradeSummary,
} from './const'
import ClickEditLearningStageDetailH2Card from '../../components/ClickEditLearningStageDetailH2Card'
import { Button } from 'antd'
// import { SyncOutlined } from '@ant-design/icons'
import { toJS } from 'mobx'
import { history } from 'umi'

const Stylistic9: React.FC = observer(() => {
    const courseStore = useCourseStore()

    const activeListItem = useMemo(() => courseStore.activeListItem, [courseStore.activeListItem])

    useEffect(() => {
        if (activeListItem?.code && activeListItem?.type === COURSE_DESIGN_LEARNING_TASK_TYPE.task)
            return
        const firstTask = courseStore.taskList?.[0]
        if (!firstTask) return
        courseStore.setActiveListItem(firstTask, COURSE_DESIGN_LEARNING_TASK_TYPE.task)
    }, [courseStore, activeListItem?.code, activeListItem?.type, courseStore.taskList])

    useEffect(() => {
        if (!activeListItem?.code) return
        if (activeListItem?.type !== COURSE_DESIGN_LEARNING_TASK_TYPE.task) return
        courseStore.loadStylistic9(activeListItem.code)
    }, [courseStore, activeListItem?.code, activeListItem?.type])

    const stylistic9 = toJS(courseStore.getStylistic9ByTaskCode(activeListItem?.code || ''))

    const transformedLearningPathData = useMemo(() => {
        return transformLearningPathData(stylistic9.stageTeachingScheduleList || [])
    }, [stylistic9.stageTeachingScheduleList])

    const activeTitleRightRender = useMemo(() => {
        return (
            <>
                <Button
                    onClick={() => {
                        courseStore.callParentSetActiveKey(null)
                    }}
                >
                    去编辑
                </Button>
                {/* <Button icon={<SyncOutlined />} type="primary" ghost style={{ marginLeft: 16 }}>
                    从关键信息同步
                </Button> */}
            </>
        )
    }, [])

    return (
        <div className={styles.stylistic} key={activeListItem?.code}>
            <ClickEditMultiInputH2Card
                className={styles.stylistic_h2}
                title="一、学习任务描述"
                dataTitle={COURSE_DESIGN_STYLISTIC_MAP[COURSE_DESIGN_STYLISTIC.stylistic9].name}
                hideAI
                activeTitleRightRender={activeTitleRightRender}
                items={[
                    {
                        name: '1.任务情景',
                        key: 'scenario',
                    },
                    {
                        name: '2.任务资料',
                        key: 'materials',
                    },
                    {
                        name: '3.任务要求',
                        key: 'requirements',
                    },
                ]}
                defaultValue={{
                    scenario: stylistic9.scenario,
                    materials: stylistic9.materials,
                    requirements: stylistic9.requirements,
                }}
                onChangeBlur={value => {
                    return courseStore.saveStylistic9({
                        taskCode: activeListItem!.code,
                        ...value,
                    })
                }}
                disabled={true}
            />
            <ClickEditTableH2Card
                className={styles.stylistic_h2}
                title="二、学习环节"
                dataTitle={COURSE_DESIGN_STYLISTIC_MAP[COURSE_DESIGN_STYLISTIC.stylistic9].name}
                hideAI
                activeTitleRightRender={activeTitleRightRender}
                items={[
                    {
                        name: '二、学习环节',
                        key: 'stageMastermindList',
                    },
                ]}
                getColumns={getLearningStageColumns}
                defaultValue={stylistic9.stageMastermindList}
                onChangeBlur={value => {
                    return courseStore.saveStylistic9({
                        taskCode: activeListItem!.code,
                        stageMastermindList: value,
                    })
                }}
                rowKey={record => record.code}
            />
            <ClickEditTableH2Card
                className={styles.stylistic_h2}
                title="三、学习路径"
                dataTitle={COURSE_DESIGN_STYLISTIC_MAP[COURSE_DESIGN_STYLISTIC.stylistic9].name}
                hideAI
                activeTitleRightRender={activeTitleRightRender}
                items={[
                    {
                        name: '三、学习路径',
                        key: 'stageTeachingScheduleList',
                    },
                ]}
                getColumns={getLearningPathColumns}
                defaultValue={transformedLearningPathData}
                onChangeBlur={value => {
                    const convertedData = convertFlattenedToOriginalLearningPath(
                        value,
                        stylistic9.stageTeachingScheduleList || [],
                    )
                    return courseStore.saveStylistic9({
                        taskCode: activeListItem!.code,
                        stageTeachingScheduleList: convertedData,
                    })
                }}
                rowKey={record => `${record.stageCode}-${record.stepCode}`}
            />
            <ClickEditLearningStageDetailH2Card
                className={styles.stylistic_h2}
                title="四、学习环节详情"
                dataTitle={COURSE_DESIGN_STYLISTIC_MAP[COURSE_DESIGN_STYLISTIC.stylistic9].name}
                activeTitleRightRender={activeTitleRightRender}
                items={[
                    {
                        name: '四、学习环节详情',
                        key: 'stageLearningStepList',
                    },
                ]}
                defaultValue={stylistic9.stageLearningStepList}
                onChangeBlur={value => {
                    return courseStore.saveStylistic9({
                        taskCode: activeListItem!.code,
                        stageLearningStepList: value,
                    })
                }}
            />
            <ClickEditTableH2Card
                className={styles.stylistic_h2}
                title="五、学习任务考核成绩"
                dataTitle={COURSE_DESIGN_STYLISTIC_MAP[COURSE_DESIGN_STYLISTIC.stylistic9].name}
                hideAI
                activeTitleRightRender={
                    <Button
                        onClick={() => {
                            history.push(`/assistant/course/${courseStore.courseCode}/design/check`)
                        }}
                    >
                        去编辑
                    </Button>
                }
                items={[
                    {
                        name: '五、学习任务考核成绩',
                        key: 'studyTaskAssessmentPlanGradeComposeList',
                    },
                ]}
                getColumns={getAssessmentGradeColumns}
                rowKey={record => record.code}
                defaultValue={stylistic9.studyTaskAssessmentPlanGradeComposeList}
                summary={() =>
                    getAssessmentGradeSummary(
                        stylistic9.studyTaskAssessmentPlanGradeComposeList || [],
                    )
                }
                onChangeBlur={value => {
                    return courseStore.saveStylistic9({
                        taskCode: activeListItem!.code,
                        studyTaskAssessmentPlanGradeComposeList: value,
                    })
                }}
            />
        </div>
    )
})

export default Stylistic9
