import { useEffect, useMemo } from 'react'
import { useCourseStore } from '../../context'
import { observer } from 'mobx-react'
import styles from './index.module.less'
import ClickEditTableH2Card from '../../components/ClickEditTableH2Card'
import {
    COURSE_DESIGN_STYLISTIC_MAP,
    COURSE_DESIGN_STYLISTIC,
    COURSE_DESIGN_LEARNING_TASK_TYPE,
} from '../../const'
import {
    getTeachingScheduleColumns,
    transformTeachingScheduleData,
    convertFlattenedToOriginalTeachingSchedule,
} from './const'
import ClickEditLearningStageDetailH2Card from '../../components/ClickEditLearningStageDetailH2Card'
// import { SyncOutlined } from '@ant-design/icons'
import { Button } from 'antd'

const Stylistic10: React.FC = observer(() => {
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
        courseStore.loadStylistic10(activeListItem.code)
    }, [courseStore, activeListItem?.code, activeListItem?.type])

    const stylistic10 = courseStore.getStylistic10ByTaskCode(activeListItem?.code || '')

    const transformedTeachingScheduleData = useMemo(() => {
        return transformTeachingScheduleData(stylistic10.stageTeachingScheduleList || [])
    }, [stylistic10.stageTeachingScheduleList])

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
            <ClickEditTableH2Card
                className={styles.stylistic_h2}
                title="一、工作页学习路径"
                dataTitle={COURSE_DESIGN_STYLISTIC_MAP[COURSE_DESIGN_STYLISTIC.stylistic10].name}
                hideAI
                activeTitleRightRender={activeTitleRightRender}
                items={[
                    {
                        name: '一、工作页学习路径',
                        key: 'stageTeachingScheduleList',
                    },
                ]}
                getColumns={getTeachingScheduleColumns}
                defaultValue={transformedTeachingScheduleData}
                onChangeBlur={value => {
                    const convertedData = convertFlattenedToOriginalTeachingSchedule(
                        value,
                        stylistic10.stageTeachingScheduleList || [],
                    )
                    return courseStore.saveStylistic10({
                        taskCode: activeListItem!.code,
                        stageTeachingScheduleList: convertedData,
                    })
                }}
                rowKey={record => `${record.stageCode}-${record.stepCode}`}
            />
            <ClickEditLearningStageDetailH2Card
                className={styles.stylistic_h2}
                stylistic={COURSE_DESIGN_STYLISTIC.stylistic10}
                title="二、学习环节详情"
                dataTitle={COURSE_DESIGN_STYLISTIC_MAP[COURSE_DESIGN_STYLISTIC.stylistic10].name}
                activeTitleRightRender={activeTitleRightRender}
                items={[
                    {
                        name: '二、学习环节详情',
                        key: 'stageLearningStepList',
                    },
                ]}
                defaultValue={stylistic10.stageLearningStepList}
                onChangeBlur={value => {
                    return courseStore.saveStylistic10({
                        taskCode: activeListItem!.code,
                        stageLearningStepList: value,
                    })
                }}
            />
        </div>
    )
})

export default Stylistic10
