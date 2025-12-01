import { useCallback, useEffect, useMemo } from 'react'
import { useCourseStore } from '../../context'
import { observer } from 'mobx-react'
import styles from './index.module.less'
import ClickEditInputH2Card from '../../components/ClickEditInputH2Card'
import {
    COURSE_DESIGN_STYLISTIC_MAP,
    COURSE_DESIGN_STYLISTIC,
    COURSE_DESIGN_LEARNING_TASK_TYPE,
} from '../../const'
import ClickEditMultiInputH2Card from '../../components/ClickEditMultiInputH2Card'
import ClickEditTableH2Card from '../../components/ClickEditTableH2Card'
import { getWorkAnalysisColumns, stylisticItemMap } from './const'
import ClickEditInputTaskBasicInfoH2Card from '../../components/ClickEditInputTaskBasicInfoH2Card'
import type {
    ICourseStylistic6LearningTaskDesign,
    ICourseStylistic6WorkAndLearningAnalysisItem,
} from '../../types/stylistic6'
import { Button } from 'antd'
// import { SyncOutlined } from '@ant-design/icons'

const Stylistic6: React.FC = observer(() => {
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
        courseStore.loadStylistic6(activeListItem.code)
    }, [courseStore, activeListItem?.code, activeListItem?.type])

    const stylistic6 = courseStore.getStylistic6ByTaskCode(activeListItem?.code || '')

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
    }, [courseStore])

    const handleBasicInfoChange = useCallback(
        (value: any) => {
            return courseStore.saveStylistic6({
                taskCode: activeListItem!.code,
                basicInfoDto: value,
            })
        },
        [activeListItem?.code, courseStore],
    )

    const handleRepresentativeFeaturesChange = useCallback(
        (value: string) => {
            return courseStore.saveStylistic6({
                taskCode: activeListItem!.code,
                representativeFeatures: value,
            })
        },
        [activeListItem?.code, courseStore],
    )

    const handleLearningTaskDesignChange = useCallback(
        (value: Record<string, string | undefined>) => {
            return courseStore.saveStylistic6({
                taskCode: activeListItem!.code,
                learningTaskDesignDto: value as unknown as ICourseStylistic6LearningTaskDesign,
            })
        },
        [activeListItem?.code, courseStore],
    )

    const handleWorkAndLearningAnalysisChange = useCallback(
        (value: ICourseStylistic6WorkAndLearningAnalysisItem[]) => {
            return courseStore.saveStylistic6({
                taskCode: activeListItem!.code,
                workAndLearningAnalysisItems: value,
            })
        },
        [activeListItem?.code, courseStore],
    )

    const getWorkAndLearningAnalysisRowKey = useCallback(
        (record: ICourseStylistic6WorkAndLearningAnalysisItem) => {
            return `${record.sort}_${record.name}`
        },
        [],
    )

    return (
        <div className={styles.stylistic} key={activeListItem?.code}>
            <ClickEditInputTaskBasicInfoH2Card
                className={styles.stylistic_h2}
                title="一、基本信息"
                dataTitle={COURSE_DESIGN_STYLISTIC_MAP[COURSE_DESIGN_STYLISTIC.stylistic6].name}
                items={stylisticItemMap[1]}
                defaultValue={stylistic6.basicInfoDto || { enterpriseName: '', workDuration: 0 }}
                onChangeBlur={handleBasicInfoChange}
            />
            <ClickEditInputH2Card
                className={styles.stylistic_h2}
                title="二、学习任务代表性特征分析（选填）"
                dataTitle={COURSE_DESIGN_STYLISTIC_MAP[COURSE_DESIGN_STYLISTIC.stylistic6].name}
                items={stylisticItemMap[2]}
                defaultValue={stylistic6.representativeFeatures}
                onChangeBlur={handleRepresentativeFeaturesChange}
            />
            <ClickEditMultiInputH2Card
                disabled={true}
                className={styles.stylistic_h2}
                title="三、学习任务描述"
                dataTitle={COURSE_DESIGN_STYLISTIC_MAP[COURSE_DESIGN_STYLISTIC.stylistic6].name}
                hideAI
                activeTitleRightRender={activeTitleRightRender}
                items={stylisticItemMap[3]}
                defaultValue={{
                    scenario: stylistic6.learningTaskDesignDto.scenario,
                    materials: stylistic6.learningTaskDesignDto.materials,
                    requirements: stylistic6.learningTaskDesignDto.requirements,
                }}
                onChangeBlur={handleLearningTaskDesignChange}
            />
            <ClickEditTableH2Card
                key={activeListItem?.code}
                className={styles.stylistic_h2}
                title="四、工作学习内容分析"
                dataTitle={COURSE_DESIGN_STYLISTIC_MAP[COURSE_DESIGN_STYLISTIC.stylistic6].name}
                items={stylisticItemMap[4]}
                getColumns={getWorkAnalysisColumns}
                rowKey={getWorkAndLearningAnalysisRowKey}
                defaultValue={stylistic6.workAndLearningAnalysisItems}
                onChangeBlur={handleWorkAndLearningAnalysisChange}
            />
        </div>
    )
})

export default Stylistic6
